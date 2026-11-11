/* BUDI "How it works" intro: a 25-second animated walkthrough shown on first visit, replayable from the welcome screen. */
(function(){
  if (/[?&]view=admin/.test(location.search)) return;
  var KEY = 'budi-intro-v5';
  var css = [
    '.bi-ov{position:fixed;inset:0;z-index:9999;background:rgba(10,26,22,.95);display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));font-family:inherit}',
    '.bi-ov[hidden]{display:none!important}',
    '.bi-box{width:min(360px,100%);display:flex;flex-direction:column;gap:12px;align-items:stretch}',
    '.bi-top{display:flex;justify-content:space-between;align-items:center;color:#F4F7F3;font-size:14px;font-weight:600}',
    '.bi-skip{background:none;border:1px solid rgba(244,247,243,.5);color:#F4F7F3;border-radius:999px;padding:6px 14px;font:inherit;cursor:pointer}',
    '.bi-bars{display:flex;gap:6px}',
    '.bi-bars i{flex:1;height:4px;border-radius:2px;background:rgba(244,247,243,.25);overflow:hidden;position:relative}',
    '.bi-bars i b{position:absolute;inset:0;width:0;background:#E9A93A}',
    '.bi-bars i.done b{width:100%}',
    '.bi-bars i.on b{animation:biFill var(--d) linear forwards}',
    '@keyframes biFill{to{width:100%}}',
    '.bi-phone{position:relative;height:min(430px,56vh);min-height:340px;background:#F4F7F3;border-radius:28px;border:8px solid #14302A;overflow:hidden;color:#14302A}',
    '.bi-hd{display:flex;align-items:center;gap:8px;padding:12px 16px;background:#1E6B4A;color:#F4F7F3;font-weight:800;letter-spacing:.02em}',
    '.bi-dots{position:relative;width:26px;height:16px}.bi-dots:before,.bi-dots:after{content:"";position:absolute;top:0;width:16px;height:16px;border-radius:50%}.bi-dots:before{left:0;background:#F4F7F3}.bi-dots:after{left:10px;background:#E9A93A;border:2px solid #1E6B4A;width:12px;height:12px}',
    '.bi-sc{position:absolute;inset:48px 0 0;padding:16px;display:flex;flex-direction:column;gap:10px;opacity:0;visibility:hidden}',
    '.bi-sc.on{opacity:1;visibility:visible}',
    '.bi-sc .a{opacity:0;transform:translateY(10px)}',
    '.bi-sc.on .a{animation:biIn .45s ease forwards;animation-delay:var(--t,0s)}',
    '@keyframes biIn{to{opacity:1;transform:none}}',
    '.bi-bub{max-width:85%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.4}',
    '.bi-bot{background:#FFFFFF;border:1px solid #D6E1D9;border-bottom-left-radius:4px;align-self:flex-start}',
    '.bi-me{background:#1E6B4A;color:#F4F7F3;border-bottom-right-radius:4px;align-self:flex-end}',
    '.bi-chips{display:flex;flex-wrap:wrap;gap:6px}',
    '.bi-chip{font-size:12px;font-weight:700;background:#E2EEE6;color:#1E6B4A;padding:5px 9px;border-radius:999px}',
    '.bi-mic{position:absolute;left:50%;bottom:18px;width:58px;height:58px;margin-left:-29px;border-radius:50%;background:#E9A93A;display:grid;place-items:center}',
    '.bi-sc.on .bi-mic{animation:biPulse 1.2s ease-in-out infinite}',
    '@keyframes biPulse{0%,100%{box-shadow:0 0 0 0 rgba(233,169,58,.6)}50%{box-shadow:0 0 0 14px rgba(233,169,58,0)}}',
    '.bi-mic svg{width:24px;height:24px}',
    '.bi-radar{align-self:center;width:120px;height:120px;border-radius:50%;border:2px dashed #1E6B4A;position:relative;margin:6px 0}',
    '.bi-radar:after{content:"";position:absolute;inset:-2px;border-radius:50%;border:4px solid transparent;border-top-color:#E9A93A}',
    '.bi-sc.on .bi-radar:after{animation:biSpin .9s linear 3}',
    '@keyframes biSpin{to{transform:rotate(360deg)}}',
    '.bi-radar span{position:absolute;width:14px;height:14px;border-radius:50%}',
    '.bi-card{background:#FFFFFF;border:2px solid #14302A;border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:4px 4px 0 #E9A93A}',
    '.bi-row{display:flex;align-items:center;gap:10px}',
    '.bi-av{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#14302A}',
    '.bi-sm{font-size:12px;color:#4F625A}',
    '.bi-btn{border:0;border-radius:999px;padding:10px 14px;font-family:inherit;font-weight:700;font-size:14px;line-height:1;background:#14302A;color:#F4F7F3;text-align:center}',
    '.bi-sc.on .bi-press{animation:biIn .45s ease forwards,biPress .5s ease forwards;animation-delay:var(--t,0s),calc(var(--t,0s) + .9s)}',
    '@keyframes biPress{50%{transform:scale(.94)}100%{transform:none;background:#1E6B4A}}',
    '.bi-ok{display:flex;gap:8px;justify-content:center}',
    '.bi-ok span{font-size:13px;font-weight:700;background:#1E6B4A;color:#F4F7F3;padding:6px 10px;border-radius:999px}',
    '.bi-week{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}',
    '.bi-week i{font-style:normal;text-align:center;font-size:12px;font-weight:700;padding:8px 0;border-radius:10px;background:#E2EEE6;color:#4F625A}',
    '.bi-sc.on .bi-week i.hit{animation:biHit .4s ease forwards;animation-delay:var(--t,0s)}',
    '@keyframes biHit{to{background:#E9A93A;color:#14302A}}',
    '.bi-sc.on .bi-week i.walk{animation:biWalk .4s ease forwards;animation-delay:var(--t,0s)}',
    '@keyframes biWalk{to{background:#1E6B4A;color:#F4F7F3}}',
    '.bi-toast{align-self:center;background:#14302A;color:#F4F7F3;font-size:13px;font-weight:600;padding:8px 12px;border-radius:12px}',
    '.bi-end{position:absolute;inset:48px 0 0;padding:24px;display:none;flex-direction:column;gap:14px;justify-content:center;align-items:stretch;text-align:center;background:#F4F7F3}',
    '.bi-end.on{display:flex}',
    '.bi-end h3{margin:0;font-size:24px;line-height:1.15}',
    '.bi-cta{border:2px solid #14302A;border-radius:999px;padding:14px 18px;font-family:inherit;font-weight:700;font-size:16px;line-height:1;cursor:pointer;background:#14302A;color:#F4F7F3;box-shadow:3px 3px 0 #E9A93A}',
    '.bi-ghost{border:2px solid #14302A;border-radius:999px;padding:12px 18px;font-family:inherit;font-weight:600;font-size:15px;line-height:1;cursor:pointer;background:transparent;color:#14302A}',
    '.bi-guide{display:flex;align-items:flex-end;gap:12px}',
    '.bi-dog{width:96px;height:96px;flex:none;overflow:visible;animation:biBob 1.2s ease-in-out infinite}',
    '@keyframes biBob{50%{transform:translateY(-4px)}}',
    '.bi-tail{transform-box:fill-box;transform-origin:10% 90%;animation:biWag .3s ease-in-out infinite alternate}',
    '@keyframes biWag{from{transform:rotate(-8deg)}to{transform:rotate(10deg)}}',
    '.bi-ear{transform-box:fill-box;animation:biEar 1.6s ease-in-out infinite}',
    '.bi-ear.l{transform-origin:70% 100%}.bi-ear.r{transform-origin:30% 100%;animation-direction:reverse}',
    '@keyframes biEar{0%,70%,100%{transform:none}80%{transform:rotate(-7deg)}90%{transform:rotate(4deg)}}',
    '.bi-eyes{transform-box:fill-box;transform-origin:center;animation:biBlink 4s infinite}',
    '@keyframes biBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}',
    '.bi-dog .p,.bi-dog .bi-tongue{display:none}',
    '.bi-dog[data-s="0"] .p0,.bi-dog[data-s="1"] .p1,.bi-dog[data-s="2"] .p2,.bi-dog[data-s="3"] .p3,.bi-dog[data-s="4"] .p4{display:inline}',
    '.bi-dog[data-s="2"] .bi-tongue,.bi-dog[data-s="3"] .bi-tongue,.bi-dog[data-s="4"] .bi-tongue{display:inline}',
    '.bi-wave{transform-box:fill-box;transform-origin:20% 100%;animation:biWaveK .45s ease-in-out infinite alternate}',
    '@keyframes biWaveK{to{transform:rotate(-28deg)}}',
    '.bi-paw{transform-box:fill-box;animation:biFive .7s ease-in-out infinite alternate}',
    '@keyframes biFive{to{transform:translateY(-9px)}}',
    '.bi-lens{transform-box:fill-box;animation:biScan 1.3s ease-in-out infinite alternate}',
    '@keyframes biScan{to{transform:translate(-8px,4px)}}',
    '.bi-say{position:relative;flex:1;min-width:0;background:#FBFBF8;color:#14302A;border-radius:16px;padding:10px 13px;font-size:15px;line-height:1.35;font-weight:600;min-height:64px}',
    '.bi-say:before{content:"";position:absolute;left:-9px;bottom:18px;border-style:solid;border-width:8px 10px 8px 0;border-color:transparent #FBFBF8 transparent transparent}',
    '.bi-say small{display:block;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#1E6B4A;margin-bottom:3px}',
    '.bi-say.pop{animation:biPop .35s ease}',
    '@keyframes biPop{from{transform:scale(.92);opacity:.3}to{transform:none;opacity:1}}',
    '.bi-note{color:rgba(244,247,243,.7);font-size:12px;text-align:center}',
    '.bi-cta:focus-visible,.bi-ghost:focus-visible,.bi-skip:focus-visible,.bi-replay:focus-visible{outline:3px solid #E9A93A;outline-offset:2px}',
    '.bi-replay{display:inline-flex;align-items:center;gap:8px;margin:10px auto 0;padding:9px 14px;border-radius:999px;border:1.5px solid currentColor;background:transparent;color:inherit;font-family:inherit;font-weight:600;font-size:14px;line-height:1;cursor:pointer;opacity:.9}',
    '.bi-replay-wrap{display:flex;justify-content:center}',
    '.bi-hbtn{margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1.5px solid #1E6B4A;background:#E2EEE6;color:#14302A;font-family:inherit;font-weight:700;font-size:13px;line-height:1;cursor:pointer;white-space:nowrap}',
    '.bi-hbtn.bi-float{position:fixed;top:calc(12px + env(safe-area-inset-top,0px));right:calc(12px + env(safe-area-inset-right,0px));z-index:9000}',
    '.bi-hbtn:focus-visible{outline:3px solid #E9A93A;outline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.bi-dog,.bi-tail,.bi-ear,.bi-eyes,.bi-wave,.bi-paw,.bi-lens,.bi-say.pop{animation:none!important}.bi-sc .a{opacity:1;transform:none}.bi-sc.on .a,.bi-sc.on .bi-mic,.bi-sc.on .bi-radar:after,.bi-bars i.on b{animation:none!important}.bi-bars i.on b{width:100%}}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var mic = '<svg viewBox="0 0 24 24" fill="none" stroke="#14302A" stroke-width="2.4" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="#14302A"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  var scenes = [
    { cap: 'Woof, I’m Hachi! Just talk to BUDI for two minutes. One sentence fills most of your profile.', html:
      '<div class="bi-bub bi-bot a" style="--t:.2s">Hi! I’m BUDI. Where are you on weekdays, and when are you free?</div>' +
      '<div class="bi-bub bi-me a" style="--t:1.4s">I work at Raffles Place. Free Wed and Fri at lunch. I like walking.</div>' +
      '<div class="bi-bub bi-bot a" style="--t:2.6s">Got it. Noted:</div>' +
      '<div class="bi-chips"><span class="bi-chip a" style="--t:3.0s">Raffles Place</span><span class="bi-chip a" style="--t:3.3s">Wed, Fri · 12:30</span><span class="bi-chip a" style="--t:3.6s">Walking</span></div>' +
      '<div class="bi-mic">' + mic + '</div>' },
    { cap: 'Sniff, sniff… found Ken! 1.1 km away and free when you are. You both say yes first.', html:
      '<div class="bi-radar a" style="--t:0s"><span style="left:18px;top:30px;background:#1E6B4A"></span><span style="right:22px;bottom:26px;background:#E9A93A"></span></div>' +
      '<div class="bi-card a" style="--t:2.0s"><div class="bi-row"><div class="bi-av" style="background:#E9A93A">K</div><div><b>Ken</b> · 45–50<div class="bi-sm">1.1 km away · Tanjong Pagar</div></div></div>' +
      '<div class="bi-chips"><span class="bi-chip">Free Wed, Fri 12:30</span><span class="bi-chip">Likes walking</span></div>' +
      '<div class="bi-btn bi-press a" style="--t:2.4s">Accept</div></div>' +
      '<div class="bi-ok a" style="--t:3.8s"><span>You ✓</span><span>Ken ✓</span></div>' },
    { cap: 'Wednesday and Friday at 12:30? I’ll fetch the leash. Plan saved!', html:
      '<div class="bi-bub bi-me a" style="--t:.2s">Wednesday and Friday, 12:30, Fort Canning Park.</div>' +
      '<div class="bi-card a" style="--t:1.2s"><b>Your plan with Ken</b>' +
      '<div class="bi-week"><i>M</i><i>T</i><i class="hit" style="--t:1.9s">W</i><i>T</i><i class="hit" style="--t:2.2s">F</i><i>S</i><i>S</i></div>' +
      '<div class="bi-sm">12:30 · 30 min walk · Fort Canning Park</div>' +
      '<div class="bi-btn bi-press a" style="--t:2.6s">Save plan</div></div>' },
    { cap: 'Tap Done after your walk. Ken walked too. Paw five!', html:
      '<div class="bi-card a" style="--t:.2s"><div class="bi-row"><div class="bi-av" style="background:#E2EEE6">W</div><div><b>Today · Walk with Ken</b><div class="bi-sm">12:30 · Fort Canning Park</div></div></div>' +
      '<div class="bi-btn bi-press a" style="--t:.6s">Done for today ✓</div></div>' +
      '<div class="bi-toast a" style="--t:2.0s">Ken checked in too · cheer sent</div>' +
      '<div class="bi-card a" style="--t:2.8s"><b>This week</b><div class="bi-week"><i>M</i><i>T</i><i class="walk" style="--t:3.2s">W</i><i>T</i><i class="walk" style="--t:3.5s">F</i><i>S</i><i>S</i></div><div class="bi-sm">2 walks together · keep it going</div></div>' }
  ];
  var DUR = 6000, ov, idx = -1, timer = null;

  function build(){
    ov = document.createElement('div');
    ov.className = 'bi-ov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','How BUDI works, a 25-second walkthrough');
    var bars = scenes.map(function(){ return '<i><b></b></i>'; }).join('');
    var sc = scenes.map(function(s,i){ return '<div class="bi-sc" data-i="'+i+'">'+s.html+'</div>'; }).join('');
    ov.innerHTML = '<div class="bi-box">' +
      '<div class="bi-top"><span>Hachi shows you BUDI · 25 sec</span><button type="button" class="bi-skip" id="bi-skip">Skip</button></div>' +
      '<div class="bi-bars" style="--d:'+DUR+'ms">'+bars+'</div>' +
      '<div class="bi-phone"><div class="bi-hd"><span class="bi-dots"></span>BUDI</div>'+sc+
      '<div class="bi-end"><h3>That’s BUDI.<br>Two minutes to start.</h3><button type="button" class="bi-cta" id="bi-go">Start talking</button><button type="button" class="bi-ghost" id="bi-again">Watch again</button></div></div>' +
      '<div class="bi-guide"><svg class="bi-dog" data-s="0" viewBox="0 0 120 120" aria-hidden="true">'+
      '<g class="bi-tail"><path d="M84 90 c18 -2 23 -22 11 -29 c-9 -5 -16 4 -10 10" stroke="#D8C29C" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M93 66 c-5 -2 -8 3 -4 6" stroke="#FFFBF3" stroke-width="4" fill="none" stroke-linecap="round"/></g>'+
      '<ellipse cx="60" cy="94" rx="28" ry="21" fill="#EADBC0" stroke="#BFA27A" stroke-width="1.5"/><path d="M46 78 C46 96 50 112 60 112 C70 112 74 96 74 78 Z" fill="#FFFBF3"/>'+
      '<ellipse cx="45" cy="113" rx="8" ry="5" fill="#FFFBF3" stroke="#E6C9A8" stroke-width="1"/><ellipse cx="75" cy="113" rx="8" ry="5" fill="#FFFBF3" stroke="#E6C9A8" stroke-width="1"/>'+
      '<rect x="41" y="71" width="38" height="7" rx="3.5" fill="#1E6B4A"/><circle cx="60" cy="81" r="4.5" fill="#F4F7F3" stroke="#1E6B4A" stroke-width="1.5"/>'+
      '<g class="bi-ear l"><path d="M35 32 L39 3 L58 20 Z" fill="#EADBC0" stroke="#BFA27A" stroke-width="1.5" stroke-linejoin="round"/><path d="M40 26 L41.5 11 L51 20 Z" fill="#E9B8A2"/></g>'+
      '<g class="bi-ear r"><path d="M85 32 Q90 16 84 9 L62 20 Z" fill="#EADBC0" stroke="#BFA27A" stroke-width="1.5" stroke-linejoin="round"/><path d="M84 9 Q96 12 95 24 Q90 18 84 9 Z" fill="#D9C3A0" stroke="#BFA27A" stroke-width="1.2" stroke-linejoin="round"/><path d="M79 26 Q82 17 80 13 L69 20 Z" fill="#E9B8A2"/></g>'+
      '<circle cx="60" cy="44" r="28" fill="#EADBC0" stroke="#BFA27A" stroke-width="1.5"/>'+
      '<path d="M33 46 C34 64 48 74 60 74 C72 74 86 64 87 46 C80 54 71 52 60 52 C49 52 40 54 33 46 Z" fill="#FFFBF3"/>'+
      '<ellipse cx="60" cy="58" rx="15" ry="11" fill="#FFFBF3"/>'+
      '<ellipse cx="49" cy="32" rx="3.4" ry="2.3" fill="#FFFBF3"/><ellipse cx="71" cy="32" rx="3.4" ry="2.3" fill="#FFFBF3"/>'+
      '<g class="bi-eyes"><ellipse cx="50" cy="41" rx="3.8" ry="3.1" fill="#14302A"/><ellipse cx="70" cy="41" rx="3.8" ry="3.1" fill="#14302A"/><circle cx="51.3" cy="39.9" r="1.2" fill="#FFFFFF"/><circle cx="71.3" cy="39.9" r="1.2" fill="#FFFFFF"/></g>'+
      '<circle cx="42" cy="54" r="3.4" fill="#F2A07B" opacity=".6"/><circle cx="78" cy="54" r="3.4" fill="#F2A07B" opacity=".6"/>'+
      '<ellipse cx="60" cy="51.5" rx="5.4" ry="3.9" fill="#14302A"/>'+
      '<path class="bi-tongue" d="M56.5 58.5 q3.5 10 7 0 Z" fill="#E36F6F"/>'+
      '<path d="M60 55 v3 M53 57.5 q3.5 4 7 0.5 q3.5 3.5 7 -0.5" stroke="#14302A" stroke-width="2" fill="none" stroke-linecap="round"/>'+
      '<g class="p p0"><rect x="88" y="48" width="10" height="16" rx="5" fill="#F4F7F3" stroke="#14302A" stroke-width="2"/><path d="M93 64 v10" stroke="#F4F7F3" stroke-width="3"/><ellipse cx="90" cy="80" rx="8" ry="6" fill="#FFFBF3" stroke="#D8C29C" stroke-width="1.5"/></g>'+
      '<g class="p p1"><g class="bi-lens"><circle cx="97" cy="46" r="11" fill="#DCEFE4" fill-opacity=".75" stroke="#14302A" stroke-width="3"/><path d="M89 54 l-8 10" stroke="#14302A" stroke-width="4.5" stroke-linecap="round"/></g></g>'+
      '<g class="p p2"><path d="M60 82 C 82 100, 100 70, 106 94" stroke="#A8402D" stroke-width="3.2" fill="none" stroke-linecap="round"/><circle cx="106" cy="98" r="5" fill="none" stroke="#A8402D" stroke-width="3.2"/></g>'+
      '<g class="p p3"><ellipse class="bi-paw" cx="93" cy="58" rx="8.5" ry="7.5" fill="#FFFBF3" stroke="#D8C29C" stroke-width="1.5"/><path d="M104 22 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2Z" fill="#E9A93A"/><path d="M16 30 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6Z" fill="#4FB585"/></g>'+
      '<g class="p p4"><ellipse class="bi-wave" cx="92" cy="60" rx="8.5" ry="7.5" fill="#FFFBF3" stroke="#D8C29C" stroke-width="1.5"/></g>'+
      '</svg><div class="bi-say" aria-live="polite"><small></small><span class="bi-cap"></span></div></div><p class="bi-note">Ken is an example buddy. Your matches are real people who join.</p></div>';
    document.body.appendChild(ov);
    ov.querySelector('#bi-skip').onclick = close;
    ov.querySelector('#bi-go').onclick = close;
    ov.querySelector('#bi-again').onclick = function(){ go(0); };
    ov.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
  }
  function go(i){
    clearTimeout(timer); idx = i;
    var bars = ov.querySelectorAll('.bi-bars i'), sc = ov.querySelectorAll('.bi-sc'), end = ov.querySelector('.bi-end'), cap = ov.querySelector('.bi-cap'), dog = ov.querySelector('.bi-dog'), say = ov.querySelector('.bi-say'), lbl = say.querySelector('small');
    say.classList.remove('pop'); void say.offsetWidth; say.classList.add('pop');
    end.classList.remove('on');
    bars.forEach(function(b,j){ b.className = j < i ? 'done' : ''; });
    sc.forEach(function(s){ s.classList.remove('on'); });
    if (i >= scenes.length){
      bars.forEach(function(b){ b.className = 'done'; });
      end.classList.add('on'); dog.setAttribute('data-s','4'); lbl.textContent = 'Hachi'; cap.textContent = 'That’s it! A buddy who always shows up. Two minutes to start.';
      ov.querySelector('#bi-go').focus(); return;
    }
    void sc[i].offsetWidth;
    sc[i].classList.add('on'); bars[i].className = 'on';
    dog.setAttribute('data-s', String(i)); lbl.textContent = 'Hachi · ' + (i+1) + ' of ' + scenes.length; cap.textContent = scenes[i].cap;
    timer = setTimeout(function(){ go(i+1); }, DUR);
  }
  function open(){
    if (!ov) build();
    ov.hidden = false; go(0);
    ov.querySelector('#bi-skip').focus();
  }
  function close(){
    clearTimeout(timer);
    if (ov) ov.hidden = true;
    try { localStorage.setItem(KEY, '1'); } catch(e) {}
  }
  window.budiIntro = open;

  function addReplay(){
    var main = document.getElementById('main'); if (!main) return;
    if (main.querySelector('.bi-replay')) return;
    var start = Array.prototype.find.call(main.querySelectorAll('button'), function(b){ return b.textContent.trim() === 'Start'; });
    if (!start) return;
    var w = document.createElement('div'); w.className = 'bi-replay-wrap';
    w.innerHTML = '<button type="button" class="bi-replay">▶ Watch how it works · 25 sec</button>';
    w.firstChild.onclick = open;
    start.insertAdjacentElement('afterend', w);
  }
  function addHeaderBtn(){
    if (document.querySelector('.bi-hbtn')) return;
    var host = document.querySelector('header.top') || document.querySelector('header');
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'bi-hbtn'; b.textContent = '\u25B6 How it works';
    b.setAttribute('aria-label', 'Watch how BUDI works, 25 seconds');
    b.onclick = open;
    if (host) host.appendChild(b); else { b.classList.add('bi-float'); document.body.appendChild(b); }
  }
  function init(){
    addHeaderBtn();
    addReplay();
    var main = document.getElementById('main');
    if (main) new MutationObserver(function(){ addReplay(); }).observe(main, { childList: true, subtree: true });
    var seen = null; try { seen = localStorage.getItem(KEY); } catch(e) {}
    var force = /[?&]intro=1/.test(location.search);
    if (force || !seen) setTimeout(open, 700);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
