/* ---------- Formal admission form: Student ID + Google Sheet + Drive copy + WhatsApp ---------- */
(function(){
var f=document.getElementById('adf');if(!f)return;
/* Google Apps Script web app: saves the row to the Sheet and the filled-form PDF to a Drive folder (see google-apps-script.gs) */
var ENDPOINT='https://script.google.com/macros/s/AKfycbwm9fSlYkj_G_wlMvk_fXN8GDjBwMo26ga9iBEvzJeE4cFy_5xUF3RoJeqgo5szXh6vow/exec';
var WA='8801845629227',YEAR=String(new Date().getFullYear());
var html=document.documentElement,C=window.COURSES||[],EN=window.EN_EXTRA||{},BN=window.BN_EXTRA||{};
var $=function(id){return document.getElementById(id)};
var sel=$('adc'),err=$('aderr'),btn=$('adsb'),okBox=$('adok'),last=null,busy=false,photo='';
function lang(){return html.lang==='bn'?'bn':'en'}
function t(k){return lang()==='bn'&&BN[k]!=null?BN[k]:(EN[k]||'')}
function digits(s){return lang()==='bn'?String(s).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'.charAt(d)}):String(s)}
function fee(n){return digits('৳ '+n.toLocaleString('en-US')+'/-')}
function cname(c){return lang()==='bn'?c.bn:c.en}
function find(s){for(var i=0;i<C.length;i++)if(C[i].slug===s)return C[i];return null}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function normPhone(p){p=String(p).replace(/[\s\-()]/g,'').replace(/^\+?88/,'');return /^01[3-9]\d{8}$/.test(p)?p:''}
/* Form no = Student ID: NX + year + time-based code + 2 random digits (unique per form) */
function makeId(){
  var y=String(new Date().getFullYear()).slice(-2),tm=Date.now().toString(36).slice(-5).toUpperCase(),r=0;
  try{r=crypto.getRandomValues(new Uint8Array(1))[0]%100}catch(e){r=Math.floor(Math.random()*100)}
  return 'NX'+y+'-'+tm+(r<10?'0'+r:r);
}
var formId=makeId();
function today(){var d=new Date();return ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear()}
$('adfn').value=formId;$('addt').value=today();

/* ----- course dropdown (re-rendered on language change) ----- */
function fillSel(){
  var v=sel.value;
  sel.innerHTML='<option value="">'+esc(t('lg_fcsel'))+'</option>'+C.map(function(c){return '<option value="'+c.slug+'">'+esc(cname(c))+' — '+esc(fee(c.fee))+'</option>'}).join('');
  sel.value=v;
}
var OPT={
 gn:[['Male','পুরুষ'],['Female','মহিলা'],['Other','অন্যান্য']],
 ed:[['Below SSC','এসএসসির নিচে'],['SSC','এসএসসি'],['HSC','এইচএসসি'],['Diploma','ডিপ্লোমা'],['Honours / Degree','অনার্স / ডিগ্রি'],['Masters','মাস্টার্স'],['Job holder','চাকরিজীবী'],['Other','অন্যান্য']],
 pm:[['bKash','বিকাশ'],['Nagad','নগদ'],['Rocket','রকেট'],['Bank Transfer','ব্যাংক ট্রান্সফার'],['Cash','নগদ টাকা (ক্যাশ)']]};
function fillOpts(id,k){var el=$(id),v=el.value;el.innerHTML='<option value="">'+esc(t('lg_fsel'))+'</option>'+OPT[k].map(function(o){return '<option value="'+o[0]+'">'+esc(lang()==='bn'?o[1]:o[0])+'</option>'}).join('');el.value=v}
function fillAll(){$('adsg').placeholder=t('lg_fsg3');fillSel();fillOpts('adgn','gn');fillOpts('aded','ed');fillOpts('adpm','pm')}
function optName(k,v){for(var i=0;i<OPT[k].length;i++)if(OPT[k][i][0]===v)return lang()==='bn'?OPT[k][i][1]:v;return v||''}
try{var q=new URLSearchParams(location.search).get('course');if(q&&find(q))sel.value=q}catch(e){}
fillAll();
try{var q2=new URLSearchParams(location.search).get('course');if(q2&&find(q2))sel.value=q2}catch(e){}

/* ----- errors ----- */
function showErr(k){err.textContent=t(k);err.hidden=false;err.setAttribute('data-k',k);err.scrollIntoView({block:'center',behavior:'smooth'})}
function hideErr(){err.hidden=true}
f.addEventListener('input',hideErr);f.addEventListener('change',hideErr);

/* ----- passport photo: resized to a small JPEG in the browser ----- */
var pph=$('pph'),phi=$('adphi');
$('adph').addEventListener('change',function(){
  var file=this.files&&this.files[0];if(!file)return;
  if(!/^image\//.test(file.type)){showErr('lg_fe10');this.value='';return}
  var r=new FileReader();
  r.onload=function(){var im=new Image();
    im.onload=function(){
      var s=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
      var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
      photo=c.toDataURL('image/jpeg',.82);phi.src=photo;phi.hidden=false;pph.classList.add('has');pph.classList.remove('bad');hideErr();
    };
    im.onerror=function(){showErr('lg_fe10')};im.src=r.result};
  r.readAsDataURL(file);
});

/* ----- filled form copy (shown after submit, printable / save as PDF) ----- */
function row(l,v){return '<div class="pf"><span>'+esc(t(l))+'</span><b class="pv">'+esc(v||'')+'</b></div>'}
function buildCopy(d){
  var c=find(d.slug);
  var top=f.querySelector('.pct').cloneNode(true).outerHTML,bot=f.querySelector('.pcb').cloneNode(true).outerHTML;
  return '<div class="paper a4">'+top+'<div class="phead"><div class="phl"><h2 class="ptitle">'+esc(t('lg_fh'))+'</h2><div class="prow p2">'+row('lg_fdate',d.date)+row('lg_fno',d.id)+'</div></div><div class="pphoto has"><img src="'+d.photo+'" alt=""></div></div>'
   +row('lg_fname',d.name)+row('lg_ffa',d.father)+row('lg_fsm',digits(d.phone))+row('lg_fgen',optName('gn',d.gender))+row('lg_fedu',optName('ed',d.education))+row('lg_fad',d.address)
   +row('lg_fco',c?cname(c)+' — '+fee(c.fee):'')+row('lg_fpay',optName('pm',d.payment))
   +'<div class="psigs"><div class="psg"><div class="psc"><span class="psi">'+esc(d.sign)+'</span></div><div class="pline"><span>'+esc(t('lg_fsig'))+'</span></div></div><div class="psg pdir"><div class="psc"><span class="pdn">Muhammad Raj</span></div><div class="pline"><span>'+esc(t('lg_fdir'))+'</span></div></div></div>'
   +bot+'</div>';
}
function fitCopy(){var w=$('axcopy'),sc=w.querySelector('.pcsc');if(!sc)return;var k=Math.min(1,w.clientWidth/794);sc.style.transform='scale('+k+')';sc.style.width='794px';w.style.height=(1123*k)+'px'}
window.addEventListener('resize',fitCopy);
function loadJs(u){return new Promise(function(ok,no){var el=document.createElement('script');el.src=u;el.onload=ok;el.onerror=no;document.head.appendChild(el)})}
function printCopy(){document.body.classList.add('pc');var off=function(){document.body.classList.remove('pc');window.removeEventListener('afterprint',off)};window.addEventListener('afterprint',off);setTimeout(function(){window.print();setTimeout(off,1500)},50)}
function downloadPdf(){
  var b=$('adpr'),old=b.textContent;b.disabled=true;b.textContent='…';
  var host=document.createElement('div');host.style.cssText='position:fixed;left:-10000px;top:0;width:794px';host.className='pcopy';host.innerHTML=buildCopy(last);document.body.appendChild(host);
  Promise.all([window.html2canvas||loadJs('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),window.jspdf||loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')]).then(function(){
    return html2canvas(host.firstChild,{scale:2,backgroundColor:'#ffffff',useCORS:true})
  }).then(function(cv){
    var pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4',orientation:'portrait'});
    pdf.addImage(cv.toDataURL('image/jpeg',.95),'JPEG',0,0,210,297);pdf.save('Admission-Form-'+last.id+'.pdf');
  }).catch(function(){printCopy()}).then(function(){host.remove();b.disabled=false;b.textContent=old});
}
function renderOk(){
  if(!last)return;
  var c=find(last.slug);
  $('adidv').textContent=last.id;$('adsn').textContent=last.name;$('adsm').textContent=digits(last.phone);
  $('adsc').textContent=c?cname(c):'';$('adsf').textContent=c?fee(c.fee):'';
  $('adav').innerHTML='<img src="'+last.photo+'" alt="">';
  var msg=lang()==='bn'
   ?'আসসালামু আলাইকুম। আমি অ্যাডমিশন ফর্ম পূরণ করেছি।\nকোর্স: '+(c?c.bn:'')+'\nস্টুডেন্ট আইডি: '+last.id+'\nনাম: '+last.name+'\nঅনুগ্রহ করে পরবর্তী প্রক্রিয়া জানান।'
   :'Assalamu alaikum. I have filled the admission form.\nCourse: '+(c?c.en:'')+'\nStudent ID: '+last.id+'\nName: '+last.name+'\nPlease tell me the next process.';
  $('adwa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
  $('axcopy').innerHTML='<div class="pcsc">'+buildCopy(last)+'</div>';fitCopy();
}
new MutationObserver(function(){setTimeout(function(){fillAll();var k=err.getAttribute('data-k');if(k&&!err.hidden)err.textContent=t(k);renderOk()},230)}).observe(html,{attributes:true,attributeFilter:['lang']});

/* ----- submit ----- */
f.addEventListener('submit',function(e){
  e.preventDefault();if(busy)return;hideErr();
  var x=f.elements;if(x.website.value)return; /* honeypot: bots only */
  var name=x.name.value.trim(),father=x.father.value.trim(),phone=normPhone(x.phone.value),addr=x.address.value.trim(),c=find(sel.value);
  if(!photo){pph.classList.add('bad');showErr('lg_fe1');return}
  if(name.length<2){showErr('lg_fe2');x.name.focus();return}
  if(father.length<2){showErr('lg_fe3');x.father.focus();return}
  if(!phone){showErr('lg_fe4');x.phone.focus();return}
  if(addr.length<2){showErr('lg_fe6');x.address.focus();return}
  if(!c){showErr('lg_fe7');sel.focus();return}
  if(!x.payment.value){showErr('lg_fe11');x.payment.focus();return}
  if(!x.terms.checked){showErr('lg_fe8');return}
  var sign=x.signature.value.trim();if(sign.length<2){showErr('lg_fe12');x.signature.focus();return}
  var d={id:formId,date:$('addt').value,name:name,father:father,phone:phone,gender:x.gender.value,education:x.education.value,address:addr,slug:c.slug,payment:x.payment.value,sign:sign,photo:photo};
  var body=new URLSearchParams({studentId:d.id,formDate:d.date,academicYear:YEAR,name:d.name,father:d.father,phone:d.phone,gender:d.gender,education:d.education,address:d.address,course:c.en,courseSlug:c.slug,fee:String(c.fee),payment:d.payment,termsAccepted:'Yes',signature:d.sign,photo:d.photo,site:'Muhammad Raj Website',submittedAt:new Date().toISOString()});
  busy=true;btn.disabled=true;btn.firstElementChild.textContent=t('adsing');
  var ctl=window.AbortController?new AbortController():null,to=setTimeout(function(){if(ctl)ctl.abort()},30000);
  fetch(ENDPOINT,{method:'POST',mode:'no-cors',body:body,signal:ctl?ctl.signal:undefined}).then(function(){
    clearTimeout(to);last=d;
    f.hidden=true;btn.remove();document.querySelector('.axhero').hidden=true;okBox.hidden=false;renderOk();
    scrollTo({top:okBox.getBoundingClientRect().top+scrollY-110,behavior:'smooth'});
  }).catch(function(){clearTimeout(to);showErr('lg_fe9')}).then(function(){
    busy=false;btn.disabled=false;btn.firstElementChild.textContent=t('adsub');
  });
});

$('adpr').addEventListener('click',downloadPdf);
/* copy ID */
$('adcp').addEventListener('click',function(){
  var b=this,v=last?last.id:'';if(!v)return;
  function done(){b.textContent=t('okcd');setTimeout(function(){b.textContent=t('okcp')},1600)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,function(){})}
  else{var a=document.createElement('textarea');a.value=v;document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){}a.remove()}
});
})();
