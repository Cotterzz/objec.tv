/*
`.`
`++` `--`
`+` `-` `~` `!`
`*` `%` `/`
`<<` `>>`
`<` `>` `<=` `>=`
`==` `!=` 
`&` 
`^` 
`|` 
`&&` 
`^^` 
`||` 
`?` `:`
`=`
`+=` `-=` `*=` `/=`
`%=` `<<=` `>>=`
`&=` `^=` `|=`
`,`
*/


"use strict";
const ty = {VOID:"void",FLOAT:"float",VEC3:"vec3",VEC2:"vec2",VEC4:"vec4",MAT2:"mat2",MAT3:"mat3",MAT4:"mat4",BOOL:"bool",INT:"int",IVEC2:"ivec2",IVEC3:"ivec3",IVEC4:"ivec4",UINT:"uint",UVEC2:"uvec2",UVEC3:"uvec3",UVEC4:"uvec4",MAT2X3:"mat2x3",MAT3X2:"mat3x2",MAT4X2:"mat4x2",MAT2X4:"mat2x4",MAT4X3:"mat4x3",MAT3X4:"mat3x4", BVEC2:"bvec2", BVEC3:"bvec3", BVEC4:"bvec4"}
const qs = {IN:"in", OUT:"out", INOUT:"inout", PREC:`precision`, LOW:`lowp`, MED:`mediump`, HIGH:`highp`}
const hs = {H0:`·`, H1:`<div class="`, H2:`" id="`, H3:`">`, H4:`</div>`, H5:`▸`, H6:`▷`, H7:`//`, H8:`expression`}
const cs = {INTERACTIVE:`i`, LOCKED:`l`,LINE:`lin`, LEVEL:`lev`, START:`sta`,NEW:`new`, TYPE:`typ`, PREC:`prc`, PREP:`prp`, QUAL:`qua`, ARG:`arg`, NAME:`nam`, NNAME:`nna`,FUNC:`fun`, MAIN:`main`, EXPR:`exp`, PHOLDER:`phld`, ASSIGN: `asg`, COMMENT:`com`, DECL:`dec`}

const bs = {SQUARE:`sbr`, LEFT:`left`, RIGHT:`right`, LS:`[`, RS:`]`, CURLY:`cbr`, LC:`{`, RC:`}`, ROUND:`rbr`, LR:`(`, RR:`)`}
const ps = {H:`#`, VERSION:`version`, DEFINE:`define`, IF:`if`, IFDEF:`ifdef`, ELSE:`else`, ENDIF:`endif`}

const vs = {ES100:`100 es`, ES300:`300 es`, GL330:`330 core`, GL460:`460 core`}

const t0 = {HEAD:"Blank GLSL Document"}
const t1 = {NAME:"mainImage", COL:"fragColor", COORD:"fragCoord", HEAD:"Shadertoy compatible frag shader GLSL ES 300"}
const t2 = {NAME:"main", COL:"outColor", COORD:"gl_FragCoord", HEAD:"WebGL Frag Shader GLSL 300 ES"}

let countID = 0;
function getID(){ countID+=1; return countID;}
let typeIDs = {};
function getTypeID(type){
    let newID = typeIDs[type] ?? 0;
    typeIDs[type] = newID+1;
    return newID;
}

function cDiv(content, ...classes){
    let classString = classes.join(" ");
    return `${hs.H1}${classString}${hs.H2}${getID()}${hs.H3}${content}${hs.H4}`;
}

// single character
function cCaret(level){ return cDiv(hs.H5, level==-1?cs.START:cs.NEW);}
function cLBrace(type){ let left = type==bs.SQUARE?bs.LS:type==bs.CURLY?bs.LC:type==bs.ROUND?bs.LR:bs.LR; return cDiv(left, type, bs.LEFT)}
function cRBrace(type){ let right = type==bs.SQUARE?bs.RS:type==bs.CURLY?bs.RC:type==bs.ROUND?bs.RR:bs.RR; return cDiv(right, type, bs.RIGHT)}

// single word
function cType(type){ return cDiv(type, cs.TYPE, type);}
function cNum(type){ return cDiv("0", cs.INTERACTIVE, type, "num");}
function cQual(qual){ return cDiv(qual, cs.QUAL, qual);}
function cName(name){ return cDiv(name, cs.NAME, name);}
function cNewName(type){ name = `my${type}${getTypeID(type)}`; return cDiv(name, cs.NNAME, name);}

