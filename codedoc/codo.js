const ty = {
	VOID:"void",
   FLOAT:"float",
	VEC3:"vec3",
	VEC2:"vec2",
	VEC4:"vec4",
    MAT2:"mat2",
    MAT3:"mat3",
    MAT4:"mat4",
    BOOL:"bool",
     INT:"int",
   IVEC2:"ivec2",
   IVEC3:"ivec3",
   IVEC4:"ivec4",
    UINT:"uint",
   UVEC2:"uvec2",
   UVEC3:"uvec3",
   UVEC4:"uvec4",
  MAT2X3:"mat2x3",
  MAT3X2:"mat3x2",
  MAT4X2:"mat4x2",
  MAT2X4:"mat2x4",
  MAT4X3:"mat4x3",
  MAT3X4:"mat3x4",
   BVEC2:"bvec2",
   BVEC3:"bvec3",
   BVEC4:"bvec4"
}
const qs = {IN:"in", OUT:"out", INOUT:"inout"}
const hs = {H0:`·`, H1:`<div class="`, H2:`" id="`, H3:`">`, H4:`</div>`, H5:`▶`, H6:`▷`, H7:`➤`, H8:`expression`}
const cs = {INTERACTIVE:`i`, LINE:`lin`, LEVEL:`lev`, NEW:`"new`, TYPE:`typ`, QUAL:`qua`, ARG:`arg`, NAME:`nam`, FUNC:`fun`, MAIN:`main`, EXPR:`exp`, PHOLDER:`phld`, ASSIGN: `asg`}
const ms = {NAME:"mainImage", COL:"fragColor", COORD:"fragCoord"}
const bs = {SQUARE:`sbr`, LS:`[`, RS:`]`, CURLY:`cbr`, LC:`{`, RC:`}`, ROUND:`rbr`, LR:`(`, RR:`)`}




function getID(){return 0;}

function createDiv(classes, id, content){ return `${hs.H1}${classes}${hs.H2}${id}${hs.H3}${content}${hs.H4}`; }
function createLine(level, content){ return createDiv(`${cs.LINE} ${cs.LEVEL}${level}`, getID(), `${hs.H6}${content}`); }
function createCaret(level){ return createDiv(`${cs.NEW} ${cs.LEVEL}${level}`, getID(), hs.H5);}
function createType(type){ return createDiv(`${cs.TYPE} ${type}`, getID(), type);}
function createName(name=null, type){ let newID = getID(); if(name==null){ name = `${type}${newID}`}; return createDiv(`${cs.NAME} ${name}`, newID, name);}
function createQual(qual){ return createDiv(`${cs.QUAL} ${qual}`, getID(), qual);}
function createArg(qual, type, name){ return createDiv(`${cs.ARG} ${name}`, getID(), `${createQual(qual)} ${createType(type)} ${createName(name)}`);}
function createBraces(type, content){ let left = type==bs.SQUARE?bs.LS:type==bs.CURLY?bs.LC:type==bs.ROUND?bs.LR:bs.LR; let right = type==bs.SQUARE?bs.RS:type==bs.CURLY?bs.RC:type==bs.ROUND?bs.RR:bs.RR; return createDiv(type, getID(), `${left}${content}${right}`) }
function createCode(code){ let content = code==null?createLine(1, createCaret(1)):code; return createBraces(bs.CURLY, content); }
function createArgs(args){ let content = args==null?"":args.join(); return createBraces(bs.ROUND, content); }
function createExpr(type, content){ let classes = `${cs.EXPR} ${type}`; if(content == null){classes = `${classes} ${cs.PHOLDER}`; content = `${type} ${hs.H8}`}; return createDiv(classes, getID(), content); }
function createFunc(type, name, args, code){ let content = `${createType(type)} ${createName(name)} ${createArgs(args)}${createLine(0, createCode(code))}`; return createDiv(`${cs.FUNC} ${cs.MAIN}`, getID(), content); }

function createAssign(name, type, expr){ return createDiv(`${cs.ASSIGN} ${type}`, getID(), `${cs.ASSIGN} = ${expr}`) }

function createMain(){
    let args = [createArg(qs.OUT, ty.VEC4, ms.COL), createArg(qs.IN, ty.VEC2, ms.COORD)];
    let lines = [createLine(1, createCaret(1)), createLine(1, createAssign(ms.COL, ty.VEC4, createExpr(ty.VEC4))), createLine(1, createCaret(1))];
	return createLine(0, createFunc(ty.VOID, ms.NAME, args, lines));
}



/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}
*/