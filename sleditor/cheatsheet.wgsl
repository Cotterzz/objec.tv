//Scalar Types

var a: bool = true;
var b: i32 = -42;           // 32-bit signed integer
var c: u32 = 42u;           // 32-bit unsigned integer
var d: f32 = 3.14f;         // 32-bit float
var e: f16 = 1.5h;          // 16-bit float (requires extension)
Vector Types
wgsl
var v2f: vec2<f32> = vec2(1.0, 2.0);
var v3f: vec3<f32> = vec3(1.0, 2.0, 3.0);
var v4f: vec4<f32> = vec4(1.0, 2.0, 3.0, 4.0);

var v2i: vec2<i32> = vec2<i32>(1, 2);
var v3u: vec3<u32> = vec3<u32>(1u, 2u, 3u);
var v4b: vec4<bool> = vec4<bool>(true, false, true, false);

// Swizzling
var xy: vec2<f32> = v4f.xy;
var bgr: vec3<f32> = v4f.bgr;
var wzyx: vec4<f32> = v4f.wzyx;
Matrix Types
wgsl
var m2x2: mat2x2<f32> = mat2x2<f32>(1.0, 0.0, 0.0, 1.0);
var m3x3: mat3x3<f32> = mat3x3<f32>(/* 9 values */);
var m4x4: mat4x4<f32> = mat4x4<f32>(/* 16 values */);

// Non-square matrices
var m2x3: mat2x3<f32>;  // 2 columns, 3 rows
var m3x2: mat3x2<f32>;  // 3 columns, 2 rows
var m2x4: mat2x4<f32>;
var m4x2: mat4x2<f32>;
var m3x4: mat3x4<f32>;
var m4x3: mat4x3<f32>;

// Access
var col: vec3<f32> = m3x3[0];      // First column
var element: f32 = m3x3[1][2];     // Column 1, row 2
Atomic Types
wgsl
var<storage, read_write> atomic_val: atomic<i32>;
var<storage, read_write> atomic_uval: atomic<u32>;
Array Types
wgsl
// Fixed-size arrays
var arr: array<f32, 4> = array<f32, 4>(1.0, 2.0, 3.0, 4.0);
var arr2: array<vec3<f32>, 2>;

// Runtime-sized arrays (only in storage buffers, must be last member)
struct Buffer {
    data: array<f32>  // Runtime-sized
}
Structs
wgsl
struct MyStruct {
    position: vec3<f32>,
    @align(16) color: vec4<f32>,  // Explicit alignment
    @size(32) value: f32,          // Explicit size
    count: u32,
}