//container
function cLine(level, content){ return cDiv(`${hs.H0}${content}`, cs.LINE, `${cs.LEVEL}${level}`); }
function cBraces(type, content){ let right = type==bs.CURLY?cLine(0, cRBrace(type)):cRBrace(type);return cDiv(`${cLBrace(type)}${content}${right}`, type) }
function cArgs(args){ let content = args?args.join(", "):""; return cBraces(bs.ROUND, ` ${content} `); }
function cCode(code){ let content = code?code.join(""):cLine(1, cCaret(1)); return cBraces(bs.CURLY, content); }
function cExpr(type, content, inter){
    if(content==null){ 
        return cDiv(`${type}${hs.H8}`, inter?cs.INTERACTIVE:cs.LOCKED, cs.EXPR, type, cs.PHOLDER);
    } else {
        return cDiv(content, inter?cs.INTERACTIVE:cs.LOCKED, cs.EXPR, type);
    }
}

//compound
function cArg(qual, type, name){ return cDiv(`${cQual(qual)} ${cType(type)} ${cName(name)}`, cs.ARG, name);}

//lines
function cFunc(type, name, args, code){ let content = `${cType(type)} ${cName(name)} ${cArgs(args)}${cLine(0, cCode(code))}`; return cDiv(content, cs.FUNC, cs.MAIN); }
function cAssign(name, type, expr, inter){ return cDiv(`${cName(name)} = ${cExpr(type, expr, inter)};`, cs.ASSIGN, type) }
function cComment(content){ return cDiv(`${hs.H7} ${content}`, cs.COMMENT);}
function cPrec(option, type){ return cDiv(`${qs.PREC} ${option} ${cType(type)};`, cs.PREC) }
function cPP(directive, content){ return cDiv(`${ps.H}${directive} ${content}`, cs.PREP) }
function cDecl(type, name, quals){ return cDiv(`${quals?quals+" ":""}${cType(type)} ${name?cName(name):cNewName(type)};`, cs.DECL)}


// placeholder
// declandassign
// lit
// if
// for
// ternary
// switch
// append else
// append case   

function cSTMain(){let args = [cArg(qs.OUT, ty.VEC4, t1.COL), cArg(qs.IN, ty.VEC2, t1.COORD)];
    let lines = [ cLine(1, cCaret(1)), cLine(1, cAssign(t1.COL, ty.VEC4, null, false))];
    return cLine(0, cFunc(ty.VOID, t1.NAME, args, lines));}


const headers = [];

headers[0] = cLine(0, cComment(t0.HEAD))+cLine(0, cCaret(0));
headers[1] = cLine(0, cComment(t1.HEAD))+cLine(0, cCaret(0))+cSTMain();
headers[2] = cLine(0, cComment(t2.HEAD))+cLine(0, cPP(ps.VERSION, vs.ES300))+cLine(0, cPrec(qs.HIGH, ty.FLOAT))+cLine(0, cDecl(ty.VEC4, t2.COL, cQual(qs.OUT)))+cLine(0, cFunc(ty.VOID, t2.NAME, null, [ cLine(1, cDecl(ty.INT, null, null)), cLine(1, cAssign("myint0", ty.VEC4, cNum(ty.INT) , false))]));

document.getElementById("code").innerHTML = cCaret(-1);
      
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

var prevalue = 0;
var dragging = false;
var drag = {
    data:null,
    target: null,
    level: null,
    origin:{x:0, y:0},
    amount:{x:0, y:0},
    mode:null} 

function debugOutput(){
        // html to second box
        var houtput = document.getElementById("html");
        var cinput = document.getElementById("code");
        var h = document.createTextNode(cinput.innerHTML);
        houtput.replaceChild(h, houtput.childNodes[0]); }

function isLineEmpty(div){
    if(div.childNodes[1].classList.contains("new") || div.childNodes[1].classList.contains("cbr")) {return true;} else {return false;}
}

function getLev(line){
    let lev = null;
    console.log(line);
    if(line.classList.contains("lev0")){lev = 0;}
    if(line.classList.contains("lev1")){lev = 1;}
    if(line.classList.contains("lev2")){lev = 2;}
    if(line.classList.contains("lev3")){lev = 3;}
    if(line.classList.contains("lev4")){lev = 4;}
    return lev;
}

