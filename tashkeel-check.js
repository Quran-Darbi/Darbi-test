/* فحص الضبط (تجريبي) — دربي لحفظ القرآن
   يُحمَّل عند الضغط على الزر فقط، ولا يلمس normalize/wordDiff ولا مسار التسجيل الحالي.
   التسجيل ← تحويل إلى WAV (16kHz أحادي) ← Turnstile ← وسيط Cloudflare ← Modal. */
(function(){
"use strict";
var WORKER="https://darbi-muaalem-prox.hindhany78.workers.dev";
var SITE_KEY="0x4AAAAAAF5uG6_d7Un4zq5_";
var MAX_AYAT=10;          // حد الخادم الحالي
var MAX_SECONDS=150;      // ≈ حد 5MB لملف WAV 16kHz
/* المفتاح → [رقم السورة، أول آية، عدد الآيات] — مولَّد من بيانات الصفحات نفسها */
var MAP={"abasa":[80,1,42],"alaadiyat":[100,1,11],"alaala":[87,1,19],"alahqaf_p502":[46,1,5],"alahqaf_p503":[46,6,9],"alahqaf_p504":[46,15,6],"alahqaf_p505":[46,21,8],"alahqaf_p506":[46,29,7],"alalaq":[96,1,19],"alasr":[103,1,3],"albalad":[90,1,20],"albayyina":[98,1,8],"alburuj":[85,1,22],"alduha":[93,1,11],"alfajr":[89,1,30],"alfalaq":[113,1,5],"alfath_p511":[48,1,9],"alfath_p512":[48,10,6],"alfath_p513":[48,16,8],"alfath_p514":[48,24,5],"alfath_p515":[48,29,1],"alfiyl":[105,1,5],"alghasiya":[88,1,26],"alhadid_p537":[57,1,3],"alhadid_p538":[57,4,8],"alhadid_p539":[57,12,7],"alhadid_p540":[57,19,6],"alhadid_p541":[57,25,5],"alhaqqa_p566":[69,1,8],"alhaqqa_p567":[69,9,26],"alhaqqa_p568":[69,35,18],"alhashr_p545":[59,1,3],"alhashr_p546":[59,1,3],"alhashr_p547":[59,1,3],"alhashr_p548":[59,17,8],"alhujurat_p515":[49,1,4],"alhujurat_p516":[49,5,7],"alhujurat_p517":[49,12,7],"alhumaza":[104,1,9],"alikhlas":[112,1,4],"alimran_p50":[3,1,9],"alimran_p51":[3,10,6],"alimran_p52":[3,16,7],"alimran_p53":[3,23,7],"alimran_p54":[3,30,8],"alimran_p55":[3,38,8],"alimran_p56":[3,46,7],"alimran_p57":[3,53,9],"alimran_p58":[3,62,9],"alimran_p59":[3,71,7],"alimran_p60":[3,78,6],"alimran_p61":[3,84,8],"alimran_p62":[3,92,9],"alimran_p63":[3,101,8],"alimran_p64":[3,109,7],"alimran_p65":[3,116,6],"alimran_p66":[3,122,11],"alimran_p67":[3,133,8],"alimran_p68":[3,141,8],"alimran_p69":[3,149,5],"alimran_p70":[3,154,4],"alimran_p71":[3,158,8],"alimran_p72":[3,166,8],"alimran_p73":[3,174,7],"alimran_p74":[3,181,6],"alimran_p75":[3,187,8],"alimran_p76":[3,195,6],"alinfitar":[82,1,19],"alinsan_p578":[76,1,5],"alinsan_p579":[76,6,20],"alinsan_p580":[76,26,6],"alinshiqaq":[84,1,25],"aljinn_p572":[72,1,13],"aljinn_p573":[72,14,15],"aljumua_p553":[62,1,8],"aljumua_p554":[62,9,3],"alkafirun":[109,1,6],"alkahf_p293":[18,1,4],"alkahf_p294":[18,5,11],"alkahf_p295":[18,16,5],"alkahf_p296":[18,21,7],"alkahf_p297":[18,28,7],"alkahf_p298":[18,35,11],"alkahf_p299":[18,46,8],"alkahf_p300":[18,54,8],"alkahf_p301":[18,62,13],"alkahf_p302":[18,75,9],"alkahf_p303":[18,84,14],"alkahf_p304":[18,98,13],"alkawthur":[108,1,3],"allayl":[92,1,21],"almaarij_p568":[70,1,10],"almaarij_p569":[70,11,29],"almaarij_p570":[70,40,5],"almaoon":[107,1,7],"almasad":[111,1,5],"almudaththir_p575":[74,1,17],"almudaththir_p576":[74,18,30],"almudaththir_p577":[74,48,9],"almujadila_p542":[58,1,6],"almujadila_p543":[58,7,5],"almujadila_p544":[58,12,10],"almujadila_p545":[58,22,1],"almulk_p562":[67,1,12],"almulk_p563":[67,13,14],"almulk_p564":[67,27,4],"almumtahana_p549":[60,1,5],"almumtahana_p550":[60,6,6],"almumtahana_p551":[60,12,2],"almunafiqun_p554":[63,1,4],"almunafiqun_p555":[63,5,7],"almursalat_p580":[77,1,19],"almursalat_p581":[77,20,31],"almutaffifin":[83,1,36],"almuzzammil_p574":[73,1,19],"almuzzammil_p575":[73,20,1],"alnnas":[114,1,6],"alnnasr":[110,1,3],"alqadr":[97,1,5],"alqalam_p564":[68,1,15],"alqalam_p565":[68,16,27],"alqalam_p566":[68,43,10],"alqamar_p528":[54,1,6],"alqamar_p529":[54,7,21],"alqamar_p530":[54,28,22],"alqamar_p531":[54,50,6],"alqaria":[101,1,11],"alqiyama_p577":[75,1,19],"alqiyama_p578":[75,20,21],"alsaff_p551":[61,1,5],"alsaff_p552":[61,6,9],"alshams":[91,1,15],"alsharh":[94,1,8],"altakathur":[102,1,8],"altariq":[86,1,17],"alwaqiah_p534":[56,1,16],"alwaqiah_p535":[56,17,34],"alwaqiah_p536":[56,51,26],"alwaqiah_p537":[56,77,20],"alzalzala":[99,1,8],"annaba":[78,1,40],"annajm_p526":[53,1,26],"annajm_p527":[53,27,18],"annajm_p528":[53,45,18],"annaziat":[79,1,46],"aquraysh":[106,1,4],"arraad_p249":[13,1,5],"arraad_p250":[13,6,8],"arraad_p251":[13,14,5],"arraad_p252":[13,19,10],"arraad_p253":[13,29,6],"arraad_p254":[13,35,8],"arraad_p255":[13,43,1],"arrahman_p531":[55,1,16],"arrahman_p532":[55,17,24],"arrahman_p533":[55,41,27],"arrahman_p534":[55,68,11],"attaghabun_p556":[64,1,9],"attaghabun_p557":[64,10,9],"attahrim_p560":[66,1,7],"attahrim_p561":[66,8,5],"attakwir":[81,1,29],"attalaq_p558":[65,1,5],"attalaq_p559":[65,6,7],"atteen":[95,1,8],"attur_p523":[52,1,14],"attur_p524":[52,15,17],"attur_p525":[52,32,18],"azzariyat_p520":[51,1,6],"azzariyat_p521":[51,7,24],"azzariyat_p522":[51,31,21],"azzariyat_p523":[51,52,9],"baqara_p10":[2,62,8],"baqara_p11":[2,70,7],"baqara_p12":[2,77,7],"baqara_p13":[2,84,5],"baqara_p14":[2,89,5],"baqara_p15":[2,94,8],"baqara_p16":[2,102,4],"baqara_p17":[2,106,7],"baqara_p18":[2,113,7],"baqara_p19":[2,120,7],"baqara_p2":[2,1,5],"baqara_p20":[2,127,8],"baqara_p21":[2,135,7],"baqara_p22":[2,142,4],"baqara_p23":[2,146,8],"baqara_p24":[2,154,10],"baqara_p25":[2,164,6],"baqara_p26":[2,170,7],"baqara_p27":[2,177,5],"baqara_p28":[2,182,5],"baqara_p29":[2,187,4],"baqara_p3":[2,6,11],"baqara_p30":[2,191,6],"baqara_p31":[2,197,6],"baqara_p32":[2,203,8],"baqara_p33":[2,211,5],"baqara_p34":[2,216,4],"baqara_p35":[2,220,5],"baqara_p36":[2,225,6],"baqara_p37":[2,231,3],"baqara_p38":[2,234,4],"baqara_p39":[2,238,8],"baqara_p4":[2,17,8],"baqara_p40":[2,246,3],"baqara_p41":[2,249,4],"baqara_p42":[2,253,4],"baqara_p43":[2,257,3],"baqara_p44":[2,260,5],"baqara_p45":[2,265,5],"baqara_p46":[2,270,5],"baqara_p47":[2,275,7],"baqara_p48":[2,282,1],"baqara_p49":[2,283,4],"baqara_p5":[2,25,5],"baqara_p6":[2,30,8],"baqara_p7":[2,38,11],"baqara_p8":[2,49,9],"baqara_p9":[2,58,4],"fatiha":[1,1,7],"fussilat_p477":[41,1,11],"fussilat_p478":[41,12,9],"fussilat_p479":[41,21,9],"fussilat_p480":[41,30,9],"fussilat_p481":[41,39,8],"fussilat_p482":[41,47,8],"ibrahim_p255":[14,1,5],"ibrahim_p256":[14,6,5],"ibrahim_p257":[14,11,8],"ibrahim_p258":[14,19,6],"ibrahim_p259":[14,25,9],"ibrahim_p260":[14,34,9],"ibrahim_p261":[14,43,10],"maryam_p305":[19,1,11],"maryam_p306":[19,12,14],"maryam_p307":[19,26,13],"maryam_p308":[19,39,13],"maryam_p309":[19,52,13],"maryam_p310":[19,65,12],"maryam_p311":[19,77,19],"maryam_p312":[19,96,3],"muhammad_p507":[47,1,11],"muhammad_p508":[47,12,8],"muhammad_p509":[47,20,10],"muhammad_p510":[47,30,9],"nuh_p570":[71,1,10],"nuh_p571":[71,11,18],"qaf_p518":[50,1,15],"qaf_p519":[50,16,20],"qaf_p520":[50,36,10],"taha_p312":[20,1,12],"taha_p313":[20,13,25],"taha_p314":[20,38,14],"taha_p315":[20,52,13],"taha_p316":[20,65,12],"taha_p317":[20,77,11],"taha_p318":[20,88,11],"taha_p319":[20,99,15],"taha_p320":[20,114,12],"taha_p321":[20,126,10],"yaseen_p440":[36,1,12],"yaseen_p441":[36,13,15],"yaseen_p442":[36,28,13],"yaseen_p443":[36,41,14],"yaseen_p444":[36,55,16],"yaseen_p445":[36,71,13],"yunus_p208":[10,1,6],"yunus_p209":[10,7,8],"yunus_p210":[10,15,6],"yunus_p211":[10,21,5],"yunus_p212":[10,26,8],"yunus_p213":[10,34,9],"yunus_p214":[10,43,11],"yunus_p215":[10,54,8],"yunus_p216":[10,62,9],"yunus_p217":[10,71,8],"yunus_p218":[10,79,10],"yunus_p219":[10,89,9],"yunus_p220":[10,98,9],"yunus_p221":[10,107,3],"yusuf_p235":[12,1,4],"yusuf_p236":[12,5,10],"yusuf_p237":[12,15,8],"yusuf_p238":[12,23,8],"yusuf_p239":[12,31,7],"yusuf_p240":[12,38,6],"yusuf_p241":[12,44,9],"yusuf_p242":[12,53,11],"yusuf_p243":[12,64,6],"yusuf_p244":[12,70,9],"yusuf_p245":[12,79,8],"yusuf_p246":[12,87,9],"yusuf_p247":[12,96,8],"yusuf_p248":[12,104,8]};
var NOTE_PRIVACY="يُرسَل تسجيلك إلى خادم الفحص ولا نحتفظ به نحن. وقد يبقى مؤقتًا لدى مزوّد الحوسبة حتى ٧ أيام.";
var $=function(id){return document.getElementById(id);};
var st={key:null,from:1,to:1,rec:null,chunks:[],stream:null,timer:null,t0:0,wav:null,token:null,widget:null,busy:false};

var ERR={
  rate_limited_minute:"محاولات كثيرة في وقت قصير. انتظر دقيقة ثم أعد المحاولة.",
  rate_limited_daily:"بلغتَ حدّ الفحوص اليومي لهذه التجربة. جرّب غدًا بإذن الله.",
  service_busy:"الخدمة التجريبية مزدحمة اليوم. جرّب لاحقًا.",
  too_large:"التسجيل أطول من الحد المسموح. اختر عددًا أقل من الآيات.",
  turnstile_failed:"فشل التحقق الأمني. أعد المحاولة.",
  wav_only:"تعذّر تجهيز التسجيل. جرّب متصفحًا آخر.",
  bad_fields:"بيانات غير صالحة.",
  upstream_error:"الخدمة غير متاحة الآن. أعد المحاولة بعد قليل.",
  upstream_unreachable:"الخدمة غير متاحة الآن. أعد المحاولة بعد قليل."
};

function info(){var m=MAP[st.key];return m?{surah:m[0],start:m[1],count:m[2]}:null;}
function supported(key){return !!MAP[key];}


var CSS=
".tash-card{margin-top:12px;padding:14px;border:1.5px solid var(--border);border-radius:14px;background:var(--surface2);color:var(--text);text-align:right}"+
".tash-title{font-size:16px;font-weight:700;margin-bottom:6px}"+
".tash-badge{font-size:11px;font-weight:700;background:var(--gold);color:#3a2f10;border-radius:20px;padding:2px 8px;margin-right:6px}"+
".tash-note,.tash-priv,.tash-caveat,.tash-hint{font-size:12.5px;line-height:1.9;color:var(--accent)}"+
".tash-priv,.tash-caveat{margin-top:10px;opacity:.9}"+
".tash-range{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0}"+
".tash-range label{font-size:13px}"+
".tash-range input{width:64px;padding:6px;border:1.5px solid var(--border);border-radius:8px;background:var(--card);color:var(--text);font-family:inherit;font-size:15px;text-align:center}"+
".tash-range .tash-hint{flex-basis:100%}"+
".tash-actions{display:flex;align-items:center;gap:10px;margin:10px 0}"+
".tash-btn{padding:11px 16px;border-radius:12px;font-family:inherit;font-size:15px;cursor:pointer;border:2px solid var(--border);background:var(--card);color:var(--text)}"+
".tash-send{width:100%;background:var(--accent);color:#fff;border-color:var(--accent);margin-top:8px}"+
".tash-btn:disabled{opacity:.5;cursor:default}"+
".tash-time{font-size:13px;color:var(--accent)}"+
"#tashPlayer{width:100%;margin:6px 0}"+
".tash-ts{margin:8px 0;min-height:4px}"+
".tash-status{font-size:13px;margin-top:8px;min-height:18px}"+
".tash-sum,.tash-ok{margin-top:12px;font-size:14px;font-weight:700}"+
".tash-ok{color:var(--accent-dark)}"+
".tash-warn{margin-top:10px;color:var(--wrong-border);font-size:13px}"+
".tash-legend{margin-top:8px;font-size:12px;display:flex;gap:10px;flex-wrap:wrap}"+
".tash-diff{margin-top:8px;padding:10px;background:var(--card);border:1px solid var(--border);border-radius:10px;font-size:22px;line-height:2.3;word-break:break-word}"+
".tash-d{background:#f8d0d0;color:#9b1c1c;border-radius:3px;padding:0 1px}"+
".tash-l{background:#ffe3bf;color:#7a4300;border-radius:3px;padding:0 1px}"+
"html[data-theme=dark] .tash-d{background:#5a2a2a;color:#ffb4b4}"+
"html[data-theme=dark] .tash-l{background:#5a4220;color:#ffd699}"+
".tash-miss{text-decoration:line-through}"+
".tash-extra{border-bottom:2px solid currentColor}"+
".tash-btn:focus-visible,.tash-range input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}";
function injectCss(){
  if(document.getElementById("tashCss"))return;
  var s=document.createElement("style");s.id="tashCss";s.textContent=CSS;document.head.appendChild(s);
}

/* ---------- واجهة ---------- */
function build(){
  injectCss();
  var root=$("tashRoot"); if(!root)return;
  var i=info();
  if(!i){root.innerHTML="";return;}
  st.from=1; st.to=Math.min(i.count,MAX_AYAT);
  var rangeHtml="";
  if(i.count>MAX_AYAT){
    rangeHtml='<div class="tash-range"><label>من الآية <input type="number" id="tashFrom" min="1" max="'+i.count+'" value="1" inputmode="numeric"></label>'+
      '<label>إلى الآية <input type="number" id="tashTo" min="1" max="'+i.count+'" value="'+st.to+'" inputmode="numeric"></label>'+
      '<div class="tash-hint" id="tashRangeHint">حتى '+MAX_AYAT+' آيات في الفحص الواحد (عدد آيات هذه الصفحة: '+i.count+').</div></div>';
  }
  root.innerHTML=
   '<div class="tash-card" role="region" aria-label="فحص الضبط (تجريبي)">'+
   '<div class="tash-title">🎧 فحص الضبط <span class="tash-badge">تجريبي</span></div>'+
   '<div class="tash-note">يستمع النموذج إلى تلاوتك ويقارن النطق (الحركات والحروف) بالمرجع. النتيجة إرشادية وقد تُخطئ أحيانًا، وليست بديلًا عن المعلّم.</div>'+
   rangeHtml+
   '<div class="tash-actions"><button type="button" class="tash-btn" id="tashRec">🎤 ابدأ التسجيل</button>'+
   '<span class="tash-time" id="tashTime" aria-live="off"></span></div>'+
   '<audio id="tashPlayer" controls hidden></audio>'+
   '<div id="tashTs" class="tash-ts"></div>'+
   '<button type="button" class="tash-btn tash-send" id="tashSend" disabled>إرسال للفحص</button>'+
   '<div class="tash-status" id="tashStatus" role="status" aria-live="polite"></div>'+
   '<div id="tashOut"></div>'+
   '<div class="tash-priv">'+NOTE_PRIVACY+'</div></div>';
  $("tashRec").onclick=toggleRec;
  $("tashSend").onclick=send;
  if($("tashFrom")){$("tashFrom").onchange=$("tashTo").onchange=readRange;}
  renderTurnstile();
}
function readRange(){
  var i=info(),f=parseInt($("tashFrom").value,10)||1,t=parseInt($("tashTo").value,10)||f;
  f=Math.max(1,Math.min(i.count,f)); t=Math.max(f,Math.min(i.count,t));
  if(t-f+1>MAX_AYAT)t=f+MAX_AYAT-1;
  $("tashFrom").value=f;$("tashTo").value=t;st.from=f;st.to=t;
  $("tashRangeHint").textContent="الآيات المفحوصة: "+(i.start+f-1)+" – "+(i.start+t-1)+" (حتى "+MAX_AYAT+" آيات).";
}
function setStatus(t){var e=$("tashStatus");if(e)e.textContent=t||"";}
function refresh(){var s=$("tashSend");if(s)s.disabled=st.busy||!st.wav||!st.token;}

/* ---------- Turnstile ---------- */
function loadTurnstile(cb){
  if(window.turnstile){cb();return;}
  if(!document.getElementById("tashTsScript")){
    var s=document.createElement("script");s.id="tashTsScript";
    s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";s.async=true;
    document.head.appendChild(s);
  }
  var n=0;(function w(){if(window.turnstile)cb();else if(n++<60)setTimeout(w,250);})();
}
function renderTurnstile(){
  loadTurnstile(function(){
    var el=$("tashTs");if(!el)return;
    st.widget=turnstile.render("#tashTs",{sitekey:SITE_KEY,
      callback:function(t){st.token=t;refresh();},
      "expired-callback":function(){st.token=null;refresh();},
      "error-callback":function(){st.token=null;refresh();setStatus("تعذّر التحقق الأمني. أعد تحميل الصفحة.");}});
  });
}

/* ---------- تسجيل ---------- */
function pickMime(){
  if(typeof MediaRecorder==="undefined")return null;
  var c=["audio/webm;codecs=opus","audio/mp4","audio/ogg;codecs=opus","audio/webm"];
  for(var i=0;i<c.length;i++){if(MediaRecorder.isTypeSupported(c[i]))return c[i];}
  return "";
}
function toggleRec(){
  if(st.rec&&st.rec.state==="recording"){stopRec();return;}
  if(typeof recognizing!=="undefined"&&recognizing){setStatus("أوقف تسجيل الاختبار الصوتي أولًا ثم ابدأ فحص الضبط.");return;}
  var mime=pickMime();
  if(mime===null||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){setStatus("متصفحك لا يدعم التسجيل لهذه الميزة.");return;}
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    st.stream=stream;st.chunks=[];st.wav=null;refresh();$("tashOut").innerHTML="";$("tashPlayer").hidden=true;
    st.rec=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
    st.rec.ondataavailable=function(e){if(e.data&&e.data.size)st.chunks.push(e.data);};
    st.rec.onstop=onStopped;
    st.rec.start();st.t0=Date.now();
    $("tashRec").textContent="⏹ إيقاف";
    setStatus("جارٍ التسجيل… تلُ الآيات المحددة ثم اضغط إيقاف.");
    st.timer=setInterval(tick,250);
  }).catch(function(){setStatus("لم يُسمح باستخدام الميكروفون.");});
}
function tick(){
  var s=Math.floor((Date.now()-st.t0)/1000);
  $("tashTime").textContent=Math.floor(s/60)+":"+("0"+(s%60)).slice(-2);
  if(s>=MAX_SECONDS)stopRec();
}
function stopRec(){
  clearInterval(st.timer);
  try{st.rec.stop();}catch(e){}
  if(st.stream)st.stream.getTracks().forEach(function(t){t.stop();});
  $("tashRec").textContent="🎤 تسجيل من جديد";
}
function onStopped(){
  setStatus("جارٍ تجهيز التسجيل…");
  var blob=new Blob(st.chunks,{type:(st.rec&&st.rec.mimeType)||"audio/webm"});
  blob.arrayBuffer().then(toWav).then(function(w){
    st.wav=w;var p=$("tashPlayer");p.src=URL.createObjectURL(w);p.hidden=false;
    setStatus("أكمل التحقق الأمني ثم اضغط إرسال.");refresh();
  }).catch(function(){setStatus("تعذّر تجهيز التسجيل. جرّب متصفحًا آخر.");});
}
function decode(buf){
  var AC=window.AudioContext||window.webkitAudioContext,ctx=new AC();
  return new Promise(function(res,rej){var p=ctx.decodeAudioData(buf,res,rej);if(p&&p.then)p.then(res,rej);})
    .then(function(b){try{ctx.close();}catch(e){}return b;});
}
function toWav(buf){
  return decode(buf).then(function(ab){
    var OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext;
    var off=new OAC(1,Math.ceil(ab.duration*16000),16000);
    var src=off.createBufferSource();src.buffer=ab;src.connect(off.destination);src.start(0);
    return new Promise(function(res,rej){var p=off.startRendering();off.oncomplete=function(e){res(e.renderedBuffer);};if(p&&p.then)p.then(res,rej);});
  }).then(function(rb){
    var d=rb.getChannelData(0),n=d.length,o=new DataView(new ArrayBuffer(44+n*2));
    function w(p,s){for(var i=0;i<s.length;i++)o.setUint8(p+i,s.charCodeAt(i));}
    w(0,"RIFF");o.setUint32(4,36+n*2,true);w(8,"WAVE");w(12,"fmt ");o.setUint32(16,16,true);
    o.setUint16(20,1,true);o.setUint16(22,1,true);o.setUint32(24,16000,true);o.setUint32(28,32000,true);
    o.setUint16(32,2,true);o.setUint16(34,16,true);w(36,"data");o.setUint32(40,n*2,true);
    for(var i=0;i<n;i++){var s=Math.max(-1,Math.min(1,d[i]));o.setInt16(44+i*2,s<0?s*0x8000:s*0x7fff,true);}
    return new Blob([o],{type:"audio/wav"});
  });
}