var s: MyStruct = MyStruct(
    vec3(0.0, 0.0, 0.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    42.0,
    10u
);

// Access
var pos: vec3<f32> = s.position;
s.count = 20u;
Storage Qualifiers & Address Spaces
wgsl
// Function scope (default)
var local_var: f32;

// Uniform buffer (read-only)
@group(0) @binding(0) var<uniform> uniforms: MyUniforms;

// Storage buffer (read or read_write)
@group(0) @binding(1) var<storage, read> input: Buffer;
@group(0) @binding(2) var<storage, read_write> output: Buffer;

// Workgroup shared memory
var<workgroup> shared_data: array<f32, 256>;

// Private (per-invocation)
var<private> private_var: f32;
Math Operators
wgsl
// Arithmetic
var add = a + b;
var sub = a - b;
var mul = a * b;
var div = a / b;
var mod = a % b;  // Integers only
var neg = -a;

// Compound assignment
a += b;
a -= b;
a *= b;
a /= b;
a %= b;  // Integers only

// Comparison
var eq = a == b;
var ne = a != b;
var lt = a < b;
var le = a <= b;
var gt = a > b;
var ge = a >= b;

// Logical
var and = a && b;
var or = a || b;
var not = !a;

// Bitwise (integers only)
var bit_and = a & b;
var bit_or = a | b;
var bit_xor = a ^ b;
var bit_not = ~a;
var shift_left = a << b;
var shift_right = a >> b;

// Vector/Matrix operations
var v_add = v1 + v2;           // Component-wise
var v_mul = v1 * 2.0;          // Scalar multiplication
var dot_prod = dot(v1, v2);    // Dot product
var cross_prod = cross(v1, v2); // Cross product (vec3 only)
var m_mul = m1 * m2;           // Matrix multiplication
var mv_mul = m * v;            // Matrix-vector multiplication
Built-in Functions (Compute Shader Safe)
Math Functions
wgsl
// Basic math
abs(x)                  // Absolute value
sign(x)                 // Sign (-1, 0, or 1)
floor(x)                // Round down
ceil(x)                 // Round up
round(x)                // Round to nearest
trunc(x)                // Truncate decimal
fract(x)                // Fractional part
modf(x)                 // Split to integer and fractional (returns struct)
clamp(x, min, max)      // Clamp to range
min(a, b)               // Minimum
max(a, b)               // Maximum
mix(a, b, t)            // Linear interpolation: a*(1-t) + b*t
step(edge, x)           // 0 if x < edge, else 1
smoothstep(low, high, x) // Smooth interpolation
saturate(x)             // Clamp to [0, 1]

// Power/Exponential
pow(x, y)               // x^y
exp(x)                  // e^x
exp2(x)                 // 2^x
log(x)                  // Natural logarithm
log2(x)                 // Base-2 logarithm
sqrt(x)                 // Square root
inverseSqrt(x)          // 1/sqrt(x)

// Trigonometry (radians)
sin(x)
cos(x)
tan(x)
asin(x)
acos(x)
atan(x)
atan2(y, x)             // atan(y/x) with correct quadrant
sinh(x)
cosh(x)
tanh(x)
asinh(x)
acosh(x)
atanh(x)
radians(degrees)
degrees(radians)

// Vector functions
dot(v1, v2)             // Dot product
cross(v1, v2)           // Cross product (vec3 only)
length(v)               // Vector length
distance(p1, p2)        // Distance between points
normalize(v)            // Unit vector
faceforward(N, I, Nref) // Flip N if needed
reflect(I, N)           // Reflect vector
refract(I, N, eta)      // Refract vector

// Matrix functions
determinant(m)          // Matrix determinant
transpose(m)            // Matrix transpose
Bitwise Functions
wgsl
countOneBits(x)         // Count set bits
reverseBits(x)          // Reverse bit order
firstLeadingBit(x)      // Position of first 1 from MSB
firstTrailingBit(x)     // Position of first 1 from LSB
extractBits(e, offset, count)  // Extract bit range
insertBits(e, newbits, offset, count) // Insert bit range
Atomic Functions
wgsl
atomicLoad(atomic_ptr)
atomicStore(atomic_ptr, value)
atomicAdd(atomic_ptr, value)
atomicSub(atomic_ptr, value)
atomicMax(atomic_ptr, value)
atomicMin(atomic_ptr, value)
atomicAnd(atomic_ptr, value)
atomicOr(atomic_ptr, value)
atomicXor(atomic_ptr, value)
atomicExchange(atomic_ptr, value)
atomicCompareExchangeWeak(atomic_ptr, compare, value)
Data Packing/Unpacking
wgsl
pack4x8snorm(v)         // vec4<f32> to u32
pack4x8unorm(v)
pack2x16snorm(v)        // vec2<f32> to u32
pack2x16unorm(v)
pack2x16float(v)

unpack4x8snorm(u)       // u32 to vec4<f32>
unpack4x8unorm(u)
unpack2x16snorm(u)      // u32 to vec2<f32>
unpack2x16unorm(u)
unpack2x16float(u)
Other Useful Functions
wgsl
all(v)                  // True if all components true
any(v)                  // True if any component true
select(f, t, cond)      // cond ? t : f (component-wise for vectors)
arrayLength(runtime_array_ptr)  // Length of runtime-sized array

// Derivative functions (NOT available in compute!)
// dpdx, dpdy, fwidth - these are fragment shader only
Control Flow
If/Else
wgsl
if (condition) {
    // code
}

if (condition) {
    // code
} else {
    // code
}

if (condition1) {
    // code
} else if (condition2) {
    // code
} else {
    // code
}
Switch
wgsl
switch (value) {
    case 0: {
        // code
    }
    case 1, 2: {  // Multiple cases
        // code
    }
    default: {
        // code
    }
}
For Loop
wgsl
for (var i = 0u; i < 10u; i++) {
    // code
    break;     // Exit loop
    continue;  // Next iteration
}
While Loop
wgsl
while (condition) {
    // code
    break;
    continue;
}
Loop (infinite with explicit break)
wgsl
loop {
    if (condition) {
        break;
    }
    
    // continuing block is executed at the end of each iteration
    continuing {
        // Update code
        break if (exit_condition);  // Can break from continuing block
    }
}
Array Operations
wgsl
// Declaration
var arr1: array<f32, 4>;                    // Fixed size
var arr2 = array<f32, 4>(1.0, 2.0, 3.0, 4.0); // With initialization
var arr3: array<vec3<f32>, 2>;              // Array of vectors

// Multi-dimensional
var arr2d: array<array<f32, 3>, 4>;         // 4x3 array

// Access
var element = arr1[0];
arr1[1] = 5.0;

// Runtime-sized (in storage buffer)
struct DynamicBuffer {
    length: u32,
    data: array<f32>  // Must be last member
}

@group(0) @binding(0) var<storage, read> buffer: DynamicBuffer;

// Get length of runtime-sized array
var len = arrayLength(&buffer.data);

// Iteration
for (var i = 0u; i < 4u; i++) {
    arr1[i] = f32(i);
}
Pointers & References
wgsl
fn modify(ptr: ptr<function, f32>) {
    *ptr = 10.0;  // Dereference
}

var value = 5.0;
modify(&value);  // Pass pointer

// Get pointer to array element
var arr = array<f32, 4>(1.0, 2.0, 3.0, 4.0);
let elem_ptr = &arr[2];
Compute Shader Specifics
Entry Point
wgsl
@compute @workgroup_size(8, 8, 1)
fn main(
    @builtin(global_invocation_id) global_id: vec3<u32>,
    @builtin(local_invocation_id) local_id: vec3<u32>,
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(local_invocation_index) local_index: u32,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    // Compute shader code
}
Workgroup Barrier
wgsl
workgroupBarrier();  // Synchronize all invocations in workgroup
storageBarrier();    // Ensure memory writes are visible
Constants
wgsl
const PI: f32 = 3.14159265359;
const SIZE: u32 = 256u;

// Override constants (can be set from API)
override BLOCK_SIZE: u32 = 16u;
override THRESHOLD: f32;
Type Aliases
wgsl
alias Float = f32;
alias Vec3 = vec3<f32>;
alias MyArray = array<f32, 16>;
Complete Example
wgsl
// Bindings
struct Params {
    size: u32,
    multiplier: f32,
}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> input: array<f32>;
@group(0) @binding(2) var<storage, read_write> output: array<f32>;

// Shared memory
var<workgroup> shared: array<f32, 256>;

// Helper function
fn process_value(value: f32) -> f32 {
    return value * params.multiplier + 1.0;
}

@compute @workgroup_size(256, 1, 1)
fn main(
    @builtin(global_invocation_id) global_id: vec3<u32>,
    @builtin(local_invocation_id) local_id: vec3<u32>,
) {
    let idx = global_id.x;
    
    // Bounds check
    if (idx >= params.size) {
        return;
    }
    
    // Load to shared memory
    shared[local_id.x] = input[idx];
    
    // Synchronize
    workgroupBarrier();
    
    // Process
    var result = process_value(shared[local_id.x]);
    
    // Example: reduction sum with neighbors
    if (local_id.x > 0u) {
        result += shared[local_id.x - 1u];
    }
    
    // Write result
    output[idx] = result;
}
Common Patterns
Parallel Reduction (Sum)
wgsl
var<workgroup> scratch: array<f32, 256>;

@compute @workgroup_size(256)
fn reduce_sum(@builtin(local_invocation_id) local_id: vec3<u32>) {
    var tid = local_id.x;
    
    // Load data to scratch (omitted)
    workgroupBarrier();
    
    // Reduction
    var stride = 128u;
    while (stride > 0u) {
        if (tid < stride) {
            scratch[tid] += scratch[tid + stride];
        }
        workgroupBarrier();
        stride /= 2u;
    }
    
    // scratch[0] now contains sum
}
2D Grid Indexing
wgsl
@compute @workgroup_size(16, 16)
fn process_2d(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let x = global_id.x;
    let y = global_id.y;
    let width = 1024u;
    let idx = y * width + x;
    
    // Process data[idx]
}
This cheat sheet covers the most important WGSL features for compute shaders. Keep it handy while coding!

B
WGSL Compute Shader Cheatsheet
Data Types
Scalar Types
wgsl
// Boolean
var b: bool = true;

// Signed integers
var i8: i32 = -128;        // 32-bit signed integer
var i16: i32 = 32767;      
var i32_val: i32 = -2147483648;

// Unsigned integers  
var u8: u32 = 255;         // 32-bit unsigned integer
var u16: u32 = 65535;
var u32_val: u32 = 4294967295;

// Floating point
var f16_val: f16 = 3.14h;  // 16-bit float (if supported)
var f32_val: f32 = 3.14159;
var f64_val: f64 = 3.14159265359; // (if supported)
Vector Types
wgsl
// Vectors (2, 3, or 4 components)
var v2f: vec2<f32> = vec2<f32>(1.0, 2.0);
var v3f: vec3<f32> = vec3<f32>(1.0, 2.0, 3.0);
var v4f: vec4<f32> = vec4<f32>(1.0, 2.0, 3.0, 4.0);

// Shorthand aliases
var v2: vec2f = vec2f(1.0, 2.0);        // vec2<f32>
var v3: vec3f = vec3f(1.0, 2.0, 3.0);   // vec3<f32>
var v4: vec4f = vec4f(1.0, 2.0, 3.0, 4.0); // vec4<f32>

var v2i: vec2i = vec2i(1, 2);           // vec2<i32>
var v3u: vec3u = vec3u(1u, 2u, 3u);     // vec3<u32>

// Vector swizzling
var rgba: vec4f = vec4f(1.0, 2.0, 3.0, 4.0);
var xyz: vec3f = rgba.xyz;  // or .rgb
var xy: vec2f = rgba.xy;    // or .rg
var wzyx: vec4f = rgba.wzyx; // or .abgr
Matrix Types
wgsl
// Matrices (columns x rows)
var m2x2: mat2x2<f32> = mat2x2<f32>(1.0, 2.0, 3.0, 4.0);
var m2x3: mat2x3<f32> = mat2x3<f32>(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
var m3x3: mat3x3<f32> = mat3x3<f32>(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
var m4x4: mat4x4<f32> = mat4x4<f32>(/* 16 values */);

// Shorthand aliases
var m2: mat2x2f = mat2x2f(1.0, 2.0, 3.0, 4.0);
var m3: mat3x3f = mat3x3f(/* 9 values */);
var m4: mat4x4f = mat4x4f(/* 16 values */);

// Access columns
var col0: vec2f = m2[0];
var element: f32 = m2[0][1]; // column 0, row 1
Arrays
wgsl
// Fixed-size arrays
var arr1: array<f32, 5>;                    // 5 floats
var arr2: array<vec3f, 10>;                 // 10 vec3f
var arr3 = array<i32, 3>(1, 2, 3);         // initialized

// Runtime-sized arrays (only in storage buffers)
@group(0) @binding(0) var<storage, read_write> data: array<f32>;

// Array access
var element = arr1[2];
arr1[0] = 5.0;

// Array in structs
struct MyStruct {
    data: array<f32, 100>,
    count: u32,
}
Structs
wgsl
struct Particle {
    position: vec3f,
    velocity: vec3f,
    mass: f32,
    @align(16) color: vec4f,  // explicit alignment
}

// Usage
var p: Particle;
p.position = vec3f(0.0, 0.0, 0.0);
p.velocity = vec3f(1.0, 0.0, 0.0);
Storage Classes & Bindings
wgsl
// Uniform buffer (read-only from shader)
@group(0) @binding(0) var<uniform> config: Config;

// Storage buffers
@group(0) @binding(1) var<storage, read> input_data: array<f32>;
@group(0) @binding(2) var<storage, read_write> output_data: array<f32>;

// Textures and samplers
@group(0) @binding(3) var my_texture: texture_2d<f32>;
@group(0) @binding(4) var my_sampler: sampler;
@group(0) @binding(5) var storage_tex: texture_storage_2d<rgba8unorm, write>;
Math Operators
wgsl
// Arithmetic
var a = 5 + 3;    // addition
var b = 5 - 3;    // subtraction  
var c = 5 * 3;    // multiplication
var d = 5 / 3;    // division
var e = 5 % 3;    // remainder/modulo
var f = -5;       // negation

// Comparison
var eq = a == b;  // equal
var ne = a != b;  // not equal
var lt = a < b;   // less than
var le = a <= b;  // less than or equal
var gt = a > b;   // greater than
var ge = a >= b;  // greater than or equal

// Logical (boolean)
var and = true && false;  // logical AND
var or = true || false;   // logical OR  
var not = !true;          // logical NOT

// Bitwise
var bit_and = 5 & 3;      // bitwise AND
var bit_or = 5 | 3;       // bitwise OR
var bit_xor = 5 ^ 3;      // bitwise XOR
var bit_not = ~5;         // bitwise NOT
var shift_left = 5 << 2;  // left shift
var shift_right = 5 >> 2; // right shift

// Assignment operators
a += 5;   // a = a + 5
a -= 5;   // a = a - 5
a *= 5;   // a = a * 5
a /= 5;   // a = a / 5
a %= 5;   // a = a % 5
a &= 5;   // a = a & 5
a |= 5;   // a = a | 5
a ^= 5;   // a = a ^ 5
a <<= 2;  // a = a << 2
a >>= 2;  // a = a >> 2
Control Flow
wgsl
// If-else statements
if (x > 0) {
    // positive
} else if (x < 0) {
    // negative  
} else {
    // zero
}

// Switch statement
switch(value) {
    case 0: {
        // handle 0
    }
    case 1, 2: {  // multiple cases
        // handle 1 or 2
    }
    default: {
        // handle other values
    }
}

// For loop
for (var i = 0u; i < 10u; i++) {
    // loop body
}

// While loop
var j = 0u;
while (j < 10u) {
    j++;
}

// Loop (infinite loop with break)
var k = 0u;
loop {
    if (k >= 10u) { break; }
    k++;
}

// Continue and break
for (var i = 0u; i < 10u; i++) {
    if (i == 5u) { continue; }  // skip iteration
    if (i == 8u) { break; }      // exit loop
}

// Continuing block (unique to loop)
loop {
    // body
    
    continuing {
        i++;
        break if (i >= 10u);  // conditional break
    }
}
Built-in Functions (Compute-compatible)
Math Functions
wgsl
// Basic math
abs(x)           // absolute value
ceil(x)          // round up
floor(x)         // round down  
round(x)         // round to nearest
trunc(x)         // truncate decimal
sign(x)          // sign (-1, 0, or 1)
min(x, y)        // minimum
max(x, y)        // maximum
clamp(x, low, high) // clamp to range

// Trigonometry
sin(x)           // sine
cos(x)           // cosine
tan(x)           // tangent
asin(x)          // arc sine
acos(x)          // arc cosine
atan(x)          // arc tangent
atan2(y, x)      // arc tangent of y/x
sinh(x)          // hyperbolic sine
cosh(x)          // hyperbolic cosine
tanh(x)          // hyperbolic tangent
asinh(x)         // arc hyperbolic sine
acosh(x)         // arc hyperbolic cosine
atanh(x)         // arc hyperbolic tangent

// Exponential
exp(x)           // e^x
exp2(x)          // 2^x
log(x)           // natural log
log2(x)          // log base 2
pow(x, y)        // x^y
sqrt(x)          // square root
inverseSqrt(x)   // 1/sqrt(x)

// Common functions
degrees(radians) // radians to degrees
radians(degrees) // degrees to radians
fma(a, b, c)     // a * b + c (fused)
mix(x, y, a)     // linear interpolation
step(edge, x)    // 0 if x < edge, else 1
smoothstep(low, high, x) // smooth interpolation
saturate(x)      // clamp(x, 0.0, 1.0)
Vector Functions
wgsl
dot(v1, v2)      // dot product
cross(v1, v2)    // cross product (vec3 only)
distance(p1, p2) // distance between points
length(v)        // vector length
normalize(v)     // normalize vector
reflect(i, n)    // reflection vector
refract(i, n, eta) // refraction vector
faceForward(n, i, nref) // flip normal if needed
Integer/Bit Functions
wgsl
countOneBits(x)      // count set bits
countLeadingZeros(x) // count leading zeros
countTrailingZeros(x) // count trailing zeros
firstLeadingBit(x)   // first leading 1 bit position
firstTrailingBit(x)  // first trailing 1 bit position
reverseBits(x)       // reverse bit order
extractBits(x, offset, count) // extract bits
insertBits(x, newbits, offset, count) // insert bits
Comparison Functions
wgsl
all(v)           // true if all components true
any(v)           // true if any component true
select(f, t, cond) // conditional select
Array Functions
wgsl
arrayLength(&arr) // length of runtime-sized array
Atomic Functions
wgsl
// For atomic<T> types in storage or workgroup memory
atomicLoad(&a)           // atomic load
atomicStore(&a, v)       // atomic store
atomicAdd(&a, v)         // atomic add
atomicSub(&a, v)         // atomic subtract
atomicMax(&a, v)         // atomic maximum
atomicMin(&a, v)         // atomic minimum
atomicAnd(&a, v)         // atomic AND
atomicOr(&a, v)          // atomic OR
atomicXor(&a, v)         // atomic XOR
atomicExchange(&a, v)    // atomic exchange
atomicCompareExchangeWeak(&a, compare, v) // CAS operation
Synchronization
wgsl
storageBarrier()  // storage memory barrier
workgroupBarrier() // workgroup memory barrier
Built-in Variables (Compute)
wgsl
@compute @workgroup_size(64, 1, 1)
fn main(
    @builtin(global_invocation_id) global_id: vec3<u32>,
    @builtin(local_invocation_id) local_id: vec3<u32>,
    @builtin(local_invocation_index) local_index: u32,
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    // global_id: unique ID across all invocations
    // local_id: ID within workgroup (0 to workgroup_size-1)
    // local_index: flattened local_id
    // workgroup_id: workgroup ID
    // num_workgroups: total number of workgroups
}
Workgroup Shared Memory
wgsl
// Declare workgroup shared memory
var<workgroup> shared_data: array<f32, 64>;

@compute @workgroup_size(64)
fn main(@builtin(local_invocation_index) local_idx: u32) {
    // Write to shared memory
    shared_data[local_idx] = f32(local_idx);
    
    // Synchronize workgroup
    workgroupBarrier();
    
    // Read from shared memory
    let value = shared_data[(local_idx + 1u) % 64u];
}
Type Casting
wgsl
// Scalar casting
let i = i32(3.14);      // f32 to i32
let f = f32(42);        // i32 to f32
let u = u32(-1);        // i32 to u32 (bitcast)
let b = bool(1);        // i32 to bool (non-zero = true)

// Vector casting
let v_f32 = vec3f(1.0, 2.0, 3.0);
let v_i32 = vec3i(v_f32);  // vec3f to vec3i

// Bitcast (reinterpret bits)
let bits = bitcast<u32>(3.14f);
let float_back = bitcast<f32>(bits);
Common Patterns
Parallel Reduction
wgsl
var<workgroup> shared: array<f32, 256>;

@compute @workgroup_size(256)
fn reduce(@builtin(local_invocation_index) tid: u32) {
    // Load data
    shared[tid] = data[tid];
    workgroupBarrier();
    
    // Reduction
    for (var s = 128u; s > 0u; s >>= 1u) {
        if (tid < s) {
            shared[tid] += shared[tid + s];
        }
        workgroupBarrier();
    }
    
    // Result in shared[0]
}
2D Grid Dispatch
wgsl
@compute @workgroup_size(16, 16)
fn process_image(
    @builtin(global_invocation_id) id: vec3<u32>
) {
    let width = textureDimensions(input_texture).x;
    let height = textureDimensions(input_texture).y;
    
    if (id.x >= width || id.y >= height) {
        return;
    }
    
    let pixel = textureLoad(input_texture, id.xy, 0);
    // Process pixel...
}
This cheatsheet covers the essential WGSL features for compute shaders. Remember that WGSL is strictly typed and requires explicit type annotations in many places where other languages might infer types.

