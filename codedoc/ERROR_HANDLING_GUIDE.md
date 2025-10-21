# JavaScript Error Handling - Implementation Guide

## Overview
The editor now has comprehensive error handling for user JavaScript code with Monaco editor integration, showing inline error markers with line numbers.

## Error Detection System

### 1. **Syntax Errors** (Compilation Time)
- **Caught by**: `compileUserJS()`
- **When**: When code is parsed by `new Function()`
- **Example**:
```javascript
function init() {
    return {
        value: 42
    // Missing closing brace
}
```
- **Result**: Red squiggly line in editor at the error location
- **Monaco Marker**: Shows exact line and column

### 2. **Runtime Errors in `init()`**
- **Caught by**: Try-catch in `togglePlayPause()`
- **When**: When Play button is pressed and `init()` executes
- **Example**:
```javascript
function init() {
    const x = someUndefinedVariable; // ReferenceError
    return { x };
}
```
- **Result**: 
  - Monaco marker showing line number
  - Status display: "✗ JS init() error (line X): ..."
  - Playback prevented

### 3. **Runtime Errors in `enterframe()`**
- **Caught by**: Try-catch in `render()` loop
- **When**: During frame rendering while playing
- **Example**:
```javascript
function enterframe(state, api) {
    api.uniforms.setFloat(5, state.undefinedProp.value); // TypeError
}
```
- **Result**:
  - Automatic pause
  - Monaco marker with line number
  - Status display shows error
  - Playback stops to prevent error spam

### 4. **Uncaught Errors** (Async/Delayed)
- **Caught by**: `window.onerror` global handler
- **When**: Errors not caught by try-catch (setTimeout, promises without .catch, etc.)
- **Example**:
```javascript
function enterframe(state, api) {
    setTimeout(() => {
        throw new Error("Delayed error");
    }, 1000);
}
```
- **Result**: 
  - Monaco marker with line number
  - Automatic pause
  - Status display updated

### 5. **Console Messages from User Code**
- **Caught by**: Wrapped `console.error` and `console.warn`
- **When**: User code calls console.error() or console.warn()
- **Example**:
```javascript
function enterframe(state, api) {
    if (api.time > 5) {
        console.error("Time exceeded!");
    }
}
```
- **Result**:
  - Status display shows: "⚠ Console error from user code: ..."
  - Original console.error still fires (visible in DevTools)
  - Does NOT show Monaco marker (not an actual error)

## How Editor Code Errors Are Handled

### Distinguishing User Code from Editor Code
The system uses **stack trace analysis** to determine the error source:

- **User code errors**: Stack contains `<anonymous>` (from `new Function()`)
- **Editor code errors**: Normal file paths in stack

### Editor Code Error Behavior
- NOT intercepted by global handlers
- Appear normally in browser console
- Do NOT show Monaco markers
- Do NOT affect playback

This prevents editor bugs from showing as "user errors" in the JS panel.

## Line Number Extraction

### How it Works
```javascript
function parseJSError(err, codeLines) {
    // 1. Try parsing stack trace: "<anonymous>:LINE:COLUMN"
    // 2. Adjust for wrapper offset (-1 line from Function() wrapper)
    // 3. Clamp to valid range
    // 4. Return { lineNum, column, message }
}
```

### Why Line Numbers Work
- User code is wrapped with exactly one newline before it:
```javascript
const wrappedCode = `
${code}
return { init, enterframe };
`;
```
- Stack trace line numbers are offset by 1
- We subtract 1 to get correct editor line numbers

## Monaco Integration

### Functions Added
1. **`setJSErrors(errors)`** - Sets error markers in JS editor
2. **`clearJSErrors()`** - Clears all markers
3. **`parseJSError(err, codeLines)`** - Extracts line/column info

### Error Object Format
```javascript
{
    lineNum: 5,           // Editor line number
    column: 12,           // Column position
    message: "Error...",  // Human-readable message
    endColumn: 1000       // End of line (optional)
}
```

### When Markers Are Shown
- ✅ Syntax errors during compilation
- ✅ Runtime errors in init()
- ✅ Runtime errors in enterframe()
- ✅ Uncaught errors from user code
- ❌ Console messages (informational only)

### When Markers Are Cleared
- On successful compilation (`compileUserJS()`)
- On successful init() start
- When user presses Play (after successful compile)

## Testing the System

### Test Case 1: Syntax Error
```javascript
function init() {
    return { x: 1
} // Missing closing paren
```
**Expected**: Immediate red marker on line 2

### Test Case 2: Runtime Error in init
```javascript
function init() {
    throw new Error("Init failed!");
}
```
**Expected**: Marker appears when Play is pressed

### Test Case 3: Runtime Error in enterframe
```javascript
function enterframe(state, api) {
    const x = undefined.property;
}
```
**Expected**: Marker appears during playback, automatic pause

### Test Case 4: Delayed Error
```javascript
function enterframe(state, api) {
    setTimeout(() => { throw new Error("Boom"); }, 100);
}
```
**Expected**: Marker appears ~100ms after Play, automatic pause

### Test Case 5: Console Error (Not a real error)
```javascript
function enterframe(state, api) {
    console.error("Debug message");
}
```
**Expected**: Status display shows warning, NO Monaco marker, continues playing

## Future Enhancements

### Potential Improvements
1. **Multiple Error Markers** - Currently only shows last error
2. **Error History Panel** - Log of all errors during session
3. **Warning Markers** (yellow) - For console.warn messages
4. **Stack Trace Display** - Show full stack in status panel
5. **Error Recovery** - "Continue" button to resume after enterframe errors
6. **Breakpoint Support** - Integration with browser debugger

### Known Limitations
1. Line numbers may be off for complex nested functions
2. Async errors in Promises might not show exact line
3. Only one error marker shown at a time
4. Column accuracy depends on browser error formatting

## Summary

The error handling system provides:
- ✅ Visual inline error markers (like VSCode)
- ✅ Accurate line numbers
- ✅ Separation of user vs editor errors
- ✅ Automatic pause on critical errors
- ✅ Console integration
- ✅ Non-intrusive error reporting

All while maintaining a smooth editing experience and preventing error spam during playback.