/* ---------- إرسال ---------- */
function send(){
  if(!st.wav||!st.token||st.busy)return;
  var i=info();if(!i)return;
  st.busy=true;refresh();$("tashOut").innerHTML="";setStatus("جارٍ الفحص… قد يستغرق أول طلب دقيقة.");
  var fd=new FormData();
  fd.append("file",st.wav,"rec.wav");
  fd.append("surah",String(i.surah));
  fd.append("aya",String(i.start+st.from-1));
  fd.append("num_ayat",String(st.to-st.from+1));
  fd.append("cf-turnstile-response",st.token);
  var ctl=new AbortController(),to=setTimeout(function(){ctl.abort();},120000);
  fetch(WORKER,{method:"POST",body:fd,signal:ctl.signal}).then(function(r){
    return r.text().then(function(t){var j=null;try{j=JSON.parse(t);}catch(e){}return{ok:r.ok,status:r.status,j:j};});
  }).then(function(x){
    if(!x.ok||!x.j||x.j.error){setStatus(ERR[x.j&&x.j.error]||"تعذّر الفحص (رمز "+x.status+").");return;}
    setStatus("");render(x.j);
  }).catch(function(){setStatus("تعذّر الاتصال بالخدمة. تحقق من الإنترنت وأعد المحاولة.");})
  .then(function(){clearTimeout(to);st.busy=false;st.token=null;try{turnstile.reset(st.widget);}catch(e){}refresh();});
}

