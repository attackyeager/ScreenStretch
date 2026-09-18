(function(){
'use strict';

const SIZE=54,EDGE=8,HIDE=2500,SHOW=16;
let b=document.createElement('button'),timer,side='right',top=null;
let dragging=false,moved=false,sx,sy,sl,st,active=false;

b.textContent='⛶';
b.id='screenstretch-button';

Object.assign(b.style,{
position:'fixed',
width:SIZE+'px',
height:SIZE+'px',
padding:'0',
margin:'0',
border:'2px solid white',
borderRadius:'50%',
background:'rgba(0,0,0,.75)',
color:'white',
fontSize:'24px',
lineHeight:SIZE+'px',
textAlign:'center',
zIndex:'2147483647',
touchAction:'none',
userSelect:'none',
boxSizing:'border-box',
transition:'left .25s,right .25s,top .15s,opacity .2s'
});

document.body.appendChild(b);

function position(){
 if(top===null)top=innerHeight-SIZE-20;
 top=Math.max(0,Math.min(top,innerHeight-SIZE));
 b.style.top=top+'px';
 b.style.bottom='';
 if(side==='left'){
  b.style.left=EDGE+'px';
  b.style.right='';
 }else{
  b.style.right=EDGE+'px';
  b.style.left='';
 }
}

function show(){
 b.style.opacity='1';
 b.style.pointerEvents='auto';
 position();
 clearTimeout(timer);
 timer=setTimeout(hide,HIDE);
}

function hide(){
 if(dragging)return;
 b.style.opacity='.35';
 if(side==='left'){
  b.style.left=(-SIZE+SHOW)+'px';
  b.style.right='';
 }else{
  b.style.right=(-SIZE+SHOW)+'px';
  b.style.left='';
 }
}

function apply(){
 active=true;

 document.documentElement.style.cssText+=
 ';margin:0!important;padding:0!important;width:100vw!important;height:100vh!important;overflow:hidden!important';

 document.body.style.cssText+=
 ';margin:0!important;padding:0!important;width:100vw!important;height:100vh!important;overflow:hidden!important;overscroll-behavior:none!important';

 let s=document.getElementById('screenstretch-style');

 if(!s){
  s=document.createElement('style');
  s.id='screenstretch-style';
  document.head.appendChild(s);
 }

 s.textContent=`
html,body,#root,#app,.deviceControl-page{
margin:0!important;
padding:0!important;
width:100vw!important;
height:100vh!important;
overflow:hidden!important;
background:#000!important
}

#device{
position:fixed!important;
top:0!important;
left:0!important;
width:100vw!important;
height:100vh!important;
display:flex!important;
justify-content:center!important;
align-items:center!important;
z-index:1!important
}

#phoneVideo{
width:100vw!important;
height:100vh!important;
object-fit:fill!important;
transform:none!important;
margin:0!important;
z-index:1!important
}

.touch-box{
position:fixed!important;
top:0!important;
left:0!important;
width:100vw!important;
height:100vh!important;
z-index:2!important
}

.vdr-container{
position:absolute!important;
z-index:3!important
}`;
 
 show();
}

function reset(){
 active=false;

 let s=document.getElementById('screenstretch-style');
 if(s)s.remove();

 document.documentElement.style.margin='';
 document.documentElement.style.padding='';
 document.documentElement.style.width='';
 document.documentElement.style.height='';
 document.documentElement.style.overflow='';

 document.body.style.margin='';
 document.body.style.padding='';
 document.body.style.width='';
 document.body.style.height='';
 document.body.style.overflow='';
 document.body.style.overscrollBehavior='';

 show();
}

function toggle(){
 active?reset():apply();
}

b.addEventListener('pointerdown',function(e){
 e.preventDefault();

 if(b.style.opacity!== '1'){
  show();
 }

 dragging=true;
 moved=false;

 let r=b.getBoundingClientRect();

 sx=e.clientX;
 sy=e.clientY;
 sl=r.left;
 st=r.top;

 b.style.transition='none';

 try{b.setPointerCapture(e.pointerId)}catch(x){}
});

b.addEventListener('pointermove',function(e){
 if(!dragging)return;

 e.preventDefault();

 let dx=e.clientX-sx;
 let dy=e.clientY-sy;

 if(Math.abs(dx)>6||Math.abs(dy)>6)moved=true;

 let x=Math.max(0,Math.min(sl+dx,innerWidth-SIZE));
 let y=Math.max(0,Math.min(st+dy,innerHeight-SIZE));

 b.style.left=x+'px';
 b.style.right='';
 b.style.top=y+'px';
});

b.addEventListener('pointerup',function(e){
 if(!dragging)return;

 dragging=false;

 try{b.releasePointerCapture(e.pointerId)}catch(x){}

 b.style.transition='left .25s,right .25s,top .15s,opacity .2s';

 let r=b.getBoundingClientRect();

 top=r.top;
 side=(r.left+SIZE/2)<innerWidth/2?'left':'right';

 position();

 if(!moved)toggle();

 show();
});

b.addEventListener('pointercancel',function(){
 dragging=false;
 show();
});

window.addEventListener('resize',function(){
 if(active)apply();
 position();
});

window.addEventListener('orientationchange',function(){
 setTimeout(function(){
  if(active)apply();
  position();
 },300);
});

top=innerHeight-SIZE-20;
position();
show();

})();