function createLineMoveArray(line, lev, num){
    let rstring = "";
    for(var i=0; i<num; i++){
        rstring += cLine(lev, cCaret(lev));
    }
    rstring += line;
    return rstring;
}

function cTemp(content){ return `${hs.H1}temp${hs.H2}temp${hs.H3}${content}${hs.H4}`; }

function onDocumentMouseDown(event){
        if (event.target.classList.contains("lin")){
            if(!isLineEmpty(event.target)){
                drag.level = getLev(event.target);
                drag.content = event.target.outerHTML;
                event.target.outerHTML = cTemp(createLineMoveArray(event.target.outerHTML, drag.level, 0));
                drag.target = document.getElementById("temp");
                drag.origin.x = event.clientX;
                drag.origin.y = event.clientY;
                dragging=true;
                drag.mode = "lin";
                }
        } else if (event.target.classList.contains("sta")){
          drag.origin.x = event.clientX;
          drag.origin.y = event.clientY;
          dragging=true;
          drag.mode = "sta";
        } else if (event.target.classList.contains("int") && event.target.classList.contains("i")){
          drag.origin.x = event.clientX;
          drag.origin.y = event.clientY;
          dragging=true;
          drag.mode = "int";
          drag.target = event.target;
          prevalue = Number(drag.target.childNodes[0].textContent);
          //const rect = drag.target.getBoundingClientRect();
        }
        var houtput = document.getElementById("html");
        var cinput = document.getElementById("code");
        var h = document.createTextNode(cinput.innerHTML);
        houtput.replaceChild(h, houtput.childNodes[0]);

        var output = document.getElementById("output");
        var o = document.createTextNode(event.target.classList);
        output.replaceChild(o, output.childNodes[0]);}


      
function onDocumentMouseMove(event){

        if(dragging){
          event.preventDefault();
          drag.amount.x =  event.clientX - drag.origin.x;
          drag.amount.y = drag.origin.y - event.clientY;
          if(drag.mode=="lin"){
            let space = -15;
            if(drag.amount.y<space){
                drag.target.outerHTML = cTemp(createLineMoveArray(drag.content, drag.level, Math.floor(drag.amount.y/space)-1));
                drag.target = document.getElementById("temp");
            }
            
            } else if(drag.mode=="sta"){
            var step = 50;
            if(drag.amount.x<step){
                document.getElementById("code").innerHTML = headers[0];
            } else if(drag.amount.x<step*2){
                document.getElementById("code").innerHTML = headers[1];
            } else {document.getElementById("code").innerHTML = headers[2];}

            } else if(drag.mode=="int"){
          // These are the drag areas, above the text line are positive numbers with a coefficient higher than 1
          // Below are negative numbers with a coefficient higher than 1
          //                           2   /
          //                      ________/
          //                 1    ________|   0
          //                              \
          //                           3   \
          var darea, coeff, expon, total=0;
          var asize = 15;
          if(drag.amount.x<-asize && -drag.amount.x+asize>(Math.abs(drag.amount.y)-asize)/2){
            darea = coeff = expon = 0;
          } else if (drag.amount.y>asize){
            darea=2;
            coeff = drag.amount.y-asize+10;
          } else if (drag.amount.y<-asize){
            darea=3;
            coeff = drag.amount.y-asize+25;
            if(coeff>-10){coeff=-10;}
          } else {
            darea=1;
            coeff = 1;
          }
          if(darea>0){
            expon = -1+Math.floor((drag.amount.x)/10);
            if(expon<-1){expon=-1;}
            if(expon>18){expon=18;}
          }
          if(coeff>99){coeff=99;}
          if(coeff<-99){coeff=-99;}
          if(coeff>0){
            total = Math.floor(coeff*Math.pow(10, expon));
            } else {total = Math.ceil(coeff*Math.pow(10, expon));}
          total = total+prevalue;
          var t = document.createTextNode(total);
          drag.target.replaceChild(t, drag.target.childNodes[0]);
        }
    }
}

function onDocumentMouseUp(event){
    event.preventDefault();//if(dragged.childNodes[0].textContent != "0"){dmode=1;};
    let temp = document.getElementById("temp");
    if(temp){temp.outerHTML = temp.innerHTML;}
    dragging = false;}