/* ---------- مقارنة: LCS على الحروف، وتصنيف الفروق إلى ضبط وحروف ---------- */
var MARK=/[ً-ٰٟۖ-ۜ۟-۪ۨ-ۭ]/;
function ops(a,b){
  var A=Array.from(a),B=Array.from(b),n=A.length,m=B.length,w=m+1,i,j;
  if(n*m>9e6)return null;
  var L=new Uint16Array((n+1)*w);
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)
    L[i*w+j]=A[i]===B[j]?L[(i+1)*w+j+1]+1:Math.max(L[(i+1)*w+j],L[i*w+j+1]);
  var out=[];i=0;j=0;
  while(i<n||j<m){
    if(i<n&&j<m&&A[i]===B[j]){out.push(["=",A[i]]);i++;j++;}
    else if(j<m&&(i===n||L[i*w+j+1]>=L[(i+1)*w+j])){out.push(["+",B[j]]);j++;}
    else{out.push(["-",A[i]]);i++;}
  }
  return out;
}
function esc(s){return s.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
function render(o){
  var ref=o.reference_phonemes_joined||o.reference_phonemes||"",got=o.phonemes_text||"";
  var out=$("tashOut"),r=ops(ref,got);
  if(!r){out.innerHTML='<div class="tash-warn">التسجيل طويل جدًا للمقارنة التفصيلية. اختر آيات أقل.</div>';return;}
  var html="",hunk=[],tash=0,letter=0;
  function flush(){
    if(!hunk.length)return;
    var all=hunk.every(function(h){return MARK.test(h[1]);}),cls=all?"tash-d":"tash-l";
    all?tash++:letter++;
    html+=hunk.map(function(h){
      return h[0]==="-"?'<span class="'+cls+' tash-miss">'+esc(h[1])+'</span>':'<span class="'+cls+' tash-extra">'+esc(h[1])+'</span>';
    }).join("");hunk=[];
  }
  r.forEach(function(p){if(p[0]==="="){flush();html+=esc(p[1]);}else hunk.push(p);});
  flush();
  var head;
  if(!tash&&!letter)head='<div class="tash-ok">لم يُلتقَط فرق بين تلاوتك والمرجع. بارك الله فيك.</div>';
  else head='<div class="tash-sum">ملاحظات الضبط (الحركات): <b>'+tash+'</b> &nbsp;|&nbsp; ملاحظات الحروف: <b>'+letter+'</b></div>';
  out.innerHTML=head+
   '<div class="tash-legend"><span class="tash-d tash-miss">ضبط ناقص/مختلف</span> <span class="tash-l tash-miss">حرف ناقص</span> <span class="tash-extra tash-l">مسموع زائد</span></div>'+
   '<div class="tash-diff" dir="rtl" lang="ar">'+html+'</div>'+
   '<div class="tash-caveat">رموز النطق أعلاه تمثّل صوت المرجع، وليست رسم المصحف. استعن بمعلّم للتأكد من أي ملاحظة.</div>';
}

/* ---------- واجهة عامة ---------- */
window.TashCheck={supported:supported,open:function(key){st.key=key;st.wav=null;st.token=null;build();}};
})();
