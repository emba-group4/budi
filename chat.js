/* BUDI small talk: friendly replies when the profile parser finds nothing to update. */
(function(){
  function nm(){ try { var l = JSON.parse(localStorage.getItem('budi-local') || '{}'); return (l.profile && l.profile.name) || ''; } catch(e) { return ''; } }
  var R = [
    [/\b(hi|hello|hey|hiya|yo|good (morning|afternoon|evening))\b|こんにちは|おはよう|こんばんは|你好|您好|哈喽/i, function(n){ return 'Hi' + (n ? ' ' + n : '') + '! Good to hear from you.'; }],
    [/how are (you|u)|how'?s it going|how do you do|元気|你好吗/i, function(){ return 'I’m doing well, thanks for asking! Ready to help you stay on track.'; }],
    [/\b(thanks|thank you|thx|ty)\b|ありがとう|谢谢/i, function(){ return 'You’re welcome!'; }],
    [/\b(bye|goodbye|see you|good night)\b|さようなら|再见/i, function(){ return 'See you soon. Your buddy is counting on you!'; }],
    [/who are you|what are you|what is budi|what('| i)s this|what do you do|what can you do/i, function(){ return 'I’m BUDI, a longevity buddy app. I match you with someone close by who shares your lifestyle, so healthy diet, exercise and fasting habits actually stick.'; }],
    [/\b(help|how does (it|this) work|how to use|instructions?)\b/i, function(){ return 'Tell me your area, when you’re free and what you like to do, and I’ll find a buddy nearby. Tap “How it works” at the top for a 25-second video.'; }],
    [/\b(fast|fasting|16:8|intermittent)\b/i, function(){ return 'Intermittent fasting, such as eating within an 8-hour window, works for many people. Check with your doctor first if you have a health condition. A buddy on the same schedule makes it much easier.'; }],
    [/\b(diet|eat|food|meal|lunch|dinner|sugar|alcohol|drink)\b/i, function(){ return 'Small swaps add up: more whole foods, less sugar and alcohol. Eating with someone who eats the same way helps most people stick to it.'; }],
    [/\b(walk|run|gym|yoga|exercise|workout|steps|swim|cycle|hike)\b/i, function(){ return 'Great choice. Two or three sessions a week with a buddy is a strong start.'; }],
    [/\b(nmn|supplement|stem ?cell|medication|medicine|drug|glp|ozempic|wegovy)\b/i, function(){ return 'Supplements, NMN and stem-cell therapies are a question for your doctor. BUDI focuses on the natural side: diet, exercise and fasting, with a buddy.'; }],
    [/\b(privacy|private|safe|safety|data|contact|phone number)\b/i, function(){ return 'Your buddy only sees your first name, age range, neighbourhood and plan, never your contact details. You both accept before anything opens.'; }],
    [/\b(lonely|alone|sad|tired|stressed|stress)\b/i, function(){ return 'That’s really common, and you’re not the only one. A buddy who checks in with you can make the days lighter.'; }]
  ];
  window.budiChat = function(text, update, question){
    var t = String(text || ''), n = nm(), reply = '';
    for (var i = 0; i < R.length; i++) { if (R[i][0].test(t)) { reply = R[i][1](n); break; } }
    if (!reply) reply = 'Sorry, I didn’t catch that.';
    if (update) return reply + ' To update your profile, tell me something like “I’m free at lunch on Fridays” or “I moved to Bishan”.';
    if (question) return reply + ' ' + question;
    return reply + ' Could you say it another way, or tap one of the options?';
  };
})();
