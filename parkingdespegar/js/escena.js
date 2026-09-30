(()=>{var Mc=0,iA=1,yc=2;var sA=1,ca=2,dn=3,vn=0,Ce=1,ze=2,yn=0,ti=1,rA=2,aA=3,oA=4,_c=5,Gn=100,bc=101,Dc=102,Sc=103,Ic=104,Tc=200,Rc=201,Pc=202,Fc=203,Rr=204,Pr=205,Lc=206,Nc=207,Oc=208,Hc=209,Gc=210,Qc=211,Uc=212,zc=213,Vc=214,la=0,ha=1,ua=2,ei=3,fa=4,da=5,pa=6,ma=7,ga=0,Yc=1,Wc=2,_n=0,kc=1,Jc=2,Kc=3,Zc=4,Xc=5,qc=6,Ea=7;var AA=300,ci=301,li=302,wa=303,xa=304,Ks=306,Fr=1e3,Hn=1001,Lr=1002,Ge=1003,jc=1004;var Zs=1005;var on=1006,Ba=1007;var Yn=1008;var cn=1009,cA=1010,lA=1011,Wi=1012,va=1013,Wn=1014,ln=1015,ki=1016,Ca=1017,Ma=1018,Ji=1020,hA=35902,uA=35899,fA=1021,dA=1022,tn=1023,Pi=1026,Ki=1027,ya=1028,_a=1029,pA=1030,ba=1031;var Da=1033,Xs=33776,qs=33777,js=33778,$s=33779,Sa=35840,Ia=35841,Ta=35842,Ra=35843,Pa=36196,Fa=37492,La=37496,Na=37808,Oa=37809,Ha=37810,Ga=37811,Qa=37812,Ua=37813,za=37814,Va=37815,Ya=37816,Wa=37817,ka=37818,Ja=37819,Ka=37820,Za=37821,Xa=36492,qa=36494,ja=36495,$a=36283,to=36284,eo=36285,no=36286;var ms=2300,Nr=2301,Tr=2302,Wo=2400,ko=2401,Jo=2402;var $c=3200,tl=3201;var io=0,el=1,bn="",Fe="srgb",ni="srgb-linear",gs="linear",ne="srgb";var jn=7680;var Ko=519,nl=512,il=513,sl=514,mA=515,rl=516,al=517,ol=518,Al=519,Zo=35044;var gA="300 es",an=2e3,Es=2001;var Cn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qA=1234567,us=Math.PI/180,Fi=180/Math.PI;function hi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ye[i&255]+ye[i>>8&255]+ye[i>>16&255]+ye[i>>24&255]+"-"+ye[t&255]+ye[t>>8&255]+"-"+ye[t>>16&15|64]+ye[t>>24&255]+"-"+ye[e&63|128]+ye[e>>8&255]+"-"+ye[e>>16&255]+ye[e>>24&255]+ye[n&255]+ye[n>>8&255]+ye[n>>16&255]+ye[n>>24&255]).toLowerCase()}function kt(i,t,e){return Math.max(t,Math.min(e,i))}function EA(i,t){return(i%t+t)%t}function lh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function hh(i,t,e){return i!==t?(e-i)/(t-i):0}function fs(i,t,e){return(1-e)*i+e*t}function uh(i,t,e,n){return fs(i,t,1-Math.exp(-e*n))}function fh(i,t=1){return t-Math.abs(EA(i,t*2)-t)}function dh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ph(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function mh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function gh(i,t){return i+Math.random()*(t-i)}function Eh(i){return i*(.5-Math.random())}function wh(i){i!==void 0&&(qA=i);let t=qA+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xh(i){return i*us}function Bh(i){return i*Fi}function vh(i){return(i&i-1)===0&&i!==0}function Ch(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Mh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yh(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),A=a(e/2),c=r((t+n)/2),l=a((t+n)/2),h=r((t-n)/2),u=a((t-n)/2),d=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*l,A*h,A*u,o*c);break;case"YZY":i.set(A*u,o*l,A*h,o*c);break;case"ZXZ":i.set(A*h,A*u,o*l,o*c);break;case"XZX":i.set(o*l,A*m,A*d,o*c);break;case"YXY":i.set(A*d,o*l,A*m,o*c);break;case"ZYZ":i.set(A*m,A*d,o*l,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ti(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var so={DEG2RAD:us,RAD2DEG:Fi,generateUUID:hi,clamp:kt,euclideanModulo:EA,mapLinear:lh,inverseLerp:hh,lerp:fs,damp:uh,pingpong:fh,smoothstep:dh,smootherstep:ph,randInt:mh,randFloat:gh,randFloatSpread:Eh,seededRandom:wh,degToRad:xh,radToDeg:Bh,isPowerOfTwo:vh,ceilPowerOfTwo:Ch,floorPowerOfTwo:Mh,setQuaternionFromProperEuler:yh,normalize:Pe,denormalize:Ti},mt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},An=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let A=n[s+0],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a+0],d=r[a+1],m=r[a+2],E=r[a+3];if(o===0){t[e+0]=A,t[e+1]=c,t[e+2]=l,t[e+3]=h;return}if(o===1){t[e+0]=u,t[e+1]=d,t[e+2]=m,t[e+3]=E;return}if(h!==E||A!==u||c!==d||l!==m){let p=1-o,f=A*u+c*d+l*m+h*E,M=f>=0?1:-1,C=1-f*f;if(C>Number.EPSILON){let S=Math.sqrt(C),_=Math.atan2(S,f*M);p=Math.sin(p*_)/S,o=Math.sin(o*_)/S}let x=o*M;if(A=A*p+u*x,c=c*p+d*x,l=l*p+m*x,h=h*p+E*x,p===1-o){let S=1/Math.sqrt(A*A+c*c+l*l+h*h);A*=S,c*=S,l*=S,h*=S}}t[e]=A,t[e+1]=c,t[e+2]=l,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],A=n[s+1],c=n[s+2],l=n[s+3],h=r[a],u=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+l*h+A*d-c*u,t[e+1]=A*m+l*u+c*h-o*d,t[e+2]=c*m+l*d+o*u-A*h,t[e+3]=l*m-o*h-A*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,A=Math.sin,c=o(n/2),l=o(s/2),h=o(r/2),u=A(n/2),d=A(s/2),m=A(r/2);switch(a){case"XYZ":this._x=u*l*h+c*d*m,this._y=c*d*h-u*l*m,this._z=c*l*m+u*d*h,this._w=c*l*h-u*d*m;break;case"YXZ":this._x=u*l*h+c*d*m,this._y=c*d*h-u*l*m,this._z=c*l*m-u*d*h,this._w=c*l*h+u*d*m;break;case"ZXY":this._x=u*l*h-c*d*m,this._y=c*d*h+u*l*m,this._z=c*l*m+u*d*h,this._w=c*l*h-u*d*m;break;case"ZYX":this._x=u*l*h-c*d*m,this._y=c*d*h+u*l*m,this._z=c*l*m-u*d*h,this._w=c*l*h+u*d*m;break;case"YZX":this._x=u*l*h+c*d*m,this._y=c*d*h+u*l*m,this._z=c*l*m-u*d*h,this._w=c*l*h-u*d*m;break;case"XZY":this._x=u*l*h-c*d*m,this._y=c*d*h-u*l*m,this._z=c*l*m+u*d*h,this._w=c*l*h+u*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],A=e[9],c=e[2],l=e[6],h=e[10],u=n+o+h;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(l-A)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(l-A)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(A+l)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(A+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,A=e._y,c=e._z,l=e._w;return this._x=n*l+a*o+s*c-r*A,this._y=s*l+a*A+r*o-n*c,this._z=r*l+a*c+n*A-s*o,this._w=a*l-n*o-s*A-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let A=1-o*o;if(A<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(A),l=Math.atan2(c,o),h=Math.sin((1-e)*l)/c,u=Math.sin(e*l)/c;return this._w=a*h+this._w*u,this._x=n*h+this._x*u,this._y=s*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jA.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jA.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,A=t.w,c=2*(a*s-o*n),l=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+A*c+a*h-o*l,this.y=n+A*l+o*c-r*h,this.z=s+A*h+r*l-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,A=e.z;return this.x=s*A-r*o,this.y=r*a-n*A,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wo.copy(this).projectOnVector(t),this.sub(wo)}reflect(t){return this.sub(wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wo=new P,jA=new An,Vt=class i{constructor(t,e,n,s,r,a,o,A,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,A,c)}set(t,e,n,s,r,a,o,A,c){let l=this.elements;return l[0]=t,l[1]=s,l[2]=o,l[3]=e,l[4]=r,l[5]=A,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],A=n[6],c=n[1],l=n[4],h=n[7],u=n[2],d=n[5],m=n[8],E=s[0],p=s[3],f=s[6],M=s[1],C=s[4],x=s[7],S=s[2],_=s[5],R=s[8];return r[0]=a*E+o*M+A*S,r[3]=a*p+o*C+A*_,r[6]=a*f+o*x+A*R,r[1]=c*E+l*M+h*S,r[4]=c*p+l*C+h*_,r[7]=c*f+l*x+h*R,r[2]=u*E+d*M+m*S,r[5]=u*p+d*C+m*_,r[8]=u*f+d*x+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],A=t[6],c=t[7],l=t[8];return e*a*l-e*o*c-n*r*l+n*o*A+s*r*c-s*a*A}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],A=t[6],c=t[7],l=t[8],h=l*a-o*c,u=o*A-l*r,d=c*r-a*A,m=e*h+n*u+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let E=1/m;return t[0]=h*E,t[1]=(s*c-l*n)*E,t[2]=(o*n-s*a)*E,t[3]=u*E,t[4]=(l*e-s*A)*E,t[5]=(s*r-o*e)*E,t[6]=d*E,t[7]=(n*A-c*e)*E,t[8]=(a*e-n*r)*E,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let A=Math.cos(r),c=Math.sin(r);return this.set(n*A,n*c,-n*(A*a+c*o)+a+t,-s*c,s*A,-s*(-c*a+A*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(xo.makeScale(t,e)),this}rotate(t){return this.premultiply(xo.makeRotation(-t)),this}translate(t,e){return this.premultiply(xo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},xo=new Vt;function wA(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ws(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cl(){let i=ws("canvas");return i.style.display="block",i}var $A={};function Li(i){i in $A||($A[i]=!0,console.warn(i))}function ll(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var tc=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _h(){let i={enabled:!0,workingColorSpace:ni,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ne&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ne&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bn?gs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Li("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Li("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ni]:{primaries:t,whitePoint:n,transfer:gs,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),i}var jt=_h();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ei,Or=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ei===void 0&&(Ei=ws("canvas")),Ei.width=t.width,Ei.height=t.height;let s=Ei.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ei}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=ws("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},bh=0,Ni=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=hi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Bo(s[a].image)):r.push(Bo(s[a]))}else r=Bo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Bo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Or.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Dh=0,vo=new P,Le=class i extends Cn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Hn,s=Hn,r=on,a=Yn,o=tn,A=cn,c=i.DEFAULT_ANISOTROPY,l=bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=hi(),this.name="",this.source=new Ni(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=A,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==AA)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fr:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case Lr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fr:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case Lr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=AA;Le.DEFAULT_ANISOTROPY=1;var ee=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,A=t.elements,c=A[0],l=A[4],h=A[8],u=A[1],d=A[5],m=A[9],E=A[2],p=A[6],f=A[10];if(Math.abs(l-u)<.01&&Math.abs(h-E)<.01&&Math.abs(m-p)<.01){if(Math.abs(l+u)<.1&&Math.abs(h+E)<.1&&Math.abs(m+p)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let C=(c+1)/2,x=(d+1)/2,S=(f+1)/2,_=(l+u)/4,R=(h+E)/4,F=(m+p)/4;return C>x&&C>S?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=_/n,r=R/n):x>S?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=_/s,r=F/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=R/r,s=F/r),this.set(n,s,r,e),this}let M=Math.sqrt((p-m)*(p-m)+(h-E)*(h-E)+(u-l)*(u-l));return Math.abs(M)<.001&&(M=1),this.x=(p-m)/M,this.y=(h-E)/M,this.z=(u-l)/M,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Hr=class extends Cn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new Le(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ni(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Hr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},xs=class extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Gr=class extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),lr.subVectors(this.max,ss),wi.subVectors(t.a,ss),xi.subVectors(t.b,ss),Bi.subVectors(t.c,ss),Tn.subVectors(xi,wi),Rn.subVectors(Bi,xi),Kn.subVectors(wi,Bi);let e=[0,-Tn.z,Tn.y,0,-Rn.z,Rn.y,0,-Kn.z,Kn.y,Tn.z,0,-Tn.x,Rn.z,0,-Rn.x,Kn.z,0,-Kn.x,-Tn.y,Tn.x,0,-Rn.y,Rn.x,0,-Kn.y,Kn.x,0];return!Co(e,wi,xi,Bi,lr)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,wi,xi,Bi,lr))?!1:(hr.crossVectors(Tn,Rn),e=[hr.x,hr.y,hr.z],Co(e,wi,xi,Bi,lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},mn=[new P,new P,new P,new P,new P,new P,new P,new P],nn=new P,cr=new fn,wi=new P,xi=new P,Bi=new P,Tn=new P,Rn=new P,Kn=new P,ss=new P,lr=new P,hr=new P,Zn=new P;function Co(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zn.fromArray(i,r);let o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),A=t.dot(Zn),c=e.dot(Zn),l=n.dot(Zn);if(Math.max(-Math.max(A,c,l),Math.min(A,c,l))>o)return!1}return!0}var Sh=new fn,rs=new P,Mo=new P,Qn=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Sh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);let e=rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Mo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(Mo)),this.expandByPoint(rs.copy(t.center).sub(Mo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},gn=new P,yo=new P,ur=new P,Pn=new P,_o=new P,fr=new P,bo=new P,Qr=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gn.copy(this.origin).addScaledVector(this.direction,e),gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){yo.copy(t).add(e).multiplyScalar(.5),ur.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(yo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ur),o=Pn.dot(this.direction),A=-Pn.dot(ur),c=Pn.lengthSq(),l=Math.abs(1-a*a),h,u,d,m;if(l>0)if(h=a*A-o,u=a*o-A,m=r*l,h>=0)if(u>=-m)if(u<=m){let E=1/l;h*=E,u*=E,d=h*(h+a*u+2*o)+u*(a*h+u+2*A)+c}else u=r,h=Math.max(0,-(a*u+o)),d=-h*h+u*(u+2*A)+c;else u=-r,h=Math.max(0,-(a*u+o)),d=-h*h+u*(u+2*A)+c;else u<=-m?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-A),r),d=-h*h+u*(u+2*A)+c):u<=m?(h=0,u=Math.min(Math.max(-r,-A),r),d=u*(u+2*A)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-A),r),d=-h*h+u*(u+2*A)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),d=-h*h+u*(u+2*A)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(yo).addScaledVector(ur,u),d}intersectSphere(t,e){gn.subVectors(t.center,this.origin);let n=gn.dot(this.direction),s=gn.dot(gn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,A=n+a;return A<0?null:o<0?this.at(A,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,A,c=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),l>=0?(r=(t.min.y-u.y)*l,a=(t.max.y-u.y)*l):(r=(t.max.y-u.y)*l,a=(t.min.y-u.y)*l),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-u.z)*h,A=(t.max.z-u.z)*h):(o=(t.max.z-u.z)*h,A=(t.min.z-u.z)*h),n>A||o>s)||((o>n||n!==n)&&(n=o),(A<s||s!==s)&&(s=A),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,gn)!==null}intersectTriangle(t,e,n,s,r){_o.subVectors(e,t),fr.subVectors(n,t),bo.crossVectors(_o,fr);let a=this.direction.dot(bo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,t);let A=o*this.direction.dot(fr.crossVectors(Pn,fr));if(A<0)return null;let c=o*this.direction.dot(_o.cross(Pn));if(c<0||A+c>a)return null;let l=-o*Pn.dot(bo);return l<0?null:this.at(l/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class i{constructor(t,e,n,s,r,a,o,A,c,l,h,u,d,m,E,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,A,c,l,h,u,d,m,E,p)}set(t,e,n,s,r,a,o,A,c,l,h,u,d,m,E,p){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=A,f[2]=c,f[6]=l,f[10]=h,f[14]=u,f[3]=d,f[7]=m,f[11]=E,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/vi.setFromMatrixColumn(t,0).length(),r=1/vi.setFromMatrixColumn(t,1).length(),a=1/vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),A=Math.cos(s),c=Math.sin(s),l=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let u=a*l,d=a*h,m=o*l,E=o*h;e[0]=A*l,e[4]=-A*h,e[8]=c,e[1]=d+m*c,e[5]=u-E*c,e[9]=-o*A,e[2]=E-u*c,e[6]=m+d*c,e[10]=a*A}else if(t.order==="YXZ"){let u=A*l,d=A*h,m=c*l,E=c*h;e[0]=u+E*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*h,e[5]=a*l,e[9]=-o,e[2]=d*o-m,e[6]=E+u*o,e[10]=a*A}else if(t.order==="ZXY"){let u=A*l,d=A*h,m=c*l,E=c*h;e[0]=u-E*o,e[4]=-a*h,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*l,e[9]=E-u*o,e[2]=-a*c,e[6]=o,e[10]=a*A}else if(t.order==="ZYX"){let u=a*l,d=a*h,m=o*l,E=o*h;e[0]=A*l,e[4]=m*c-d,e[8]=u*c+E,e[1]=A*h,e[5]=E*c+u,e[9]=d*c-m,e[2]=-c,e[6]=o*A,e[10]=a*A}else if(t.order==="YZX"){let u=a*A,d=a*c,m=o*A,E=o*c;e[0]=A*l,e[4]=E-u*h,e[8]=m*h+d,e[1]=h,e[5]=a*l,e[9]=-o*l,e[2]=-c*l,e[6]=d*h+m,e[10]=u-E*h}else if(t.order==="XZY"){let u=a*A,d=a*c,m=o*A,E=o*c;e[0]=A*l,e[4]=-h,e[8]=c*l,e[1]=u*h+E,e[5]=a*l,e[9]=d*h-m,e[2]=m*h-d,e[6]=o*l,e[10]=E*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ih,t,Th)}lookAt(t,e,n){let s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Fn.crossVectors(n,We),Fn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Fn.crossVectors(n,We)),Fn.normalize(),dr.crossVectors(We,Fn),s[0]=Fn.x,s[4]=dr.x,s[8]=We.x,s[1]=Fn.y,s[5]=dr.y,s[9]=We.y,s[2]=Fn.z,s[6]=dr.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],A=n[8],c=n[12],l=n[1],h=n[5],u=n[9],d=n[13],m=n[2],E=n[6],p=n[10],f=n[14],M=n[3],C=n[7],x=n[11],S=n[15],_=s[0],R=s[4],F=s[8],B=s[12],w=s[1],D=s[5],O=s[9],b=s[13],L=s[2],U=s[6],G=s[10],k=s[14],z=s[3],j=s[7],At=s[11],ft=s[15];return r[0]=a*_+o*w+A*L+c*z,r[4]=a*R+o*D+A*U+c*j,r[8]=a*F+o*O+A*G+c*At,r[12]=a*B+o*b+A*k+c*ft,r[1]=l*_+h*w+u*L+d*z,r[5]=l*R+h*D+u*U+d*j,r[9]=l*F+h*O+u*G+d*At,r[13]=l*B+h*b+u*k+d*ft,r[2]=m*_+E*w+p*L+f*z,r[6]=m*R+E*D+p*U+f*j,r[10]=m*F+E*O+p*G+f*At,r[14]=m*B+E*b+p*k+f*ft,r[3]=M*_+C*w+x*L+S*z,r[7]=M*R+C*D+x*U+S*j,r[11]=M*F+C*O+x*G+S*At,r[15]=M*B+C*b+x*k+S*ft,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],A=t[9],c=t[13],l=t[2],h=t[6],u=t[10],d=t[14],m=t[3],E=t[7],p=t[11],f=t[15];return m*(+r*A*h-s*c*h-r*o*u+n*c*u+s*o*d-n*A*d)+E*(+e*A*d-e*c*u+r*a*u-s*a*d+s*c*l-r*A*l)+p*(+e*c*h-e*o*d-r*a*h+n*a*d+r*o*l-n*c*l)+f*(-s*o*l-e*A*h+e*o*u+s*a*h-n*a*u+n*A*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],A=t[6],c=t[7],l=t[8],h=t[9],u=t[10],d=t[11],m=t[12],E=t[13],p=t[14],f=t[15],M=h*p*c-E*u*c+E*A*d-o*p*d-h*A*f+o*u*f,C=m*u*c-l*p*c-m*A*d+a*p*d+l*A*f-a*u*f,x=l*E*c-m*h*c+m*o*d-a*E*d-l*o*f+a*h*f,S=m*h*A-l*E*A-m*o*u+a*E*u+l*o*p-a*h*p,_=e*M+n*C+s*x+r*S;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/_;return t[0]=M*R,t[1]=(E*u*r-h*p*r-E*s*d+n*p*d+h*s*f-n*u*f)*R,t[2]=(o*p*r-E*A*r+E*s*c-n*p*c-o*s*f+n*A*f)*R,t[3]=(h*A*r-o*u*r-h*s*c+n*u*c+o*s*d-n*A*d)*R,t[4]=C*R,t[5]=(l*p*r-m*u*r+m*s*d-e*p*d-l*s*f+e*u*f)*R,t[6]=(m*A*r-a*p*r-m*s*c+e*p*c+a*s*f-e*A*f)*R,t[7]=(a*u*r-l*A*r+l*s*c-e*u*c-a*s*d+e*A*d)*R,t[8]=x*R,t[9]=(m*h*r-l*E*r-m*n*d+e*E*d+l*n*f-e*h*f)*R,t[10]=(a*E*r-m*o*r+m*n*c-e*E*c-a*n*f+e*o*f)*R,t[11]=(l*o*r-a*h*r-l*n*c+e*h*c+a*n*d-e*o*d)*R,t[12]=S*R,t[13]=(l*E*s-m*h*s+m*n*u-e*E*u-l*n*p+e*h*p)*R,t[14]=(m*o*s-a*E*s-m*n*A+e*E*A+a*n*p-e*o*p)*R,t[15]=(a*h*s-l*o*s+l*n*A-e*h*A-a*n*u+e*o*u)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,A=t.z,c=r*a,l=r*o;return this.set(c*a+n,c*o-s*A,c*A+s*o,0,c*o+s*A,l*o+n,l*A-s*a,0,c*A-s*o,l*A+s*a,r*A*A+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,A=e._w,c=r+r,l=a+a,h=o+o,u=r*c,d=r*l,m=r*h,E=a*l,p=a*h,f=o*h,M=A*c,C=A*l,x=A*h,S=n.x,_=n.y,R=n.z;return s[0]=(1-(E+f))*S,s[1]=(d+x)*S,s[2]=(m-C)*S,s[3]=0,s[4]=(d-x)*_,s[5]=(1-(u+f))*_,s[6]=(p+M)*_,s[7]=0,s[8]=(m+C)*R,s[9]=(p-M)*R,s[10]=(1-(u+E))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=vi.set(s[0],s[1],s[2]).length(),a=vi.set(s[4],s[5],s[6]).length(),o=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],sn.copy(this);let c=1/r,l=1/a,h=1/o;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=l,sn.elements[5]*=l,sn.elements[6]*=l,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,e.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=an,A=!1){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),m,E;if(A)m=r/(a-r),E=a*r/(a-r);else if(o===an)m=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===Es)m=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=an,A=!1){let c=this.elements,l=2/(e-t),h=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s),m,E;if(A)m=1/(a-r),E=a/(a-r);else if(o===an)m=-2/(a-r),E=-(a+r)/(a-r);else if(o===Es)m=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},vi=new P,sn=new se,Ih=new P(0,0,0),Th=new P(1,1,1),Fn=new P,dr=new P,We=new P,nc=new se,ic=new An,Qe=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],A=s[1],c=s[5],l=s[9],h=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(A,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(A,r));break;case"ZYX":this._y=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(A,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(kt(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qe.DEFAULT_ORDER="XYZ";var Bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Rh=0,sc=new P,Ci=new An,En=new se,pr=new P,as=new P,Ph=new P,Fh=new An,rc=new P(1,0,0),ac=new P(0,1,0),oc=new P(0,0,1),Ac={type:"added"},Lh={type:"removed"},Mi={type:"childadded",child:null},Do={type:"childremoved",child:null},xe=class i extends Cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new Qe,n=new An,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Vt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(rc,t)}rotateY(t){return this.rotateOnAxis(ac,t)}rotateZ(t){return this.rotateOnAxis(oc,t)}translateOnAxis(t,e){return sc.copy(t).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rc,t)}translateY(t){return this.translateOnAxis(ac,t)}translateZ(t){return this.translateOnAxis(oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?pr.copy(t):pr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(as,pr,this.up):En.lookAt(pr,as,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(En),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ac),Mi.child=t,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lh),Do.child=t,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ac),Mi.child=t,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,Ph),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,Fh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,A){return o[A.uuid]===void 0&&(o[A.uuid]=A.toJSON(t)),A.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let A=o.shapes;if(Array.isArray(A))for(let c=0,l=A.length;c<l;c++){let h=A[c];r(t.shapes,h)}else r(t.shapes,A)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let A=0,c=this.material.length;A<c;A++)o.push(r(t.materials,this.material[A]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let A=this.animations[o];s.animations.push(r(t.animations,A))}}if(e){let o=a(t.geometries),A=a(t.materials),c=a(t.textures),l=a(t.images),h=a(t.shapes),u=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),A.length>0&&(n.materials=A),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let A=[];for(let c in o){let l=o[c];delete l.metadata,A.push(l)}return A}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};xe.DEFAULT_UP=new P(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rn=new P,wn=new P,So=new P,xn=new P,yi=new P,_i=new P,cc=new P,Io=new P,To=new P,Ro=new P,Po=new ee,Fo=new ee,Lo=new ee,On=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),wn.subVectors(n,e),So.subVectors(t,e);let a=rn.dot(rn),o=rn.dot(wn),A=rn.dot(So),c=wn.dot(wn),l=wn.dot(So),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let u=1/h,d=(c*A-o*l)*u,m=(a*l-o*A)*u;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(t,e,n,s,r,a,o,A){return this.getBarycoord(t,e,n,s,xn)===null?(A.x=0,A.y=0,"z"in A&&(A.z=0),"w"in A&&(A.w=0),null):(A.setScalar(0),A.addScaledVector(r,xn.x),A.addScaledVector(a,xn.y),A.addScaledVector(o,xn.z),A)}static getInterpolatedAttribute(t,e,n,s,r,a){return Po.setScalar(0),Fo.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(t,e),Fo.fromBufferAttribute(t,n),Lo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Po,r.x),a.addScaledVector(Fo,r.y),a.addScaledVector(Lo,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),wn.subVectors(t,e),rn.cross(wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),rn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;yi.subVectors(s,n),_i.subVectors(r,n),Io.subVectors(t,n);let A=yi.dot(Io),c=_i.dot(Io);if(A<=0&&c<=0)return e.copy(n);To.subVectors(t,s);let l=yi.dot(To),h=_i.dot(To);if(l>=0&&h<=l)return e.copy(s);let u=A*h-l*c;if(u<=0&&A>=0&&l<=0)return a=A/(A-l),e.copy(n).addScaledVector(yi,a);Ro.subVectors(t,r);let d=yi.dot(Ro),m=_i.dot(Ro);if(m>=0&&d<=m)return e.copy(r);let E=d*c-A*m;if(E<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(_i,o);let p=l*m-d*h;if(p<=0&&h-l>=0&&d-m>=0)return cc.subVectors(r,s),o=(h-l)/(h-l+(d-m)),e.copy(s).addScaledVector(cc,o);let f=1/(p+E+u);return a=E*f,o=u*f,e.copy(n).addScaledVector(yi,a).addScaledVector(_i,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},mr={h:0,s:0,l:0};function No(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ut=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=EA(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=No(a,r,t+1/3),this.g=No(a,r,t),this.b=No(a,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){let n=hl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return jt.workingToColorSpace(_e.copy(this),t),Math.round(kt(_e.r*255,0,255))*65536+Math.round(kt(_e.g*255,0,255))*256+Math.round(kt(_e.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(_e.copy(this),e);let n=_e.r,s=_e.g,r=_e.b,a=Math.max(n,s,r),o=Math.min(n,s,r),A,c,l=(o+a)/2;if(o===a)A=0,c=0;else{let h=a-o;switch(c=l<=.5?h/(a+o):h/(2-a-o),a){case n:A=(s-r)/h+(s<r?6:0);break;case s:A=(r-n)/h+2;break;case r:A=(n-s)/h+4;break}A/=6}return t.h=A,t.s=c,t.l=l,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(_e.copy(this),e),t.r=_e.r,t.g=_e.g,t.b=_e.b,t}getStyle(t=Fe){jt.workingToColorSpace(_e.copy(this),t);let e=_e.r,n=_e.g,s=_e.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(mr);let n=fs(Ln.h,mr.h,e),s=fs(Ln.s,mr.s,e),r=fs(Ln.l,mr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_e=new Ut;Ut.NAMES=hl;var Nh=0,Mn=class extends Cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=ti,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rr,this.blendDst=Pr,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=ei,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jn,this.stencilZFail=jn,this.stencilZPass=jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ti&&(n.blending=this.blending),this.side!==vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Rr&&(n.blendSrc=this.blendSrc),this.blendDst!==Pr&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ei&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ko&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let A=r[o];delete A.metadata,a.push(A)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Un=class extends Mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var pe=new P,gr=new mt,Oh=0,fe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zo,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)gr.fromBufferAttribute(this,e),gr.applyMatrix3(t),this.setXY(e,gr.x,gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ti(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ti(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ti(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ti(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array),r=Pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zo&&(t.usage=this.usage),t}};var vs=class extends fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Cs=class extends fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ae=class extends fe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Hh=0,$e=new se,Oo=new xe,bi=new P,ke=new fn,os=new fn,we=new P,ve=class i extends Cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wA(t)?Cs:vs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,n){return $e.makeTranslation(t,e,n),this.applyMatrix4($e),this}scale(t,e,n){return $e.makeScale(t,e,n),this.applyMatrix4($e),this}lookAt(t){return Oo.lookAt(t),Oo.updateMatrix(),this.applyMatrix4(Oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ae(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];os.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(ke.min,os.min),ke.expandByPoint(we),we.addVectors(ke.max,os.max),ke.expandByPoint(we)):(ke.expandByPoint(os.min),ke.expandByPoint(os.max))}ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],A=this.morphTargetsRelative;for(let c=0,l=o.count;c<l;c++)we.fromBufferAttribute(o,c),A&&(bi.fromBufferAttribute(t,c),we.add(bi)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],A=[];for(let F=0;F<n.count;F++)o[F]=new P,A[F]=new P;let c=new P,l=new P,h=new P,u=new mt,d=new mt,m=new mt,E=new P,p=new P;function f(F,B,w){c.fromBufferAttribute(n,F),l.fromBufferAttribute(n,B),h.fromBufferAttribute(n,w),u.fromBufferAttribute(r,F),d.fromBufferAttribute(r,B),m.fromBufferAttribute(r,w),l.sub(c),h.sub(c),d.sub(u),m.sub(u);let D=1/(d.x*m.y-m.x*d.y);isFinite(D)&&(E.copy(l).multiplyScalar(m.y).addScaledVector(h,-d.y).multiplyScalar(D),p.copy(h).multiplyScalar(d.x).addScaledVector(l,-m.x).multiplyScalar(D),o[F].add(E),o[B].add(E),o[w].add(E),A[F].add(p),A[B].add(p),A[w].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let F=0,B=M.length;F<B;++F){let w=M[F],D=w.start,O=w.count;for(let b=D,L=D+O;b<L;b+=3)f(t.getX(b+0),t.getX(b+1),t.getX(b+2))}let C=new P,x=new P,S=new P,_=new P;function R(F){S.fromBufferAttribute(s,F),_.copy(S);let B=o[F];C.copy(B),C.sub(S.multiplyScalar(S.dot(B))).normalize(),x.crossVectors(_,B);let D=x.dot(A[F])<0?-1:1;a.setXYZW(F,C.x,C.y,C.z,D)}for(let F=0,B=M.length;F<B;++F){let w=M[F],D=w.start,O=w.count;for(let b=D,L=D+O;b<L;b+=3)R(t.getX(b+0)),R(t.getX(b+1)),R(t.getX(b+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new P,r=new P,a=new P,o=new P,A=new P,c=new P,l=new P,h=new P;if(t)for(let u=0,d=t.count;u<d;u+=3){let m=t.getX(u+0),E=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,E),a.fromBufferAttribute(e,p),l.subVectors(a,r),h.subVectors(s,r),l.cross(h),o.fromBufferAttribute(n,m),A.fromBufferAttribute(n,E),c.fromBufferAttribute(n,p),o.add(l),A.add(l),c.add(l),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(E,A.x,A.y,A.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),l.subVectors(a,r),h.subVectors(s,r),l.cross(h),n.setXYZ(u+0,l.x,l.y,l.z),n.setXYZ(u+1,l.x,l.y,l.z),n.setXYZ(u+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,A){let c=o.array,l=o.itemSize,h=o.normalized,u=new c.constructor(A.length*l),d=0,m=0;for(let E=0,p=A.length;E<p;E++){o.isInterleavedBufferAttribute?d=A[E]*o.data.stride+o.offset:d=A[E]*l;for(let f=0;f<l;f++)u[m++]=c[d++]}return new fe(u,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let A=s[o],c=t(A,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let A=[],c=r[o];for(let l=0,h=c.length;l<h;l++){let u=c[l],d=t(u,n);A.push(d)}e.morphAttributes[o]=A}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,A=a.length;o<A;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let A=this.parameters;for(let c in A)A[c]!==void 0&&(t[c]=A[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let A in n){let c=n[A];t.data.attributes[A]=c.toJSON(t.data)}let s={},r=!1;for(let A in this.morphAttributes){let c=this.morphAttributes[A],l=[];for(let h=0,u=c.length;h<u;h++){let d=c[h];l.push(d.toJSON(t.data))}l.length>0&&(s[A]=l,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let l=s[c];this.setAttribute(c,l.clone(e))}let r=t.morphAttributes;for(let c in r){let l=[],h=r[c];for(let u=0,d=h.length;u<d;u++)l.push(h[u].clone(e));this.morphAttributes[c]=l}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,l=a.length;c<l;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let A=t.boundingSphere;return A!==null&&(this.boundingSphere=A.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},lc=new se,Xn=new Qr,Er=new Qn,hc=new P,wr=new P,xr=new P,Br=new P,Ho=new P,vr=new P,uc=new P,Cr=new P,Ft=class extends xe{constructor(t=new ve,e=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){vr.set(0,0,0);for(let A=0,c=r.length;A<c;A++){let l=o[A],h=r[A];l!==0&&(Ho.fromBufferAttribute(h,t),a?vr.addScaledVector(Ho,l):vr.addScaledVector(Ho.sub(e),l))}e.add(vr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),Xn.copy(t.ray).recast(t.near),!(Er.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(Er,hc)===null||Xn.origin.distanceToSquared(hc)>(t.far-t.near)**2))&&(lc.copy(r).invert(),Xn.copy(t.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Xn)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,A=r.attributes.position,c=r.attributes.uv,l=r.attributes.uv1,h=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,E=u.length;m<E;m++){let p=u[m],f=a[p.materialIndex],M=Math.max(p.start,d.start),C=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,S=C;x<S;x+=3){let _=o.getX(x),R=o.getX(x+1),F=o.getX(x+2);s=Mr(this,f,t,n,c,l,h,_,R,F),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),E=Math.min(o.count,d.start+d.count);for(let p=m,f=E;p<f;p+=3){let M=o.getX(p),C=o.getX(p+1),x=o.getX(p+2);s=Mr(this,a,t,n,c,l,h,M,C,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(A!==void 0)if(Array.isArray(a))for(let m=0,E=u.length;m<E;m++){let p=u[m],f=a[p.materialIndex],M=Math.max(p.start,d.start),C=Math.min(A.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,S=C;x<S;x+=3){let _=x,R=x+1,F=x+2;s=Mr(this,f,t,n,c,l,h,_,R,F),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),E=Math.min(A.count,d.start+d.count);for(let p=m,f=E;p<f;p+=3){let M=p,C=p+1,x=p+2;s=Mr(this,a,t,n,c,l,h,M,C,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Gh(i,t,e,n,s,r,a,o){let A;if(t.side===Ce?A=n.intersectTriangle(a,r,s,!0,o):A=n.intersectTriangle(s,r,a,t.side===vn,o),A===null)return null;Cr.copy(o),Cr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Cr);return c<e.near||c>e.far?null:{distance:c,point:Cr.clone(),object:i}}function Mr(i,t,e,n,s,r,a,o,A,c){i.getVertexPosition(o,wr),i.getVertexPosition(A,xr),i.getVertexPosition(c,Br);let l=Gh(i,t,e,n,wr,xr,Br,uc);if(l){let h=new P;On.getBarycoord(uc,wr,xr,Br,h),s&&(l.uv=On.getInterpolatedAttribute(s,o,A,c,h,new mt)),r&&(l.uv1=On.getInterpolatedAttribute(r,o,A,c,h,new mt)),a&&(l.normal=On.getInterpolatedAttribute(a,o,A,c,h,new P),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));let u={a:o,b:A,c,normal:new P,materialIndex:0};On.getNormal(wr,xr,Br,u.normal),l.face=u,l.barycoord=h}return l}var me=class i extends ve{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let A=[],c=[],l=[],h=[],u=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(A),this.setAttribute("position",new Ae(c,3)),this.setAttribute("normal",new Ae(l,3)),this.setAttribute("uv",new Ae(h,2));function m(E,p,f,M,C,x,S,_,R,F,B){let w=x/R,D=S/F,O=x/2,b=S/2,L=_/2,U=R+1,G=F+1,k=0,z=0,j=new P;for(let At=0;At<G;At++){let ft=At*D-b;for(let Tt=0;Tt<U;Tt++){let zt=Tt*w-O;j[E]=zt*M,j[p]=ft*C,j[f]=L,c.push(j.x,j.y,j.z),j[E]=0,j[p]=0,j[f]=_>0?1:-1,l.push(j.x,j.y,j.z),h.push(Tt/R),h.push(1-At/F),k+=1}}for(let At=0;At<F;At++)for(let ft=0;ft<R;ft++){let Tt=u+ft+U*At,zt=u+ft+U*(At+1),Zt=u+(ft+1)+U*(At+1),Jt=u+(ft+1)+U*At;A.push(Tt,zt,Jt),A.push(zt,Zt,Jt),z+=6}o.addGroup(d,z,B),d+=z,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ui(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Se(i){let t={};for(let e=0;e<i.length;e++){let n=ui(i[e]);for(let s in n)t[s]=n[s]}return t}function Qh(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xA(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var ul={clone:ui,merge:Se},Uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Je=class extends Mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uh,this.fragmentShader=zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ui(t.uniforms),this.uniformsGroups=Qh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ms=class extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Nn=new P,fc=new mt,dc=new mt,Be=class extends Ms{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Fi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(us*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fi*2*Math.atan(Math.tan(us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z)}getViewSize(t,e){return this.getViewBounds(t,fc,dc),e.subVectors(dc,fc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(us*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let A=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/A,e-=a.offsetY*n/c,s*=a.width/A,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Di=-90,Si=1,Ur=class extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Be(Di,Si,t,e);s.layers=this.layers,this.add(s);let r=new Be(Di,Si,t,e);r.layers=this.layers,this.add(r);let a=new Be(Di,Si,t,e);a.layers=this.layers,this.add(a);let o=new Be(Di,Si,t,e);o.layers=this.layers,this.add(o);let A=new Be(Di,Si,t,e);A.layers=this.layers,this.add(A);let c=new Be(Di,Si,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,A]=e;for(let c of e)this.remove(c);if(t===an)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),A.up.set(0,1,0),A.lookAt(0,0,-1);else if(t===Es)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),A.up.set(0,-1,0),A.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,A,c,l]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,A),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=E,t.setRenderTarget(n,5,s),t.render(e,l),t.setRenderTarget(h,u,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ys=class extends Le{constructor(t=[],e=ci,n,s,r,a,o,A,c,l){super(t,e,n,s,r,a,o,A,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},zr=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ys(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new me(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:yn});r.uniforms.tEquirect.value=e;let a=new Ft(s,r),o=e.minFilter;return e.minFilter===Yn&&(e.minFilter=on),new Ur(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},be=class extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vh={type:"move"},Oi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,A=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let E of t.hand.values()){let p=e.getJointPose(E,n),f=this._getHandJoint(c,E);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let l=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=l.position.distanceTo(h.position),d=.02,m=.005;c.inputState.pinching&&u>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else A!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(A.matrix.fromArray(r.transform.matrix),A.matrix.decompose(A.position,A.rotation,A.scale),A.matrixWorldNeedsUpdate=!0,r.linearVelocity?(A.hasLinearVelocity=!0,A.linearVelocity.copy(r.linearVelocity)):A.hasLinearVelocity=!1,r.angularVelocity?(A.hasAngularVelocity=!0,A.angularVelocity.copy(r.angularVelocity)):A.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vh)))}return o!==null&&(o.visible=s!==null),A!==null&&(A.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new be;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var _s=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ii=class extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Vr=class extends Le{constructor(t=null,e=1,n=1,s,r,a,o,A,c=Ge,l=Ge,h,u){super(null,a,o,A,c,l,s,r,h,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hi=class extends fe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ii=new se,pc=new se,yr=[],mc=new fn,Yh=new se,As=new Ft,cs=new Qn,si=class extends Ft{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Hi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Yh)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),mc.copy(t.boundingBox).applyMatrix4(Ii),this.boundingBox.union(mc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),cs.copy(t.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(cs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(As.geometry=this.geometry,As.material=this.material,As.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),t.ray.intersectsSphere(cs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ii),pc.multiplyMatrices(n,Ii),As.matrixWorld=pc,As.raycast(t,yr);for(let a=0,o=yr.length;a<o;a++){let A=yr[a];A.instanceId=r,A.object=this,e.push(A)}yr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Hi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vr(new Float32Array(s*this.count),s,this.count,ya,ln));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,A=s*t;r[A]=o,r.set(n,A+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Go=new P,Wh=new P,kh=new Vt,hn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Go.subVectors(n,e).cross(Wh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Go),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||kh.getNormalMatrix(t),s=this.coplanarPoint(Go).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},qn=new Qn,Jh=new mt(.5,.5),_r=new P,Gi=class{constructor(t=new hn,e=new hn,n=new hn,s=new hn,r=new hn,a=new hn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=an,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],A=r[2],c=r[3],l=r[4],h=r[5],u=r[6],d=r[7],m=r[8],E=r[9],p=r[10],f=r[11],M=r[12],C=r[13],x=r[14],S=r[15];if(s[0].setComponents(c-a,d-l,f-m,S-M).normalize(),s[1].setComponents(c+a,d+l,f+m,S+M).normalize(),s[2].setComponents(c+o,d+h,f+E,S+C).normalize(),s[3].setComponents(c-o,d-h,f-E,S-C).normalize(),n)s[4].setComponents(A,u,p,x).normalize(),s[5].setComponents(c-A,d-u,f-p,S-x).normalize();else if(s[4].setComponents(c-A,d-u,f-p,S-x).normalize(),e===an)s[5].setComponents(c+A,d+u,f+p,S+x).normalize();else if(e===Es)s[5].setComponents(A,u,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(t){qn.center.set(0,0,0);let e=Jh.distanceTo(t.center);return qn.radius=.7071067811865476+e,qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(_r.x=s.normal.x>0?t.max.x:t.min.x,_r.y=s.normal.y>0?t.max.y:t.min.y,_r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_r)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var bs=class extends Le{constructor(t,e,n,s,r,a,o,A,c){super(t,e,n,s,r,a,o,A,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ds=class extends Le{constructor(t,e,n=Wn,s,r,a,o=Ge,A=Ge,c,l=Pi,h=1){if(l!==Pi&&l!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:h};super(u,s,r,a,o,A,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ni(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ss=class extends Le{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ri=class i extends ve{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],A=[],c=[],l=e/2,h=Math.PI/2*t,u=e,d=2*h+u,m=n*2+r,E=s+1,p=new P,f=new P;for(let M=0;M<=m;M++){let C=0,x=0,S=0,_=0;if(M<=n){let B=M/n,w=B*Math.PI/2;x=-l-t*Math.cos(w),S=t*Math.sin(w),_=-t*Math.cos(w),C=B*h}else if(M<=n+r){let B=(M-n)/r;x=-l+B*e,S=t,_=0,C=h+B*u}else{let B=(M-n-r)/n,w=B*Math.PI/2;x=l+t*Math.sin(w),S=t*Math.cos(w),_=t*Math.sin(w),C=h+u+B*h}let R=Math.max(0,Math.min(1,C/d)),F=0;M===0?F=.5/s:M===m&&(F=-.5/s);for(let B=0;B<=s;B++){let w=B/s,D=w*Math.PI*2,O=Math.sin(D),b=Math.cos(D);f.x=-S*b,f.y=x,f.z=S*O,o.push(f.x,f.y,f.z),p.set(-S*b,_,S*O),p.normalize(),A.push(p.x,p.y,p.z),c.push(w+F,R)}if(M>0){let B=(M-1)*E;for(let w=0;w<s;w++){let D=B+w,O=B+w+1,b=M*E+w,L=M*E+w+1;a.push(D,O,b),a.push(O,L,b)}}}this.setIndex(a),this.setAttribute("position",new Ae(o,3)),this.setAttribute("normal",new Ae(A,3)),this.setAttribute("uv",new Ae(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var Ne=class i extends ve{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,A=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:A};let c=this;s=Math.floor(s),r=Math.floor(r);let l=[],h=[],u=[],d=[],m=0,E=[],p=n/2,f=0;M(),a===!1&&(t>0&&C(!0),e>0&&C(!1)),this.setIndex(l),this.setAttribute("position",new Ae(h,3)),this.setAttribute("normal",new Ae(u,3)),this.setAttribute("uv",new Ae(d,2));function M(){let x=new P,S=new P,_=0,R=(e-t)/n;for(let F=0;F<=r;F++){let B=[],w=F/r,D=w*(e-t)+t;for(let O=0;O<=s;O++){let b=O/s,L=b*A+o,U=Math.sin(L),G=Math.cos(L);S.x=D*U,S.y=-w*n+p,S.z=D*G,h.push(S.x,S.y,S.z),x.set(U,R,G).normalize(),u.push(x.x,x.y,x.z),d.push(b,1-w),B.push(m++)}E.push(B)}for(let F=0;F<s;F++)for(let B=0;B<r;B++){let w=E[B][F],D=E[B+1][F],O=E[B+1][F+1],b=E[B][F+1];(t>0||B!==0)&&(l.push(w,D,b),_+=3),(e>0||B!==r-1)&&(l.push(D,O,b),_+=3)}c.addGroup(f,_,0),f+=_}function C(x){let S=m,_=new mt,R=new P,F=0,B=x===!0?t:e,w=x===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,p*w,0),u.push(0,w,0),d.push(.5,.5),m++;let D=m;for(let O=0;O<=s;O++){let L=O/s*A+o,U=Math.cos(L),G=Math.sin(L);R.x=B*G,R.y=p*w,R.z=B*U,h.push(R.x,R.y,R.z),u.push(0,w,0),_.x=U*.5+.5,_.y=G*.5*w+.5,d.push(_.x,_.y),m++}for(let O=0;O<s;O++){let b=S+O,L=D+O;x===!0?l.push(L,L+1,b):l.push(L+1,L,b),F+=3}c.addGroup(f,F,x===!0?1:2),f+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Is=class i extends Ne{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yr=class i extends ve{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),l(),this.setAttribute("position",new Ae(r,3)),this.setAttribute("normal",new Ae(r.slice(),3)),this.setAttribute("uv",new Ae(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let C=new P,x=new P,S=new P;for(let _=0;_<e.length;_+=3)d(e[_+0],C),d(e[_+1],x),d(e[_+2],S),A(C,x,S,M)}function A(M,C,x,S){let _=S+1,R=[];for(let F=0;F<=_;F++){R[F]=[];let B=M.clone().lerp(x,F/_),w=C.clone().lerp(x,F/_),D=_-F;for(let O=0;O<=D;O++)O===0&&F===_?R[F][O]=B:R[F][O]=B.clone().lerp(w,O/D)}for(let F=0;F<_;F++)for(let B=0;B<2*(_-F)-1;B++){let w=Math.floor(B/2);B%2===0?(u(R[F][w+1]),u(R[F+1][w]),u(R[F][w])):(u(R[F][w+1]),u(R[F+1][w+1]),u(R[F+1][w]))}}function c(M){let C=new P;for(let x=0;x<r.length;x+=3)C.x=r[x+0],C.y=r[x+1],C.z=r[x+2],C.normalize().multiplyScalar(M),r[x+0]=C.x,r[x+1]=C.y,r[x+2]=C.z}function l(){let M=new P;for(let C=0;C<r.length;C+=3){M.x=r[C+0],M.y=r[C+1],M.z=r[C+2];let x=p(M)/2/Math.PI+.5,S=f(M)/Math.PI+.5;a.push(x,1-S)}m(),h()}function h(){for(let M=0;M<a.length;M+=6){let C=a[M+0],x=a[M+2],S=a[M+4],_=Math.max(C,x,S),R=Math.min(C,x,S);_>.9&&R<.1&&(C<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,C){let x=M*3;C.x=t[x+0],C.y=t[x+1],C.z=t[x+2]}function m(){let M=new P,C=new P,x=new P,S=new P,_=new mt,R=new mt,F=new mt;for(let B=0,w=0;B<r.length;B+=9,w+=6){M.set(r[B+0],r[B+1],r[B+2]),C.set(r[B+3],r[B+4],r[B+5]),x.set(r[B+6],r[B+7],r[B+8]),_.set(a[w+0],a[w+1]),R.set(a[w+2],a[w+3]),F.set(a[w+4],a[w+5]),S.copy(M).add(C).add(x).divideScalar(3);let D=p(S);E(_,w+0,M,D),E(R,w+2,C,D),E(F,w+4,x,D)}}function E(M,C,x,S){S<0&&M.x===1&&(a[C]=M.x-1),x.x===0&&x.z===0&&(a[C]=S/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Ke=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,A=r-1,c;for(;o<=A;)if(s=Math.floor(o+(A-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)A=s-1;else{A=s;break}if(s=A,n[s]===a)return s/(r-1);let l=n[s],u=n[s+1]-l,d=(a-l)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),A=e||(a.isVector2?new mt:new P);return A.copy(o).sub(a).normalize(),A}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new P,s=[],r=[],a=[],o=new P,A=new se;for(let d=0;d<=t;d++){let m=d/t;s[d]=this.getTangentAt(m,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,l=Math.abs(s[0].x),h=Math.abs(s[0].y),u=Math.abs(s[0].z);l<=c&&(c=l,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(kt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(A.makeRotationAxis(o,m))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(kt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(A.makeRotationAxis(s[m],d*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Qi=class extends Ke{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,A=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=A}getPoint(t,e=new mt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,A=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let l=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=A-this.aX,d=c-this.aY;A=u*l-d*h+this.aX,c=u*h+d*l+this.aY}return n.set(A,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Wr=class extends Qi{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function BA(){let i=0,t=0,e=0,n=0;function s(r,a,o,A){i=r,t=o,e=-3*r+3*a-2*o-A,n=2*r-2*a+o+A}return{initCatmullRom:function(r,a,o,A,c){s(a,o,c*(o-r),c*(A-a))},initNonuniformCatmullRom:function(r,a,o,A,c,l,h){let u=(a-r)/c-(o-r)/(c+l)+(o-a)/l,d=(o-a)/l-(A-a)/(l+h)+(A-o)/h;u*=l,d*=l,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var br=new P,Qo=new BA,Uo=new BA,zo=new BA,Ui=class extends Ke{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),A=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:A===0&&o===r-1&&(o=r-2,A=1);let c,l;this.closed||o>0?c=s[(o-1)%r]:(br.subVectors(s[0],s[1]).add(s[0]),c=br);let h=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?l=s[(o+2)%r]:(br.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=br),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(h),d),E=Math.pow(h.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(l),d);E<1e-4&&(E=1),m<1e-4&&(m=E),p<1e-4&&(p=E),Qo.initNonuniformCatmullRom(c.x,h.x,u.x,l.x,m,E,p),Uo.initNonuniformCatmullRom(c.y,h.y,u.y,l.y,m,E,p),zo.initNonuniformCatmullRom(c.z,h.z,u.z,l.z,m,E,p)}else this.curveType==="catmullrom"&&(Qo.initCatmullRom(c.x,h.x,u.x,l.x,this.tension),Uo.initCatmullRom(c.y,h.y,u.y,l.y,this.tension),zo.initCatmullRom(c.z,h.z,u.z,l.z,this.tension));return n.set(Qo.calc(A),Uo.calc(A),zo.calc(A)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function gc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,A=i*o;return(2*e-2*n+r+a)*A+(-3*e+3*n-2*r-a)*o+r*i+e}function Kh(i,t){let e=1-i;return e*e*t}function Zh(i,t){return 2*(1-i)*i*t}function Xh(i,t){return i*i*t}function ds(i,t,e,n){return Kh(i,t)+Zh(i,e)+Xh(i,n)}function qh(i,t){let e=1-i;return e*e*e*t}function jh(i,t){let e=1-i;return 3*e*e*i*t}function $h(i,t){return 3*(1-i)*i*i*t}function tu(i,t){return i*i*i*t}function ps(i,t,e,n,s){return qh(i,t)+jh(i,e)+$h(i,n)+tu(i,s)}var Ts=class extends Ke{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ps(t,s.x,r.x,a.x,o.x),ps(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kr=class extends Ke{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ps(t,s.x,r.x,a.x,o.x),ps(t,s.y,r.y,a.y,o.y),ps(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Rs=class extends Ke{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jr=class extends Ke{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ps=class extends Ke{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ds(t,s.x,r.x,a.x),ds(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Kr=class extends Ke{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ds(t,s.x,r.x,a.x),ds(t,s.y,r.y,a.y),ds(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fs=class extends Ke{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,A=s[a===0?a:a-1],c=s[a],l=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(gc(o,A.x,c.x,l.x,h.x),gc(o,A.y,c.y,l.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new mt().fromArray(s))}return this}},Xo=Object.freeze({__proto__:null,ArcCurve:Wr,CatmullRomCurve3:Ui,CubicBezierCurve:Ts,CubicBezierCurve3:kr,EllipseCurve:Qi,LineCurve:Rs,LineCurve3:Jr,QuadraticBezierCurve:Ps,QuadraticBezierCurve3:Kr,SplineCurve:Fs}),Zr=class extends Ke{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],A=o.getLength(),c=A===0?0:1-a/A;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,A=a.getPoints(o);for(let c=0;c<A.length;c++){let l=A[c];n&&n.equals(l)||(e.push(l),n=l)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Xo[s.type]().fromJSON(s))}return this}},Ls=class extends Zr{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Rs(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Ps(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Ts(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Fs(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,A=this.currentPoint.y;return this.absarc(t+o,e+A,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,A){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+c,e+l,n,s,r,a,o,A),this}absellipse(t,e,n,s,r,a,o,A){let c=new Qi(t,e,n,s,r,a,o,A);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ai=class extends Ls{constructor(t){super(t),this.uuid=hi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ls().fromJSON(s))}return this}};function eu(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=fl(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,A,c;if(n&&(r=au(i,t,r,e)),i.length>80*e){o=1/0,A=1/0;let l=-1/0,h=-1/0;for(let u=e;u<s;u+=e){let d=i[u],m=i[u+1];d<o&&(o=d),m<A&&(A=m),d>l&&(l=d),m>h&&(h=m)}c=Math.max(l-o,h-A),c=c!==0?32767/c:0}return Ns(r,a,e,o,A,c,0),a}function fl(i,t,e,n,s){let r;if(s===gu(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Ec(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Ec(a/n|0,i[a],i[a+1],r);return r&&zi(r,r.next)&&(Hs(r),r=r.next),r}function oi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(zi(e,e.next)||he(e.prev,e,e.next)===0)){if(Hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ns(i,t,e,n,s,r,a){if(!i)return;!a&&r&&hu(i,n,s,r);let o=i;for(;i.prev!==i.next;){let A=i.prev,c=i.next;if(r?iu(i,n,s,r):nu(i)){t.push(A.i,i.i,c.i),Hs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=su(oi(i),t),Ns(i,t,e,n,s,r,2)):a===2&&ru(i,t,e,n,s,r):Ns(oi(i),t,e,n,s,r,1);break}}}function nu(i){let t=i.prev,e=i,n=i.next;if(he(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,A=e.y,c=n.y,l=Math.min(s,r,a),h=Math.min(o,A,c),u=Math.max(s,r,a),d=Math.max(o,A,c),m=n.next;for(;m!==t;){if(m.x>=l&&m.x<=u&&m.y>=h&&m.y<=d&&hs(s,o,r,A,a,c,m.x,m.y)&&he(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function iu(i,t,e,n){let s=i.prev,r=i,a=i.next;if(he(s,r,a)>=0)return!1;let o=s.x,A=r.x,c=a.x,l=s.y,h=r.y,u=a.y,d=Math.min(o,A,c),m=Math.min(l,h,u),E=Math.max(o,A,c),p=Math.max(l,h,u),f=qo(d,m,t,e,n),M=qo(E,p,t,e,n),C=i.prevZ,x=i.nextZ;for(;C&&C.z>=f&&x&&x.z<=M;){if(C.x>=d&&C.x<=E&&C.y>=m&&C.y<=p&&C!==s&&C!==a&&hs(o,l,A,h,c,u,C.x,C.y)&&he(C.prev,C,C.next)>=0||(C=C.prevZ,x.x>=d&&x.x<=E&&x.y>=m&&x.y<=p&&x!==s&&x!==a&&hs(o,l,A,h,c,u,x.x,x.y)&&he(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;C&&C.z>=f;){if(C.x>=d&&C.x<=E&&C.y>=m&&C.y<=p&&C!==s&&C!==a&&hs(o,l,A,h,c,u,C.x,C.y)&&he(C.prev,C,C.next)>=0)return!1;C=C.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=E&&x.y>=m&&x.y<=p&&x!==s&&x!==a&&hs(o,l,A,h,c,u,x.x,x.y)&&he(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function su(i,t){let e=i;do{let n=e.prev,s=e.next.next;!zi(n,s)&&pl(n,e,e.next,s)&&Os(n,s)&&Os(s,n)&&(t.push(n.i,e.i,s.i),Hs(e),Hs(e.next),e=i=s),e=e.next}while(e!==i);return oi(e)}function ru(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&du(a,o)){let A=ml(a,o);a=oi(a,a.next),A=oi(A,A.next),Ns(a,t,e,n,s,r,0),Ns(A,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function au(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,A=r<a-1?t[r+1]*n:i.length,c=fl(i,o,A,n,!1);c===c.next&&(c.steiner=!0),s.push(fu(c))}s.sort(ou);for(let r=0;r<s.length;r++)e=Au(s[r],e);return e}function ou(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Au(i,t){let e=cu(i,t);if(!e)return t;let n=ml(e,i);return oi(n,n.next),oi(e,e.next)}function cu(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(zi(i,e))return e;do{if(zi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>r&&(r=h,a=e.x<e.next.x?e:e.next,h===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,A=a.x,c=a.y,l=1/0;e=a;do{if(n>=e.x&&e.x>=A&&n!==e.x&&dl(s<c?n:r,s,A,c,s<c?r:n,s,e.x,e.y)){let h=Math.abs(s-e.y)/(n-e.x);Os(e,i)&&(h<l||h===l&&(e.x>a.x||e.x===a.x&&lu(a,e)))&&(a=e,l=h)}e=e.next}while(e!==o);return a}function lu(i,t){return he(i.prev,i,t.prev)<0&&he(t.next,i,i.next)<0}function hu(i,t,e,n){let s=i;do s.z===0&&(s.z=qo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,uu(s)}function uu(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let A=e;for(;o>0||A>0&&a;)o!==0&&(A===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,A--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function qo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function fu(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function dl(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function hs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&dl(i,t,e,n,s,r,a,o)}function du(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!pu(i,t)&&(Os(i,t)&&Os(t,i)&&mu(i,t)&&(he(i.prev,i,t.prev)||he(i,t.prev,t))||zi(i,t)&&he(i.prev,i,i.next)>0&&he(t.prev,t,t.next)>0)}function he(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zi(i,t){return i.x===t.x&&i.y===t.y}function pl(i,t,e,n){let s=Sr(he(i,t,e)),r=Sr(he(i,t,n)),a=Sr(he(e,n,i)),o=Sr(he(e,n,t));return!!(s!==r&&a!==o||s===0&&Dr(i,e,t)||r===0&&Dr(i,n,t)||a===0&&Dr(e,i,n)||o===0&&Dr(e,t,n))}function Dr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Sr(i){return i>0?1:i<0?-1:0}function pu(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Os(i,t){return he(i.prev,i,i.next)<0?he(i,t,i.next)>=0&&he(i,i.prev,t)>=0:he(i,t,i.prev)<0||he(i,i.next,t)<0}function mu(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ml(i,t){let e=jo(i.i,i.x,i.y),n=jo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ec(i,t,e,n){let s=jo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function jo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function gu(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var $o=class{static triangulate(t,e,n=2){return eu(t,e,n)}},$n=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];wc(t),xc(n,t);let a=t.length;e.forEach(wc);for(let A=0;A<e.length;A++)s.push(a),a+=e[A].length,xc(n,e[A]);let o=$o.triangulate(n,s);for(let A=0;A<o.length;A+=3)r.push(o.slice(A,A+3));return r}};function wc(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function xc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Vi=class i extends ve{constructor(t=new ai([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,A=t.length;o<A;o++){let c=t[o];a(c)}this.setAttribute("position",new Ae(s,3)),this.setAttribute("uv",new Ae(r,2)),this.computeVertexNormals();function a(o){let A=[],c=e.curveSegments!==void 0?e.curveSegments:12,l=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,E=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,f=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Eu,C,x=!1,S,_,R,F;f&&(C=f.getSpacedPoints(l),x=!0,u=!1,S=f.computeFrenetFrames(l,!1),_=new P,R=new P,F=new P),u||(p=0,d=0,m=0,E=0);let B=o.extractPoints(c),w=B.shape,D=B.holes;if(!$n.isClockWise(w)){w=w.reverse();for(let et=0,Z=D.length;et<Z;et++){let q=D[et];$n.isClockWise(q)&&(D[et]=q.reverse())}}function b(et){let q=10000000000000001e-36,X=et[0];for(let pt=1;pt<=et.length;pt++){let ot=pt%et.length,dt=et[ot],Qt=dt.x-X.x,Ht=dt.y-X.y,y=Qt*Qt+Ht*Ht,g=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(X.x),Math.abs(X.y)),H=q*g*g;if(y<=H){et.splice(ot,1),pt--;continue}X=dt}}b(w),D.forEach(b);let L=D.length,U=w;for(let et=0;et<L;et++){let Z=D[et];w=w.concat(Z)}function G(et,Z,q){return Z||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(Z,q)}let k=w.length;function z(et,Z,q){let X,pt,ot,dt=et.x-Z.x,Qt=et.y-Z.y,Ht=q.x-et.x,y=q.y-et.y,g=dt*dt+Qt*Qt,H=dt*y-Qt*Ht;if(Math.abs(H)>Number.EPSILON){let V=Math.sqrt(g),it=Math.sqrt(Ht*Ht+y*y),J=Z.x-Qt/V,bt=Z.y+dt/V,ut=q.x-y/it,vt=q.y+Ht/it,Dt=((ut-J)*y-(vt-bt)*Ht)/(dt*y-Qt*Ht);X=J+dt*Dt-et.x,pt=bt+Qt*Dt-et.y;let ct=X*X+pt*pt;if(ct<=2)return new mt(X,pt);ot=Math.sqrt(ct/2)}else{let V=!1;dt>Number.EPSILON?Ht>Number.EPSILON&&(V=!0):dt<-Number.EPSILON?Ht<-Number.EPSILON&&(V=!0):Math.sign(Qt)===Math.sign(y)&&(V=!0),V?(X=-Qt,pt=dt,ot=Math.sqrt(g)):(X=dt,pt=Qt,ot=Math.sqrt(g/2))}return new mt(X/ot,pt/ot)}let j=[];for(let et=0,Z=U.length,q=Z-1,X=et+1;et<Z;et++,q++,X++)q===Z&&(q=0),X===Z&&(X=0),j[et]=z(U[et],U[q],U[X]);let At=[],ft,Tt=j.concat();for(let et=0,Z=L;et<Z;et++){let q=D[et];ft=[];for(let X=0,pt=q.length,ot=pt-1,dt=X+1;X<pt;X++,ot++,dt++)ot===pt&&(ot=0),dt===pt&&(dt=0),ft[X]=z(q[X],q[ot],q[dt]);At.push(ft),Tt=Tt.concat(ft)}let zt;if(p===0)zt=$n.triangulateShape(U,D);else{let et=[],Z=[];for(let q=0;q<p;q++){let X=q/p,pt=d*Math.cos(X*Math.PI/2),ot=m*Math.sin(X*Math.PI/2)+E;for(let dt=0,Qt=U.length;dt<Qt;dt++){let Ht=G(U[dt],j[dt],ot);_t(Ht.x,Ht.y,-pt),X===0&&et.push(Ht)}for(let dt=0,Qt=L;dt<Qt;dt++){let Ht=D[dt];ft=At[dt];let y=[];for(let g=0,H=Ht.length;g<H;g++){let V=G(Ht[g],ft[g],ot);_t(V.x,V.y,-pt),X===0&&y.push(V)}X===0&&Z.push(y)}}zt=$n.triangulateShape(et,Z)}let Zt=zt.length,Jt=m+E;for(let et=0;et<k;et++){let Z=u?G(w[et],Tt[et],Jt):w[et];x?(R.copy(S.normals[0]).multiplyScalar(Z.x),_.copy(S.binormals[0]).multiplyScalar(Z.y),F.copy(C[0]).add(R).add(_),_t(F.x,F.y,F.z)):_t(Z.x,Z.y,0)}for(let et=1;et<=l;et++)for(let Z=0;Z<k;Z++){let q=u?G(w[Z],Tt[Z],Jt):w[Z];x?(R.copy(S.normals[et]).multiplyScalar(q.x),_.copy(S.binormals[et]).multiplyScalar(q.y),F.copy(C[et]).add(R).add(_),_t(F.x,F.y,F.z)):_t(q.x,q.y,h/l*et)}for(let et=p-1;et>=0;et--){let Z=et/p,q=d*Math.cos(Z*Math.PI/2),X=m*Math.sin(Z*Math.PI/2)+E;for(let pt=0,ot=U.length;pt<ot;pt++){let dt=G(U[pt],j[pt],X);_t(dt.x,dt.y,h+q)}for(let pt=0,ot=D.length;pt<ot;pt++){let dt=D[pt];ft=At[pt];for(let Qt=0,Ht=dt.length;Qt<Ht;Qt++){let y=G(dt[Qt],ft[Qt],X);x?_t(y.x,y.y+C[l-1].y,C[l-1].x+q):_t(y.x,y.y,h+q)}}}K(),rt();function K(){let et=s.length/3;if(u){let Z=0,q=k*Z;for(let X=0;X<Zt;X++){let pt=zt[X];yt(pt[2]+q,pt[1]+q,pt[0]+q)}Z=l+p*2,q=k*Z;for(let X=0;X<Zt;X++){let pt=zt[X];yt(pt[0]+q,pt[1]+q,pt[2]+q)}}else{for(let Z=0;Z<Zt;Z++){let q=zt[Z];yt(q[2],q[1],q[0])}for(let Z=0;Z<Zt;Z++){let q=zt[Z];yt(q[0]+k*l,q[1]+k*l,q[2]+k*l)}}n.addGroup(et,s.length/3-et,0)}function rt(){let et=s.length/3,Z=0;Ct(U,Z),Z+=U.length;for(let q=0,X=D.length;q<X;q++){let pt=D[q];Ct(pt,Z),Z+=pt.length}n.addGroup(et,s.length/3-et,1)}function Ct(et,Z){let q=et.length;for(;--q>=0;){let X=q,pt=q-1;pt<0&&(pt=et.length-1);for(let ot=0,dt=l+p*2;ot<dt;ot++){let Qt=k*ot,Ht=k*(ot+1),y=Z+X+Qt,g=Z+pt+Qt,H=Z+pt+Ht,V=Z+X+Ht;Wt(y,g,H,V)}}}function _t(et,Z,q){A.push(et),A.push(Z),A.push(q)}function yt(et,Z,q){Xt(et),Xt(Z),Xt(q);let X=s.length/3,pt=M.generateTopUV(n,s,X-3,X-2,X-1);I(pt[0]),I(pt[1]),I(pt[2])}function Wt(et,Z,q,X){Xt(et),Xt(Z),Xt(X),Xt(Z),Xt(q),Xt(X);let pt=s.length/3,ot=M.generateSideWallUV(n,s,pt-6,pt-3,pt-2,pt-1);I(ot[0]),I(ot[1]),I(ot[3]),I(ot[1]),I(ot[2]),I(ot[3])}function Xt(et){s.push(A[et*3+0]),s.push(A[et*3+1]),s.push(A[et*3+2])}function I(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return wu(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Xo[s.type]().fromJSON(s)),new i(n,t.options)}},Eu={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],A=t[n*3+1],c=t[s*3],l=t[s*3+1];return[new mt(r,a),new mt(o,A),new mt(c,l)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],A=t[e*3+2],c=t[n*3],l=t[n*3+1],h=t[n*3+2],u=t[s*3],d=t[s*3+1],m=t[s*3+2],E=t[r*3],p=t[r*3+1],f=t[r*3+2];return Math.abs(o-l)<Math.abs(a-c)?[new mt(a,1-A),new mt(c,1-h),new mt(u,1-m),new mt(E,1-f)]:[new mt(o,1-A),new mt(l,1-h),new mt(d,1-m),new mt(p,1-f)]}};function wu(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Gs=class i extends Yr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var De=class i extends ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),A=Math.floor(s),c=o+1,l=A+1,h=t/o,u=e/A,d=[],m=[],E=[],p=[];for(let f=0;f<l;f++){let M=f*u-a;for(let C=0;C<c;C++){let x=C*h-r;m.push(x,-M,0),E.push(0,0,1),p.push(C/o),p.push(1-f/A)}}for(let f=0;f<A;f++)for(let M=0;M<o;M++){let C=M+c*f,x=M+c*(f+1),S=M+1+c*(f+1),_=M+1+c*f;d.push(C,x,_),d.push(x,S,_)}this.setIndex(d),this.setAttribute("position",new Ae(m,3)),this.setAttribute("normal",new Ae(E,3)),this.setAttribute("uv",new Ae(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Qs=class i extends ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let A=Math.min(a+o,Math.PI),c=0,l=[],h=new P,u=new P,d=[],m=[],E=[],p=[];for(let f=0;f<=n;f++){let M=[],C=f/n,x=0;f===0&&a===0?x=.5/e:f===n&&A===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){let _=S/e;h.x=-t*Math.cos(s+_*r)*Math.sin(a+C*o),h.y=t*Math.cos(a+C*o),h.z=t*Math.sin(s+_*r)*Math.sin(a+C*o),m.push(h.x,h.y,h.z),u.copy(h).normalize(),E.push(u.x,u.y,u.z),p.push(_+x,1-C),M.push(c++)}l.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let C=l[f][M+1],x=l[f][M],S=l[f+1][M],_=l[f+1][M+1];(f!==0||a>0)&&d.push(C,x,_),(f!==n-1||A<Math.PI)&&d.push(x,S,_)}this.setIndex(d),this.setAttribute("position",new Ae(m,3)),this.setAttribute("normal",new Ae(E,3)),this.setAttribute("uv",new Ae(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ue=class extends Mn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=io,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Us=class extends Mn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=io,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Xr=class extends Mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$c,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},qr=class extends Mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ir(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function xu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ai=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let A=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===A)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},jr=class extends Ai{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wo,endingEnd:Wo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],A=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case ko:r=t,o=2*e-n;break;case Jo:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(A===void 0)switch(this.getSettings_().endingEnd){case ko:a=t,A=2*n-e;break;case Jo:a=1,A=n+s[1]-s[0];break;default:a=t-1,A=e}let c=(n-e)*.5,l=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(A-n),this._offsetPrev=r*l,this._offsetNext=a*l}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,A=t*o,c=A-o,l=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,m=(n-e)/(s-e),E=m*m,p=E*m,f=-u*p+2*u*E-u*m,M=(1+u)*p+(-1.5-2*u)*E+(-.5+u)*m+1,C=(-1-d)*p+(1.5+d)*E+.5*m,x=d*p-d*E;for(let S=0;S!==o;++S)r[S]=f*a[l+S]+M*a[c+S]+C*a[A+S]+x*a[h+S];return r}},$r=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,A=t*o,c=A-o,l=(n-e)/(s-e),h=1-l;for(let u=0;u!==o;++u)r[u]=a[c+u]*h+a[A+u]*l;return r}},ta=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ze=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ir(e,this.TimeBufferType),this.values=Ir(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ir(t.times,Array),values:Ir(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ta(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $r(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new jr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ms:e=this.InterpolantFactoryMethodDiscrete;break;case Nr:e=this.InterpolantFactoryMethodLinear;break;case Tr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return Nr;case this.InterpolantFactoryMethodSmooth:return Tr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let A=n[o];if(typeof A=="number"&&isNaN(A)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,A),t=!1;break}if(a!==null&&a>A){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,A,a),t=!1;break}a=A}if(s!==void 0&&xu(s))for(let o=0,A=s.length;o!==A;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Tr,r=t.length-1,a=1;for(let o=1;o<r;++o){let A=!1,c=t[o],l=t[o+1];if(c!==l&&(o!==1||c!==t[0]))if(s)A=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let E=e[h+m];if(E!==e[u+m]||E!==e[d+m]){A=!0;break}}}if(A){if(o!==a){t[a]=t[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)e[u+d]=e[h+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,A=a*n,c=0;c!==n;++c)e[A+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ze.prototype.ValueTypeName="";Ze.prototype.TimeBufferType=Float32Array;Ze.prototype.ValueBufferType=Float32Array;Ze.prototype.DefaultInterpolation=Nr;var zn=class extends Ze{constructor(t,e,n){super(t,e,n)}};zn.prototype.ValueTypeName="bool";zn.prototype.ValueBufferType=Array;zn.prototype.DefaultInterpolation=ms;zn.prototype.InterpolantFactoryMethodLinear=void 0;zn.prototype.InterpolantFactoryMethodSmooth=void 0;var ea=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};ea.prototype.ValueTypeName="color";var na=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};na.prototype.ValueTypeName="number";var ia=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,A=(n-e)/(s-e),c=t*o;for(let l=c+o;c!==l;c+=4)An.slerpFlat(r,0,a,c-o,a,c,A);return r}},zs=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ia(this.times,this.values,this.getValueSize(),t)}};zs.prototype.ValueTypeName="quaternion";zs.prototype.InterpolantFactoryMethodSmooth=void 0;var Vn=class extends Ze{constructor(t,e,n){super(t,e,n)}};Vn.prototype.ValueTypeName="string";Vn.prototype.ValueBufferType=Array;Vn.prototype.DefaultInterpolation=ms;Vn.prototype.InterpolantFactoryMethodLinear=void 0;Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var sa=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};sa.prototype.ValueTypeName="vector";var ra=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,A,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(l){o++,r===!1&&s.onStart!==void 0&&s.onStart(l,a,o),r=!0},this.itemEnd=function(l){a++,s.onProgress!==void 0&&s.onProgress(l,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return A?A(l):l},this.setURLModifier=function(l){return A=l,this},this.addHandler=function(l,h){return c.push(l,h),this},this.removeHandler=function(l){let h=c.indexOf(l);return h!==-1&&c.splice(h,2),this},this.getHandler=function(l){for(let h=0,u=c.length;h<u;h+=2){let d=c[h],m=c[h+1];if(d.global&&(d.lastIndex=0),d.test(l))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},gl=new ra,aa=class{constructor(t){this.manager=t!==void 0?t:gl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};aa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yi=class extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Vs=class extends Yi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Vo=new se,Bc=new P,vc=new P,oa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gi,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Bc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Bc),vc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vc),e.updateMatrixWorld(),Vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Cc=new se,ls=new P,Yo=new P,tA=class extends oa{constructor(){super(new Be(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ls.setFromMatrixPosition(t.matrixWorld),n.position.copy(ls),Yo.copy(n.position),Yo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Yo),n.updateMatrixWorld(),s.makeTranslation(-ls.x,-ls.y,-ls.z),Cc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cc,n.coordinateSystem,n.reversedDepth)}},Ys=class extends Yi{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new tA}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ws=class extends Ms{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,A=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=l*this.view.offsetY,A=o-l*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,A,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},eA=class extends oa{constructor(){super(new Ws(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ks=class extends Yi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new eA}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Aa=class extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Js=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var vA="\\[\\]\\.:\\/",Bu=new RegExp("["+vA+"]","g"),CA="[^"+vA+"]",vu="[^"+vA.replace("\\.","")+"]",Cu=/((?:WC+[\/:])*)/.source.replace("WC",CA),Mu=/(WCOD+)?/.source.replace("WCOD",vu),yu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",CA),_u=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",CA),bu=new RegExp("^"+Cu+Mu+yu+_u+"$"),Du=["material","materials","bones","map"],nA=class{constructor(t,e,n){let s=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Bu,"")}static parseTrackName(t){let e=bu.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Du.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let A=n(o.children);if(A)return A}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let l=0;l<t.length;l++)if(t[l].name===c){c=l;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let A=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}A=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(A=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(A=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[A],this.setValue=this.SetterByBindingTypeAndVersioning[A][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=nA;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bg=new Float32Array(1);function MA(i,t,e,n){let s=Su(n);switch(e){case fA:return i*t;case ya:return i*t/s.components*s.byteLength;case _a:return i*t/s.components*s.byteLength;case pA:return i*t*2/s.components*s.byteLength;case ba:return i*t*2/s.components*s.byteLength;case dA:return i*t*3/s.components*s.byteLength;case tn:return i*t*4/s.components*s.byteLength;case Da:return i*t*4/s.components*s.byteLength;case Xs:case qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case js:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Ra:return Math.max(i,16)*Math.max(t,8)/4;case Sa:case Ta:return Math.max(i,8)*Math.max(t,8)/2;case Pa:case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ka:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xa:case qa:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*16;case $a:case to:return Math.ceil(i/4)*Math.ceil(t/4)*8;case eo:case no:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Su(i){switch(i){case cn:case cA:return{byteLength:1,components:1};case Wi:case lA:case ki:return{byteLength:2,components:1};case Ca:case Ma:return{byteLength:2,components:4};case Wn:case va:case ln:return{byteLength:4,components:1};case hA:case uA:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Ul(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Nu(i){let t=new WeakMap;function e(o,A){let c=o.array,l=o.usage,h=c.byteLength,u=i.createBuffer();i.bindBuffer(A,u),i.bufferData(A,c,l),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,A,c){let l=A.array,h=A.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,l);else{h.sort((d,m)=>d.start-m.start);let u=0;for(let d=1;d<h.length;d++){let m=h[u],E=h[d];E.start<=m.start+m.count+1?m.count=Math.max(m.count,E.start+E.count-m.start):(++u,h[u]=E)}h.length=u+1;for(let d=0,m=h.length;d<m;d++){let E=h[d];i.bufferSubData(c,E.start*l.BYTES_PER_ELEMENT,l,E.start,E.count)}A.clearUpdateRanges()}A.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let A=t.get(o);A&&(i.deleteBuffer(A.buffer),t.delete(o))}function a(o,A){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let l=t.get(o);(!l||l.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,A));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,A),c.version=o.version}}return{get:s,remove:r,update:a}}var Ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ju=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ku=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,af=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,of=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",pf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ef=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Df=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,If=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ff=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Of=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$f=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,td=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ed=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ad=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ad=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ld=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ud=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,md=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ed=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,xd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Md=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_d=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Id=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Td=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Od=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ud=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,np=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ap=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:Ou,alphahash_pars_fragment:Hu,alphamap_fragment:Gu,alphamap_pars_fragment:Qu,alphatest_fragment:Uu,alphatest_pars_fragment:zu,aomap_fragment:Vu,aomap_pars_fragment:Yu,batching_pars_vertex:Wu,batching_vertex:ku,begin_vertex:Ju,beginnormal_vertex:Ku,bsdfs:Zu,iridescence_fragment:Xu,bumpmap_pars_fragment:qu,clipping_planes_fragment:ju,clipping_planes_pars_fragment:$u,clipping_planes_pars_vertex:tf,clipping_planes_vertex:ef,color_fragment:nf,color_pars_fragment:sf,color_pars_vertex:rf,color_vertex:af,common:of,cube_uv_reflection_fragment:Af,defaultnormal_vertex:cf,displacementmap_pars_vertex:lf,displacementmap_vertex:hf,emissivemap_fragment:uf,emissivemap_pars_fragment:ff,colorspace_fragment:df,colorspace_pars_fragment:pf,envmap_fragment:mf,envmap_common_pars_fragment:gf,envmap_pars_fragment:Ef,envmap_pars_vertex:wf,envmap_physical_pars_fragment:If,envmap_vertex:xf,fog_vertex:Bf,fog_pars_vertex:vf,fog_fragment:Cf,fog_pars_fragment:Mf,gradientmap_pars_fragment:yf,lightmap_pars_fragment:_f,lights_lambert_fragment:bf,lights_lambert_pars_fragment:Df,lights_pars_begin:Sf,lights_toon_fragment:Tf,lights_toon_pars_fragment:Rf,lights_phong_fragment:Pf,lights_phong_pars_fragment:Ff,lights_physical_fragment:Lf,lights_physical_pars_fragment:Nf,lights_fragment_begin:Of,lights_fragment_maps:Hf,lights_fragment_end:Gf,logdepthbuf_fragment:Qf,logdepthbuf_pars_fragment:Uf,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:Vf,map_fragment:Yf,map_pars_fragment:Wf,map_particle_fragment:kf,map_particle_pars_fragment:Jf,metalnessmap_fragment:Kf,metalnessmap_pars_fragment:Zf,morphinstance_vertex:Xf,morphcolor_vertex:qf,morphnormal_vertex:jf,morphtarget_pars_vertex:$f,morphtarget_vertex:td,normal_fragment_begin:ed,normal_fragment_maps:nd,normal_pars_fragment:id,normal_pars_vertex:sd,normal_vertex:rd,normalmap_pars_fragment:ad,clearcoat_normal_fragment_begin:od,clearcoat_normal_fragment_maps:Ad,clearcoat_pars_fragment:cd,iridescence_pars_fragment:ld,opaque_fragment:hd,packing:ud,premultiplied_alpha_fragment:fd,project_vertex:dd,dithering_fragment:pd,dithering_pars_fragment:md,roughnessmap_fragment:gd,roughnessmap_pars_fragment:Ed,shadowmap_pars_fragment:wd,shadowmap_pars_vertex:xd,shadowmap_vertex:Bd,shadowmask_pars_fragment:vd,skinbase_vertex:Cd,skinning_pars_vertex:Md,skinning_vertex:yd,skinnormal_vertex:_d,specularmap_fragment:bd,specularmap_pars_fragment:Dd,tonemapping_fragment:Sd,tonemapping_pars_fragment:Id,transmission_fragment:Td,transmission_pars_fragment:Rd,uv_pars_fragment:Pd,uv_pars_vertex:Fd,uv_vertex:Ld,worldpos_vertex:Nd,background_vert:Od,background_frag:Hd,backgroundCube_vert:Gd,backgroundCube_frag:Qd,cube_vert:Ud,cube_frag:zd,depth_vert:Vd,depth_frag:Yd,distanceRGBA_vert:Wd,distanceRGBA_frag:kd,equirect_vert:Jd,equirect_frag:Kd,linedashed_vert:Zd,linedashed_frag:Xd,meshbasic_vert:qd,meshbasic_frag:jd,meshlambert_vert:$d,meshlambert_frag:tp,meshmatcap_vert:ep,meshmatcap_frag:np,meshnormal_vert:ip,meshnormal_frag:sp,meshphong_vert:rp,meshphong_frag:ap,meshphysical_vert:op,meshphysical_frag:Ap,meshtoon_vert:cp,meshtoon_frag:lp,points_vert:hp,points_frag:up,shadow_vert:fp,shadow_frag:dp,sprite_vert:pp,sprite_frag:mp},Et={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},pn={basic:{uniforms:Se([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Se([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Se([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Se([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Se([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Se([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Se([Et.points,Et.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Se([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Se([Et.common,Et.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Se([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Se([Et.sprite,Et.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Se([Et.common,Et.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Se([Et.lights,Et.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};pn.physical={uniforms:Se([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var ro={r:0,b:0,g:0},fi=new Qe,gp=new se;function Ep(i,t,e,n,s,r,a){let o=new Ut(0),A=r===!0?0:1,c,l,h=null,u=0,d=null;function m(C){let x=C.isScene===!0?C.background:null;return x&&x.isTexture&&(x=(C.backgroundBlurriness>0?e:t).get(x)),x}function E(C){let x=!1,S=m(C);S===null?f(o,A):S&&S.isColor&&(f(S,1),x=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(C,x){let S=m(x);S&&(S.isCubeTexture||S.mapping===Ks)?(l===void 0&&(l=new Ft(new me(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:ui(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,R,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),fi.copy(x.backgroundRotation),fi.x*=-1,fi.y*=-1,fi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gp.makeRotationFromEuler(fi)),l.material.toneMapped=jt.getTransfer(S.colorSpace)!==ne,(h!==S||u!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Ft(new De(2,2),new Je({name:"BackgroundMaterial",uniforms:ui(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(S.colorSpace)!==ne,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null))}function f(C,x){C.getRGB(ro,xA(i)),n.buffers.color.setClear(ro.r,ro.g,ro.b,x,a)}function M(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(C,x=1){o.set(C),A=x,f(o,A)},getClearAlpha:function(){return A},setClearAlpha:function(C){A=C,f(o,A)},render:E,addToRenderList:p,dispose:M}}function wp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(w,D,O,b,L){let U=!1,G=h(b,O,D);r!==G&&(r=G,c(r.object)),U=d(w,b,O,L),U&&m(w,b,O,L),L!==null&&t.update(L,i.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,x(w,D,O,b),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function A(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function l(w){return i.deleteVertexArray(w)}function h(w,D,O){let b=O.wireframe===!0,L=n[w.id];L===void 0&&(L={},n[w.id]=L);let U=L[D.id];U===void 0&&(U={},L[D.id]=U);let G=U[b];return G===void 0&&(G=u(A()),U[b]=G),G}function u(w){let D=[],O=[],b=[];for(let L=0;L<e;L++)D[L]=0,O[L]=0,b[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:b,object:w,attributes:{},index:null}}function d(w,D,O,b){let L=r.attributes,U=D.attributes,G=0,k=O.getAttributes();for(let z in k)if(k[z].location>=0){let At=L[z],ft=U[z];if(ft===void 0&&(z==="instanceMatrix"&&w.instanceMatrix&&(ft=w.instanceMatrix),z==="instanceColor"&&w.instanceColor&&(ft=w.instanceColor)),At===void 0||At.attribute!==ft||ft&&At.data!==ft.data)return!0;G++}return r.attributesNum!==G||r.index!==b}function m(w,D,O,b){let L={},U=D.attributes,G=0,k=O.getAttributes();for(let z in k)if(k[z].location>=0){let At=U[z];At===void 0&&(z==="instanceMatrix"&&w.instanceMatrix&&(At=w.instanceMatrix),z==="instanceColor"&&w.instanceColor&&(At=w.instanceColor));let ft={};ft.attribute=At,At&&At.data&&(ft.data=At.data),L[z]=ft,G++}r.attributes=L,r.attributesNum=G,r.index=b}function E(){let w=r.newAttributes;for(let D=0,O=w.length;D<O;D++)w[D]=0}function p(w){f(w,0)}function f(w,D){let O=r.newAttributes,b=r.enabledAttributes,L=r.attributeDivisors;O[w]=1,b[w]===0&&(i.enableVertexAttribArray(w),b[w]=1),L[w]!==D&&(i.vertexAttribDivisor(w,D),L[w]=D)}function M(){let w=r.newAttributes,D=r.enabledAttributes;for(let O=0,b=D.length;O<b;O++)D[O]!==w[O]&&(i.disableVertexAttribArray(O),D[O]=0)}function C(w,D,O,b,L,U,G){G===!0?i.vertexAttribIPointer(w,D,O,L,U):i.vertexAttribPointer(w,D,O,b,L,U)}function x(w,D,O,b){E();let L=b.attributes,U=O.getAttributes(),G=D.defaultAttributeValues;for(let k in U){let z=U[k];if(z.location>=0){let j=L[k];if(j===void 0&&(k==="instanceMatrix"&&w.instanceMatrix&&(j=w.instanceMatrix),k==="instanceColor"&&w.instanceColor&&(j=w.instanceColor)),j!==void 0){let At=j.normalized,ft=j.itemSize,Tt=t.get(j);if(Tt===void 0)continue;let zt=Tt.buffer,Zt=Tt.type,Jt=Tt.bytesPerElement,K=Zt===i.INT||Zt===i.UNSIGNED_INT||j.gpuType===va;if(j.isInterleavedBufferAttribute){let rt=j.data,Ct=rt.stride,_t=j.offset;if(rt.isInstancedInterleavedBuffer){for(let yt=0;yt<z.locationSize;yt++)f(z.location+yt,rt.meshPerAttribute);w.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let yt=0;yt<z.locationSize;yt++)p(z.location+yt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let yt=0;yt<z.locationSize;yt++)C(z.location+yt,ft/z.locationSize,Zt,At,Ct*Jt,(_t+ft/z.locationSize*yt)*Jt,K)}else{if(j.isInstancedBufferAttribute){for(let rt=0;rt<z.locationSize;rt++)f(z.location+rt,j.meshPerAttribute);w.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let rt=0;rt<z.locationSize;rt++)p(z.location+rt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let rt=0;rt<z.locationSize;rt++)C(z.location+rt,ft/z.locationSize,Zt,At,ft*Jt,ft/z.locationSize*rt*Jt,K)}}else if(G!==void 0){let At=G[k];if(At!==void 0)switch(At.length){case 2:i.vertexAttrib2fv(z.location,At);break;case 3:i.vertexAttrib3fv(z.location,At);break;case 4:i.vertexAttrib4fv(z.location,At);break;default:i.vertexAttrib1fv(z.location,At)}}}}M()}function S(){F();for(let w in n){let D=n[w];for(let O in D){let b=D[O];for(let L in b)l(b[L].object),delete b[L];delete D[O]}delete n[w]}}function _(w){if(n[w.id]===void 0)return;let D=n[w.id];for(let O in D){let b=D[O];for(let L in b)l(b[L].object),delete b[L];delete D[O]}delete n[w.id]}function R(w){for(let D in n){let O=n[D];if(O[w.id]===void 0)continue;let b=O[w.id];for(let L in b)l(b[L].object),delete b[L];delete O[w.id]}}function F(){B(),a=!0,r!==s&&(r=s,c(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:B,dispose:S,releaseStatesOfGeometry:_,releaseStatesOfProgram:R,initAttributes:E,enableAttribute:p,disableUnusedAttributes:M}}function xp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let m=0;m<h;m++)d+=l[m];e.update(d,n,1)}function A(c,l,h,u){if(h===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)a(c[m],l[m],u[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,l,0,u,0,h);let m=0;for(let E=0;E<h;E++)m+=l[E]*u[E];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=A}function Bp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==tn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let F=R===ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ln&&!F)}function A(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",l=A(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);let h=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=m>0,_=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:A,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:m,maxTextureSize:E,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:M,maxVaryings:C,maxFragmentUniforms:x,vertexTextures:S,maxSamples:_}}function vp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new hn,o=new Vt,A={value:null,needsUpdate:!1};this.uniform=A,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||s;return s=u,n=h.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){e=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,E=h.clipIntersection,p=h.clipShadows,f=i.get(h);if(!s||m===null||m.length===0||r&&!p)r?l(null):c();else{let M=r?0:n,C=M*4,x=f.clippingState||null;A.value=x,x=l(m,u,C,d);for(let S=0;S!==C;++S)x[S]=e[S];f.clippingState=x,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=M}};function c(){A.value!==e&&(A.value=e,A.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function l(h,u,d,m){let E=h!==null?h.length:0,p=null;if(E!==0){if(p=A.value,m!==!0||p===null){let f=d+E*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<f)&&(p=new Float32Array(f));for(let C=0,x=d;C!==E;++C,x+=4)a.copy(h[C]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}A.value=p,A.needsUpdate=!0}return t.numPlanes=E,t.numIntersection=0,p}}function Cp(i){let t=new WeakMap;function e(a,o){return o===wa?a.mapping=ci:o===xa&&(a.mapping=li),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===wa||o===xa)if(t.has(a)){let A=t.get(a).texture;return e(A,a.mapping)}else{let A=a.image;if(A&&A.height>0){let c=new zr(A.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let A=t.get(o);A!==void 0&&(t.delete(o),A.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Xi=4,El=[.125,.215,.35,.446,.526,.582],mi=20,yA=new Ws,wl=new Ut,_A=null,bA=0,DA=0,SA=!1,pi=(1+Math.sqrt(5))/2,Zi=1/pi,xl=[new P(-pi,Zi,0),new P(pi,Zi,0),new P(-Zi,0,pi),new P(Zi,0,pi),new P(0,pi,-Zi),new P(0,pi,Zi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Mp=new P,ji=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Mp}=r;_A=this._renderer.getRenderTarget(),bA=this._renderer.getActiveCubeFace(),DA=this._renderer.getActiveMipmapLevel(),SA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let A=this._allocateTargets();return A.depthBuffer=!0,this._sceneToCubeUV(t,n,s,A,o),e>0&&this._blur(A,0,0,e),this._applyPMREM(A),this._cleanup(A),A}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_A,bA,DA),this._renderer.xr.enabled=SA,t.scissorTest=!1,ao(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ci||t.mapping===li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_A=this._renderer.getRenderTarget(),bA=this._renderer.getActiveCubeFace(),DA=this._renderer.getActiveMipmapLevel(),SA=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:ki,format:tn,colorSpace:ni,depthBuffer:!1},s=Bl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bl(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yp(r)),this._blurMaterial=_p(r,t,e)}return s}_compileMaterial(t){let e=new Ft(this._lodPlanes[0],t);this._renderer.compile(e,yA)}_sceneToCubeUV(t,e,n,s,r){let A=new Be(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(wl),h.toneMapping=_n,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let E=new Un({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),p=new Ft(new me,E),f=!1,M=t.background;M?M.isColor&&(E.color.copy(M),t.background=null,f=!0):(E.color.copy(wl),f=!0);for(let C=0;C<6;C++){let x=C%3;x===0?(A.up.set(0,c[C],0),A.position.set(r.x,r.y,r.z),A.lookAt(r.x+l[C],r.y,r.z)):x===1?(A.up.set(0,0,c[C]),A.position.set(r.x,r.y,r.z),A.lookAt(r.x,r.y+l[C],r.z)):(A.up.set(0,c[C],0),A.position.set(r.x,r.y,r.z),A.lookAt(r.x,r.y,r.z+l[C]));let S=this._cubeSize;ao(s,x*S,C>2?S:0,S,S),h.setRenderTarget(s),f&&h.render(p,A),h.render(t,A)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ci||t.mapping===li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vl());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let A=this._cubeSize;ao(e,0,0,3*A,2*A),n.setRenderTarget(e),n.render(a,yA)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xl[(s-r-1)%xl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let A=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let l=3,h=new Ft(this._lodPlanes[s],c),u=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*mi-1),E=r/m,p=isFinite(r)?1+Math.floor(l*E):mi;p>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);let f=[],M=0;for(let R=0;R<mi;++R){let F=R/E,B=Math.exp(-F*F/2);f.push(B),R===0?M+=B:R<p&&(M+=2*B)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:C}=this;u.dTheta.value=m,u.mipInt.value=C-n;let x=this._sizeLods[s],S=3*x*(s>C-Xi?s-C+Xi:0),_=4*(this._cubeSize-x);ao(e,S,_,3*x,2*x),A.setRenderTarget(e),A.render(h,yA)}};function yp(i){let t=[],e=[],n=[],s=i,r=i-Xi+1+El.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let A=1/o;a>i-Xi?A=El[a-i+Xi-1]:a===0&&(A=0),n.push(A);let c=1/(o-2),l=-c,h=1+c,u=[l,l,h,l,h,h,l,l,h,h,l,h],d=6,m=6,E=3,p=2,f=1,M=new Float32Array(E*m*d),C=new Float32Array(p*m*d),x=new Float32Array(f*m*d);for(let _=0;_<d;_++){let R=_%3*2/3-1,F=_>2?0:-1,B=[R,F,0,R+2/3,F,0,R+2/3,F+1,0,R,F,0,R+2/3,F+1,0,R,F+1,0];M.set(B,E*m*_),C.set(u,p*m*_);let w=[_,_,_,_,_,_];x.set(w,f*m*_)}let S=new ve;S.setAttribute("position",new fe(M,E)),S.setAttribute("uv",new fe(C,p)),S.setAttribute("faceIndex",new fe(x,f)),t.push(S),s>Xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Bl(i,t,e){let n=new un(i,t,e);return n.texture.mapping=Ks,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ao(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function _p(i,t,e){let n=new Float32Array(mi),s=new P(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:GA(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function vl(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:GA(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Cl(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:GA(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function GA(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let A=o.mapping,c=A===wa||A===xa,l=A===ci||A===li;if(c||l){let h=t.get(o),u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new ji(i)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{let d=o.image;return c&&d&&d.height>0||l&&d&&s(d)?(e===null&&(e=new ji(i)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let A=0,c=6;for(let l=0;l<c;l++)o[l]!==void 0&&A++;return A===c}function r(o){let A=o.target;A.removeEventListener("dispose",r);let c=t.get(A);c!==void 0&&(t.delete(A),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Dp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Li("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Sp(i,t,e,n){let s={},r=new WeakMap;function a(h){let u=h.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function A(h){let u=h.attributes;for(let d in u)t.update(u[d],i.ARRAY_BUFFER)}function c(h){let u=[],d=h.index,m=h.attributes.position,E=0;if(d!==null){let M=d.array;E=d.version;for(let C=0,x=M.length;C<x;C+=3){let S=M[C+0],_=M[C+1],R=M[C+2];u.push(S,_,_,R,R,S)}}else if(m!==void 0){let M=m.array;E=m.version;for(let C=0,x=M.length/3-1;C<x;C+=3){let S=C+0,_=C+1,R=C+2;u.push(S,_,_,R,R,S)}}else return;let p=new(wA(u)?Cs:vs)(u,1);p.version=E;let f=r.get(h);f&&t.remove(f),r.set(h,p)}function l(h){let u=r.get(h);if(u){let d=h.index;d!==null&&u.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:A,getWireframeAttribute:l}}function Ip(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function A(u,d){i.drawElements(n,d,r,u*a),e.update(d,n,1)}function c(u,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,u*a,m),e.update(d,n,m))}function l(u,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,m);let p=0;for(let f=0;f<m;f++)p+=d[f];e.update(p,n,1)}function h(u,d,m,E){if(m===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)c(u[f]/a,d[f],E[f]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,u,0,E,0,m);let f=0;for(let M=0;M<m;M++)f+=d[M]*E[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=A,this.renderInstances=c,this.renderMultiDraw=l,this.renderMultiDrawInstances=h}function Tp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Rp(i,t,e){let n=new WeakMap,s=new ee;function r(a,o,A){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(o);if(u===void 0||u.count!==h){let B=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",B)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],C=0;d===!0&&(C=1),m===!0&&(C=2),E===!0&&(C=3);let x=o.attributes.position.count*C,S=1;x>t.maxTextureSize&&(S=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let _=new Float32Array(x*S*4*h),R=new xs(_,x,S,h);R.type=ln,R.needsUpdate=!0;let F=C*4;for(let w=0;w<h;w++){let D=p[w],O=f[w],b=M[w],L=x*S*4*w;for(let U=0;U<D.count;U++){let G=U*F;d===!0&&(s.fromBufferAttribute(D,U),_[L+G+0]=s.x,_[L+G+1]=s.y,_[L+G+2]=s.z,_[L+G+3]=0),m===!0&&(s.fromBufferAttribute(O,U),_[L+G+4]=s.x,_[L+G+5]=s.y,_[L+G+6]=s.z,_[L+G+7]=0),E===!0&&(s.fromBufferAttribute(b,U),_[L+G+8]=s.x,_[L+G+9]=s.y,_[L+G+10]=s.z,_[L+G+11]=b.itemSize===4?s.w:1)}}u={count:h,texture:R,size:new mt(x,S)},n.set(o,u),o.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)A.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let E=0;E<c.length;E++)d+=c[E];let m=o.morphTargetsRelative?1:1-d;A.getUniforms().setValue(i,"morphTargetBaseInfluence",m),A.getUniforms().setValue(i,"morphTargetInfluences",c)}A.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),A.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Pp(i,t,e,n){let s=new WeakMap;function r(A){let c=n.render.frame,l=A.geometry,h=t.get(A,l);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),A.isInstancedMesh&&(A.hasEventListener("dispose",o)===!1&&A.addEventListener("dispose",o),s.get(A)!==c&&(e.update(A.instanceMatrix,i.ARRAY_BUFFER),A.instanceColor!==null&&e.update(A.instanceColor,i.ARRAY_BUFFER),s.set(A,c))),A.isSkinnedMesh){let u=A.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h}function a(){s=new WeakMap}function o(A){let c=A.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var zl=new Le,Ml=new Ds(1,1),Vl=new xs,Yl=new Gr,Wl=new ys,yl=[],_l=[],bl=new Float32Array(16),Dl=new Float32Array(9),Sl=new Float32Array(4);function $i(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=yl[s];if(r===void 0&&(r=new Float32Array(s),yl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function co(i,t){let e=_l[t];e===void 0&&(e=new Int32Array(t),_l[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Fp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Lp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Op(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Hp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(ge(e,n))return;Sl.set(n),i.uniformMatrix2fv(this.addr,!1,Sl),Ee(e,n)}}function Gp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(ge(e,n))return;Dl.set(n),i.uniformMatrix3fv(this.addr,!1,Dl),Ee(e,n)}}function Qp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(ge(e,n))return;bl.set(n),i.uniformMatrix4fv(this.addr,!1,bl),Ee(e,n)}}function Up(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Vp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Yp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function Wp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function Jp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function Kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Zp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=mA,r=Ml):r=zl,e.setTexture2D(t||r,s)}function Xp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Yl,s)}function qp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wl,s)}function jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Vl,s)}function $p(i){switch(i){case 5126:return Fp;case 35664:return Lp;case 35665:return Np;case 35666:return Op;case 35674:return Hp;case 35675:return Gp;case 35676:return Qp;case 5124:case 35670:return Up;case 35667:case 35671:return zp;case 35668:case 35672:return Vp;case 35669:case 35673:return Yp;case 5125:return Wp;case 36294:return kp;case 36295:return Jp;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return qp;case 36289:case 36303:case 36311:case 36292:return jp}}function tm(i,t){i.uniform1fv(this.addr,t)}function em(i,t){let e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function nm(i,t){let e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function im(i,t){let e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function sm(i,t){let e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function rm(i,t){let e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function am(i,t){let e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function om(i,t){i.uniform1iv(this.addr,t)}function Am(i,t){i.uniform2iv(this.addr,t)}function cm(i,t){i.uniform3iv(this.addr,t)}function lm(i,t){i.uniform4iv(this.addr,t)}function hm(i,t){i.uniform1uiv(this.addr,t)}function um(i,t){i.uniform2uiv(this.addr,t)}function fm(i,t){i.uniform3uiv(this.addr,t)}function dm(i,t){i.uniform4uiv(this.addr,t)}function pm(i,t,e){let n=this.cache,s=t.length,r=co(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||zl,r[a])}function mm(i,t,e){let n=this.cache,s=t.length,r=co(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Yl,r[a])}function gm(i,t,e){let n=this.cache,s=t.length,r=co(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Wl,r[a])}function Em(i,t,e){let n=this.cache,s=t.length,r=co(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Vl,r[a])}function wm(i){switch(i){case 5126:return tm;case 35664:return em;case 35665:return nm;case 35666:return im;case 35674:return sm;case 35675:return rm;case 35676:return am;case 5124:case 35670:return om;case 35667:case 35671:return Am;case 35668:case 35672:return cm;case 35669:case 35673:return lm;case 5125:return hm;case 36294:return um;case 36295:return fm;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return Em}}var TA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=$p(e.type)}},RA=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wm(e.type)}},PA=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},IA=/(\w+)(\])?(\[|\.)?/g;function Il(i,t){i.seq.push(t),i.map[t.id]=t}function xm(i,t,e){let n=i.name,s=n.length;for(IA.lastIndex=0;;){let r=IA.exec(n),a=IA.lastIndex,o=r[1],A=r[2]==="]",c=r[3];if(A&&(o=o|0),c===void 0||c==="["&&a+2===s){Il(e,c===void 0?new TA(o,i,t):new RA(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new PA(o),Il(e,h)),e=h}}}var qi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);xm(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],A=n[o.id];A.needsUpdate!==!1&&o.setValue(t,A.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Tl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Bm=37297,vm=0;function Cm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Rl=new Vt;function Mm(i){jt._getMatrix(Rl,jt.workingColorSpace,i);let t=`mat3( ${Rl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case gs:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Pl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Cm(i.getShaderSource(t),o)}else return r}function ym(i,t){let e=Mm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function _m(i,t){let e;switch(t){case kc:e="Linear";break;case Jc:e="Reinhard";break;case Kc:e="Cineon";break;case Zc:e="ACESFilmic";break;case qc:e="AgX";break;case Ea:e="Neutral";break;case Xc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var oo=new P;function bm(){jt.getLuminanceCoefficients(oo);let i=oo.x.toFixed(4),t=oo.y.toFixed(4),e=oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function Sm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Im(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function tr(i){return i!==""}function Fl(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ll(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function FA(i){return i.replace(Tm,Pm)}var Rm=new Map;function Pm(i,t){let e=Yt[t];if(e===void 0){let n=Rm.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return FA(e)}var Fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nl(i){return i.replace(Fm,Lm)}function Lm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ol(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Nm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sA?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ca?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(t="SHADOWMAP_TYPE_VSM"),t}function Om(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ci:case li:t="ENVMAP_TYPE_CUBE";break;case Ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Hm(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===li&&(t="ENVMAP_MODE_REFRACTION"),t}function Gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ga:t="ENVMAP_BLENDING_MULTIPLY";break;case Yc:t="ENVMAP_BLENDING_MIX";break;case Wc:t="ENVMAP_BLENDING_ADD";break}return t}function Qm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Um(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,A=Nm(e),c=Om(e),l=Hm(e),h=Gm(e),u=Qm(e),d=Dm(e),m=Sm(r),E=s.createProgram(),p,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(tr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(tr).join(`
`),f.length>0&&(f+=`
`)):(p=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+A:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),f=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+A:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_n?"#define TONE_MAPPING":"",e.toneMapping!==_n?Yt.tonemapping_pars_fragment:"",e.toneMapping!==_n?_m("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,ym("linearToOutputTexel",e.outputColorSpace),bm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(tr).join(`
`)),a=FA(a),a=Fl(a,e),a=Ll(a,e),o=FA(o),o=Fl(o,e),o=Ll(o,e),a=Nl(a),o=Nl(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===gA?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gA?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let C=M+p+a,x=M+f+o,S=Tl(s,s.VERTEX_SHADER,C),_=Tl(s,s.FRAGMENT_SHADER,x);s.attachShader(E,S),s.attachShader(E,_),e.index0AttributeName!==void 0?s.bindAttribLocation(E,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E);function R(D){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(E)||"",b=s.getShaderInfoLog(S)||"",L=s.getShaderInfoLog(_)||"",U=O.trim(),G=b.trim(),k=L.trim(),z=!0,j=!0;if(s.getProgramParameter(E,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,E,S,_);else{let At=Pl(s,S,"vertex"),ft=Pl(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(E,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+At+`
`+ft)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(G===""||k==="")&&(j=!1);j&&(D.diagnostics={runnable:z,programLog:U,vertexShader:{log:G,prefix:p},fragmentShader:{log:k,prefix:f}})}s.deleteShader(S),s.deleteShader(_),F=new qi(s,E),B=Im(s,E)}let F;this.getUniforms=function(){return F===void 0&&R(this),F};let B;this.getAttributes=function(){return B===void 0&&R(this),B};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(E,Bm)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(E),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vm++,this.cacheKey=t,this.usedTimes=1,this.program=E,this.vertexShader=S,this.fragmentShader=_,this}var zm=0,LA=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new NA(t),e.set(t,n)),n}},NA=class{constructor(t){this.id=zm++,this.code=t,this.usedTimes=0}};function Vm(i,t,e,n,s,r,a){let o=new Bs,A=new LA,c=new Set,l=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures,d=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(B){return c.add(B),B===0?"uv":`uv${B}`}function p(B,w,D,O,b){let L=O.fog,U=b.geometry,G=B.isMeshStandardMaterial?O.environment:null,k=(B.isMeshStandardMaterial?e:t).get(B.envMap||G),z=k&&k.mapping===Ks?k.image.height:null,j=m[B.type];B.precision!==null&&(d=s.getMaxPrecision(B.precision),d!==B.precision&&console.warn("THREE.WebGLProgram.getParameters:",B.precision,"not supported, using",d,"instead."));let At=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ft=At!==void 0?At.length:0,Tt=0;U.morphAttributes.position!==void 0&&(Tt=1),U.morphAttributes.normal!==void 0&&(Tt=2),U.morphAttributes.color!==void 0&&(Tt=3);let zt,Zt,Jt,K;if(j){let qt=pn[j];zt=qt.vertexShader,Zt=qt.fragmentShader}else zt=B.vertexShader,Zt=B.fragmentShader,A.update(B),Jt=A.getVertexShaderID(B),K=A.getFragmentShaderID(B);let rt=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),_t=b.isInstancedMesh===!0,yt=b.isBatchedMesh===!0,Wt=!!B.map,Xt=!!B.matcap,I=!!k,et=!!B.aoMap,Z=!!B.lightMap,q=!!B.bumpMap,X=!!B.normalMap,pt=!!B.displacementMap,ot=!!B.emissiveMap,dt=!!B.metalnessMap,Qt=!!B.roughnessMap,Ht=B.anisotropy>0,y=B.clearcoat>0,g=B.dispersion>0,H=B.iridescence>0,V=B.sheen>0,it=B.transmission>0,J=Ht&&!!B.anisotropyMap,bt=y&&!!B.clearcoatMap,ut=y&&!!B.clearcoatNormalMap,vt=y&&!!B.clearcoatRoughnessMap,Dt=H&&!!B.iridescenceMap,ct=H&&!!B.iridescenceThicknessMap,wt=V&&!!B.sheenColorMap,Pt=V&&!!B.sheenRoughnessMap,$=!!B.specularMap,st=!!B.specularColorMap,xt=!!B.specularIntensityMap,T=it&&!!B.transmissionMap,nt=it&&!!B.thicknessMap,lt=!!B.gradientMap,gt=!!B.alphaMap,at=B.alphaTest>0,tt=!!B.alphaHash,St=!!B.extensions,Nt=_n;B.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Nt=i.toneMapping);let te={shaderID:j,shaderType:B.type,shaderName:B.name,vertexShader:zt,fragmentShader:Zt,defines:B.defines,customVertexShaderID:Jt,customFragmentShaderID:K,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:d,batching:yt,batchingColor:yt&&b._colorsTexture!==null,instancing:_t,instancingColor:_t&&b.instanceColor!==null,instancingMorph:_t&&b.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:ni,alphaToCoverage:!!B.alphaToCoverage,map:Wt,matcap:Xt,envMap:I,envMapMode:I&&k.mapping,envMapCubeUVHeight:z,aoMap:et,lightMap:Z,bumpMap:q,normalMap:X,displacementMap:u&&pt,emissiveMap:ot,normalMapObjectSpace:X&&B.normalMapType===el,normalMapTangentSpace:X&&B.normalMapType===io,metalnessMap:dt,roughnessMap:Qt,anisotropy:Ht,anisotropyMap:J,clearcoat:y,clearcoatMap:bt,clearcoatNormalMap:ut,clearcoatRoughnessMap:vt,dispersion:g,iridescence:H,iridescenceMap:Dt,iridescenceThicknessMap:ct,sheen:V,sheenColorMap:wt,sheenRoughnessMap:Pt,specularMap:$,specularColorMap:st,specularIntensityMap:xt,transmission:it,transmissionMap:T,thicknessMap:nt,gradientMap:lt,opaque:B.transparent===!1&&B.blending===ti&&B.alphaToCoverage===!1,alphaMap:gt,alphaTest:at,alphaHash:tt,combine:B.combine,mapUv:Wt&&E(B.map.channel),aoMapUv:et&&E(B.aoMap.channel),lightMapUv:Z&&E(B.lightMap.channel),bumpMapUv:q&&E(B.bumpMap.channel),normalMapUv:X&&E(B.normalMap.channel),displacementMapUv:pt&&E(B.displacementMap.channel),emissiveMapUv:ot&&E(B.emissiveMap.channel),metalnessMapUv:dt&&E(B.metalnessMap.channel),roughnessMapUv:Qt&&E(B.roughnessMap.channel),anisotropyMapUv:J&&E(B.anisotropyMap.channel),clearcoatMapUv:bt&&E(B.clearcoatMap.channel),clearcoatNormalMapUv:ut&&E(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&E(B.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&E(B.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&E(B.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&E(B.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&E(B.sheenRoughnessMap.channel),specularMapUv:$&&E(B.specularMap.channel),specularColorMapUv:st&&E(B.specularColorMap.channel),specularIntensityMapUv:xt&&E(B.specularIntensityMap.channel),transmissionMapUv:T&&E(B.transmissionMap.channel),thicknessMapUv:nt&&E(B.thicknessMap.channel),alphaMapUv:gt&&E(B.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(X||Ht),vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!U.attributes.uv&&(Wt||gt),fog:!!L,useFog:B.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:B.flatShading===!0&&B.wireframe===!1,sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ct,skinning:b.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Tt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:B.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Wt&&B.map.isVideoTexture===!0&&jt.getTransfer(B.map.colorSpace)===ne,decodeVideoTextureEmissive:ot&&B.emissiveMap.isVideoTexture===!0&&jt.getTransfer(B.emissiveMap.colorSpace)===ne,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===ze,flipSided:B.side===Ce,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionClipCullDistance:St&&B.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&B.extensions.multiDraw===!0||yt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()};return te.vertexUv1s=c.has(1),te.vertexUv2s=c.has(2),te.vertexUv3s=c.has(3),c.clear(),te}function f(B){let w=[];if(B.shaderID?w.push(B.shaderID):(w.push(B.customVertexShaderID),w.push(B.customFragmentShaderID)),B.defines!==void 0)for(let D in B.defines)w.push(D),w.push(B.defines[D]);return B.isRawShaderMaterial===!1&&(M(w,B),C(w,B),w.push(i.outputColorSpace)),w.push(B.customProgramCacheKey),w.join()}function M(B,w){B.push(w.precision),B.push(w.outputColorSpace),B.push(w.envMapMode),B.push(w.envMapCubeUVHeight),B.push(w.mapUv),B.push(w.alphaMapUv),B.push(w.lightMapUv),B.push(w.aoMapUv),B.push(w.bumpMapUv),B.push(w.normalMapUv),B.push(w.displacementMapUv),B.push(w.emissiveMapUv),B.push(w.metalnessMapUv),B.push(w.roughnessMapUv),B.push(w.anisotropyMapUv),B.push(w.clearcoatMapUv),B.push(w.clearcoatNormalMapUv),B.push(w.clearcoatRoughnessMapUv),B.push(w.iridescenceMapUv),B.push(w.iridescenceThicknessMapUv),B.push(w.sheenColorMapUv),B.push(w.sheenRoughnessMapUv),B.push(w.specularMapUv),B.push(w.specularColorMapUv),B.push(w.specularIntensityMapUv),B.push(w.transmissionMapUv),B.push(w.thicknessMapUv),B.push(w.combine),B.push(w.fogExp2),B.push(w.sizeAttenuation),B.push(w.morphTargetsCount),B.push(w.morphAttributeCount),B.push(w.numDirLights),B.push(w.numPointLights),B.push(w.numSpotLights),B.push(w.numSpotLightMaps),B.push(w.numHemiLights),B.push(w.numRectAreaLights),B.push(w.numDirLightShadows),B.push(w.numPointLightShadows),B.push(w.numSpotLightShadows),B.push(w.numSpotLightShadowsWithMaps),B.push(w.numLightProbes),B.push(w.shadowMapType),B.push(w.toneMapping),B.push(w.numClippingPlanes),B.push(w.numClipIntersection),B.push(w.depthPacking)}function C(B,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),w.gradientMap&&o.enable(22),B.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),B.push(o.mask)}function x(B){let w=m[B.type],D;if(w){let O=pn[w];D=ul.clone(O.uniforms)}else D=B.uniforms;return D}function S(B,w){let D;for(let O=0,b=l.length;O<b;O++){let L=l[O];if(L.cacheKey===w){D=L,++D.usedTimes;break}}return D===void 0&&(D=new Um(i,w,B,r),l.push(D)),D}function _(B){if(--B.usedTimes===0){let w=l.indexOf(B);l[w]=l[l.length-1],l.pop(),B.destroy()}}function R(B){A.remove(B)}function F(){A.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:x,acquireProgram:S,releaseProgram:_,releaseShaderCache:R,programs:l,dispose:F}}function Ym(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,A){i.get(a)[o]=A}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Wm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Hl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Gl(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,u,d,m,E,p){let f=i[t];return f===void 0?(f={id:h.id,object:h,geometry:u,material:d,groupOrder:m,renderOrder:h.renderOrder,z:E,group:p},i[t]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=d,f.groupOrder=m,f.renderOrder=h.renderOrder,f.z=E,f.group=p),t++,f}function o(h,u,d,m,E,p){let f=a(h,u,d,m,E,p);d.transmission>0?n.push(f):d.transparent===!0?s.push(f):e.push(f)}function A(h,u,d,m,E,p){let f=a(h,u,d,m,E,p);d.transmission>0?n.unshift(f):d.transparent===!0?s.unshift(f):e.unshift(f)}function c(h,u){e.length>1&&e.sort(h||Wm),n.length>1&&n.sort(u||Hl),s.length>1&&s.sort(u||Hl)}function l(){for(let h=t,u=i.length;h<u;h++){let d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:A,finish:l,sort:c}}function km(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Gl,i.set(n,[a])):s>=r.length?(a=new Gl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Jm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Ut};break;case"SpotLight":e={position:new P,direction:new P,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Km(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Zm=0;function Xm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function qm(i){let t=new Jm,e=Km(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new se,a=new se;function o(c){let l=0,h=0,u=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let d=0,m=0,E=0,p=0,f=0,M=0,C=0,x=0,S=0,_=0,R=0;c.sort(Xm);for(let B=0,w=c.length;B<w;B++){let D=c[B],O=D.color,b=D.intensity,L=D.distance,U=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)l+=O.r*b,h+=O.g*b,u+=O.b*b;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],b);R++}else if(D.isDirectionalLight){let G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let k=D.shadow,z=e.get(D);z.shadowIntensity=k.intensity,z.shadowBias=k.bias,z.shadowNormalBias=k.normalBias,z.shadowRadius=k.radius,z.shadowMapSize=k.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=U,n.directionalShadowMatrix[d]=D.shadow.matrix,M++}n.directional[d]=G,d++}else if(D.isSpotLight){let G=t.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(O).multiplyScalar(b),G.distance=L,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[E]=G;let k=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,k.updateMatrices(D),D.castShadow&&_++),n.spotLightMatrix[E]=k.matrix,D.castShadow){let z=e.get(D);z.shadowIntensity=k.intensity,z.shadowBias=k.bias,z.shadowNormalBias=k.normalBias,z.shadowRadius=k.radius,z.shadowMapSize=k.mapSize,n.spotShadow[E]=z,n.spotShadowMap[E]=U,x++}E++}else if(D.isRectAreaLight){let G=t.get(D);G.color.copy(O).multiplyScalar(b),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[p]=G,p++}else if(D.isPointLight){let G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){let k=D.shadow,z=e.get(D);z.shadowIntensity=k.intensity,z.shadowBias=k.bias,z.shadowNormalBias=k.normalBias,z.shadowRadius=k.radius,z.shadowMapSize=k.mapSize,z.shadowCameraNear=k.camera.near,z.shadowCameraFar=k.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=D.shadow.matrix,C++}n.point[m]=G,m++}else if(D.isHemisphereLight){let G=t.get(D);G.skyColor.copy(D.color).multiplyScalar(b),G.groundColor.copy(D.groundColor).multiplyScalar(b),n.hemi[f]=G,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=h,n.ambient[2]=u;let F=n.hash;(F.directionalLength!==d||F.pointLength!==m||F.spotLength!==E||F.rectAreaLength!==p||F.hemiLength!==f||F.numDirectionalShadows!==M||F.numPointShadows!==C||F.numSpotShadows!==x||F.numSpotMaps!==S||F.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=E,n.rectArea.length=p,n.point.length=m,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=x+S-_,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=R,F.directionalLength=d,F.pointLength=m,F.spotLength=E,F.rectAreaLength=p,F.hemiLength=f,F.numDirectionalShadows=M,F.numPointShadows=C,F.numSpotShadows=x,F.numSpotMaps=S,F.numLightProbes=R,n.version=Zm++)}function A(c,l){let h=0,u=0,d=0,m=0,E=0,p=l.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let C=c[f];if(C.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),h++}else if(C.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),d++}else if(C.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(p),a.identity(),r.copy(C.matrixWorld),r.premultiply(p),a.extractRotation(r),x.halfWidth.set(C.width*.5,0,0),x.halfHeight.set(0,C.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(C.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(p),u++}else if(C.isHemisphereLight){let x=n.hemi[E];x.direction.setFromMatrixPosition(C.matrixWorld),x.direction.transformDirection(p),E++}}}return{setup:o,setupView:A,state:n}}function Ql(i){let t=new qm(i),e=[],n=[];function s(l){c.camera=l,e.length=0,n.length=0}function r(l){e.push(l)}function a(l){n.push(l)}function o(){t.setup(e)}function A(l){t.setupView(e,l)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:A,pushLight:r,pushShadow:a}}function jm(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ql(i),t.set(s,[o])):r>=a.length?(o=new Ql(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var $m=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function eg(i,t,e){let n=new Gi,s=new mt,r=new mt,a=new ee,o=new Xr({depthPacking:tl}),A=new qr,c={},l=e.maxTextureSize,h={[vn]:Ce,[Ce]:vn,[ze]:ze},u=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:$m,fragmentShader:tg}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let m=new ve;m.setAttribute("position",new fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let E=new Ft(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sA;let f=this.type;this.render=function(_,R,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||_.length===0)return;let B=i.getRenderTarget(),w=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),O=i.state;O.setBlending(yn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let b=f!==dn&&this.type===dn,L=f===dn&&this.type!==dn;for(let U=0,G=_.length;U<G;U++){let k=_[U],z=k.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let j=z.getFrameExtents();if(s.multiply(j),r.copy(z.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/j.x),s.x=r.x*j.x,z.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/j.y),s.y=r.y*j.y,z.mapSize.y=r.y)),z.map===null||b===!0||L===!0){let ft=this.type!==dn?{minFilter:Ge,magFilter:Ge}:{};z.map!==null&&z.map.dispose(),z.map=new un(s.x,s.y,ft),z.map.texture.name=k.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();let At=z.getViewportCount();for(let ft=0;ft<At;ft++){let Tt=z.getViewport(ft);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),O.viewport(a),z.updateMatrices(k,ft),n=z.getFrustum(),x(R,F,z.camera,k,this.type)}z.isPointLightShadow!==!0&&this.type===dn&&M(z,F),z.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(B,w,D)};function M(_,R){let F=t.update(E);u.defines.VSM_SAMPLES!==_.blurSamples&&(u.defines.VSM_SAMPLES=_.blurSamples,d.defines.VSM_SAMPLES=_.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new un(s.x,s.y)),u.uniforms.shadow_pass.value=_.map.texture,u.uniforms.resolution.value=_.mapSize,u.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(R,null,F,u,E,null),d.uniforms.shadow_pass.value=_.mapPass.texture,d.uniforms.resolution.value=_.mapSize,d.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(R,null,F,d,E,null)}function C(_,R,F,B){let w=null,D=F.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(D!==void 0)w=D;else if(w=F.isPointLight===!0?A:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=w.uuid,b=R.uuid,L=c[O];L===void 0&&(L={},c[O]=L);let U=L[b];U===void 0&&(U=w.clone(),L[b]=U,R.addEventListener("dispose",S)),w=U}if(w.visible=R.visible,w.wireframe=R.wireframe,B===dn?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:h[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,F.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let O=i.properties.get(w);O.light=F}return w}function x(_,R,F,B,w){if(_.visible===!1)return;if(_.layers.test(R.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&w===dn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,_.matrixWorld);let b=t.update(_),L=_.material;if(Array.isArray(L)){let U=b.groups;for(let G=0,k=U.length;G<k;G++){let z=U[G],j=L[z.materialIndex];if(j&&j.visible){let At=C(_,j,B,w);_.onBeforeShadow(i,_,R,F,b,At,z),i.renderBufferDirect(F,null,b,At,_,z),_.onAfterShadow(i,_,R,F,b,At,z)}}}else if(L.visible){let U=C(_,L,B,w);_.onBeforeShadow(i,_,R,F,b,U,null),i.renderBufferDirect(F,null,b,U,_,null),_.onAfterShadow(i,_,R,F,b,U,null)}}let O=_.children;for(let b=0,L=O.length;b<L;b++)x(O[b],R,F,B,w)}function S(_){_.target.removeEventListener("dispose",S);for(let F in c){let B=c[F],w=_.target.uuid;w in B&&(B[w].dispose(),delete B[w])}}}var ng={[la]:ha,[ua]:pa,[fa]:ma,[ei]:da,[ha]:la,[pa]:ua,[ma]:fa,[da]:ei};function ig(i,t){function e(){let T=!1,nt=new ee,lt=null,gt=new ee(0,0,0,0);return{setMask:function(at){lt!==at&&!T&&(i.colorMask(at,at,at,at),lt=at)},setLocked:function(at){T=at},setClear:function(at,tt,St,Nt,te){te===!0&&(at*=Nt,tt*=Nt,St*=Nt),nt.set(at,tt,St,Nt),gt.equals(nt)===!1&&(i.clearColor(at,tt,St,Nt),gt.copy(nt))},reset:function(){T=!1,lt=null,gt.set(-1,0,0,0)}}}function n(){let T=!1,nt=!1,lt=null,gt=null,at=null;return{setReversed:function(tt){if(nt!==tt){let St=t.get("EXT_clip_control");tt?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),nt=tt;let Nt=at;at=null,this.setClear(Nt)}},getReversed:function(){return nt},setTest:function(tt){tt?rt(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(tt){lt!==tt&&!T&&(i.depthMask(tt),lt=tt)},setFunc:function(tt){if(nt&&(tt=ng[tt]),gt!==tt){switch(tt){case la:i.depthFunc(i.NEVER);break;case ha:i.depthFunc(i.ALWAYS);break;case ua:i.depthFunc(i.LESS);break;case ei:i.depthFunc(i.LEQUAL);break;case fa:i.depthFunc(i.EQUAL);break;case da:i.depthFunc(i.GEQUAL);break;case pa:i.depthFunc(i.GREATER);break;case ma:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=tt}},setLocked:function(tt){T=tt},setClear:function(tt){at!==tt&&(nt&&(tt=1-tt),i.clearDepth(tt),at=tt)},reset:function(){T=!1,lt=null,gt=null,at=null,nt=!1}}}function s(){let T=!1,nt=null,lt=null,gt=null,at=null,tt=null,St=null,Nt=null,te=null;return{setTest:function(qt){T||(qt?rt(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(qt){nt!==qt&&!T&&(i.stencilMask(qt),nt=qt)},setFunc:function(qt,Xe,Te){(lt!==qt||gt!==Xe||at!==Te)&&(i.stencilFunc(qt,Xe,Te),lt=qt,gt=Xe,at=Te)},setOp:function(qt,Xe,Te){(tt!==qt||St!==Xe||Nt!==Te)&&(i.stencilOp(qt,Xe,Te),tt=qt,St=Xe,Nt=Te)},setLocked:function(qt){T=qt},setClear:function(qt){te!==qt&&(i.clearStencil(qt),te=qt)},reset:function(){T=!1,nt=null,lt=null,gt=null,at=null,tt=null,St=null,Nt=null,te=null}}}let r=new e,a=new n,o=new s,A=new WeakMap,c=new WeakMap,l={},h={},u=new WeakMap,d=[],m=null,E=!1,p=null,f=null,M=null,C=null,x=null,S=null,_=null,R=new Ut(0,0,0),F=0,B=!1,w=null,D=null,O=null,b=null,L=null,U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,k=0,z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(z)[1]),G=k>=1):z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),G=k>=2);let j=null,At={},ft=i.getParameter(i.SCISSOR_BOX),Tt=i.getParameter(i.VIEWPORT),zt=new ee().fromArray(ft),Zt=new ee().fromArray(Tt);function Jt(T,nt,lt,gt){let at=new Uint8Array(4),tt=i.createTexture();i.bindTexture(T,tt),i.texParameteri(T,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(T,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let St=0;St<lt;St++)T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(nt+St,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return tt}let K={};K[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(i.DEPTH_TEST),a.setFunc(ei),q(!1),X(iA),rt(i.CULL_FACE),et(yn);function rt(T){l[T]!==!0&&(i.enable(T),l[T]=!0)}function Ct(T){l[T]!==!1&&(i.disable(T),l[T]=!1)}function _t(T,nt){return h[T]!==nt?(i.bindFramebuffer(T,nt),h[T]=nt,T===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=nt),T===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function yt(T,nt){let lt=d,gt=!1;if(T){lt=u.get(nt),lt===void 0&&(lt=[],u.set(nt,lt));let at=T.textures;if(lt.length!==at.length||lt[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,St=at.length;tt<St;tt++)lt[tt]=i.COLOR_ATTACHMENT0+tt;lt.length=at.length,gt=!0}}else lt[0]!==i.BACK&&(lt[0]=i.BACK,gt=!0);gt&&i.drawBuffers(lt)}function Wt(T){return m!==T?(i.useProgram(T),m=T,!0):!1}let Xt={[Gn]:i.FUNC_ADD,[bc]:i.FUNC_SUBTRACT,[Dc]:i.FUNC_REVERSE_SUBTRACT};Xt[Sc]=i.MIN,Xt[Ic]=i.MAX;let I={[Tc]:i.ZERO,[Rc]:i.ONE,[Pc]:i.SRC_COLOR,[Rr]:i.SRC_ALPHA,[Gc]:i.SRC_ALPHA_SATURATE,[Oc]:i.DST_COLOR,[Lc]:i.DST_ALPHA,[Fc]:i.ONE_MINUS_SRC_COLOR,[Pr]:i.ONE_MINUS_SRC_ALPHA,[Hc]:i.ONE_MINUS_DST_COLOR,[Nc]:i.ONE_MINUS_DST_ALPHA,[Qc]:i.CONSTANT_COLOR,[Uc]:i.ONE_MINUS_CONSTANT_COLOR,[zc]:i.CONSTANT_ALPHA,[Vc]:i.ONE_MINUS_CONSTANT_ALPHA};function et(T,nt,lt,gt,at,tt,St,Nt,te,qt){if(T===yn){E===!0&&(Ct(i.BLEND),E=!1);return}if(E===!1&&(rt(i.BLEND),E=!0),T!==_c){if(T!==p||qt!==B){if((f!==Gn||x!==Gn)&&(i.blendEquation(i.FUNC_ADD),f=Gn,x=Gn),qt)switch(T){case ti:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rA:i.blendFunc(i.ONE,i.ONE);break;case aA:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oA:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}else switch(T){case ti:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rA:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case aA:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oA:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}M=null,C=null,S=null,_=null,R.set(0,0,0),F=0,p=T,B=qt}return}at=at||nt,tt=tt||lt,St=St||gt,(nt!==f||at!==x)&&(i.blendEquationSeparate(Xt[nt],Xt[at]),f=nt,x=at),(lt!==M||gt!==C||tt!==S||St!==_)&&(i.blendFuncSeparate(I[lt],I[gt],I[tt],I[St]),M=lt,C=gt,S=tt,_=St),(Nt.equals(R)===!1||te!==F)&&(i.blendColor(Nt.r,Nt.g,Nt.b,te),R.copy(Nt),F=te),p=T,B=!1}function Z(T,nt){T.side===ze?Ct(i.CULL_FACE):rt(i.CULL_FACE);let lt=T.side===Ce;nt&&(lt=!lt),q(lt),T.blending===ti&&T.transparent===!1?et(yn):et(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),a.setFunc(T.depthFunc),a.setTest(T.depthTest),a.setMask(T.depthWrite),r.setMask(T.colorWrite);let gt=T.stencilWrite;o.setTest(gt),gt&&(o.setMask(T.stencilWriteMask),o.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),o.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),ot(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function q(T){w!==T&&(T?i.frontFace(i.CW):i.frontFace(i.CCW),w=T)}function X(T){T!==Mc?(rt(i.CULL_FACE),T!==D&&(T===iA?i.cullFace(i.BACK):T===yc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),D=T}function pt(T){T!==O&&(G&&i.lineWidth(T),O=T)}function ot(T,nt,lt){T?(rt(i.POLYGON_OFFSET_FILL),(b!==nt||L!==lt)&&(i.polygonOffset(nt,lt),b=nt,L=lt)):Ct(i.POLYGON_OFFSET_FILL)}function dt(T){T?rt(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function Qt(T){T===void 0&&(T=i.TEXTURE0+U-1),j!==T&&(i.activeTexture(T),j=T)}function Ht(T,nt,lt){lt===void 0&&(j===null?lt=i.TEXTURE0+U-1:lt=j);let gt=At[lt];gt===void 0&&(gt={type:void 0,texture:void 0},At[lt]=gt),(gt.type!==T||gt.texture!==nt)&&(j!==lt&&(i.activeTexture(lt),j=lt),i.bindTexture(T,nt||K[T]),gt.type=T,gt.texture=nt)}function y(){let T=At[j];T!==void 0&&T.type!==void 0&&(i.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function V(){try{i.texSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function it(){try{i.texSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function bt(){try{i.compressedTexSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ut(){try{i.texStorage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function vt(){try{i.texStorage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Dt(){try{i.texImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ct(){try{i.texImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function wt(T){zt.equals(T)===!1&&(i.scissor(T.x,T.y,T.z,T.w),zt.copy(T))}function Pt(T){Zt.equals(T)===!1&&(i.viewport(T.x,T.y,T.z,T.w),Zt.copy(T))}function $(T,nt){let lt=c.get(nt);lt===void 0&&(lt=new WeakMap,c.set(nt,lt));let gt=lt.get(T);gt===void 0&&(gt=i.getUniformBlockIndex(nt,T.name),lt.set(T,gt))}function st(T,nt){let gt=c.get(nt).get(T);A.get(nt)!==gt&&(i.uniformBlockBinding(nt,gt,T.__bindingPointIndex),A.set(nt,gt))}function xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},j=null,At={},h={},u=new WeakMap,d=[],m=null,E=!1,p=null,f=null,M=null,C=null,x=null,S=null,_=null,R=new Ut(0,0,0),F=0,B=!1,w=null,D=null,O=null,b=null,L=null,zt.set(0,0,i.canvas.width,i.canvas.height),Zt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:Ct,bindFramebuffer:_t,drawBuffers:yt,useProgram:Wt,setBlending:et,setMaterial:Z,setFlipSided:q,setCullFace:X,setLineWidth:pt,setPolygonOffset:ot,setScissorTest:dt,activeTexture:Qt,bindTexture:Ht,unbindTexture:y,compressedTexImage2D:g,compressedTexImage3D:H,texImage2D:Dt,texImage3D:ct,updateUBOMapping:$,uniformBlockBinding:st,texStorage2D:ut,texStorage3D:vt,texSubImage2D:V,texSubImage3D:it,compressedTexSubImage2D:J,compressedTexSubImage3D:bt,scissor:wt,viewport:Pt,reset:xt}}function sg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,A=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,l=new WeakMap,h,u=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(y){}function m(y,g){return d?new OffscreenCanvas(y,g):ws("canvas")}function E(y,g,H){let V=1,it=Ht(y);if((it.width>H||it.height>H)&&(V=H/Math.max(it.width,it.height)),V<1)if(typeof HTMLImageElement!="undefined"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&y instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&y instanceof ImageBitmap||typeof VideoFrame!="undefined"&&y instanceof VideoFrame){let J=Math.floor(V*it.width),bt=Math.floor(V*it.height);h===void 0&&(h=m(J,bt));let ut=g?m(J,bt):h;return ut.width=J,ut.height=bt,ut.getContext("2d").drawImage(y,0,0,J,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+J+"x"+bt+")."),ut}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),y;return y}function p(y){return y.generateMipmaps}function f(y){i.generateMipmap(y)}function M(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(y,g,H,V,it=!1){if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let J=g;if(g===i.RED&&(H===i.FLOAT&&(J=i.R32F),H===i.HALF_FLOAT&&(J=i.R16F),H===i.UNSIGNED_BYTE&&(J=i.R8)),g===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.R8UI),H===i.UNSIGNED_SHORT&&(J=i.R16UI),H===i.UNSIGNED_INT&&(J=i.R32UI),H===i.BYTE&&(J=i.R8I),H===i.SHORT&&(J=i.R16I),H===i.INT&&(J=i.R32I)),g===i.RG&&(H===i.FLOAT&&(J=i.RG32F),H===i.HALF_FLOAT&&(J=i.RG16F),H===i.UNSIGNED_BYTE&&(J=i.RG8)),g===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RG8UI),H===i.UNSIGNED_SHORT&&(J=i.RG16UI),H===i.UNSIGNED_INT&&(J=i.RG32UI),H===i.BYTE&&(J=i.RG8I),H===i.SHORT&&(J=i.RG16I),H===i.INT&&(J=i.RG32I)),g===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGB8UI),H===i.UNSIGNED_SHORT&&(J=i.RGB16UI),H===i.UNSIGNED_INT&&(J=i.RGB32UI),H===i.BYTE&&(J=i.RGB8I),H===i.SHORT&&(J=i.RGB16I),H===i.INT&&(J=i.RGB32I)),g===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),H===i.UNSIGNED_INT&&(J=i.RGBA32UI),H===i.BYTE&&(J=i.RGBA8I),H===i.SHORT&&(J=i.RGBA16I),H===i.INT&&(J=i.RGBA32I)),g===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),g===i.RGBA){let bt=it?gs:jt.getTransfer(V);H===i.FLOAT&&(J=i.RGBA32F),H===i.HALF_FLOAT&&(J=i.RGBA16F),H===i.UNSIGNED_BYTE&&(J=bt===ne?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(y,g){let H;return y?g===null||g===Wn||g===Ji?H=i.DEPTH24_STENCIL8:g===ln?H=i.DEPTH32F_STENCIL8:g===Wi&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Wn||g===Ji?H=i.DEPTH_COMPONENT24:g===ln?H=i.DEPTH_COMPONENT32F:g===Wi&&(H=i.DEPTH_COMPONENT16),H}function S(y,g){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==Ge&&y.minFilter!==on?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function _(y){let g=y.target;g.removeEventListener("dispose",_),F(g),g.isVideoTexture&&l.delete(g)}function R(y){let g=y.target;g.removeEventListener("dispose",R),w(g)}function F(y){let g=n.get(y);if(g.__webglInit===void 0)return;let H=y.source,V=u.get(H);if(V){let it=V[g.__cacheKey];it.usedTimes--,it.usedTimes===0&&B(y),Object.keys(V).length===0&&u.delete(H)}n.remove(y)}function B(y){let g=n.get(y);i.deleteTexture(g.__webglTexture);let H=y.source,V=u.get(H);delete V[g.__cacheKey],a.memory.textures--}function w(y){let g=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let it=0;it<g.__webglFramebuffer[V].length;it++)i.deleteFramebuffer(g.__webglFramebuffer[V][it]);else i.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)i.deleteFramebuffer(g.__webglFramebuffer[V]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let H=y.textures;for(let V=0,it=H.length;V<it;V++){let J=n.get(H[V]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(H[V])}n.remove(y)}let D=0;function O(){D=0}function b(){let y=D;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),D+=1,y}function L(y){let g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function U(y,g){let H=n.get(y);if(y.isVideoTexture&&dt(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&H.__version!==y.version){let V=y.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(H,y,g);return}}else y.isExternalTexture&&(H.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+g)}function G(y,g){let H=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&H.__version!==y.version){K(H,y,g);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+g)}function k(y,g){let H=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&H.__version!==y.version){K(H,y,g);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+g)}function z(y,g){let H=n.get(y);if(y.version>0&&H.__version!==y.version){rt(H,y,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+g)}let j={[Fr]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[Lr]:i.MIRRORED_REPEAT},At={[Ge]:i.NEAREST,[jc]:i.NEAREST_MIPMAP_NEAREST,[Zs]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[Ba]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},ft={[nl]:i.NEVER,[Al]:i.ALWAYS,[il]:i.LESS,[mA]:i.LEQUAL,[sl]:i.EQUAL,[ol]:i.GEQUAL,[rl]:i.GREATER,[al]:i.NOTEQUAL};function Tt(y,g){if(g.type===ln&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===on||g.magFilter===Ba||g.magFilter===Zs||g.magFilter===Yn||g.minFilter===on||g.minFilter===Ba||g.minFilter===Zs||g.minFilter===Yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,j[g.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,j[g.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,j[g.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,At[g.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,At[g.minFilter]),g.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,ft[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ge||g.minFilter!==Zs&&g.minFilter!==Yn||g.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(y,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function zt(y,g){let H=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",_));let V=g.source,it=u.get(V);it===void 0&&(it={},u.set(V,it));let J=L(g);if(J!==y.__cacheKey){it[J]===void 0&&(it[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),it[J].usedTimes++;let bt=it[y.__cacheKey];bt!==void 0&&(it[y.__cacheKey].usedTimes--,bt.usedTimes===0&&B(g)),y.__cacheKey=J,y.__webglTexture=it[J].texture}return H}function Zt(y,g,H){return Math.floor(Math.floor(y/H)/g)}function Jt(y,g,H,V){let J=y.updateRanges;if(J.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,H,V,g.data);else{J.sort((ct,wt)=>ct.start-wt.start);let bt=0;for(let ct=1;ct<J.length;ct++){let wt=J[bt],Pt=J[ct],$=wt.start+wt.count,st=Zt(Pt.start,g.width,4),xt=Zt(wt.start,g.width,4);Pt.start<=$+1&&st===xt&&Zt(Pt.start+Pt.count-1,g.width,4)===st?wt.count=Math.max(wt.count,Pt.start+Pt.count-wt.start):(++bt,J[bt]=Pt)}J.length=bt+1;let ut=i.getParameter(i.UNPACK_ROW_LENGTH),vt=i.getParameter(i.UNPACK_SKIP_PIXELS),Dt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let ct=0,wt=J.length;ct<wt;ct++){let Pt=J[ct],$=Math.floor(Pt.start/4),st=Math.ceil(Pt.count/4),xt=$%g.width,T=Math.floor($/g.width),nt=st,lt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,T),e.texSubImage2D(i.TEXTURE_2D,0,xt,T,nt,lt,H,V,g.data)}y.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ut),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Dt)}}function K(y,g,H){let V=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=i.TEXTURE_3D);let it=zt(y,g),J=g.source;e.bindTexture(V,y.__webglTexture,i.TEXTURE0+H);let bt=n.get(J);if(J.version!==bt.__version||it===!0){e.activeTexture(i.TEXTURE0+H);let ut=jt.getPrimaries(jt.workingColorSpace),vt=g.colorSpace===bn?null:jt.getPrimaries(g.colorSpace),Dt=g.colorSpace===bn||ut===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let ct=E(g.image,!1,s.maxTextureSize);ct=Qt(g,ct);let wt=r.convert(g.format,g.colorSpace),Pt=r.convert(g.type),$=C(g.internalFormat,wt,Pt,g.colorSpace,g.isVideoTexture);Tt(V,g);let st,xt=g.mipmaps,T=g.isVideoTexture!==!0,nt=bt.__version===void 0||it===!0,lt=J.dataReady,gt=S(g,ct);if(g.isDepthTexture)$=x(g.format===Ki,g.type),nt&&(T?e.texStorage2D(i.TEXTURE_2D,1,$,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,$,ct.width,ct.height,0,wt,Pt,null));else if(g.isDataTexture)if(xt.length>0){T&&nt&&e.texStorage2D(i.TEXTURE_2D,gt,$,xt[0].width,xt[0].height);for(let at=0,tt=xt.length;at<tt;at++)st=xt[at],T?lt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,st.width,st.height,wt,Pt,st.data):e.texImage2D(i.TEXTURE_2D,at,$,st.width,st.height,0,wt,Pt,st.data);g.generateMipmaps=!1}else T?(nt&&e.texStorage2D(i.TEXTURE_2D,gt,$,ct.width,ct.height),lt&&Jt(g,ct,wt,Pt)):e.texImage2D(i.TEXTURE_2D,0,$,ct.width,ct.height,0,wt,Pt,ct.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){T&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,$,xt[0].width,xt[0].height,ct.depth);for(let at=0,tt=xt.length;at<tt;at++)if(st=xt[at],g.format!==tn)if(wt!==null)if(T){if(lt)if(g.layerUpdates.size>0){let St=MA(st.width,st.height,g.format,g.type);for(let Nt of g.layerUpdates){let te=st.data.subarray(Nt*St/st.data.BYTES_PER_ELEMENT,(Nt+1)*St/st.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,Nt,st.width,st.height,1,wt,te)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,st.width,st.height,ct.depth,wt,st.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,$,st.width,st.height,ct.depth,0,st.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else T?lt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,st.width,st.height,ct.depth,wt,Pt,st.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,$,st.width,st.height,ct.depth,0,wt,Pt,st.data)}else{T&&nt&&e.texStorage2D(i.TEXTURE_2D,gt,$,xt[0].width,xt[0].height);for(let at=0,tt=xt.length;at<tt;at++)st=xt[at],g.format!==tn?wt!==null?T?lt&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,st.width,st.height,wt,st.data):e.compressedTexImage2D(i.TEXTURE_2D,at,$,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):T?lt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,st.width,st.height,wt,Pt,st.data):e.texImage2D(i.TEXTURE_2D,at,$,st.width,st.height,0,wt,Pt,st.data)}else if(g.isDataArrayTexture)if(T){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,$,ct.width,ct.height,ct.depth),lt)if(g.layerUpdates.size>0){let at=MA(ct.width,ct.height,g.format,g.type);for(let tt of g.layerUpdates){let St=ct.data.subarray(tt*at/ct.data.BYTES_PER_ELEMENT,(tt+1)*at/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ct.width,ct.height,1,wt,Pt,St)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,wt,Pt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,$,ct.width,ct.height,ct.depth,0,wt,Pt,ct.data);else if(g.isData3DTexture)T?(nt&&e.texStorage3D(i.TEXTURE_3D,gt,$,ct.width,ct.height,ct.depth),lt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,wt,Pt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,$,ct.width,ct.height,ct.depth,0,wt,Pt,ct.data);else if(g.isFramebufferTexture){if(nt)if(T)e.texStorage2D(i.TEXTURE_2D,gt,$,ct.width,ct.height);else{let at=ct.width,tt=ct.height;for(let St=0;St<gt;St++)e.texImage2D(i.TEXTURE_2D,St,$,at,tt,0,wt,Pt,null),at>>=1,tt>>=1}}else if(xt.length>0){if(T&&nt){let at=Ht(xt[0]);e.texStorage2D(i.TEXTURE_2D,gt,$,at.width,at.height)}for(let at=0,tt=xt.length;at<tt;at++)st=xt[at],T?lt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,wt,Pt,st):e.texImage2D(i.TEXTURE_2D,at,$,wt,Pt,st);g.generateMipmaps=!1}else if(T){if(nt){let at=Ht(ct);e.texStorage2D(i.TEXTURE_2D,gt,$,at.width,at.height)}lt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,wt,Pt,ct)}else e.texImage2D(i.TEXTURE_2D,0,$,wt,Pt,ct);p(g)&&f(V),bt.__version=J.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function rt(y,g,H){if(g.image.length!==6)return;let V=zt(y,g),it=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+H);let J=n.get(it);if(it.version!==J.__version||V===!0){e.activeTexture(i.TEXTURE0+H);let bt=jt.getPrimaries(jt.workingColorSpace),ut=g.colorSpace===bn?null:jt.getPrimaries(g.colorSpace),vt=g.colorSpace===bn||bt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Dt=g.isCompressedTexture||g.image[0].isCompressedTexture,ct=g.image[0]&&g.image[0].isDataTexture,wt=[];for(let tt=0;tt<6;tt++)!Dt&&!ct?wt[tt]=E(g.image[tt],!0,s.maxCubemapSize):wt[tt]=ct?g.image[tt].image:g.image[tt],wt[tt]=Qt(g,wt[tt]);let Pt=wt[0],$=r.convert(g.format,g.colorSpace),st=r.convert(g.type),xt=C(g.internalFormat,$,st,g.colorSpace),T=g.isVideoTexture!==!0,nt=J.__version===void 0||V===!0,lt=it.dataReady,gt=S(g,Pt);Tt(i.TEXTURE_CUBE_MAP,g);let at;if(Dt){T&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,xt,Pt.width,Pt.height);for(let tt=0;tt<6;tt++){at=wt[tt].mipmaps;for(let St=0;St<at.length;St++){let Nt=at[St];g.format!==tn?$!==null?T?lt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,0,0,Nt.width,Nt.height,$,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,xt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):T?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,0,0,Nt.width,Nt.height,$,st,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,xt,Nt.width,Nt.height,0,$,st,Nt.data)}}}else{if(at=g.mipmaps,T&&nt){at.length>0&&gt++;let tt=Ht(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,xt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ct){T?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,wt[tt].width,wt[tt].height,$,st,wt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,xt,wt[tt].width,wt[tt].height,0,$,st,wt[tt].data);for(let St=0;St<at.length;St++){let te=at[St].image[tt].image;T?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,0,0,te.width,te.height,$,st,te.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,xt,te.width,te.height,0,$,st,te.data)}}else{T?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,$,st,wt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,xt,$,st,wt[tt]);for(let St=0;St<at.length;St++){let Nt=at[St];T?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,0,0,$,st,Nt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,xt,$,st,Nt.image[tt])}}}p(g)&&f(i.TEXTURE_CUBE_MAP),J.__version=it.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Ct(y,g,H,V,it,J){let bt=r.convert(H.format,H.colorSpace),ut=r.convert(H.type),vt=C(H.internalFormat,bt,ut,H.colorSpace),Dt=n.get(g),ct=n.get(H);if(ct.__renderTarget=g,!Dt.__hasExternalTextures){let wt=Math.max(1,g.width>>J),Pt=Math.max(1,g.height>>J);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,J,vt,wt,Pt,g.depth,0,bt,ut,null):e.texImage2D(it,J,vt,wt,Pt,0,bt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,y),ot(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,it,ct.__webglTexture,0,pt(g)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,it,ct.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(y,g,H){if(i.bindRenderbuffer(i.RENDERBUFFER,y),g.depthBuffer){let V=g.depthTexture,it=V&&V.isDepthTexture?V.type:null,J=x(g.stencilBuffer,it),bt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=pt(g);ot(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,J,g.width,g.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,J,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,J,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,y)}else{let V=g.textures;for(let it=0;it<V.length;it++){let J=V[it],bt=r.convert(J.format,J.colorSpace),ut=r.convert(J.type),vt=C(J.internalFormat,bt,ut,J.colorSpace),Dt=pt(g);H&&ot(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,vt,g.width,g.height):ot(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt,vt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,vt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=n.get(g.depthTexture);V.__renderTarget=g,(!V.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),U(g.depthTexture,0);let it=V.__webglTexture,J=pt(g);if(g.depthTexture.format===Pi)ot(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(g.depthTexture.format===Ki)ot(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Wt(y){let g=n.get(y),H=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){let V=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){let it=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",it)};V.addEventListener("dispose",it),g.__depthDisposeCallback=it}g.__boundDepthTexture=V}if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let V=y.texture.mipmaps;V&&V.length>0?yt(g.__webglFramebuffer[0],y):yt(g.__webglFramebuffer,y)}else if(H){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=i.createRenderbuffer(),_t(g.__webglDepthbuffer[V],y,!1);else{let it=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=g.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,J)}}else{let V=y.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),_t(g.__webglDepthbuffer,y,!1);else{let it=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,J)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(y,g,H){let V=n.get(y);g!==void 0&&Ct(V.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Wt(y)}function I(y){let g=y.texture,H=n.get(y),V=n.get(g);y.addEventListener("dispose",R);let it=y.textures,J=y.isWebGLCubeRenderTarget===!0,bt=it.length>1;if(bt||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=g.version,a.memory.textures++),J){H.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(g.mipmaps&&g.mipmaps.length>0){H.__webglFramebuffer[ut]=[];for(let vt=0;vt<g.mipmaps.length;vt++)H.__webglFramebuffer[ut][vt]=i.createFramebuffer()}else H.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){H.__webglFramebuffer=[];for(let ut=0;ut<g.mipmaps.length;ut++)H.__webglFramebuffer[ut]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ut=0,vt=it.length;ut<vt;ut++){let Dt=n.get(it[ut]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=i.createTexture(),a.memory.textures++)}if(y.samples>0&&ot(y)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ut=0;ut<it.length;ut++){let vt=it[ut];H.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ut]);let Dt=r.convert(vt.format,vt.colorSpace),ct=r.convert(vt.type),wt=C(vt.internalFormat,Dt,ct,vt.colorSpace,y.isXRRenderTarget===!0),Pt=pt(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,wt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,H.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),_t(H.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Tt(i.TEXTURE_CUBE_MAP,g);for(let ut=0;ut<6;ut++)if(g.mipmaps&&g.mipmaps.length>0)for(let vt=0;vt<g.mipmaps.length;vt++)Ct(H.__webglFramebuffer[ut][vt],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,vt);else Ct(H.__webglFramebuffer[ut],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);p(g)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,vt=it.length;ut<vt;ut++){let Dt=it[ut],ct=n.get(Dt),wt=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(wt=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(wt,ct.__webglTexture),Tt(wt,Dt),Ct(H.__webglFramebuffer,y,Dt,i.COLOR_ATTACHMENT0+ut,wt,0),p(Dt)&&f(wt)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ut=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,V.__webglTexture),Tt(ut,g),g.mipmaps&&g.mipmaps.length>0)for(let vt=0;vt<g.mipmaps.length;vt++)Ct(H.__webglFramebuffer[vt],y,g,i.COLOR_ATTACHMENT0,ut,vt);else Ct(H.__webglFramebuffer,y,g,i.COLOR_ATTACHMENT0,ut,0);p(g)&&f(ut),e.unbindTexture()}y.depthBuffer&&Wt(y)}function et(y){let g=y.textures;for(let H=0,V=g.length;H<V;H++){let it=g[H];if(p(it)){let J=M(y),bt=n.get(it).__webglTexture;e.bindTexture(J,bt),f(J),e.unbindTexture()}}}let Z=[],q=[];function X(y){if(y.samples>0){if(ot(y)===!1){let g=y.textures,H=y.width,V=y.height,it=i.COLOR_BUFFER_BIT,J=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(y),ut=g.length>1;if(ut)for(let Dt=0;Dt<g.length;Dt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);let vt=y.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let Dt=0;Dt<g.length;Dt++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[Dt]);let ct=n.get(g[Dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,H,V,0,0,H,V,it,i.NEAREST),A===!0&&(Z.length=0,q.length=0,Z.push(i.COLOR_ATTACHMENT0+Dt),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Z.push(J),q.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,q)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let Dt=0;Dt<g.length;Dt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[Dt]);let ct=n.get(g[Dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&A){let g=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function pt(y){return Math.min(s.maxSamples,y.samples)}function ot(y){let g=n.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function dt(y){let g=a.render.frame;l.get(y)!==g&&(l.set(y,g),y.update())}function Qt(y,g){let H=y.colorSpace,V=y.format,it=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||H!==ni&&H!==bn&&(jt.getTransfer(H)===ne?(V!==tn||it!==cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),g}function Ht(y){return typeof HTMLImageElement!="undefined"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame!="undefined"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=b,this.resetTextureUnits=O,this.setTexture2D=U,this.setTexture2DArray=G,this.setTexture3D=k,this.setTextureCube=z,this.rebindTextures=Xt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=ot}function rg(i,t){function e(n,s=bn){let r,a=jt.getTransfer(s);if(n===cn)return i.UNSIGNED_BYTE;if(n===Ca)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ma)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hA)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uA)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===cA)return i.BYTE;if(n===lA)return i.SHORT;if(n===Wi)return i.UNSIGNED_SHORT;if(n===va)return i.INT;if(n===Wn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===ki)return i.HALF_FLOAT;if(n===fA)return i.ALPHA;if(n===dA)return i.RGB;if(n===tn)return i.RGBA;if(n===Pi)return i.DEPTH_COMPONENT;if(n===Ki)return i.DEPTH_STENCIL;if(n===ya)return i.RED;if(n===_a)return i.RED_INTEGER;if(n===pA)return i.RG;if(n===ba)return i.RG_INTEGER;if(n===Da)return i.RGBA_INTEGER;if(n===Xs||n===qs||n===js||n===$s)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===Ia||n===Ta||n===Ra)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pa||n===Fa||n===La)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pa||n===Fa)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===La)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Na||n===Oa||n===Ha||n===Ga||n===Qa||n===Ua||n===za||n===Va||n===Ya||n===Wa||n===ka||n===Ja||n===Ka||n===Za)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Na)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ha)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ga)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ua)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Va)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ka)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ja)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===qa||n===ja)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xa)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$a||n===to||n===eo||n===no)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$a)return r.COMPRESSED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,og=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,OA=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ss(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Je({vertexShader:ag,fragmentShader:og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ft(new De(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},HA=class extends Cn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",A=1,c=null,l=null,h=null,u=null,d=null,m=null,E=typeof XRWebGLBinding!="undefined",p=new OA,f={},M=e.getContextAttributes(),C=null,x=null,S=[],_=[],R=new mt,F=null,B=new Be;B.viewport=new ee;let w=new Be;w.viewport=new ee;let D=[B,w],O=new Aa,b=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let rt=S[K];return rt===void 0&&(rt=new Oi,S[K]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(K){let rt=S[K];return rt===void 0&&(rt=new Oi,S[K]=rt),rt.getGripSpace()},this.getHand=function(K){let rt=S[K];return rt===void 0&&(rt=new Oi,S[K]=rt),rt.getHandSpace()};function U(K){let rt=_.indexOf(K.inputSource);if(rt===-1)return;let Ct=S[rt];Ct!==void 0&&(Ct.update(K.inputSource,K.frame,c||a),Ct.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",k);for(let K=0;K<S.length;K++){let rt=_[K];rt!==null&&(_[K]=null,S[K].disconnect(rt))}b=null,L=null,p.reset();for(let K in f)delete f[K];t.setRenderTarget(C),d=null,u=null,h=null,s=null,x=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(C=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",G),s.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(R),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ct=null,_t=null,yt=null;M.depth&&(yt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Ct=M.stencil?Ki:Pi,_t=M.stencil?Ji:Wn);let Wt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(Wt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new un(u.textureWidth,u.textureHeight,{format:tn,type:cn,depthTexture:new Ds(u.textureWidth,u.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,Ct),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let Ct={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Ct),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new un(d.framebufferWidth,d.framebufferHeight,{format:tn,type:cn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(A),c=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(K){for(let rt=0;rt<K.removed.length;rt++){let Ct=K.removed[rt],_t=_.indexOf(Ct);_t>=0&&(_[_t]=null,S[_t].disconnect(Ct))}for(let rt=0;rt<K.added.length;rt++){let Ct=K.added[rt],_t=_.indexOf(Ct);if(_t===-1){for(let Wt=0;Wt<S.length;Wt++)if(Wt>=_.length){_.push(Ct),_t=Wt;break}else if(_[Wt]===null){_[Wt]=Ct,_t=Wt;break}if(_t===-1)break}let yt=S[_t];yt&&yt.connect(Ct)}}let z=new P,j=new P;function At(K,rt,Ct){z.setFromMatrixPosition(rt.matrixWorld),j.setFromMatrixPosition(Ct.matrixWorld);let _t=z.distanceTo(j),yt=rt.projectionMatrix.elements,Wt=Ct.projectionMatrix.elements,Xt=yt[14]/(yt[10]-1),I=yt[14]/(yt[10]+1),et=(yt[9]+1)/yt[5],Z=(yt[9]-1)/yt[5],q=(yt[8]-1)/yt[0],X=(Wt[8]+1)/Wt[0],pt=Xt*q,ot=Xt*X,dt=_t/(-q+X),Qt=dt*-q;if(rt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Qt),K.translateZ(dt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),yt[10]===-1)K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{let Ht=Xt+dt,y=I+dt,g=pt-Qt,H=ot+(_t-Qt),V=et*I/y*Ht,it=Z*I/y*Ht;K.projectionMatrix.makePerspective(g,H,V,it,Ht,y),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ft(K,rt){rt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(rt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let rt=K.near,Ct=K.far;p.texture!==null&&(p.depthNear>0&&(rt=p.depthNear),p.depthFar>0&&(Ct=p.depthFar)),O.near=w.near=B.near=rt,O.far=w.far=B.far=Ct,(b!==O.near||L!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),b=O.near,L=O.far),O.layers.mask=K.layers.mask|6,B.layers.mask=O.layers.mask&3,w.layers.mask=O.layers.mask&5;let _t=K.parent,yt=O.cameras;ft(O,_t);for(let Wt=0;Wt<yt.length;Wt++)ft(yt[Wt],_t);yt.length===2?At(O,B,w):O.projectionMatrix.copy(B.projectionMatrix),Tt(K,O,_t)};function Tt(K,rt,Ct){Ct===null?K.matrix.copy(rt.matrixWorld):(K.matrix.copy(Ct.matrixWorld),K.matrix.invert(),K.matrix.multiply(rt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Fi*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return A},this.setFoveation=function(K){A=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(K){return f[K]};let zt=null;function Zt(K,rt){if(l=rt.getViewerPose(c||a),m=rt,l!==null){let Ct=l.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let _t=!1;Ct.length!==O.cameras.length&&(O.cameras.length=0,_t=!0);for(let I=0;I<Ct.length;I++){let et=Ct[I],Z=null;if(d!==null)Z=d.getViewport(et);else{let X=h.getViewSubImage(u,et);Z=X.viewport,I===0&&(t.setRenderTargetTextures(x,X.colorTexture,X.depthStencilTexture),t.setRenderTarget(x))}let q=D[I];q===void 0&&(q=new Be,q.layers.enable(I),q.viewport=new ee,D[I]=q),q.matrix.fromArray(et.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(et.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(Z.x,Z.y,Z.width,Z.height),I===0&&(O.matrix.copy(q.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),_t===!0&&O.cameras.push(q)}let yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){h=n.getBinding();let I=h.getDepthInformation(Ct[0]);I&&I.isValid&&I.texture&&p.init(I,s.renderState)}if(yt&&yt.includes("camera-access")&&E){t.state.unbindTexture(),h=n.getBinding();for(let I=0;I<Ct.length;I++){let et=Ct[I].camera;if(et){let Z=f[et];Z||(Z=new Ss,f[et]=Z);let q=h.getCameraImage(et);Z.sourceTexture=q}}}}for(let Ct=0;Ct<S.length;Ct++){let _t=_[Ct],yt=S[Ct];_t!==null&&yt!==void 0&&yt.update(_t,rt,c||a)}zt&&zt(K,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}let Jt=new Ul;Jt.setAnimationLoop(Zt),this.setAnimationLoop=function(K){zt=K},this.dispose=function(){}}},di=new Qe,Ag=new se;function cg(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,xA(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,M,C,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),h(p,f)):f.isMeshPhongMaterial?(r(p,f),l(p,f)):f.isMeshStandardMaterial?(r(p,f),u(p,f),f.isMeshPhysicalMaterial&&d(p,f,x)):f.isMeshMatcapMaterial?(r(p,f),m(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),E(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?A(p,f,M,C):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ce&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ce&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let M=t.get(f),C=M.envMap,x=M.envMapRotation;C&&(p.envMap.value=C,di.copy(x),di.x*=-1,di.y*=-1,di.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),p.envMapRotation.value.setFromMatrix4(Ag.makeRotationFromEuler(di)),p.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function A(p,f,M,C){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*M,p.scale.value=C*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function d(p,f,M){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ce&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function E(p,f){let M=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function A(M,C){let x=C.program;n.uniformBlockBinding(M,x)}function c(M,C){let x=s[M.id];x===void 0&&(m(M),x=l(M),s[M.id]=x,M.addEventListener("dispose",p));let S=C.program;n.updateUBOMapping(M,S);let _=t.render.frame;r[M.id]!==_&&(u(M),r[M.id]=_)}function l(M){let C=h();M.__bindingPointIndex=C;let x=i.createBuffer(),S=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,S,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,x),x}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let C=s[M.id],x=M.uniforms,S=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let _=0,R=x.length;_<R;_++){let F=Array.isArray(x[_])?x[_]:[x[_]];for(let B=0,w=F.length;B<w;B++){let D=F[B];if(d(D,_,B,S)===!0){let O=D.__offset,b=Array.isArray(D.value)?D.value:[D.value],L=0;for(let U=0;U<b.length;U++){let G=b[U],k=E(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,O+L,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,L),L+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,C,x,S){let _=M.value,R=C+"_"+x;if(S[R]===void 0)return typeof _=="number"||typeof _=="boolean"?S[R]=_:S[R]=_.clone(),!0;{let F=S[R];if(typeof _=="number"||typeof _=="boolean"){if(F!==_)return S[R]=_,!0}else if(F.equals(_)===!1)return F.copy(_),!0}return!1}function m(M){let C=M.uniforms,x=0,S=16;for(let R=0,F=C.length;R<F;R++){let B=Array.isArray(C[R])?C[R]:[C[R]];for(let w=0,D=B.length;w<D;w++){let O=B[w],b=Array.isArray(O.value)?O.value:[O.value];for(let L=0,U=b.length;L<U;L++){let G=b[L],k=E(G),z=x%S,j=z%k.boundary,At=z+j;x+=j,At!==0&&S-At<k.storage&&(x+=S-At),O.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=k.storage}}}let _=x%S;return _>0&&(x+=S-_),M.__size=x,M.__cache={},this}function E(M){let C={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(C.boundary=4,C.storage=4):M.isVector2?(C.boundary=8,C.storage=8):M.isVector3||M.isColor?(C.boundary=16,C.storage=12):M.isVector4?(C.boundary=16,C.storage=16):M.isMatrix3?(C.boundary=48,C.storage=48):M.isMatrix4?(C.boundary=64,C.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),C}function p(M){let C=M.target;C.removeEventListener("dispose",p);let x=a.indexOf(C.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[C.id]),delete s[C.id],delete r[C.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:A,update:c,dispose:f}}var Ao=class{constructor(t={}){let{canvas:e=cl(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:A=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let m=new Uint32Array(4),E=new Int32Array(4),p=null,f=null,M=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,S=!1;this._outputColorSpace=Fe;let _=0,R=0,F=null,B=-1,w=null,D=new ee,O=new ee,b=null,L=new Ut(0),U=0,G=e.width,k=e.height,z=1,j=null,At=null,ft=new ee(0,0,G,k),Tt=new ee(0,0,G,k),zt=!1,Zt=new Gi,Jt=!1,K=!1,rt=new se,Ct=new P,_t=new ee,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function Xt(){return F===null?z:1}let I=n;function et(v,N){return e.getContext(v,N)}try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:A,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",at,!1),I===null){let N="webgl2";if(I=et(N,v),I===null)throw et(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Z,q,X,pt,ot,dt,Qt,Ht,y,g,H,V,it,J,bt,ut,vt,Dt,ct,wt,Pt,$,st,xt;function T(){Z=new Dp(I),Z.init(),$=new rg(I,Z),q=new Bp(I,Z,t,$),X=new ig(I,Z),q.reversedDepthBuffer&&u&&X.buffers.depth.setReversed(!0),pt=new Tp(I),ot=new Ym,dt=new sg(I,Z,X,ot,q,$,pt),Qt=new Cp(x),Ht=new bp(x),y=new Nu(I),st=new wp(I,y),g=new Sp(I,y,pt,st),H=new Pp(I,g,y,pt),ct=new Rp(I,q,dt),ut=new vp(ot),V=new Vm(x,Qt,Ht,Z,q,st,ut),it=new cg(x,ot),J=new km,bt=new jm(Z),Dt=new Ep(x,Qt,Ht,X,H,d,A),vt=new eg(x,H,q),xt=new lg(I,pt,q,X),wt=new xp(I,Z,pt),Pt=new Ip(I,Z,pt),pt.programs=V.programs,x.capabilities=q,x.extensions=Z,x.properties=ot,x.renderLists=J,x.shadowMap=vt,x.state=X,x.info=pt}T();let nt=new HA(x,I);this.xr=nt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let v=Z.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Z.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(v){v!==void 0&&(z=v,this.setSize(G,k,!1))},this.getSize=function(v){return v.set(G,k)},this.setSize=function(v,N,Y=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,k=N,e.width=Math.floor(v*z),e.height=Math.floor(N*z),Y===!0&&(e.style.width=v+"px",e.style.height=N+"px"),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(G*z,k*z).floor()},this.setDrawingBufferSize=function(v,N,Y){G=v,k=N,z=Y,e.width=Math.floor(v*Y),e.height=Math.floor(N*Y),this.setViewport(0,0,v,N)},this.getCurrentViewport=function(v){return v.copy(D)},this.getViewport=function(v){return v.copy(ft)},this.setViewport=function(v,N,Y,W){v.isVector4?ft.set(v.x,v.y,v.z,v.w):ft.set(v,N,Y,W),X.viewport(D.copy(ft).multiplyScalar(z).round())},this.getScissor=function(v){return v.copy(Tt)},this.setScissor=function(v,N,Y,W){v.isVector4?Tt.set(v.x,v.y,v.z,v.w):Tt.set(v,N,Y,W),X.scissor(O.copy(Tt).multiplyScalar(z).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(v){X.setScissorTest(zt=v)},this.setOpaqueSort=function(v){j=v},this.setTransparentSort=function(v){At=v},this.getClearColor=function(v){return v.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,Y=!0){let W=0;if(v){let Q=!1;if(F!==null){let ht=F.texture.format;Q=ht===Da||ht===ba||ht===_a}if(Q){let ht=F.texture.type,Bt=ht===cn||ht===Wn||ht===Wi||ht===Ji||ht===Ca||ht===Ma,It=Dt.getClearColor(),Mt=Dt.getClearAlpha(),Ot=It.r,Gt=It.g,Rt=It.b;Bt?(m[0]=Ot,m[1]=Gt,m[2]=Rt,m[3]=Mt,I.clearBufferuiv(I.COLOR,0,m)):(E[0]=Ot,E[1]=Gt,E[2]=Rt,E[3]=Mt,I.clearBufferiv(I.COLOR,0,E))}else W|=I.COLOR_BUFFER_BIT}N&&(W|=I.DEPTH_BUFFER_BIT),Y&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Dt.dispose(),J.dispose(),bt.dispose(),ot.dispose(),Qt.dispose(),Ht.dispose(),H.dispose(),st.dispose(),xt.dispose(),V.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Te),nt.removeEventListener("sessionend",In),Oe.stop()};function lt(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let v=pt.autoReset,N=vt.enabled,Y=vt.autoUpdate,W=vt.needsUpdate,Q=vt.type;T(),pt.autoReset=v,vt.enabled=N,vt.autoUpdate=Y,vt.needsUpdate=W,vt.type=Q}function at(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function tt(v){let N=v.target;N.removeEventListener("dispose",tt),St(N)}function St(v){Nt(v),ot.remove(v)}function Nt(v){let N=ot.get(v).programs;N!==void 0&&(N.forEach(function(Y){V.releaseProgram(Y)}),v.isShaderMaterial&&V.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,Y,W,Q,ht){N===null&&(N=yt);let Bt=Q.isMesh&&Q.matrixWorld.determinant()<0,It=sh(v,N,Y,W,Q);X.setMaterial(W,Bt);let Mt=Y.index,Ot=1;if(W.wireframe===!0){if(Mt=g.getWireframeAttribute(Y),Mt===void 0)return;Ot=2}let Gt=Y.drawRange,Rt=Y.attributes.position,Kt=Gt.start*Ot,ie=(Gt.start+Gt.count)*Ot;ht!==null&&(Kt=Math.max(Kt,ht.start*Ot),ie=Math.min(ie,(ht.start+ht.count)*Ot)),Mt!==null?(Kt=Math.max(Kt,0),ie=Math.min(ie,Mt.count)):Rt!=null&&(Kt=Math.max(Kt,0),ie=Math.min(ie,Rt.count));let ue=ie-Kt;if(ue<0||ue===1/0)return;st.setup(Q,W,It,Y,Mt);let ae,re=wt;if(Mt!==null&&(ae=y.get(Mt),re=Pt,re.setIndex(ae)),Q.isMesh)W.wireframe===!0?(X.setLineWidth(W.wireframeLinewidth*Xt()),re.setMode(I.LINES)):re.setMode(I.TRIANGLES);else if(Q.isLine){let Lt=W.linewidth;Lt===void 0&&(Lt=1),X.setLineWidth(Lt*Xt()),Q.isLineSegments?re.setMode(I.LINES):Q.isLineLoop?re.setMode(I.LINE_LOOP):re.setMode(I.LINE_STRIP)}else Q.isPoints?re.setMode(I.POINTS):Q.isSprite&&re.setMode(I.TRIANGLES);if(Q.isBatchedMesh)if(Q._multiDrawInstances!==null)Li("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount,Q._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))re.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let Lt=Q._multiDrawStarts,ce=Q._multiDrawCounts,$t=Q._multiDrawCount,Ve=Mt?y.get(Mt).bytesPerElement:1,gi=ot.get(W).currentProgram.getUniforms();for(let Ye=0;Ye<$t;Ye++)gi.setValue(I,"_gl_DrawID",Ye),re.render(Lt[Ye]/Ve,ce[Ye])}else if(Q.isInstancedMesh)re.renderInstances(Kt,ue,Q.count);else if(Y.isInstancedBufferGeometry){let Lt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ce=Math.min(Y.instanceCount,Lt);re.renderInstances(Kt,ue,ce)}else re.render(Kt,ue)};function te(v,N,Y){v.transparent===!0&&v.side===ze&&v.forceSinglePass===!1?(v.side=Ce,v.needsUpdate=!0,Ar(v,N,Y),v.side=vn,v.needsUpdate=!0,Ar(v,N,Y),v.side=ze):Ar(v,N,Y)}this.compile=function(v,N,Y=null){Y===null&&(Y=v),f=bt.get(Y),f.init(N),C.push(f),Y.traverseVisible(function(Q){Q.isLight&&Q.layers.test(N.layers)&&(f.pushLight(Q),Q.castShadow&&f.pushShadow(Q))}),v!==Y&&v.traverseVisible(function(Q){Q.isLight&&Q.layers.test(N.layers)&&(f.pushLight(Q),Q.castShadow&&f.pushShadow(Q))}),f.setupLights();let W=new Set;return v.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let ht=Q.material;if(ht)if(Array.isArray(ht))for(let Bt=0;Bt<ht.length;Bt++){let It=ht[Bt];te(It,Y,Q),W.add(It)}else te(ht,Y,Q),W.add(ht)}),f=C.pop(),W},this.compileAsync=function(v,N,Y=null){let W=this.compile(v,N,Y);return new Promise(Q=>{function ht(){if(W.forEach(function(Bt){ot.get(Bt).currentProgram.isReady()&&W.delete(Bt)}),W.size===0){Q(v);return}setTimeout(ht,10)}Z.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let qt=null;function Xe(v){qt&&qt(v)}function Te(){Oe.stop()}function In(){Oe.start()}let Oe=new Ul;Oe.setAnimationLoop(Xe),typeof self!="undefined"&&Oe.setContext(self),this.setAnimationLoop=function(v){qt=v,nt.setAnimationLoop(v),v===null?Oe.stop():Oe.start()},nt.addEventListener("sessionstart",Te),nt.addEventListener("sessionend",In),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(N),N=nt.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,N,F),f=bt.get(v,C.length),f.init(N),C.push(f),rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Zt.setFromProjectionMatrix(rt,an,N.reversedDepth),K=this.localClippingEnabled,Jt=ut.init(this.clippingPlanes,K),p=J.get(v,M.length),p.init(),M.push(p),nt.enabled===!0&&nt.isPresenting===!0){let ht=x.xr.getDepthSensingMesh();ht!==null&&go(ht,N,-1/0,x.sortObjects)}go(v,N,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(j,At),Wt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Wt&&Dt.addToRenderList(p,v),this.info.render.frame++,Jt===!0&&ut.beginShadows();let Y=f.state.shadowsArray;vt.render(Y,v,N),Jt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=p.opaque,Q=p.transmissive;if(f.setupLights(),N.isArrayCamera){let ht=N.cameras;if(Q.length>0)for(let Bt=0,It=ht.length;Bt<It;Bt++){let Mt=ht[Bt];JA(W,Q,v,Mt)}Wt&&Dt.render(v);for(let Bt=0,It=ht.length;Bt<It;Bt++){let Mt=ht[Bt];kA(p,v,Mt,Mt.viewport)}}else Q.length>0&&JA(W,Q,v,N),Wt&&Dt.render(v),kA(p,v,N);F!==null&&R===0&&(dt.updateMultisampleRenderTarget(F),dt.updateRenderTargetMipmap(F)),v.isScene===!0&&v.onAfterRender(x,v,N),st.resetDefaultState(),B=-1,w=null,C.pop(),C.length>0?(f=C[C.length-1],Jt===!0&&ut.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?p=M[M.length-1]:p=null};function go(v,N,Y,W){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)Y=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLight)f.pushLight(v),v.castShadow&&f.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Zt.intersectsSprite(v)){W&&_t.setFromMatrixPosition(v.matrixWorld).applyMatrix4(rt);let Bt=H.update(v),It=v.material;It.visible&&p.push(v,Bt,It,Y,_t.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Zt.intersectsObject(v))){let Bt=H.update(v),It=v.material;if(W&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),_t.copy(v.boundingSphere.center)):(Bt.boundingSphere===null&&Bt.computeBoundingSphere(),_t.copy(Bt.boundingSphere.center)),_t.applyMatrix4(v.matrixWorld).applyMatrix4(rt)),Array.isArray(It)){let Mt=Bt.groups;for(let Ot=0,Gt=Mt.length;Ot<Gt;Ot++){let Rt=Mt[Ot],Kt=It[Rt.materialIndex];Kt&&Kt.visible&&p.push(v,Bt,Kt,Y,_t.z,Rt)}}else It.visible&&p.push(v,Bt,It,Y,_t.z,null)}}let ht=v.children;for(let Bt=0,It=ht.length;Bt<It;Bt++)go(ht[Bt],N,Y,W)}function kA(v,N,Y,W){let Q=v.opaque,ht=v.transmissive,Bt=v.transparent;f.setupLightsView(Y),Jt===!0&&ut.setGlobalState(x.clippingPlanes,Y),W&&X.viewport(D.copy(W)),Q.length>0&&or(Q,N,Y),ht.length>0&&or(ht,N,Y),Bt.length>0&&or(Bt,N,Y),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function JA(v,N,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new un(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?ki:cn,minFilter:Yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let ht=f.state.transmissionRenderTarget[W.id],Bt=W.viewport||D;ht.setSize(Bt.z*x.transmissionResolutionScale,Bt.w*x.transmissionResolutionScale);let It=x.getRenderTarget(),Mt=x.getActiveCubeFace(),Ot=x.getActiveMipmapLevel();x.setRenderTarget(ht),x.getClearColor(L),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear(),Wt&&Dt.render(Y);let Gt=x.toneMapping;x.toneMapping=_n;let Rt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),Jt===!0&&ut.setGlobalState(x.clippingPlanes,W),or(v,Y,W),dt.updateMultisampleRenderTarget(ht),dt.updateRenderTargetMipmap(ht),Z.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let ie=0,ue=N.length;ie<ue;ie++){let ae=N[ie],re=ae.object,Lt=ae.geometry,ce=ae.material,$t=ae.group;if(ce.side===ze&&re.layers.test(W.layers)){let Ve=ce.side;ce.side=Ce,ce.needsUpdate=!0,KA(re,Y,W,Lt,ce,$t),ce.side=Ve,ce.needsUpdate=!0,Kt=!0}}Kt===!0&&(dt.updateMultisampleRenderTarget(ht),dt.updateRenderTargetMipmap(ht))}x.setRenderTarget(It,Mt,Ot),x.setClearColor(L,U),Rt!==void 0&&(W.viewport=Rt),x.toneMapping=Gt}function or(v,N,Y){let W=N.isScene===!0?N.overrideMaterial:null;for(let Q=0,ht=v.length;Q<ht;Q++){let Bt=v[Q],It=Bt.object,Mt=Bt.geometry,Ot=Bt.group,Gt=Bt.material;Gt.allowOverride===!0&&W!==null&&(Gt=W),It.layers.test(Y.layers)&&KA(It,N,Y,Mt,Gt,Ot)}}function KA(v,N,Y,W,Q,ht){v.onBeforeRender(x,N,Y,W,Q,ht),v.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),Q.onBeforeRender(x,N,Y,W,v,ht),Q.transparent===!0&&Q.side===ze&&Q.forceSinglePass===!1?(Q.side=Ce,Q.needsUpdate=!0,x.renderBufferDirect(Y,N,W,Q,v,ht),Q.side=vn,Q.needsUpdate=!0,x.renderBufferDirect(Y,N,W,Q,v,ht),Q.side=ze):x.renderBufferDirect(Y,N,W,Q,v,ht),v.onAfterRender(x,N,Y,W,Q,ht)}function Ar(v,N,Y){N.isScene!==!0&&(N=yt);let W=ot.get(v),Q=f.state.lights,ht=f.state.shadowsArray,Bt=Q.state.version,It=V.getParameters(v,Q.state,ht,N,Y),Mt=V.getProgramCacheKey(It),Ot=W.programs;W.environment=v.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(v.isMeshStandardMaterial?Ht:Qt).get(v.envMap||W.environment),W.envMapRotation=W.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,Ot===void 0&&(v.addEventListener("dispose",tt),Ot=new Map,W.programs=Ot);let Gt=Ot.get(Mt);if(Gt!==void 0){if(W.currentProgram===Gt&&W.lightsStateVersion===Bt)return XA(v,It),Gt}else It.uniforms=V.getUniforms(v),v.onBeforeCompile(It,x),Gt=V.acquireProgram(It,Mt),Ot.set(Mt,Gt),W.uniforms=It.uniforms;let Rt=W.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Rt.clippingPlanes=ut.uniform),XA(v,It),W.needsLights=ah(v),W.lightsStateVersion=Bt,W.needsLights&&(Rt.ambientLightColor.value=Q.state.ambient,Rt.lightProbe.value=Q.state.probe,Rt.directionalLights.value=Q.state.directional,Rt.directionalLightShadows.value=Q.state.directionalShadow,Rt.spotLights.value=Q.state.spot,Rt.spotLightShadows.value=Q.state.spotShadow,Rt.rectAreaLights.value=Q.state.rectArea,Rt.ltc_1.value=Q.state.rectAreaLTC1,Rt.ltc_2.value=Q.state.rectAreaLTC2,Rt.pointLights.value=Q.state.point,Rt.pointLightShadows.value=Q.state.pointShadow,Rt.hemisphereLights.value=Q.state.hemi,Rt.directionalShadowMap.value=Q.state.directionalShadowMap,Rt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Rt.spotShadowMap.value=Q.state.spotShadowMap,Rt.spotLightMatrix.value=Q.state.spotLightMatrix,Rt.spotLightMap.value=Q.state.spotLightMap,Rt.pointShadowMap.value=Q.state.pointShadowMap,Rt.pointShadowMatrix.value=Q.state.pointShadowMatrix),W.currentProgram=Gt,W.uniformsList=null,Gt}function ZA(v){if(v.uniformsList===null){let N=v.currentProgram.getUniforms();v.uniformsList=qi.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function XA(v,N){let Y=ot.get(v);Y.outputColorSpace=N.outputColorSpace,Y.batching=N.batching,Y.batchingColor=N.batchingColor,Y.instancing=N.instancing,Y.instancingColor=N.instancingColor,Y.instancingMorph=N.instancingMorph,Y.skinning=N.skinning,Y.morphTargets=N.morphTargets,Y.morphNormals=N.morphNormals,Y.morphColors=N.morphColors,Y.morphTargetsCount=N.morphTargetsCount,Y.numClippingPlanes=N.numClippingPlanes,Y.numIntersection=N.numClipIntersection,Y.vertexAlphas=N.vertexAlphas,Y.vertexTangents=N.vertexTangents,Y.toneMapping=N.toneMapping}function sh(v,N,Y,W,Q){N.isScene!==!0&&(N=yt),dt.resetTextureUnits();let ht=N.fog,Bt=W.isMeshStandardMaterial?N.environment:null,It=F===null?x.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:ni,Mt=(W.isMeshStandardMaterial?Ht:Qt).get(W.envMap||Bt),Ot=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Gt=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Rt=!!Y.morphAttributes.position,Kt=!!Y.morphAttributes.normal,ie=!!Y.morphAttributes.color,ue=_n;W.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(ue=x.toneMapping);let ae=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,re=ae!==void 0?ae.length:0,Lt=ot.get(W),ce=f.state.lights;if(Jt===!0&&(K===!0||v!==w)){let Re=v===w&&W.id===B;ut.setState(W,v,Re)}let $t=!1;W.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==ce.state.version||Lt.outputColorSpace!==It||Q.isBatchedMesh&&Lt.batching===!1||!Q.isBatchedMesh&&Lt.batching===!0||Q.isBatchedMesh&&Lt.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Lt.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Lt.instancing===!1||!Q.isInstancedMesh&&Lt.instancing===!0||Q.isSkinnedMesh&&Lt.skinning===!1||!Q.isSkinnedMesh&&Lt.skinning===!0||Q.isInstancedMesh&&Lt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Lt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Lt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Lt.instancingMorph===!1&&Q.morphTexture!==null||Lt.envMap!==Mt||W.fog===!0&&Lt.fog!==ht||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==ut.numPlanes||Lt.numIntersection!==ut.numIntersection)||Lt.vertexAlphas!==Ot||Lt.vertexTangents!==Gt||Lt.morphTargets!==Rt||Lt.morphNormals!==Kt||Lt.morphColors!==ie||Lt.toneMapping!==ue||Lt.morphTargetsCount!==re)&&($t=!0):($t=!0,Lt.__version=W.version);let Ve=Lt.currentProgram;$t===!0&&(Ve=Ar(W,N,Q));let gi=!1,Ye=!1,is=!1,le=Ve.getUniforms(),qe=Lt.uniforms;if(X.useProgram(Ve.program)&&(gi=!0,Ye=!0,is=!0),W.id!==B&&(B=W.id,Ye=!0),gi||w!==v){X.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),le.setValue(I,"projectionMatrix",v.projectionMatrix),le.setValue(I,"viewMatrix",v.matrixWorldInverse);let He=le.map.cameraPosition;He!==void 0&&He.setValue(I,Ct.setFromMatrixPosition(v.matrixWorld)),q.logarithmicDepthBuffer&&le.setValue(I,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&le.setValue(I,"isOrthographic",v.isOrthographicCamera===!0),w!==v&&(w=v,Ye=!0,is=!0)}if(Q.isSkinnedMesh){le.setOptional(I,Q,"bindMatrix"),le.setOptional(I,Q,"bindMatrixInverse");let Re=Q.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),le.setValue(I,"boneTexture",Re.boneTexture,dt))}Q.isBatchedMesh&&(le.setOptional(I,Q,"batchingTexture"),le.setValue(I,"batchingTexture",Q._matricesTexture,dt),le.setOptional(I,Q,"batchingIdTexture"),le.setValue(I,"batchingIdTexture",Q._indirectTexture,dt),le.setOptional(I,Q,"batchingColorTexture"),Q._colorsTexture!==null&&le.setValue(I,"batchingColorTexture",Q._colorsTexture,dt));let je=Y.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&ct.update(Q,Y,Ve),(Ye||Lt.receiveShadow!==Q.receiveShadow)&&(Lt.receiveShadow=Q.receiveShadow,le.setValue(I,"receiveShadow",Q.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(qe.envMap.value=Mt,qe.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&N.environment!==null&&(qe.envMapIntensity.value=N.environmentIntensity),Ye&&(le.setValue(I,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&rh(qe,is),ht&&W.fog===!0&&it.refreshFogUniforms(qe,ht),it.refreshMaterialUniforms(qe,W,z,k,f.state.transmissionRenderTarget[v.id]),qi.upload(I,ZA(Lt),qe,dt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(qi.upload(I,ZA(Lt),qe,dt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&le.setValue(I,"center",Q.center),le.setValue(I,"modelViewMatrix",Q.modelViewMatrix),le.setValue(I,"normalMatrix",Q.normalMatrix),le.setValue(I,"modelMatrix",Q.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let Re=W.uniformsGroups;for(let He=0,Eo=Re.length;He<Eo;He++){let Jn=Re[He];xt.update(Jn,Ve),xt.bind(Jn,Ve)}}return Ve}function rh(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function ah(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(v,N,Y){let W=ot.get(v);W.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),ot.get(v.texture).__webglTexture=N,ot.get(v.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){let Y=ot.get(v);Y.__webglFramebuffer=N,Y.__useDefaultFramebuffer=N===void 0};let oh=I.createFramebuffer();this.setRenderTarget=function(v,N=0,Y=0){F=v,_=N,R=Y;let W=!0,Q=null,ht=!1,Bt=!1;if(v){let Mt=ot.get(v);if(Mt.__useDefaultFramebuffer!==void 0)X.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(Mt.__webglFramebuffer===void 0)dt.setupRenderTarget(v);else if(Mt.__hasExternalTextures)dt.rebindTextures(v,ot.get(v.texture).__webglTexture,ot.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Rt=v.depthTexture;if(Mt.__boundDepthTexture!==Rt){if(Rt!==null&&ot.has(Rt)&&(v.width!==Rt.image.width||v.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(v)}}let Ot=v.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(Bt=!0);let Gt=ot.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Gt[N])?Q=Gt[N][Y]:Q=Gt[N],ht=!0):v.samples>0&&dt.useMultisampledRTT(v)===!1?Q=ot.get(v).__webglMultisampledFramebuffer:Array.isArray(Gt)?Q=Gt[Y]:Q=Gt,D.copy(v.viewport),O.copy(v.scissor),b=v.scissorTest}else D.copy(ft).multiplyScalar(z).floor(),O.copy(Tt).multiplyScalar(z).floor(),b=zt;if(Y!==0&&(Q=oh),X.bindFramebuffer(I.FRAMEBUFFER,Q)&&W&&X.drawBuffers(v,Q),X.viewport(D),X.scissor(O),X.setScissorTest(b),ht){let Mt=ot.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,Mt.__webglTexture,Y)}else if(Bt){let Mt=N;for(let Ot=0;Ot<v.textures.length;Ot++){let Gt=ot.get(v.textures[Ot]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ot,Gt.__webglTexture,Y,Mt)}}else if(v!==null&&Y!==0){let Mt=ot.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Mt.__webglTexture,Y)}B=-1},this.readRenderTargetPixels=function(v,N,Y,W,Q,ht,Bt,It=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=ot.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Bt!==void 0&&(Mt=Mt[Bt]),Mt){X.bindFramebuffer(I.FRAMEBUFFER,Mt);try{let Ot=v.textures[It],Gt=Ot.format,Rt=Ot.type;if(!q.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!q.textureTypeReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-W&&Y>=0&&Y<=v.height-Q&&(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+It),I.readPixels(N,Y,W,Q,$.convert(Gt),$.convert(Rt),ht))}finally{let Ot=F!==null?ot.get(F).__webglFramebuffer:null;X.bindFramebuffer(I.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(v,N,Y,W,Q,ht,Bt,It=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=ot.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Bt!==void 0&&(Mt=Mt[Bt]),Mt)if(N>=0&&N<=v.width-W&&Y>=0&&Y<=v.height-Q){X.bindFramebuffer(I.FRAMEBUFFER,Mt);let Ot=v.textures[It],Gt=Ot.format,Rt=Ot.type;if(!q.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!q.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Kt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Kt),I.bufferData(I.PIXEL_PACK_BUFFER,ht.byteLength,I.STREAM_READ),v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+It),I.readPixels(N,Y,W,Q,$.convert(Gt),$.convert(Rt),0);let ie=F!==null?ot.get(F).__webglFramebuffer:null;X.bindFramebuffer(I.FRAMEBUFFER,ie);let ue=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await ll(I,ue,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Kt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ht),I.deleteBuffer(Kt),I.deleteSync(ue),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,Y=0){let W=Math.pow(2,-Y),Q=Math.floor(v.image.width*W),ht=Math.floor(v.image.height*W),Bt=N!==null?N.x:0,It=N!==null?N.y:0;dt.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,Y,0,0,Bt,It,Q,ht),X.unbindTexture()};let Ah=I.createFramebuffer(),ch=I.createFramebuffer();this.copyTextureToTexture=function(v,N,Y=null,W=null,Q=0,ht=null){ht===null&&(Q!==0?(Li("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=Q,Q=0):ht=0);let Bt,It,Mt,Ot,Gt,Rt,Kt,ie,ue,ae=v.isCompressedTexture?v.mipmaps[ht]:v.image;if(Y!==null)Bt=Y.max.x-Y.min.x,It=Y.max.y-Y.min.y,Mt=Y.isBox3?Y.max.z-Y.min.z:1,Ot=Y.min.x,Gt=Y.min.y,Rt=Y.isBox3?Y.min.z:0;else{let je=Math.pow(2,-Q);Bt=Math.floor(ae.width*je),It=Math.floor(ae.height*je),v.isDataArrayTexture?Mt=ae.depth:v.isData3DTexture?Mt=Math.floor(ae.depth*je):Mt=1,Ot=0,Gt=0,Rt=0}W!==null?(Kt=W.x,ie=W.y,ue=W.z):(Kt=0,ie=0,ue=0);let re=$.convert(N.format),Lt=$.convert(N.type),ce;N.isData3DTexture?(dt.setTexture3D(N,0),ce=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(dt.setTexture2DArray(N,0),ce=I.TEXTURE_2D_ARRAY):(dt.setTexture2D(N,0),ce=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);let $t=I.getParameter(I.UNPACK_ROW_LENGTH),Ve=I.getParameter(I.UNPACK_IMAGE_HEIGHT),gi=I.getParameter(I.UNPACK_SKIP_PIXELS),Ye=I.getParameter(I.UNPACK_SKIP_ROWS),is=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ae.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ae.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ot),I.pixelStorei(I.UNPACK_SKIP_ROWS,Gt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Rt);let le=v.isDataArrayTexture||v.isData3DTexture,qe=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){let je=ot.get(v),Re=ot.get(N),He=ot.get(je.__renderTarget),Eo=ot.get(Re.__renderTarget);X.bindFramebuffer(I.READ_FRAMEBUFFER,He.__webglFramebuffer),X.bindFramebuffer(I.DRAW_FRAMEBUFFER,Eo.__webglFramebuffer);for(let Jn=0;Jn<Mt;Jn++)le&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ot.get(v).__webglTexture,Q,Rt+Jn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ot.get(N).__webglTexture,ht,ue+Jn)),I.blitFramebuffer(Ot,Gt,Bt,It,Kt,ie,Bt,It,I.DEPTH_BUFFER_BIT,I.NEAREST);X.bindFramebuffer(I.READ_FRAMEBUFFER,null),X.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(Q!==0||v.isRenderTargetTexture||ot.has(v)){let je=ot.get(v),Re=ot.get(N);X.bindFramebuffer(I.READ_FRAMEBUFFER,Ah),X.bindFramebuffer(I.DRAW_FRAMEBUFFER,ch);for(let He=0;He<Mt;He++)le?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,je.__webglTexture,Q,Rt+He):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,je.__webglTexture,Q),qe?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Re.__webglTexture,ht,ue+He):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,ht),Q!==0?I.blitFramebuffer(Ot,Gt,Bt,It,Kt,ie,Bt,It,I.COLOR_BUFFER_BIT,I.NEAREST):qe?I.copyTexSubImage3D(ce,ht,Kt,ie,ue+He,Ot,Gt,Bt,It):I.copyTexSubImage2D(ce,ht,Kt,ie,Ot,Gt,Bt,It);X.bindFramebuffer(I.READ_FRAMEBUFFER,null),X.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else qe?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(ce,ht,Kt,ie,ue,Bt,It,Mt,re,Lt,ae.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(ce,ht,Kt,ie,ue,Bt,It,Mt,re,ae.data):I.texSubImage3D(ce,ht,Kt,ie,ue,Bt,It,Mt,re,Lt,ae):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ht,Kt,ie,Bt,It,re,Lt,ae.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ht,Kt,ie,ae.width,ae.height,re,ae.data):I.texSubImage2D(I.TEXTURE_2D,ht,Kt,ie,Bt,It,re,Lt,ae);I.pixelStorei(I.UNPACK_ROW_LENGTH,$t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ve),I.pixelStorei(I.UNPACK_SKIP_PIXELS,gi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ye),I.pixelStorei(I.UNPACK_SKIP_IMAGES,is),ht===0&&N.generateMipmaps&&I.generateMipmap(ce),X.unbindTexture()},this.initRenderTarget=function(v){ot.get(v).__webglFramebuffer===void 0&&dt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?dt.setTextureCube(v,0):v.isData3DTexture?dt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?dt.setTexture2DArray(v,0):dt.setTexture2D(v,0),X.unbindTexture()},this.resetState=function(){_=0,R=0,F=null,X.reset(),st.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var ho=class extends ii{constructor(){super();let t=new me;t.deleteAttribute("uv");let e=new Ue({side:Ce}),n=new Ue,s=new Ys(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Ft(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new si(t,n,6),o=new xe;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let A=new Ft(t,ts(50));A.position.set(-16.116,14.37,8.208),A.scale.set(.1,2.428,2.739),this.add(A);let c=new Ft(t,ts(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new Ft(t,ts(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let h=new Ft(t,ts(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);let u=new Ft(t,ts(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new Ft(t,ts(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function ts(i){return new Us({color:0,emissive:16777215,emissiveIntensity:i})}function er(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,A=new ve,c=0;for(let l=0;l<i.length;++l){let h=i[l],u=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;A.addGroup(c,d,l),c+=d}}if(e){let l=0,h=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let m=0;m<d.count;++m)h.push(d.getX(m)+l);l+=i[u].attributes.position.count}A.setIndex(h)}for(let l in r){let h=kl(r[l]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;A.setAttribute(l,h)}for(let l in a){let h=a[l][0].length;if(h===0)break;A.morphAttributes=A.morphAttributes||{},A.morphAttributes[l]=[];for(let u=0;u<h;++u){let d=[];for(let E=0;E<a[l].length;++E)d.push(a[l][E][u]);let m=kl(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;A.morphAttributes[l].push(m)}}return A}function kl(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let l=i[c];if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=l.itemSize),e!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=l.gpuType),s!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.count*e}let a=new t(r),o=new fe(a,e,n),A=0;for(let c=0;c<i.length;++c){let l=i[c];if(l.isInterleavedBufferAttribute){let h=A/e;for(let u=0,d=l.count;u<d;u++)for(let m=0;m<e;m++){let E=l.getComponent(u,m);o.setComponent(u+h,m,E)}}else a.set(l.array,A);A+=l.count*e}return s!==void 0&&(o.gpuType=s),o}var nr=new P;function en(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),A=Math.PI/4;nr.copy(t),nr[n]=0,nr.normalize();let c=.5*a/(a+o),l=1-nr.angleTo(i)/A;return Math.sign(nr[e])===1?l*c:o/(a+o)+c+c*(1-l)}var kn=class i extends me{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let A=new P,c=new P,l=new P(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,m=h.length/6,E=new P,p=.5/a;for(let f=0,M=0;f<h.length;f+=3,M+=2)switch(A.fromArray(h,f),c.copy(A),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),h[f+0]=l.x*Math.sign(A.x)+c.x*r,h[f+1]=l.y*Math.sign(A.y)+c.y*r,h[f+2]=l.z*Math.sign(A.z)+c.z*r,u[f+0]=c.x,u[f+1]=c.y,u[f+2]=c.z,Math.floor(f/m)){case 0:E.set(1,0,0),d[M+0]=en(E,c,"z","y",r,n),d[M+1]=1-en(E,c,"y","z",r,e);break;case 1:E.set(-1,0,0),d[M+0]=1-en(E,c,"z","y",r,n),d[M+1]=1-en(E,c,"y","z",r,e);break;case 2:E.set(0,1,0),d[M+0]=1-en(E,c,"x","z",r,t),d[M+1]=en(E,c,"z","x",r,n);break;case 3:E.set(0,-1,0),d[M+0]=1-en(E,c,"x","z",r,t),d[M+1]=1-en(E,c,"z","x",r,n);break;case 4:E.set(0,0,1),d[M+0]=1-en(E,c,"x","y",r,t),d[M+1]=1-en(E,c,"y","x",r,e);break;case 5:E.set(0,0,-1),d[M+0]=en(E,c,"x","y",r,t),d[M+1]=1-en(E,c,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var es={w:954.77,h:130,d:"M 251.12,38.45 L 255.87,38.45 C 259.57,38.45 262.01,36.26 262.01,32.98 C 262.01,29.69 259.57,27.50 255.93,27.50 L 251.12,27.50 Z M 245.35,61.55 C 241.88,61.55 240.18,59.85 240.18,56.39 L 240.18,18.99 L 251.12,18.99 L 251.12,24.22 L 252.95,24.22 L 252.95,24.16 C 252.95,20.45 255.56,18.02 259.51,18.02 C 267.91,18.02 273.56,24.04 273.56,32.98 C 273.56,41.31 266.87,46.96 256.90,46.96 L 251.12,46.96 L 251.12,61.55 Z M 245.35,61.55 M 294.23,45.69 L 303.41,45.69 L 298.85,32.92 Z M 300.61,19 C 304.08,19 306.39,20.58 307.54,23.86 L 321.10,61.56 L 309.12,61.56 L 306.45,54.20 L 284.98,54.20 L 284.98,56.02 L 285.41,56.02 C 288.87,56.02 289.97,57.67 288.75,60.89 L 288.51,61.56 L 276.53,61.56 L 291.85,19 Z M 300.61,19 M 344.20,36.63 L 348.94,36.63 C 351.92,36.63 353.87,34.80 353.87,32.07 C 353.87,29.39 351.92,27.51 349.00,27.51 L 344.20,27.51 Z M 333.26,61.56 L 333.26,19 L 344.20,19 L 344.20,24.23 L 346.02,24.23 L 346.02,24.16 C 346.02,20.46 348.64,18.02 352.59,18.02 C 359.95,18.02 364.81,23.62 364.81,32.07 C 364.81,37.78 361.59,42.16 356.42,44.05 L 367.67,61.56 L 354.90,61.56 L 344.93,45.14 L 344.20,45.14 L 344.20,61.56 Z M 333.26,61.56 M 390.77,19.00 L 390.77,32.13 L 400.44,19.00 L 414.12,19.00 L 402.38,35.23 C 400.37,38.03 397.70,39.37 394.23,39.37 L 394.17,39.37 L 394.17,41.19 L 399.40,41.19 L 415.45,61.56 L 401.53,61.56 L 390.77,47.82 L 390.77,61.56 L 379.82,61.56 L 379.82,24.17 C 379.82,20.70 381.53,19.00 384.99,19.00 Z M 390.77,19.00 M 427.61,19.00 L 438.55,19.00 L 438.55,61.56 L 432.78,61.56 C 429.31,61.56 427.61,59.86 427.61,56.39 Z M 427.61,19.00 M 484.46,47.39 C 483.12,44.23 482.45,40.94 482.45,37.48 L 482.45,19 L 493.39,19 L 493.39,61.55 L 478.32,61.55 L 463.97,27.93 L 461.96,27.93 L 464.21,33.16 C 465.55,36.32 466.22,39.60 466.22,43.07 L 466.22,61.55 L 460.44,61.55 C 456.98,61.55 455.27,59.85 455.27,56.39 L 455.27,19 L 470.29,19 L 484.70,52.62 L 486.71,52.62 Z M 484.46,47.39 M 535.34,52.19 C 535.34,48.72 537.04,47.02 540.51,47.02 L 540.57,47.02 L 540.57,45.20 L 528.53,45.20 L 528.53,36.68 L 546.28,36.68 L 546.28,58.39 C 541.36,60.88 534.67,62.52 529.38,62.52 C 515.76,62.52 506.70,53.65 506.70,40.27 C 506.70,26.89 515.89,18.02 529.81,18.02 C 534.55,18.02 539.78,19.17 542.76,20.94 L 542.76,30.06 C 539.96,28.29 535.52,27.14 531.63,27.14 C 523.55,27.14 518.26,32.37 518.26,40.27 C 518.26,48.12 523.18,53.41 530.42,53.41 C 532.30,53.41 534.07,52.92 535.34,52.25 Z M 535.34,52.19 M 592.49,46.05 C 592.49,49.51 590.78,51.22 587.32,51.22 L 587.26,51.22 L 587.26,53.04 L 598.26,53.04 C 605.50,53.04 610.36,47.93 610.36,40.27 C 610.36,32.55 605.56,27.50 598.26,27.50 L 592.49,27.50 Z M 586.71,61.55 C 583.25,61.55 581.54,59.85 581.54,56.39 L 581.54,18.99 L 598.26,18.99 C 612.43,18.99 621.92,27.57 621.92,40.27 C 621.92,53.10 612.49,61.55 598.26,61.55 Z M 586.71,61.55 M 664.53,19.00 L 664.53,27.51 L 649.57,27.51 C 646.90,27.51 645.62,28.79 645.62,31.46 C 645.62,34.14 646.90,35.42 649.57,35.42 L 663.56,35.42 L 663.56,43.93 L 645.62,43.93 L 645.62,53.05 L 664.96,53.05 L 664.96,61.56 L 634.68,61.56 L 634.68,35.42 L 639.91,35.42 L 639.91,33.59 L 639.85,33.59 C 636.38,33.59 634.68,31.89 634.68,28.42 L 634.68,24.17 C 634.68,20.70 636.38,19.00 639.85,19.00 Z M 664.53,19.00 M 707.64,30.06 C 704.84,28.30 700.46,27.14 696.69,27.14 C 691.52,27.14 688.06,28.96 688.06,31.46 C 688.06,37.84 710.55,30.55 710.55,47.08 C 710.55,56.45 702.16,62.53 689.33,62.53 C 684.29,62.53 679.06,61.37 676.20,59.61 L 676.20,50.49 C 679.00,52.25 684.04,53.41 689.03,53.41 C 695.05,53.41 699.00,51.52 699.00,48.91 C 699.00,42.71 676.50,49.39 676.50,32.80 C 676.50,23.85 683.86,18.02 694.99,18.02 C 699.73,18.02 704.78,19.17 707.64,20.94 Z M 707.64,30.06 M 735.78,38.45 L 740.52,38.45 C 744.23,38.45 746.66,36.26 746.66,32.98 C 746.66,29.69 744.23,27.50 740.58,27.50 L 735.78,27.50 Z M 730.00,61.55 C 726.54,61.55 724.83,59.85 724.83,56.39 L 724.83,18.99 L 735.78,18.99 L 735.78,24.22 L 737.60,24.22 L 737.60,24.16 C 737.60,20.45 740.22,18.02 744.17,18.02 C 752.56,18.02 758.22,24.04 758.22,32.98 C 758.22,41.31 751.53,46.96 741.56,46.96 L 735.78,46.96 L 735.78,61.55 Z M 730.00,61.55 M 800.83,19.00 L 800.83,27.51 L 785.88,27.51 C 783.20,27.51 781.92,28.79 781.92,31.46 C 781.92,34.14 783.20,35.42 785.88,35.42 L 799.86,35.42 L 799.86,43.93 L 781.92,43.93 L 781.92,53.05 L 801.26,53.05 L 801.26,61.56 L 770.98,61.56 L 770.98,35.42 L 776.21,35.42 L 776.21,33.59 L 776.15,33.59 C 772.68,33.59 770.98,31.89 770.98,28.42 L 770.98,24.17 C 770.98,20.70 772.68,19.00 776.15,19.00 Z M 800.83,19.00 M 842.36,52.19 C 842.36,48.72 844.06,47.02 847.53,47.02 L 847.58,47.02 L 847.58,45.20 L 835.55,45.20 L 835.55,36.68 L 853.30,36.68 L 853.30,58.39 C 848.38,60.88 841.69,62.52 836.40,62.52 C 822.78,62.52 813.72,53.65 813.72,40.27 C 813.72,26.89 822.90,18.02 836.82,18.02 C 841.57,18.02 846.80,19.17 849.78,20.94 L 849.78,30.06 C 846.98,28.29 842.54,27.14 838.65,27.14 C 830.56,27.14 825.27,32.37 825.27,40.27 C 825.27,48.12 830.20,53.41 837.43,53.41 C 839.32,53.41 841.08,52.92 842.36,52.25 Z M 842.36,52.19 M 881.32,45.69 L 890.51,45.69 L 885.95,32.92 Z M 887.71,19 C 891.17,19 893.49,20.58 894.64,23.86 L 908.20,61.56 L 896.22,61.56 L 893.55,54.20 L 872.08,54.20 L 872.08,56.02 L 872.51,56.02 C 875.98,56.02 877.07,57.67 875.85,60.89 L 875.61,61.56 L 863.63,61.56 L 878.95,19 Z M 887.71,19 M 931.30,36.63 L 936.04,36.63 C 939.02,36.63 940.97,34.80 940.97,32.07 C 940.97,29.39 939.02,27.51 936.10,27.51 L 931.30,27.51 Z M 920.35,61.56 L 920.35,19 L 931.30,19 L 931.30,24.23 L 933.12,24.23 L 933.12,24.16 C 933.12,20.46 935.74,18.02 939.69,18.02 C 947.05,18.02 951.91,23.62 951.91,32.07 C 951.91,37.78 948.69,42.16 943.52,44.05 L 954.77,61.56 L 942.00,61.56 L 932.03,45.14 L 931.30,45.14 L 931.30,61.56 Z M 920.35,61.56 M 283.77,97.74 L 281.55,103.99 L 287.65,103.99 L 285.51,97.74 L 284.68,95.11 L 284.63,95.11 C 284.30,96.15 284.01,97.03 283.77,97.74 M 276.47,111.57 L 283.32,92.94 L 285.96,92.94 L 292.83,111.57 L 290.28,111.57 L 288.30,105.89 L 280.87,105.89 L 278.87,111.57 Z M 276.47,111.57 M 324.10,111.58 L 324.10,92.95 L 327.10,92.95 L 333.14,108.42 L 333.19,108.42 L 339.19,92.95 L 342.24,92.95 L 342.24,111.58 L 340,111.58 L 340,96.26 L 339.94,96.26 C 339.61,97.23 339.33,98.01 339.11,98.60 L 334.00,111.58 L 332.20,111.58 L 327.10,98.60 L 326.26,96.26 L 326.21,96.26 L 326.21,111.58 Z M 324.10,111.58 M 358.28,111.58 L 358.28,92.95 L 371.44,92.95 L 371.44,95.01 L 360.63,95.01 L 360.63,100.90 L 370.45,100.90 L 370.45,102.88 L 360.63,102.88 L 360.63,109.42 L 371.76,109.42 L 371.76,111.58 Z M 358.28,111.58 M 385.88,95.01 L 385.88,92.95 L 400.62,92.95 L 400.62,95.01 L 394.42,95.01 L 394.42,111.58 L 392.08,111.58 L 392.08,95.01 Z M 385.88,95.01 M 417.85,94.98 L 417.85,101.80 L 423.37,101.80 C 424.66,101.80 425.63,101.51 426.29,100.91 C 426.95,100.31 427.28,99.47 427.28,98.39 C 427.28,97.23 426.98,96.37 426.39,95.81 C 425.80,95.26 424.84,94.98 423.50,94.98 Z M 415.50,111.58 L 415.50,92.95 L 424.20,92.95 C 425.83,92.95 427.16,93.42 428.18,94.35 C 429.19,95.29 429.70,96.52 429.70,98.05 C 429.70,100.43 428.62,101.97 426.47,102.67 L 426.47,102.74 C 427.39,103.07 428.05,103.59 428.44,104.29 C 428.83,105 429.07,106.06 429.16,107.49 C 429.33,109.87 429.62,111.19 430.01,111.47 L 430.01,111.58 L 427.49,111.58 C 427.30,111.42 427.16,111.09 427.08,110.58 C 427.00,110.08 426.91,109.02 426.81,107.41 C 426.72,106.05 426.39,105.10 425.81,104.54 C 425.23,103.99 424.30,103.71 423.03,103.71 L 417.85,103.71 L 417.85,111.58 Z M 415.50,111.58 M 448.57,107.77 C 449.75,109.19 451.40,109.91 453.52,109.91 C 455.64,109.91 457.28,109.19 458.47,107.77 C 459.65,106.34 460.24,104.50 460.24,102.25 C 460.24,99.99 459.65,98.14 458.47,96.71 C 457.28,95.27 455.64,94.56 453.52,94.56 C 451.40,94.56 449.75,95.27 448.57,96.71 C 447.39,98.14 446.79,99.99 446.79,102.25 C 446.79,104.50 447.39,106.34 448.57,107.77 M 460.15,109.23 C 458.49,111.05 456.28,111.96 453.52,111.96 C 450.75,111.96 448.54,111.05 446.89,109.23 C 445.23,107.41 444.40,105.08 444.40,102.25 C 444.40,99.41 445.23,97.08 446.89,95.26 C 448.54,93.44 450.75,92.53 453.52,92.53 C 456.28,92.53 458.49,93.44 460.15,95.26 C 461.81,97.08 462.64,99.41 462.64,102.25 C 462.64,105.08 461.81,107.41 460.15,109.23 M 484.76,111.94 C 482.26,111.94 480.33,111.32 478.99,110.09 C 477.64,108.85 476.91,107.25 476.81,105.27 L 479.10,105.27 C 479.42,108.46 481.33,110.06 484.86,110.06 C 486.20,110.06 487.27,109.76 488.08,109.16 C 488.89,108.57 489.29,107.70 489.29,106.57 C 489.29,106.07 489.19,105.62 489.00,105.24 C 488.81,104.86 488.58,104.55 488.31,104.30 C 488.04,104.06 487.64,103.83 487.10,103.63 C 486.56,103.42 486.07,103.25 485.60,103.13 C 485.14,103.01 484.51,102.86 483.71,102.69 C 482.76,102.48 481.97,102.27 481.34,102.05 C 480.72,101.83 480.09,101.53 479.47,101.15 C 478.84,100.77 478.38,100.28 478.07,99.68 C 477.77,99.08 477.62,98.35 477.62,97.50 C 477.62,95.98 478.19,94.77 479.35,93.89 C 480.51,93.02 482.04,92.58 483.95,92.58 C 488.14,92.58 490.49,94.51 491.01,98.39 L 488.80,98.39 C 488.62,97.07 488.13,96.08 487.31,95.41 C 486.5,94.74 485.39,94.41 484.00,94.41 C 482.71,94.41 481.69,94.66 480.94,95.18 C 480.18,95.71 479.81,96.44 479.81,97.40 C 479.81,97.82 479.89,98.19 480.05,98.51 C 480.22,98.83 480.44,99.10 480.71,99.32 C 480.98,99.53 481.33,99.73 481.77,99.90 C 482.22,100.07 482.66,100.22 483.09,100.33 C 483.52,100.44 484.05,100.56 484.68,100.68 C 485.55,100.85 486.26,101.02 486.82,101.16 C 487.37,101.31 487.99,101.53 488.66,101.83 C 489.34,102.12 489.87,102.46 490.24,102.85 C 490.62,103.23 490.94,103.73 491.21,104.34 C 491.48,104.96 491.61,105.67 491.61,106.49 C 491.61,108.19 490.98,109.53 489.72,110.49 C 488.46,111.46 486.81,111.94 484.76,111.94 M 525.90,109.52 L 530.07,109.52 C 534.15,109.52 536.19,107.12 536.19,102.33 C 536.19,97.43 534.21,94.98 530.25,94.98 L 525.90,94.98 Z M 523.55,111.58 L 523.55,92.95 L 530.33,92.95 C 533.05,92.95 535.11,93.79 536.50,95.48 C 537.89,97.16 538.58,99.44 538.58,102.33 C 538.58,105.19 537.87,107.45 536.42,109.10 C 534.98,110.75 532.89,111.58 530.14,111.58 Z M 523.55,111.58 M 553.93,111.58 L 553.93,92.95 L 567.09,92.95 L 567.09,95.01 L 556.28,95.01 L 556.28,100.90 L 566.10,100.90 L 566.10,102.88 L 556.28,102.88 L 556.28,109.42 L 567.41,109.42 L 567.41,111.58 Z M 553.93,111.58 M 582.70,111.58 L 582.70,92.95 L 585.04,92.95 L 585.04,109.42 L 594.81,109.42 L 594.81,111.58 Z M 582.70,111.58 M 632.20,97.74 L 629.99,103.99 L 636.08,103.99 L 633.95,97.74 L 633.11,95.11 L 633.06,95.11 C 632.73,96.15 632.44,97.03 632.20,97.74 M 624.91,111.57 L 631.76,92.94 L 634.39,92.94 L 641.27,111.57 L 638.72,111.57 L 636.73,105.89 L 629.31,105.89 L 627.30,111.57 Z M 624.91,111.57 M 655.83,111.58 L 655.83,92.95 L 668.99,92.95 L 668.99,95.01 L 658.18,95.01 L 658.18,100.90 L 668.00,100.90 L 668.00,102.88 L 658.18,102.88 L 658.18,109.42 L 669.30,109.42 L 669.30,111.58 Z M 655.83,111.58 M 686.94,94.98 L 686.94,101.80 L 692.47,101.80 C 693.75,101.80 694.73,101.51 695.39,100.91 C 696.05,100.31 696.37,99.47 696.37,98.39 C 696.37,97.23 696.08,96.37 695.49,95.81 C 694.90,95.26 693.94,94.98 692.60,94.98 Z M 684.60,111.58 L 684.60,92.95 L 693.30,92.95 C 694.93,92.95 696.26,93.42 697.28,94.35 C 698.29,95.29 698.80,96.52 698.80,98.05 C 698.80,100.43 697.72,101.97 695.57,102.67 L 695.57,102.74 C 696.49,103.07 697.14,103.59 697.53,104.29 C 697.92,105 698.16,106.06 698.25,107.49 C 698.42,109.87 698.71,111.19 699.11,111.47 L 699.11,111.58 L 696.58,111.58 C 696.39,111.42 696.26,111.09 696.18,110.58 C 696.10,110.08 696.01,109.02 695.91,107.41 C 695.82,106.05 695.49,105.10 694.91,104.54 C 694.32,103.99 693.40,103.71 692.13,103.71 L 686.94,103.71 L 686.94,111.58 Z M 684.60,111.58 M 717.66,107.77 C 718.84,109.19 720.5,109.91 722.61,109.91 C 724.73,109.91 726.38,109.19 727.56,107.77 C 728.75,106.34 729.33,104.50 729.33,102.25 C 729.33,99.99 728.75,98.14 727.56,96.71 C 726.38,95.27 724.73,94.56 722.61,94.56 C 720.5,94.56 718.84,95.27 717.66,96.71 C 716.48,98.14 715.89,99.99 715.89,102.25 C 715.89,104.50 716.48,106.34 717.66,107.77 M 729.25,109.23 C 727.58,111.05 725.37,111.96 722.61,111.96 C 719.85,111.96 717.64,111.05 715.98,109.23 C 714.32,107.41 713.5,105.08 713.5,102.25 C 713.5,99.41 714.32,97.08 715.98,95.26 C 717.64,93.44 719.85,92.53 722.61,92.53 C 725.37,92.53 727.58,93.44 729.25,95.26 C 730.90,97.08 731.73,99.41 731.73,102.25 C 731.73,105.08 730.90,107.41 729.25,109.23 M 749.42,94.98 L 749.42,101.86 L 754.32,101.86 C 755.61,101.86 756.58,101.55 757.23,100.94 C 757.88,100.34 758.21,99.49 758.21,98.39 C 758.21,97.28 757.88,96.43 757.23,95.85 C 756.58,95.27 755.65,94.98 754.45,94.98 Z M 747.08,111.58 L 747.08,92.95 L 754.84,92.95 C 756.79,92.95 758.26,93.55 759.27,94.75 C 760.10,95.72 760.52,96.90 760.52,98.29 C 760.52,100.02 760.02,101.37 759.01,102.33 C 758.00,103.28 756.50,103.76 754.50,103.76 L 749.42,103.76 L 749.42,111.58 Z M 747.08,111.58 M 782.49,111.86 C 780.32,111.86 778.58,111.35 777.29,110.32 C 776,109.30 775.35,107.71 775.35,105.55 L 775.35,92.94 L 777.69,92.94 L 777.69,105.32 C 777.69,108.34 779.32,109.85 782.57,109.85 C 785.71,109.85 787.28,108.34 787.28,105.32 L 787.28,92.94 L 789.63,92.94 L 789.63,105.55 C 789.63,107.69 788.97,109.28 787.66,110.31 C 786.35,111.34 784.62,111.86 782.49,111.86 M 805.36,111.58 L 805.36,92.95 L 818.52,92.95 L 818.52,95.01 L 807.71,95.01 L 807.71,100.90 L 817.53,100.90 L 817.53,102.88 L 807.71,102.88 L 807.71,109.42 L 818.83,109.42 L 818.83,111.58 Z M 805.36,111.58 M 836.48,94.98 L 836.48,101.80 L 842,101.80 C 843.28,101.80 844.26,101.51 844.92,100.91 C 845.58,100.31 845.91,99.47 845.91,98.39 C 845.91,97.23 845.61,96.37 845.02,95.81 C 844.43,95.26 843.46,94.98 842.13,94.98 Z M 834.13,111.58 L 834.13,92.95 L 842.83,92.95 C 844.46,92.95 845.79,93.42 846.80,94.35 C 847.82,95.29 848.33,96.52 848.33,98.05 C 848.33,100.43 847.25,101.97 845.10,102.67 L 845.10,102.74 C 846.02,103.07 846.67,103.59 847.07,104.29 C 847.46,105 847.69,106.06 847.78,107.49 C 847.96,109.87 848.24,111.19 848.64,111.47 L 848.64,111.58 L 846.11,111.58 C 845.92,111.42 845.79,111.09 845.71,110.58 C 845.63,110.08 845.54,109.02 845.44,107.41 C 845.35,106.05 845.01,105.10 844.43,104.54 C 843.85,103.99 842.93,103.71 841.66,103.71 L 836.48,103.71 L 836.48,111.58 Z M 834.13,111.58 M 862.16,95.01 L 862.16,92.95 L 876.91,92.95 L 876.91,95.01 L 870.71,95.01 L 870.71,111.58 L 868.37,111.58 L 868.37,95.01 Z M 862.16,95.01 M 894.08,107.77 C 895.26,109.19 896.91,109.91 899.03,109.91 C 901.15,109.91 902.80,109.19 903.98,107.77 C 905.16,106.34 905.75,104.50 905.75,102.25 C 905.75,99.99 905.16,98.14 903.98,96.71 C 902.80,95.27 901.15,94.56 899.03,94.56 C 896.91,94.56 895.26,95.27 894.08,96.71 C 892.90,98.14 892.31,99.99 892.31,102.25 C 892.31,104.50 892.90,106.34 894.08,107.77 M 905.66,109.23 C 904.00,111.05 901.79,111.96 899.03,111.96 C 896.27,111.96 894.06,111.05 892.40,109.23 C 890.74,107.41 889.91,105.08 889.91,102.25 C 889.91,99.41 890.74,97.08 892.40,95.26 C 894.06,93.44 896.27,92.53 899.03,92.53 C 901.79,92.53 904.00,93.44 905.66,95.26 C 907.32,97.08 908.15,99.41 908.15,102.25 C 908.15,105.08 907.32,107.41 905.66,109.23 M 193.88,52.00 C 191.93,42.39 187.86,33.56 182.18,26.00 L 182.18,26.00 L 182.18,25.99 C 175.48,17.07 166.53,9.93 156.18,5.41 C 148.22,1.93 139.42,0.00 130.18,0.00 L 104.18,0.00 L 104.18,39.00 C 104.18,43.81 105.63,48.28 108.12,52.00 C 112.32,58.27 119.46,62.40 127.58,62.40 C 128.46,62.40 129.33,62.35 130.18,62.26 C 130.89,62.18 131.60,62.07 132.29,61.92 L 132.29,61.60 L 130.18,53.35 L 129.83,52.00 L 125.26,34.17 L 128.10,34.17 L 130.18,37.59 L 138.95,52.00 L 142.17,57.29 L 145.21,62.28 L 163.12,62.28 C 166.95,62.77 169.51,64.24 169.46,65.34 C 169.42,66.42 166.80,67.62 163.12,67.83 L 144.64,67.83 L 141.91,72.5 L 138.67,78.00 L 130.18,92.47 L 128.21,95.82 L 125.26,95.82 L 129.74,78.00 L 130.18,76.25 L 132.24,68.06 C 131.56,67.92 130.87,67.82 130.18,67.74 C 129.33,67.65 128.46,67.60 127.58,67.60 C 119.46,67.60 112.32,71.73 108.12,78.00 C 105.63,81.72 104.18,86.19 104.18,91.00 L 104.18,130.00 L 130.18,130.00 C 139.42,130.00 148.22,128.07 156.18,124.59 C 166.53,120.07 175.48,112.92 182.18,104.01 L 182.18,104.00 L 182.18,104.00 C 187.86,96.44 191.93,87.60 193.88,78.00 C 194.73,73.80 195.18,69.45 195.18,65.00 C 195.18,60.55 194.73,56.20 193.88,52.00 M 55.23,44.26 C 55.42,44.64 55.42,45.29 55.23,46.23 C 54.48,47.64 53.44,48.67 52.04,49.14 C 47.91,49.89 43.69,50.55 39.47,51.20 C 39.37,50.45 39.37,49.70 39.56,49.23 C 40.22,48.10 40.97,47.17 42.00,46.60 C 46.32,45.67 50.73,45.10 55.23,44.26 M 61.05,30.75 C 61.05,31.52 60.41,32.16 59.64,32.16 L 55.60,32.16 C 56.35,32.91 59.64,35.16 59.73,43.04 C 59.73,49.60 59.83,56.17 59.83,62.74 C 59.83,63.96 58.79,65 57.67,65 L 47.82,65 C 46.62,65 45.66,64.03 45.66,62.83 L 45.66,60.21 C 43.62,60.33 41.58,60.43 39.54,60.52 C 32.16,60.83 26,54.92 26,47.53 L 26,28.22 L 48.85,28.22 C 47.53,25.68 46.22,23.05 44.91,20.52 C 43.97,19.12 42.94,18.64 41.82,18.37 C 36.54,17.73 31.27,17.38 26,17.32 L 26,13.01 C 31.46,13.08 36.91,13.52 42.19,14.33 C 45.10,14.80 47.53,17.42 47.91,17.99 L 52.51,26.43 L 59.36,27.37 C 60.11,27.46 61.05,28.22 61.05,28.96 Z M 65,0 L 13,0 C 5.82,0 0,5.81 0,13 L 0,130 C 14.35,130 26,118.35 26,104 L 26,91 C 26,83.81 31.82,78 39,78 L 65,78 C 72.17,78 78,72.17 78,65 L 78,13 C 78,5.81 72.17,0 65,0"},uo={w:195.18,h:130,d:"M 193.88,52.00 C 191.93,42.39 187.86,33.56 182.18,26.00 L 182.18,26.00 L 182.18,25.99 C 175.48,17.07 166.53,9.93 156.18,5.41 C 148.22,1.93 139.42,0.00 130.18,0.00 L 104.18,0.00 L 104.18,39.00 C 104.18,43.81 105.63,48.28 108.12,52.00 C 112.32,58.27 119.46,62.40 127.58,62.40 C 128.46,62.40 129.33,62.35 130.18,62.26 C 130.89,62.18 131.60,62.07 132.29,61.92 L 132.29,61.60 L 130.18,53.35 L 129.83,52.00 L 125.26,34.17 L 128.10,34.17 L 130.18,37.59 L 138.95,52.00 L 142.17,57.29 L 145.21,62.28 L 163.12,62.28 C 166.95,62.77 169.51,64.24 169.46,65.34 C 169.42,66.42 166.80,67.62 163.12,67.83 L 144.64,67.83 L 141.91,72.5 L 138.67,78.00 L 130.18,92.47 L 128.21,95.82 L 125.26,95.82 L 129.74,78.00 L 130.18,76.25 L 132.24,68.06 C 131.56,67.92 130.87,67.82 130.18,67.74 C 129.33,67.65 128.46,67.60 127.58,67.60 C 119.46,67.60 112.32,71.73 108.12,78.00 C 105.63,81.72 104.18,86.19 104.18,91.00 L 104.18,130.00 L 130.18,130.00 C 139.42,130.00 148.22,128.07 156.18,124.59 C 166.53,120.07 175.48,112.92 182.18,104.01 L 182.18,104.00 L 182.18,104.00 C 187.86,96.44 191.93,87.60 193.88,78.00 C 194.73,73.80 195.18,69.45 195.18,65.00 C 195.18,60.55 194.73,56.20 193.88,52.00 M 55.23,44.26 C 55.42,44.64 55.42,45.29 55.23,46.23 C 54.48,47.64 53.44,48.67 52.04,49.14 C 47.91,49.89 43.69,50.55 39.47,51.20 C 39.37,50.45 39.37,49.70 39.56,49.23 C 40.22,48.10 40.97,47.17 42.00,46.60 C 46.32,45.67 50.73,45.10 55.23,44.26 M 61.05,30.75 C 61.05,31.52 60.41,32.16 59.64,32.16 L 55.60,32.16 C 56.35,32.91 59.64,35.16 59.73,43.04 C 59.73,49.60 59.83,56.17 59.83,62.74 C 59.83,63.96 58.79,65 57.67,65 L 47.82,65 C 46.62,65 45.66,64.03 45.66,62.83 L 45.66,60.21 C 43.62,60.33 41.58,60.43 39.54,60.52 C 32.16,60.83 26,54.92 26,47.53 L 26,28.22 L 48.85,28.22 C 47.53,25.68 46.22,23.05 44.91,20.52 C 43.97,19.12 42.94,18.64 41.82,18.37 C 36.54,17.73 31.27,17.38 26,17.32 L 26,13.01 C 31.46,13.08 36.91,13.52 42.19,14.33 C 45.10,14.80 47.53,17.42 47.91,17.99 L 52.51,26.43 L 59.36,27.37 C 60.11,27.46 61.05,28.22 61.05,28.96 Z M 65,0 L 13,0 C 5.82,0 0,5.81 0,13 L 0,130 C 14.35,130 26,118.35 26,104 L 26,91 C 26,83.81 31.82,78 39,78 L 65,78 C 72.17,78 78,72.17 78,65 L 78,13 C 78,5.81 72.17,0 65,0"};var Me={fondo:"#eef3f1",suelo:"#eef3f1",pasto:"#e1efe8",playa:"#e5ebe9",calle:"#dce3e1",vereda:"#f3f6f5",linea:"#ffffff",arcilla:"#f5f7f7",gris:"#dde3e4",vidrio:"#b7cdd8",naranja:"#ff6712",navy:"#053f5c"},ir={playa:{x0:-27,x1:11,z0:-13,z1:14},porton:{x0:3,x1:9},avenida:{z0:17,z1:24},carrilEste:22.2,carrilOeste:18.8,cajon:{ancho:2.05,fondo:3.5},filaA:{z0:-12.2,z1:-8.7},filaB1:{z0:-3.5,z1:0},filaB2:{z0:0,z1:3.5},pasillo2:6,xCajones:[],terminal:{x0:32,x1:108,z0:-38,z1:-24},cordon:{z:-18.9},acceso:{x:44.5},pista:{z:-60,x0:-20,x1:200}};for(let i=-25.5;i<=9.6;i+=ir.cajon.ancho)ir.xCajones.push(+i.toFixed(3));function QA(i){let t=(i-70)/44;return 2.2+11*Math.max(0,1-t*t)}function de(i,t){return new Ue(Object.assign({color:i,roughness:.92,metalness:0},t||{}))}function Jl(i,t){let e={suelo:de(Me.suelo,{roughness:1}),pasto:de(Me.pasto,{roughness:1}),playa:de(Me.playa,{roughness:1}),calle:de(Me.calle,{roughness:1}),vereda:de(Me.vereda,{roughness:1}),linea:de(Me.linea,{roughness:1}),arcilla:de(Me.arcilla),copa:de("#e9f3ee"),gris:de(Me.gris),vidrio:de(Me.vidrio,{roughness:.18,metalness:.15}),naranja:de(Me.naranja,{roughness:.6}),navy:de(Me.navy,{roughness:.6})},n={};function s(b,L,U){let G=b+(U===!1?":s":"");L.index&&(L=L.toNonIndexed()),L.deleteAttribute("uv"),(n[G]=n[G]||[]).push(L)}function r(b,L,U,G,k,z,j,At){let ft=new me(L,U,G);return At&&ft.rotateY(At),ft.translate(k,z+U/2,j),s(b,ft),ft}function a(b,L,U,G,k,z){let j=new De(U-L,k-G);j.rotateX(-Math.PI/2),j.translate((L+U)/2,z,(G+k)/2),s(b,j,!1)}function o(b,L,U,G,k,z,j){let At=new Ne(L,L,U,j||10);At.translate(G,k+U/2,z),s(b,At)}let A=ir,c=new Ft(new De(900,900),e.suelo);c.rotation.x=-Math.PI/2,c.receiveShadow=!0,i.add(c),a("calle",-160,260,A.avenida.z0,A.avenida.z1,.012),a("vereda",-160,260,14.6,A.avenida.z0,.02),a("pasto",-160,260,A.avenida.z1,30,.01);for(let b=-158;b<258;b+=4.2)a("linea",b,b+2.2,20.42,20.58,.03);a("linea",-160,260,17.35,17.5,.03),a("linea",-160,260,23.5,23.65,.03),a("playa",A.playa.x0,A.playa.x1,A.playa.z0,A.playa.z1,.015),a("playa",A.porton.x0,A.porton.x1,A.playa.z1,A.avenida.z0,.022);let l=.09,h=A.xCajones,u=[];for(let b=0;b<=h.length;b++){let L=b===0?h[0]-A.cajon.ancho/2:h[b-1]+A.cajon.ancho/2;u.push(L)}u.forEach(b=>{a("linea",b-l/2,b+l/2,A.filaA.z0,A.filaA.z1,.03),a("linea",b-l/2,b+l/2,A.filaB1.z0,A.filaB2.z1,.03)});let d=u[0],m=u[u.length-1];a("linea",d,m,A.filaA.z0-l,A.filaA.z0,.03),a("linea",d,m,-l/2,l/2,.03);for(let b=-20;b<8;b+=7)a("linea",b,b+1.6,A.pasillo2-.06,A.pasillo2+.06,.03),a("linea",b,b+1.6,-6.1,-5.98,.03);let E=A.filaA.z0-.6,p=A.filaA.z1+.5,f=3.4,M=4.3;for(let b=A.playa.x0+.6;b<=A.playa.x1-.5;b+=6.2)o("gris",.09,f,b,0,E+.1,8),o("gris",.09,f,b,0,p-.1,8);{let b=A.playa.x1-A.playa.x0+.4,L=(p-E)/2,U=Math.atan2(M-f,L),G=Math.hypot(L,M-f)+.15,k=(A.playa.x0+A.playa.x1)/2,z=(E+p)/2,j=new me(b,.1,G);j.rotateX(-U),j.translate(k,(f+M)/2,z-L/2);let At=new me(b,.1,G);At.rotateX(U),At.translate(k,(f+M)/2,z+L/2),s("arcilla",j),s("arcilla",At);let ft=new me(b,.12,.16);ft.translate(k,M-.06,z),s("gris",ft)}let C=[],x=1.55;function S(b,L,U,G){let k=Math.hypot(U-b,G-L),z=Math.max(1,Math.round(k/2.6));for(let ft=0;ft<=z;ft++){let Tt=ft/z;o("gris",.045,x,b+(U-b)*Tt,0,L+(G-L)*Tt,6)}let j=Math.atan2(U-b,G-L);[.25,x-.05].forEach(ft=>{let Tt=new me(.05,.05,k);Tt.rotateY(j),Tt.translate((b+U)/2,ft,(L+G)/2),s("gris",Tt)});let At=new De(k,x-.3);At.rotateY(j+Math.PI/2),At.translate((b+U)/2,.25+(x-.3)/2,(L+G)/2),C.push(At)}let _=A.playa;S(_.x0,_.z0,_.x1,_.z0),S(_.x1,_.z0,_.x1,_.z1),S(_.x1,_.z1,A.porton.x1,_.z1),S(A.porton.x0,_.z1,_.x0,_.z1),S(_.x0,_.z1,_.x0,_.z0);let R=new Ft(er(C),new Ue({color:"#cfd8da",transparent:!0,opacity:.22,side:ze,depthWrite:!1,roughness:1}));i.add(R),r("arcilla",.4,2.1,.4,A.porton.x0-.2,0,_.z1),r("arcilla",.4,2.1,.4,A.porton.x1+.2,0,_.z1);{let b=new me(.12,4.6,.12);b.translate(0,2.3,0),b.rotateZ(-.12),b.translate(A.porton.x1+.2,1.1,_.z1+.35),s("naranja",b)}{let j=new kn(9.5,3.2,4.200000000000001,2,.12);j.translate(-19.75,1.6,11.3),s("arcilla",j),r("naranja",-15- -24.5+.05,.55,13.4-9.2+.05,-19.75,2.35,11.3),r("vidrio",3.2,1.3,.06,-19.75-1.6,.9,9.2-.02),r("vidrio",1.1,2.1,.06,-19.75+2.4,0,9.2-.02),r("gris",-15- -24.5+.5,.14,13.4-9.2+.5,-19.75,3.2,11.3)}[[_.x0+.5,_.z0+.5],[_.x1-.5,_.z1-.5],[_.x0+.5,_.z1-.5],[_.x1-.5,_.z0+.5]].forEach(([b,L])=>{o("gris",.07,4.2,b,0,L,8);let U=new kn(.34,.26,.62,2,.06);U.rotateY(Math.atan2(-b-8,-L)),U.translate(b,4.2,L),s("arcilla",U)});for(let b=-60;b<140;b+=16){o("gris",.07,5.2,b,0,16.2,8);let L=new me(.08,.08,1.6);L.translate(b,5.15,16.95),s("gris",L);let U=new kn(.5,.14,.9,2,.05);U.translate(b,5.05,17.6),s("arcilla",U)}let F={v:7};function B(){return F.v=F.v*16807%2147483647,F.v/2147483647}function w(b,L,U){let G=(U||.8+B()*.5)*.78;o("arcilla",.12*G,1.5*G,b,0,L,7);let k=new Gs(1.25*G,2);k.scale(1,1.12,1),k.translate(b,1.5*G+1.1*G,L),s("copa",k)}for(let b=-70;b<150;b+=7.5+B()*5)b>A.porton.x0-3&&b<A.porton.x1+3||b>A.acceso.x-4&&b<A.acceso.x+5||(w(b,15.4+B()*.6),B()>.35&&w(b+2,26+B()*4));w(-13,11.5,1.1),w(-10.5,12.6,.9);for(let b=-10;b<10;b+=6)w(_.x0-3,b),w(_.x1+3.5,b-2);for(let b=20;b<32;b+=4)w(b,-8+B()*6);for(let b=-12;b<12;b+=5.5)w(A.acceso.x-4,b),w(A.acceso.x+5,b+2);let D=A.terminal;a("calle",A.acceso.x-2.6,A.acceso.x+2.6,-16,A.avenida.z0,.013),a("calle",D.x0-4,D.x1+6,-21.4,-16,.013);for(let b=-14;b<16;b+=4.2)a("linea",A.acceso.x-.07,A.acceso.x+.07,b,b+2.2,.03);for(let b=D.x0-2;b<D.x1+4;b+=4.2)a("linea",b,b+2.2,-18.75,-18.62,.03);r("vereda",D.x1-D.x0+8,.14,3,(D.x0+D.x1)/2,0,-22.9),a("playa",D.x0+6,D.x1-6,-12,-1,.012);for(let b=D.x0+7;b<D.x1-6;b+=2.05)a("linea",b,b+.08,-12,-9,.03);{let G=(D.z0+D.z1)/2+1.7,k=new me(90,.55,19,96,1,1),z=k.getAttribute("position");for(let j=0;j<z.count;j++){let At=z.getX(j)+70;z.setY(j,z.getY(j)+QA(At))}k.computeVertexNormals(),k.translate(70,0,G),s("arcilla",k),[[D.z1,"vidrio"],[D.z0,"arcilla"]].forEach(([j,At])=>{let ft=new De(76,1,80,1),Tt=ft.getAttribute("position");for(let zt=0;zt<Tt.count;zt++){let Zt=Tt.getX(zt)+70,Jt=Math.max(.2,QA(Zt)-.25);Tt.setY(zt,Tt.getY(zt)>0?Jt:0)}ft.computeVertexNormals(),ft.translate(70,0,j),s(At,ft)});for(let j=D.x0+1;j<D.x1;j+=3.2){let At=Math.max(.2,QA(j)-.2);r("arcilla",.14,At,.2,j,0,D.z1+.05)}r("vereda",76,.1,D.z1-D.z0,70,0,(D.z0+D.z1)/2)}{let U=new Ne(1,1.35,17,20);U.translate(121,8.5,-29),s("arcilla",U);let G=new Ne(2.2,2.4,1.2,24);G.translate(121,17.4,-29),s("arcilla",G);let k=new Ne(2.7,2.2,2.4,24,1,!0);k.translate(121,19.2,-29),s("vidrio",k);let z=new Ne(3,3,.4,24);z.translate(121,20.6,-29),s("arcilla",z),o("gris",.06,3,121,20.8,-29,6)}a("calle",A.pista.x0,A.pista.x1,A.pista.z-5,A.pista.z+5,.013);for(let b=A.pista.x0+6;b<A.pista.x1-6;b+=9)a("linea",b,b+5,A.pista.z-.12,A.pista.z+.12,.03);for(let b=-3;b<=3;b++)a("linea",A.pista.x0+2,A.pista.x0+6,A.pista.z+b*1.2-.3,A.pista.z+b*1.2+.3,.03);a("calle",20,120,-47,-42,.012),a("calle",26,31,-55,-42,.012);let O=hg(e);return O.position.set(A.porton.x0-3.6,0,15.6),i.add(O),Object.keys(n).forEach(b=>{let[L,U]=b.split(":"),G=er(n[b],!1),k=new Ft(G,e[L]);k.receiveShadow=!0,k.castShadow=U!=="s",k.matrixAutoUpdate=!1,k.updateMatrix(),i.add(k)}),{materiales:e}}function Kl(i,t,e,n,s,r,a){let o=a||0,A=Math.round(n*(e/t)+o*2),c=document.createElement("canvas");c.width=n+o*2,c.height=A;let l=c.getContext("2d");r&&(l.fillStyle=r,l.fillRect(0,0,c.width,c.height)),l.translate(o,o);let h=n/t;l.scale(h,h),l.fillStyle=s,l.fill(new Path2D(i));let u=new bs(c);return u.colorSpace=Fe,u.anisotropy=4,u}function hg(i){let t=new be,e=5.2,n=1.75,s=new Ft(new kn(e,n,.22,2,.08),i.naranja);s.position.y=2.6,s.castShadow=!0,t.add(s);let r=Kl(es.d,es.w,es.h,1024,"#ffffff",null,0),a=new Ft(new De(e*.84,e*.84*(es.h/es.w)),new Ue({map:r,transparent:!0,roughness:.8}));return a.position.set(0,2.6,.115),t.add(a),[-1.6,1.6].forEach(o=>{let A=new Ft(new Ne(.08,.08,1.8,8),i.gris);A.position.set(o,.9,0),A.castShadow=!0,t.add(A)}),t}function Zl(){return Kl(uo.d,uo.w,uo.h,256,"#ffffff",null,0)}function Xl(i){let t=new be,e=de("#f5f7f7"),n=de(i||"#f5f7f7"),s=new Ft(new ri(.26,.55,4,10),n);s.position.y=1.02;let r=new Ft(new Qs(.2,16,12),e);r.position.y=1.62;let a=[];[-.12,.12].forEach(l=>{let h=new be,u=new Ft(new ri(.095,.5,3,8),e);u.position.y=-.33,h.add(u),h.position.set(l,.66,0),t.add(h),a.push(h)});let o=new be,A=new Ft(new kn(.42,.6,.24,2,.05),de(Me.navy,{roughness:.5}));A.position.y=.36;let c=new Ft(new me(.04,.5,.04),de("#9fb3bd"));return c.position.set(0,.85,-.06),o.add(A,c),o.position.set(.48,0,-.25),o.rotation.x=.25,t.add(s,r,o),t.traverse(l=>{l.isMesh&&(l.castShadow=!0)}),t.userData.piernas=a,t}function UA(){let i=new be,t=de("#f7f9f9",{roughness:.55}),e=de(Me.naranja,{roughness:.55}),n=de("#3b4d58",{roughness:.3}),s=new ri(1.25,15,8,20);s.rotateZ(Math.PI/2),i.add(new Ft(s,t));let r=new Is(1.25,4.2,20);r.rotateZ(Math.PI/2),r.translate(-10.6,.35,0),i.add(new Ft(r,t));let a=new Ne(1.262,1.262,12,20,1,!0,Math.PI*.3,Math.PI*.08);a.rotateZ(Math.PI/2);let o=new Ft(a,n);i.add(o);let A=o.clone();A.rotation.x=Math.PI*.62,i.add(A);function c(d,m,E,p){let f=new ai;f.moveTo(0,0),f.lineTo(-E,d),f.lineTo(-E-m*.45,d),f.lineTo(-m,0),f.lineTo(0,0);let M=new Vi(f,{depth:p,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:2});return M.rotateX(Math.PI/2),M}[1,-1].forEach(d=>{let m=c(9.5,4.2,4.6,.18);d<0&&m.scale(1,1,-1),m.translate(1.8,-.45,0),i.add(new Ft(m,t));let E=c(3.4,2.1,2.2,.1);d<0&&E.scale(1,1,-1),E.translate(-9.4,.7,0),i.add(new Ft(E,t));let p=new Ne(.55,.48,2.2,16);p.rotateZ(Math.PI/2),p.translate(1.2,-1.1,d*3.4),i.add(new Ft(p,t))});let l=new ai;l.moveTo(0,0),l.lineTo(-3.4,4.2),l.lineTo(-5.2,4.2),l.lineTo(-4.6,0),l.lineTo(0,0);let h=new Vi(l,{depth:.16,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelSegments:2});h.translate(-7.6,.9,-.08),i.add(new Ft(h,e));let u=new be;return[[4.2,0],[-1,1.4],[-1,-1.4]].forEach(([d,m])=>{let E=new Ft(new Ne(.08,.08,1.1,6),de("#cfd6d9"));E.position.set(d,-1.5,m);let p=new Ft(new Ne(.34,.34,.3,14),de("#c2c9cc"));p.rotation.x=Math.PI/2,p.position.set(d,-2.05,m),u.add(E,p)}),i.add(u),i.userData.tren=u,i.traverse(d=>{d.isMesh&&(d.castShadow=!0)}),i.scale.setScalar(.62),i}var fo={licencia:"Kenney Car Kit \u2014 CC0 (kenney.nl)",modelos:{sedan:{cuerpo:{min:[-.75,.15,-1.3],max:[.75,1.3,1.25],pos:"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RETm4ZBMREQt5MRE7m7m4fk87m4627U1RETm4fk8REQ627U17m7JwiymRETJwiym7m6d0PWqRESd0PWq7m6d0IzV7m4621DPRESd0IzVREQ621DP7m5loaYmRERloaYm7m6usq0nRESusq0n7m6usljd7m7JwlbaRESusljdRETJwlba7m5loV/e7m6usljdRERloV/eRESusljd7m5loSOiRERloSOi7m6usiqjRESusiqj7m7m4XW47m462zKxRETm4XW4REQ62zKx7m6usq0nRESusq0n7m7Jwq8qRETJwq8q7m5loeJi7m6ustthRERloeJiRESustth7m7Jwq8qRETJwq8q7m6d0HkvRESd0Hkv7m6ustth7m7JwtleRESustthRETJwtle7m7m4QzI7m4t5EHARETm4QzIREQt5EHAEpEii+JivLsii+JiEpFloeJivLtloeJi7m4t5MRE7m7m4fk8REQt5MRERETm4fk8EpFloeJivLtloeJiEpGustthvLuustthvLsii6YmEpEii6YmvLtloaYmEpFloaYmvLst5MREvLvm4fk8EpEt5MREEpHm4fk8vLvm4fk8vLs627U1EpHm4fk8EpE627U1EpHJwtlevLvJwtleEpGd0BBavLud0BBavLtloaYmEpFloaYmvLuusq0nEpGusq0nvLvJwq8qEpHJwq8qvLud0HkvEpGd0HkvvLuusq0nEpGusq0nvLvJwq8qEpHJwq8qvLs627U1vLud0HkvEpE627U1EpGd0HkvvLud0BBavLs629NTEpGd0BBaEpE629NTvLvm4ZBMvLst5MREEpHm4ZBMEpEt5MREEpGustthvLuustthEpHJwtlevLvJwtlevLs629NTvLvm4ZBMEpE629NTEpHm4ZBMvLsii6YmvLtloaYmvLsii+JivLuusq0nvLvJwq8qvLud0HkvvLs627U1vLvm4fk8vLst5MREvLvm4ZBMvLs629NTvLud0BBavLvJwtlevLuustthvLtloeJiRERloaYmREQii6YmRESusq0nREQii+JiRETJwq8qRESd0HkvREQ627U1RETm4fk8REQt5MRERETm4ZBMREQ629NTRESd0BBaRETJwtleRESustthRERloeJiREQii+Ji7m4ii+JiRERloeJi7m5loeJiRERloSOiREQiiyOi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",nor:"AF+sAGe2ACGFAB6FgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAAG5AAFpaAG5AAFpaAHshAG5AAHshAG5AAG7BAHvfAG7BAHvfAHshAG5AAHshAG5AAFqmAG7BAFqmAG7BACGFAECSAB6FAD2RAD1vAE1lAEBuAFpaAFpaAG5AAFpaAG5AAFpaAFqmAG7BAFqmAG7BAG5AAFpaAG5AAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAG5AAFpaAG5AAFpaAH8AAHshAH8AAHshAH8AAHshAH8AAHshACGFAB6FAECSAD2RAG7BAHvfAG7BAHvfiNgAiNgAiNgAiNgAiNgAiNgAiNgAAB57ACF7AD1vAEBuiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAACF7AB57AEBuAD1veNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAACF7AEBuAB57AD1vAFqmAG7BAFqmAG7BAHvfAH8AAHvfAH8AACGFAB6FAECSAD2RABGCABGCACGFAB6FAB57AD1vACF7AEBuAECSAD2RAFqmAE2bAFqmABF+AB57ABF+ACF7AHvfAH8AAHvfAH8AAD1vAE1lAEBuAFpaAFpaAD2RAECSAE2bAFqmAFqmABGCABGCAB6FACGFAHshAG5AAHshAG5AAD1vAEBuAE1lAFpaAFpaAD1vAEBuAE1l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AH0VAH0VAHQ0AH0VAH0VAG8+AH0VAH8AAH8AploAploAAACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/gQAAploAgQAAploAWloAfwAAWloAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAHnZAHE6AHnZAHE6AE2bAHnZAE2bAHnZfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AGSyAC+KAGSyAE2bAC+KAC+KAE2bAC+KAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/pgBaAAB/ogBVWgBaAAB/XgBVAAB/fwAAfwAAXgBVWgBagQAAgQAApgBaogBVAC+KAC+KAC+KAC+KAE9jAE9jAE9jAE9jfRkAfRkAfRkAfRkAfRkAgxkAgxkAgxkAgxkAgxkAAACBAACBAACBAACBAACBAACBAACBAACB",col:"a22Ca22Ca22Ca22CZmd8a22CZmd8a22Ca22Cbm+EaWp/cHKHa2yBbW6DcXSJbnCFb3GGcnWKcHKHc3WKcHKHcHKHcnWKb3GGcXSJbnCFcHKHbW6Da2yBbm+EaWp/Zmd8aWp/a22CZmd8aWp/a22Cbm+EaWp/cHKHa2yBbW6DcXSJbnCFb3GGcnWKcHKHc3WKcHKHcHKHcnWKb3GGcXSJbnCFcHKHbW6Da2yBbm+EaWp/Zmd8Zmd8a22Ca22Ca22Ca22Cbm+Ea22CZmd8a22CZmd8aWp/a2yBcHKHbW6DbnCFcXSJb3GGcnWKcHKHcHKHc3WKcHKHcnWKb3GGcXSJbnCFbW6DcHKHa2yBaWp/bm+EZmd8a22CaWp/aWp/Zmd8bm+Ea22CaWp/a2yBcHKHbW6DbnCFcXSJb3GGcnWKcHKHcHKHc3WKcHKHcnWKb3GGcXSJbnCFbW6DcHKHa2yBaWp/bm+EZmd8a22Ca22CZmd8a22Cbm+Ebm+Ebm+Ea22Ca22Ca22Cbm+Ea22Cbm+Ea22Ca22Cbm+Ebm+EcXSJcHKHcXSJcHKHcnWKcXSJcnWKcXSJcXSJcnWKcXSJcnWKcnWKcXSJcnWKcXSJcHKHcXSJcHKHcXSJa22Cbm+Ea22Cbm+Ebm+Ebm+Ebm+EcHKHcHKHcXSJcHKHcXSJcHKHcHKHcXSJcHKHcXSJcXSJcHKHcXSJcHKHcnWKc3WKcnWKc3WKc3WKcnWKc3WKcnWKcXSJcHKHcXSJcHKHc3WKcnWKc3WKcnWKc3WKcnWKc3WKcnWKa22Ca22Cbm+Ebm+EcXSJcnWKcXSJcnWKbm+Ebm+Ea22Ca22Ca22Cbm+Ebm+Ea22Ca22Cbm+Ebm+Ebm+Ebm+Ebm+Ea22CaWp/bm+Ea22CaWp/a22Ca22Cbm+Ebm+Ebm+Ebm+Ebm+Ea22CaWp/bm+Ea22CaWp/a22Cbm+Ea22Cbm+EcHKHcXSJcHKHcXSJcnWKc3WKcnWKc3WKa22Ca22Cbm+Ebm+EaWp/aWp/a22Ca22Ca22Cbm+Ea22Cbm+Ebm+Ebm+EcHKHbm+EcHKHaWp/a22CaWp/a22CcnWKc3WKcnWKc3WKbm+Ebm+Ebm+EcHKHcHKHbm+Ebm+Ebm+EcHKHcHKHaWp/aWp/a22Ca22CcnWKcXSJcnWKcXSJbm+Ebm+Ebm+EcHKHcHKHbm+Ebm+Ebm+EcHKHcHKHcnWKc3WKcnWKc3WKc3WKcnWKc3WKcnWKa22Ca22Ca22Ca22CaWp/aWp/aWp/aWp/cXSJcnWKcXSJcnWKa22Cbm+Ea22Cbm+EaWp/aWp/a22Ca22Cbm+Ebm+Ebm+EcHKHcHKHcXSJcnWKcXSJcnWKbm+EcHKHbm+Ebm+EcHKHaWp/aWp/aWp/aWp/cnWKcXSJcnWKcXSJa22Ca22Cbm+Ebm+Ea22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22CcHKHcXSJcHKHcXSJbm+Ebm+Ebm+Ea22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Cbm+Ebm+EZmd8Zmd8a22Ca22CZmd8a22CZmd8a22CZmd8Zmd8a22Ca22Ca22CZmd8a22CZmd8Zmd8Zmd8a22Ca22CZmd8Zmd8a22Ca22CZmd8Zmd8a22Ca22CZmd8Zmd8a22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22Ca22CZmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8Zmd8a22CZmd8a22Ca22CZmd8a22CZmd8ZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedOjo/OztBOjo/OztBOztBPDxCOztBPDxCOTk+OTk+Ojo/Ojo/OztBPDxCOztBPDxCOjo/OztBOjo/OztBNzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCNzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg9OztBOztBOztBOztBOztBOztBOztBOztBOztBOztBOztBOztBPDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/Ojo/OztBOztBOztBOztBOztBOztBODg9ODg9OTk+OTk+OTk+Ojo/OTk+Ojo/ODg9OTk+ODg9OTk+ODg9ODg9OTk+OTk+PDxCOztBPDxCOztBOTk+OTk+Ojo/Ojo/ODg9OTk+ODg9OTk+Ojo/Ojo/OztBOztBOTk+Ojo/OTk+Ojo/PDxCPDxCPDxCPDxCNzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCODg9ODg9OTk+OTk+Nzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/Ojo/OztBOztBODg9ODg9OTk+OTk+Ojo/Ojo/OztBOztBOTk+OTk+Ojo/Ojo/OztBOztBOztBOztBOztBOztBOztBOztBPDxCPDxCPDxCPDxCOTk+OTk+Ojo/Ojo/OztBPDxCOztBPDxCNzc7ODg9Nzc7OTk+Ojo/OztBOztBPDxCPDxCPDxCOztBOztBOjo/OTk+ODg9ODg9Nzc7OTk+Nzc7Ojo/OztBOztBPDxCPDxCPDxCOztBOztBOjo/OTk+ODg9Nzc7Nzc7ODg9ODg9ODg9Nzc7OTk+Nzc7Ojo/OztBOztBPDxCPDxCPDxCOztBOztBOjo/OTk+ODg9Nzc7ODg9Nzc7OTk+Ojo/OztBOztBPDxCPDxCPDxCOztBOztBOjo/OTk+ODg9Nzc7Nzc7ODg9ODg9ODg9ODg9OTk+OTk+Nzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/OztBOjo/OztBODg9ODg9OTk+OTk+Ojo/Ojo/OztBOztBOTk+OTk+Ojo/Ojo/OztBOztBOztBOztBPDxCPDxCPDxCPDxCOztBOztBOztBOztBOTk+OTk+Ojo/Ojo/OztBPDxCOztBPDxC5mBI5mBI6WJH6WJH6WJH6WJH6WJH6WJH415J31xK415J31xK52BH4l1J5F9I5V9I5mBI6WJH5V9I5F9I6WJH5mBI4l1J31xK5mBI6WJH6WJH31xK4l1J5F9I5V9I5mBI6WJH5V9I5F9I4l1J31xK31xK5mBI415J31xK5mBI5mBI5mBI5mBI5mBI6WJH5mBI6WJH5mBI5mBI6WJH6WJH+mtB+GpC+GpC+mtB6WJH6WJH5mBI5mBI5mBI5mBI6WJH52BH6WJH5mBI5mBI6WJH5mBI5mBI6WJH52BH6WJH6WJH6WJH6WJH5mBI5mBI415J415J415J415J31xK31xK5mBI5mBI6WJH6WJH5mBI6WJH5mBI6WJH6WJH5mBI6WJH5mBI6WJH5mBI6WJH5F9I5V9I4l1J5mBI31xK52BH5V9I5F9I4l1J31xK415J31xK415J5mBI6WJH6WJH31xK4l1J5F9I5V9I5mBI6WJH5V9I5F9I4l1J31xK31xK31xK415J5mBI+mtB+mtB+mtB+mtB+GpC+mtB+GpC+mtB6WJH+mtB6WJH92lC92lC+mtB6WJH+GpC6WJH6WJH+GpC6WJH+mtB92lC+mtB92lC6WJH6WJH5mBI5mBI415J415J415J415J31xK31xK6WJH7GNG6WJH+GpC7GNG92lC+GpC92lC29vo29vo4ODr4ODr29vo29vo4ODr4ODrwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7/8Yb/8Yb/+BF/+BF/8Yb/8Yb/+BF/+BF/+VN/8Yb/+BF/8Yb/8Yb/+VN/8Yb/+BF3fD/3fD/+fz/+fz/1Oz/1Oz/+v3/+v3/+Pz/1Oz/+Pz/1Oz/1Oz/1Oz/+Pz/1Oz/+Pz/1Oz/0zY90zY940k+40k+0zY90zY940k+40k+",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcABwAGAAgACAAGAAkACQAGAAoACQAKAAsACwAKAAwACwAMAA0ACwANAA4ADgANAA8ADgAPABAADgAQABEAEQAQABIAEQASABMAEwASABQAEwAUABUAEwAVABYAFgAVABcAFgAXABgAGAAXABkAGAAZABoAGgAZABsAGgAbABwAGgAcAB0AHQAcAB4AHQAeAB8AHQAfACAAHQAgACEAIAAfACIAIAAiACMAIwAiACQAJAAiACUAJQAiACYAJQAmACcAJwAmACgAJwAoACkAJwApACoAKgApACsAKgArACwAKgAsAC0ALQAsAC4ALQAuAC8ALwAuADAALwAwADEALwAxADIAMgAxADMAMgAzADQANAAzADUANAA1ADYANgA1ADcANgA3ADgANgA4ADkAOQA4ADoAOQA6ADsAOQA7ADwAOQA8AD0AOQA9AD4APQA8AD8AQgBBAEAAQwBBAEIAQwBCAEQARQBBAEMARgBBAEUARwBBAEYARwBIAEEASQBIAEcASgBIAEkASgBLAEgATABLAEoATABNAEsATgBNAEwATwBNAE4ATwBQAE0AUQBQAE8AUQBSAFAAUwBSAFEAUwBUAFIAVQBUAFMAVgBUAFUAVgBXAFQAWABXAFYAWQBXAFgAVwBZAFoAWwBaAFkAWwBcAFoAWwBdAFwAWwBeAF0AXwBeAFsAXwBgAF4AXgBgAGEAYgBgAF8AYwBgAGIAYwBkAGAAZQBkAGMAZgBkAGUAZgBnAGQAaABnAGYAaABpAGcAagBpAGgAawBpAGoAawBsAGkAbQBsAGsAbQBuAGwAbwBuAG0AbwBwAG4AcQBwAG8AcgBwAHEAcgBzAHAAdABzAHIAdQBzAHQAcwB1AHYAdwB2AHUAdwB4AHYAdwB5AHgAegB5AHcAeQB6AHsAfgB9AHwAfQB+AH8AfwB+AIAAgAB+AIEAhACDAIIAgwCEAIUAhQCEAIYAhgCEAIcAhwCEAIgAiwCKAIkAigCLAIwAjwCOAI0AjgCPAJAAkwCSAJEAkgCTAJQAlwCWAJUAlgCXAJgAmwCaAJkAmgCbAJwAnwCeAJ0AngCfAKAAowCiAKEAogCjAKQAogCkAKUAqACnAKYApwCoAKkArACrAKoAqwCsAK0AsACvAK4ArwCwALEAtACzALIAswC0ALUAuAC3ALYAtwC4ALkAvAC7ALoAuwC8AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAzADLAMoAywDMAM0A0ADPAM4AzwDQANEAzwDRANIAzwDSANMAzwDTANQA1wDWANUA1gDXANgA2wDaANkA2gDbANwA2gDcAN0A2gDdAN4A3gDdAN8A3wDdAOAA4wDiAOEA4gDjAOQA5wDmAOUA5gDnAOgA6ADnAOkA6QDnAOoA6QDqAOsA6QDrAOwA7wDuAO0A7gDvAPAA8wDyAPEA8gDzAPQA9wD2APUA9gD3APgA+wD6APkA+gD7APwA/wD+AP0A/gD/AAABAwECAQEBAgEDAQQBBwEGAQUBBgEHAQgBCAEHAQkBDAELAQoBCwEMAQ0BEAEPAQ4BDwEQAREBFAETARIBEwEUARUBEwEVARYBGQEYARcBGAEZARoBGgEZARsBHgEdARwBHQEeAR8BIgEhASABIQEiASMBJgElASQBJQEmAScBJwEmASgBKwEqASkBKgErASwBLAErAS0BMAEvAS4BLwEwATEBNAEzATIBMwE0ATUBOAE3ATYBNwE4ATkBPAE7AToBOwE8AT0BQAE/AT4BPwFAAUEBRAFDAUIBQwFEAUUBSAFHAUYBRwFIAUkBTAFLAUoBSwFMAU0BSwFNAU4BUQFQAU8BUAFRAVIBVQFUAVMBVAFVAVYBVAFWAVcBWgFZAVgBWQFaAVsBXgFdAVwBXQFeAV8BYgFhAWABYQFiAWMBZgFlAWQBZQFmAWcBZwFoAWUBZwFmAWkBaQFmAWoBawFoAWcBawFsAWgBbQFsAWsBbgFsAW0BbAFuAW8BcgFxAXABcQFyAXMBdgF1AXQBdQF2AXcBegF5AXgBeQF6AXsBeQF7AXwBeQF8AX0BgAF/AX4BfwGAAYEBhAGDAYIBgwGEAYUBiAGHAYYBhwGIAYkBjAGLAYoBiwGMAY0BkAGPAY4BjwGQAZEBlAGTAZIBkwGUAZUBmAGXAZYBlwGYAZkBnAGbAZoBmwGcAZ0BoAGfAZ4BnwGgAaEBpAGjAaIBowGkAaUBqAGnAaYBqAGpAacBqgGpAagBqwGpAaoBrAGpAasBqQGsAa0BrgGtAawBrgGvAa0BsAGvAa4BrwGwAbEBtAGzAbIBswG0AbUBswG1AbYBtwG2AbUBuAG2AbcBuQG2AbgBuQG6AbYBugG5AbsBtwG1AbwBtwG8Ab0BtwG9Ab4BvgG9Ab8BvAG1AcABtQHBAcABwgHAAcEBwAHCAcMBwwHCAcQBtQHFAcEBwQHFAcYBxwHFAbUBxgHFAcgBxgHIAckBxwHKAcUBxwHLAcoBxwHMAcsBzAHHAc0B0AHPAc4BzwHQAdEB1AHTAdIB0wHUAdUB2AHXAdYB1wHYAdkB3AHbAdoB2wHcAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB6AHnAeYB5wHoAekB7AHrAeoB6wHsAe0B7QHsAe4B7QHuAe8B7wHuAfAB7wHwAfEB9AHzAfIB8wH0AfUB+AH3AfYB9wH4AfkB/AH7AfoB+wH8Af0BAAL/Af4B/wEAAgECBAIDAgICAwIEAgUCCAIHAgYCBwIIAgkCDAILAgoCCwIMAg0CEAIPAg4CDwIQAhECFAITAhICEwIUAhUCFQIUAhYCFQIWAhcCFwIWAhgCFwIYAhkCHAIbAhoCGwIcAh0CIAIfAh4CHwIgAiECJAIjAiICIwIkAiUCKAInAiYCJwIoAikCLAIrAioCKwIsAi0CMAIvAi4CLwIwAjECNAIzAjICMwI0AjUCOAI3AjYCNwI4AjkCPAI7AjoCOwI8Aj0CQAI/Aj4CPwJAAkECRAJDAkICQwJEAkUCSAJHAkYCRwJIAkkCTAJLAkoCSwJMAk0CUAJPAk4CTwJQAlECVAJTAlICUwJUAlUCWAJXAlYCVwJYAlkCXAJbAloCWwJcAl0CYAJfAl4CXwJgAmECZAJjAmICYwJkAmUCaAJnAmYCZwJoAmkCbAJrAmoCawJsAm0CcAJvAm4CbwJwAnECdAJzAnICcwJ0AnUCeAJ3AnYCdwJ4AnkCfAJ7AnoCewJ8An0CgAJ/An4CfwKAAoEChAKDAoICgwKEAoUCiAKHAoYChwKIAokCjAKLAooCiwKMAo0CkAKPAo4CjwKQApEClAKTApICkwKUApUCmAKXApYClwKYApkCnAKbApoCmwKcAp0CoAKfAp4CnwKgAqECpAKjAqICowKkAqUCqAKnAqYCpwKoAqkCrAKrAqoCqwKsAq0CsAKvAq4CrwKwArECtAKzArICswK0ArUCuAK3ArYCtwK4ArkCvAK7AroCuwK8Ar0CwAK/Ar4CvwLAAsECxALDAsICwwLEAsUCyALHAsYCxwLIAskCzALLAsoCywLMAs0CzQLMAs4CzgLMAs8CzwLMAtAC0ALMAtEC0QLMAtIC0gLMAtMC0wLMAtQC1ALMAtUC1QLMAtYC1gLMAtcC1wLMAtgC2wLaAtkC2gLbAtwC3ALbAt0C3ALdAt4C3ALeAt8C3ALfAuAC3ALgAuEC3ALhAuIC3ALiAuMC3ALjAuQC3ALkAuUC3ALlAuYC3ALmAucC6gLpAugC6QLqAusC7gLtAuwC7QLuAu8C7wLuAvAC7wLwAvEC7wLxAvIC7wLyAvMC7wLzAvQC7wL0AvUC7wL1AvYC7wL2AvcC7wL3AvgC7wL4AvkC7wL5AvoC/QL8AvsC/AL9Av4C/gL9Av8C/wL9AgADAAP9AgEDAQP9AgIDAgP9AgMDAwP9AgQDBAP9AgUDBQP9AgYDBgP9AgcDBwP9AggDCAP9AgkDDAMLAwoDCwMMAw0DEAMPAw4DDwMQAxEDFAMTAxIDEwMUAxUDGAMXAxYDFwMYAxkDHAMbAxoDGwMcAx0DIAMfAx4DHwMgAyEDJAMjAyIDIwMkAyUDKAMnAyYDJwMoAykDLAMrAyoDKwMsAy0DMAMvAy4DLwMwAzEDNAMzAzIDMwM0AzUDOAM3AzYDNwM4AzkDPAM7AzoDOwM8Az0DQAM/Az4DPwNAA0EDRANDA0IDQwNEA0UDSANHA0YDRwNIA0kDTANLA0oDSwNMA00DTgNNA0wDTgNPA00DTgNQA08DTgNRA1ADTgNSA1EDUwNSA04DUwNUA1IDUwNVA1QDVgNVA1MDVwNVA1YDVwNYA1UDVwNZA1gDWgNZA1cDWwNZA1oDXANbA1oDWwNdA1kDWwNeA10DWwNfA14DWwNgA18DWwNhA2ADYgNhA1sDYgNjA2EDYgNkA2MDYgNlA2QDYgNmA2UDZQNmA2cDaANmA2IDaQNmA2gDZgNpA2oDbQNsA2sDbANtA24DcQNwA28DcANxA3IDcgNxA3MDcgNzA3QDdwN2A3UDdgN3A3gDeAN3A3kDegN5A3cDewN5A3oDeQN7A3wDfwN+A30DfgN/A4ADgwOCA4EDggODA4QDhAODA4UDhQODA4YDhQOGA4cDhwOGA4gDiAOGA4kDiAOJA4oDjQOMA4sDjAONA44DkQOQA48DkAORA5IDkwOSA5EDkwOUA5IDlQOUA5MDlAOVA5YDmQOYA5cDmAOZA5oDnQOcA5sDnAOdA54DoQOgA58DoAOhA6IDpQOkA6MDpAOlA6YDpgOlA6cDqAOkA6YDpwOlA6kDqgOkA6gDqQOlA6sDqQOrA6wDrAOrA60DrQOrA64DrgOrA68DrwOrA7ADrwOwA7EDsQOwA7IDqgOzA6QDqgO0A7MDswO0A7UDtgO0A6oDtwO0A7YDuAO0A7cDuQO0A7gDugO0A7kDugO7A7QDvAO7A7oDvQO7A7wDvgO7A70DvwO7A74DvwO+A8ADwQO7A78DwgO7A8EDuwPCA8MDxgPFA8QDxQPGA8cDygPJA8gDyQPKA8sDzgPNA8wDzwPNA84D0APNA88DzQPQA9ED0gPRA9AD0gPTA9ED0wPSA9QD1wPWA9UD1gPXA9gD2APXA9kD2APZA9oD2gPZA9sD2gPbA9wD2gPcA90D4APfA94D3wPgA+ED4gPhA+AD4gPjA+ED5APjA+ID4wPkA+UD6APnA+YD5wPoA+kD6gPmA+cD5wPpA+sD5gPqA+wD6wPpA+0D7APqA+0D7APtA+kD8APvA+4D7wPwA/ED9APzA/ID8wP0A/UD+AP3A/YD9wP4A/kD+QP4A/oD+QP6A/sD+wP6A/wD+wP8A/0DAAT/A/4D/wMABAEEAQQABAIEAQQCBAMEAwQCBAQEAwQEBAUECAQHBAYEBwQIBAkEDAQLBAoECwQMBA0EEAQPBA4EDwQQBBEEFAQTBBIEEwQUBBUEGAQXBBYEFwQYBBkEHAQbBBoEGwQcBB0EIAQfBB4EHwQgBCEEIQQgBCIEJQQkBCMEJAQlBCYEJgQlBCcEKgQpBCgEKQQqBCsELgQtBCwELQQuBC8E",verts:1072,tris:704},ruedas:[[-.3,.3,.66],[.3,.3,-.66],[-.3,.3,-.66],[.3,.3,.66]]},"sedan-sports":{cuerpo:{min:[-.65,.15,-1.3],max:[.65,1.1,1.25],pos:"AYBfw2yaQppfw2yaAYCgw2+aM5qgw2+aAYB6jRCPAYBfwxCPAYB6jSOiAYBfw2yaAYCgw2+aAYD43FmeAYBsqCOiAYC88pKkAYBZvSqjAYDY0CymAYBwA62sAYCW4fWqAYBv7jKxAYDvDR+2AYCC9nW4AYCEEUHAAYBD+UHAAYCC9gzIAYDvDWPKAYBv7lDPAYBwA9TTAYCW4YzVAYC88vDbAYDY0FbaAYBZvVjdAYD43CniAYBsqF/eAYB6jV/eAYBsqGjnAYCgwxLmAYB6jaYmAYBsqJ0dAYCgw/MeAYD43NwiAYBsqKYmAYC88hUpAYBZva0nAYDY0K8qAYBwAzExAYCW4XkvAYBv7rU1AYDvDaI6AYCC9vk8AYCEEcREAYBD+cREAYCC9pBMAYDvDeZOAYBv7tNTAYBwA1hYAYCW4RBaAYC88nNgAYDY0NleAYBZvdthAYD43KxmAYBsqOJiAYB6jeJiAYB6jfBwAYBfw5lqAYCgw5ZqAYBfw/Bw/3+gw5Zq/3/43Kxm/39fw5lq/396jfBw/39fw/Bw/396jeJi/39sqOJi/39Zvdth/3+88nNg/3/Y0Nle/3+W4RBa/39wA1hY/39v7tNT/3/vDeZO/3+C9pBM/39D+cRE/3+EEcRE/3+C9vk8/3/vDaI6/39v7rU1/39wAzEx/3+W4Xkv/3/Y0K8q/3+88hUp/39Zva0n/39sqKYm/3/43Nwi/396jaYm/3+gw/Me/39sqJ0d/39sqGjn/396jV/e/3/43Cni/3+gwxLm/39sqF/e/39ZvVjd/3+88vDb/3/Y0Fba/3+W4YzV/39wA9TT/39v7lDP/3/vDWPK/3+C9gzI/39D+UHA/3+EEUHA/3+C9nW4/3/vDR+2/39v7jKx/39wA62s/3+W4fWq/3/Y0Cym/3+88pKk/39ZvSqj/39sqCOi/3/43Fme/396jSOi/3+gw2+a/39fw2ya/396jRCP/39fwxCPTmxR3kpm+mv43KxmTmxR3vV1zWWgw5ZqvmVfw5lqvmVfw5xyTmxR3gaFvmVfw7eLTmxR3hCPvmVfw2yazWWgw2+a+mv43FmeTmxR3ruespNwA1hYspO88nNgAYBwA1hYAYC88nNgspPvDWPKspNwA9TTAYDvDWPKAYBwA9TT/39wAzEx/3/vDaI6TmxwAzExTmzvDaI6/3/vDWPK/39wA9TTTmzvDWPKTmxwA9TT/3+88pKk/39wA62sTmy88pKkTmxwA62s/3+gw/Me/3/43NwizWWgw/Me+mv43Nwi+mv43CniTmxR3sbh/3/43Cni/3+88vDbTmy88vDbspNwA9TTspO88vDbAYBwA9TTAYC88vDb/3+88hUp/39wAzExTmy88hUpTmxwAzEx/39wA9TT/3+88vDbTmxwA9TTTmy88vDb/3/vDaI6/3+EEcRETmzvDaI6TmyEEcRE/3+EEcRE/3/vDeZOTmyEEcRETmzvDeZO/39wA1hY/3+88nNgTmxwA1hYTmy88nNgspOEEUHAspPvDWPKAYCEEUHAAYDvDWPK/3+EEUHA/3/vDWPKTmyEEUHATmzvDWPKAYCgw/MeM5qgw/MeAYD43NwiBpT43Nwi/39wA62s/3/vDR+2TmxwA62sTmzvDR+2spNR3gaFspNR3hCPQppfw7eLQppfw2yaM5qgw2+aBpT43FmespNR3rueM5qgwxLmAYCgwxLmBpT43CniAYD43CnispNR3sbhspNR3j8jBpT43CniM5qgwxLm06BsqGjnBpT43NwiM5qgw/Me06BsqJ0d/3+gw5ZqzWWgw5Zq/3/43Kxm+mv43KxmTmxR3sbh+mv43CniTmxR3j8jzWWgwxLmLV9sqGjn+mv43NwizWWgw/MeLV9sqJ0dAYCgw5ZqAYD43KxmM5qgw5ZqBpT43KxmspO88hUpspNwAzExAYC88hUpAYBwAzExspPvDR+2spOEEUHAAYDvDR+2AYCEEUHAAYCgw2+aM5qgw2+aAYD43FmeBpT43FmeAYBsqJ0d06BsqJ0dAYCgw/MeM5qgw/MezWWgwxLm+mv43Cni/3+gwxLm/3/43CniAYD43FmeBpT43FmeAYC88pKkspNR3ruespO88pKkLV9sqGjnzWWgwxLm/39sqGjn/3+gwxLmspPvDaI6spOEEcREAYDvDaI6AYCEEcRE+mv43KxmTmxR3kpm/3/43Kxm/3+88nNgTmy88nNg+mv43Nwi/3/43NwiTmxR3j8j/3+88hUpTmy88hUpLV9sqJ0d/39sqJ0dzWWgw/Me/3+gw/MespPvDeZOspNwA1hYAYDvDeZOAYBwA1hYBpT43CniAYD43CnispNR3sbhAYC88vDbspO88vDbBpT43KxmAYD43KxmspNR3kpmAYC88nNgspO88nNg/3/vDR+2/3+EEUHATmzvDR+2TmyEEUHAspOEEcREspPvDeZOAYCEEcREAYDvDeZOvmVfw2ya/39fw2yazWWgw2+a/3+gw2+a06BsqGjn06BsqJ0dAYBsqGjnAYBsqJ0dspNwA62sspPvDR+2AYBwA62sAYDvDR+2/3+gw2+a/3/43FmezWWgw2+a+mv43Fme06BsqGjnAYBsqGjnM5qgwxLmAYCgwxLmBpT43NwispNR3j8jAYD43NwiAYC88hUpspO88hUpspNwAzExspPvDaI6AYBwAzExAYDvDaI6/3/43Fme/3+88pKk+mv43FmeTmxR3rueTmy88pKk/39sqGjn/39sqJ0dLV9sqGjnLV9sqJ0d/3/vDeZO/39wA1hYTmzvDeZOTmxwA1hYvmVfw5xyQppfw5xyTmxR3vV1spNR3vV1Qppfw5lqAYBfw5lqM5qgw5ZqAYCgw5ZqspO88pKkspNwA62sAYC88pKkAYBwA62sspNR3kpmspNR3vV1BpT43KxmM5qgw5ZqQppfw5lqQppfw5xy/39fw5lqvmVfw5lq/3+gw5ZqzWWgw5ZqQppfw7eLvmVfw7eLspNR3gaFTmxR3gaF/39fw/Bw/396jfBwO3pfwwl4O3p6jQl4Tmx6jfp6spN6jfp6Tmxfw/p6spNfw/p6O3p6jQl4Tmx6jfp6O3pfwwl4Tmxfw/p6AYB6jfBwAYBfw/BwxYV6jQl4xYVfwwl4Qppfw5lqQppfw5xyAYBfw5lqspNfw/p6vmVfw5xyxYVfwwl4AYBfw/BwTmxfw/p6vmVfw5lqO3pfwwl4/39fw/Bw/39fw5lqxYV6jfeHxYVfw/eHAYB6jRCPAYBfwxCPspN6jQaFTmx6jQaFspNfwwaFTmxfwwaFO3pfw/eHO3p6jfeH/39fwxCP/396jRCPxYV6jfeHspN6jQaFxYVfw/eHspNfwwaFAYBfwxCPxYVfw/eHAYBfw2yaspNfwwaFQppfw2yaQppfw7eLvmVfw7eLTmxfwwaFvmVfw2yaO3pfw/eH/39fw2ya/39fwxCPTmx6jQaFO3p6jfeHTmxfwwaFO3pfw/eH/396jV/exE56jV/e/396jaYmxE56jaYmxE56jSOispN6jQaFTmx6jQaFO3p6jfeH/396jSOi/396jRCPPLF6jSOiAYB6jSOixYV6jfeHAYB6jRCPPLF6jV/ePLF6jeJiPLF6jaYmAYB6jV/eAYB6jaYmspN6jfp6AYB6jeJixE56jeJixYV6jQl4AYB6jfBwTmx6jfp6O3p6jQl4/396jfBw/396jeJispN6jfp6xYV6jQl4spNfw/p6xYVfwwl4nRgBgP9/diJ6jf9/nRgBgPp6diJ6jfp6Y+cBgP9/nRgBgP9/Y+cBgPp6nRgBgPp6it16jf9/Y+cBgP9/it16jfp6Y+cBgPp6nRgpr/9/nRgpr/p6diKwof9/diKwofp6diJ6jf9/diKwof9/diJ6jfp6diKwofp6Y+cBgPp6nRgBgPp6it16jfp6diJ6jfp6it2wofp6diKwofp6Y+cpr/p6nRgpr/p6Y+cpr/9/Y+cpr/p6nRgpr/9/nRgpr/p6it2wof9/it16jf9/it2wofp6it16jfp6it2wof9/it2wofp6Y+cpr/9/Y+cpr/p6Y+cBgAGAit16jQGAY+cBgAaFit16jQaFnRgBgAGAY+cBgAGAnRgBgAaFY+cBgAaFdiJ6jQGAnRgBgAGAdiJ6jQaFnRgBgAaFY+cprwGAY+cprwaFit2woQGAit2woQaFit16jQGAit2woQGAit16jQaFit2woQaFnRgBgAaFY+cBgAaFdiJ6jQaFit16jQaFdiKwoQaFit2woQaFnRgprwaFY+cprwaFnRgprwGAnRgprwaFY+cprwGAY+cprwaFdiKwoQGAdiJ6jQGAdiKwoQaFdiJ6jQaFdiKwoQGAdiKwoQaFnRgprwGAnRgprwaF/3/Y0Fba/3+W4YzVxE7Y0FbaxE6W4YzV/39v7lDP/3+C9gzIxE5v7lDPxE6C9gzI/39ZvSqjxE5ZvSqj/3/Y0CymxE7Y0Cym/39v7tNT/3+C9pBMxE5v7tNTxE6C9pBM/3/Y0Nle/3+W4RBaxE7Y0NlexE6W4RBaAYB6jV/ePLF6jV/eAYBsqF/ePLFsqF/e/39D+UHA/3+C9nW4xE5D+UHAxE6C9nW4/396jaYmxE56jaYm/39sqKYmxE5sqKYm/396jSOixE56jSOi/39sqCOixE5sqCOi/3+W4RBa/39v7tNTxE6W4RBaxE5v7tNT/39v7rU1/3+W4XkvxE5v7rU1xE6W4Xkv/39v7jKx/3+W4fWqxE5v7jKxxE6W4fWq/3+C9pBM/39D+cRExE6C9pBMxE5D+cRE/3+C9vk8/39v7rU1xE6C9vk8xE5v7rU1/3/Y0CymxE7Y0Cym/3+W4fWqxE6W4fWq/3+W4YzV/39v7lDPxE6W4YzVxE5v7lDP/39sqKYmxE5sqKYm/39Zva0nxE5Zva0n/39ZvVjd/3/Y0FbaxE5ZvVjdxE7Y0Fba/39sqF/e/39ZvVjdxE5sqF/exE5ZvVjd/39sqCOixE5sqCOi/39ZvSqjxE5ZvSqj/3+C9nW4/39v7jKxxE6C9nW4xE5v7jKx/39Zva0nxE5Zva0n/3/Y0K8qxE7Y0K8q/39sqOJi/39ZvdthxE5sqOJixE5Zvdth/3/Y0K8qxE7Y0K8q/3+W4XkvxE6W4Xkv/39Zvdth/3/Y0NlexE5ZvdthxE7Y0Nle/3+C9gzI/39D+UHAxE6C9gzIxE5D+UHAAYB6jeJiPLF6jeJiAYBsqOJiPLFsqOJi/39D+cRE/3+C9vk8xE5D+cRExE6C9vk8AYBsqOJiPLFsqOJiAYBZvdthPLFZvdthPLF6jaYmAYB6jaYmPLFsqKYmAYBsqKYmPLFD+cREPLGC9vk8AYBD+cREAYCC9vk8PLGC9vk8PLFv7rU1AYCC9vk8AYBv7rU1AYDY0NlePLHY0NleAYCW4RBaPLGW4RBaPLFsqKYmAYBsqKYmPLFZva0nAYBZva0nPLHY0K8qAYDY0K8qPLGW4XkvAYCW4XkvPLFZva0nAYBZva0nPLHY0K8qAYDY0K8qPLFv7rU1PLGW4XkvAYBv7rU1AYCW4XkvPLGW4RBaPLFv7tNTAYCW4RBaAYBv7tNTPLGC9pBMPLFD+cREAYCC9pBMAYBD+cREAYBZvdthPLFZvdthAYDY0NlePLHY0NlePLFv7tNTPLGC9pBMAYBv7tNTAYCC9pBMPLF6jaYmPLFsqKYmPLF6jeJiPLFZva0nPLHY0K8qPLGW4XkvPLFv7rU1PLGC9vk8PLFD+cREPLGC9pBMPLFv7tNTPLGW4RBaPLHY0NlePLFZvdthPLFsqOJixE5sqKYmxE56jaYmxE5Zva0nxE56jeJixE7Y0K8qxE6W4XkvxE5v7rU1xE6C9vk8xE5D+cRExE6C9pBMxE5v7tNTxE6W4RBaxE7Y0NlexE5ZvdthxE5sqOJixE56jeJi/396jeJixE5sqOJi/39sqOJixE5sqCOixE56jSOixE5ZvSqjxE56jV/exE7Y0CymxE6W4fWqxE5v7jKxxE6C9nW4xE5D+UHAxE6C9gzIxE5v7lDPxE6W4YzVxE7Y0FbaxE5ZvVjdxE5sqF/ePLF6jSOiPLFsqCOiPLF6jV/ePLFZvSqjPLHY0CymPLGW4fWqPLFv7jKxPLGC9nW4PLFD+UHAPLGC9gzIPLFv7lDPPLGW4YzVPLHY0FbaPLFZvVjdPLFsqF/exE56jV/e/396jV/exE5sqF/e/39sqF/eAYBsqF/ePLFsqF/eAYBZvVjdPLFZvVjdPLF6jSOiAYB6jSOiPLFsqCOiAYBsqCOiPLFD+UHAPLGC9nW4AYBD+UHAAYCC9nW4PLGC9nW4PLFv7jKxAYCC9nW4AYBv7jKxPLHY0FbaPLGW4YzVAYDY0FbaAYCW4YzVPLFsqCOiAYBsqCOiPLFZvSqjAYBZvSqjPLHY0CymAYDY0CymPLGW4fWqAYCW4fWqPLFZvSqjAYBZvSqjPLHY0CymAYDY0CymPLGW4YzVPLFv7lDPAYCW4YzVAYBv7lDPPLGC9gzIPLFD+UHAAYCC9gzIAYBD+UHAPLFv7jKxPLGW4fWqAYBv7jKxAYCW4fWqAYBZvVjdPLFZvVjdAYDY0FbaPLHY0FbaPLFv7lDPPLGC9gzIAYBv7lDPAYCC9gzI/382FPcsTmw2FPcs/38oL/csTmwoL/csTmxR3vV1spNR3vV1TmxD+fV1spND+fV1JzZD+fV12clD+fV1/38oL+0i/38oL/csTmwoL+0iTmwoL/csTmwoL4kpspNR3gaFspND+QaFspNR3hCPspM2FBqZspNR3ruespMoLy6tspO88pKkspNwA62sspPvDR+2spMoL2/uspOEEUHAspPvDWPKspNwA9TTspO88vDbspNR3sbhspNR3j8jspM2FO0ispMoL+0ispM2FPcsspO88hUpspNwAzExspMoL/csspMoL7k5spPvDaI6spOvIdxcspOEEcREspPvDeZOspNwA1hYspO88nNgspN5DWlpspNR3kpmspNR3vV1spND+fV1/382FPcs/382FO0iTmw2FPcsTmw2FO0iTmwoL7k5OVgoL7k5nVj/f5EReEjUb5kZY6f/f5ERiLfUb5kZx6coL7k5spMoL7k5spNR3gaFTmxR3gaFspND+QaFTmxD+QaFxq5D+QaFOlFD+QaFOlFD+QaFOlE2FBqZxq5D+QaFxq42FBqZspMoLy6tspM2FBqZTmwoLy6tTmw2FBqZspM2FPcsspM2FO0iAYA2FPcsAYA2FO0iTmwoL7k5TmyvIdxcOVgoL7k5spOvIdxcx6coL7k5spMoL7k5spMoLy6tY6f/f0zLspMoL2/uKaFvZm/uY6f/f5ERKaFvZhQOspMoL4kpspMoL7k5spMoL/csspMoL+0ispMoL4kpAYAoL+0ispMoL/csAYAoL/csspM2FPcsAYA2FPcsspMoL/csAYAoL/csAYA2FO0iAYAoL+0iAYA2FPcsAYAoL/csTmwoL/csTmw2FPcsTmwoL7k5TmxwAzExTmzvDaI6Tmy88hUpTmyvIdxcTmxR3j8jTmyEEcRETmzvDeZOTmxwA1hYTmy88nNgTmx5DWlpTmxR3kpmTmxR3vV1TmxD+fV1Tmw2FO0iTmwoL/nuTmwoL+0iTmxR3sbhTmy88vDbTmxwA9TTTmzvDWPKTmyEEUHATmzvDR+2TmwoLy6tTmxwA62sTmy88pKkTmxR3rueTmw2FBqZTmxR3hCPTmxR3gaFTmxD+QaF/38oL+0i/382FO0i/38oL/cs/382FPcsTmwoL/csTmwoL7k5TmwoL4kpnVj/f5ER115vZhQO115vZtjunVj/f0zLTmwoL/nuTmwoLy6tTmyvIdxcTmx5DWlpspOvIdxcJzZ5DWlpJzZD+fV12cl5DWlpspN5DWlp2clD+fV1nVj/f0zLnVj/f5ERY6f/f0zLY6f/f5ERTmwoLy6tkaw2Qke0spMoLy6tY6f/f0zLb1M2Qke0+rbxbDLEnVj/f0zLBknxbDLETmw2FO0i/382FO0iTmwoL+0i/38oL+0iAYA2FO0ispM2FO0iAYAoL+0ispMoL+0iTmwoLy6tTmwoL/nuspMoLy6tTmwoL+0iTmwoL4kpTmwoL/csTmwoL7k5OVgoL7k5x6coL7k5spMoL7k5spMoL2/uspMoL+0ispMoL4kpspMoL/csnRgBgP9/Y+cBgP9/diJ6jf9/it16jf9/diKwof9/it2wof9/nRgpr/9/Y+cpr/9/Y+cBgAGAnRgBgAGAit16jQGAdiJ6jQGAit2woQGAdiKwoQGAY+cprwGAnRgprwGAxq5D+QaFxq42FBqZspND+QaFspM2FBqZTmxD+QaFTmw2FBqZOlFD+QaFOlE2FBqZOVgoL7k5x6coL7k5eEjUb5kZiLfUb5kZ115vZtjuTmwoL/nu115vZhQOTmwoL+0iTmwoL4kpkaw2Qke0b1M2Qke0+rbxbDLEBknxbDLEspMoL2/uKaFvZm/uspMoL+0iKaFvZhQOspMoL4kp2cl5DWlp2clD+fV1spN5DWlpspND+fV1Tmx5DWlpTmxD+fV1JzZ5DWlpJzZD+fV1cMLY0MeTcMK9BseTcMLY0LGfcMK9BrGfG9bY0LGfG9bY0MeTcMLY0LGfcMLY0MeTG9bY0LGfcMLY0LGfG9a9BrGfcMK9BrGfcMLY0MeTG9bY0MeTcMK9BseTG9a9BseTG9a9BseTG9bY0MeTG9a9BrGfG9bY0LGfkD3Y0LGfkD3Y0MeT5SnY0LGf5SnY0MeT5SnY0MeTkD3Y0MeT5Sm9BseTkD29BseTkD3Y0LGf5SnY0LGfkD29BrGf5Sm9BrGfkD29BseTkD3Y0MeTkD29BrGfkD3Y0LGf5SnY0MeT5Sm9BseT5SnY0LGf5Sm9BrGfspO9BtKNspOvIdKNspO9BqalspOvIbyZspM2FKalspO9BtKNTmy9BtKNspOvIdKNTmyvIdKNTmy9BqalspO9BqalTmw2FKalspM2FKalTmyvIbyZTmw2FKalspOvIbyZspM2FKalTmyvIdKNTmy9BtKNTmyvIbyZTmy9BqalTmw2FKalTmyvIbyZspOvIbyZTmyvIdKNspOvIdKNcMK9BrGfspO9BqalG9a9BrGfcMK9BseTspO9BtKNG9a9BseT5Sm9BseT5Sm9BrGfkD29BseTTmy9BtKNkD29BrGfTmy9Bqal",nor:"AF+sAGe2ACGFAB6FgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAAG5AAFpaAG5AAFpaAHshAG5AAHshAG5AAG7BAHvfAG7BAHvfAHshAG5AAHshAG5AAFqmAG7BAFqmAG7BACGFAECSAB6FAD2RAD1vAE1lAEBuAFpaAFpaAG5AAFpaAG5AAFpaAFqmAG7BAFqmAG7BAG5AAFpaAG5AAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAG5AAFpaAG5AAFpaAH8AAHshAH8AAHshAH8AAHshAH8AAHshACGFAB6FAECSAD2RAG7BAHvfAG7BAHvfiNgAiNgAiNgAiNgAiNgAiNgAiNgAAB57ACF7AD1vAEBuiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAACF7AB57AEBuAD1veNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAACF7AEBuAB57AD1vAFqmAG7BAFqmAG7BAHvfAH8AAHvfAH8AACGFAB6FAECSAD2RABGCABGCACGFAB6FAB57AD1vACF7AEBuAECSAD2RAFqmAE2bAFqmABF+AB57ABF+ACF7AHvfAH8AAHvfAH8AAD1vAE1lAEBuAFpaAFpaAD2RAECSAE2bAFqmAFqmABGCABGCAB6FACGFAHshAG5AAHshAG5AAD1vAEBuAE1lAFpaAFpaAD1vAEBuAE1lAFpaAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAGe2AF+sAB6FACGFAH8AAH8AAH8AAH8AAG7BAHvfAG7BAHvfACGFAECSAB6FAD2RABF+ABF+AB57ACF7AD2RAE2bAECSAFqmAFqmAG7BAHvfAG7BAHvfAECSAFqmAD2RAE2bAFqmAH8AAH8AAH8AAH8AAHshAG5AAHshAG5AANh4ANh4ANh4ANh4AGdKAF9UAB57ACF7AFqmAG7BAFqmAG7BiNgAiNgAiNgAiNgAiNgAiNgAAF9UAGdKACF7AB57ALqWALqWALqWALqWdQAxdQAxWgBaWgBaGQB95wB9GQB95wB9WgBaGQB9WgBaGQB9iwAxiwAxpgBapgBaAGdKAH8AAF9UAH8AAH8AAH8AAH8AAH8AAGdKAH8AAH8AAF9UpgCmpgCmiwDPiwDP5wCDGQCD5wCDGQCDWgCmWgCmdQDPdQDPpgCm5wCDpgCm5wCDAH8AAH8AAF+sAH8AAGe2AH8AAH8AAH8AAGe2AH8AAF+sAH8AGQCDWgCmGQCDWgCmAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEA5wB9pgBa5wB9pgBaMYsAdc8AMYsAdc8Az4sAMYsAz4sAMYsAi88Az4sAi88Az4sAMXUAMXUAdTEAdTEAdc8AdTEAdc8AdTEAAACBAACBAACBAACBAACBAACBAACBAACBz3UAz3UAMXUAMXUAizEAi88AizEAi88AizEAizEAz3UAz3UAz4sAi88Az4sAi88AMYsAz4sAMYsAz4sAdc8AMYsAdc8AMYsAz3UAz3UAizEAizEAi88AizEAi88AizEAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/MXUAMXUAz3UAz3UAdTEAdc8AdTEAdc8AdTEAdTEAMXUAMXUAAMGSAKamAMGSAKamAJLBAIXfAJLBAIXfAN97AN97AMFuAMFuAJLBAIXfAJLBAIXfAMGSAKamAMGSAKamAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAAB/AAB/APh/APh/AAB/AAB/APh/APh/AKamAJLBAKamAJLBAJJAAKZaAJJAAKZaAJJAAKZaAJJAAKZaAIXfAIEAAIXfAIEAAIUhAJJAAIUhAJJAAMFuAMFuAKZaAKZaAKamAJLBAKamAJLBAPh/APh/AN97AN97AN+FAMGSAN+FAMGSAPiBAN+FAPiBAN+FAPh/APh/AN97AN97AIUhAJJAAIUhAJJAAN97AN97AMFuAMFuAPiBAN+FAPiBAN+FAMFuAMFuAKZaAKZaAN+FAMGSAN+FAMGSAIXfAIEAAIXfAIEAAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAMGSAKamAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAJJAAKZaAJJAAKZaAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAACBAACBAPiBAPiBfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAACBAACBAPiBAPiBAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAKamAMGSAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAJJAAKZaAJJAAKZaAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/WloAWloAAH8AAH8AAH8AgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAIEAAIEAAIEAAIEAAGZMAGZMAHgrAGZMAHgrAGZMAGZMAGZMAACBAACBAACBAACBAACBAACBAHLHAHLHAHLHAHLHAHLHAHLHAHLHAHLHAIEAAIEAAIEAAIEAAH4SAHgqAH4SAHgqAH4SAH4SiCgAiCgAiCgAiCgAiCgAiCgAiCgAiCgAiCgAAH8AAH8AploAAH8AploAAAB/AAB/AAB/AAB/gQAAploAgQAAploAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAWloAfwAAWloAfwAAeCgAeCgAeCgAeCgAeCgAeCgAeCgAeCgAeCgAAHgqAG1BAHgqAG1BAG1BAG1BAG1BAG1BAH8AAHgrAH8AAHgrAFqmAFqmAFqmAFqmAFqmAFqmAFqmAFqmAACBAACBAACBAACBAACBAACBAACBAACBAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AACBAACBAACBAACBAACBAACBAACBAACBAHLHAHLHAHLHAHLHAHLHAHLHAHLHAHLHAGZMAGZMAGZMAGZMeCgAeCgAeCgAeCgAeCgAAFqmAFqmAFqmAFqmiCgAiCgAiCgAiCgAiCgAAG1BAG1BAG1BAG1BAG1BAG1BAG1BAG1BgQAAgQAAgQAAgQAAAIEAAIEAAIEAAIEAAAB/AAB/AAB/AAB/AACBAACBAACBAACBfwAAfwAAfwAAfwAAAIEAAIEAAIEAAIEAAACBAACBAACBAACBAAB/AAB/AAB/AAB/fwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAACBAACBAACBAACBAAB/AAB/AAB/AAB/AHwZAHUxAHwZAHUxfwAAfwAAfwAAfwAAfwAAAHwZAHwZAH8AAH8AAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEA",col:"bW6DbW6DbW6DbW6DZ2d8bW6DZ2d8bW6DbW6Db3GGaWp/cnSJbG2CbnCFdHaMcHKHcXSJdXiNc3WKdniOc3WKc3WKdXiNcXSJdHaMcHKHcnSJbnCFbG2Cb3GGaWp/Z2d8aWp/bW6DZ2d8aWp/bW6Db3GGaWp/cnSJbG2CbnCFdHaMcHKHcXSJdXiNc3WKdniOc3WKc3WKdXiNcXSJdHaMcHKHcnSJbnCFbG2Cb3GGaWp/Z2d8Z2d8bW6DbW6DbW6DbW6Db3GGbW6DZ2d8bW6DZ2d8aWp/bG2CcnSJbnCFcHKHdHaMcXSJdXiNc3WKc3WKdniOc3WKdXiNcXSJdHaMcHKHbnCFcnSJbG2CaWp/b3GGZ2d8bW6DaWp/aWp/Z2d8b3GGbW6DaWp/bG2CcnSJbnCFcHKHdHaMcXSJdXiNc3WKc3WKdniOc3WKdXiNcXSJdHaMcHKHbnCFcnSJbG2CaWp/b3GGZ2d8bW6DbW6DZ2d8bW6DcHKHb3GGcHKHbW6DbW6DbW6DcHKHbW6DcHKHbW6DbW6Db3GGcHKHdHaMcnSJdHaMcnSJdXiNdHaMdXiNdHaMdHaMdXiNdHaMdXiNdXiNdHaMdXiNdHaMcnSJdHaMcnSJdHaMbW6Db3GGbW6Db3GGb3GGcHKHb3GGcnSJcnSJdHaMcnSJdHaMcnSJcnSJdHaMcnSJdHaMdHaMcnSJdHaMcnSJdXiNdniOdXiNdniOdniOdXiNdniOdXiNdHaMcnSJdHaMcnSJdniOdXiNdniOdXiNdniOdXiNdniOdXiNbW6DbW6Db3GGb3GGdHaMdXiNdHaMdXiNcHKHcHKHbW6DbW6DbW6Db3GGcHKHbW6DbW6Db3GGb3GGcHKHcHKHb3GGbW6DaWp/b3GGbW6DaWp/bW6DbW6Db3GGb3GGcHKHb3GGcHKHbW6DaWp/b3GGbW6DaWp/bW6Db3GGbW6Db3GGcnSJdHaMcnSJdHaMdXiNdniOdXiNdniObW6DbW6Db3GGb3GGaWp/aWp/bW6DbW6DbW6Db3GGbW6Db3GGb3GGb3GGcnSJcHKHcnSJaWp/bW6DaWp/bW6DdXiNdniOdXiNdniOb3GGcHKHb3GGcnSJcnSJb3GGb3GGcHKHcnSJcnSJaWp/aWp/bW6DbW6DdXiNdHaMdXiNdHaMb3GGb3GGcHKHcnSJcnSJb3GGb3GGcHKHcnSJcnSJdXiNdniOdXiNdniOdniOdXiNdniOdXiNbW6DbW6DbW6DbW6DaWp/aWp/aWp/aWp/dHaMdXiNdHaMdXiNbW6Db3GGbW6Db3GGaWp/aWp/bW6DbW6Db3GGcHKHb3GGcnSJcnSJdHaMdXiNdHaMdXiNb3GGcnSJb3GGcHKHcnSJaWp/aWp/aWp/aWp/dXiNdHaMdXiNdHaMbW6DbW6DcHKHcHKHbW6DbW6DbW6DbW6DcnSJdHaMcnSJdHaMcHKHcHKHb3GGbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DcHKHcHKHbW6DZ2d8bW6DZ2d8Z2d8Z2d8bW6DbW6DZ2d8Z2d8bW6DbW6DZ2d8bW6DZ2d8bW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DZ2d8bW6DZ2d8bW6DZ2d8Z2d8bW6DbW6DbW6DZ2d8bW6DZ2d8Z2d8Z2d8bW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DZ2d8Z2d8bW6DbW6DZ2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8bW6DbW6DZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedOztBPDxCOztBPDxCPDxDPT1EPDxDPT1EOjo/Ojo/OztBOztBPDxDPT1EPDxDPT1EOztBPDxCOztBPDxCNzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1ENzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg9PDxCPDxDPDxCPDxDPDxDPDxCPDxDPDxCPDxDPDxCPDxDPDxCPT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDOztBOztBPDxCPDxCPDxCPDxDPDxCPDxDODg9ODg9Ojo/Ojo/Ojo/OztBOjo/OztBODg9Ojo/ODg9Ojo/ODg9ODg9Ojo/Ojo/PT1EPDxDPT1EPDxDOjo/Ojo/OztBOztBODg9Ojo/ODg9Ojo/OztBOztBPDxCPDxCOjo/OztBOjo/OztBPT1EPT1EPT1EPT1ENzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EODg9ODg9Ojo/Ojo/Nzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDOztBOztBPDxCPDxCODg9ODg9Ojo/Ojo/OztBOztBPDxCPDxCOjo/Ojo/OztBOztBPDxDPDxCPDxDPDxCPDxCPDxDPDxCPDxDPT1EPT1EPT1EPT1EOjo/Ojo/OztBOztBPDxDPT1EPDxDPT1ENzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Nzc7Nzc7ODg9ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Nzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Nzc7Nzc7ODg9ODg9ODg9ODg9Ojo/Ojo/Nzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDOztBPDxCOztBPDxCODg9ODg9Ojo/Ojo/OztBOztBPDxCPDxCOjo/Ojo/OztBOztBPDxCPDxDPDxCPDxDPT1EPT1EPT1EPT1EPDxDPDxCPDxDPDxCOjo/Ojo/OztBOztBPDxDPT1EPDxDPT1E6mJG6mJG7mRF7mRF4l1J4l1J5mBI5mBI5mBI5mBI7mRF7mRF7mRF7mRF7mRF4l1J5mBI4l1J6mJG4l1J7mRF5V9I52FH6WFH7mRF6mJH6WFH52FH5V9I4l1J4l1J6mJG7mRF6mJG5V9I52FH7mRF7mRF6WFH7GNG6mJH6WFH52FH5V9I6WFH4l1J4l1J5mBI6mJG6mJG6mJG6mJG7mRF7mRF+mtB+GpC+mtB+GpC7mRF7mRF4l1J4l1J5mBI5mBI5mBI5mBI5mBI6mJG5mBI6mJG7mRF6mJG7mRF6mJG6mJG6mJG6mJG6mJG7mRF7GNG7mRF7GNG7mRF7mRF7mRF+mtB7mRF9mlD+mtB9mlD7mRF7mRF7mRF7mRF7mRF7mRF7mRF7mRF6mJG6mJG7mRF7mRF6mJG7mRF6mJG7mRF7mRF6mJG7mRF52FH6WFH5V9I7GNG4l1J6mJH6WFH52FH5V9I6WFH4l1J4l1J5mBI6mJG7mRF7mRF4l1J5V9I52FH6WFH6mJH6WFH7mRF52FH5V9I4l1J6mJG4l1J4l1J5mBI7mRF6mJG7mRF6mJG7mRF7mRF7mRF+mtB9mlD9mlD+mtB7mRF7mRF7GNG6WFH7GNG6WFH5mBI6WFH6WFH5mBI+mtB+mtB+mtB+mtB7mRF8WZE7mRF+mtB8WZE92lC+mtB92lC4eHs4eHs5ubv5ubv4eHs4eHs5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubv5ubvwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj70zY9+mc/0zY9+mc/0zY9+mc/0zY9+mc/1Oz/1Oz/+v3/+v3/9fv/1Oz/9fv/1Oz/1Oz/3/H/3/H/+Pz/+Pz/1Oz/9fv/1Oz/9fv/1Oz//+VN/8Yb/+VN/8Yb/+VN/8Yb/+VN/8YbNjY6QEBINjY6QEBINjY6NjY6NjY6NjY6NjY6NjY6QEBIQEBINjY6NjY6QEBIQEBIQEBINjY6QEBINjY6NjY6NjY6NjY6NjY6NjY6NjY6QEBIQEBINjY6NjY6QEBIQEBIQEBINjY6QEBINjY6NjY6QEBINjY6QEBI7WRF+mtB7WRF+mtB9GdD7WRF7WRF+mtB+mtB7WRF7WRF9GdD9GdD+mtB9GdD+mtB9GdD+mtB7WRF+mtB7WRF9GdD+mtB+mtB+mtB+mtB7WRF7WRF7WRF7WRF7WRF7WRF7WRF7WRF7WRF7WRF7WRF7WRF",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcABwAGAAgACAAGAAkACQAGAAoACQAKAAsACwAKAAwACwAMAA0ACwANAA4ADgANAA8ADgAPABAADgAQABEAEQAQABIAEQASABMAEwASABQAEwAUABUAEwAVABYAFgAVABcAFgAXABgAGAAXABkAGAAZABoAGgAZABsAGgAbABwAGgAcAB0AHQAcAB4AHQAeAB8AHQAfACAAHQAgACEAIAAfACIAIAAiACMAIwAiACQAJAAiACUAJQAiACYAJQAmACcAJwAmACgAJwAoACkAJwApACoAKgApACsAKgArACwAKgAsAC0ALQAsAC4ALQAuAC8ALwAuADAALwAwADEALwAxADIAMgAxADMAMgAzADQANAAzADUANAA1ADYANgA1ADcANgA3ADgANgA4ADkAOQA4ADoAOQA6ADsAOQA7ADwAOQA8AD0AOQA9AD4APQA8AD8AQgBBAEAAQwBBAEIAQwBCAEQARQBBAEMARgBBAEUARwBBAEYARwBIAEEASQBIAEcASgBIAEkASgBLAEgATABLAEoATABNAEsATgBNAEwATwBNAE4ATwBQAE0AUQBQAE8AUQBSAFAAUwBSAFEAUwBUAFIAVQBUAFMAVgBUAFUAVgBXAFQAWABXAFYAWQBXAFgAVwBZAFoAWwBaAFkAWwBcAFoAWwBdAFwAWwBeAF0AXwBeAFsAXwBgAF4AXgBgAGEAYgBgAF8AYwBgAGIAYwBkAGAAZQBkAGMAZgBkAGUAZgBnAGQAaABnAGYAaABpAGcAagBpAGgAawBpAGoAawBsAGkAbQBsAGsAbQBuAGwAbwBuAG0AbwBwAG4AcQBwAG8AcgBwAHEAcgBzAHAAdABzAHIAdQBzAHQAcwB1AHYAdwB2AHUAdwB4AHYAdwB5AHgAegB5AHcAeQB6AHsAfgB9AHwAfQB+AH8AfwB+AIAAgAB+AIEAhACDAIIAgwCEAIUAhQCEAIYAhgCEAIcAhwCEAIgAiwCKAIkAigCLAIwAjwCOAI0AjgCPAJAAkwCSAJEAkgCTAJQAlwCWAJUAlgCXAJgAmwCaAJkAmgCbAJwAnwCeAJ0AngCfAKAAowCiAKEAogCjAKQAogCkAKUAqACnAKYApwCoAKkArACrAKoAqwCsAK0AsACvAK4ArwCwALEAtACzALIAswC0ALUAuAC3ALYAtwC4ALkAvAC7ALoAuwC8AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAzADLAMoAywDMAM0A0ADPAM4AzwDQANEAzwDRANIAzwDSANMAzwDTANQA1wDWANUA1gDXANgA2wDaANkA2gDbANwA2gDcAN0A2gDdAN4A3gDdAN8A3wDdAOAA4wDiAOEA4gDjAOQA5wDmAOUA5gDnAOgA6ADnAOkA6QDnAOoA6QDqAOsA6QDrAOwA7wDuAO0A7gDvAPAA8wDyAPEA8gDzAPQA9wD2APUA9gD3APgA+wD6APkA+gD7APwA/wD+AP0A/gD/AAABAwECAQEBAgEDAQQBBwEGAQUBBgEHAQgBCAEHAQkBDAELAQoBCwEMAQ0BEAEPAQ4BDwEQAREBFAETARIBEwEUARUBEwEVARYBGQEYARcBGAEZARoBGgEZARsBHgEdARwBHQEeAR8BIgEhASABIQEiASMBJgElASQBJQEmAScBJwEmASgBKwEqASkBKgErASwBLAErAS0BMAEvAS4BLwEwATEBNAEzATIBMwE0ATUBOAE3ATYBNwE4ATkBPAE7AToBOwE8AT0BQAE/AT4BPwFAAUEBRAFDAUIBQwFEAUUBSAFHAUYBRwFIAUkBTAFLAUoBSwFMAU0BSwFNAU4BUQFQAU8BUAFRAVIBVQFUAVMBVAFVAVYBVAFWAVcBWgFZAVgBWQFaAVsBXgFdAVwBXQFeAV8BYgFhAWABYQFiAWMBZgFlAWQBZQFmAWcBagFpAWgBaQFqAWsBbgFtAWwBbQFuAW8BbQFvAXABbQFwAXEBdAFzAXIBcwF0AXUBeAF3AXYBdwF4AXkBfAF7AXoBewF8AX0BgAF/AX4BfwGAAYEBhAGDAYIBgwGEAYUBiAGHAYYBhwGIAYkBjAGLAYoBiwGMAY0BjQGOAYsBjQGMAY8BjwGMAZABkQGOAY0BkQGSAY4BkwGSAZEBlAGSAZMBkgGUAZUBmAGXAZYBlwGYAZkBnAGbAZoBmwGcAZ0BoAGfAZ4BnwGgAaEBpAGjAaIBowGkAaUBqAGnAaYBqAGpAacBqgGpAagBqwGpAaoBrAGpAasBqQGsAa0BrgGtAawBrgGvAa0BsAGvAa4BrwGwAbEBtAGzAbIBswG0AbUBuAG3AbYBtwG4AbkBtwG5AboBuwG6AbkBvAG6AbsBvQG6AbwBvQG+AboBvgG9Ab8BuwG5AcABuwHAAcEBuwHBAcIBwgHBAcMBwAG5AcQBuQHFAcQBxgHEAcUBxAHGAccBxwHGAcgBuQHJAcUBxQHJAcoBywHJAbkBygHJAcwBygHMAc0BywHOAckBywHPAc4BywHQAc8B0AHLAdEB1AHTAdIB0wHUAdUB2AHXAdYB1wHYAdkB3AHbAdoB2wHcAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB6AHnAeYB5wHoAekB7AHrAeoB6wHsAe0B7QHsAe4B7QHuAe8B7wHuAfAB7wHwAfEB9AHzAfIB8wH0AfUB+AH3AfYB9wH4AfkB/AH7AfoB+wH8Af0BAAL/Af4B/wEAAgECBAIDAgICAwIEAgUCCAIHAgYCBwIIAgkCDAILAgoCCwIMAg0CEAIPAg4CDwIQAhECFAITAhICEwIUAhUCFQIUAhYCFQIWAhcCFwIWAhgCFwIYAhkCHAIbAhoCGwIcAh0CIAIfAh4CHwIgAiECJAIjAiICIwIkAiUCKAInAiYCJwIoAikCLAIrAioCKwIsAi0CMAIvAi4CLwIwAjECNAIzAjICMwI0AjUCOAI3AjYCNwI4AjkCPAI7AjoCOwI8Aj0CQAI/Aj4CPwJAAkECRAJDAkICQwJEAkUCSAJHAkYCRwJIAkkCTAJLAkoCSwJMAk0CUAJPAk4CTwJQAlECVAJTAlICUwJUAlUCWAJXAlYCVwJYAlkCXAJbAloCWwJcAl0CYAJfAl4CXwJgAmECZAJjAmICYwJkAmUCaAJnAmYCZwJoAmkCbAJrAmoCawJsAm0CcAJvAm4CbwJwAnECdAJzAnICcwJ0AnUCeAJ3AnYCdwJ4AnkCfAJ7AnoCewJ8An0CgAJ/An4CfwKAAoEChAKDAoICgwKEAoUCiAKHAoYChwKIAokCjAKLAooCiwKMAo0CkAKPAo4CjwKQApEClAKTApICkwKUApUCmAKXApYClwKYApkCnAKbApoCmwKcAp0CoAKfAp4CnwKgAqECpAKjAqICowKkAqUCqAKnAqYCpwKoAqkCrAKrAqoCqwKsAq0CsAKvAq4CrwKwArECtAKzArICswK0ArUCuAK3ArYCtwK4ArkCvAK7AroCuwK8Ar0CwAK/Ar4CvwLAAsECxALDAsICwwLEAsUCyALHAsYCxwLIAskCzALLAsoCywLMAs0CzQLMAs4CzgLMAs8CzwLMAtAC0ALMAtEC0QLMAtIC0gLMAtMC0wLMAtQC1ALMAtUC1QLMAtYC1gLMAtcC1wLMAtgC2wLaAtkC2gLbAtwC3ALbAt0C3ALdAt4C3ALeAt8C3ALfAuAC3ALgAuEC3ALhAuIC3ALiAuMC3ALjAuQC3ALkAuUC3ALlAuYC3ALmAucC6gLpAugC6QLqAusC7gLtAuwC7QLuAu8C7wLuAvAC7wLwAvEC7wLxAvIC7wLyAvMC7wLzAvQC7wL0AvUC7wL1AvYC7wL2AvcC7wL3AvgC7wL4AvkC7wL5AvoC/QL8AvsC/AL9Av4C/gL9Av8C/wL9AgADAAP9AgEDAQP9AgIDAgP9AgMDAwP9AgQDBAP9AgUDBQP9AgYDBgP9AgcDBwP9AggDCAP9AgkDDAMLAwoDCwMMAw0DEAMPAw4DDwMQAxEDFAMTAxIDEwMUAxUDGAMXAxYDFwMYAxkDHAMbAxoDGwMcAx0DIAMfAx4DHwMgAyEDJAMjAyIDIwMkAyUDKAMnAyYDJwMoAykDLAMrAyoDKwMsAy0DMAMvAy4DLwMwAzEDNAMzAzIDMwM0AzUDOAM3AzYDNwM4AzkDPAM7AzoDOwM8Az0DQAM/Az4DPwNAA0EDRANDA0IDQwNEA0UDSANHA0YDRwNIA0kDSQNIA0oDSQNKA0sDTgNNA0wDTQNOA08DTwNOA1ADUwNSA1EDUgNTA1QDVANTA1UDVANVA1YDVgNVA1cDVgNXA1gDVgNYA1kDVgNZA1oDWgNZA1sDWgNbA1wDWgNcA10DWgNdA14DWgNeA18DWgNfA2ADWgNgA2EDYgNaA2EDYQNgA2MDYwNgA2QDYwNkA2UDYwNlA2YDZgNlA2cDZwNlA2gDZwNoA2kDaQNoA2oDaQNqA2sDaQNrA2wDaQNsA20DaQNtA24DbgNtA28DbgNvA3ADbgNwA3EDdANzA3IDcwN0A3UDeAN3A3YDdwN4A3kDeQN4A3oDeQN6A3sDewN6A3wDfAN6A30DgAN/A34DfwOAA4EDgQOAA4IDgQOCA4MDhgOFA4QDhwOFA4YDiAOFA4cDiAOHA4kDigOFA4gDhQOKA4sDjgONA4wDjQOOA48DkgORA5ADkQOSA5MDkwOSA5QDkwOUA5UDmAOXA5YDlwOYA5kDlwOZA5oDmgOZA5sDmgObA5wDmgOcA50DnQOcA54DoQOgA58DoAOhA6IDogOhA6MDpgOlA6QDpQOmA6cDqgOpA6gDqQOqA6sDrgOtA6wDrQOuA68DrwOuA7ADsQOtA68DsAOuA7IDswOtA7EDsAOyA7QDtAOyA7UDtQOyA7YDtgOyA7cDtwOyA7gDtwO4A7kDuQO4A7oDugO4A7sDswO8A60DswO9A7wDvAO9A74DvwO9A7MDwAO9A78DwQO9A8ADwgO9A8EDwwO9A8IDxAO9A8MDxAPFA70DxgPFA8QDxwPFA8YDyAPFA8cDyAPJA8UDygPJA8gDywPJA8oDyQPLA8wDzwPOA80DzgPPA9AD0wPSA9ED0wPUA9ID1QPUA9MD1gPUA9UD1APWA9cD2APXA9YD1wPYA9kD3APbA9oD2wPcA90D3QPcA94D3gPcA98D3wPcA+AD4QPeA98D5APjA+ID4wPkA+UD6APnA+YD5wPoA+kD6gPmA+cD5wPpA+sD5gPqA+wD6wPpA+0D7APqA+0D7APtA+kD8APvA+4D7wPwA/ED9APzA/ID8wP0A/UD+AP3A/YD9wP4A/kD+QP4A/oD+gP4A/sD+wP4A/wD/AP4A/0D/QP4A/4D/gP4A/8D/wP4AwAE/wMABAEE/wMBBAIE/wMCBAMEBgQFBAQEBQQGBAcEBwQGBAgEBwQIBAkECQQIBAoECQQKBAsEDgQNBAwEDQQOBA8EDwQOBBAEDwQQBBEEEQQQBBIEEQQSBBMEFgQVBBQEFQQWBBcEGgQZBBgEGQQaBBsEHgQdBBwEHQQeBB8EIgQhBCAEIQQiBCMEIwQiBCQEJwQmBCUEJgQnBCgEKwQqBCkEKgQrBCwELAQrBC0EMAQvBC4ELwQwBDEENAQzBDIEMwQ0BDUEOAQ3BDYENwQ4BDkEPAQ7BDoEOwQ8BD0EQAQ/BD4EPwRABEEERARDBEIEQwREBEUESARHBEYERwRIBEkETARLBEoESwRMBE0EUARPBE4ETwRQBFEEVARTBFIEUwRUBFUEWARXBFYEVwRYBFkEXARbBFoEWwRcBF0EYARfBF4EXwRgBGEEYQRgBGIEZQRkBGMEZARlBGYEaQRoBGcEaARpBGoEbQRsBGsEbARtBG4EcQRwBG8EcARxBHIEcgRxBHMEdgR1BHQEdQR2BHcEegR5BHgEeAR5BHsEfAR7BHkEfAR9BHsEfQR+BHoEfAR+BH0EfwR6BH4EfwR5BHoEfASABH4EgQSABHwEggR5BH8EgASBBIIEggSDBHkEgwSCBIEE",verts:1156,tris:760},ruedas:[[-.3,.3,-.66],[.3,.3,-.66],[.3,.3,.66],[-.3,.3,.66]]},"hatchback-sports":{cuerpo:{min:[-.65,.15,-1.45],max:[.65,1.1,1.4],pos:"AYBfw6SXQppfw6SXAYCgw6eXM5qgw6eXAYB6jfknAYBsqPknAYB6jQ4wAYCgwyopAYD43KosAYBsqA4wAYC88jsyAYBZvfkwAYDY0KozAYBwA3w5AYCW4fI3AYBv7oc9AYDvDe9BAYCC9gdEAYCEEQBLAYBD+QBLAYCC9vpRAYDvDRFUAYBv7nlYAYBwA4RcAYCW4Q5eAYC88sZjAYDY0FZiAYBZvQhlAYD43FdpAYBsqPNlAYB6jfNlAYB6jYZyAYBfw9lsAYCgw9dsAYBfw4Zy/39fw3qN/39sqHqN/39fw6SX/39sqIue/3+gw6eX/3/43Ceb/3+88rig/39ZvXaf/3/Y0Cei/39wA/qn/3+W4XCm/39v7gSs/3/vDWyw/3+C9oSy/3+EEX25/39D+X25/3/vDY7C/3+C9nfA/39v7vfG/39wAwHL/3+W4YvM/3+88kPS/3/Y0NTQ/39ZvYXT/3/43NTX/39sqHDU/396jXDU/396jYXc/3+gw1Tb/39sqIXcTmxR3v5o+mv43FdpTmxR3ghuzWWgw9dsvmVfw9lsvmVfwwV0TmxR3gR3vmVfw3yKvmVfw6SXTmxR3nqNzWWgw6eX+mv43CebTmxR3n+bspNwA4RcspO88sZjAYBwA4RcAYC88sZjspPvDY7CspNwAwHLAYDvDY7CAYBwAwHL/39wA3w5/3/vDe9BTmxwA3w5TmzvDe9B/3/vDY7C/39wAwHLTmzvDY7CTmxwAwHL/3+88rig/39wA/qnTmy88rigTmxwA/qn/3+gwyop/3/43KoszWWgwyop+mv43Kos+mv43NTXTmxR3nzX/3/43NTX/3+88kPSTmy88kPSspNwAwHLspO88kPSAYBwAwHLAYC88kPS/3+88jsy/39wA3w5Tmy88jsyTmxwA3w5/39wAwHL/3+88kPSTmxwAwHLTmy88kPS/3/vDe9B/3+EEQBLTmzvDe9BTmyEEQBL/3+EEQBL/3/vDRFUTmyEEQBLTmzvDRFU/39wA4Rc/3+88sZjTmxwA4RcTmy88sZjspOEEX25spPvDY7CAYCEEX25AYDvDY7C/3+EEX25/3/vDY7CTmyEEX25TmzvDY7CAYCgwyopM5qgwyopAYD43KosBpT43Kos/39wA/qn/3/vDWywTmxwA/qnTmzvDWywQppfw3yKspNR3nqNQppfw6SXM5qgw6eXBpT43CebspNR3n+bM5qgw1TbAYCgw1TbBpT43NTXAYD43NTX/3+gw9dszWWgw9ds/3/43Fdp+mv43FdpAYCgw9dsAYD43FdpM5qgw9dsBpT43FdpspO88jsyspNwA3w5AYC88jsyAYBwA3w5spPvDWywspOEEX25AYDvDWywAYCEEX25AYCgw6eXM5qgw6eXAYD43CebBpT43CebAYBsqPkn06BsqPknAYCgwyopM5qgwyopzWWgw1Tb+mv43NTX/3+gw1Tb/3/43NTXAYD43CebBpT43CebAYC88rigspNR3n+bspO88rigLV9sqIXczWWgw1Tb/39sqIXc/3+gw1TbspPvDe9BspOEEQBLAYDvDe9BAYCEEQBL+mv43FdpTmxR3v5o/3/43Fdp/3+88sZjTmy88sZj+mv43Kos/3/43KosTmxR3gIt/3+88jsyTmy88jsyLV9sqPkn/39sqPknzWWgwyop/3+gwyopspPvDRFUspNwA4RcAYDvDRFUAYBwA4RcBpT43NTXAYD43NTXspNR3nzXAYC88kPSspO88kPSBpT43FdpAYD43FdpspNR3v5oAYC88sZjspO88sZj/3/vDWyw/3+EEX25TmzvDWywTmyEEX25spOEEQBLspPvDRFUAYCEEQBLAYDvDRFUvmVfw6SX/39fw6SXzWWgw6eX/3+gw6eXspNwA/qnspPvDWywAYBwA/qnAYDvDWyw/3+gw6eX/3/43CebzWWgw6eX+mv43Ceb06BsqIXcAYBsqIXcM5qgw1TbAYCgw1TbBpT43KosspNR3gItAYD43KosAYC88jsyspO88jsyspNwA3w5spPvDe9BAYBwA3w5AYDvDe9B/3/43Ceb/3+88rig+mv43CebTmxR3n+bTmy88rig/3/vDRFU/39wA4RcTmzvDRFUTmxwA4RcvmVfwwV0QppfwwV0TmxR3gR3spNR3gR37ERR3gR3FLtR3gR3Qppfw9lsQppfwwV0AYBfw9lsspNfw4F7vmVfwwV0xYVfw+B4AYBfw4ZyTmxfw4F7vmVfw9lsO3pfw+B4/39fw4Zy/39fw9lsQppfw9lsAYBfw9lsM5qgw9dsAYCgw9dsspO88rigspNwA/qnAYC88rigAYBwA/qnspNR3v5ospNR3ghuBpT43FdpM5qgw9dsQppfw9lsQppfwwV0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",nor:"AF+sAGe2ACGFAB6FgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAAG5AAFpaAG5AAFpaAHshAG5AAHshAG5AAG7BAHvfAG7BAHvfAHshAG5AAHshAG5AAFqmAG7BAFqmAG7BACGFAECSAB6FAD2RAD1vAE1lAEBuAFpaAFpaAG5AAFpaAG5AAFpaAFqmAG7BAFqmAG7BAG5AAFpaAG5AAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAG5AAFpaAG5AAFpaAH8AAHshAH8AAHshAH8AAHshAH8AAHshACGFAB6FAECSAD2RAG7BAHvfAG7BAHvfiNgAiNgAiNgAiNgAiNgAiNgAAB57ACF7AD1vAEBuACF7AB57AEBuAD1vACF7AEBuAB57AD1vAFqmAG7BAFqmAG7BAHvfAH8AAHvfAH8AACGFAB6FAECSAD2RABGCABGCACGFAB6FAB57AD1vACF7AEBuAECSAD2RAFqmAE2bAFqmABF+AB57ABF+ACF7AHvfAH8AAHvfAH8AAD1vAE1lAEBuAFpaAFpaAD2RAECSAE2bAFqmAFqmABGCABGCAB6FACGFAHshAG5AAHshAG5AAD1vAEBuAE1lAFpaAFpaAD1vAEBuAE1lAFpaAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAGe2AF+sAB6FACGFAG7BAHvfAG7BAHvfACGFAECSAB6FAD2RABF+ABF+AB57ACF7AD2RAE2bAECSAFqmAFqmAG7BAHvfAG7BAHvfAECSAFqmAD2RAE2bAFqmAHshAG5AAHshAG5AANh4ANh4ANh4ANh4ANh4ANh4AGdKAH8AAF9UAH8AAH8AAH8AAH8AAH8AAGdKAH8AAH8AAF9UAGdKAF9UAB57ACF7AFqmAG7BAFqmAG7BiNgAiNgAiNgAiNgAiNgAiNgAiNgAAF9UAGdKACF7AB57AACBAACBAACBAACBfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAACBAACBAACBAACBAAB/AAB/AAB/AAB/gQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAAB/AAB/AAB/AAB/AACBAACBAACBAACBeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAGQB95wB9GQB95wB9WgBaGQB9WgBaGQB9dQAxdQAxWgBaWgBaiwAxiwAxpgBapgBa5wB9pgBa5wB9pgBaAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAWgCmdQDPWgCmdQDPpgCm5wCDpgCm5wCDpgCmpgCmiwDPiwDP5wCDGQCD5wCDGQCDAH8AAH8AAF+sAH8AAGe2AH8AAH8AAH8AAGe2AH8AAF+sAH8AAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAGQCDWgCmGQCDWgCmACiIACiIACiIACiIAAB/AAB/AAB/AAB/AACBAACBAACBAACBMYsAdc8AMYsAdc8Az4sAMYsAz4sAMYsAi88Az4sAi88Az4sAMXUAMXUAdTEAdTEAdc8AdTEAdc8AdTEAAACBAACBAACBAACBAACBAACBAACBAACBz3UAz3UAMXUAMXUAizEAi88AizEAi88AizEAizEAz3UAz3UAz4sAi88Az4sAi88AMYsAz4sAMYsAz4sAdc8AMYsAdc8AMYsAz3UAz3UAizEAizEAi88AizEAi88AizEAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/MXUAMXUAz3UAz3UAdTEAdc8AdTEAdc8AdTEAdTEAMXUAMXUAAGZMAGZMAGZMAGZMeCgAeCgAeCgAiCgAiCgAiCgAAACBAACBAACBAACBAH8AAH8AAH8AAH8AAJLBAIXfAJLBAIXfAMGSAKamAMGSAKamAAB/AAB/APh/APh/AKamAJLBAKamAJLBAJJAAKZaAJJAAKZaAIXfAIEAAIXfAIEAAIUhAJJAAIUhAJJAAPh/APh/AN97AN97AN97AN97AMFuAMFuAPiBAN+FAPiBAN+FAMFuAMFuAKZaAKZaAN+FAMGSAN+FAMGSAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAMGSAKamAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAJJAAKZaAJJAAKZaAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAACBAACBAPiBAPiBAACBAACBAPiBAPiBAJJAAKZaAJJAAKZaAN+FAMGSAN+FAMGSAIEAAIUhAIEAAIUhAMGSAKamAMGSAKamAJLBAIXfAJLBAIXfAN97AN97AMFuAMFuAMFuAMFuAKZaAKZaAKamAJLBAKamAJLBAIUhAJJAAIUhAJJAAPiBAN+FAPiBAN+FAO9+AO9+AN97AN97AIXfAIEAAIXfAIEAAPiBAPiBAN+FAN+FAIUhAJJAAIUhAJJAAO9+AO9+AN97AN97AKamAJLBAKamAJLBAN97AN97AMFuAMFugQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAN+FAN+FAMGSAMGSAIXfAIEAAIXfAIEAAMGSAKamAMGSAKamAJJAAKZaAJJAAKZaAJLBAIXfAJLBAIXfAACBAACBAPiBAPiBfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAIEAAIUhAIEAAIUhAMFuAMFuAKZaAKZaAACBAACBAACBAAB/AAB/AAB/AAB/gQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAA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",col:"bW6DbW6DbW6DbW6DZ2d8aWp/Z2d8bW6Db3GGaWp/cnSJbG2CbnCFdHaMcHKHcXSJdXiNc3WKdniOc3WKc3WKdXiNcXSJdHaMcHKHcnSJbnCFbG2Cb3GGaWp/Z2d8Z2d8bW6DbW6DbW6DbW6DaWp/bW6DaWp/bW6Db3GGcnSJbG2CbnCFdHaMcHKHcXSJdXiNc3WKdniOc3WKdXiNc3WKcXSJdHaMcHKHcnSJbnCFbG2Cb3GGaWp/Z2d8Z2d8bW6DaWp/cHKHb3GGcHKHbW6DbW6DbW6DcHKHbW6DbW6DcHKHbW6Db3GGcHKHdHaMcnSJdHaMcnSJdXiNdHaMdXiNdHaMdHaMdXiNdHaMdXiNdXiNdHaMdXiNdHaMcnSJdHaMcnSJdHaMbW6Db3GGbW6Db3GGb3GGcHKHb3GGcnSJcnSJdHaMcnSJdHaMcnSJcnSJdHaMcnSJdHaMdHaMcnSJdHaMcnSJdXiNdniOdXiNdniOdniOdXiNdniOdXiNdHaMcnSJdHaMcnSJdniOdXiNdniOdXiNdniOdXiNdniOdXiNbW6DbW6Db3GGb3GGdHaMdXiNdHaMdXiNbW6DcHKHbW6DbW6Db3GGcHKHbW6DbW6Db3GGb3GGbW6DbW6Db3GGb3GGbW6Db3GGbW6Db3GGcnSJdHaMcnSJdHaMdXiNdniOdXiNdniObW6DbW6Db3GGb3GGaWp/aWp/bW6DbW6DbW6Db3GGbW6Db3GGb3GGb3GGcnSJcHKHcnSJaWp/bW6DaWp/bW6DdXiNdniOdXiNdniOb3GGcHKHb3GGcnSJcnSJb3GGb3GGcHKHcnSJcnSJaWp/aWp/bW6DbW6DdXiNdHaMdXiNdHaMb3GGb3GGcHKHcnSJcnSJb3GGb3GGcHKHcnSJcnSJdXiNdniOdXiNdniOdniOdXiNdniOdXiNbW6DbW6DbW6DbW6DdHaMdXiNdHaMdXiNbW6Db3GGbW6Db3GGaWp/aWp/bW6DbW6Db3GGcHKHb3GGcnSJcnSJdHaMdXiNdHaMdXiNb3GGcnSJb3GGcHKHcnSJdXiNdHaMdXiNdHaMbW6DbW6DcHKHcHKHcHKHcHKHbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DcnSJdHaMcnSJdHaMcHKHcHKHb3GGbW6DbW6DbW6DcHKHbW6DbW6DbW6DbW6DZ2d8Z2d8aWp/aWp/bW6Db3GGbW6DZ2d8bW6DZ2d8aWp/bG2CcnSJbnCFcHKHdHaMcXSJdXiNc3WKc3WKdniOc3WKdXiNcXSJdHaMcHKHbnCFcnSJbG2CaWp/b3GGZ2d8bW6DZ2d8aWp/Z2d8KZJwZ2d8KZJwZ2d8Z2d8KZJwKZJwZ2d8aWp/Z2d8b3GGbG2CbW6DaWp/cnSJbnCFcHKHdHaMcXSJdXiNc3WKdniOc3WKc3WKdXiNcXSJdHaMcHKHbnCFcnSJbG2CaWp/b3GGbW6DbW6DbW6DaWp/Z2d8Z2d8KZJwKZJwZ2d8KZJwZ2d8KZJwcHKHb3GGcHKHbW6DaWp/cHKHaWp/bW6Db3GGcHKHcHKHcHKHb3GGbW6DaWp/aWp/cHKHbW6Db3GGcHKHZ2d8Z2d8bW6DbW6DZ2d8Z2d8bW6DbW6DbW6DZ2d8bW6DZ2d8Z2d8bW6DZ2d8bW6DZ2d8Z2d8bW6DbW6DZ2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8I4xtZ2d8I4xtI4xtZ2d8I4xtI4xtI4xtZ2d8I4xtI4xtZ2d8aWp/aWp/bW6DbW6DaWp/aWp/bW6DbW6DaWp/bW6DaWp/bW6DaWp/aWp/bW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DaWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/bW6DbW6DbW6DbW6DcHKHcHKHcHKHcHKHc3WKc3WKZWV6goedZWV6goedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedbG6DbG6De36Ue36Ue36UbG6De36UbG6De36Ue36UbG6DbG6De36Ue36Ue36Ue36Ue36Ue36UPDxDPT1EPDxDPT1EOztBPDxCOztBPDxCNzc7Nzc7ODg9ODg9PDxCPDxDPDxCPDxDPDxDPDxCPDxDPDxCPT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDODg9ODg9Ojo/Ojo/Ojo/Ojo/OztBOztBODg9Ojo/ODg9Ojo/OztBOztBPDxCPDxCOjo/OztBOjo/OztBNzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EODg9ODg9Ojo/Ojo/Nzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDOztBOztBPDxCPDxCODg9ODg9Ojo/Ojo/OztBOztBPDxCPDxCOjo/Ojo/OztBOztBPDxDPDxCPDxDPDxCPDxCPDxDPDxCPDxDPT1EPT1EPT1EPT1EOjo/Ojo/OztBOztBPDxDPT1EPDxDPT1ENzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Nzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg9PDxDPDxCPDxDPDxCOjo/OztBOjo/OztBPT1EPT1EPT1EPT1EOztBPDxCOztBPDxCPDxDPT1EPDxDPT1EOjo/Ojo/OztBOztBOztBOztBPDxCPDxCPDxCPDxDPDxCPDxDPT1EPDxDPT1EPDxDODg9Ojo/ODg9Ojo/ODg9ODg9Ojo/Ojo/PT1EPT1EPT1EPT1EODg9ODg9Ojo/Ojo/PT1EPDxDPT1EPDxDODg9ODg9Ojo/Ojo/PDxCPDxDPDxCPDxDOjo/Ojo/OztBOztBNzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Ojo/Ojo/OztBOztBPT1EPT1EPT1EPT1EOztBPDxCOztBPDxCPDxDPDxCPDxDPDxCPDxDPT1EPDxDPT1ENzc7Nzc7ODg9ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9PT1EPT1EPT1EPT1EOztBOztBPDxCPDxCKZJwZ2d8KZJwZ2d8Z2d8KZJwKZJwZ2d8aWp/Z2d8b3GGbG2CbW6DaWp/cnSJbnCFcHKHdHaMcXSJdXiNc3WKdniOc3WKc3WKdXiNcXSJdHaMcHKHbnCFcnSJbG2CaWp/b3GGbW6DbW6DbW6DaWp/Z2d8Z2d8KZJwKZJwZ2d8KZJwZ2d8KZJwcHKHb3GGcHKHbW6DaWp/cHKHaWp/bW6Db3GGcHKHcHKHcHKHb3GGbW6DaWp/aWp/cHKHbW6Db3GGcHKHZ2d8Z2d8bW6DbW6DZ2d8Z2d8bW6DbW6DbW6DZ2d8bW6DZ2d8Z2d8bW6DZ2d8bW6DZ2d8Z2d8bW6DbW6DZ2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8I4xtZ2d8I4xtI4xtZ2d8I4xtI4xtI4xtZ2d8I4xtI4xtZ2d8aWp/aWp/bW6DbW6DaWp/aWp/bW6DbW6DaWp/bW6DaWp/bW6DaWp/aWp/bW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DbW6DaWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/aWp/bW6DbW6DbW6DbW6DcHKHcHKHcHKHcHKHc3WKc3WKPDxDPT1EPDxDPT1EOztBPDxCOztBPDxCNzc7Nzc7ODg9ODg9PDxCPDxDPDxCPDxDPDxDPDxCPDxDPDxCPT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDODg9ODg9Ojo/Ojo/Ojo/Ojo/OztBOztBODg9Ojo/ODg9Ojo/OztBOztBPDxCPDxCOjo/OztBOjo/OztBNzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EODg9ODg9Ojo/Ojo/Nzc7Nzc7ODg9ODg9PT1EPT1EPT1EPT1EPT1EPDxDPT1EPDxDOztBOztBPDxCPDxCODg9ODg9Ojo/Ojo/OztBOztBPDxCPDxCOjo/Ojo/OztBOztBPDxDPDxCPDxDPDxCPDxCPDxDPDxCPDxDPT1EPT1EPT1EPT1EOjo/Ojo/OztBOztBPDxDPT1EPDxDPT1ENzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Nzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg9PDxDPDxCPDxDPDxCOjo/OztBOjo/OztBPT1EPT1EPT1EPT1EOztBPDxCOztBPDxCPDxDPT1EPDxDPT1EOjo/Ojo/OztBOztBOztBOztBPDxCPDxCPDxCPDxDPDxCPDxDPT1EPDxDPT1EPDxDODg9Ojo/ODg9Ojo/ODg9ODg9Ojo/Ojo/PT1EPT1EPT1EPT1EODg9ODg9Ojo/Ojo/PT1EPDxDPT1EPDxDODg9ODg9Ojo/Ojo/PDxCPDxDPDxCPDxDOjo/Ojo/OztBOztBNzc7ODg9Nzc7Ojo/OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9Ojo/Ojo/OztBOztBPT1EPT1EPT1EPT1EOztBPDxCOztBPDxCPDxDPDxCPDxDPDxCPDxDPT1EPDxDPT1ENzc7Nzc7ODg9ODg9ODg9Nzc7Ojo/Nzc7OztBPDxCPDxDPT1EPT1EPT1EPDxDPDxCOztBOjo/ODg9PT1EPT1EPT1EPT1EOztBOztBPDxCPDxCQqt8Qqt8R7F+R7F+R7F+R7F+R7F+R7F+WsSHWsSHWsSHWsSHQqt8Qqt8Qqt8Qqt8R7F+R7F+WsSHVsCGUryEWsSHVsCGUryER7F+R7F+Qqt8Qqt8Qqt8Qqt8R7F+TbaBR7F+U72EWsSHVL2EWsSHVL2ER7F+R7F+R7F+R7F+R7F+R7F+R7F+Qqt8Qqt8R7F+R7F+Qqt8R7F+Qqt8R7F+R7F+Qqt8R7F+Qqt8R7F+WsSHR7F+R7F+VL2EVL2EWsSHR7F+U72ETbaBR7F+R7F+O6V5R7F+O6V5R7F+O6V5O6V5R7F+NZ52OqN4NZ52Pqd6R7F+QKl7R7F+Qap7QKl7Pqd6OqN4NZ52NZ52NZ52R7F+R7F+Qqt8NZ52Qqt8OqN4Pqd6QKl7Qap7R7F+QKl7O6V5Pqd6O6V5OqN4NZ52NZ52NZ52NZ52NZ52NZ52NZ52NZ52NZ52NZ52NZ52NZ52KZJwKZJwKZJwKZJwNZ52NZ52R7F+TbaBR7F+TbaBU72ETbaBU72ETbaBNZ52NZ52O6V5OqN4Pqd6O6V5QKl7R7F+Qap7QKl7Pqd6Qqt8OqN4NZ52Qqt8NZ52R7F+R7F+R7F+NZ52NZ52OqN4Pqd6QKl7Qap7QKl7R7F+Pqd6OqN4NZ52NZ52NZ52Mpx0NZ52NZ52NZ52Mpx0NZ52NZ52Mpx0NZ52NZ52NZ52Mpx0NZ52NZ52NZ52R7F+Qqt8R7F+R7F+R7F+NZ52Qqt8NZ52NZ52NZ52WsSHWsSHWsSHWsSHWsSHWsSHWsSHWsSHWsSHWsSHULqDULqDULqDULqDWsSHWsSHIIlrM5x1IIlrULqDM5x1ULqDULqDM5x1ULqDIIlrIIlrM5x14eHs4eHs5ubv5ubv4eHs4eHs5ubv5ubvwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj70zY9+mc/0zY9+mc/0zY9+mc/0zY9+mc/1Oz/+v3/1Oz/+v3/+v3/1Oz/+v3/1Oz/1Oz/1Oz/9fv/9fv//8Yb/8Yb/+VN/+VN/8Yb/+VN/8Yb/+VN/8Yb/8Yb/+VN/+VN/+VN/8Yb/+VN/8Yb",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcABwAGAAgACAAGAAkACAAJAAoACgAJAAsACgALAAwACgAMAA0ADQAMAA4ADQAOAA8ADQAPABAAEAAPABEAEAARABIAEgARABMAEgATABQAEgAUABUAFQAUABYAFQAWABcAFwAWABgAFwAYABkAGQAYABoAGQAaABsAGQAbABwAHAAbAB0AHAAdAB4AHAAeAB8AHAAfACAAHAAgACEAIAAfACIAJQAkACMAJAAlACYAJgAlACcAJgAnACgAJgAoACkAJgApACoAKgApACsAKwApACwAKwAsAC0ALQAsAC4ALgAsAC8ALgAvADAAMAAvADEAMAAxADIAMgAxADMAMgAzADQANAAzADUANQAzADYANQA2ADcANwA2ADgANwA4ADkAOQA4ADoAOgA4ADsAOgA7ADwAPAA7AD0APQA7AD4APgA7AD8APgA/AEAAQwBCAEEAQgBDAEQARABDAEUARQBDAEYARgBDAEcASgBJAEgASQBKAEsASwBKAEwATABKAE0AUABPAE4ATwBQAFEAVABTAFIAUwBUAFUAWABXAFYAVwBYAFkAXABbAFoAWwBcAF0AYABfAF4AXwBgAGEAZABjAGIAYwBkAGUAaABnAGYAZwBoAGkAZwBpAGoAbQBsAGsAbABtAG4AcQBwAG8AcABxAHIAdQB0AHMAdAB1AHYAeQB4AHcAeAB5AHoAfQB8AHsAfAB9AH4AgQCAAH8AgACBAIIAhQCEAIMAhACFAIYAiQCIAIcAiACJAIoAjQCMAIsAjACNAI4AkQCQAI8AkACRAJIAlQCUAJMAlACVAJYAlACWAJcAlACXAJgAmwCaAJkAmgCbAJwAnwCeAJ0AngCfAKAAowCiAKEAogCjAKQApwCmAKUApgCnAKgAqwCqAKkAqgCrAKwArwCuAK0ArgCvALAAswCyALEAsgCzALQAtwC2ALUAtgC3ALgAuwC6ALkAugC7ALwAvAC7AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAxwDJAMoAzQDMAMsAzADNAM4AzgDNAM8A0gDRANAA0QDSANMA1gDVANQA1QDWANcA2gDZANgA2QDaANsA2wDaANwA3wDeAN0A3gDfAOAA4ADfAOEA5ADjAOIA4wDkAOUA6ADnAOYA5wDoAOkA7ADrAOoA6wDsAO0A8ADvAO4A7wDwAPEA9ADzAPIA8wD0APUA+AD3APYA9wD4APkA/AD7APoA+wD8AP0A+wD9AP4AAQEAAf8AAAEBAQIBBQEEAQMBBAEFAQYBBAEGAQcBCgEJAQgBCQEKAQsBDgENAQwBDQEOAQ8BDwEOARABDwEQAREBFAETARIBEwEUARUBFQEWARMBFQEUARcBFwEUARgBGQEWARUBGQEaARYBGwEaARkBHAEaARsBGgEcAR0BIAEfAR4BHwEgASEBJAEjASIBIwEkASUBKAEnASYBJwEoASkBJwEpASoBJwEqASsBJwErASwBLwEuAS0BLgEvATABMwEyATEBMgEzATQBNwE2ATUBOAE2ATcBOAE3ATkBOgE2ATgBOwE2AToBPAE2ATsBPAE9ATYBPgE9ATwBPwE9AT4BPwFAAT0BQQFAAT8BQQFCAUABQwFCAUEBRAFCAUMBRAFFAUIBRgFFAUQBRgFHAUUBSAFHAUYBSAFJAUcBSgFJAUgBSwFJAUoBSwFMAUkBTQFMAUsBTgFMAU0BTAFOAU8BUAFPAU4BUAFRAU8BUgFRAVABUQFSAVMBVgFVAVQBVQFWAVcBWgFZAVgBWQFaAVsBXgFdAVwBXQFeAV8BXwFgAV0BXwFeAWEBYQFeAWIBYwFgAV8BYwFkAWABYwFlAWQBZgFlAWMBZgFnAWUBaAFnAWYBaAFpAWcBagFpAWgBagFrAWkBagFsAWsBbQFsAWoBbQFuAWwBbwFuAW0BbwFwAW4BbwFxAXABcgFxAW8BcgFzAXEBcgF0AXMBdQF0AXIBdgF0AXUBdwF0AXYBeAF0AXcBdAF4AXkBfAF7AXoBewF8AX0BgAF/AX4BfwGAAYEBhAGDAYIBgwGEAYUBhQGEAYYBhgGEAYcBhgGHAYgBiAGHAYkBiQGHAYoBigGHAYsBjgGNAYwBjQGOAY8BjQGPAZABjQGQAZEBjQGRAZIBkgGRAZMBkgGTAZQBkgGUAZUBmAGXAZYBlwGYAZkBnAGbAZoBmwGcAZ0BoAGfAZ4BnwGgAaEBpAGjAaIBowGkAaUBqAGnAaYBpwGoAakBrAGrAaoBqwGsAa0BqwGtAa4BqwGuAa8BqwGvAbABsAGvAbEBsQGvAbIBsgGvAbMBsgGzAbQBsAGxAbUBtgG1AbEBtwGwAbUBuAGwAbcBuQGwAbgBugG1AbYBtQG6AbsBuwG6AbwBtgG9AboBvQG2Ab4BvQG+Ab8BwAGwAbkBwQGwAcABsAHBAcIBuQHDAcABuQHEAcMBxAG5AcUByAHHAcYBxwHIAckBzAHLAcoBywHMAc0B0AHPAc4BzwHQAdEB1AHTAdIB0wHUAdUB2AHXAdYB2AHZAdcB2gHZAdgB2wHZAdoB3AHZAdsB2QHcAd0B3gHdAdwB3gHfAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB4wHlAeYB5gHlAecB5wHlAegB5wHoAekB5wHpAeoB6gHpAesB7gHtAewB7QHuAe8B8gHxAfAB8QHyAfMB9gH1AfQB9QH2AfcB+gH5AfgB+QH6AfsB/gH9AfwB/QH+Af8BAgIBAgACAQICAgMCBgIFAgQCBQIGAgcCCgIJAggCCQIKAgsCDgINAgwCDQIOAg8CEgIRAhACEQISAhMCEwISAhQCEwIUAhUCFQIUAhYCFQIWAhcCGgIZAhgCGQIaAhsCHgIdAhwCHQIeAh8CIgIhAiACIQIiAiMCJgIlAiQCJQImAicCKgIpAigCKQIqAisCLgItAiwCLQIuAi8CMgIxAjACMQIyAjMCNgI1AjQCNQI2AjcCOgI5AjgCOQI6AjsCOwI6AjwCOwI8Aj0CPQI8Aj4CPQI+Aj8CQgJBAkACQQJCAkMCRgJFAkQCRQJGAkcCSgJJAkgCSQJKAksCTgJNAkwCTQJOAk8CUgJRAlACVQJUAlMCWAJXAlYCVwJYAlkCXAJbAloCWwJcAl0CYAJfAl4CXwJgAmECZAJjAmICYwJkAmUCaAJnAmYCZwJoAmkCbAJrAmoCawJsAm0CcAJvAm4CbwJwAnECdAJzAnICcwJ0AnUCeAJ3AnYCdwJ4AnkCfAJ7AnoCewJ8An0CgAJ/An4CfwKAAoEChAKDAoICgwKEAoUCiAKHAoYChwKIAokCjAKLAooCiwKMAo0CkAKPAo4CjwKQApEClAKTApICkwKUApUCmAKXApYClwKYApkCnAKbApoCmwKcAp0CoAKfAp4CnwKgAqECpAKjAqICowKkAqUCqAKnAqYCpwKoAqkCrAKrAqoCqwKsAq0CsAKvAq4CrwKwArECtAKzArICswK0ArUCuAK3ArYCtwK4ArkCvAK7AroCuwK8Ar0CwAK/Ar4CvwLAAsECxALDAsICwwLEAsUCyALHAsYCxwLIAskCzALLAsoCywLMAs0CzQLMAs4CzgLMAs8CzwLMAtAC0ALMAtEC0QLMAtIC0gLMAtMC0wLMAtQC1ALMAtUC1QLMAtYC1gLMAtcC1wLMAtgC2wLaAtkC2gLbAtwC3ALbAt0C3ALdAt4C3ALeAt8C3ALfAuAC3ALgAuEC3ALhAuIC3ALiAuMC3ALjAuQC3ALkAuUC3ALlAuYC3ALmAucC6gLpAugC6QLqAusC7gLtAuwC7QLuAu8C8gLxAvAC8QLyAvMC9gL1AvQC9QL2AvcC+gL5AvgC+QL6AvsC/gL9AvwC/QL+Av8CAgMBAwADAQMCAwMDBgMFAwQDBQMGAwcDCgMJAwgDCQMKAwsDDgMNAwwDDQMOAw8DEgMRAxADEQMSAxMDFgMVAxQDFQMWAxcDGgMZAxgDGQMaAxsDHgMdAxwDHQMeAx8DIgMhAyADIQMiAyMDJgMlAyQDJQMmAycDKgMpAygDKQMqAysDLgMtAywDLQMuAy8DMgMxAzADMQMyAzMDNgM1AzQDNQM2AzcDNwM2AzgDOAM2AzkDOQM2AzoDOgM2AzsDOwM2AzwDPAM2Az0DPQM2Az4DPgM2Az8DPwM2A0ADQAM2A0EDQQM2A0IDRQNEA0MDRANFA0YDSQNIA0cDSANJA0oDTQNMA0sDTANNA04DUQNQA08DUANRA1IDVQNUA1MDVANVA1YDWQNYA1cDWANZA1oDXQNcA1sDXANdA14DXgNdA18DXgNfA2ADXgNgA2EDXgNhA2IDXgNiA2MDXgNjA2QDXgNkA2UDXgNlA2YDXgNmA2cDXgNnA2gDXgNoA2kDbANrA2oDawNsA20DcANvA24DbwNwA3EDKwUqBSkFKgUrBSwFLwUuBS0FLgUvBTAFMwUyBTEFMgUzBTQFNwU2BTUFNgU3BTgFOwU6BTkFOgU7BTwFOgU8BT0FPAU7BT4FPAU+BT8FPwU+BUAFQAU+BUEFQQU+BUIFRQVEBUMFRAVFBUYFSQVIBUcFSAVJBUoFSgVJBUsFSwVJBUwFSwVMBU0FTQVMBU4FTQVOBU8FTQVPBVAFTQVQBVEFVAVTBVIFUwVUBVUFWAVXBVYFVwVYBVkFXAVbBVoFWwVcBV0FYAVfBV4FXwVgBWEFZAVjBWIFZQVjBWQFZgVjBWUFZwVjBWYFYwVnBWgFaQVoBWcFaQVqBWgFaQVrBWoFawVpBWwFbwVuBW0FbgVvBXAFcAVvBXEFcAVxBXIFcgVxBXMFcwVxBXQFdwV2BXUFdwV4BXYFeQV4BXcFeAV5BXoFegV5BXsFegV7BXwFfAV7BX0FfQV7BX4FfgV7BX8FfwV7BYAFgAV7BYEFgQV7BYIFggV7BYMFggWDBYQFggWEBYUFggWFBYYFhgWFBYcFhgWHBYgFiAWHBYkFhwWKBYkFhwWLBYoFjAWLBYcFiwWMBY0FjQWMBY4FjQWOBY8FjwWOBZAFjwWQBZEFkQWQBZIFkwWSBZAF3gPgA+ED4APeA90DlgWVBZQFlQWWBZcF2gPZA9cD2QPaA9wDmgWZBZgFmQWaBZsFngWdBZwFnQWeBZ8FogWhBaAFoQWiBaMFpgWlBaQFpwWlBaYFqAWlBacFqAWnBakFqgWlBagFpQWqBasFrgWtBawFrgWvBa0FrgWwBa8FsQWwBa4FsQWyBbAFswWyBbEFswW0BbIFswW1BbQFswW2BbUFtwW2BbMFtwW4BbYFtwW5BbgFugW5BbcFuQW6BbsFvAW7BboFvQW7BbwFvgW7Bb0FvgW/BbsFvgXABb8FvgXBBcAFvgXCBcEFvgXDBcIFvgXEBcMFvgXFBcQFxgXFBb4FxgXHBcUFxgXIBccFxgXJBcgFyQXGBcoFngPLBZwDywWeA8wFywXMBc0FzQXMBc4FzwVyA3QDcgPPBdAF0AXPBdEF0AXRBdIFmQPTBZoD0wWZA9QF0wXUBdUF1QXUBdYF1wV4A3cDeAPXBdgF2AXXBdkF2QXXBdoF3QXcBdsF2wXcBd4F3AXfBd4F3QXgBdwF4QXfBdwF4gXgBd0F4wXfBeEF4AXiBeMF4wXkBd8F5AXjBeIF5wXmBeUF5gXnBegF6wXqBekF6gXrBewF7wXuBe0F7gXvBfAF8wXyBfEF8gXzBfQF9wX2BfUF9gX3BfgF+AX3BfkF+AX5BfoF/QX8BfsF/AX9Bf4F/gX9Bf8F/wX9BQAGAwYCBgEGAgYDBgQGBwYGBgUGBgYHBggGCwYKBgkGCgYLBgwGDAYLBg0GDAYNBg4GDgYNBg8GDgYPBhAGEwYSBhEGEgYTBhQGFAYTBhUGFAYVBhYGFgYVBhcGFgYXBhgGGwYaBhkGGgYbBhwGHwYeBh0GHgYfBiAGIwYiBiEGIgYjBiQGJwYmBiUGJgYnBigGKwYqBikGKgYrBiwGLwYuBi0GLgYvBjAGMwYyBjEGMgYzBjQGNwY2BjUGNgY3BjgGOwY6BjkGOgY7BjwG",verts:1597,tris:760},ruedas:[[-.3,.3,.81],[.3,.3,.81],[-.3,.3,-.81],[.3,.3,-.81]]},suv:{cuerpo:{min:[-.75,.2,-1.2],max:[.75,1.3,1.35],pos:"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3h0BoAGA3h0BoAaFVRWkqwGAVRWkqwaF7m4vulba7m6lyIzVREQvulbaRESlyIzV7m6901DP7m632gzIRES901DPRES32gzI7m5YqSqjRERYqSqj7m4vuiymREQvuiym7m6909NT7m632pBMRES909NTRES32pBM7m4vutle7m6lyBBaREQvutleRESlyBBaEpEBgF/evLsBgF/eEpFHl1/evLtHl1/e7m4Y3UHA7m632nW4REQY3UHARES32nW47m4BgKYmREQBgKYm7m5Hl6YmRERHl6Ym7m6lyBBa7m6909NTRESlyBBaRES909NT7m6907U17m6lyHkvRES907U1RESlyHkv7m690zKx7m6lyPWqRES90zKxRESlyPWq7m632pBM7m4Y3cRERES32pBMREQY3cRE7m632vk87m6907U1RES32vk8RES907U17m4vuiymREQvuiym7m6lyPWqRESlyPWq7m6lyIzV7m6901DPRESlyIzVRES901DP7m5Hl6YmRERHl6Ym7m5Yqa0nRERYqa0n7m5YqVjd7m4vulbaRERYqVjdREQvulba7m5Hl1/e7m5YqVjdRERHl1/eRERYqVjd7m5HlyOiRERHlyOi7m5YqSqjRERYqSqj7m632nW47m690zKxRES32nW4RES90zKx7m5Yqa0nRERYqa0n7m4vuq8qREQvuq8q7m5Hl+Ji7m5YqdthRERHl+JiRERYqdth7m4vuq8qREQvuq8q7m6lyHkvRESlyHkv7m5Yqdth7m4vutleRERYqdthREQvutle7m632gzI7m4Y3UHARES32gzIREQY3UHA7m4Y3cRE7m632vk8REQY3cRERES32vk8EpFHl+JivLtHl+JiEpFYqdthvLtYqdthvLsBgKYmEpEBgKYmvLtHl6YmEpFHl6YmvLsY3cREvLu32vk8EpEY3cREEpG32vk8vLu32vk8vLu907U1EpG32vk8EpG907U1EpEvutlevLsvutleEpGlyBBavLulyBBavLtHl6YmEpFHl6YmvLtYqa0nEpFYqa0nvLsvuq8qEpEvuq8qvLulyHkvEpGlyHkvvLtYqa0nEpFYqa0nvLsvuq8qEpEvuq8qvLu907U1vLulyHkvEpG907U1EpGlyHkvvLulyBBavLu909NTEpGlyBBaEpG909NTvLu32pBMvLsY3cREEpG32pBMEpEY3cREEpFYqdthvLtYqdthEpEvutlevLsvutlevLu909NTvLu32pBMEpG909NTEpG32pBMvLsBgKYmvLtHl6YmvLsBgOJivLtYqa0nvLsvuq8qvLulyHkvvLu907U1vLu32vk8vLsY3cREvLu32pBMvLu909NTvLulyBBavLsvutlevLtYqdthvLtHl+JiRERHl6YmREQBgKYmRERYqa0nREQBgOJiREQvuq8qRESlyHkvRES907U1RES32vk8REQY3cRERES32pBMRES909NTRESlyBBaREQvutleRERYqdthRERHl+JiRERHlyOiREQBgCOiRERYqSqjREQBgF/eREQvuiymRESlyPWqRES90zKxRES32nW4REQY3UHARES32gzIRES901DPRESlyIzVREQvulbaRERYqVjdRERHl1/evLsBgCOivLtHlyOivLsBgF/evLtYqSqjvLsvuiymvLulyPWqvLu90zKxvLu32nW4vLsY3UHAvLu32gzIvLu901DPvLulyIzVvLsvulbavLtYqVjdvLtHl1/eREQBgF/e7m4BgF/eRERHl1/e7m5Hl1/eEpFHl1/evLtHl1/eEpFYqVjdvLtYqVjdvLsY3UHAvLu32nW4EpEY3UHAEpG32nW4vLu32nW4vLu90zKxEpG32nW4EpG90zKxvLsvulbavLulyIzVEpEvulbaEpGlyIzVvLtHlyOiEpFHlyOivLtYqSqjEpFYqSqjvLsvuiymEpEvuiymvLulyPWqEpGlyPWqvLtYqSqjEpFYqSqjvLsvuiymEpEvuiymvLulyIzVvLu901DPEpGlyIzVEpG901DPvLu32gzIvLsY3UHAEpG32gzIEpEY3UHAvLu90zKxvLulyPWqEpG90zKxEpGlyPWqEpFYqVjdvLtYqVjdEpEvulbavLsvulbavLu901DPvLu32gzIEpG901DPEpG32gzI/39d9Pcs3V1d9Pcs/3/oIvcs3V2jC/cs3V3oIvcs/39d9Pcs/39d9O0i3V1d9Pcs3V1d9O0i3V2jC7k5l0yjC7k5JVAtaXEZiUEBV7cfd74BV7cf268taXEZI6KjC7k5abOjC7k53V2jC7k5JVAtaXEZ3V2jC/csz1IBV/USz1IBV2/0JVAtaWrp3V2jC2rp3V2jC2/0I6Jd9PcsI6Jd9O0iAYBd9Pcs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",nor:"AF+sAGe2ACGFAB6FgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAAG5AAFpaAG5AAFpaAHshAG5AAHshAG5AAG7BAHvfAG7BAHvfAHshAG5AAHshAG5AAFqmAG7BAFqmAG7BACGFAECSAB6FAD2RAD1vAE1lAEBuAFpaAFpaAG5AAFpaAG5AAFpaAFqmAG7BAFqmAG7BAG5AAFpaAG5AAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAG5AAFpaAG5AAFpaAH8AAHshAH8AAHshAH8AAHshAH8AAHshACGFAB6FAECSAD2RAG7BAHvfAG7BAHvfiNgAiNgAiNgAiNgAiNgAiNgAiNgAAB57ACF7AD1vAEBuiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAACF7AB57AEBuAD1veNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAACF7AEBuAB57AD1vAFqmAG7BAFqmAG7BAHvfAH8AAHvfAH8AACGFAB6FAECSAD2RABGCABGCACGFAB6FAB57AD1vACF7AEBuAECSAD2RAFqmAE2bAFqmABF+AB57ABF+ACF7AHvfAH8AAHvfAH8AAD1vAE1lAEBuAFpaAFpaAD2RAECSAE2bAFqmAFqmABGCABGCAB6FACGFAHshAG5AAHshAG5AAD1vAEBuAE1lAFpaAFpaAD1vAEBuAE1lAFpaAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAGe2AF+sAB6FACGFAG7BAHvfAG7BAHvfACGFAECSAB6FAD2RABF+ABF+AB57ACF7AD2RAE2bAECSAFqmAFqmAG7BAHvfAG7BAHvfAECSAFqmAD2RAE2bAFqmAHshAG5AAHshAG5AANh4ANh4ANh4ANh4ANh4ANh4AGdKAF9UAB57ACF7AFqmAG7BAFqmAG7BiNgAiNgAiNgAiNgAiNgAiNgAAF9UAGdKACF7AB57ALqWALqWALqWALqWALqWALqWAH8AAH8AAH8AAH8AAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAACBAACBAACBAACBAAB/AAB/AAB/AAB/WgCmWgCmdQDPdQDP5wCDGQCD5wCDGQCDGQCDWgCmGQCDWgCmpgCm5wCDpgCm5wCDAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAiwAxpgBaiwAxpgBa5wB9pgBa5wB9pgBadQAxdQAxWgBaWgBaGQB95wB9GQB95wB9AIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAGdKAH8AAF9UAH8AAH8AAH8AAH8AAH8AAGdKAH8AAH8AAF9UWgBaGQB9WgBaGQB9AH8AAH8AAF+sAH8AAGe2AH8AAH8AAH8AAGe2AH8AAF+sAH8ApgCmpgCmiwDPiwDPAH8AAHUxAH8AAHUxAHUxADF1AHUxADF1AAB/AAB/ADF1ADF1AHshAHshAGa1AGa1gxkAgxkAgxkAgxkAgxkAgxkAgxkAAIEAAIEAAIEAAIEAfRkAfRkAfRkAfRkAfRkAfRkAfRkAAG89AG89AHshAHshAC+KAC+KAC+KAGa1AC+KAC+KAGa1AC+KMYsAdc8AMYsAdc8Az4sAMYsAz4sAMYsAi88Az4sAi88Az4sAMXUAMXUAdTEAdTEAdc8AdTEAdc8AdTEAAACBAACBAACBAACBAACBAACBAACBAACBz3UAz3UAMXUAMXUAizEAi88AizEAi88AizEAizEAz3UAz3UAz4sAi88Az4sAi88AMYsAz4sAMYsAz4sAdc8AMYsAdc8AMYsAz3UAz3UAizEAizEAi88AizEAi88AizEAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/MXUAMXUAz3UAz3UAdTEAdc8AdTEAdc8AdTEAdTEAMXUAMXUAAMGSAKamAMGSAKamAJLBAIXfAJLBAIXfAN97AN97AMFuAMFuAJLBAIXfAJLBAIXfAMGSAKamAMGSAKamAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAAB/AAB/APh/APh/AKamAJLBAKamAJLBAJJAAKZaAJJAAKZaAJJAAKZaAJJAAKZaAIXfAIEAAIXfAIEAAIUhAJJAAIUhAJJAAMFuAMFuAKZaAKZaAKamAJLBAKamAJLBAPh/APh/AN97AN97AN+FAMGSAN+FAMGSAPiBAN+FAPiBAN+FAO9+AO9+AN97AN97AIUhAJJAAIUhAJJAAN97AN97AMFuAMFuAO+CAN+FAO+CAN+FAMFuAMFuAKZaAKZaAN+FAMGSAN+FAMGSAIXfAIEAAIXfAIEAAIEAAIUhAIEAAIUhAO+CAO+CAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAMGSAKamAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAJJAAKZaAJJAAKZaAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAACBAACBAPiBAPiBAPiBAPiBAN+FAN+FAIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAKamAMGSAKamAO9+AO9+AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAJJAAKZaAJJAAKZaAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfAAB/AAB/AAB/AAB/AAB/AIEAAIEAAIEAAIEAAE9jAE9jAE9jAE9jAE9jAE9jAE9jAE9jfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAAIEAAIEAAIEAAIEAAAB/AAB/AAB/AAB/AAB/gQAAploAgQAAploAWloAfwAAWloAfwAAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAWloAWloAAH8AAH8AgQAAgQAAgQAAgQAAAH8AAH8AploAploAfwAAfwAAfwAAfwAAAACBAACBAACBAACBAACBAACBAACBAACBAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/gxkAgxkAgxkAgxkAgxkAAC+KAC+KAC+KAC+KAE9jAE9jAE9jAE9jfRkAfRkAfRkAfRkAfRkAAACBAACBAACBAACBAACBAACBAACBAACB",col:"a2yBa2yBa2yBa2yBaGl+a2yBaGl+a2yBa2yBbW+EcHKHamuAbG6DcnSJbnCFb3GGc3WKcHKHc3aLcXOIcHKHc3WKb3GGcnSJbnCFcHKHbG6DamuAbW+EaGl+ZWV6aGl+a2yBZWV6aGl+a2yBbW+EaGl+cHKHamuAbG6DcnSJbnCFb3GGc3WKcHKHc3aLcXOIcHKHc3WKb3GGcnSJbnCFcHKHbG6DamuAbW+EaGl+a2yBa2yBaGl+a2yBa2yBbW+Ea2yBaGl+aGl+a2yBamuAcHKHbG6DbnCFcnSJb3GGc3WKcHKHcXOIc3aLcHKHc3WKb3GGcnSJbnCFbG6DcHKHamuAaGl+bW+EZWV6a2yBaGl+aGl+ZWV6bW+Ea2yBaGl+amuAcHKHbG6DbnCFcnSJb3GGc3WKcHKHcXOIc3aLcHKHc3WKb3GGcnSJbnCFbG6DcHKHamuAaGl+bW+Ea2yBa2yBaGl+a2yBbm+EbW+Ebm+Ea2yBa2yBa2yBbm+Ea2yBbm+Ea2yBa2yBbW+Ebm+EcnSJcHKHcnSJcHKHc3WKcnSJc3WKcnSJcnSJc3WKcnSJc3WKc3WKcnSJc3WKcnSJcHKHcnSJcHKHcnSJa2yBbW+Ea2yBbW+EbW+Ebm+EbW+EcHKHcHKHcnSJcHKHcnSJcHKHcHKHcnSJcHKHcnSJcnSJcHKHcnSJcHKHc3WKc3aLc3WKc3aLc3aLc3WKc3aLc3WKcnSJcHKHcnSJcHKHc3aLc3WKc3aLc3WKc3aLc3WKc3aLc3WKa2yBa2yBbW+EbW+EcnSJc3WKcnSJc3WKbm+Ebm+Ea2yBa2yBa2yBbW+Ebm+Ea2yBa2yBbW+EbW+Ebm+Ebm+EbW+Ea2yBaGl+bW+Ea2yBaGl+a2yBa2yBbW+EbW+Ebm+EbW+Ebm+Ea2yBaGl+bW+Ea2yBaGl+a2yBbW+Ea2yBbW+EcHKHcnSJcHKHcnSJc3WKc3aLc3WKc3aLa2yBa2yBbW+EbW+EaGl+aGl+a2yBa2yBa2yBbW+Ea2yBbW+EbW+EbW+EcHKHbm+EcHKHaGl+a2yBaGl+a2yBc3WKc3aLc3WKc3aLbW+Ebm+EbW+EcHKHcHKHbW+EbW+Ebm+EcHKHcHKHaGl+aGl+a2yBa2yBc3WKcnSJc3WKcnSJbW+EbW+Ebm+EcHKHcHKHbW+EbW+Ebm+EcHKHcHKHc3WKc3aLc3WKc3aLc3aLc3WKc3aLc3WKa2yBa2yBa2yBa2yBcnSJc3WKcnSJc3WKa2yBbW+Ea2yBbW+EaGl+aGl+a2yBa2yBbW+Ebm+EbW+EcHKHcHKHcnSJc3WKcnSJc3WKbW+EcHKHbW+Ebm+EcHKHc3WKcnSJc3WKcnSJa2yBa2yBbm+Ebm+Ebm+Ebm+Ea2yBa2yBa2yBa2yBcHKHcnSJcHKHcnSJbm+Ebm+EbW+Ea2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBbm+Ebm+Ebm+Ebm+Ebm+Ebm+Ebm+Ebm+EZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6aGl+aGl+ZWV6ZWV6aGl+aGl+a2yBaGl+a2yBaGl+aGl+aGl+a2yBa2yBaGl+aGl+a2yBa2yBaGl+aGl+a2yBa2yBaGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+a2yBa2yBaGl+aGl+aGl+aGl+a2yBa2yBa2yBaGl+a2yBaGl+aGl+aGl+a2yBa2yBaGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+aGl+a2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBaGl+aGl+a2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBa2yBaGl+a2yBaGl+a2yBgoedgoedgoedgoedgoedfYGXgoedfYGXZWV6ZWV6fYGXfYGXgoedgoedgoedgoedZWV6goedZWV6fYCWgoedfYCWfYCWfYCWfYCWfYCWfYCWfYCWgoedfYCWfYCWgoedZWV6ZWV6fYCWfYCWgoedgoedZWV6c3aLZWV6goedc3aLfYGWgoedfYGWZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedOjo/OztAOjo/OztAOztBPDxCOztBPDxCODg+ODg+Ojo/Ojo/OztBPDxCOztBPDxCOjo/OztAOjo/OztANjY6NjY6Nzc8Nzc8PDxCPDxCPDxCPDxCNjY6NjY6Nzc8Nzc8OztAOztBOztAOztBOztBOztAOztBOztAOztBOztAOztBOztAPDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/Ojo/OztAOztAOztAOztBOztAOztBNzc8Nzc8ODg+ODg+ODg+Ojo/ODg+Ojo/Nzc8ODg+Nzc8ODg+Nzc8Nzc8ODg+ODg+PDxCOztBPDxCOztBODg+ODg+Ojo/Ojo/Nzc8ODg+Nzc8ODg+Ojo/Ojo/OztAOztAODg+Ojo/ODg+Ojo/PDxCPDxCPDxCPDxCPDxCPDxCPDxCPDxCNzc8Nzc8ODg+ODg+NjY6NjY6Nzc8Nzc8PDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/Ojo/OztAOztANzc8Nzc8ODg+ODg+Ojo/Ojo/OztAOztAODg+ODg+Ojo/Ojo/OztBOztAOztBOztAOztAOztBOztAOztBPDxCPDxCPDxCPDxCODg+ODg+Ojo/Ojo/OztBPDxCOztBPDxCNjY6Nzc8NjY6ODg+Ojo/OztAOztBPDxCPDxCPDxCOztBOztAOjo/ODg+Nzc8Nzc8NjY6ODg+NjY6Ojo/OztAOztBPDxCPDxCPDxCOztBOztAOjo/ODg+Nzc8Nzc8NjY6ODg+NjY6Ojo/OztAOztBPDxCPDxCPDxCOztBOztAOjo/ODg+Nzc8NjY6Nzc8NjY6ODg+Ojo/OztAOztBPDxCPDxCPDxCOztBOztAOjo/ODg+Nzc8NjY6NjY6Nzc8Nzc8Nzc8Nzc8ODg+ODg+PDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOjo/OztAOjo/OztANzc8Nzc8ODg+ODg+Ojo/Ojo/OztAOztAODg+ODg+Ojo/Ojo/OztAOztBOztAOztBPDxCPDxCPDxCPDxCOztBOztAOztBOztAODg+ODg+Ojo/Ojo/OztBPDxCOztBPDxCPaZ5PaZ5SLJ/Q6x8SLJ/PaZ5PaZ5PaZ5PaZ5Q6x8Q6x8WsSHVb+FVb+FWsSHQ6x8Q6x8Q6x8WsSHQ6x8Vb+FVb+FWsSHQ6x8Q6x8PaZ5PaZ5PaZ5PaZ5PaZ5PaZ5Q6x8SLJ/SLJ/PaZ5SLJ/PaZ5SLJ/SLJ/PaZ5SLJ/PaZ5Q6x8WsSHQ6x8Vb+FWsSHVb+FQ6x8Q6x8SLJ/SLJ/SLJ/SLJ/Q6x8SLJ/Q6x8SLJ/SLJ/SLJ/SLJ/SLJ/SLJ/Q6x8SLJ/Q6x8PaZ5PaZ5Q6x8PaZ5PaZ5Q6x8MZp0MZp0Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8Q6x8MZp0PaZ5MZp0Q6x8OaJ4Np92MZp0O6V5Q6x8PKV5O6V5OaJ4Np92MZp0MZp0Q6x8PaZ5Q6x8PaZ5Np92OaJ4Q6x8Q6x8O6V5Q6x8PKV5O6V5OaJ4Np92MZp0MZp0Q6x8QKl7Q6x8MZp0MZp0MZp0QKl7MZp0Q6x8Q6x8Q6x8Q6x8PaZ5Q6x8OaJ4O6V5Np92Q6x8MZp0PKV5O6V5OaJ4Np92MZp0MZp0PaZ5Q6x8Q6x8Q6x8MZp0Np92OaJ4O6V5PKV5O6V5PaZ5Q6x8MZp0OaJ4MZp0Np92MZp0P6l7P6h6Q6x8Pqh6PaZ5O6V5OqN4QKl7Q6x8P6l7OaJ3MZp0P6h6N6B2Pqh6Np92PaZ5NZ51O6V5OqN4OaJ3NJ11NJ11NJ11MZp0N6B2NZ51Np92P6l7P6h6Q6x8Pqh6PaZ5O6V5OqN4QKl7Q6x8P6l7OaJ3MZp0P6h6N6B2Pqh6Np92PaZ5NZ51O6V5OqN4OaJ3NJ11NJ11NJ11MZp0N6B2NZ51Np923Nzp3Nzp4uLt6Ojw6Ojw3Nzp3Nzp6Ojw4uLt6Ojwx8fbx8fbx8fbx8fbx8fbx8fbx8fbx8fbwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7/8Yb/8Yc/8Yc/8ge/8ge/8oi/8oi/84n/84n/9Et/9Et/9U0/9U0/9k6/9k6/91A/91A/+BF/+BF/+NJ/+NJ/+RM/+RM/+VN/8Yb/8Yc/8Yc/8ge/8ge/8oi/8oi/84n/84n/9Et/9Et/9U0/9U0/9k6/9k6/91A/91A/+BF/+BF/+NJ/+NJ/+RM/+RM/+VN1Oz/8/r/1Oz/8/r/1Oz/7Pf/7Pf/+v3/+v3/1Oz/1Oz/8/r/8/r/8/r/1Oz/8/r/1Oz/1Oz/0zY90zY9+mc/+mc/0zY90zY9+mc/+mc/",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcABwAGAAgACAAGAAkACQAGAAoACgAGAAsACgALAAwACgAMAA0ADQAMAA4ADQAOAA8ADQAPABAAEAAPABEAEAARABIAEgARABMAEgATABQAEgAUABUAFQAUABYAFQAWABcAFwAWABgAFwAYABkAGQAYABoAGQAaABsAGQAbABwAHAAbAB0AHAAdAB4AHAAeAB8AHAAfACAAHwAeACEAHwAhACIAIgAhACMAIwAhACQAJAAhACUAJAAlACYAJgAlACcAJgAnACgAJgAoACkAKQAoACoAKQAqACsAKQArACwALAArAC0ALAAtAC4ALgAtAC8ALgAvADAALgAwADEAMQAwADIAMQAyADMAMwAyADQAMwA0ADUANQA0ADYANQA2ADcANQA3ADgAOAA3ADkAOAA5ADoAOAA6ADsAOgA5ADwAOgA8AD0AQAA/AD4AQQA/AEAAQQBAAEIAQgBAAEMARAA/AEEARABFAD8ARgBFAEQARwBFAEYARwBIAEUASQBIAEcASQBKAEgASwBKAEkATABKAEsATABNAEoATgBNAEwATgBPAE0AUABPAE4AUABRAE8AUgBRAFAAUwBRAFIAUwBUAFEAVQBUAFMAVgBUAFUAVABWAFcAWABXAFYAWABZAFcAWABaAFkAWABbAFoAXABbAFgAXABdAFsAWwBdAF4AXwBdAFwAYABdAF8AYABhAF0AYgBhAGAAYwBhAGIAYwBkAGEAZQBkAGMAZQBmAGQAZwBmAGUAaABmAGcAaABpAGYAagBpAGgAagBrAGkAbABrAGoAbABtAGsAbgBtAGwAbwBtAG4AbwBwAG0AcQBwAG8AcgBwAHEAcgBzAHAAcgB0AHMAcgB1AHQAdgB1AHIAdQB2AHcAegB5AHgAeQB6AHsAewB6AHwAfAB6AH0AgAB/AH4AfwCAAIEAgQCAAIIAggCAAIMAgwCAAIQAhwCGAIUAhgCHAIgAiwCKAIkAigCLAIwAjwCOAI0AjgCPAJAAkwCSAJEAkgCTAJQAlwCWAJUAlgCXAJgAmwCaAJkAmgCbAJwAnwCeAJ0AngCfAKAAngCgAKEApACjAKIAowCkAKUAqACnAKYApwCoAKkArACrAKoAqwCsAK0AsACvAK4ArwCwALEAtACzALIAswC0ALUAuAC3ALYAtwC4ALkAvAC7ALoAuwC8AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAzADLAMoAywDMAM0AywDNAM4AywDOAM8AywDPANAA0wDSANEA0gDTANQA1wDWANUA1gDXANgA1gDYANkA1gDZANoA2gDZANsA2wDZANwA3wDeAN0A3gDfAOAA4wDiAOEA4gDjAOQA5ADjAOUA5QDjAOYA5QDmAOcA5QDnAOgA6wDqAOkA6gDrAOwA7wDuAO0A7gDvAPAA8wDyAPEA8gDzAPQA9wD2APUA9gD3APgA+wD6APkA+gD7APwA/wD+AP0A/gD/AAABAwECAQEBAgEDAQQBBAEDAQUBCAEHAQYBBwEIAQkBDAELAQoBCwEMAQ0BEAEPAQ4BDwEQAREBDwERARIBFQEUARMBFAEVARYBFgEVARcBGgEZARgBGQEaARsBHgEdARwBHQEeAR8BIgEhASABIQEiASMBIwEiASQBJwEmASUBJgEnASgBKAEnASkBLAErASoBKwEsAS0BMAEvAS4BLwEwATEBNAEzATIBMwE0ATUBOAE3ATYBNwE4ATkBPAE7AToBOwE8AT0BQAE/AT4BPwFAAUEBRAFDAUIBQwFEAUUBQwFFAUYBSQFIAUcBSAFJAUoBTQFMAUsBTAFNAU4BTAFOAU8BUgFRAVABUQFSAVMBVgFVAVQBVQFWAVcBVwFWAVgBVwFYAVkBXAFbAVoBWwFcAV0BYAFfAV4BXwFgAWEBZAFjAWIBYwFkAWUBYwFlAWYBYwFmAWcBagFpAWgBaQFqAWsBbgFtAWwBbQFuAW8BbwFuAXABbwFwAXEBdAFzAXIBcwF0AXUBeAF3AXYBdwF4AXkBeQF4AXoBeQF6AXsBewF6AXwBfQF3AXkBfgF3AX0BfwF3AX4BfwGAAXcBgAF/AYEBhAGDAYIBgwGEAYUBiAGHAYYBhwGIAYkBjAGLAYoBiwGMAY0BkAGPAY4BjwGQAZEBlAGTAZIBkwGUAZUBmAGXAZYBlwGYAZkBnAGbAZoBmwGcAZ0BmwGdAZ4BngGdAZ8BnwGdAaABnwGgAaEBnwGhAaIBogGhAaMBpgGlAaQBpQGmAacBqgGpAagBqQGqAasBrgGtAawBrQGuAa8BsgGxAbABsQGyAbMBtgG1AbQBtQG2AbcBtQG3AbgBtQG4AbkBtQG5AboBugG5AbsBuwG5AbwBuwG8Ab0BwAG/Ab4BvwHAAcEBwQHCAb8BwQHAAcMBwwHAAcQBxQHCAcEBxQHGAcIBxwHGAcUByAHGAccBxgHIAckBzAHLAcoBywHMAc0B0AHPAc4B0AHRAc8B0gHRAdAB0wHRAdIB1AHRAdMB0QHUAdUB1gHVAdQB1gHXAdUB2AHXAdYB1wHYAdkB3AHbAdoB2wHcAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB6AHnAeYB5wHoAekB7AHrAeoB6wHsAe0B8AHvAe4B7wHwAfEB7wHxAfIB8gHxAfMB8gHzAfQB9wH2AfUB9gH3AfgB+wH6AfkB/AH6AfsB+gH8Af0B/gH9AfwB/QH+Af8BAgIBAgACAQICAgMCBgIFAgQCBQIGAgcCCAIEAgUCBQIHAgkCBAIIAgoCCQIHAgsCCgIIAgsCCgILAgcCDgINAgwCDQIOAg8CEgIRAhACEQISAhMCFgIVAhQCFQIWAhcCGgIZAhgCGQIaAhsCHgIdAhwCHQIeAh8CIgIhAiACIQIiAiMCIwIiAiQCIwIkAiUCJQIkAiYCJQImAicCKgIpAigCKQIqAisCLgItAiwCLQIuAi8CMgIxAjACMQIyAjMCNgI1AjQCNQI2AjcCOgI5AjgCOQI6AjsCPgI9AjwCPQI+Aj8CQgJBAkACQQJCAkMCRgJFAkQCRQJGAkcCSgJJAkgCSQJKAksCSwJKAkwCSwJMAk0CTQJMAk4CTQJOAk8CUgJRAlACUQJSAlMCVgJVAlQCVQJWAlcCWgJZAlgCWQJaAlsCXgJdAlwCXQJeAl8CYgJhAmACYQJiAmMCZgJlAmQCZQJmAmcCagJpAmgCaQJqAmsCbgJtAmwCbQJuAm8CcgJxAnACcQJyAnMCdgJ1AnQCdQJ2AncCegJ5AngCeQJ6AnsCfgJ9AnwCfQJ+An8CggKBAoACgQKCAoMChgKFAoQChQKGAocCigKJAogCiQKKAosCjgKNAowCjQKOAo8CkgKRApACkQKSApMClgKVApQClQKWApcCmgKZApgCmQKaApsCngKdApwCnQKeAp8CogKhAqACoQKiAqMCpgKlAqQCpQKmAqcCqgKpAqgCqQKqAqsCrgKtAqwCrQKuAq8CsgKxArACsQKyArMCtgK1ArQCtQK2ArcCugK5ArgCuQK6ArsCvgK9ArwCvQK+Ar8CwgLBAsACwQLCAsMCxgLFAsQCxQLGAscCygLJAsgCyQLKAssCzgLNAswCzQLOAs8C0gLRAtAC0QLSAtMC1gLVAtQC1QLWAtcC2gLZAtgC2QLaAtsC3gLdAtwC3QLeAt8C4gLhAuAC4QLiAuMC5gLlAuQC5QLmAucC6gLpAugC6QLqAusC7gLtAuwC7QLuAu8C8gLxAvAC8QLyAvMC9gL1AvQC9QL2AvcC+gL5AvgC+QL6AvsC+wL6AvwC/AL6Av0C/QL6Av4C/gL6Av8C/wL6AgADAAP6AgEDAQP6AgIDAgP6AgMDAwP6AgQDBAP6AgUDBQP6AgYDCQMIAwcDCAMJAwoDCgMJAwsDCgMLAwwDCgMMAw0DCgMNAw4DCgMOAw8DCgMPAxADCgMQAxEDCgMRAxIDCgMSAxMDCgMTAxQDCgMUAxUDGAMXAxYDFwMYAxkDGQMYAxoDGQMaAxsDGQMbAxwDGQMcAx0DGQMdAx4DGQMeAx8DGQMfAyADGQMgAyEDGQMhAyIDGQMiAyMDGQMjAyQDJwMmAyUDJgMnAygDKAMnAykDKQMnAyoDKgMnAysDKwMnAywDLAMnAy0DLQMnAy4DLgMnAy8DLwMnAzADMAMnAzEDMQMnAzIDMgMnAzMDNgM1AzQDNQM2AzcDOgM5AzgDOQM6AzsDPgM9AzwDPQM+Az8DQgNBA0ADQQNCA0MDRgNFA0QDRQNGA0cDSgNJA0gDSQNKA0sDTgNNA0wDTQNOA08DUgNRA1ADUQNSA1MDVgNVA1QDVQNWA1cDWgNZA1gDWQNaA1sDXgNdA1wDXQNeA18DYgNhA2ADYQNiA2MDZgNlA2QDZQNmA2cDagNpA2gDaQNqA2sDawNqA2wDbwNuA20DbgNvA3ADcwNyA3EDcgNzA3QDdANzA3UDdgN1A3MDdwN1A3YDdQN3A3gDewN6A3kDfAN6A3sDfQN6A3wDfQN+A3oDfgN9A38DgAN/A30DgwOCA4EDggODA4QDhwOGA4UDhgOHA4gDiAOHA4kDjAOLA4oDiwOMA40DkAOPA44DjwOQA5EDlAOTA5IDkwOUA5UDkwOVA5YDlgOVA5cDlgOXA5gDlgOYA5kDnAObA5oDmwOcA50DoAOfA54DnwOgA6EDpAOjA6IDowOkA6UDqAOnA6YDpwOoA6kDrAOrA6oDqwOsA60DrQOsA64DrgOsA68DsAOrA60DqwOwA7EDtAOzA7IDtQOzA7QDtgOzA7UDtwOzA7YDuAOzA7cDswO4A7kDugO5A7gDugO4A7sDugO7A7wDvQO5A7oDuQO9A74DwQPAA78DwAPBA8IDwgPBA8MDwwPBA8QDxAPBA8UDwgPDA8YDwgPGA8cDxwPGA8gDxwPIA8kDxwPJA8oDxwPKA8sDxwPLA8wDxwPMA80DxwPNA84DzgPNA88D0APOA88DzwPNA9ED0QPNA9ID0QPSA9MD0QPTA9QD1APTA9UD1QPTA9YD1QPWA9cD1wPWA9gD1wPYA9kD1wPZA9oD1wPaA9sD1wPbA9wD1wPcA90D4APfA94D3wPgA+ED4QPgA+ID5QPkA+MD5APlA+YD5gPlA+cD5gPoA+QD6wPqA+kD6gPrA+wD7APrA+0D7gPqA+wD7QPrA+8D8APqA+4D7QPvA/ED8QPvA/ID8gPvA/MD8wPvA/QD9APvA/UD9QPvA/YD8AP3A+oD8AP4A/cD9wP4A/kD8AP6A/gD+wP6A/AD/AP6A/sD/QP6A/wD/gP6A/0D/wP6A/4DAAT6A/8DAQT6AwAE+gMBBAIEAQQABAMEAwQABAQEAwQEBAUEBQQEBAYEBQQGBAcECgQJBAgECgQLBAkECgQMBAsECgQNBAwECgQOBA0ECgQIBA8ECgQPBBAEEQQQBA8ECgQSBA4EEwQSBAoEFAQQBBEEEgQTBBUEFgQQBBQEFQQTBBcEGAQQBBYEFwQTBBkEGgQQBBgEGwQQBBoEHAQQBBsEGQQTBB0EHQQTBB4EEwQfBB4EHAQgBBAEIAQfBBMEIQQgBBwEHwQgBCIEIwQgBCEEIgQgBCMEJgQlBCQEJgQnBCUEJgQoBCcEJgQpBCgEJgQqBCkEJgQkBCsEJgQrBCwELQQsBCsEJgQuBCoELwQuBCYEMAQsBC0ELgQvBDEEMgQsBDAEMQQvBDMENAQsBDIEMwQvBDUENgQsBDQENwQsBDYEOAQsBDcENQQvBDkEOQQvBDoELwQ7BDoEOAQ8BCwEPAQ7BC8EPQQ8BDgEOwQ8BD4EPwQ8BD0EPgQ8BD8EQgRBBEAEQQRCBEMEQwRCBEQERwRGBEUERgRHBEgESARHBEkETARLBEoESwRMBE0EUARPBE4ETwRQBFEEVARTBFIEUwRUBFUEVQRUBFYEVQRWBFcEVwRWBFgEVwRYBFkEXARbBFoEWwRcBF0EXQRcBF4EXQReBF8EXwReBGAEXwRgBGEEZARjBGIEYwRkBGUEZQRkBGYEZQRmBGcEZQRnBGgEaARnBGkEaARpBGoEagRpBGsEagRrBGwEbARrBG0EbARtBG4EbgRtBG8EbgRvBHAEcARvBHEEcQRvBHIEcQRyBHMEcwRyBHQEcwR0BHUEcwR1BHYEdgR1BHcEdwR1BHgEdwR4BHkEfAR7BHoEewR8BH0EfQR8BH4EfQR+BH8EfQR/BIAEgAR/BIEEgASBBIIEggSBBIMEggSDBIQEhASDBIUEhASFBIYEhgSFBIcEhgSHBIgEiASHBIkEiQSHBIoEiQSKBIsEiwSKBIwEiwSMBI0EiwSNBI4EjgSNBI8EjwSNBJAEjwSQBJEElASTBJIEkwSUBJUElQSUBJYEmQSYBJcEmASZBJoEnQScBJsEnASdBJ4EoQSgBJ8EoAShBKIEogShBKMEpgSlBKQEpQSmBKcEqgSpBKgEqQSqBKsE",verts:1196,tris:814},ruedas:[[.3,.3,-.56],[-.3,.3,-.56],[.3,.3,.76],[-.3,.3,.76]]},"suv-luxury":{cuerpo:{min:[-.75,.125,-1.4],max:[.75,1.3,1.45],pos:"LVjruyKcLVjru/6FHEchpiKc06fru/6F06fruyKc5LghpiKcEpHruyKc06fruyKcEpEfvCWcxacfvCWc3V200YFklF2d0Nlk3V200YZyO1gfvFloLVjru1xoLVjru4dvI6K37wZYI6I24khfEpG37wZYEpE24khfI6I0+AzHI6K373/PEpE0+AzHEpG373/P7m637/807m40+HI93V237/803V00+HI97m40+AzH7m6373/P3V00+AzH3V2373/P7m424jal7m6373es3V024jal3V2373es7m4fvKwk7m6d0CwoO1gfvKwklF2d0CwolF2d0FHc3V200fnb7m6d0FHc7m424sDW3V024sDWI6K373/PI6I24sDWEpG373/PEpE24sDW7m424r0t7m637/803V024r0t3V237/807m6373/P7m424sDW3V2373/P3V024sDW7m40+HI97m4Z+4NG3V00+HI93V0Z+4NG7m4Z+4NG7m40+JRP3V0Z+4NG3V00+JRP7m637wZY7m424khf3V237wZY3V024khfI6IZ+/u9I6I0+AzHEpEZ+/u9EpE0+AzH7m4Z+/u97m40+AzH3V0Z+/u93V00+AzHEpEfvKwkxacfvKwkEpGd0CwobKKd0Cwo7m6373es7m40+Oq03V2373es3V00+Oq0xacfvNHfEpEfvNHfbKKd0FHcEpGd0FHcI6K00fnbI6K00YQobKKd0FHcxacfvNHfg60hpgPhbKKd0CwoxacfvKwkg60hpnsj7m4fvFloO1gfvFlo7m6d0NlklF2d0Nlk3V200fnblF2d0FHc3V200YQoO1gfvNHffVIhpgPhlF2d0CwoO1gfvKwkfVIhpnsjEpEfvFloEpGd0NlkxacfvFlobKKd0NlkI6I24r0tI6K37/80EpE24r0tEpG37/80I6I0+Oq0I6IZ+/u9EpE0+Oq0EpEZ+/u9EpEfvCWcxacfvCWcEpGd0KWfbKKd0KWfEpEhpnsjg60hpnsjEpEfvKwkxacfvKwkO1gfvNHflF2d0FHc7m4fvNHf7m6d0FHcEpGd0KWfbKKd0KWfEpE24jalI6K00f2fI6I24jalfVIhpgPhO1gfvNHf7m4hpgPh7m4fvNHfI6I0+HI9I6IZ+4NGEpE0+HI9EpEZ+4NGlF2d0Nlk3V200YFk7m6d0Nlk7m424khf3V024khflF2d0Cwo7m6d0Cwo3V200YQo7m424r0t3V024r0tfVIhpnsj7m4hpnsjO1gfvKwk7m4fvKwkI6I0+JRPI6K37wZYEpE0+JRPEpG37wZYbKKd0FHcEpGd0FHcI6K00fnbEpE24sDWI6I24sDWbKKd0NlkEpGd0NlkI6K00YFkEpE24khfI6I24khf7m40+Oq07m4Z+/u93V00+Oq03V0Z+/u9I6IZ+4NGI6I0+JRPEpEZ+4NGEpE0+JRPLVjruyKc7m7ruyKcO1gfvCWc7m4fvCWcg60hpgPhg60hpnsjEpEhpgPhEpEhpnsjI6K373esI6I0+Oq0EpG373esEpE0+Oq07m4fvCWc7m6d0KWfO1gfvCWclF2d0KWfg60hpgPhEpEhpgPhxacfvNHfEpEfvNHfbKKd0CwoI6K00YQoEpGd0CwoEpE24r0tI6I24r0tI6K37/80I6I0+HI9EpG37/80EpE0+HI97m6d0KWf7m424jallF2d0KWf3V200f2f3V024jal7m4hpgPh7m4hpnsjfVIhpgPhfVIhpnsj7m40+JRP7m637wZY3V00+JRP3V237wZYLVjru4dv06fru4dv3V200YZyI6K00YZy06fru1xoEpHru1xoxacfvFloEpEfvFloI6I24jalI6K373esEpE24jalEpG373esI6K00YFkI6K00YZybKKd0NlkxacfvFlo06fru1xo06fru4dv7m7ru1xoLVjru1xo7m4fvFloO1gfvFlo06fru/6FLVjru/6FI6K00QGA3V200QGALVjruyKc5LghpiKcHEchpiKc06fruyKc06fruyKcEpHruyKc5LghpiKcEpFYkCKc7m5YkCKcHEchpiKc7m7ruyKcLVjruyKcLVjru/6F06fru/6FHEchpiKc5LghpiKc3V200QGALVjru/6F3V200fiRLVjruyKcO1gfvCWclF2d0KWf3V200f2f3V1YkIF7I6JYkIF73V3ru4F7I6Lru4F7EpFYkIZyEpHru4ZyEpZYkOB4Epbru+B47m7ru4Zy7m5YkIZy7mnru+B47mlYkOB4I6JYkIF7EpZYkOB4I6Lru4F7Epbru+B406fru1xo06fru4dvEpHru1xoI6Lru4F7LVjru4dvEpbru+B4EpHru4Zy3V3ru4F7LVjru1xo7mnru+B47m7ru4Zy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",nor:"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AKZaAKZaAKamAJLBAKamAJLBAPh/APh/AN97AN97AN+FAMGSAN+FAMGSAPiBAN+FAPiBAN+FAPh/APh/AN97AN97AIUhAJJAAIUhAJJAAN97AN97AMFuAMFuAPiBAN+FAPiBAN+FAMFuAMFuAKZaAKZaAN+FAMGSAN+FAMGSAIXfAIEAAIXfAIEAAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAMGSAKamAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAJJAAKZaAJJAAKZaAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAACBAACBAPiBAPiBfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAKamAMGSAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAJJAAKZaAJJAAKZaAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfAACBAACBAPiBAPiBAACBAACBAPiBAPiBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AACBAACBAACBAACBAACBAACBAACBAACBgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAIEAAIEAAIEAAIEAAEFtAEFtAG1CAEFtAEFtAEFtAG1CAEFtAEFtAEFtAEFtAIEAAIEAAIEAAIEAgQAAizEAgQAAizEAdTEAfwAAdTEAfwAAAH8AAGdKAH8AAGdKAH8AAH8AMXUAMXUAAH8AAH8AgQAAgQAAgQAAgQAAAH8AAH8Az3UAz3UAfwAAfwAAfwAAfwAAACh4ACh4ACh4ACh4ACh4ACh4ACh4ACh4AGdKACh4ACh4AGdKACh4ACh4ACh4ACh4AACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/izEAz3UAizEAz3UAMXUAdTEAMXUAdTEAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAC+KAC+KAE2bAC+KAC+KAC+KAC+KAC+KAC+KAE2bAE2bAGm5AE2bAGm5gxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAAH8AAH8AAG1CAH8AAH8AAH8AAG1CAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAACBWgCmAACBWgCmpgCmAACBpgCmAACBpgCmpgCmgQAAgQAAWgCmWgCmfwAAfwAAfRkAfRkAfRkAfRkAfRkAfRkAAEFtAEFtAEFtAEFtAEFtAC+KAC+KAC+KAC+KgxkAgxkAgxkAgxkAgxkAgxkAAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AACh4sR9eACh4nhpNfwAAfwAAYhpNTx9eTx9eACh4YhpNACh4gQAAgQAAsR9enhpN",col:"bG2CbG2CaWp/bG2CbG2CaWp/bG2CbG2CbG2CbG2CbnCFbnCFbnCFbG2CbG2CbG2CcnSJcHKHcnSJcHKHc3WKcnSJc3WKcnSJcnSJc3WKcnSJc3WKc3WKcnSJc3WKcnSJcHKHcnSJcHKHcnSJbG2CbnCFbG2CbnCFbnCFbnCFbnCFcHKHcHKHcnSJcHKHcnSJcHKHcHKHcnSJcHKHcnSJcnSJcHKHcnSJcHKHc3WKc3aLc3WKc3aLc3aLc3WKc3aLc3WKcnSJcHKHcnSJcHKHc3aLc3WKc3aLc3WKc3aLc3WKc3aLc3WKbG2CbG2CbnCFbnCFcnSJc3WKcnSJc3WKbG2CbG2CbnCFbnCFbnCFbnCFbnCFbG2CaWp/bnCFbG2CaWp/bG2CbG2CbnCFbnCFbnCFbnCFbnCFbG2CaWp/bnCFbG2CaWp/bG2CbnCFbG2CbnCFcHKHcnSJcHKHcnSJc3WKc3aLc3WKc3aLbG2CbG2CbnCFbnCFaWp/aWp/bG2CbG2CbG2CbnCFbG2CbnCFbnCFbnCFcHKHbnCFcHKHaWp/bG2CaWp/bG2Cc3WKc3aLc3WKc3aLbnCFbnCFbnCFcHKHcHKHbnCFbnCFbnCFcHKHcHKHaWp/aWp/bG2CbG2Cc3WKcnSJc3WKcnSJbnCFbnCFbnCFcHKHcHKHbnCFbnCFbnCFcHKHcHKHc3WKc3aLc3WKc3aLc3aLc3WKc3aLc3WKbG2CbG2CbG2CbG2CaWp/aWp/aWp/aWp/cnSJc3WKcnSJc3WKbG2CbnCFbG2CbnCFaWp/aWp/bG2CbG2CbnCFbnCFbnCFcHKHcHKHcnSJc3WKcnSJc3WKbnCFcHKHbnCFbnCFcHKHaWp/aWp/aWp/aWp/c3WKcnSJc3WKcnSJbG2CbG2CbnCFbnCFbG2CbG2CbG2CbG2CcHKHcnSJcHKHcnSJbnCFbnCFbnCFbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbnCFbnCFbG2CaWp/aWp/bG2CbG2CbG2CaWp/Z2d8Z2d8aWp/bG2CbG2CbG2CbG2CaWp/aWp/bnCFbG2CbnCFbG2CbG2CbnCFbnCFZ2d8Z2d8bG2CbG2CZ2d8bG2CZ2d8bG2CbG2CZ2d8bG2CZ2d8Z2d8Z2d8bG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CbG2CZ2d8Z2d8bG2CbG2CbG2CbG2CbG2CbG2CbnCFbnCFbG2CbG2CbG2CbnCFbnCFZ2d8bG2CZ2d8bG2CbnCFaWp/cHKHa2yBbW+EcnSJb3CFcHKHc3WKcXOIc3aLcXOIcXOIc3WKcHKHcnSJb3CFcHKHbW+Ea2yBbnCFaWp/Z2d8aWp/bG2CZ2d8aWp/bG2CbnCFaWp/cHKHa2yBbW+EcnSJb3CFcHKHc3WKcXOIc3aLcXOIcXOIc3WKcHKHcnSJb3CFcHKHbW+Ea2yBbnCFaWp/Z2d8bG2CbG2CZ2d8bG2CbG2CbnCFbG2CZ2d8Z2d8bG2CaWp/a2yBcHKHbW+Eb3CFcnSJcHKHc3WKcXOIcXOIc3aLcXOIc3WKcHKHcnSJb3CFbW+EcHKHa2yBaWp/bnCFZ2d8bG2CaWp/aWp/Z2d8bnCFbG2CaWp/a2yBcHKHbW+Eb3CFcnSJcHKHc3WKcXOIcXOIc3aLcXOIc3WKcHKHcnSJb3CFbW+EcHKHa2yBaWp/bnCFZ2d8bG2CZ2d8bG2CZ2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8Z2d8ZWV6ZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedbG6DbG6De36Ue36UOjpAOztBOjpAOztBPDxCPDxCPDxCPDxCOTk+OTk+OjpAOjpAPDxCPDxCPDxCPDxCOjpAOztBOjpAOztBPDxCPDxCPDxCPDxCNzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg9OztBPDxCOztBPDxCPDxCOztBPDxCOztBPDxCOztBPDxCOztBPDxCPDxCPDxCPDxCPDxCPDxCPDxCPDxCOjpAOjpAOztBOztBOztBPDxCOztBPDxCODg9ODg9OTk+OTk+OTk+OjpAOTk+OjpAODg9OTk+ODg9OTk+ODg9ODg9OTk+OTk+PDxCPDxCPDxCPDxCOTk+OTk+OjpAOjpAODg9OTk+ODg9OTk+OjpAOjpAOztBOztBOTk+OjpAOTk+OjpAPDxCPDxCPDxCPDxCNzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCODg9ODg9OTk+OTk+Nzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCPDxCPDxCPDxCPDxCOjpAOjpAOztBOztBODg9ODg9OTk+OTk+OjpAOjpAOztBOztBOTk+OTk+OjpAOjpAPDxCOztBPDxCOztBOztBPDxCOztBPDxCPDxCPDxCPDxCPDxCOTk+OTk+OjpAOjpAPDxCPDxCPDxCPDxCNzc7ODg9Nzc7OTk+OjpAOztBPDxCPDxCPDxCPDxCPDxCOztBOjpAOTk+ODg9ODg9Nzc7OTk+Nzc7OjpAOztBPDxCPDxCPDxCPDxCPDxCOztBOjpAOTk+ODg9Nzc7Nzc7ODg9ODg9ODg9Nzc7OTk+Nzc7OjpAOztBPDxCPDxCPDxCPDxCPDxCOztBOjpAOTk+ODg9Nzc7ODg9Nzc7OTk+OjpAOztBPDxCPDxCPDxCPDxCPDxCOztBOjpAOTk+ODg9ODg9ODg9OTk+OTk+Nzc7Nzc7ODg9ODg9PDxCPDxCPDxCPDxCPDxCPDxCPDxCPDxCOjpAOztBOjpAOztBODg9ODg9OTk+OTk+OjpAOjpAOztBOztBOTk+OTk+OjpAOjpAOztBPDxCOztBPDxCPDxCPDxCPDxCPDxCPDxCOztBPDxCOztBOTk+OTk+OjpAOjpAPDxCPDxCPDxCPDxCNzc7Nzc7ODg9ODg9Nzc7Nzc7ODg9ODg93Nzp3Nzp4eHs4eHs5eXv5eXv3Nzp3Nzp4eHs4eHs5eXv5eXvysrdysrdzs7gzs7gwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7/7FH/6pB/7FH/6pB/7RK/61E/7BG/7hM/7RK/7JH/7NI/7JH/7hM/7BG/7hM/7hM/7NI/61E/6pB/7NI/7hM/7hM/6pB/61E/7BG/7JH/7NI/7JH/7hM/7BG/6pB/61E/6pB/7NI/7NI/6pB/7NI/7NI/7NI/7NI/7hM/7hM/89g/7tQ/8td/8td/89g/8td/7tQ/7hM/7hM/7NI/7NI/7NI/7NI/7NI/7hM/7NI/7hM/7hM/7NI/7hM/7NI/7hM/7hM/7hM/7hM/7hM/7hM/7xQ/7xQ/7xQ/7xQ/7hM/7xQ/7hM/7xQ/7xQ/7xQ/7xQ/7xQ/7xQ/7hM/7xQ/7hM/6pB/6pB/7FH/7FH/7FH/7RK/7FH/7RK/7hM/7RK/7RK/7hM/7FH/6pB/7FH/6pB/7hM/7hM/7NI/7NI/7NI/7NI/6pB/6pB/7NI/7NI/7hM/7hM/7xQ/7xQ/7NI/7NI/7hM/7hM/7xQ/7xQ/7hM/7xQ/7hM/7xQ/7xQ/7hM/7xQ/7hM/7hM/7NI/7hM/7BG/7hM/61E/7JH/6pB/7hM/7NI/7JH/7NI/7BG/7hM/7hM/6pB/61E/7BG/7JH/7NI/7JH/7RK/7RK/61E/6pB/7FH/6pB/7FH/7NI/7hM/7BG/6pB/61E/6pB/6pB/7NI/7hM/7hM/8xe/8NW/7hM/7hM/8td/8NW/8td/8xe/8xe/89g/8xe/89g/7hM/8xe/7hM/7hM/89g/8td/89g/8td/7hM/7hM/7hM/89g/7hM/8td/8td/89g/7hM/8xe/7hM/7hM/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g/89g0zY90zY9+mc/+mc/0zY90zY9+mc/+mc/0zY9+mc/0zY9+mc/+mc/0zY9+mc/0zY99Pr/1Oz/9Pr/1Oz/1Oz/1Oz/2+//2+//9Pr/9Pr/9Pr/5/X/5/X/8/r/8/r/1Oz/9Pr/1Oz/9Pr/1Oz/1Oz/+v3/+v3/+v3/+v3/+v3/+v3/+v3/+v3/+v3/+v3/+v3/+v3//8Yb/8Yb/+VN/+VN/+VN/8Yb/+VN/8Yb/8Yb/8Yb/+VN/+VN/8Yb/+VN/8Yb/+VN",idx:"AgABAAAABQAEAAMACAAHAAYABwAIAAkADAALAAoACwAMAA0ADQAMAA4ADgAMAA8AEgARABAAEQASABMAFgAVABQAFQAWABcAGgAZABgAGQAaABsAHgAdABwAHQAeAB8AIgAhACAAIQAiACMAJgAlACQAJQAmACcAKgApACgAKQAqACsAKQArACwALwAuAC0ALgAvADAAMwAyADEAMgAzADQANwA2ADUANgA3ADgAOwA6ADkAOgA7ADwAPwA+AD0APgA/AEAAQwBCAEEAQgBDAEQARwBGAEUARgBHAEgASwBKAEkASgBLAEwATwBOAE0ATgBPAFAAUwBSAFEAUgBTAFQAVwBWAFUAVgBXAFgAWwBaAFkAWgBbAFwAWgBcAF0AWgBdAF4AXgBdAF8AXwBdAGAAYwBiAGEAYgBjAGQAZwBmAGUAZgBnAGgAaABnAGkAaQBnAGoAaQBqAGsAaQBrAGwAbwBuAG0AbgBvAHAAcwByAHEAcgBzAHQAdwB2AHUAdgB3AHgAewB6AHkAegB7AHwAfwB+AH0AfgB/AIAAgwCCAIEAggCDAIQAhwCGAIUAhgCHAIgAiACHAIkAjACLAIoAiwCMAI0AkACPAI4AjwCQAJEAlACTAJIAkwCUAJUAkwCVAJYAmQCYAJcAmACZAJoAmgCZAJsAngCdAJwAnQCeAJ8AogChAKAAoQCiAKMApgClAKQApQCmAKcApwCmAKgAqwCqAKkAqgCrAKwArACrAK0AsACvAK4ArwCwALEAtACzALIAswC0ALUAuAC3ALYAtwC4ALkAvAC7ALoAuwC8AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAzADLAMoAywDMAM0AywDNAM4A0QDQAM8A0ADRANIA1QDUANMA1ADVANYA1ADWANcA2gDZANgA2QDaANsA3gDdANwA3QDeAN8A4gDhAOAA4QDiAOMA5gDlAOQA5QDmAOcA6gDpAOgA6QDqAOsA7gDtAOwA7QDuAO8A7QDvAPAA7QDwAPEA9ADzAPIA8wD0APUA+AD3APYA9wD4APkA/AD7APoA/QD6APsAAAH/AP4AAAEBAf8AAQEAAQIBAwECAQABAgEDAQQBBAEDAQUBCAEHAQYBBwEIAQkBDAELAQoBCwEMAQ0BDQEMAQ4BDgEMAQ8BDwEMARABEwESAREBEgETARQBFwEWARUBFgEXARgBGwEaARkBGgEbARwBHwEeAR0BHgEfASABIwEiASEBIgEjASQBJAElASIBJAEjASYBJgEjAScBKAElASQBKAEpASUBKgEpASgBKwEpASoBKQErASwBLwEuAS0BLgEvATABMwEyATEBMgEzATQBNwE2ATUBNgE3ATgBNgE4ATkBNgE5AToBNgE6ATsBPgE9ATwBPQE+AT8BPwE+AUABQAE+AUEBQAFBAUIBQgFBAUMBQgFDAUQBQgFEAUUBRQFEAUYBRQFGAUcBRQFHAUgBSAFHAUkBSAFJAUoBSgFJAUsBSgFLAUwBSgFMAU0BTQFMAU4BTQFOAU8BTwFOAVABTwFQAVEBUQFQAVIBUQFSAVMBUQFTAVQBVAFTAVUBVAFVAVYBVAFWAVcBVAFXAVgBVwFWAVkBVwFZAVoBWgFZAVsBWwFZAVwBXAFZAV0BXAFdAV4BXgFdAV8BXgFfAWABXgFgAWEBYQFgAWIBYQFiAWMBYQFjAWQBZAFjAWUBZAFlAWYBZgFlAWcBZgFnAWgBZgFoAWkBaQFoAWoBaQFqAWsBawFqAWwBawFsAW0BbQFsAW4BbQFuAW8BbQFvAXABcAFvAXEBcAFxAXIBcAFyAXMBcAFzAXQBcwFyAXUBcwF1AXYBeQF4AXcBegF4AXkBegF5AXsBewF5AXwBfQF4AXoBfgF4AX0BfgF/AXgBgAF/AX4BgQF/AYABgQGCAX8BgwGCAYEBgwGEAYIBhQGEAYMBhgGEAYUBhgGHAYQBiAGHAYYBiAGJAYcBigGJAYgBigGLAYkBjAGLAYoBjQGLAYwBjQGOAYsBjwGOAY0BkAGOAY8BjgGQAZEBkgGRAZABkgGTAZEBkgGUAZMBkgGVAZQBlgGVAZIBlgGXAZUBlQGXAZgBmQGXAZYBmgGXAZkBmgGbAZcBnAGbAZoBnQGbAZwBnQGeAZsBnwGeAZ0BnwGgAZ4BoQGgAZ8BogGgAaEBogGjAaABpAGjAaIBpAGlAaMBpgGlAaQBpgGnAaUBqAGnAaYBqQGnAagBqQGqAacBqwGqAakBrAGqAasBqgGsAa0BrgGtAawBrgGvAa0BsAGvAa4BrwGwAbEBtAGzAbIBswG0AbUBswG1AbYBtwG2AbUBuAG2AbcBuAG3AbkBugG2AbgBtgG6AbsBtwG1AbwBtQG9AbwBvgG8Ab0BvAG+Ab8BvwG+AcABtQHBAb0BvQHBAcIBwwHBAbUBwgHBAcQBwgHEAcUBwwHGAcEBwwHHAcYBwwHIAccByAHDAckBzAHLAcoBywHMAc0B0AHPAc4BzwHQAdEB1AHTAdIB0wHUAdUB2AHXAdYB1wHYAdkB3AHbAdoB2wHcAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB5QHkAeYB5QHmAecB5wHmAegB5wHoAekB7AHrAeoB6wHsAe0B8AHvAe4B7wHwAfEB9AHzAfIB8wH0AfUB+AH3AfYB9wH4AfkB/AH7AfoB+wH8Af0BAAL/Af4B/wEAAgECBAIDAgICAwIEAgUCCAIHAgYCBwIIAgkCDAILAgoCCwIMAg0CDQIMAg4CDQIOAg8CDwIOAhACDwIQAhECFAITAhICEwIUAhUCGAIXAhYCFwIYAhkCHAIbAhoCGwIcAh0CIAIfAh4CHwIgAiECJAIjAiICIwIkAiUCKAInAiYCJwIoAikCLAIrAioCKwIsAi0CMAIvAi4CLwIwAjECNAIzAjICMwI0AjUCOAI3AjYCNwI4AjkCPAI7AjoCOwI8Aj0CQAI/Aj4CPwJAAkECRAJDAkICQwJEAkUCSAJHAkYCRwJIAkkCTAJLAkoCSwJMAk0CUAJPAk4CTwJQAlECVAJTAlICUwJUAlUCWAJXAlYCVwJYAlkCXAJbAloCWwJcAl0CYAJfAl4CXwJgAmECZAJjAmICYwJkAmUCaAJnAmYCZwJoAmkCbAJrAmoCawJsAm0CcAJvAm4CbwJwAnECdAJzAnICcwJ0AnUCeAJ3AnYCdwJ4AnkCfAJ7AnoCewJ8An0CgAJ/An4CfwKAAoEChAKDAoICgwKEAoUCiAKHAoYChwKIAokCjAKLAooCiwKMAo0CkAKPAo4CjwKQApEClAKTApICkwKUApUCmAKXApYClwKYApkCnAKbApoCmwKcAp0CoAKfAp4CnwKgAqECpAKjAqICowKkAqUCqAKnAqYCpwKoAqkCrAKrAqoCqwKsAq0CsAKvAq4CrwKwArECtAKzArICswK0ArUCuAK3ArYCtwK4ArkCvAK7AroCuwK8Ar0CwAK/Ar4CvwLAAsECxALDAsICwwLEAsUCxQLEAsYCxgLEAscCxwLEAsgCyALEAskCyQLEAsoCygLEAssCywLEAswCzALEAs0CzQLEAs4CzgLEAs8CzwLEAtAC0wLSAtEC0gLTAtQC1ALTAtUC1ALVAtYC1ALWAtcC1ALXAtgC1ALYAtkC1ALZAtoC1ALaAtsC1ALbAtwC1ALcAt0C1ALdAt4C1ALeAt8C4gLhAuAC4QLiAuMC5gLlAuQC5QLmAucC5wLmAugC5wLoAukC5wLpAuoC5wLqAusC5wLrAuwC5wLsAu0C5wLtAu4C5wLuAu8C5wLvAvAC5wLwAvEC5wLxAvIC9QL0AvMC9AL1AvYC9gL1AvcC9wL1AvgC+AL1AvkC+QL1AvoC+gL1AvsC+wL1AvwC/AL1Av0C/QL1Av4C/gL1Av8C/wL1AgADAAP1AgEDBAMDAwIDAwMEAwUDCAMHAwYDBwMIAwkDDAMLAwoDCwMMAw0DEAMPAw4DDwMQAxEDFAMTAxIDEwMUAxUDGAMXAxYDFwMYAxkDHAMbAxoDGwMcAx0DIAMfAx4DHwMgAyEDJAMjAyIDIwMkAyUDKAMnAyYDJwMoAykDLAMrAyoDKwMsAy0DMAMvAy4DLwMwAzEDNAMzAzIDMwM0AzUDOAM3AzYDNwM4AzkDPAM7AzoDOwM8Az0DQAM/Az4DPwNAA0EDQQNAA0IDQQNCA0MDRgNFA0QDRQNGA0cDRwNGA0gDRwNIA0kDTANLA0oDSwNMA00DUANPA04DTwNQA1EDUQNQA1IDUQNSA1MDUwNSA1QDUwNUA1UDWANXA1YDVwNYA1kDWQNYA1oDWQNaA1sDWwNaA1wDWwNcA10DYANfA14DXwNgA2EDYgNhA2ADYgNjA2EDYgNkA2MDZQNkA2IDZQNiA2YDZQNnA2QDZQNoA2cDZQNpA2gDagNpA2UDagNrA2kDbANrA2oDbQNrA2wDbgNrA20DbgNvA2sDbgNwA28DcQNwA24DcgNwA3EDcwNyA3EDcgN0A3ADcgN1A3QDcgN2A3UDcgN3A3YDcgN4A3cDcgN5A3gDegN5A3IDegN7A3kDegN8A3sDewN8A30DfQN8A34DfwN8A3oDgAN8A38DfAOAA4EDhAODA4IDgwOEA4UDiAOHA4YDhwOIA4kDiQOIA4oDigOIA4sDjAOLA4gDjAONA4sDjAOOA40DjwOOA4wDjgOPA5ADkwOSA5EDkgOTA5QDlwOWA5UDlgOXA5gDmwOaA5kDmgObA5wDnwOeA50DngOfA6ADoAOfA6EDoAOhA6IDpQOkA6MDpAOlA6YDqQOoA6cDqAOpA6oDrQOsA6sDrAOtA64DsQOwA68DsAOxA7IDtQO0A7MDtAO1A7YDtAO2A7cDtwO2A7gDtwO4A7kDugO5A7gDuAO7A7oDuwO4A7wDugO7A70DvQO7A74DvwO5A7oDwAO5A78DwQPAA78DuQPAA8IDxQPEA8MDxAPFA8YDxwPGA8UDxwPIA8YDyQPIA8cDyAPJA8oDzQPMA8sDzAPNA84DzgPNA88DzwPNA9AD0wPSA9ED0gPTA9QD1APTA9UD1APVA9YD2QPYA9cD2APZA9oD3QPcA9sD3APdA94D4QPgA98D4gPgA+ED4gPhA+MD5APgA+ID4gPjA+UD5gPgA+QD5QPjA+cD5QPnA+gD6APnA+kD5gPqA+AD6QPnA+sD5gPsA+oD6gPsA+0D7gPsA+YD7wPsA+4D8APsA+8D8QPsA/AD8gPsA/ED8wPsA/ID6wPnA/QD9APnA/UD6wP0A/YD9gP0A/cD+AP3A/QD9wP4A/kD+QP4A/oD+wPsA/MD7AP7A/wD+wPzA/0D+wP9A/4D/gP9A/8D/gP/AwAEAQT7A/4D+wMBBAIEBQQEBAMEBAQFBAYEBAQGBAcEBwQGBAgEBgQFBAkECgQIBAYECQQFBAsECAQKBAwEDAQKBAsEDAQLBAUEDwQOBA0EDgQPBBAEEwQSBBEEEgQTBBQEEgQUBBUEFQQUBBYEFQQWBBcEFwQWBBgEFwQYBBkEFwQZBBoEHQQcBBsEHgQcBB0EHwQcBB4EHAQfBCAEIQQgBB8EIQQiBCAEIwQiBCEEIgQjBCQEJwQmBCUEJwQlBCgEJwQpBCYEJwQoBCoEKwQpBCcELAQqBCgEKQQrBC0ELQQrBC4ELgQrBC8EMAQvBCsELwQwBDEEMQQwBCoEMgQqBCwEMQQqBDMENAQqBDIEMwQqBDQENwQ2BDUENgQ3BDgEOwQ6BDkEOgQ7BDwEPwQ+BD0EPgQ/BEAEQwRCBEEEQgRDBEQERwRGBEUERgRHBEgESARHBEkESARJBEoETQRMBEsETARNBE4ETgRNBE8EUgRRBFAEUQRSBFMEVgRVBFQEVQRWBFcEVwRWBFgEWARWBFkEXARbBFoEWwRcBF0EXQRcBF4EXQReBF8EXwReBGAEXwRgBGEEYQRgBGIEYQRiBGMEYwRiBGQEYwRkBGUEaARnBGYEZwRoBGkEbARrBGoEawRsBG0EcARvBG4EbwRwBHEEdARzBHIEcwR0BHUE",verts:1142,tris:758},ruedas:[[-.3,.3,-.71],[-.3,.3,.81],[.3,.3,.81],[.3,.3,-.71]]},van:{cuerpo:{min:[-.75,.15,-1.4],max:[.75,1.35,1.35],pos:"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I6LV2kDVbKKayYRoEpGayYRoI6KryihoEpHV2r9iI6LV2r9i7m5e8C+y7m4z85W73V1e8C+y3V0z85W7I6Iz8xNJI6Je8HhSEpEz8xNJEpFe8HhSLVhWtYCY7m5WtYCYO1iJtYOY7m6JtYOYg60BoOLfg60BoMUkEpEBoOLfEpEBoMUkI6IO6G6pI6Je8C+yEpEO6G6pEpFe8C+y7m6JtYOY7m6aySScO1iJtYOYlF2aySScg60BoOLfEpEBoOLfxaeJtabeEpGJtabebKKayaIpI6Kryv4pEpGayaIpEpHV2mcvI6LV2mcvI6IO6Ow2I6Je8K4/EpEO6Ow2EpFe8K4/7m6aySSc7m7V2umhlF2aySSc3V2ryn+c3V3V2umh7m4BoOLf7m4BoMUkfVIBoOLffVIBoMUk3V2sild7I6Ksild73V1WtVd7I6JWtVd77m5e8HhS7m4O6Dpb3V1e8HhS3V0O6Dpb7m6sigBlRESsigBl7m6sighy7mmsip143V2sild7I6Ksild7RESsiiYtvLusigBlEpGsigBlEpasip14EpGsighyRESsioLX7m6siiYt7m6sioLXRESsiqefvLusiqefvLusiiYtvLusioLXEpGsiiYtEpGsioLXI6KsiqmEEpGsiqefEpasimOHEpGsiviN3V2siqmE7mmsimOH7m6siqef7m6siviN06dWtSdsEpFWtSdsxaeJtSRsEpGJtSRsI6LV2umhI6IO6G6pEpHV2umhEpEO6G6pI6KryihoI6KryrB2bKKayYRoxaeJtSRs06dWtSds06dWtZZz7m5WtSdsLVhWtSds7m6JtSRsO1iJtSRsEpFWtfiNEpZWtWOHEpFWtYCYI6JWtamE06dWtYCY06dWtd2KLVhWtd2K3V1WtamELVhWtYCY7mlWtWOH7m5WtYCY7m5WtfiN06dWtd2KLVhWtd2KI6KryqmE3V2ryqmE7mmsip143V2sild77mlWtZ143V1WtVd77m5WtQhy7m6sighy7mlWtZ147mmsip14EpGsighyEpFWtQhyEpasip14EpZWtZ14I6Ksild7Epasip14I6JWtVd7EpZWtZ14EpasimOHI6KsiqmEEpZWtWOHI6JWtamEEpasimOHEpZWtWOHEpGsiviNEpFWtfiN7mlWtWOH7mmsimOH7m5WtfiN7m6siviN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",nor:"AF+sAGe2ACGFAB6FgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAA5wCDGQCD5wCDGQCDfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAAG5AAFpaAG5AAFpaAHshAG5AAHshAG5AAG7BAHvfAG7BAHvfAHshAG5AAHshAG5AAFqmAG7BAFqmAG7BACGFAECSAB6FAD2RAD1vAE1lAEBuAFpaAFpaAG5AAFpaAG5AAFpaAFqmAG7BAFqmAG7BAG5AAFpaAG5AAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAG5AAFpaAG5AAFpaAH8AAHshAH8AAHshAH8AAHshAH8AAHshACGFAB6FAECSAD2RAG7BAHvfAG7BAHvfiNgAiNgAiNgAiNgAiNgAiNgAiNgAAB57ACF7AD1vAEBuiNgAiNgAiNgAiNgAiNgAiNgAiNgAiNgAACF7AB57AEBuAD1veNgAeNgAeNgAeNgAeNgAeNgAeNgAeNgAACF7AEBuAB57AD1vAFqmAG7BAFqmAG7BAHvfAH8AAHvfAH8AACGFAB6FAECSAD2RABGCABGCACGFAB6FAB57AD1vACF7AEBuAECSAD2RAFqmAE2bAFqmABF+AB57ABF+ACF7AHvfAH8AAHvfAH8AAD1vAE1lAEBuAFpaAFpaAD2RAECSAE2bAFqmAFqmABGCABGCAB6FACGFAHshAG5AAHshAG5AAD1vAEBuAE1lAFpaAFpaAD1vAEBuAE1lAFpaAFpaAHvfAH8AAHvfAH8AAH8AAHshAH8AAHshAGe2AF+sAB6FACGFAH8AAH8AAH8AAH8AAG7BAHvfAG7BAHvfACGFAECSAB6FAD2RABF+ABF+AB57ACF7AD2RAE2bAECSAFqmAFqmAG7BAHvfAG7BAHvfAECSAFqmAD2RAE2bAFqmAH8AAH8AAH8AAH8AGQB95wB9GQB95wB9AHshAG5AAHshAG5AAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAIEAAGdKAF9UAB57ACF7AFqmAG7BAFqmAG7BiNgAiNgAiNgAiNgAiNgAiNgAAF9UAGdKACF7AB57AH8AAH8AAF+sAH8AAGe2AH8AAH8AAH8AAGe2AH8AAF+sAH8AALqWALqWALqWALqWWgBaGQB9WgBaGQB9dQAxdQAxWgBaWgBaiwAxiwAxpgBapgBa5wB9pgBa5wB9pgBapgCm5wCDpgCm5wCDpgCmpgCmiwDPiwDPWgCmWgCmdQDPdQDPGQCDWgCmGQCDWgCmANh4ANh4ANh4ANh4ANh4ANh4ANh4ANh4AGdKAH8AAF9UAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAGdKAH8AAH8AAF9UMYsAdc8AMYsAdc8Az4sAMYsAz4sAMYsAi88Az4sAi88Az4sAMXUAMXUAdTEAdTEAdc8AdTEAdc8AdTEAAACBAACBAACBAACBAACBAACBAACBAACBz3UAz3UAMXUAMXUAizEAi88AizEAi88AizEAizEAz3UAz3UAz4sAi88Az4sAi88AMYsAz4sAMYsAz4sAdc8AMYsAdc8AMYsAz3UAz3UAizEAizEAi88AizEAi88AizEAAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/MXUAMXUAz3UAz3UAdTEAdc8AdTEAdc8AdTEAdTEAMXUAMXUApgBagQAA8wB+DQB+fwAAWgBaWgBapgBaDQB+8wB+AAB/AAB/AMGSAKamAMGSAKamAJLBAIXfAJLBAIXfAN97AN97AMFuAMFuAJLBAIXfAJLBAIXfAMGSAKamAMGSAKamAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAAB/AAB/APh/APh/AAB/AAB/APh/APh/AKamAJLBAKamAJLBAJJAAKZaAJJAAKZaAJJAAKZaAJJAAKZaAIXfAIEAAIXfAIEAAIUhAJJAAIUhAJJAAMFuAMFuAKZaAKZaAKamAJLBAKamAJLBAPh/APh/AN97AN97AN+FAMGSAN+FAMGSAPiBAN+FAPiBAN+FAPh/APh/AN97AN97AIUhAJJAAIUhAJJAAN97AN97AMFuAMFuAPiBAN+FAPiBAN+FAMFuAMFuAKZaAKZaAN+FAMGSAN+FAMGSAIXfAIEAAIXfAIEAAACBAACBAPiBAPiBAIEAAIUhAIEAAIUhAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAMGSAKamAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAJJAAKZaAJJAAKZaAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAACBAACBAPiBAPiBfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAACBAACBAPiBAPiBAPiBAPiBAN+FAN+FAAB/AAB/APh/APh/AIEAAIUhAIEAAIUhAIUhAJJAAIUhAJJAAMGSAKamAMGSAKamAPh/APh/AN97AN97AMFuAMFuAKZaAKZaAN97AN97AMFuAMFuAKamAJLBAKamAJLBAIXfAIEAAIXfAIEAAJJAAKZaAJJAAKZaAN+FAN+FAMGSAMGSAJLBAIXfAJLBAIXfAC92AC92AC92AC92AC92AC92AC92AC92AIEAAIEAAIEAAIEAgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAAAB/AAB/AAB/AAB/AAB/gQAAgQAAgQAAgQAAfwAAfwAAfwAAfwAAAAB/AAB/AAB/AAB/AAB/AIEAAIEAAIEAAIEAAH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAgQAAAAB/AAB/AAB/AAB/AAB/ACl4ACl4AAB/AAB/AAB/AAB/AAB/fwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAfwAAAHsfAHsfAHsfAHsfAHI5AHsfAHI5AHsfAHsfAHsfACl4ACl4AHI5AHI5AH8AAH8AAH8AAH8AAH8AAH8AAH8AAH8AAC+KAC+KAC+KAC+KAC+KAC+KAC+KAC+KgQAAgQAAgQAAgQAAAHLHAHI5AHLHAHI5AExmAExmAHI5AHI5AEyaAEyaAHLHAHLHfwAAfwAAfwAAfwAAAACBAACBAACBAACBAACBAACBAACBAACBAACBAACBAAB/AAB/AAB/AAB/AAB/AAB/AAB/AAB/AACBAACBAACBAACBAACBAACBAACBAACBgxkAgxkAgxkAgxkAgxkAgxkAgxkAgxkAAC92AC92AC92AC92AC+KAC+KAC+KAC+KfRkAfRkAfRkAfRkAfRkAfRkAfRkAfRkAgQAAgQAApgBalSo2ryBcWgBaAAB/USBcACl4AAB/pgBaACl4ryBcfwAAfwAAayo2WgBaUSBcUSBcACl4ayo2AE5kACl4ryBcAE5klSo2AACBAACBAACBAACBAACBAACBAACBAACB",col:"amuAamuAamuAamuAZWV6amuAZWV6amuAamuAbW6DaGh9b3GGamuAbG2CcXOIbW+Eb3CFcnSJb3GGcnSJcHKHb3GGcnSJb3CFcXOIbW+Eb3GGbG2CamuAbW6DaGh9ZWV6aGh9amuAZWV6aGh9amuAbW6DaGh9b3GGamuAbG2CcXOIbW+Eb3CFcnSJb3GGcnSJcHKHb3GGcnSJb3CFcXOIbW+Eb3GGbG2CamuAbW6DaGh9ZWV6ZWV6amuAamuAamuAZWV6ZWV6amuAamuAamuAbW6DamuAZWV6amuAZWV6aGh9amuAb3GGbG2CbW+EcXOIb3CFcnSJb3GGcHKHcnSJb3GGcnSJb3CFcXOIbW+EbG2Cb3GGamuAaGh9bW6DZWV6amuAaGh9aGh9ZWV6bW6DamuAaGh9amuAb3GGbG2CbW+EcXOIb3CFcnSJb3GGcHKHcnSJb3GGcnSJb3CFcXOIbW+EbG2Cb3GGamuAaGh9bW6DZWV6amuAamuAZWV6amuAbW6DbW6DbW6DamuAamuAamuAbW6DamuAbW6DamuAamuAbW6DbW6DcXOIb3GGcXOIb3GGcnSJcXOIcnSJcXOIcXOIcnSJcXOIcnSJcnSJcXOIcnSJcXOIb3GGcXOIb3GGcXOIamuAbW6DamuAbW6DbW6DbW6DbW6Db3GGb3GGcXOIb3GGcXOIb3GGb3GGcXOIb3GGcXOIcXOIb3GGcXOIb3GGcnSJcnSJcnSJcnSJcnSJcnSJcnSJcnSJcXOIb3GGcXOIb3GGcnSJcnSJcnSJcnSJcnSJcnSJcnSJcnSJamuAamuAbW6DbW6DcXOIcnSJcXOIcnSJbW6DbW6DamuAamuAamuAbW6DbW6DamuAamuAbW6DbW6DbW6DbW6DbW6DamuAaGh9bW6DamuAaGh9amuAamuAbW6DbW6DbW6DbW6DbW6DamuAaGh9bW6DamuAaGh9amuAbW6DamuAbW6Db3GGcXOIb3GGcXOIcnSJcnSJcnSJcnSJamuAamuAbW6DbW6DaGh9aGh9amuAamuAamuAbW6DamuAbW6DbW6DbW6Db3GGbW6Db3GGaGh9amuAaGh9amuAcnSJcnSJcnSJcnSJbW6DbW6DbW6Db3GGb3GGbW6DbW6DbW6Db3GGb3GGaGh9aGh9amuAamuAcnSJcXOIcnSJcXOIbW6DbW6DbW6Db3GGb3GGbW6DbW6DbW6Db3GGb3GGcnSJcnSJcnSJcnSJcnSJcnSJcnSJcnSJamuAamuAamuAamuAaGh9aGh9aGh9aGh9cXOIcnSJcXOIcnSJamuAbW6DamuAbW6DaGh9aGh9amuAamuAbW6DbW6DbW6Db3GGb3GGcXOIcnSJcXOIcnSJbW6Db3GGbW6DbW6Db3GGaGh9aGh9aGh9aGh9ZWV6ZWV6amuAamuAcnSJcXOIcnSJcXOIZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6ZWV6amuAamuAamuAamuAb3GGcXOIb3GGcXOIbW6DbW6DbW6DamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAbW6DbW6DZWV6ZWV6amuAamuAamuAZWV6amuAZWV6ZWV6amuAZWV6amuAZWV6ZWV6amuAamuAZWV6ZWV6amuAamuAZWV6amuAZWV6amuAamuAZWV6amuAZWV6ZWV6ZWV6amuAamuAamuAamuAbW6DbW6DamuAamuAbW6DbW6DamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAamuAZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2TgoedgoedZWV6bW+EZWV6bW+EZWV6ZWV6ZWV6ZWV6bW+EZWV6bW+EZWV6goedgoeden2Ten2TbW+Een2TbW+Een2TZWV6ZWV6bW+EbW+Een2Ten2Tgoedgoedgoedgoedgoedgoeden2TbW+Een2TbW+Een2Ten2Tgoedgoedd3mPd3mPfICWfICWd3mPd3mPd3mPd3mPfICWfICWgoedgoedOTk/OjpAOTk/OjpAOztBOztBOztBOztBODg9ODg9OTk/OTk/OztBOztBOztBOztBOTk/OjpAOTk/OjpANjY6NjY6Nzc8Nzc8PDxCOztBPDxCOztBNjY6NjY6Nzc8Nzc8NjY6NjY6Nzc8Nzc8OjpAOztBOjpAOztBOztBOjpAOztBOjpAOztBOjpAOztBOjpAOztBPDxCOztBPDxCOztBOztBOztBOztBOTk/OTk/OjpAOjpAOjpAOztBOjpAOztBNzc8Nzc8ODg9ODg9ODg9OTk/ODg9OTk/Nzc8ODg9Nzc8ODg9Nzc8Nzc8ODg9ODg9OztBOztBOztBOztBODg9ODg9OTk/OTk/Nzc8ODg9Nzc8ODg9OTk/OTk/OjpAOjpAODg9OTk/ODg9OTk/OztBPDxCOztBPDxCNjY6NjY6Nzc8Nzc8PDxCOztBPDxCOztBNzc8Nzc8ODg9ODg9NjY6NjY6Nzc8Nzc8PDxCOztBPDxCOztBOztBOztBOztBOztBOTk/OTk/OjpAOjpANzc8Nzc8ODg9ODg9OTk/OTk/OjpAOjpAODg9ODg9OTk/OTk/OztBOjpAOztBOjpAOjpAOztBOjpAOztBOztBPDxCOztBPDxCODg9ODg9OTk/OTk/OztBOztBOztBOztBNjY6Nzc8NjY6ODg9OTk/OjpAOztBOztBPDxCOztBOztBOjpAOTk/ODg9Nzc8Nzc8NjY6ODg9NjY6OTk/OjpAOztBOztBPDxCOztBOztBOjpAOTk/ODg9Nzc8NjY6NjY6Nzc8Nzc8Nzc8NjY6ODg9NjY6OTk/OjpAOztBOztBPDxCOztBOztBOjpAOTk/ODg9Nzc8NjY6Nzc8NjY6ODg9OTk/OjpAOztBOztBPDxCOztBOztBOjpAOTk/ODg9Nzc8NjY6NjY6Nzc8Nzc8Nzc8Nzc8ODg9ODg9NjY6NjY6Nzc8Nzc8PDxCOztBPDxCOztBOztBOztBOztBOztBOTk/OjpAOTk/OjpANzc8Nzc8ODg9ODg9OTk/OTk/OjpAOjpAODg9ODg9OTk/OTk/OjpAOztBOjpAOztBOztBPDxCOztBPDxCOztBOjpAOztBOjpAODg9ODg9OTk/OTk/OztBOztBOztBOztBX3bLX3bLZY7WZInUZInUZY7WX3bLX3bLXnLJXnLJXnLJXnLJX3bLZY7WX3bLZInUZY7WZInUX3bLX3bLXnLJXnLJX3bLYXvNYXvNXnLJYXvNXnLJYXvNYXvNXnLJYXvNXnLJXnLJXnLJYXvNX3bLYXvNXnLJXnLJXnLJXnLJYXvNYXvNYXvNYXvNYXvNYXvNYXvNYXvNX3bLZY7WX3bLZInUZInUZY7WX3bLX3bLXnLJXnLJX3bLXnLJXnLJX3bLXW3HXW3HXW3HXW3HXGjFXGjFXW3HXGjFXW3HXGjFX3PKXWzGXm/IXnHJX3bLXnHJX3bLXnHJX3bLXnLJXm/IXnLJXWzGX3bLXGjFX3bLXGjFXWzGXm/IXnHJXnHJX3bLXnHJXm/IXGjFXWzGXGjFXnLJXW3HXGjFXGjFXGjFXW3HXW3HXW3HXm/IXm/IXW3HXW3HXW3HXGjFXGjFX3bLXnLJX3bLXnHJXnHJXm/IX3bLXnLJXnHJXWzGX3bLXGjFX3bLX3PKXGjFXm/IXWzGXGjFXW3HXGjFXW3HXWzGXm/IXnHJXnHJXnLJX3bLXnHJXW3HXGjFXm/IXGjFXWzGXGjFX3bLX3PKX3bLXnLJXnLJX3bLXnLJXnLJX3bLX3PKXm/IXm/IXnLJXnLJZY7WZY7WZY7WZY7WZY7WZY7WZY7WZY7WX3bLYXvNX3bLZY7WYXvNZInUZY7WZInUWFq+ZY7WWFq+ZY7WZY7WZY7WZY7WZY7WWFq+WFq+ZY7WZY7WWFq+WFq+ZY7WZY7WWFq+WFq+ZY7WZY7W2tro2tro5OTu39/r5OTu2tro2tro39/r5OTu5OTuwcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj7wcHYwcHY0dHi0dHi6Ojw6Ojw+Pj7+Pj71Oz/3vD/1Oz/+v3/3vD/+v3/1Oz/1Oz/1Oz/1Oz/+v3/+v3/3fD/3fD/+v3/+v3/+v3/1Oz/+v3/3vD/1Oz/3vD/1Oz/1Oz//8Yb/+VN/8Yb/+JH/9Iu/8Yb/8Yb/9Iu/9Iu/8Yb/8Yb/9Iu/9Iu/+VN/8Yb/+JH/8Yb/9Iu/9Iu/9Iu/+JH/+JH/9Iu/9Iu/+JH/+JH0zY90zY9+mc/+mc/0zY90zY9+mc/+mc/",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcABwAGAAgACAAGAAkACQAGAAoACQAKAAsACwAKAAwACwAMAA0ACwANAA4ADgANAA8ADgAPABAADgAQABEAEQAQABIAEQASABMAEwASABQAEwAUABUAEwAVABYAFgAVABcAFgAXABgAGAAXABkAGAAZABoAGgAZABsAGgAbABwAGgAcAB0AHQAcAB4AHQAeAB8AHQAfACAAHQAgACEAIAAfACIAIAAiACMAIwAiACQAJAAiACUAJQAiACYAJQAmACcAJwAmACgAJwAoACkAJwApACoAKgApACsAKgArACwAKgAsAC0ALQAsAC4ALQAuAC8ALwAuADAALwAwADEALwAxADIAMgAxADMAMgAzADQANAAzADUANAA1ADYANgA1ADcANgA3ADgANgA4ADkAOQA4ADoAOQA6ADsAOQA7ADwAOQA8AD0AOQA9AD4APQA8AD8AQgBBAEAAQQBCAEMARgBFAEQARwBFAEYARwBGAEgASQBFAEcASgBFAEkASwBFAEoASwBMAEUATQBMAEsATgBMAE0ATgBPAEwAUABPAE4AUABRAE8AUgBRAFAAUwBRAFIAUwBUAFEAVQBUAFMAVQBWAFQAVwBWAFUAVwBYAFYAWQBYAFcAWgBYAFkAWgBbAFgAXABbAFoAXQBbAFwAWwBdAF4AXwBeAF0AXwBgAF4AXwBhAGAAXwBiAGEAYwBiAF8AYwBkAGIAYgBkAGUAZgBkAGMAZwBkAGYAZwBoAGQAaQBoAGcAagBoAGkAagBrAGgAbABrAGoAbABtAGsAbgBtAGwAbwBtAG4AbwBwAG0AcQBwAG8AcQByAHAAcwByAHEAcwB0AHIAdQB0AHMAdgB0AHUAdgB3AHQAeAB3AHYAeQB3AHgAdwB5AHoAewB6AHkAewB8AHoAewB9AHwAfgB9AHsAfQB+AH8AggCBAIAAgQCCAIMAgwCCAIQAhACCAIUAiACHAIYAhwCIAIkAiQCIAIoAigCIAIsAiwCIAIwAjwCOAI0AjgCPAJAAkwCSAJEAkgCTAJQAlwCWAJUAlgCXAJgAmwCaAJkAmgCbAJwAnwCeAJ0AngCfAKAAowCiAKEAogCjAKQApwCmAKUApgCnAKgApgCoAKkArACrAKoAqwCsAK0AsACvAK4ArwCwALEAtACzALIAswC0ALUAuAC3ALYAtwC4ALkAvAC7ALoAuwC8AL0AwAC/AL4AvwDAAMEAxADDAMIAwwDEAMUAyADHAMYAxwDIAMkAzADLAMoAywDMAM0A0ADPAM4AzwDQANEA1ADTANIA0wDUANUA0wDVANYA0wDWANcA0wDXANgA2wDaANkA2gDbANwA3wDeAN0A3gDfAOAA3gDgAOEA3gDhAOIA4gDhAOMA4wDhAOQA5wDmAOUA5gDnAOgA6wDqAOkA6gDrAOwA7ADrAO0A7QDrAO4A7QDuAO8A7QDvAPAA8wDyAPEA8gDzAPQA9wD2APUA9gD3APgA+wD6APkA+gD7APwA/wD+AP0A/gD/AAABAwECAQEBAgEDAQQBBwEGAQUBBgEHAQgBCwEKAQkBCgELAQwBDAELAQ0BEAEPAQ4BDwEQAREBFAETARIBEwEUARUBGAEXARYBFwEYARkBFwEZARoBHQEcARsBHAEdAR4BHgEdAR8BIgEhASABIQEiASMBJgElASQBJQEmAScBKgEpASgBKQEqASsBKwEqASwBLwEuAS0BLgEvATABMAEvATEBNAEzATIBMwE0ATUBOAE3ATYBNwE4ATkBPAE7AToBOwE8AT0BQAE/AT4BPwFAAUEBRAFDAUIBQwFEAUUBSAFHAUYBRwFIAUkBTAFLAUoBSwFMAU0BUAFPAU4BTwFQAVEBTwFRAVIBVQFUAVMBVAFVAVYBWQFYAVcBWAFZAVoBWAFaAVsBXgFdAVwBXQFeAV8BYgFhAWABYQFiAWMBZgFlAWQBZQFmAWcBagFpAWgBaQFqAWsBaQFrAWwBaQFsAW0BaQFtAW4BbgFtAW8BbwFtAXABcAFtAXEBcAFxAXIBbgFvAXMBcwF0AW4BdAFzAXUBcwFvAXYBdwF2AW8BdwFvAXgBdwF4AXkBegF5AXgBeQF6AXsBfAF2AXcBfAF3AX0BfAF9AX4BfgF9AX8BgAF2AXwBgQF2AYABgQGCAXYBggGBAYMBhgGFAYQBhQGGAYcBigGJAYgBiQGKAYsBjgGNAYwBjQGOAY8BjQGPAZABjQGQAZEBlAGTAZIBkwGUAZUBmAGXAZYBmAGZAZcBmgGZAZgBmwGZAZoBnAGZAZsBmQGcAZ0BngGdAZwBngGfAZ0BoAGfAZ4BnwGgAaEBpAGjAaIBowGkAaUBqAGnAaYBpwGoAakBrAGrAaoBqwGsAa0BsAGvAa4BrwGwAbEBtAGzAbIBswG0AbUBuAG3AbYBtwG4AbkBvAG7AboBuwG8Ab0BwAG/Ab4BvwHAAcEBxAHDAcIBwwHEAcUByAHHAcYBxwHIAckBzAHLAcoBywHMAc0B0AHPAc4BzwHQAdEB0QHQAdIB0gHQAdMB0QHUAc8BzwHUAdUB0QHWAdQB1gHVAdQB1QHWAdcB1gHYAdcB2QHWAdEB2QHYAdYB2QHaAdgB2wHaAdkB3AHaAdsB2gHcAd0B4AHfAd4B3wHgAeEB5AHjAeIB4wHkAeUB6AHnAeYB5wHoAekB7AHrAeoB6wHsAe0B8AHvAe4B7wHwAfEB9AHzAfIB8wH0AfUB9QH0AfYB9QH2AfcB9wH2AfgB9wH4AfkB/AH7AfoB+wH8Af0BAAL/Af4B/wEAAgECBAIDAgICAwIEAgUCCAIHAgYCBwIIAgkCDAILAgoCCwIMAg0CEAIPAg4CDwIQAhECFAITAhICEwIUAhUCGAIXAhYCFwIYAhkCHAIbAhoCGwIcAh0CHQIcAh4CHQIeAh8CHwIeAiACHwIgAiECJAIjAiICIwIkAiUCKAInAiYCJwIoAikCLAIrAioCKwIsAi0CMAIvAi4CMwIyAjECNgI1AjQCNQI2AjcCNwI2AjgCNwI4AjkCPAI7AjoCOwI8Aj0CQAI/Aj4CPwJAAkECRAJDAkICQwJEAkUCSAJHAkYCRwJIAkkCTAJLAkoCSwJMAk0CUAJPAk4CTwJQAlECVAJTAlICUwJUAlUCWAJXAlYCVwJYAlkCXAJbAloCWwJcAl0CYAJfAl4CXwJgAmECZAJjAmICYwJkAmUCaAJnAmYCZwJoAmkCbAJrAmoCawJsAm0CcAJvAm4CbwJwAnECdAJzAnICcwJ0AnUCeAJ3AnYCdwJ4AnkCfAJ7AnoCewJ8An0CgAJ/An4CfwKAAoEChAKDAoICgwKEAoUCiAKHAoYChwKIAokCjAKLAooCiwKMAo0CkAKPAo4CjwKQApEClAKTApICkwKUApUCmAKXApYClwKYApkCnAKbApoCmwKcAp0CoAKfAp4CnwKgAqECpAKjAqICowKkAqUCqAKnAqYCpwKoAqkCrAKrAqoCqwKsAq0CsAKvAq4CrwKwArECtAKzArICswK0ArUCuAK3ArYCtwK4ArkCvAK7AroCuwK8Ar0CwAK/Ar4CvwLAAsECxALDAsICwwLEAsUCyALHAsYCxwLIAskCzALLAsoCywLMAs0C0ALPAs4CzwLQAtEC1ALTAtIC0wLUAtUC2ALXAtYC1wLYAtkC3ALbAtoC2wLcAt0C4ALfAt4C3wLgAuEC4QLgAuIC4gLgAuMC4wLgAuQC5ALgAuUC5QLgAuYC5gLgAucC5wLgAugC6ALgAukC6QLgAuoC6gLgAusC6wLgAuwC7wLuAu0C7gLvAvAC8ALvAvEC8ALxAvIC8ALyAvMC8ALzAvQC8AL0AvUC8AL1AvYC8AL2AvcC8AL3AvgC8AL4AvkC8AL5AvoC8AL6AvsC/gL9AvwC/QL+Av8CAgMBAwADAQMCAwMDAwMCAwQDAwMEAwUDAwMFAwYDAwMGAwcDAwMHAwgDAwMIAwkDAwMJAwoDAwMKAwsDAwMLAwwDAwMMAw0DAwMNAw4DEQMQAw8DEAMRAxIDEgMRAxMDEwMRAxQDFAMRAxUDFQMRAxYDFgMRAxcDFwMRAxgDGAMRAxkDGQMRAxoDGgMRAxsDGwMRAxwDHAMRAx0DIAMfAx4DHwMgAyEDJAMjAyIDIwMkAyUDKAMnAyYDJwMoAykDLAMrAyoDKwMsAy0DMAMvAy4DLwMwAzEDNAMzAzIDMwM0AzUDOAM3AzYDNwM4AzkDPAM7AzoDOwM8Az0DQAM/Az4DPwNAA0EDRANDA0IDQwNEA0UDSANHA0YDRwNIA0kDTANLA0oDSwNMA00DUANPA04DTwNQA1EDVANTA1IDUwNUA1UDWANXA1YDVwNYA1kDWQNYA1oDWwNaA1gDXANaA1sDWgNcA10DYANfA14DXwNgA2EDZANjA2IDYwNkA2UDYwNlA2YDZgNlA2cDZgNnA2gDZgNoA2kDbANrA2oDawNsA20DbQNsA24DcQNwA28DcANxA3IDdQN0A3MDdAN1A3YDeQN4A3cDeAN5A3oDegN5A3sDfgN9A3wDfQN+A38DggOBA4ADgQOCA4MDhgOFA4QDhQOGA4cDigOJA4gDiwOJA4oDjAOJA4sDiQOMA40DjgONA4wDjQOOA48DkgORA5ADkQOSA5MDkwOSA5QDlAOSA5UDlgORA5MDkQOWA5cDmAOXA5YDmAOZA5cDmgOZA5gDmQOaA5sDngOdA5wDnQOeA58DoAOfA54DoAOhA58DoAOiA6EDoAOjA6IDpAOjA6ADpAOlA6MDpgOlA6QDpgOnA6UDqAOnA6YDqQOnA6gDqQOqA6cDqwOqA6kDqgOrA6wDrQOsA6sDrQOuA6wDrwOuA60DrwOwA64DrwOxA7ADrwOyA7EDrwOzA7IDrwO0A7MDtQO0A68DtQO2A7QDtQO3A7YDtQO4A7cDtwO4A7kDuQO4A7oDuwO4A7UDvAO4A7sDuAO8A70DwAO/A74DvwPAA8EDwQPAA8IDwAPDA8IDwgPDA8QDxQPDA8ADxQPGA8MDxQPHA8YDyAPHA8UDxwPIA8kDzAPLA8oDywPMA80DzQPMA84DzwPLA80DzgPMA9ADzwPRA8sDzgPQA9ID0wPRA88D0wPUA9ED1QPUA9MD1QPWA9QD0gPQA9cD2APWA9UD0gPXA9kD2QPXA9oD2gPXA9sD2wPXA9wD2wPcA90D3QPcA94D3wPWA9gD4APWA98D4QPWA+AD4gPWA+ED4wPWA+ID1gPjA+QD4wPiA+UD4wPlA+YD5gPlA+cD5wPlA+gD5wPoA+kD6QPoA+oD6QPqA+sD7gPtA+wD7QPuA+8D7wPuA/AD8APuA/ED8APxA/ID8gPxA/MD8wPxA/QD8wP0A/UD+AP3A/YD9wP4A/kD/AP7A/oD+wP8A/0D/gP6A/sD+wP9A/8D+gP+AwAE/wP9AwEEAAT+AwEEAAQBBP0DBAQDBAIEAwQEBAUEBgQCBAMEAwQFBAcEAgQGBAgEBwQFBAkECAQGBAkECAQJBAUEDAQLBAoECwQMBA0EEAQPBA4EDwQQBBEEFAQTBBIEEwQUBBUEGAQXBBYEFwQYBBkEHAQbBBoEGwQcBB0EIAQfBB4EHwQgBCEEIQQgBCIEJQQkBCMEJAQlBCYEJgQlBCcEKgQpBCgEKQQqBCsEKwQqBCwEKwQsBC0ELQQsBC4ELQQuBC8EMgQxBDAEMQQyBDMEMwQyBDQEMwQ0BDUENQQ0BDYENQQ2BDcEOgQ5BDgEOwQ5BDoEOwQ8BDkEPQQ8BDsEPQQ+BDwEPgQ9BD8EQgRBBEAEQQRCBEMERgRFBEQERQRGBEcESgRJBEgESQRKBEsETARJBEsESwRKBE0ETQRKBE4ETQROBE8EUgRRBFAEUQRSBFMEUwRSBFQEVwRWBFUEVgRXBFgEWwRaBFkEWgRbBFwEXwReBF0EXgRfBGAEYARfBGEEZARjBGIEYwRkBGUEaARnBGYEZwRoBGkEbARrBGoEawRsBG0EcARvBG4EbwRwBHEE",verts:1138,tris:754},ruedas:[[-.3,.3,.76],[.3,.3,.76],[-.3,.3,-.76],[.3,.3,-.76]]}},rueda:{min:[-.3,-.3,-.3],max:[.05,.3,.3],pos:"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",nor:"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",col:"Q0NMQ0NMQUFJQUFJNjY6NjY6OTk/Ojo/NjY6NjY6NjY6NjY6PDxDPj5EPz9HQUFJNjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6Q0NMQUFKQUFJPz9HNjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6Q0NMQUFKRUVOQ0NLQUFJPz9HQ0NMQUFKNjY6NjY6NjY6NjY6Ojo/Ojo/Pj5EPj5ERUVOQ0NLQ0NMQUFKNjY6NjY6NjY6NjY6Pj5EPj5EQUFJQUFJNjY6NjY6NjY6NjY6RUVPRUVPRUVORUVONjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6PDxDPz9HPj5EQUFJNjY6NjY6NjY6NjY6RUVORUVOQ0NMQ0NMRUVOQ0NLRUVPQ0NMOTk/PDxDOjo/Pj5ERUVPQ0NMRUVOQ0NLPj5EPj5EQUFJQUFJNjY6NjY6Ojo/Ojo/OTk/Ojo/PDxDPj5ENjY6NjY6Ojo/OTk/QUFJQUFJQ0NMQ0NMNjY6NjY6Ojo/Ojo/NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6Q0NLRUVOQUFKQ0NMNjY6NjY6NjY6NjY6Ojo/Ojo/Pj5EPj5ENjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6Q0NMQ0NMRUVORUVONjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6RUVORUVORUVPRUVPPz9HQUFJQUFKQ0NMNjY6NjY6NjY6NjY6Q0NLRUVOQ0NMRUVPQUFKQ0NMQ0NLRUVOOTk/PDxDOjo/Pj5ENjY6NjY6OTk/Ojo/NjY6NjY6NjY6NjY6PDxDPj5EPz9HQUFJNjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6PDxDPz9HPj5EQUFJNjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6QUFKQ0NMPz9HQUFJQ0NMRUVPQ0NLRUVONjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6NjY6Ojo/OTk/NjY6NjY6OTk/NjY6PDxDPz9HNjY6QUFKNjY6Q0NLNjY6Q0NMNjY6Q0NLNjY6QUFKNjY6Pz9HNjY6PDxDNjY6OTk/NjY6NjY6NjY6NjY6NjY6NjY6OTk/Ojo/PDxDPj5ENjY6OTk/NjY6NjY6PDxDNjY6NjY6Pz9HNjY6ODg9NjY6QUFKNjY6NjY6NjY6NjY6NjY6NjY6NjY6OjpAPDxDPj5FQ0NLPz9GNjY6NjY6NjY6NjY6NjY6Q0NMPz9HPz9GQ0NLPj5FQUFKPDxDNjY6Pz9HNjY6NjY6OjpAODg9NjY6NjY6PDxDNjY6OTk/NjY6naTElJu6pa3QrbXZjZOxtLzihoyonaTEoqrMmJ++ucLoqLDTrLTYgYeikpm3jpSyvMXssLjcsbrfvcbus7vgfoSeipGuiI+rvMXssbrfsLjcfYKch46qiI+rfoSeipGuucLorLTYqLDTgYeijpSykpm3tLzihoyooqrMmJ++naTErbXZjZOxpa3QlJu6naTEk5q5k5q5lp29lp29gIahgYeifYOdfoSfg4mkgYeigIahfoSfhoyoh46qipCtipCtgIahfYOdgIagfYKcjJOwjZOxjpWykJe1ipCtjJOwipCtjZOxgYeig4mkfoSfgIahipCtipCtjJOwjZOxgIahgIagfYOdfYKcg4qlhoyohYumh46qkZe1kpm3k5m4lZy7gIahfYOdgYeifoSfkpm3k5q5lZy7lp29jpWykJe1kZe1k5m4g4qlhYumhoyoh46qipCtjJOwh46qhYumjpWyg4mkkZe1gYeikpm3gIahk5q5gIagk5q5gIahk5q5gYeikpm3g4mkkZe1hYumjpWyh46qjJOwipCtk5q5k5q5lp29lp29kpm3kZe1lZy7k5m4k5q5kpm3lp29lZy7gIahg4qlg4mkhYumjpWykZe1kJe1k5m4gIahg4mkg4qlhYumhoyoipCth46qipCtjJOwjpWyjZOxkJe1",idx:"AgABAAAAAQACAAMABgAFAAQABQAGAAcACgAJAAgACQAKAAsADgANAAwADQAOAA8AEgARABAAEQASABMAFgAVABQAFQAWABcAGgAZABgAGQAaABsAHgAdABwAHQAeAB8AIgAhACAAIQAiACMAJgAlACQAJQAmACcAKgApACgAKQAqACsALgAtACwALQAuAC8AMgAxADAAMQAyADMANgA1ADQANQA2ADcAOgA5ADgAOQA6ADsAPgA9ADwAPQA+AD8AQgBBAEAAQQBCAEMARgBFAEQARQBGAEcASgBJAEgASQBKAEsATgBNAEwATQBOAE8AUgBRAFAAUQBSAFMAVgBVAFQAVQBWAFcAWgBZAFgAWQBaAFsAXgBdAFwAXQBeAF8AYgBhAGAAYQBiAGMAZgBlAGQAZQBmAGcAagBpAGgAaQBqAGsAbgBtAGwAbQBuAG8AcgBxAHAAcQByAHMAdgB1AHQAdQB2AHcAegB5AHgAeQB6AHsAfgB9AHwAfQB+AH8AggCBAIAAgQCCAIMAhgCFAIQAhQCGAIcAigCJAIgAiQCKAIsAjgCNAIwAjQCOAI8AkgCRAJAAkQCSAJMAlgCVAJQAlQCWAJcAmgCZAJgAmQCaAJsAngCdAJwAnQCeAJ8AogChAKAAoQCiAKMApgClAKQApQCmAKcAqgCpAKgAqQCqAKsArgCtAKwArQCuAK8AsgCxALAAsQCyALMAtgC1ALQAtQC2ALcAugC5ALgAuQC6ALsAvgC9ALwAvQC+AL8AwgDBAMAAwQDCAMMAxgDFAMQAxQDGAMcAygDJAMgAyQDKAMsAzgDNAMwAzQDOAM8A0gDRANAA0QDSANMA1gDVANQA1QDWANcA2gDZANgA2QDaANsA3gDdANwA3QDeAN8A4gDhAOAA4QDiAOMA5gDlAOQA5QDmAOcA6gDpAOgA6QDqAOsA7gDtAOwA7QDuAO8A8gDxAPAA8QDyAPMA9gD1APQA9QD2APcA+gD5APgA+QD6APsA/gD9APwA/QD+AP8AAgEBAQABAQECAQMBBgEFAQQBBQEGAQcBCgEJAQgBCQEKAQsBDgENAQwBDQEOAQ8BEgERARABEQESARMBFgEVARQBFQEWARcBGgEZARgBGQEaARsBGwEaARwBGwEcAR0BGwEdAR4BHgEdAR8BHgEfASABIAEfASEBIAEhASIBIgEhASMBIgEjASQBJAEjASUBJAElASYBJgElAScBJgEnASgBKAEnASkBKAEpASoBKgEpASsBKgErASwBLAErAS0BLAEtAS4BLgEtAS8BMgExATABMQEyATMBNgE1ATQBNQE2ATcBOgE5ATgBOQE6ATsBOQE7ATwBPAE7AT0BPAE9AT4BPgE/ATwBPgE9AUABPwE+AUEBQAE9AUIBPwFBAUMBQAFCAUQBRAFCAUUBRQFCAUYBRgFCAUcBRgFHAUgBSAFHAUkBSAFJAUoBQwFBAUsBQwFLAUwBQwFMAU0BQwFNAU4BTgFNAU8BSgFJAVABSgFQAVEBUQFQAVIBUgFQAVMBUgFTAVQBTgFPAVUBVQFPAVYBVQFWAVcBVQFXAVgBWAFXAVkBWAFZAVoBWgFZAVsBVAFTAVwBWgFbAV0BVAFcAV4BXgFcAV8BXQFbAWABXQFgAWEBXwFcAWIBXQFhAWIBYgFcAWMBXQFiAWQBZAFiAWMBZAFjAWUBZAFlAWYBZgFlAWcBagFpAWgBaQFqAWsBaQFrAWwBbAFrAW0BbAFtAW4BbgFtAW8BbQFwAW8BbgFvAXEBcAFtAXIBcAFyAXMBcwFyAXQBbgFxAXUBdQFxAXYBdQF2AXcBdAFyAXgBdAF4AXkBeQF4AXoBegF4AXsBegF7AXwBdQF3AX0BfQF3AX4BfQF+AX8BfAF7AYABfAGAAYEBgQGAAYIBfQF/AYMBgwF/AYQBgwGEAYUBgwGFAYYBhgGFAYcBggGAAYgBggGIAYkBiQGIAYoBhgGHAYsBiwGHAYwBiwGMAY0BigGIAY4BiwGNAY8BigGOAZABjwGNAZEBkAGOAZIBjwGRAZIBjwGSAY4BjwGOAZMBjwGTAZQBlAGTAZUBlAGVAZYBlgGVAZcBmgGZAZgBmQGaAZsBngGdAZwBnQGeAZ8BogGhAaABoQGiAaMBpgGlAaQBpQGmAacBqgGpAagBqQGqAasBrgGtAawBrQGuAa8BsgGxAbABsQGyAbMBtgG1AbQBtQG2AbcBugG5AbgBuQG6AbsBvgG9AbwBvQG+Ab8BwgHBAcABwQHCAcMBxgHFAcQBxQHGAccBygHJAcgByQHKAcsBzgHNAcwBzQHOAc8B0gHRAdAB0QHSAdMB1gHVAdQB1QHWAdcB2gHZAdgB2QHaAdsB2QHbAdwB3AHbAd0B3AHdAd4B3gHdAd8B3gHfAeAB4AHfAeEB4AHhAeIB4gHhAeMB4gHjAeQB5AHjAeUB5AHlAeYB5gHlAecB5gHnAegB6AHnAekB6AHpAeoB6gHpAesB6gHrAewB7AHrAe0B7AHtAe4B7gHtAe8B8gHxAfAB8QHyAfMB9gH1AfQB9QH2AfcB+gH5AfgB+QH6AfsB/gH9AfwB/QH+Af8BAgIBAgACAQICAgMCBgIFAgQCBQIGAgcCCgIJAggCCQIKAgsCDgINAgwCDQIOAg8C",verts:528,tris:332}};function po(i,t){let e=atob(i),n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return new t(n.buffer)}function ql(i){let t=po(i.pos,Int16Array),e=po(i.nor,Int8Array),n=po(i.col,Uint8Array),s=po(i.idx,Uint16Array),r=new Float32Array(t.length);for(let A=0;A<t.length;A+=3)for(let c=0;c<3;c++)r[A+c]=i.min[c]+(t[A+c]+32767)/65534*(i.max[c]-i.min[c]);let a=new Float32Array(e.length);for(let A=0;A<e.length;A++)a[A]=e[A]/127;let o=new ve;return o.setAttribute("position",new fe(r,3)),o.setAttribute("normal",new fe(a,3)),o.setAttribute("rgb",new fe(n,3)),o.setIndex(new fe(s,1)),o}function fg(i,t,e,n,s){let r=(.2126*i+.7152*t+.0722*e)/255;return s?r<.32?"goma":"llanta":Math.hypot(i-n[0],t-n[1],e-n[2])<42?"pintura":i>200&&t>150&&e<130?"faro":i>180&&t<120&&e<110?"stop":e>=250&&e-i>=4?"vidrio":r>.72?"blanco":r<.32?"oscuro":"moldura"}function dg(i){let t=new Map;for(let n=0;n<i.length;n+=3){let s=i[n],r=i[n+1],a=i[n+2];if(Math.max(s,r,a)-Math.min(s,r,a)<60||s>200&&r>150&&a<130&&r>190)continue;let o=(s>>3)+","+(r>>3)+","+(a>>3),A=t.get(o)||{n:0,c:[s,r,a]};A.n++,t.set(o,A)}let e=null;return t.forEach(n=>{(!e||n.n>e.n)&&(e=n)}),e?e.c:[255,255,255]}var pg={pintura:"#f7f8f8",vidrio:"#c6d2d8",moldura:"#e3e7e8",oscuro:"#ccd3d6",blanco:"#ffffff",faro:"#fff6e0",stop:"#e9b9ae",goma:"#c9cfd1",llanta:"#eef1f2"};function jl(i,t,e,n){let s=i.getAttribute("rgb").array,r=new Float32Array(s.length),a={},o=new Ut;for(let A=0;A<s.length;A+=3){let c=fg(s[A],s[A+1],s[A+2],e,n),l=t[c]||t.moldura;a[l]||(o.set(l),a[l]=[o.r,o.g,o.b]);let h=a[l];r[A]=h[0],r[A+1]=h[1],r[A+2]=h[2]}i.setAttribute("color",new fe(r,3))}var zA={};function mg(i){if(!zA[i]){let t=fo.modelos[i],e=ql(t.cuerpo),n=ql(fo.rueda);zA[i]={cuerpo:e,rueda:n,ruedas:t.ruedas,pintura:dg(e.getAttribute("rgb").array)}}return zA[i]}var $l=1.22,gg=.92,Tw=Object.keys(fo.modelos);function sr(i,t){let e=mg(i),n=Object.assign({},pg,t||{}),s=e.cuerpo.clone();jl(s,n,e.pintura,!1),s.scale(1,gg,$l);let r=[s];e.ruedas.forEach(A=>{let c=e.rueda.clone();jl(c,n,e.pintura,!0),A[0]>0&&c.rotateY(Math.PI),c.scale(.94,.94,.94),c.translate(A[0],A[1]*.94,A[2]*$l),r.push(c)}),r.forEach(A=>{A.deleteAttribute("rgb")});let a=er(r,!1);a.computeBoundingBox();let o=a.boundingBox.min.y;return a.translate(0,-o,0),a.computeBoundingSphere(),a}function th(i,t){return new Je({uniforms:{uColor:{value:new Ut(i)},uBorde:{value:new Ut(t)},uOpac:{value:0},uTiempo:{value:0}},vertexShader:`
      varying vec3 vN;
      varying vec3 vV;
      varying float vY;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vY = position.y;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform vec3 uColor;
      uniform vec3 uBorde;
      uniform float uOpac;
      uniform float uTiempo;
      varying vec3 vN;
      varying vec3 vV;
      varying float vY;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 1.8);
        float trama = smoothstep(0.55, 1.0, sin(vY * 30.0 - uTiempo * 2.4));
        float a = (0.2 + 0.62 * f + 0.1 * trama) * uOpac;
        vec3 c = mix(uColor, uBorde, clamp(f * 1.1 + trama * 0.25, 0.0, 1.0));
        gl_FragColor = vec4(c, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1,side:ze})}function eh(i,t,e){let n=new be,s=new Un({color:e,transparent:!0,opacity:0,depthWrite:!1}),r=new Un({color:e,transparent:!0,opacity:0,depthWrite:!1}),a=.07;[[i,a,0,-t/2],[i,a,0,t/2],[a,t,-i/2,0],[a,t,i/2,0]].forEach(([A,c,l,h])=>{let u=new Ft(new De(A,c),s);u.rotation.x=-Math.PI/2,u.position.set(l,.045,h),n.add(u)});let o=new Ft(new De(i-.25,t-.25),r);return o.rotation.x=-Math.PI/2,o.position.y=.04,n.add(o),n.userData.opacidad=A=>{s.opacity=A,r.opacity=A*.22},n}var WA=(i,t,e)=>Math.min(e,Math.max(t,i)),Sn=(i,t,e)=>i+(t-i)*e,Ie=(i,t,e)=>WA((i-t)/(e-t),0,1),rr=i=>i*i*(3-2*i),ns=i=>i*i*i*(i*(i*6-15)+10),Eg=i=>i*i,wg=i=>1-(1-i)*(1-i);function xg(){try{let i=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(i.getContext("webgl2")||i.getContext("webgl")))}catch(i){return!1}}function VA(i){return new Ui(i.map(([t,e])=>new P(t,0,e)),!1,"centripetal",.5)}function nh(i,t,e){let n=0,s=1/0,r=new P;for(let a=0;a<=600;a++){i.getPointAt(a/600,r);let o=(r.x-t)**2+(r.z-e)**2;o<s&&(s=o,n=a/600)}return n}var mo=new P;function YA(i,t,e,n){e=WA(e,0,1),t.getPointAt(e,i.position),t.getTangentAt(Math.min(e,.9995),mo),n&&mo.negate(),i.rotation.y=Math.atan2(mo.x,mo.z)}var Dn={general:{t:[10,0,-12],yaw:-36,pitch:31,dist:100,movil:{t:[0,0,-7],yaw:-56,pitch:36,dist:66}},llegada:{t:[-.8,.4,3.4],yaw:62,pitch:30,dist:15},entrega:{t:[-3.2,.4,4.6],yaw:24,pitch:38,dist:17},terminal:{t:[56,2,-21],yaw:22,pitch:21,dist:30}};function ar(i,t,e){let n=t.yaw-i.yaw;return n>180&&(n-=360),n<-180&&(n+=360),{t:[Sn(i.t[0],t.t[0],e),Sn(i.t[1],t.t[1],e),Sn(i.t[2],t.t[2],e)],yaw:i.yaw+n*e,pitch:Sn(i.pitch,t.pitch,e),dist:Sn(i.dist,t.dist,e)}}function ih(){let i=document.querySelector("[data-escena]");if(!i)return;let t=document.documentElement;if(!xg()){t.classList.add("sin-3d");return}let e=window.matchMedia("(max-width: 767px)").matches,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s;try{s=new Ao({canvas:i,antialias:!0,powerPreference:"high-performance"})}catch($){t.classList.add("sin-3d");return}s.setPixelRatio(Math.min(window.devicePixelRatio||1,e?1.6:1.75)),s.shadowMap.enabled=!0,s.shadowMap.type=ca,s.toneMapping=Ea,s.toneMappingExposure=1.02;let r=new ii;r.background=new Ut(Me.fondo),r.fog=new _s(Me.fondo,80,260);let a=new ji(s);r.environment=a.fromScene(new ho,.04).texture,r.environmentIntensity=.32;let o=new Vs("#ffffff","#d3ddda",1.35);r.add(o);let A=new ks("#fffdf8",2.3),c=new P(-.55,1,.42).normalize();A.castShadow=!0,A.shadow.mapSize.set(e?1024:2048,e?1024:2048),A.shadow.bias=-4e-4,A.shadow.normalBias=.03,A.shadow.radius=3;let l=A.shadow.camera;l.near=1,l.far=220,r.add(A,A.target),Jl(r);let h=ir,u=["sedan","suv","sedan-sports","hatchback-sports","suv-luxury","sedan","suv"],d=h.xCajones[12],m=(h.filaB2.z0+h.filaB2.z1)/2,E=[],p=11,f=()=>(p=p*16807%2147483647,p/2147483647);[{z:(h.filaA.z0+h.filaA.z1)/2,rot:Math.PI,lleno:.86},{z:(h.filaB1.z0+h.filaB1.z1)/2,rot:0,lleno:.7},{z:m,rot:Math.PI,lleno:.74}].forEach(($,st)=>{h.xCajones.forEach((xt,T)=>{let nt=st===2&&xt===d,lt=st===2&&Math.abs(xt-d)<2.2&&!nt;nt||!lt&&f()>$.lleno||E.push({modelo:u[Math.floor(f()*u.length)],x:xt+(f()-.5)*.14,z:$.z+(f()-.5)*.18,rot:$.rot+(f()-.5)*.05,tono:.9+f()*.1})})});let C={};E.forEach($=>(C[$.modelo]=C[$.modelo]||[]).push($));let x=new Ue({vertexColors:!0,roughness:.6,metalness:0}),S=new se,_=new An,R=new Qe,F=new P(1,1,1),B=new Ut;Object.keys(C).forEach($=>{let st=C[$],xt=new si(sr($),x,st.length);st.forEach((T,nt)=>{_.setFromEuler(R.set(0,T.rot,0)),S.compose(new P(T.x,0,T.z),_,F),xt.setMatrixAt(nt,S),xt.setColorAt(nt,B.setScalar(T.tono))}),xt.castShadow=!0,xt.receiveShadow=!0,r.add(xt)});let w=sr("sedan",{vidrio:"#2b3a44",moldura:"#dde2e4",oscuro:"#a9b3b8",stop:"#d8594b"}),D=new Ft(w,x);D.castShadow=!0,D.receiveShadow=!0,r.add(D);let O=th("#1d78b5","#8fe3ff"),b=new Ft(w,O);b.position.set(d,.02,m),b.rotation.y=Math.PI,b.renderOrder=2,r.add(b);let L=eh(h.cajon.ancho-.2,h.cajon.fondo-.2,"#2a8fd0");L.position.set(d,0,m),r.add(L);let U=new Ft(sr("van",{pintura:Me.naranja,vidrio:"#20323d",moldura:"#3b454c",oscuro:"#2a3238",goma:"#3a4247",llanta:"#c9cfd1"}),new Ue({vertexColors:!0,roughness:.5,metalness:0}));U.castShadow=!0,U.receiveShadow=!0,r.add(U);{let $=Zl(),st=new Ue({map:$,transparent:!0,roughness:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});[1,-1].forEach(xt=>{let T=new Ft(new De(.9,.5994466646172764),st);T.position.set(xt*.765,.78,-.35),T.rotation.y=xt*Math.PI/2,U.add(T)})}let G=Xl("#f5f7f7");G.visible=!1,r.add(G);let k=UA();r.add(k);let z=UA();z.position.set(58,1.5*.62+.55,-73),z.rotation.y=-Math.PI/2+.5,r.add(z);let j=[];[["suv",1,0],["sedan-sports",-1,40],["hatchback-sports",1,95],["sedan",-1,130],["suv-luxury",1,170]].forEach(([$,st,xt])=>{let T=new Ft(sr($),x);T.castShadow=!0,T.position.z=st>0?h.carrilEste:h.carrilOeste,T.rotation.y=st>0?Math.PI/2:-Math.PI/2,T.userData={dir:st,base:xt},r.add(T),j.push(T)});let At=VA([[-40,h.carrilEste],[-18,h.carrilEste],[-3,h.carrilEste],[3.2,21.7],[5.6,19.2],[5.9,15.6],[5.9,11.2],[5.4,8],[3.6,6.3],[1.8,5.9],[.5,5.7],[-.5,5],[d,3.7],[d,2.6],[d,m]]),ft=nh(At,2.2,5.95),Tt=nh(At,-30,h.carrilEste),zt=-7.2,Zt=6.2,Jt=VA([[zt,Zt],[-3,6.2],[2,6.2],[4.6,7.3],[5.9,10.2],[6,13.6],[6.6,17.4],[9.2,21.3],[14,h.carrilEste],[30,h.carrilEste],[40.5,h.carrilEste],[43.6,21],[h.acceso.x-.9,17.5],[h.acceso.x-.9,4],[h.acceso.x-.9,-12.8],[46.2,-16.7],[49.5,-17.6],[55,-17.7],[59,-17.7]]),K=VA([[d-1.05,m-.2],[d-1.2,3.9],[-3.1,7.1],[-4.8,7.45],[zt+.9,Zt+1.2]]),rt=K.getLength();function Ct($,st){let xt;$<.15?xt=Tt:$<1?xt=Sn(Tt,ft,rr(Ie($,.15,1))):xt=Sn(ft,1,wg(Ie($,1,1.42))),YA(D,At,xt);let T=Ie($,.45,.85)*(1-Ie($,1.28,1.46)),nt=.85+.15*Math.sin(st*2.6);O.uniforms.uOpac.value=T*(n?1:nt),O.uniforms.uTiempo.value=st,b.visible=T>.001,L.userData.opacidad(T*.9),L.visible=b.visible;let lt=Ie($,1.42,1.52),gt=Ie($,1.52,1.93),at=Ie($,1.93,2);if(G.visible=lt>0&&at<1,G.visible){YA(G,K,rr(gt));let Te=Math.min(rr(lt),1-rr(at));G.scale.setScalar(Math.max(.001,Te));let In=Math.sin(rr(gt)*rt*3.1),Oe=gt>0&&gt<1?.55:0;G.userData.piernas[0].rotation.x=In*Oe,G.userData.piernas[1].rotation.x=-In*Oe}let tt=ns(Ie($,2.04,2.96));YA(U,Jt,tt);let St=Ie($,2.98,3.52),Nt=Ie($,3.5,4.12),te=Sn(14,72,Eg(St)),qt=1.5*.62+.55,Xe=0;Nt>0&&(te=72+Nt*120,qt+=32*Math.pow(Nt,1.35),Xe=Math.min(.2,Nt*1.2)),k.position.set(te,qt,h.pista.z),k.rotation.set(0,0,Xe),k.userData.tren.scale.setScalar(Nt>.18?.001:1),j.forEach(Te=>{let In=Te.userData,Oe=In.base+In.dir*$*26;Oe=((Oe+80)%280+280)%280-80,Te.position.x=Oe})}let _t=new Be(e?44:34,1,.5,900),yt=new P;function Wt($){let st=Xt<1&&Dn.general.movil?Dn.general.movil:Dn.general;if($<=1)return ar(st,Dn.llegada,ns(Ie($,0,1)));if($<=2)return ar(Dn.llegada,Dn.entrega,ns(Ie($,1,2)));if($<=3){let nt=$-2;yt.copy(U.position);let lt={t:[yt.x,.6,yt.z],yaw:Sn(-16,30,nt),pitch:27,dist:24},gt=ar(Dn.entrega,lt,ns(Ie(nt,0,.22)));return gt=ar(gt,Dn.terminal,ns(Ie(nt,.8,1))),gt}let xt=$-3,T={t:[k.position.x-3,k.position.y+1,k.position.z],yaw:-68,pitch:11,dist:38};return ar(Dn.terminal,T,ns(Ie(xt,0,.45)))}let Xt=1,I=1,et=1,Z=new P;function q($){let st=Wt($),xt=Xt<1?1+(1/Xt-1)*.42:1,T=st.dist*xt,nt=so.degToRad(st.yaw),lt=so.degToRad(st.pitch);Z.set(st.t[0],st.t[1],st.t[2]),_t.position.set(Z.x+T*Math.sin(nt)*Math.cos(lt),Z.y+T*Math.sin(lt),Z.z+T*Math.cos(nt)*Math.cos(lt)),_t.lookAt(Z),r.fog.near=T*1.05,r.fog.far=T*3.4+60;let gt=WA(T*.9,22,70);l.left=-gt,l.right=gt,l.top=gt,l.bottom=-gt,l.updateProjectionMatrix();let at=2*gt/A.shadow.mapSize.x;A.target.position.set(Math.round(Z.x/at)*at,0,Math.round(Z.z/at)*at),A.position.copy(A.target.position).addScaledVector(c,100)}function X(){et=i.clientWidth||window.innerWidth,I=i.clientHeight||window.innerHeight,Xt=et/I,s.setSize(et,I,!1),_t.aspect=Xt,Xt<1?_t.setViewOffset(et,I,0,I*.13,et,I):_t.setViewOffset(et,I,-et*.14,I*.02,et,I),_t.updateProjectionMatrix(),vt()}let pt=Array.prototype.slice.call(document.querySelectorAll("[data-paso]")),ot=document.querySelector(".sobre-hero"),dt=[];function Qt(){let $=window.innerHeight,st=window.scrollY||window.pageYOffset;dt=pt.map(xt=>{let T=xt.getBoundingClientRect(),nt=T.top+st;return{a:nt-$*.55,b:nt+T.height-$*1.15}})}function Ht(){let $=window.scrollY||window.pageYOffset,st=0;for(let xt=0;xt<dt.length;xt++){let T=dt[xt];if($<T.a)break;st=xt+Ie($,T.a,Math.max(T.a+1,T.b))}return st}let y=new URLSearchParams(location.search).get("s"),g=y!==null?parseFloat(y):null,H=g!==null?g:0,V=H,it=!0,J=!1,bt=performance.now(),ut=new Js;function vt(){J||!it||(J=!0,requestAnimationFrame(Dt))}function Dt($){J=!1;let st=Math.min(.1,($-bt)/1e3);bt=$,H=g!==null?g:Ht();let xt=n?1:1-Math.exp(-st*5.5);V+=(H-V)*xt,Math.abs(H-V)<4e-4&&(V=H);let T=ut.getElapsedTime();Ct(V,T),q(V),s.render(r,_t),(V!==H||b.visible&&!n)&&vt()}function ct(){if(ot){let $=document.querySelector(".nav");it=ot.getBoundingClientRect().top>($?$.offsetHeight:0)}vt()}X(),Qt(),window.addEventListener("scroll",ct,{passive:!0});let wt=window.innerWidth,Pt=()=>{Qt(),(window.innerWidth!==wt||Math.abs(i.clientHeight-I)>4)&&(wt=window.innerWidth,X()),vt()};window.addEventListener("resize",Pt),"ResizeObserver"in window&&new ResizeObserver(Pt).observe(document.body),document.addEventListener("visibilitychange",()=>{document.hidden||vt()}),document.fonts&&document.fonts.ready&&document.fonts.ready.then(Pt),t.classList.add("con-3d"),vt(),window.__pdEscena={etapa:$=>{g=H=V=$,vt()}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ih):ih();})();
