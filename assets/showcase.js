/* ===== EDIT HERE: your real work. Format: [title, label, year, description, [tags], image path, link] ===== */
(function(){
var D={
creative:{b:'',i:[
['Wall Signage Mockup','LOGO DESIGN','Velotix','',[],'','','','assets/creative-velotix-sign.webp','Velotix signage mockup with the logo on a dark wall panel'],
['Glass App Icon','LOGO DESIGN','axilo.co','',[],'','','','assets/creative-axilo-glass.webp','axilo.co logo on a glass app icon'],
['Backpack Mockup','LOGO DESIGN','axilo.co','',[],'','','','assets/creative-axilo-backpack.webp','axilo.co logo on a leather backpack'],
['Handbag Mockup','LOGO DESIGN','axilo.co','',[],'','','','assets/creative-axilo-handbag.webp','axilo.co logo on a purple handbag'],
['Logo Presentation','LOGO DESIGN','Codeloom','',[],'','','','assets/creative-codeloom-presentation.webp','Codeloom logo design presentation slide'],
['Metal Sign Mockup','LOGO DESIGN','Codeloom','',[],'','','','assets/creative-codeloom-metal.webp','Codeloom logo as a 3D metal sign'],
['Pen Mockup','LOGO DESIGN','Codeloom','',[],'','','','assets/creative-codeloom-pens.webp','Codeloom logo on red pens'],
['Pole Sign Mockup','LOGO DESIGN','Prime Anchor','',[],'','','','assets/creative-primeanchor-pole.webp','Prime Anchor logo on a cube pole sign'],
['Gold Leather Emboss','LOGO DESIGN','VistaDwelling','',[],'','','','assets/creative-vistadwelling-leather.webp','VistaDwelling logo embossed in gold on leather'],
['Reception Wall Mockup','LOGO DESIGN','VistaDwelling','',[],'','','','assets/creative-vistadwelling-reception.webp','VistaDwelling logo on a reception wall and desk'],
['App Icon','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-icon.webp','Nestora logo icon in an app icon mockup'],
['Gold Leather Emboss','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-leather.webp','Nestora logo embossed in gold on leather'],
['Mug Mockup','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-mug.webp','Nestora logo on a white mug'],
['Office Wall Sign','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-office.webp','Nestora 3D logo sign in an office'],
['Stationery Set','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-stationery.webp','Nestora logo on business cards and an envelope'],
['Social Post Mockup','LOGO DESIGN','Nestora','',[],'','','','assets/creative-nestora-social.webp','Nestora logo in a social media post mockup'],
['Brand Board','LOGO DESIGN','NeuroLynx','',[],'','','','assets/creative-neurolynx-board.webp','NeuroLynx brand identity board with logo, font and app icons'],
['Paper Mockup','LOGO DESIGN','NeuroLynx','',[],'','','','assets/creative-neurolynx-paper.webp','NeuroLynx logo printed on paper'],
['Keychain Mockup','LOGO DESIGN','Velotix','',[],'','','','assets/creative-velotix-keychain.webp','Velotix logo on a keychain']]},
video:{b:'WATCH VIDEO',i:[
['Barishal Documentary','DOCUMENTARY','2026','A documentary on Barishal’s rivers, history and heritage, 1972–2026.',['Documentary','Storytelling'],'https://i.ytimg.com/vi/C_hQ9e2Em7k/maxresdefault.jpg','https://youtu.be/C_hQ9e2Em7k'],
['Pro Video Project','VIDEO','2026','A professional video editing project.',['Video Editing'],'https://i.ytimg.com/vi/PEiZWLCeCVo/maxresdefault.jpg','https://youtu.be/PEiZWLCeCVo'],
['Real Estate Video Edit','REAL ESTATE','2026','Real estate video edited as an online class project.',['Real Estate','Editing'],'https://i.ytimg.com/vi/EGfD7Epfa1g/maxresdefault.jpg','https://youtu.be/EGfD7Epfa1g'],
['Amazon Product Promo','PRODUCT PROMO','2026','Promotional video edit for an Amazon product.',['Amazon','Promo'],'https://i.ytimg.com/vi/ROGE2UEPQGk/maxresdefault.jpg','https://youtu.be/ROGE2UEPQGk']]},
feedback:{b:'',i:[
['Maisha Akther','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-1.webp','Google review from Maisha Akther about the YouTube Marketing course'],
['Sume Akter','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-2.webp','Google review from Sume Akter about the YouTube Marketing course'],
['Shabiha Shiuly','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-3.webp','Google review from Shabiha Shiuly about the YouTube Marketing course'],
['Nayeem Hossain','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-4.webp','Google review from Nayeem Hossain about the YouTube Marketing course'],
['Md Nazmul ND','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-5.webp','Google review from Md Nazmul about the Video Editing course'],
['AntohiN AriF','GOOGLE REVIEW','★ 5.0','',[],'','','','assets/review-google-6.webp','Google review from Md Ariful Haque about the Video Editing course, with a reply from the owner'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-1.webp','Student comments on a class post saying the class was very good'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-2.webp','Student thanking the mentor for explaining Premiere Pro clearly'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-3.webp','Students sharing how they liked today’s class'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-4.webp','Students saying the class was good and amazing'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-5.webp','Students reacting to the first class'],
['Class group feedback','CLASS GROUP · FACEBOOK','Facebook','',[],'','','','assets/feedback-facebook-comments-6.webp','Students asking for class recordings and praising the lesson']]}
};
/* student video reviews: [name, course, short quote, video link (YouTube or .mp4), thumbnail path (optional: YouTube thumbnail is used automatically)] */
var V=[['Student 1','Video Review','Watch this student’s honest feedback.','https://www.youtube.com/watch?v=Tb6jZpt4EqU',''],['Student 2','Video Review','Watch this student’s honest feedback.','https://www.youtube.com/watch?v=aqbDpDcwSfA',''],['Student 3','Video Review','Watch this student’s honest feedback.','https://www.youtube.com/watch?v=N80eGHa9wIE',''],['Student 4','Video Review','Watch this student’s honest feedback.','https://youtu.be/pmIHt3JpDfw',''],['Student 5','Video Review','Watch this student’s honest feedback.','https://youtu.be/DwZ3-0Ltkjw',''],['Student 6','Video Review','Watch this student’s honest feedback.','https://youtu.be/sVgSfQDKITM',''],['Student 7','Video Review','Watch this student’s honest feedback.','https://youtu.be/gr2LLyTnbzA',''],['Student 8','Video Review','Watch this student’s honest feedback.','https://youtu.be/n5cAUrCiTqc','']];
/* ===== end of editable data ===== */
var P=[['#6f4e37','#1a0f09'],['#8a5a3b','#27180f'],['#5a3d28','#1a0f09'],['#a77c55','#2e1d12'],['#3b2616','#6f4e37'],['#c9a27e','#27180f']];
function card(t,i,b){var c=P[i%6];return '<article class="cfc" style="--a:'+c[0]+';--b:'+c[1]+'">'+(t[8]?'<img class="shot" src="'+t[8]+'" alt="'+(t[9]||t[0])+'" loading="lazy">':(t[5]?'<img src="'+t[5]+'" alt="'+t[0]+'" loading="lazy" onerror="this.onerror=null;this.src=this.src.replace(\'maxresdefault\',\'hqdefault\')">':'<span class="ph'+(t[7]?' in':'')+'">'+(t[7]?'“'+t[7]+'”':'Demo')+'</span>'))+(b==='WATCH VIDEO'&&t[6]?'<button class="pb vp" type="button" aria-label="Play video" data-v="'+t[6]+'"></button>':'')+'<span class="pl">'+t[1]+'</span><span class="yr">'+t[2]+'</span><h3>'+t[0]+'</h3>'+((t[7]||t[8])?'':'<p>'+t[3]+'</p>')+'<div class="fo"><div class="tgs">'+t[4].map(function(x){return '<i>#'+x+'</i>'}).join('')+'</div>'+(b?'<a class="vb" href="'+(t[6]||'#')+'"'+(t[6]?' target="_blank" rel="noopener" data-v="'+(b==='WATCH VIDEO'?t[6]:'')+'"':'')+'>'+b+'</a>':'')+'</div></article>'}
var AUTO_MS=3000; /* auto-slide time in ms (3000 = 3 seconds) */
function autoplay(box,step){var t,vis=false,hov=false;
function run(){clearInterval(t);t=setInterval(function(){if(!vis||hov||(typeof mo!=='undefined'&&mo.classList.contains('on')))return;step()},AUTO_MS)}
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(box);else vis=true;
box.addEventListener('mouseenter',function(){hov=true});box.addEventListener('mouseleave',function(){hov=false;run()});
box.addEventListener('pointerup',run);box.addEventListener('click',run);run()}
document.querySelectorAll('.cf').forEach(function(el){
var d=D[el.dataset.k];
el.innerHTML='<div class="cfs"></div><div class="cfp"><i></i></div><div class="cfn"><button class="pv" aria-label="Previous">‹</button><div class="dots"></div><button class="nx" aria-label="Next">›</button></div>';
var st=el.querySelector('.cfs'),dt=el.querySelector('.dots'),bar=el.querySelector('.cfp i');
st.innerHTML=d.i.map(function(t,i){return card(t,i,d.b)}).join('');dt.innerHTML=d.i.map(function(){return '<b></b>'}).join('');
var cs=[].slice.call(st.children),ds=[].slice.call(dt.children),n=cs.length,cur=0;
function show(){cs.forEach(function(c,i){var o=((i-cur)%n+n)%n;if(o>n/2)o-=n;var p=Math.abs(o)<2?o:'h';c.dataset.p=p;c.style.setProperty('--s',p==='h'?0:p)});ds.forEach(function(x,i){x.classList.toggle('on',i===cur)});bar.style.width=(cur+1)/n*100+'%'}
function go(k){cur=(cur+k+n)%n;show()}
el.querySelector('.pv').onclick=function(){go(-1)};el.querySelector('.nx').onclick=function(){go(1)};
ds.forEach(function(x,i){x.onclick=function(){cur=i;show()}});
cs.forEach(function(c){c.addEventListener('click',function(e){var p=c.dataset.p;if(p==='1'||p==='-1'){e.preventDefault();go(+p)}})});
var x0=null;st.addEventListener('pointerdown',function(e){x0=e.clientX});addEventListener('pointerup',function(e){if(x0===null)return;var k=e.clientX-x0;x0=null;if(Math.abs(k)>45)go(k<0?1:-1)});
show();autoplay(el,function(){go(1)})});
/* video modal */
var mo=document.createElement('div');mo.className='mo';mo.innerHTML='<div class="mb"></div><button class="mx" aria-label="Close">×</button>';document.body.appendChild(mo);var mb=mo.firstChild;
function shut(){mo.classList.remove('on');mb.innerHTML=''}
function play(v){var y=v&&v.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);mb.innerHTML=y?'<iframe src="https://www.youtube.com/embed/'+y[1]+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>':v?'<video src="'+v+'" controls autoplay></video>':'<p style="color:#d9c9b4">Video coming soon.</p>';mo.classList.add('on')}
window.playVideo=play;document.addEventListener('click',function(e){var b=e.target.closest('.cfc [data-v]');if(!b||!b.dataset.v)return;var c=b.closest('.cfc');if(c.dataset.p!=='0')return;e.preventDefault();play(b.dataset.v)});mo.addEventListener('click',function(e){if(!e.target.closest('iframe,video,p'))shut()});
var DEMO='https://youtu.be/3qdYvEwvuG0',db=document.getElementById('demoBtn'),sc=document.querySelector('#demo .scr');if(db)db.onclick=function(e){e.preventDefault();play(DEMO)};if(sc){sc.style.cursor='pointer';sc.onclick=function(){play(DEMO)}}addEventListener('keydown',function(e){if(e.key==='Escape')shut()});
/* 3D rotating video-review cylinder */
var cy=document.getElementById('cy'),dd=document.getElementById('cyd');
if(cy){var n=V.length,stp=360/n,cur=0,r=document.createElement('div');r.className='cyr';cy.appendChild(r);
r.innerHTML=V.map(function(v,i){var c=P[i%6];return '<div class="cyc"><span class="st">★★★★★ 5.0</span><div class="vt" style="--a:'+c[0]+';--b:'+c[1]+'">'+(function(){var m=v[3].match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/),t=v[4]||(m?'https://i.ytimg.com/vi/'+m[1]+'/hqdefault.jpg':'');return t?'<img src="'+t+'" alt="" loading="lazy">':''})()+'<button class="pb" aria-label="Play video" data-v="'+v[3]+'"></button></div><p>'+v[2]+'</p><div class="who"><b class="av2">'+v[0].charAt(0)+'</b><div><span>'+v[0]+'</span><small>'+v[1]+'</small></div><em class="vf" style="font-style:normal">Verified</em></div></div>'}).join('');
dd.innerHTML=V.map(function(){return '<b></b>'}).join('');
var cc=[].slice.call(r.children),dn=[].slice.call(dd.children);
function lay(){var R=Math.round(cc[0].offsetWidth/2/Math.tan(Math.PI/n)*1.1),a=((cur%n)+n)%n;cc.forEach(function(c,i){c.style.transform='rotateY('+i*stp+'deg) translateZ('+R+'px)';c.classList.toggle('on',i===a)});dn.forEach(function(x,i){x.classList.toggle('on',i===a)});r.style.transform='translateZ(-'+R+'px) rotateY('+(-cur*stp)+'deg)'}
function to(i){var k=((i-cur)%n+n)%n;if(k>n/2)k-=n;cur+=k;lay()}
cc.forEach(function(c,i){c.addEventListener('click',function(e){if(!c.classList.contains('on')){to(i);return}var b=e.target.closest('.pb');if(b)play(b.dataset.v)})});
dn.forEach(function(x,i){x.onclick=function(){to(i)}});
document.querySelector('.cyp').onclick=function(){cur--;lay()};document.querySelector('.cyn').onclick=function(){cur++;lay()};
var sx=null;cy.addEventListener('pointerdown',function(e){sx=e.clientX});addEventListener('pointerup',function(e){if(sx===null)return;var k=e.clientX-sx;sx=null;if(Math.abs(k)>45){cur+=k<0?1:-1;lay()}});
addEventListener('resize',lay);lay();autoplay(cy,function(){cur++;lay()})}
})();
