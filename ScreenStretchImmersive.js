
(function(){
'use strict';

const S=54,E=8,D=2500,V=16;
let b=document.createElement('button'),t=null,drag=0,moved=0,hidden=0,side='right',top=null,sx,sy,sl,st;

b.id='combined-fullscreen-button';
b.textContent='⛶';
Object.assign(b.style,{
position:'fixed',width:S+'px',height:S+'px',padding:0,margin:0,
border:'2px solid rgba(255,255,255,.85)',borderRadius:'50%',
background:'rgba(0,0,0,.75)',color:'#fff',fontSize:'24px',
lineHeight:S+'px',textAlign:'center',zIndex:2147483647,
cursor:'pointer',touchAction:'none',userSelect:'none',
WebkitUserSelect:'none',boxSizing:'border-box',
transition:'left .25s ease,right .25s ease,top .15s ease,opacity .2s ease'
});

document.body.appendChild(b);

function pos(){
 if(top==null)top=innerHeight-S-20;
 top=Math.max(0,Math.min(top,innerHeight-S));
 b.style.top=top+'px';
 b.style.bottom='';
 if(side==='left'){
  b.style.left=E+'px';
  b.style.right='';
 }else{
  b.style.right=E+'px';
  b.style.left='';
 }
}

function show(){
 hidden=0;
 b.style.opacity='1';
 b.style.pointerEvents='auto';
 pos();
 clearTimeout(t);
 t=setTimeout(hide,D);
}

function hide(){
 if(drag)return;
 hidden=1;
 b.style.opacity='.35';
 if(side==='left'){
  b.style.left=(-S+V)+'px';
  b.style.right='';
 }else{
  b.style.right=(-S+V)+'px';
  b.style.left='';
 }
}

function wake(){show()}

function styles(){
 document.body.style.cssText+=';height:100dvh!important;width:100dvw!important;margin:0!important;padding:0!important;overflow:hidden!important;overscroll-behavior:none!important';
 document.documentElement.style.cssText+=';height:100dvh!important;width:100dvw!important;margin:0!important;padding:0!important;overflow:hidden!important;position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important';

 let m=document.querySelector('meta[name="viewport"]');
 if(!m){
  m=document.createElement('meta');
  m.name='viewport';
  document.head.appendChild(m);
 }
 m.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover';

 let x=document.getElementById('combined-screen-stretch-style');
 if(!x){
  x=document.createElement('style');
  x.id='combined-screen-stretch-style';
  document.head.appendChild(x);
 }
 x.textContent=`
html,body,#root,#app,.deviceControl-page{
margin:0!important;padding:0!important;width:100vw!important;height:100vh!important;
background:#000!important;overflow:hidden!important}
#device{
position:fixed!important;top:0!important;left:0!important;
width:100vw!important;height:100vh!important;
display:flex!important;justify-content:center!important;align-items:center!important;
z-index:1!important}
#phoneVideo{
width:100vw!important;height:100vh!important;
object-fit:fill!important;transform:none!important;margin:0!important;z-index:1!important}
.touch-box{
position:fixed!important;top:0!important;left:0!important;
width:100vw!important;height:100vh!important;z-index:2!important}
.vdr-container{position:absolute!important;z-index:3!important}`;
}

function reset(){
 ['height','width','margin','padding','overflow','overscrollBehavior'].forEach(x=>document.body.style[x]='');
 ['height','width','margin','padding','overflow','position','top','left','right','bottom'].forEach(x=>document.documentElement.style[x]='');
 let x=document.getElementById('combined-screen-stretch-style');
 if(x)x.remove();
}

function full(){return !!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)}

async function enter(){
 try{
  let e=document.documentElement;
  if(e.requestFullscreen)await e.requestFullscreen();
  else if(e.webkitRequestFullscreen)await e.webkitRequestFullscreen();
  else if(e.mozRequestFullScreen)await e.mozRequestFullScreen();
  else if(e.msRequestFullscreen)await e.msRequestFullscreen();
 }catch(e){}
 styles();
 wake();
}

async function exit(){
 try{
  if(document.exitFullscreen)await document.exitFullscreen();
  else if(document.webkitExitFullscreen)await document.webkitExitFullscreen();
  else if(document.mozCancelFullScreen)await document.mozCancelFullScreen();
  else if(document.msExitFullscreen)await document.msExitFullscreen();
 }catch(e){}
}

function toggle(){full()?exit():enter()}

function down(e){
 e.preventDefault();
 if(hidden)wake();
 drag=1;moved=0;
 let r=b.getBoundingClientRect();
 sx=e.clientX;sy=e.clientY;sl=r.left;st=r.top;
 b.style.transition='none';
 try{b.setPointerCapture(e.pointerId)}catch(x){}
}

function move(e){
 if(!drag)return;
 e.preventDefault();
 let dx=e.clientX-sx,dy=e.clientY-sy;
 if(Math.abs(dx)>6||Math.abs(dy)>6)moved=1;
 let l=Math.max(0,Math.min(sl+dx,innerWidth-S));
 let y=Math.max(0,Math.min(st+dy,innerHeight-S));
 b.style.left=l+'px';
 b.style.top=y+'px';
 b.style.right='';
 b.style.bottom='';
}

function up(e){
 if(!drag)return;
 drag=0;
 try{b.releasePointerCapture(e.pointerId)}catch(x){}
 b.style.transition='left .25s ease,right .25s ease,top .15s ease,opacity .2s ease';
 let r=b.getBoundingClientRect();
 top=r.top;
 side=r.left+S/2<innerWidth/2?'left':'right';
 pos();
 if(!moved)toggle();
 show();
}

b.addEventListener('pointerdown',down,{passive:false});
b.addEventListener('pointermove',move,{passive:false});
b.addEventListener('pointerup',up,{passive:false});
b.addEventListener('pointercancel',up,{passive:false});

function change(){
 if(full())styles();
 else reset();
 wake();
}

document.addEventListener('fullscreenchange',change);
document.addEventListener('webkitfullscreenchange',change);
document.addEventListener('mozfullscreenchange',change);
document.addEventListener('MSFullscreenChange',change);

window.addEventListener('orientationchange',()=>{
 if(full())setTimeout(()=>{styles();pos()},300);
});

window.addEventListener('resize',()=>{
 if(full())setTimeout(()=>{styles();pos()},100);
});

top=innerHeight-S-20;
pos();
show();

if(full())styles();

})();
