/* BUDI "How it works" intro: a 25-second animated walkthrough shown on first visit, replayable from the welcome screen. */
(function(){
  if (/[?&]view=admin/.test(location.search)) return;
  var KEY = 'budi-intro-v2';
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
    '.bi-phone{position:relative;height:min(470px,62vh);min-height:360px;background:#F4F7F3;border-radius:28px;border:8px solid #14302A;overflow:hidden;color:#14302A}',
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
    '.bi-cap{color:#F4F7F3;font-size:16px;line-height:1.4;text-align:center;min-height:46px;font-weight:600}',
    '.bi-note{color:rgba(244,247,243,.7);font-size:12px;text-align:center}',
    '.bi-cta:focus-visible,.bi-ghost:focus-visible,.bi-skip:focus-visible,.bi-replay:focus-visible{outline:3px solid #E9A93A;outline-offset:2px}',
    '.bi-replay{display:inline-flex;align-items:center;gap:8px;margin:10px auto 0;padding:9px 14px;border-radius:999px;border:1.5px solid currentColor;background:transparent;color:inherit;font-family:inherit;font-weight:600;font-size:14px;line-height:1;cursor:pointer;opacity:.9}',
    '.bi-replay-wrap{display:flex;justify-content:center}',
    '.bi-hbtn{margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1.5px solid #1E6B4A;background:#E2EEE6;color:#14302A;font-family:inherit;font-weight:700;font-size:13px;line-height:1;cursor:pointer;white-space:nowrap}',
    '.bi-hbtn.bi-float{position:fixed;top:calc(12px + env(safe-area-inset-top,0px));right:calc(12px + env(safe-area-inset-right,0px));z-index:9000}',
    '.bi-hbtn:focus-visible{outline:3px solid #E9A93A;outline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.bi-sc .a{opacity:1;transform:none}.bi-sc.on .a,.bi-sc.on .bi-mic,.bi-sc.on .bi-radar:after,.bi-bars i.on b{animation:none!important}.bi-bars i.on b{width:100%}}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var mic = '<svg viewBox="0 0 24 24" fill="none" stroke="#14302A" stroke-width="2.4" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="#14302A"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  var scenes = [
    { cap: 'Talk to BUDI for two minutes. One sentence fills most of your profile.', html:
      '<div class="bi-bub bi-bot a" style="--t:.2s">Hi! I’m BUDI. Where are you on weekdays, and when are you free?</div>' +
      '<div class="bi-bub bi-me a" style="--t:1.4s">I work at Raffles Place. Free Wed and Fri at lunch. I like walking.</div>' +
      '<div class="bi-bub bi-bot a" style="--t:2.6s">Got it. Noted:</div>' +
      '<div class="bi-chips"><span class="bi-chip a" style="--t:3.0s">Raffles Place</span><span class="bi-chip a" style="--t:3.3s">Wed, Fri · 12:30</span><span class="bi-chip a" style="--t:3.6s">Walking</span></div>' +
      '<div class="bi-mic">' + mic + '</div>' },
    { cap: 'BUDI finds a real person nearby on your schedule. Nothing opens until you both accept.', html:
      '<div class="bi-radar a" style="--t:0s"><span style="left:18px;top:30px;background:#1E6B4A"></span><span style="right:22px;bottom:26px;background:#E9A93A"></span></div>' +
      '<div class="bi-card a" style="--t:2.0s"><div class="bi-row"><div class="bi-av" style="background:#E9A93A">K</div><div><b>Ken</b> · 45–50<div class="bi-sm">1.1 km away · Tanjong Pagar</div></div></div>' +
      '<div class="bi-chips"><span class="bi-chip">Free Wed, Fri 12:30</span><span class="bi-chip">Likes walking</span></div>' +
      '<div class="bi-btn bi-press a" style="--t:2.4s">Accept</div></div>' +
      '<div class="bi-ok a" style="--t:3.8s"><span>You ✓</span><span>Ken ✓</span></div>' },
    { cap: 'Agree a plan together, by voice or a few taps.', html:
      '<div class="bi-bub bi-me a" style="--t:.2s">Wednesday and Friday, 12:30, Fort Canning Park.</div>' +
      '<div class="bi-card a" style="--t:1.2s"><b>Your plan with Ken</b>' +
      '<div class="bi-week"><i>M</i><i>T</i><i class="hit" style="--t:1.9s">W</i><i>T</i><i class="hit" style="--t:2.2s">F</i><i>S</i><i>S</i></div>' +
      '<div class="bi-sm">12:30 · 30 min walk · Fort Canning Park</div>' +
      '<div class="bi-btn bi-press a" style="--t:2.6s">Save plan</div></div>' },
    { cap: 'Tap Done each day. You see your buddy’s days, and can send a cheer.', html:
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
      '<div class="bi-top"><span>How BUDI works · 25 sec</span><button type="button" class="bi-skip" id="bi-skip">Skip</button></div>' +
      '<div class="bi-bars" style="--d:'+DUR+'ms">'+bars+'</div>' +
      '<div class="bi-phone"><div class="bi-hd"><span class="bi-dots"></span>BUDI</div>'+sc+
      '<div class="bi-end"><h3>That’s BUDI.<br>Two minutes to start.</h3><button type="button" class="bi-cta" id="bi-go">Start talking</button><button type="button" class="bi-ghost" id="bi-again">Watch again</button></div></div>' +
      '<p class="bi-cap" aria-live="polite"></p><p class="bi-note">Ken is an example buddy. Your matches are real people who join.</p></div>';
    document.body.appendChild(ov);
    ov.querySelector('#bi-skip').onclick = close;
    ov.querySelector('#bi-go').onclick = close;
    ov.querySelector('#bi-again').onclick = function(){ go(0); };
    ov.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
  }
  function go(i){
    clearTimeout(timer); idx = i;
    var bars = ov.querySelectorAll('.bi-bars i'), sc = ov.querySelectorAll('.bi-sc'), end = ov.querySelector('.bi-end'), cap = ov.querySelector('.bi-cap');
    end.classList.remove('on');
    bars.forEach(function(b,j){ b.className = j < i ? 'done' : ''; });
    sc.forEach(function(s){ s.classList.remove('on'); });
    if (i >= scenes.length){
      bars.forEach(function(b){ b.className = 'done'; });
      end.classList.add('on'); cap.textContent = 'Ready when you are.';
      ov.querySelector('#bi-go').focus(); return;
    }
    void sc[i].offsetWidth;
    sc[i].classList.add('on'); bars[i].className = 'on';
    cap.textContent = (i+1) + ' of ' + scenes.length + ' · ' + scenes[i].cap;
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
