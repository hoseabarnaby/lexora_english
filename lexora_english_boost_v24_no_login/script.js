/* Lexora English Boost */
'use strict';

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const APP = window.APP_CONFIG || {};
let STUDENT_KEY = 'guest-local';
const getLocalKey = () => `lexora_ielts_${STUDENT_KEY || 'guest-local'}`;
const nowISO = () => new Date().toISOString();
const today = () => new Date();
const dateKey = (d=new Date()) => { const x=new Date(d); x.setMinutes(x.getMinutes()-x.getTimezoneOffset()); return x.toISOString().slice(0,10); };
const daysAgoKey = (n) => { const x=new Date(); x.setDate(x.getDate()-n); return dateKey(x); };
const daysFromNow = (d) => { const x = new Date(); x.setDate(x.getDate()+d); return x.toISOString(); };
const escapeHTML = (str='') => String(str).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m]));
const slugify = (s='') => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || `word-${Date.now()}`;
const shuffle = arr => [...arr].sort(() => Math.random() - .5);
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const uniq = arr => [...new Set(arr.filter(Boolean))];
const clamp = (n,min,max) => Math.max(min, Math.min(max, n));
const sample = (arr,n) => shuffle(arr).slice(0,n);

const dailyTips = [
  {type:'Grammar Tip', title:'Listen to vs Hear', intro:'Keduanya sama-sama tentang suara, tetapi fokusnya berbeda.', rules:['Listen to = memberi perhatian pada suara dengan sengaja.','Hear = suara masuk ke telinga secara alami, tanpa harus sengaja fokus.'], examples:['I like to listen to music.','Please listen to the teacher carefully.','I can hear someone crying.','Did you hear that noise?'], trick:'Attention/focus → listen to. Sound reaches you naturally → hear.', question:'I was ___ the radio when I suddenly ___ a loud scream outside.', options:['hearing, listened to','listening to, heard','hearing, heard','listening to, listened to'], answer:1, explanation:'Listening to the radio = sengaja memperhatikan. Heard a scream = suara tiba-tiba terdengar.'},
  {type:'Confusing Words', title:'Borrow vs Lend', intro:'Dua kata ini sering ketukar karena sama-sama tentang meminjam.', rules:['Borrow = menerima/memakai barang orang lain sementara.','Lend = memberi barang kepada orang lain untuk dipakai sementara.'], examples:['Can I borrow your pen?','She borrowed a book from the library.','I can lend you my notes.','My friend lent me his calculator.'], trick:'Borrow from someone, lend to someone.', question:'Could you ___ me your dictionary? I forgot to bring mine.', options:['borrow','lend','borrowed','lending'], answer:1, explanation:'Orang lain memberikan kamusnya ke kita, jadi dari sudut pandang dia: lend me your dictionary.'},
  {type:'Grammar Tip', title:'Since vs For', intro:'Keduanya sering dipakai dengan present perfect.', rules:['Since = titik waktu mulai.','For = durasi/waktu lamanya.'], examples:['I have lived here since 2021.','She has studied English since last year.','I have studied for two hours.','They have been friends for five years.'], trick:'Since answers “starting when?” For answers “how long?”', question:'I have known her ___ three years.', options:['since','for','during','until'], answer:1, explanation:'Three years adalah durasi, jadi pakai for.'},
  {type:'Vocab Upgrade', title:'Very Important → Crucial / Essential', intro:'Untuk IELTS, jangan terlalu sering memakai very important.', rules:['Crucial = sangat penting karena menentukan hasil.','Essential = sangat diperlukan atau mendasar.'], examples:['Education is crucial for economic development.','Sleep is essential for good health.','Reliable data are crucial for decision-making.','Vocabulary is essential for IELTS preparation.'], trick:'Important masih boleh, tapi crucial/essential terdengar lebih academic.', question:'Regular practice is ___ for improving speaking fluency.', options:['crucial','hungry','tiny','random'], answer:0, explanation:'Crucial berarti sangat penting dan cocok untuk konteks improvement.'},
  {type:'Grammar Tip', title:'Although vs But', intro:'Jangan memakai although dan but bersamaan dalam satu hubungan kalimat.', rules:['Although + clause, main clause.','Main clause, but + contrast clause.','Although already shows contrast, so but is not needed.'], examples:['Although technology is useful, it can distract students.','Technology is useful, but it can distract students.','Although the policy is expensive, it may bring benefits.','The policy is expensive, but it may bring benefits.'], trick:'Choose one: although OR but.', question:'Choose the correct sentence.', options:['Although it was raining, but we went out.','Although it was raining, we went out.','It was raining although but we went out.','Although raining but went out.'], answer:1, explanation:'Although sudah cukup untuk menunjukkan contrast; tidak perlu but.'},
  {type:'Confusing Words', title:'Say vs Tell', intro:'Say fokus pada kata/ucapan. Tell fokus pada orang yang menerima informasi.', rules:['Say something.','Tell someone something.','Tell biasanya butuh object orang: tell me, tell him, tell us.'], examples:['She said that she was tired.','He said hello.','Please tell me the truth.','My teacher told us to practise every day.'], trick:'Tell + person. Say + words/message.', question:'My teacher ___ me to review vocabulary every day.', options:['said','told','sayed','telled'], answer:1, explanation:'Ada object “me”, jadi pakai told me.'},
  {type:'IELTS Phrase', title:'In my opinion vs From my perspective', intro:'Dua-duanya bisa dipakai untuk memberi pendapat di Speaking/Writing.', rules:['In my opinion = natural dan jelas.','From my perspective = sedikit lebih formal.','Jangan gabungkan: In my opinion, I think...'], examples:['In my opinion, public transport should be improved.','From my perspective, online learning is more flexible.','I believe this policy is beneficial.','I partly agree with this view.'], trick:'Pilih satu phrase pendapat, jangan dobel.', question:'Which phrase should you avoid?', options:['In my opinion, public transport is useful.','From my perspective, education is essential.','In my opinion, I think technology is important.','I partly agree with this argument.'], answer:2, explanation:'In my opinion + I think terasa dobel. Pilih salah satu.'},
  {type:'Grammar Tip', title:'Can / Could / May', intro:'Modal verbs membantu membuat kalimat IELTS lebih rapi dan hati-hati.', rules:['Can = ability/possibility umum.','Could = possibility yang lebih soft atau hypothetical.','May = kemungkinan formal.'], examples:['Technology can improve access to education.','This policy could reduce traffic in large cities.','Online learning may benefit students in rural areas.','Students can practise pronunciation using audio tools.'], trick:'Untuk academic writing, may/could terdengar lebih hati-hati daripada selalu can.', question:'This approach ___ help reduce pollution, but more research is needed.', options:['may','must to','can to','should to'], answer:0, explanation:'May cocok karena klaimnya hati-hati dan academic.'},
  {type:'Vocab Upgrade', title:'Bad → Harmful / Detrimental', intro:'Bad terlalu umum. Dalam IELTS, pakai kata yang lebih tepat.', rules:['Harmful = merugikan/berbahaya.','Detrimental = berdampak buruk, lebih formal.'], examples:['Air pollution is harmful to public health.','Excessive screen time can be detrimental to children.','Smoking has harmful effects on the body.','A lack of sleep is detrimental to concentration.'], trick:'Bad effect → detrimental impact.', question:'Too much noise can be ___ to students’ concentration.', options:['detrimental','delicious','ancient','generous'], answer:0, explanation:'Detrimental berarti memberi dampak buruk.'},
  {type:'Grammar Tip', title:'Affect vs Effect', intro:'Ini sering muncul di writing academic.', rules:['Affect = verb, berarti memengaruhi.','Effect = noun, berarti dampak/akibat.'], examples:['Technology can affect how students learn.','Air pollution affects public health.','The effect of pollution is serious.','This policy may have a positive effect.'], trick:'Affect = action. Effect = result.', question:'The new policy may ___ many low-income families.', options:['affect','effect','effective','effectively'], answer:0, explanation:'Setelah may butuh verb dasar; affect adalah verb.'},
  {type:'Grammar Tip', title:'Fewer vs Less', intro:'Keduanya berarti lebih sedikit, tapi jenis noun-nya beda.', rules:['Fewer = countable plural nouns.','Less = uncountable nouns.'], examples:['Fewer cars would reduce traffic.','There are fewer students in the class today.','We need less pollution.','People should spend less time online.'], trick:'Can count it? Use fewer. Cannot count it? Use less.', question:'Cities need ___ cars and ___ pollution.', options:['less, fewer','fewer, less','few, little','less, less'], answer:1, explanation:'Cars bisa dihitung → fewer. Pollution uncountable → less.'},
  {type:'IELTS Writing', title:'Because vs Because of', intro:'Beda struktur setelah because dan because of.', rules:['Because + subject + verb.','Because of + noun/noun phrase.'], examples:['Many people move to cities because they want better jobs.','Many people move to cities because of better job opportunities.','The event was cancelled because it rained.','The event was cancelled because of the rain.'], trick:'Because + sentence. Because of + thing.', question:'The trip was delayed ___ heavy traffic.', options:['because','because of','because that','because to'], answer:1, explanation:'Heavy traffic adalah noun phrase, jadi pakai because of.'},
  {type:'Vocab Upgrade', title:'Good → Beneficial / Effective', intro:'Good sering terlalu umum untuk IELTS.', rules:['Beneficial = memberi manfaat.','Effective = berhasil mencapai tujuan.'], examples:['Exercise is beneficial for mental health.','This method is effective for vocabulary learning.','Public transport can be beneficial for commuters.','Regular feedback is effective in improving writing.'], trick:'Good for people → beneficial. Good at working → effective.', question:'Regular feedback is ___ for improving writing skills.', options:['effective','hungry','noisy','ordinary'], answer:0, explanation:'Effective cocok karena feedback membantu mencapai tujuan improvement.'},
  {type:'Confusing Words', title:'Remember vs Remind', intro:'Remember terjadi di pikiran sendiri. Remind berarti membuat orang ingat.', rules:['Remember = mengingat.','Remind = mengingatkan seseorang.'], examples:['I remember this word now.','Please remember to bring your book.','Please remind me to study tonight.','This song reminds me of my childhood.'], trick:'Remind + person.', question:'Please ___ me to review my flashcards tonight.', options:['remember','remind','remembers','reminding'], answer:1, explanation:'Ada object me, jadi remind me.'},
  {type:'Grammar Tip', title:'Used to vs Be used to', intro:'Bentuknya mirip, maknanya beda.', rules:['Used to + verb = kebiasaan masa lalu.','Be used to + noun/gerund = sudah terbiasa.'], examples:['I used to watch cartoons every morning.','People used to write letters more often.','I am used to studying at night.','She is used to speaking English in class.'], trick:'Used to do = dulu biasa. Be used to doing = sudah terbiasa.', question:'I am used to ___ English every day.', options:['speak','speaking','spoke','to speak'], answer:1, explanation:'Be used to diikuti noun/gerund, jadi speaking.'},
  {type:'IELTS Speaking', title:'Getting the hang of it', intro:'Idiom ini cukup aman untuk Speaking jika konteksnya natural.', rules:['Get the hang of it = mulai paham/terbiasa melakukan sesuatu.','Lebih cocok untuk speaking daripada formal writing.'], examples:['English grammar was difficult, but I am getting the hang of it.','At first, pronunciation was hard, but I got the hang of it.'], trick:'Use it for skill improvement.', question:'At first coding was confusing, but now I am ___ .', options:['getting the hang of it','under the weather','a piece of cake it','costing an arm'], answer:0, explanation:'Getting the hang of it berarti mulai paham/terbiasa.'},
  {type:'Grammar Tip', title:'Each / Every + Singular Verb', intro:'Each dan every biasanya dianggap singular.', rules:['Each student has...','Every person needs...','Jangan pakai plural verb setelah each/every.'], examples:['Each student has a different learning style.','Every child needs support.','Each lesson includes practice questions.','Every answer is checked carefully.'], trick:'Each/every → singular verb.', question:'Each student ___ a different goal.', options:['has','have','are having','were have'], answer:0, explanation:'Each student singular, jadi has.'},
  {type:'IELTS Writing', title:'On the other hand', intro:'Frasa ini dipakai untuk contrast, tapi jangan dipakai tanpa sisi pertama yang jelas.', rules:['On the one hand = satu sisi.','On the other hand = sisi lain.','However bisa lebih simpel untuk contrast.'], examples:['On the one hand, online learning is flexible. On the other hand, it can reduce social interaction.','However, this approach may be expensive.'], trick:'Use paired contrast clearly.', question:'Which linker shows contrast?', options:['However','Therefore','Moreover','For example'], answer:0, explanation:'However menunjukkan contrast.'},
  {type:'Vocab Upgrade', title:'Many → Numerous / A wide range of', intro:'Many boleh, tapi variasi lexical resource bisa membantu.', rules:['Numerous = many, lebih formal.','A wide range of = banyak jenis/variasi.'], examples:['Numerous studies show the benefits of exercise.','Students can access a wide range of online resources.','There are numerous reasons for this trend.','A wide range of skills is needed in the workplace.'], trick:'Many reasons → numerous reasons. Many types → a wide range of.', question:'Students can find ___ resources on the internet.', options:['a wide range of','a hungry of','a tiny range for','a less of'], answer:0, explanation:'A wide range of resources = banyak variasi sumber.'},
  {type:'Grammar Tip', title:'During vs While', intro:'During diikuti noun, while diikuti clause.', rules:['During + noun.','While + subject + verb.'], examples:['I slept during the movie.','Many people stayed home during the storm.','She called me while I was studying.','While I was eating, my friend arrived.'], trick:'During + thing. While + sentence.', question:'She called me ___ I was studying.', options:['during','while','until','by'], answer:1, explanation:'I was studying adalah clause, jadi while.'},
  {type:'IELTS Writing', title:'This essay will discuss...', intro:'Frasa ini bisa dipakai, tapi thesis yang lebih jelas biasanya lebih kuat.', rules:['Untuk agree/disagree, berikan posisi jelas.','Untuk discuss both views, sebut kedua sisi dan opini.'], examples:['This essay argues that the benefits outweigh the drawbacks.','I partly agree because this policy has both advantages and limitations.','This essay will discuss both views before presenting my opinion.'], trick:'Clear position > memorised vague sentence.', question:'Best thesis for “Do advantages outweigh disadvantages?”', options:['This essay argues that the advantages outweigh the disadvantages.','This topic is very popular nowadays.','I will talk about many things.','There are people in the world.'], answer:0, explanation:'Jawaban A langsung menjawab jenis pertanyaan.'},
  {type:'Confusing Words', title:'Raise vs Rise', intro:'Raise butuh object. Rise tidak butuh object.', rules:['Raise = menaikkan sesuatu.','Rise = naik sendiri.'], examples:['The government raised taxes.','The company raised prices.','Prices rose sharply last year.','The number of students rose in 2020.'], trick:'Raise something. Something rises.', question:'The price of fuel ___ last month.', options:['raised','rose','rised','was rise'], answer:1, explanation:'Harga naik sendiri, jadi rise dalam past tense = rose.'},
  {type:'Grammar Tip', title:'To + Verb vs Verb-ing', intro:'Beberapa verb diikuti to, beberapa diikuti gerund.', rules:['Want + to verb.','Enjoy + verb-ing.','Avoid + verb-ing.'], examples:['I want to improve my English.','She enjoys reading novels.','Students should avoid using slang in formal writing.','I decided to practise every day.'], trick:'Want to do, enjoy doing.', question:'I want ___ my vocabulary.', options:['improve','to improve','improving','improved'], answer:1, explanation:'Want diikuti to + verb.'},
  {type:'IELTS Speaking', title:'Under pressure', intro:'Idiom ini cukup natural untuk speaking dan juga umum di listening.', rules:['Under pressure = dalam tekanan.','Bisa dipakai untuk exam, work, school.'], examples:['Students often feel under pressure before exams.','I perform better when I am not under too much pressure.'], trick:'Good for school/exam topics.', question:'Many students are ___ before final exams.', options:['under pressure','under weather','on pressure','in a pressure'], answer:0, explanation:'Collocation yang benar: under pressure.'},
  {type:'Grammar Tip', title:'The number of vs A number of', intro:'Keduanya mirip tapi verb agreement berbeda.', rules:['The number of + plural noun + singular verb.','A number of + plural noun + plural verb.'], examples:['The number of students is increasing.','A number of students are absent today.','The number of cars has risen.','A number of people believe this is necessary.'], trick:'The number = angkanya. A number = beberapa.', question:'The number of online learners ___ increasing.', options:['is','are','were','be'], answer:0, explanation:'The number singular, jadi is.'},
  {type:'Vocab Upgrade', title:'Help → Facilitate / Support', intro:'Help boleh, tapi facilitate/support lebih academic dalam beberapa konteks.', rules:['Facilitate = mempermudah proses.','Support = mendukung.'], examples:['Technology can facilitate independent learning.','Parents should support children’s education.','Online platforms facilitate communication.','Feedback supports student development.'], trick:'Help a process → facilitate. Help a person → support.', question:'Online tools can ___ communication between teachers and students.', options:['facilitate','starve','destroy always','borrow'], answer:0, explanation:'Facilitate communication = mempermudah komunikasi.'},
  {type:'IELTS Writing', title:'Avoid Very, Very, Very', intro:'Very terlalu sering membuat tulisan terasa kurang matang.', rules:['Very big → significant/considerable.','Very bad → harmful/detrimental.','Very important → crucial/essential.'], examples:['This is a significant problem.','Pollution has detrimental effects.','Education is essential for development.','There was a considerable increase in sales.'], trick:'Replace very + adjective with one precise word.', question:'Choose the best upgrade for “very big increase”.', options:['a considerable increase','a very very increase','a bigly increase','an increase much'], answer:0, explanation:'Considerable increase natural dan academic.'},
  {type:'Grammar Tip', title:'Must / Should / Have to', intro:'Ketiganya menunjukkan kewajiban, tapi kekuatannya berbeda.', rules:['Must = sangat wajib/kuat.','Should = saran kuat.','Have to = kewajiban praktis/aturan.'], examples:['Students should practise regularly.','Drivers have to follow traffic rules.','Governments must protect public safety.','You should review your mistakes after each test.'], trick:'For advice in essays, should is often safer than must.', question:'Students ___ review their mistakes to improve faster.', options:['should','should to','must to','are should'], answer:0, explanation:'Should + base verb tanpa to.'},
  {type:'IELTS Phrase', title:'For example vs For instance', intro:'Dua-duanya bisa dipakai untuk memberi contoh.', rules:['For example = common dan jelas.','For instance = variasi yang sedikit lebih formal.','Setelah contoh, jelaskan hubungannya dengan ide utama.'], examples:['For example, students can use apps to review vocabulary.','For instance, online videos can help learners improve pronunciation.'], trick:'Example without explanation is weak. Explain why it matters.', question:'Choose the correct phrase.', options:['For example, many students use flashcards.','For examples, many students use flashcards.','For example many students use flashcards without comma always wrong.','For the example of students use flashcards.'], answer:0, explanation:'For example adalah frasa yang benar.'},
  {type:'Confusing Words', title:'Job vs Work', intro:'Job biasanya countable noun. Work biasanya uncountable noun/verb.', rules:['A job = posisi pekerjaan.','Work = pekerjaan secara umum / bekerja.'], examples:['She has a new job.','I have a lot of work to do.','He works in a hospital.','Finding a good job can be difficult.'], trick:'One position = a job. Tasks/general activity = work.', question:'I have ___ to do tonight.', options:['many works','a lot of work','a work','several work'], answer:1, explanation:'Work sebagai noun umum biasanya uncountable.'},
  {type:'Grammar Tip', title:'By vs Until', intro:'By berarti deadline. Until berarti berlangsung sampai waktu tertentu.', rules:['By Friday = paling lambat Jumat.','Until Friday = terus berlangsung sampai Jumat.'], examples:['Please submit the assignment by Friday.','The library is open until 8 p.m.','I need to finish this by tomorrow.','We studied until midnight.'], trick:'By = deadline. Until = duration continues.', question:'Please finish this assignment ___ tomorrow.', options:['by','until','during','since'], answer:0, explanation:'Finish punya deadline, jadi by tomorrow.'}
];


const state = {
  client:null, cloudReady:false, usingCloud:false, selected:null, currentView:'dashboard', flash:null, theme:'light',
  vocab:[], local:null, quizResults:[], readingResults:[], grammarDone:{}, moduleProgress:{}, lastWritingFeedback:null, currentTest:null,
  currentReading:null, currentWritingPrompt:null, currentSpeakingPrompt:null, pronIndex:0, editingSlug:null, expressionOrder:null, idiomOrder:null, grammarBand:'all', currentListening:null, listeningOrder:null
};

const fallbackLocal = () => ({progress:{}, custom:[], quizResults:[], readingResults:[], grammarDone:{}, writing:[], speaking:[], expressionFavorites:{}, reviewTracker:{}, moduleProgress:{}, attemptedQuestions:{}, streak:{days:[], current:0, best:0, lastActive:null, log:[]}});
function normaliseLocal(local){
  const base = fallbackLocal();
  const out = Object.assign(base, local || {});
  out.streak = Object.assign(base.streak, out.streak || {});
  out.expressionFavorites = Object.assign(base.expressionFavorites, out.expressionFavorites || {});
  out.reviewTracker = Object.assign(base.reviewTracker, out.reviewTracker || {});
  out.streak.days = uniq(out.streak.days || []).sort();
  return out;
}
function loadLocal(){
  try { state.local = normaliseLocal(JSON.parse(localStorage.getItem(getLocalKey()) || '{}')); }
  catch { state.local = fallbackLocal(); }
  state.quizResults = state.local.quizResults || [];
  state.readingResults = state.local.readingResults || [];
  state.grammarDone = state.local.grammarDone || {};
  state.moduleProgress = state.local.moduleProgress || {};
  state.local.attemptedQuestions = state.local.attemptedQuestions || {};
}
function saveLocal(){ localStorage.setItem(getLocalKey(), JSON.stringify(state.local)); }

const builtinRaw = () => Array.isArray(window.IELTS_VOCAB_DATA) ? window.IELTS_VOCAB_DATA : [];
async function loadBuiltinDataFile(){
  if(builtinRaw().length) return builtinRaw();
  try{
    const res = await fetch('data/vocab-5000.js', {cache:'no-store'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if(start >= 0 && end > start){
      const parsed = JSON.parse(text.slice(start, end + 1));
      window.IELTS_VOCAB_DATA = parsed;
      return parsed;
    }
  }catch(e){
    console.warn('Built-in vocabulary fallback failed:', e.message || e);
  }
  return [];
}
function ensureVocabLoaded(){
  if(state.vocab && state.vocab.length) return true;
  const raw = builtinRaw();
  if(!raw.length) return false;
  const builtins = raw.map(v => normalizeVocab({...v, source:'built-in'}));
  state.vocab = applyLocalProgress(builtins);
  if(!state.selected && state.vocab.length) state.selected = state.vocab[0].slug;
  return state.vocab.length > 0;
}
function normalizeVocab(v){
  const slug = v.slug || slugify(v.word);
  return {
    id: v.id || slug, student_key: v.student_key || STUDENT_KEY, slug,
    word: v.word || slug.replace(/-/g,' '), level: v.level || 'Intermediate', part_of_speech: v.part_of_speech || 'word',
    meaning_id: v.meaning_id || v.meaning || '', definition_en: v.definition_en || '', example_en: v.example_en || '',
    topic: v.topic || 'General', synonym: v.synonym || '', antonym: v.antonym || '', upgrade_from: v.upgrade_from || '',
    difficulty: Number(v.difficulty || 3), ease: Number(v.ease || 2.5), interval_days: Number(v.interval_days || 0),
    repetitions: Number(v.repetitions || 0), lapses: Number(v.lapses || 0), due_at: v.due_at || nowISO(), last_reviewed_at: v.last_reviewed_at || null,
    correct_count: Number(v.correct_count || 0), wrong_count: Number(v.wrong_count || 0), source: v.source || 'built-in',
    mastered: !!v.mastered, created_at: v.created_at || nowISO(), updated_at: v.updated_at || nowISO()
  };
}
function dbVocab(v){
  const n = normalizeVocab(v);
  return {
    student_key: STUDENT_KEY, slug:n.slug, word:n.word, level:n.level, part_of_speech:n.part_of_speech,
    meaning_id:n.meaning_id, definition_en:n.definition_en, example_en:n.example_en, topic:n.topic,
    synonym:n.synonym, antonym:n.antonym, upgrade_from:n.upgrade_from, difficulty:n.difficulty,
    ease:n.ease, interval_days:n.interval_days, repetitions:n.repetitions, lapses:n.lapses, due_at:n.due_at,
    last_reviewed_at:n.last_reviewed_at, correct_count:n.correct_count, wrong_count:n.wrong_count,
    source:n.source, mastered:n.mastered, updated_at:nowISO()
  };
}
function applyLocalProgress(vocab){
  const p = state.local.progress || {};
  const merged = vocab.map(v => p[v.slug] ? {...v, ...p[v.slug]} : v);
  const custom = (state.local.custom || []).map(normalizeVocab);
  const map = new Map();
  [...merged, ...custom].forEach(v => map.set(v.slug, v));
  return [...map.values()];
}


const dailyExpressions = [
  {id:'support-1', phrase:"I'm here to support you", meaning:'Aku di sini untuk mendukungmu', category:'Support', note:'Dipakai saat ingin memberi dukungan yang hangat.', example:"If you feel nervous before the test, remember that I'm here to support you."},
  {id:'support-2', phrase:"I'm here for you", meaning:'Aku ada untukmu', category:'Support', note:'Lebih personal dan emosional.', example:"When things get hard, I'm here for you."},
  {id:'support-3', phrase:'You can count on me', meaning:'Kamu bisa mengandalkan saya', category:'Support', note:'Meyakinkan orang bahwa kita siap membantu.', example:'For your English practice, you can count on me.'},
  {id:'support-4', phrase:'How can I help?', meaning:'Bagaimana saya bisa membantu?', category:'Support', note:'Sederhana tapi sangat berguna.', example:'You look confused. How can I help?'},
  {id:'support-5', phrase:'Take it one step at a time', meaning:'Jalani satu langkah demi satu langkah', category:'Mindset', note:'Bagus untuk menenangkan diri saat belajar.', example:'Do not panic about IELTS. Take it one step at a time.'},
  {id:'support-6', phrase:'It is okay to make mistakes', meaning:'Tidak apa-apa membuat kesalahan', category:'Mindset', note:'Membantu menurunkan takut salah.', example:'It is okay to make mistakes when you are learning.'},
  {id:'support-7', phrase:'Focus on progress, not perfection', meaning:'Fokus pada kemajuan, bukan kesempurnaan', category:'Mindset', note:'Cocok untuk motivasi belajar jangka panjang.', example:'Focus on progress, not perfection, and keep practising.'},
  {id:'support-8', phrase:'You are doing better than you think', meaning:'Kamu berkembang lebih baik dari yang kamu kira', category:'Mindset', note:'Ungkapan penyemangat.', example:'You are doing better than you think, so keep going.'},
  {id:'class-1', phrase:'Could you explain that again?', meaning:'Bisakah kamu menjelaskan itu lagi?', category:'Classroom', note:'Dipakai saat belum paham penjelasan.', example:'Could you explain that again? I missed the last part.'},
  {id:'class-2', phrase:'Let us break it into small parts', meaning:'Mari kita pecah menjadi bagian-bagian kecil', category:'Classroom', note:'Bagus untuk belajar bertahap.', example:'This topic is long, so let us break it into small parts.'},
  {id:'class-3', phrase:'Say it out loud', meaning:'Ucapkan dengan suara keras', category:'Classroom', note:'Membantu speaking dan memory.', example:'Read the new word and say it out loud.'},
  {id:'class-4', phrase:'Try again slowly', meaning:'Coba lagi secara perlahan', category:'Classroom', note:'Berguna saat pronunciation belum tepat.', example:'Try again slowly and stress the first syllable.'},
  {id:'class-5', phrase:'Make your own sentence', meaning:'Buat kalimatmu sendiri', category:'Classroom', note:'Teknik aktivasi vocabulary.', example:'After learning the word, make your own sentence.'},
  {id:'class-6', phrase:'What does this word mean?', meaning:'Apa arti kata ini?', category:'Classroom', note:'Pertanyaan inti saat belajar vocab.', example:'What does this word mean in this sentence?'},
  {id:'daily-1', phrase:'I am looking forward to it', meaning:'Saya menantikannya', category:'Daily Life', note:'Dipakai untuk antusiasme.', example:'I am looking forward to the speaking test because I feel prepared.'},
  {id:'daily-2', phrase:'That makes sense', meaning:'Itu masuk akal', category:'Daily Life', note:'Respons yang natural.', example:'Your explanation makes sense.'},
  {id:'daily-3', phrase:'I will give it a try', meaning:'Saya akan mencobanya', category:'Daily Life', note:'Menunjukkan kesediaan mencoba.', example:'This method seems useful, so I will give it a try.'},
  {id:'daily-4', phrase:'Do not rush', meaning:'Jangan terburu-buru', category:'Daily Life', note:'Bisa dipakai untuk menenangkan diri.', example:'Do not rush; accuracy matters in IELTS writing.'},
  {id:'daily-5', phrase:'Take your time', meaning:'Santai saja / gunakan waktumu', category:'Daily Life', note:'Lebih lembut daripada do not rush.', example:'Take your time and think before answering.'},
  {id:'ielts-1', phrase:'In my opinion', meaning:'Menurut pendapat saya', category:'IELTS Speaking', note:'Frasa aman untuk menyampaikan pendapat.', example:'In my opinion, public transport should be improved.'},
  {id:'ielts-2', phrase:'From my perspective', meaning:'Dari sudut pandang saya', category:'IELTS Speaking', note:'Alternatif lebih formal.', example:'From my perspective, online learning is more flexible.'},
  {id:'ielts-3', phrase:'There are several reasons for this', meaning:'Ada beberapa alasan untuk hal ini', category:'IELTS Speaking', note:'Membantu memperpanjang jawaban.', example:'There are several reasons for this, including cost and convenience.'},
  {id:'ielts-4', phrase:'One possible explanation is that...', meaning:'Satu kemungkinan penjelasannya adalah...', category:'IELTS Speaking', note:'Bagus untuk elaborasi ide.', example:'One possible explanation is that young people spend more time online.'},
  {id:'ielts-5', phrase:'On the one hand', meaning:'Di satu sisi', category:'IELTS Writing', note:'Untuk membahas dua sisi argumen.', example:'On the one hand, technology improves access to information.'},
  {id:'ielts-6', phrase:'On the other hand', meaning:'Di sisi lain', category:'IELTS Writing', note:'Pasangan dari on the one hand.', example:'On the other hand, it can distract students.'}
];



const idiomData = [
  {
    "id": "idiom-1",
    "phrase": "get the hang of it",
    "meaning": "mulai paham / mulai terbiasa",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "At first, IELTS writing was confusing, but I am getting the hang of it.",
    "academic_alt": "become familiar with it"
  },
  {
    "id": "idiom-2",
    "phrase": "under pressure",
    "meaning": "dalam tekanan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Students are often under pressure before important exams.",
    "academic_alt": "experience significant pressure"
  },
  {
    "id": "idiom-3",
    "phrase": "keep up with",
    "meaning": "mengikuti perkembangan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "It is hard to keep up with new technology.",
    "academic_alt": "stay updated with"
  },
  {
    "id": "idiom-4",
    "phrase": "step by step",
    "meaning": "bertahap",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I try to improve my English step by step.",
    "academic_alt": "gradually"
  },
  {
    "id": "idiom-5",
    "phrase": "a big deal",
    "meaning": "hal penting",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Education is a big deal for many families.",
    "academic_alt": "a significant issue"
  },
  {
    "id": "idiom-6",
    "phrase": "on the same page",
    "meaning": "memiliki pemahaman yang sama",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Group work is easier when everyone is on the same page.",
    "academic_alt": "share the same understanding"
  },
  {
    "id": "idiom-7",
    "phrase": "think outside the box",
    "meaning": "berpikir kreatif",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Schools should encourage students to think outside the box.",
    "academic_alt": "think creatively"
  },
  {
    "id": "idiom-8",
    "phrase": "learn the hard way",
    "meaning": "belajar dari kesalahan/pengalaman sulit",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I learned the hard way that memorising without practice is not enough.",
    "academic_alt": "learn through difficult experience"
  },
  {
    "id": "idiom-9",
    "phrase": "a turning point",
    "meaning": "titik balik",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Getting feedback from my teacher was a turning point.",
    "academic_alt": "a significant change"
  },
  {
    "id": "idiom-10",
    "phrase": "pay attention to",
    "meaning": "memperhatikan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I need to pay attention to my pronunciation.",
    "academic_alt": "focus on"
  },
  {
    "id": "idiom-11",
    "phrase": "make up my mind",
    "meaning": "mengambil keputusan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I have not made up my mind about my university major.",
    "academic_alt": "make a decision"
  },
  {
    "id": "idiom-12",
    "phrase": "look on the bright side",
    "meaning": "melihat sisi positif",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "When I make mistakes, I try to look on the bright side and learn from them.",
    "academic_alt": "consider the positive aspect"
  },
  {
    "id": "idiom-13",
    "phrase": "in the long run",
    "meaning": "dalam jangka panjang",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "In the long run, daily practice is more useful than cramming.",
    "academic_alt": "over the long term"
  },
  {
    "id": "idiom-14",
    "phrase": "once in a while",
    "meaning": "sesekali",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I watch English movies once in a while to improve my listening.",
    "academic_alt": "occasionally"
  },
  {
    "id": "idiom-15",
    "phrase": "from time to time",
    "meaning": "dari waktu ke waktu / sesekali",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "From time to time, I review old vocabulary.",
    "academic_alt": "occasionally"
  },
  {
    "id": "idiom-16",
    "phrase": "go the extra mile",
    "meaning": "berusaha lebih dari yang diminta",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Good teachers often go the extra mile to help students.",
    "academic_alt": "make an additional effort"
  },
  {
    "id": "idiom-17",
    "phrase": "the tip of the iceberg",
    "meaning": "hanya sebagian kecil dari masalah",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Exam stress is only the tip of the iceberg for many students.",
    "academic_alt": "a small visible part of a larger issue"
  },
  {
    "id": "idiom-18",
    "phrase": "a double-edged sword",
    "meaning": "pedang bermata dua",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Technology is a double-edged sword because it helps learning but can distract students.",
    "academic_alt": "has both advantages and disadvantages"
  },
  {
    "id": "idiom-19",
    "phrase": "under the weather",
    "meaning": "kurang enak badan",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "I was under the weather yesterday, so I could not study.",
    "academic_alt": "feel unwell"
  },
  {
    "id": "idiom-20",
    "phrase": "a piece of cake",
    "meaning": "sangat mudah",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "The quiz was a piece of cake for her.",
    "academic_alt": "relatively easy"
  },
  {
    "id": "idiom-21",
    "phrase": "once in a blue moon",
    "meaning": "sangat jarang",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "He goes to the library once in a blue moon.",
    "academic_alt": "very rarely"
  },
  {
    "id": "idiom-22",
    "phrase": "break the ice",
    "meaning": "mencairkan suasana",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "The teacher used a game to break the ice.",
    "academic_alt": "make people feel more comfortable"
  },
  {
    "id": "idiom-23",
    "phrase": "hit the books",
    "meaning": "belajar serius",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "I need to hit the books before the exam.",
    "academic_alt": "study seriously"
  },
  {
    "id": "idiom-24",
    "phrase": "call it a day",
    "meaning": "mengakhiri aktivitas hari itu",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "After three hours of practice, we called it a day.",
    "academic_alt": "finish the activity"
  },
  {
    "id": "idiom-25",
    "phrase": "miss the boat",
    "meaning": "melewatkan kesempatan",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "If you apply late, you may miss the boat.",
    "academic_alt": "miss an opportunity"
  },
  {
    "id": "idiom-26",
    "phrase": "cost an arm and a leg",
    "meaning": "sangat mahal",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Studying abroad can cost an arm and a leg.",
    "academic_alt": "be extremely expensive"
  },
  {
    "id": "idiom-27",
    "phrase": "the ball is in your court",
    "meaning": "sekarang giliranmu mengambil tindakan",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "I gave you the advice; now the ball is in your court.",
    "academic_alt": "it is your responsibility to act"
  },
  {
    "id": "idiom-28",
    "phrase": "beat around the bush",
    "meaning": "berputar-putar / tidak langsung ke inti",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Please do not beat around the bush; tell me the main point.",
    "academic_alt": "avoid the main point"
  },
  {
    "id": "idiom-29",
    "phrase": "burn the midnight oil",
    "meaning": "belajar/bekerja sampai larut",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Many students burn the midnight oil before exams.",
    "academic_alt": "study or work late at night"
  },
  {
    "id": "idiom-30",
    "phrase": "cut corners",
    "meaning": "mengambil jalan pintas dengan mengurangi kualitas",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Schools should not cut corners when it comes to safety.",
    "academic_alt": "reduce quality to save time or money"
  },
  {
    "id": "idiom-31",
    "phrase": "back to square one",
    "meaning": "kembali ke awal",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "The plan failed, so we were back to square one.",
    "academic_alt": "return to the beginning"
  },
  {
    "id": "idiom-32",
    "phrase": "better late than never",
    "meaning": "lebih baik terlambat daripada tidak sama sekali",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "I started learning vocabulary late, but better late than never.",
    "academic_alt": "late action is better than no action"
  },
  {
    "id": "idiom-33",
    "phrase": "out of the blue",
    "meaning": "tiba-tiba",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "He called me out of the blue.",
    "academic_alt": "unexpectedly"
  },
  {
    "id": "idiom-34",
    "phrase": "a blessing in disguise",
    "meaning": "hal buruk yang ternyata membawa kebaikan",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Failing the mock test was a blessing in disguise because it showed my weaknesses.",
    "academic_alt": "an apparent problem that leads to a benefit"
  },
  {
    "id": "idiom-35",
    "phrase": "the best of both worlds",
    "meaning": "mendapat dua keuntungan sekaligus",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Blended learning can offer the best of both worlds.",
    "academic_alt": "combine two advantages"
  },
  {
    "id": "idiom-36",
    "phrase": "put all your eggs in one basket",
    "meaning": "menaruh semua harapan pada satu pilihan",
    "use": "Understand",
    "category": "Listening/Reading",
    "example": "Students should not put all their eggs in one basket when applying to universities.",
    "academic_alt": "rely on only one option"
  },
  {
    "id": "idiom-37",
    "phrase": "when pigs fly",
    "meaning": "sesuatu yang hampir tidak mungkin",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "He will study every day when pigs fly.",
    "academic_alt": "highly unlikely"
  },
  {
    "id": "idiom-38",
    "phrase": "spill the beans",
    "meaning": "membocorkan rahasia",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "She spilled the beans about the surprise.",
    "academic_alt": "reveal confidential information"
  },
  {
    "id": "idiom-39",
    "phrase": "let the cat out of the bag",
    "meaning": "membocorkan rahasia",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "He let the cat out of the bag too early.",
    "academic_alt": "reveal a secret"
  },
  {
    "id": "idiom-40",
    "phrase": "kick the bucket",
    "meaning": "meninggal dunia",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "This idiom is too casual for formal writing.",
    "academic_alt": "pass away"
  },
  {
    "id": "idiom-41",
    "phrase": "hang in there",
    "meaning": "bertahanlah",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "Hang in there; the exam preparation will get easier.",
    "academic_alt": "remain persistent"
  },
  {
    "id": "idiom-42",
    "phrase": "chill out",
    "meaning": "tenang / santai",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "You need to chill out before the speaking test.",
    "academic_alt": "relax"
  },
  {
    "id": "idiom-43",
    "phrase": "kids these days",
    "meaning": "anak-anak zaman sekarang",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "Kids these days use technology constantly.",
    "academic_alt": "young people today"
  },
  {
    "id": "idiom-44",
    "phrase": "super easy",
    "meaning": "sangat mudah",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "The solution is super easy.",
    "academic_alt": "relatively straightforward"
  },
  {
    "id": "idiom-45",
    "phrase": "tons of",
    "meaning": "banyak sekali",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "There are tons of reasons for this trend.",
    "academic_alt": "numerous"
  },
  {
    "id": "idiom-46",
    "phrase": "stuff like that",
    "meaning": "hal-hal seperti itu",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "People buy phones, laptops, and stuff like that.",
    "academic_alt": "similar items"
  },
  {
    "id": "idiom-47",
    "phrase": "sort of",
    "meaning": "agak / semacam",
    "use": "Avoid in writing",
    "category": "Casual",
    "example": "This policy is sort of useful.",
    "academic_alt": "somewhat"
  },
  {
    "id": "idiom-48",
    "phrase": "a lot of",
    "meaning": "banyak",
    "use": "Writing caution",
    "category": "Academic alternative",
    "example": "A lot of students use online learning.",
    "academic_alt": "many / a significant number of"
  },
  {
    "id": "idiom-49",
    "phrase": "nowadays",
    "meaning": "sekarang ini",
    "use": "Writing caution",
    "category": "Academic alternative",
    "example": "Nowadays, people use smartphones.",
    "academic_alt": "In recent years"
  },
  {
    "id": "idiom-50",
    "phrase": "good for society",
    "meaning": "baik untuk masyarakat",
    "use": "Writing caution",
    "category": "Academic alternative",
    "example": "Education is good for society.",
    "academic_alt": "beneficial for society"
  },
  {
    "id": "idiom-51",
    "phrase": "bad effect",
    "meaning": "dampak buruk",
    "use": "Writing caution",
    "category": "Academic alternative",
    "example": "Pollution has a bad effect on health.",
    "academic_alt": "a detrimental impact"
  },
  {
    "id": "idiom-52",
    "phrase": "very important",
    "meaning": "sangat penting",
    "use": "Writing caution",
    "category": "Academic alternative",
    "example": "Education is very important.",
    "academic_alt": "crucial / essential"
  },
  {
    "id": "idiom-53",
    "phrase": "make progress",
    "meaning": "membuat kemajuan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I can make progress if I practise every day.",
    "academic_alt": "improve gradually"
  },
  {
    "id": "idiom-54",
    "phrase": "fall behind",
    "meaning": "tertinggal",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "If students do not practise, they may fall behind.",
    "academic_alt": "fail to keep up"
  },
  {
    "id": "idiom-55",
    "phrase": "catch up",
    "meaning": "mengejar ketertinggalan",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I need to catch up on grammar this week.",
    "academic_alt": "make up for lost progress"
  },
  {
    "id": "idiom-56",
    "phrase": "figure out",
    "meaning": "memahami / mencari solusi",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I am trying to figure out how to improve my writing.",
    "academic_alt": "understand / solve"
  },
  {
    "id": "idiom-57",
    "phrase": "bring up",
    "meaning": "mengangkat topik",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "The examiner may bring up questions about education.",
    "academic_alt": "mention / raise"
  },
  {
    "id": "idiom-58",
    "phrase": "come up with",
    "meaning": "menemukan ide",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Students should come up with creative solutions.",
    "academic_alt": "propose / develop"
  },
  {
    "id": "idiom-59",
    "phrase": "deal with",
    "meaning": "menghadapi / menangani",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "Governments must deal with traffic congestion.",
    "academic_alt": "address / handle"
  },
  {
    "id": "idiom-60",
    "phrase": "run out of time",
    "meaning": "kehabisan waktu",
    "use": "Speaking safe",
    "category": "Speaking",
    "example": "I often run out of time in reading tests.",
    "academic_alt": "have insufficient time"
  }
];

const bandLevels = [
  {id:'band5', label:'Band 5 Foundation', short:'Band 5', focus:'Rapikan kalimat dasar dulu: subject-verb, articles, tenses sederhana, dan common mistakes.', goal:'Bisa menulis kalimat sederhana yang cukup jelas.', lessons:['articles','subject-verb','present-simple-continuous','prepositions','count-uncount','common-errors'], vocab:'Beginner–Pre-Intermediate'},
  {id:'band6', label:'Band 6 Builder', short:'Band 6', focus:'Mulai stabil: past tenses, present perfect, passive voice, modals, conditionals, dan essay structure.', goal:'Bisa menjelaskan ide dengan grammar cukup aman.', lessons:['past-tenses','present-perfect','future','passive','modals','conditionals','relative-clauses','noun-phrases','comparatives','trend-language','overview','essay-structure'], vocab:'Intermediate'},
  {id:'band7', label:'Band 7 Academic', short:'Band 7', focus:'Naikkan kualitas argumen: complex sentences, cohesion, hedging, task response, dan lexical resource.', goal:'Bisa menulis lebih akademik, koheren, dan tidak terlalu repetitif.', lessons:['complex-sentences','cohesion','hedging','nominalisation','punctuation','task-response','lexical-resource'], vocab:'Upper-Intermediate–Advanced'},
  {id:'band8', label:'Band 8–9 Precision', short:'Band 8–9', focus:'Perhalus akurasi: nuance, sentence control, vocabulary precision, dan minim error kecil.', goal:'Tulisan terdengar natural, padat, dan sangat terkontrol.', lessons:['hedging','nominalisation','complex-sentences','punctuation','lexical-resource','task-response'], vocab:'Advanced–Band 9 style'}
];
const lessonBandMap = {}; bandLevels.forEach(b => b.lessons.forEach(id => { if(!lessonBandMap[id]) lessonBandMap[id] = b.id; }));
function bandInfo(id){ return bandLevels.find(b=>b.id===id) || bandLevels[0]; }
function lessonBand(id){
  if(state.grammarBand && state.grammarBand !== 'all'){
    const active = bandInfo(state.grammarBand);
    if(active.lessons.includes(id)) return active;
  }
  return bandInfo(lessonBandMap[id] || 'band6');
}
function bandProgress(band){
  const total = band.lessons.length || 1;
  const done = band.lessons.filter(id => state.grammarDone[id]).length;
  return {done,total,percent:Math.round(done/total*100)};
}
function renderBandPath(targetId='dashboardBandPath', clickable=true){
  const el = $('#'+targetId); if(!el) return;
  el.innerHTML = bandLevels.map(b=>{ const p=bandProgress(b); return `<button class="band-card ${state.grammarBand===b.id?'active':''}" data-band-select="${b.id}"><span class="band-ribbon">${escapeHTML(b.short)}</span><h4>${escapeHTML(b.label)}</h4><p>${escapeHTML(b.focus)}</p><div class="band-mini"><span class="band-pill">${p.done}/${p.total} lessons</span><span class="band-pill">${p.percent}% done</span><span class="band-pill">${escapeHTML(b.vocab)}</span></div></button>`; }).join('');
  if(clickable){ $$(`#${targetId} [data-band-select]`).forEach(btn=>btn.onclick=()=>{ state.grammarBand=btn.dataset.bandSelect; const f=$('#grammarBandFilter'); if(f) f.value=state.grammarBand; setView('grammar'); }); }
}
function filteredGrammarLessons(){
  if(!state.grammarBand || state.grammarBand==='all') return grammarLessons;
  const b = bandInfo(state.grammarBand);
  return b.lessons.map(id=>grammarLessons.find(g=>g.id===id)).filter(Boolean);
}

const grammarLessons = [
  {id:'articles',title:'Articles: a/an/the/zero',level:'Core',summary:'Pakai article dengan jelas supaya writing lebih natural.',patterns:['a/an + singular countable noun: a student, an idea','the + noun yang spesifik: the government, the problem','zero article untuk plural/general: people need education'],examples:['A university should provide practical skills.','The chart shows a significant increase in sales.','People often rely on technology for communication.'],mistakes:['I bought laptop → I bought a laptop','The education is important → Education is important','She is an honest person, bukan a honest person'],quiz:{q:'Choose the correct sentence.',options:['I bought a new laptop yesterday.','I bought new laptop yesterday.','I bought an new laptop yesterday.','I bought the new laptop yesterday randomly.'],answer:0}},
  {id:'prepositions',title:'Prepositions for IELTS',level:'Core',summary:'In, on, at, by, for, since, during, while, until sering muncul.',patterns:['in + month/year/place: in 2026, in Indonesia','on + day/date/surface: on Monday, on the table','at + specific time/place point: at 8 p.m., at school'],examples:['The figure increased in 2020.','The meeting starts at 8:20.','People stayed indoors during the storm.'],mistakes:['discuss about the problem → discuss the problem','married with → married to','different with → different from/to'],quiz:{q:'Which is correct?',options:['I have lived here since 2021.','I have lived here for 2021.','I have lived here during 2021 until now.','I have lived here by 2021.'],answer:0}},
  {id:'present-simple-continuous',title:'Present Simple vs Continuous',level:'Core',summary:'Gunakan simple untuk fakta/kebiasaan, continuous untuk aksi sedang terjadi/trend sementara.',patterns:['simple: People use smartphones every day.','continuous: More students are using online platforms.','IELTS Task 1 sering pakai present simple untuk chart tanpa waktu lampau.'],examples:['The graph shows the number of visitors.','Technology is changing how people learn.','Many teenagers spend time online after school.'],mistakes:['The graph is show → The graph shows','People using phone everyday → People use phones every day'],quiz:{q:'Correct sentence:',options:['The graph shows a sharp increase.','The graph show a sharp increase.','The graph is show a sharp increase.','The graph showing a sharp increase.'],answer:0}},
  {id:'past-tenses',title:'Past Tenses',level:'Core',summary:'Task 1 dengan tahun lampau butuh past simple; cerita pengalaman pakai past continuous/past perfect.',patterns:['past simple: The rate increased in 2010.','past continuous: I was studying when my friend called.','past perfect: The figure had fallen before it recovered.'],examples:['Car ownership rose steadily between 1990 and 2010.','While I was preparing for IELTS, I built my vocabulary.'],mistakes:['I have know her since last years → I have known her since last year','The cake had eaten → The cake had been eaten'],quiz:{q:'Choose the correct passive past perfect.',options:['The cake had been eaten.','The cake had eaten.','The cake has ate.','The cake was eat.'],answer:0}},
  {id:'present-perfect',title:'Present Perfect',level:'Core',summary:'Pakai have/has + V3 untuk pengalaman atau situasi dari masa lalu sampai sekarang.',patterns:['since + titik waktu: since 2021','for + durasi: for three years','has increased = mulai dulu, masih relevan sekarang'],examples:['Online learning has become more common.','I have studied English for two hours.','She has lived here since 2020.'],mistakes:['I have know → I have known','since three years → for three years'],quiz:{q:'Which is correct?',options:['I have studied for three hours.','I have studied since three hours.','I studied since three hours.','I have study for three hours.'],answer:0}},
  {id:'future',title:'Future Forms',level:'Core',summary:'Will, going to, and present continuous punya nuansa berbeda.',patterns:['will: prediction/instant decision','going to: plan/evidence','present continuous: fixed arrangement'],examples:['This policy will reduce pollution.','The government is going to invest in public transport.','I am taking an IELTS mock test tomorrow.'],mistakes:['I will going to → I am going to / I will','The exam will starts → The exam will start'],quiz:{q:'Correct future form:',options:['The exam will start at 9 a.m.','The exam will starts at 9 a.m.','The exam will starting at 9 a.m.','The exam is will start at 9 a.m.'],answer:0}},
  {id:'passive',title:'Passive Voice',level:'Core',summary:'Passive berguna untuk academic writing saat pelaku tidak penting.',patterns:['be + V3: is produced, was built, has been reduced','Task 1 process: The beans are roasted.','Academic: More funding should be provided.'],examples:['The room is being cleaned now.','The data were collected from 500 students.','The policy has been implemented nationwide.'],mistakes:['Coffee made by them → Coffee is made by them','The cake had eaten → The cake had been eaten'],quiz:{q:'Correct passive:',options:['The data were collected in 2020.','The data collected in 2020 by itself.','The data was collect in 2020.','The data were collecting in 2020.'],answer:0}},
  {id:'modals',title:'Modals for Academic Tone',level:'Intermediate',summary:'Can, could, may, might, should, must membantu membuat argumen lebih tepat.',patterns:['may/might = kemungkinan','should = saran','must = kebutuhan kuat','could = kemungkinan/solusi'],examples:['Governments should invest in education.','This approach may reduce inequality.','Technology can improve access to information.'],mistakes:['must to study → must study','should to reduce → should reduce'],quiz:{q:'Which sentence is correct?',options:['The government should invest more.','The government should to invest more.','The government should investing more.','The government should invested more.'],answer:0}},
  {id:'conditionals',title:'Conditionals',level:'Intermediate',summary:'If sentences penting untuk solusi dan konsekuensi di Task 2.',patterns:['zero: If people exercise, they stay healthier.','first: If governments invest, pollution will fall.','second: If cities were safer, more people would cycle.'],examples:['If students practise daily, they will improve faster.','If public transport were cheaper, car use might decline.'],mistakes:['If will people study → If people study','If I would have money → If I had money'],quiz:{q:'Correct first conditional:',options:['If people recycle more, waste will decrease.','If people will recycle more, waste decreases.','If people recycled, waste will decreases.','If people recycle more, waste decrease.'],answer:0}},
  {id:'relative-clauses',title:'Relative Clauses',level:'Intermediate',summary:'Who, which, that, where membuat kalimat lebih kompleks.',patterns:['who for people','which for things/ideas','where for places','non-defining clause pakai koma'],examples:['Students who practise regularly improve faster.','This policy, which is expensive, may help low-income families.'],mistakes:['People which live → People who live','Technology who helps → Technology that/which helps'],quiz:{q:'Choose the correct relative pronoun.',options:['People who exercise regularly are healthier.','People which exercise regularly are healthier.','People where exercise regularly are healthier.','People whom exercise regularly are healthier.'],answer:0}},
  {id:'noun-phrases',title:'Noun Phrases',level:'Intermediate',summary:'Noun phrase membuat writing lebih padat: adjective + noun + prepositional phrase.',patterns:['a significant increase in sales','the rapid growth of online learning','the negative impact of pollution on health'],examples:['The rapid development of technology has changed education.','A lack of public funding can reduce service quality.'],mistakes:['increase of sales? boleh, tapi increase in sales lebih umum','impact to health → impact on health'],quiz:{q:'Best academic noun phrase:',options:['a significant increase in sales','sales increase significant','a significant sales increase in','increase significant sales'],answer:0}},
  {id:'comparatives',title:'Comparatives & Superlatives',level:'Intermediate',summary:'Task 1 sering membandingkan angka.',patterns:['higher than / lower than','twice as high as','the highest / the lowest','whereas / while for contrast'],examples:['The figure for Japan was higher than that for Brazil.','Car use was twice as high in 2020 as in 1990.'],mistakes:['more better → better','more high than → higher than'],quiz:{q:'Correct comparison:',options:['The rate was higher than in 2010.','The rate was more high than 2010.','The rate was highest than 2010.','The rate higher from 2010.'],answer:0}},
  {id:'trend-language',title:'Task 1 Trend Language',level:'Task 1',summary:'Naik, turun, stabil, fluktuasi harus bervariasi.',patterns:['increase/rise/grow/climb','decrease/fall/drop/decline','remain stable/level off/fluctuate','sharply/gradually/slightly/significantly'],examples:['The percentage rose sharply from 10% to 35%.','The figure remained stable for the next decade.'],mistakes:['increase up → increase / go up','decrease down → decrease / go down'],quiz:{q:'Best phrase:',options:['rose sharply','increased up sharply','rose up in sharp','was rise sharply'],answer:0}},
  {id:'overview',title:'Task 1 Overview',level:'Task 1',summary:'Overview adalah bagian wajib: sebut trend utama tanpa terlalu detail.',patterns:['Overall, it is clear that...','In general, X was the highest...','The most noticeable trend is...'],examples:['Overall, it is clear that internet use increased in all age groups.','In general, car travel remained the most popular mode.'],mistakes:['Tidak menulis overview','Menaruh semua angka detail di overview'],quiz:{q:'Best overview opening:',options:['Overall, it is clear that...','I think maybe chart good','According to me...','This essay will discuss...'],answer:0}},
  {id:'cohesion',title:'Cohesion & Linking Words',level:'Task 2',summary:'Linking words harus tepat, tidak berlebihan.',patterns:['addition: moreover, furthermore, in addition','contrast: however, nevertheless, whereas','result: therefore, as a result','example: for example, for instance'],examples:['However, this solution may be expensive.','Therefore, governments need to invest carefully.'],mistakes:['But jangan terlalu sering di awal kalimat formal','Firstly, Secondly, Thirdly terlalu mekanis kalau berlebihan'],quiz:{q:'Which linker shows contrast?',options:['However','Therefore','Moreover','For example'],answer:0}},
  {id:'hedging',title:'Hedging Academic Claims',level:'Band 7+',summary:'Academic writing tidak selalu terlalu mutlak.',patterns:['may/might/could','tends to / is likely to','in many cases / to some extent'],examples:['This policy may reduce traffic congestion.','Online learning tends to be more flexible than traditional classes.'],mistakes:['Always/never terlalu kuat kalau tidak ada bukti','Everyone thinks... terlalu general'],quiz:{q:'Most academic sentence:',options:['This policy may reduce congestion.','This policy always solves everything.','Everyone knows this is perfect.','This must 100% fix society.'],answer:0}},
  {id:'nominalisation',title:'Nominalisation',level:'Band 7+',summary:'Ubah verb/adjective jadi noun untuk gaya akademik.',patterns:['improve → improvement','decide → decision','grow → growth','important → importance'],examples:['The improvement in literacy was significant.','The growth of e-commerce has affected shopping habits.'],mistakes:['Terlalu banyak nominalisation bisa bikin kalimat berat','improve → improvement, bukan improvingment'],quiz:{q:'Nominal form of improve:',options:['improvement','improvingly','improvation','improves'],answer:0}},
  {id:'complex-sentences',title:'Complex Sentences',level:'Band 7+',summary:'Gunakan although, because, while, despite, which secara benar.',patterns:['Although + clause, main clause','Despite + noun/gerund','while/whereas untuk contrast','which untuk menambah informasi'],examples:['Although online learning is flexible, it may reduce social interaction.','Despite the high cost, the policy could bring long-term benefits.'],mistakes:['Although..., but... → salah; pilih salah satu','Despite it is expensive → Although it is expensive / Despite being expensive'],quiz:{q:'Correct complex sentence:',options:['Although it is expensive, it is useful.','Although it is expensive, but it is useful.','Despite it is expensive, it is useful.','Although expensive it useful.'],answer:0}},
  {id:'subject-verb',title:'Subject–Verb Agreement',level:'Core',summary:'Subject singular/plural harus cocok dengan verb.',patterns:['A policy is...','Policies are...','The number of people is...','A number of people are...'],examples:['The number of online learners is increasing.','Many people believe technology is essential.'],mistakes:['People believes → People believe','The number of students are → The number is'],quiz:{q:'Which is correct?',options:['Many people believe technology is essential.','Many people believes technology is essential.','The number of people are increasing.','Education are important.'],answer:0}},
  {id:'count-uncount',title:'Countable & Uncountable Nouns',level:'Core',summary:'Information, advice, furniture, equipment biasanya uncountable.',patterns:['much information, not many informations','a piece of advice','equipment tanpa s plural'],examples:['Students need reliable information.','The school bought new equipment.'],mistakes:['informations → information','advices → advice / pieces of advice'],quiz:{q:'Correct sentence:',options:['I need some information.','I need some informations.','I need an information.','I need many information.'],answer:0}},
  {id:'punctuation',title:'Punctuation & Sentence Control',level:'Intermediate',summary:'Kalimat terlalu panjang bisa bikin grammar rusak.',patterns:['Gunakan comma setelah introductory phrase','Pisahkan dua independent clauses dengan full stop/semicolon/conjunction','Jangan comma splice'],examples:['In recent years, online learning has become more common.','The policy is useful, but it is expensive.'],mistakes:['It is useful, it is expensive → It is useful, but it is expensive','Kalimat 50+ kata sering membingungkan'],quiz:{q:'Correct punctuation:',options:['The policy is useful, but it is expensive.','The policy is useful, it is expensive.','The policy is useful but, it is expensive.','The policy, is useful but it is expensive.'],answer:0}},
  {id:'essay-structure',title:'Task 2 Essay Structure',level:'Task 2',summary:'Struktur jelas lebih penting daripada kalimat ribet.',patterns:['Introduction: paraphrase + thesis','Body 1: topic sentence + explanation + example','Body 2: second main idea','Conclusion: summary + final opinion'],examples:['This essay will argue that technology is beneficial if used responsibly.','One major advantage is that online platforms can improve access to education.'],mistakes:['Introduction terlalu panjang','Body paragraph tanpa topic sentence','Conclusion menambah ide baru'],quiz:{q:'What should a body paragraph usually start with?',options:['A clear topic sentence','A random example','A new unrelated opinion','A conclusion phrase'],answer:0}},
  {id:'task-response',title:'Task Response',level:'Task 2',summary:'Jawab semua bagian pertanyaan, bukan cuma topik umum.',patterns:['Underline question type: agree/disagree, discuss both views, advantages/disadvantages','State your position clearly','Support with reasons and examples'],examples:['I partly agree because technology improves access, but it can also distract students.'],mistakes:['Tidak menjawab “to what extent”','Membahas education padahal pertanyaan tentang online shopping'],quiz:{q:'For “Discuss both views and give your opinion”, you should...',options:['discuss both views and add your opinion','only discuss one view','write a story','only list vocabulary'],answer:0}},
  {id:'lexical-resource',title:'Lexical Resource',level:'Band 7+',summary:'IELTS suka vocabulary tepat, bukan sekadar susah.',patterns:['important → crucial/essential/significant tergantung konteks','good → beneficial/effective/valuable','bad → harmful/detrimental/problematic'],examples:['Regular feedback is beneficial for learners.','Air pollution has detrimental effects on public health.'],mistakes:['Menggunakan kata advanced yang tidak cocok konteks','Repeat word yang sama terlalu sering'],quiz:{q:'Best upgrade for “very important”:',options:['crucial','bigly important','importantful','importantness'],answer:0}},
  {id:'common-errors',title:'Common Indonesian Learner Errors',level:'Core',summary:'Kesalahan yang sering muncul di tulisan pelajar Indonesia.',patterns:['make/do: make a decision, do homework','learn/study: study English, learn a skill','borrow/lend: borrow from, lend to'],examples:['I want to improve my English because it is crucial for my future.','Technology plays an essential role in education.'],mistakes:['I am agree → I agree','discuss about → discuss','more easy → easier'],quiz:{q:'Correct sentence:',options:['I agree with this opinion.','I am agree with this opinion.','I agree about this opinion.','I am agreed this opinion.'],answer:0}}
];


const grammarQuestionBank = {
  'articles': [
    {q:'Choose the best article.',options:['She is an honest student.','She is a honest student.','She is the honest student in general.','She is honest student.'],answer:0,explain:'Use an before a vowel sound: an honest.'},
    {q:'Which sentence is most natural for a general statement?',options:['Education is important for society.','The education is important for society.','An education are important for society.','Education are important for society.'],answer:0,explain:'Use zero article for abstract nouns in general statements.'},
    {q:'Choose the specific noun phrase.',options:['The problem mentioned in the report is serious.','A problem mentioned in the report is serious when already known.','Problem mentioned in the report is serious.','An problem mentioned in the report is serious.'],answer:0,explain:'Use the when the noun is specific or already identified.'},
    {q:'Complete: ___ university near my house offers IELTS classes.',options:['A','An','The zero article','No article and plural verb'],answer:0,explain:'University begins with a /juː/ sound, so use a.'}
  ],
  'prepositions': [
    {q:'Choose the correct sentence.',options:['The number increased by 20%.','The number increased with 20%.','The number increased at 20%.','The number increased to 20% from 40%.'],answer:0,explain:'Increase by shows the amount of change.'},
    {q:'Choose the correct sentence.',options:['The figure rose to 60%.','The figure rose by 60% when 60% is final point.','The figure rose in 60%.','The figure rose on 60%.'],answer:0,explain:'Use to for the final number; by for amount of change.'},
    {q:'Which preposition is correct?',options:['Students are interested in technology.','Students are interested on technology.','Students are interested about technology.','Students are interested for technology.'],answer:0,explain:'Interested in is the fixed phrase.'},
    {q:'Choose the correct time expression.',options:['I studied for two hours.','I studied since two hours.','I studied during two hours.','I studied by two hours.'],answer:0,explain:'Use for + duration.'}
  ],
  'present-simple-continuous': [
    {q:'Choose the correct sentence.',options:['Many people use smartphones every day.','Many people uses smartphones every day.','Many people are use smartphones every day.','Many people using smartphones every day.'],answer:0,explain:'Plural subject many people takes base verb use.'},
    {q:'Which sentence shows a temporary trend?',options:['More students are using online courses this year.','More students uses online courses this year.','More students use online courses right now.','More students are use online courses this year.'],answer:0,explain:'Present continuous can describe a current/temporary trend.'},
    {q:'Task 1 chart introduction: choose the best sentence.',options:['The graph shows changes in population.','The graph is showing changes in population.','The graph show changes in population.','The graph shown changes in population.'],answer:0,explain:'For what a graph displays, present simple is standard.'},
    {q:'Choose the correct question form.',options:['Do people rely on technology too much?','Does people rely on technology too much?','Are people rely on technology too much?','People do rely on technology too much?'],answer:0,explain:'Use do with plural subject people.'}
  ],
  'past-tenses': [
    {q:'Choose the correct past simple sentence.',options:['The percentage increased steadily from 1990 to 2010.','The percentage increase steadily from 1990 to 2010.','The percentage was increase steadily.','The percentage increasing steadily.'],answer:0,explain:'Use verb 2 for finished past periods.'},
    {q:'Choose the correct past continuous sentence.',options:['I was studying when my friend called.','I studied when my friend was called.','I was study when my friend called.','I studying when my friend called.'],answer:0,explain:'Past continuous: was/were + V-ing.'},
    {q:'Choose the best past perfect sentence.',options:['The rate had fallen before it recovered.','The rate has fell before it recovered.','The rate had fell before it recovered.','The rate was fallen before it recovered.'],answer:0,explain:'Past perfect: had + V3.'},
    {q:'Task 1 with 2015 data: choose the correct tense.',options:['Sales fell dramatically in 2015.','Sales fall dramatically in 2015.','Sales have fallen dramatically in 2015.','Sales are falling dramatically in 2015.'],answer:0,explain:'Specific finished time uses past simple.'}
  ],
  'present-perfect': [
    {q:'Choose the correct sentence.',options:['The internet has changed education.','The internet have changed education.','The internet has change education.','The internet changed education since years.'],answer:0,explain:'Singular subject uses has + V3.'},
    {q:'Choose the correct time phrase.',options:['She has lived here since 2020.','She has lived here for 2020.','She has lived here during 2020 until now.','She has lived here by 2020.'],answer:0,explain:'Since + starting point.'},
    {q:'Choose the correct duration phrase.',options:['I have known him for five years.','I have known him since five years.','I have know him for five years.','I know him since five years.'],answer:0,explain:'For + duration; known is V3.'},
    {q:'Which sentence is grammatically correct?',options:['Online learning has become more popular.','Online learning have became more popular.','Online learning has became more popular.','Online learning has becoming more popular.'],answer:0,explain:'Present perfect: has + become.'}
  ],
  'future': [
    {q:'Choose the correct sentence.',options:['This policy will reduce pollution.','This policy will reduces pollution.','This policy will reducing pollution.','This policy is will reduce pollution.'],answer:0,explain:'After will, use base verb.'},
    {q:'Choose the best planned future form.',options:['I am going to take IELTS next month.','I will going to take IELTS next month.','I am take IELTS next month.','I going take IELTS next month.'],answer:0,explain:'Going to is used for plans.'},
    {q:'Choose the correct arrangement.',options:['I am meeting my teacher tomorrow.','I meeting my teacher tomorrow.','I am meet my teacher tomorrow.','I will meeting my teacher tomorrow.'],answer:0,explain:'Present continuous can show a fixed arrangement.'},
    {q:'Which one is wrong?',options:['The exam will starts at 9 a.m.','The exam will start at 9 a.m.','The exam is going to start at 9 a.m.','The exam starts at 9 a.m.'],answer:0,explain:'Will + base verb, not starts.'}
  ],
  'passive': [
    {q:'Choose the correct passive form.',options:['The report was written by the researcher.','The report wrote by the researcher.','The report was write by the researcher.','The report written by the researcher was write.'],answer:0,explain:'Passive: be + V3.'},
    {q:'Process writing: choose the best sentence.',options:['The beans are roasted at a high temperature.','The beans roast at a high temperature by someone.','The beans are roast at a high temperature.','The beans is roasted at a high temperature.'],answer:0,explain:'Plural subject beans takes are + V3.'},
    {q:'Choose the correct modal passive.',options:['More funding should be provided.','More funding should provide.','More funding should be provide.','More funding should to be provided.'],answer:0,explain:'Modal passive: modal + be + V3.'},
    {q:'Choose the correct continuous passive.',options:['The room is being cleaned now.','The room is cleaned now by currently.','The room is being clean now.','The room being cleaned now.'],answer:0,explain:'Present continuous passive: is/are being + V3.'}
  ],
  'modals': [
    {q:'Choose the correct modal structure.',options:['Students should practise every day.','Students should to practise every day.','Students should practising every day.','Students should practised every day.'],answer:0,explain:'Modal + base verb.'},
    {q:'Which modal shows possibility?',options:['This solution may reduce traffic.','This solution must reduces traffic.','This solution should to reduce traffic.','This solution can reducing traffic.'],answer:0,explain:'May shows possibility.'},
    {q:'Choose the strongest academic recommendation.',options:['Governments should invest in public transport.','Governments should to invest in public transport.','Governments should investing in public transport.','Governments should invested in public transport.'],answer:0,explain:'Should + base verb.'},
    {q:'Correct form after must:',options:['People must follow the rules.','People must to follow the rules.','People must following the rules.','People must followed the rules.'],answer:0,explain:'Must + base verb.'}
  ],
  'conditionals': [
    {q:'Choose the correct first conditional.',options:['If cities improve transport, pollution will decrease.','If cities will improve transport, pollution decreases.','If cities improved transport, pollution will decreases.','If cities improve transport, pollution decrease.'],answer:0,explain:'If + present simple, will + base verb.'},
    {q:'Choose the correct second conditional.',options:['If public transport were cheaper, more people would use it.','If public transport is cheaper, more people would used it.','If public transport were cheaper, more people will uses it.','If public transport would be cheaper, more people used it.'],answer:0,explain:'Second conditional: if + past, would + base verb.'},
    {q:'Choose the correct zero conditional.',options:['If people exercise regularly, they stay healthier.','If people will exercise regularly, they stay healthier.','If people exercised regularly, they stays healthier.','If people exercise regularly, they stayed healthier.'],answer:0,explain:'Zero conditional: present + present.'},
    {q:'Which sentence has a common error?',options:['If people will study harder, they will improve.','If people study harder, they will improve.','If students practised daily, they would improve.','If water reaches 100°C, it boils.'],answer:0,explain:'Do not use will in the if-clause for first conditional.'}
  ],
  'relative-clauses': [
    {q:'Choose the correct relative pronoun.',options:['Students who practise daily improve faster.','Students which practise daily improve faster.','Students where practise daily improve faster.','Students whom practise daily improve faster.'],answer:0,explain:'Use who for people.'},
    {q:'Choose the correct sentence.',options:['This policy, which is expensive, may reduce poverty.','This policy, who is expensive, may reduce poverty.','This policy which is expensive may reduce poverty when non-defining needs commas.','This policy, where is expensive, may reduce poverty.'],answer:0,explain:'Use which for things and commas for non-defining clauses.'},
    {q:'Use where correctly.',options:['A school where students feel safe is more effective.','A school which students feel safe is more effective.','A school who students feel safe is more effective.','A school whom students feel safe is more effective.'],answer:0,explain:'Use where for places.'},
    {q:'Choose the best reduced relative clause.',options:['People living in cities often face traffic.','People who living in cities often face traffic.','People live in cities often face traffic.','People which live in cities often face traffic.'],answer:0,explain:'Reduced clause: people living = people who live.'}
  ],
  'noun-phrases': [
    {q:'Choose the best noun phrase.',options:['the rapid growth of online learning','the growth rapid of online learning','online learning of rapid growth','the rapidly growth online learning'],answer:0,explain:'Use adjective + noun + of phrase.'},
    {q:'Choose the most academic phrase.',options:['a lack of public funding','public funding is lack','a lacking of public funding','lack public funding'],answer:0,explain:'A lack of + noun is natural.'},
    {q:'Choose the correct phrase.',options:['the negative impact of pollution on health','the negative impact to pollution in health','the pollution impact negative on health','the impact negative of pollution to health'],answer:0,explain:'Impact of X on Y.'},
    {q:'Upgrade “technology grows fast” into a noun phrase.',options:['the rapid development of technology','technology development rapid','the technology rapidly develop','the grow fast of technology'],answer:0,explain:'Nominal phrase sounds more academic.'}
  ],
  'comparatives': [
    {q:'Choose the correct comparison.',options:['The figure was higher than that for Brazil.','The figure was more high than Brazil.','The figure was highest than Brazil.','The figure was higher from Brazil.'],answer:0,explain:'Higher than; use that for the figure.'},
    {q:'Choose the correct phrase.',options:['twice as high as','two times higher as','twice higher as','two as high than'],answer:0,explain:'Use twice as adjective as.'},
    {q:'Which sentence is correct?',options:['Car use was the highest in 2020.','Car use was the most highest in 2020.','Car use was highest than bus use.','Car use was more highest in 2020.'],answer:0,explain:'Do not use most with highest.'},
    {q:'Correct the error “more better”.',options:['better','more good','most better','betterer'],answer:0,explain:'Better is already comparative.'}
  ],
  'trend-language': [
    {q:'Choose the best trend phrase.',options:['fell dramatically','decreased down dramatically','was fell dramatically','fall dramatically in past'],answer:0,explain:'Fall/fell already means decrease.'},
    {q:'Choose the correct sentence.',options:['The percentage remained stable.','The percentage remained stably.','The percentage was remained stable.','The percentage remained stability.'],answer:0,explain:'Remain + adjective.'},
    {q:'Choose the correct adverb use.',options:['Sales rose sharply.','Sales rose sharp.','Sales sharply rose up.','Sales were rose sharply.'],answer:0,explain:'Verb + adverb; rose sharply.'},
    {q:'Choose the best IELTS Task 1 phrase.',options:['fluctuated slightly','fluctuated up and down slightly repeatedly','was fluctuation slightly','fluctuated in slightly'],answer:0,explain:'Fluctuated slightly is concise and academic.'}
  ],
  'overview': [
    {q:'Choose the best overview sentence.',options:['Overall, it is clear that internet use increased in all groups.','Overall, internet use was 20% in 2000 and 30% in 2005 only.','In my opinion, internet use is good.','The graph is very beautiful and clear.'],answer:0,explain:'Overview summarizes main trends, not small details/opinion.'},
    {q:'What should an IELTS Task 1 overview avoid?',options:['Too many exact numbers','Main trends','Highest and lowest categories','General comparison'],answer:0,explain:'Exact details belong in body paragraphs.'},
    {q:'Choose the strongest overview opening.',options:['Overall, it is clear that...','I think that...','Firstly, the number is...','Hello, I will explain...'],answer:0,explain:'Overall is the standard overview signal.'},
    {q:'Which is NOT a good overview feature?',options:['Personal opinion','Major trend','Main comparison','Highest or lowest feature'],answer:0,explain:'Task 1 does not ask for opinion.'}
  ],
  'cohesion': [
    {q:'Choose the best linking word for contrast.',options:['However','Therefore','Moreover','For example'],answer:0,explain:'However shows contrast.'},
    {q:'Choose the best linking word for result.',options:['Therefore','Although','For instance','In addition'],answer:0,explain:'Therefore shows consequence/result.'},
    {q:'Choose the best sentence.',options:['Many people work online. However, face-to-face communication is still important.','Many people work online. Because face-to-face communication is still important.','Many people work online, however face-to-face communication.','Many people work online however, face-to-face communication is still important.'],answer:0,explain:'Use however with proper punctuation.'},
    {q:'Which linker introduces an example?',options:['For instance','Nevertheless','Consequently','On the other hand'],answer:0,explain:'For instance introduces an example.'}
  ],
  'hedging': [
    {q:'Choose the best academic hedging sentence.',options:['This policy may reduce crime.','This policy always reduces crime completely.','This policy definitely solves all problems.','This policy never fails.'],answer:0,explain:'May avoids overgeneralization.'},
    {q:'Choose the cautious phrase.',options:['It is likely that...','It is 100% true that...','Everyone knows that...','It cannot be denied ever that...'],answer:0,explain:'Likely is cautious and academic.'},
    {q:'Which phrase is too absolute?',options:['always solves the problem','can help address the problem','may improve the situation','is likely to be beneficial'],answer:0,explain:'Always is often too strong for IELTS arguments.'},
    {q:'Choose the best verb.',options:['suggests','proves forever','guarantees','destroys all doubt'],answer:0,explain:'Suggests is careful academic language.'}
  ],
  'nominalisation': [
    {q:'Choose the nominalised version.',options:['The reduction of pollution is essential.','Pollution reduces essential.','Reduce pollution is essential.','Pollution reducing essential.'],answer:0,explain:'Reduction is a noun form.'},
    {q:'Change “people consume more” into a noun phrase.',options:['an increase in consumption','people more consume','a consume increase','consumption increases people'],answer:0,explain:'An increase in consumption is academic.'},
    {q:'Choose the most academic sentence.',options:['The development of public transport requires investment.','Public transport develop need invest.','Developing public transport investment.','Public transport developmenting requires invest.'],answer:0,explain:'Noun phrases create academic density.'},
    {q:'Choose the correct noun form.',options:['implementation','implementingment','implemention','implementate'],answer:0,explain:'Implementation is the noun.'}
  ],
  'complex-sentences': [
    {q:'Choose the correct complex sentence.',options:['Although technology is useful, it can distract students.','Although technology is useful, but it can distract students.','Technology although useful, it can distract students.','Although technology useful, it can distract students.'],answer:0,explain:'Do not use although and but together.'},
    {q:'Choose the correct sentence.',options:['Because the policy is expensive, some people oppose it.','Because the policy is expensive, so some people oppose it.','Because the policy expensive, some people oppose it.','Because expensive policy, some people oppose it.'],answer:0,explain:'Because-clause + main clause; no so needed.'},
    {q:'Choose the best subordinator for contrast.',options:['whereas','therefore','for example','as a result'],answer:0,explain:'Whereas contrasts two ideas.'},
    {q:'Choose the correct sentence.',options:['While online learning is flexible, it requires self-discipline.','While online learning is flexible, but it requires self-discipline.','While online learning flexible, it requires self-discipline.','While online learning is flexible it requires self-discipline without punctuation.'],answer:0,explain:'Use comma after introductory while-clause.'}
  ],
  'subject-verb': [
    {q:'Choose the correct agreement.',options:['The number of students is increasing.','The number of students are increasing.','The number of students increase.','The number of students were increase.'],answer:0,explain:'The number is singular.'},
    {q:'Choose the correct sentence.',options:['A range of solutions is available.','A range of solutions are available in formal agreement.','A range of solutions available.','A range of solutions were available now.'],answer:0,explain:'A range is singular in formal writing.'},
    {q:'Choose the correct agreement.',options:['Many students prefer online learning.','Many students prefers online learning.','Many students is prefer online learning.','Many students was prefer online learning.'],answer:0,explain:'Plural subject takes base verb.'},
    {q:'Choose the correct sentence.',options:['Each student has a different goal.','Each student have a different goal.','Each students has a different goal.','Each students have a different goal.'],answer:0,explain:'Each is singular.'}
  ],
  'count-uncount': [
    {q:'Choose the correct phrase.',options:['much information','many information','several information','an information'],answer:0,explain:'Information is uncountable.'},
    {q:'Choose the correct sentence.',options:['There is a lot of evidence.','There are many evidences.','There is an evidence.','There are several evidence.'],answer:0,explain:'Evidence is usually uncountable.'},
    {q:'Choose the countable noun.',options:['a suggestion','an advice','many furniture','several equipment'],answer:0,explain:'Suggestion is countable; advice/furniture/equipment are usually uncountable.'},
    {q:'Choose the correct phrase.',options:['a piece of advice','an advice','many advice','several advice'],answer:0,explain:'Use a piece of advice.'}
  ],
  'punctuation': [
    {q:'Choose the correct punctuation.',options:['In recent years, online learning has become common.','In recent years online learning, has become common.','In recent years online learning has, become common.','In recent years online learning has become common,'],answer:0,explain:'Use comma after introductory phrase.'},
    {q:'Fix the comma splice.',options:['The policy is useful, but it is expensive.','The policy is useful, it is expensive.','The policy is useful but, it is expensive.','The policy, is useful but it is expensive.'],answer:0,explain:'Join two independent clauses with conjunction or full stop.'},
    {q:'Choose the correct sentence.',options:['However, this solution is not perfect.','However this solution, is not perfect.','However this solution is not perfect,','However, this solution, is not perfect.'],answer:0,explain:'Use comma after however at the start.'},
    {q:'Choose the best punctuation for contrast.',options:['Some people support this idea; others disagree.','Some people support this idea, others disagree.','Some people support this idea others disagree.','Some people support this idea; but others disagree.'],answer:0,explain:'A semicolon can join closely related independent clauses.'}
  ],
  'essay-structure': [
    {q:'Best Task 2 body paragraph structure:',options:['Topic sentence → explanation → example → result','Example → random opinion → new topic → conclusion','Conclusion → introduction → example','One long sentence only'],answer:0,explain:'Clear paragraph structure improves coherence.'},
    {q:'What should the introduction usually include?',options:['Paraphrase + thesis/position','Five examples','Only conclusion','All statistics from your life'],answer:0,explain:'Task 2 intro should answer the question direction.'},
    {q:'What should a conclusion do?',options:['Summarise the main answer clearly','Introduce a totally new argument','Copy the introduction exactly','Give irrelevant personal story'],answer:0,explain:'Conclusion closes the essay, not introduce new ideas.'},
    {q:'Choose the best thesis style.',options:['This essay argues that the benefits outweigh the drawbacks.','I will maybe talk about many things and not decide.','Nowadays people have many opinions only.','This topic is very nice.'],answer:0,explain:'A clear position helps Task Response.'}
  ],
  'task-response': [
    {q:'Which answer best addresses “To what extent do you agree?”',options:['I partly agree because the policy has benefits but also serious limits.','This topic is popular nowadays.','There are many people in the world.','The chart shows changes over time.'],answer:0,explain:'State your degree of agreement clearly.'},
    {q:'What hurts Task Response most?',options:['Not answering all parts of the question','Using examples','Having a clear opinion','Explaining reasons'],answer:0,explain:'You must answer the exact prompt.'},
    {q:'For advantages/disadvantages essay, what should you cover?',options:['Both advantages and disadvantages','Only your childhood story','Only grammar rules','Only one unrelated example'],answer:0,explain:'Cover all requested parts.'},
    {q:'Choose the best support.',options:['A clear reason followed by a relevant example','A memorised sentence unrelated to the topic','A very general statement with no explanation','A slang expression'],answer:0,explain:'Specific support improves development.'}
  ],
  'lexical-resource': [
    {q:'Upgrade “very important”.',options:['crucial','very very important','importantful','importance thing'],answer:0,explain:'Crucial is a natural academic upgrade.'},
    {q:'Choose the best collocation.',options:['pose a serious threat','make a serious threat for society','do a serious threat','give serious threatening'],answer:0,explain:'Pose a threat is a strong collocation.'},
    {q:'Choose the most academic phrase.',options:['a detrimental impact','a very bad effect thing','a bad bad result','an effect that is not good'],answer:0,explain:'Detrimental impact is concise and academic.'},
    {q:'Choose the natural collocation.',options:['play a vital role','play an important function role thing','do a vital role','make a vital role'],answer:0,explain:'Play a vital role is a common academic collocation.'}
  ],
  'common-errors': [
    {q:'Choose the correct sentence.',options:['I want to improve my English.','I want improve my English.','I want to improving my English.','I want that improve my English.'],answer:0,explain:'Want + to + base verb.'},
    {q:'Choose the correct phrase.',options:['I did my homework.','I made my homework.','I created my homework by doing.','I worked my homework.'],answer:0,explain:'Use do homework, not make homework.'},
    {q:'Choose the correct sentence.',options:['Can I borrow your pen?','Can I lend your pen from you?','Can I borrow you my pen?','Can I lending your pen?'],answer:0,explain:'Borrow = receive temporarily; lend = give temporarily.'},
    {q:'Choose the correct IELTS sentence.',options:['Technology plays an essential role in education.','Technology play essential role in education.','Technology is play an essential role in education.','Technology plays essential role on education.'],answer:0,explain:'Singular subject + plays; use an essential role in.'}
  ]
};
function grammarQuestionsFor(id){
  const lesson = grammarLessons.find(x=>x.id===id);
  const base = lesson?.quiz ? [{...lesson.quiz, explain: lesson.title}] : [];
  return [...base, ...(grammarQuestionBank[id] || [])];
}
function grammarAllQuestions(){
  return grammarLessons.flatMap(g => grammarQuestionsFor(g.id).map(q => ({...q, lesson:g.id, title:g.title, explain:q.explain || g.title})));
}
function shuffleQuestionOptions(q){
  const pairs = q.options.map((o,i)=>({o,i}));
  const shuffled = shuffle(pairs);
  return {...q, options:shuffled.map(p=>p.o), answer:shuffled.findIndex(p=>p.i===q.answer)};
}

const readingPassages = [
  {id:'urban-transport',title:'Urban Transport and City Life',topic:'Environment',text:`Cities around the world are facing a similar challenge: how to move millions of people efficiently without damaging the environment or reducing quality of life. In many urban areas, private car use has increased because people value convenience, privacy, and speed. However, when too many people make the same choice, the result is congestion, air pollution, noise, and wasted time. Public transport is often presented as the solution, but its success depends on reliability, affordability, safety, and good urban planning.\n\nA city with frequent buses, connected train lines, safe walking routes, and protected cycling lanes can encourage people to leave their cars at home. This shift does not happen overnight. Residents must believe that alternatives are practical. If a bus arrives late every day, people will return to private vehicles. If cycling lanes are unsafe, only a small number of confident riders will use them. Therefore, transport policy must combine infrastructure, pricing, education, and long-term investment.\n\nAnother important factor is land use. When homes, schools, workplaces, and shops are far apart, people become dependent on cars. In contrast, mixed-use neighbourhoods allow residents to complete many daily tasks within a short distance. This reduces travel demand and creates more active communities.`,questions:[{q:'What is the main problem discussed?',options:['How cities can move people efficiently and sustainably','Why cars are always cheaper than buses','How to build larger airports','Why cycling should replace all transport'],answer:0},{q:'Public transport success depends on...',options:['reliability, affordability, safety, and planning','advertising only','higher car ownership','fewer train lines'],answer:0},{q:'Mixed-use neighbourhoods are areas where...',options:['homes, shops, schools, and work areas are close together','only factories exist','there are only private roads','people cannot walk'],answer:0},{q:'Why might people return to private cars?',options:['Because alternatives may be unreliable or unsafe','Because buses are always free','Because cycling is required by law','Because cities ban trains'],answer:0}]},
  {id:'digital-learning',title:'Digital Learning and Motivation',topic:'Education',text:`Digital learning has changed the way students access information. In the past, learners depended heavily on textbooks, classroom notes, and teachers’ explanations. Today, a student can watch lectures, complete exercises, join online discussions, and receive instant feedback through a single device. This flexibility can be highly beneficial, especially for students who live far from educational centres or need to balance study with other responsibilities.\n\nNevertheless, digital learning is not automatically effective. Many students struggle with distraction, low motivation, and poor time management. A device that provides access to a lesson also provides access to games, messages, videos, and social media. Without self-discipline, online learning can become passive and shallow. Teachers also need training so they can design interactive lessons rather than simply uploading long documents.\n\nThe most effective model may be blended learning, which combines online resources with face-to-face interaction. Online platforms can provide practice and flexibility, while classroom discussion can support communication, collaboration, and emotional connection.`,questions:[{q:'What benefit of digital learning is mentioned?',options:['Flexibility for students with different needs','It removes all need for teachers','It makes exams unnecessary','It prevents distraction completely'],answer:0},{q:'What problem can students face online?',options:['Distraction and poor time management','Too much face-to-face interaction','No access to videos','No flexible schedule'],answer:0},{q:'The author thinks technology should...',options:['enhance teaching, not simply replace teachers','remove classrooms entirely','be used only for entertainment','stop all exams'],answer:0},{q:'What is blended learning?',options:['A mix of online resources and face-to-face interaction','Only studying from books','Learning without teachers','A method for shopping online'],answer:0}]},
  {id:'health-prevention',title:'Health, Lifestyle, and Prevention',topic:'Health',text:`Modern healthcare systems often spend enormous amounts of money treating illness after it appears. Hospitals, medicines, and specialist treatment are essential, but prevention can be equally important. Many common health problems are influenced by lifestyle factors such as diet, physical activity, sleep, stress, and smoking. If people develop healthier habits earlier in life, the pressure on healthcare systems may decrease.\n\nHowever, telling people to make better choices is not enough. Personal responsibility matters, but the environment also shapes behaviour. A person who lives in an area with safe parks, affordable healthy food, and reliable public transport may find it easier to live healthily than someone surrounded by fast food outlets and unsafe streets.\n\nSchools, workplaces, and local governments can all contribute. Schools can teach nutrition and encourage sport. Workplaces can reduce excessive stress and support work-life balance. Local governments can design neighbourhoods that make walking and cycling safer.`,questions:[{q:'The passage mainly argues that...',options:['prevention depends on both habits and environment','medicine should be banned','health depends only on genetics','exercise is harmful'],answer:0},{q:'Why is personal advice not enough?',options:['Because the environment influences behaviour','Because people never listen','Because hospitals are unnecessary','Because healthy food is always free'],answer:0},{q:'Who can contribute to prevention?',options:['Schools, workplaces, local governments, and individuals','Only doctors','Only families','Only international companies'],answer:0},{q:'What is one lifestyle factor mentioned?',options:['sleep','shoe size','nationality','favourite colour'],answer:0}]},
  {id:'consumer-behaviour',title:'Advertising and Consumer Behaviour',topic:'Media',text:`Advertising is designed to influence attention, emotion, and decision-making. A successful advertisement does not merely provide information about a product; it creates an image, a desire, or a sense of urgency. In the digital age, advertising has become more personalised because companies can collect data about users’ interests, locations, and online behaviour.\n\nSupporters argue that targeted advertising is useful because it helps consumers discover products that match their needs. Small businesses can also reach specific audiences without paying for expensive television campaigns. On the other hand, critics worry about privacy, manipulation, and excessive consumerism. When people are constantly exposed to persuasive messages, they may buy things they do not need or feel dissatisfied with what they already have.\n\nThe challenge is to balance commercial freedom with consumer protection. Clear rules about data collection, honest product claims, and advertising to children are especially important. Consumers also need digital literacy so they can recognise persuasive techniques.`,questions:[{q:'What has changed advertising in the digital age?',options:['Personalised targeting based on data','The end of all marketing','Only newspaper ads','A ban on small businesses'],answer:0},{q:'What is one concern?',options:['Privacy and manipulation','Too much honesty','No effect on choices','Advertising cannot reach people'],answer:0},{q:'What does the passage suggest?',options:['Rules and digital literacy can protect consumers','All ads should disappear','Consumers should never buy online','Children should design adverts'],answer:0},{q:'Targeted advertising can help small businesses by...',options:['reaching specific audiences','removing all costs','forcing people to buy','replacing products'],answer:0}]},
  {id:'work-automation',title:'Automation and the Future of Work',topic:'Work',text:`Automation is changing the nature of work in many industries. Machines and software can now perform tasks that once required large numbers of employees, from processing documents to operating factory equipment. Supporters argue that automation increases productivity, reduces human error, and allows people to focus on more creative or complex responsibilities.\n\nHowever, the benefits are not distributed equally. Workers in routine jobs may face unemployment or pressure to learn new skills quickly. If education systems and employers fail to provide retraining, technological progress can increase inequality. The challenge is not simply to stop automation, but to manage the transition fairly.\n\nGovernments, companies, and schools all have a role. Governments can support training programmes, companies can invest in their employees, and schools can teach digital literacy and problem-solving skills. In the long term, societies that prepare workers for change may benefit more from automation than those that ignore its social impact.`,questions:[{q:'What is the main idea?',options:['Automation brings benefits but requires fair preparation','Automation should be banned','Factories no longer exist','Schools cannot help workers'],answer:0},{q:'Which workers may be most at risk?',options:['Workers in routine jobs','Only artists','Only managers','All teachers'],answer:0},{q:'What can schools teach?',options:['digital literacy and problem-solving','only handwriting','nothing useful','advertising tricks'],answer:0},{q:'The word “transition” mainly means...',options:['a period of change','a type of machine','a salary increase','an exam'],answer:0}]},
  {id:'urban-nature',title:'Urban Green Spaces',topic:'Environment',text:`Urban green spaces such as parks, gardens, and tree-lined streets can improve city life in several ways. They provide places for exercise, relaxation, and social interaction. They can also reduce heat, absorb rainwater, and support biodiversity. For residents who live in crowded neighbourhoods, access to green space can be especially important for mental well-being.\n\nDespite these benefits, green spaces are often unevenly distributed. Wealthier areas may have clean parks and safe walking paths, while poorer districts may have fewer trees and limited public facilities. This environmental inequality can affect health and quality of life. Creating more green space is therefore not only an environmental issue but also a social one.\n\nCity planners need to protect existing parks and include nature in new developments. Small changes, such as planting trees along roads or turning unused land into community gardens, can make neighbourhoods more pleasant and resilient.`,questions:[{q:'Green spaces can help cities by...',options:['improving health, reducing heat, and supporting biodiversity','making roads wider only','removing all buildings','increasing pollution'],answer:0},{q:'What problem is mentioned?',options:['Unequal distribution of green spaces','Too many forests in every city','No one uses parks','Trees are always harmful'],answer:0},{q:'Environmental inequality means...',options:['some communities have less access to healthy environments','all cities are identical','nature is always expensive','parks are private only'],answer:0},{q:'One suggested small change is...',options:['planting trees along roads','banning all gardens','closing public spaces','building more car parks'],answer:0}]}
];

const writingPrompts = [
  {id:'t2-tech-education',type:'Task 2',title:'Technology in Education',prompt:'Some people believe that technology has made education more effective, while others think it creates more problems than benefits. Discuss both views and give your own opinion.',min:250},
  {id:'t2-public-transport',type:'Task 2',title:'Public Transport',prompt:'Governments should invest more money in public transport than in building new roads. To what extent do you agree or disagree?',min:250},
  {id:'t2-online-shopping',type:'Task 2',title:'Online Shopping',prompt:'Online shopping is replacing traditional stores in many countries. Do the advantages of this trend outweigh the disadvantages?',min:250},
  {id:'t2-health',type:'Task 2',title:'Healthy Lifestyle',prompt:'Some people think individuals are responsible for their own health, while others believe governments should make policies to improve public health. Discuss both views and give your opinion.',min:250},
  {id:'t1-line-graph',type:'Task 1',title:'Line Graph: Internet Users',prompt:'The line graph shows the percentage of internet users in three countries from 2000 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',min:150},
  {id:'t1-bar-chart',type:'Task 1',title:'Bar Chart: Transport Modes',prompt:'The bar chart compares the main modes of transport used by commuters in five cities. Summarise the information and make comparisons where relevant.',min:150}
];

const speakingPrompts = [
  {part:'Part 1',title:'Study',prompt:'Do you enjoy studying English? What part is the most difficult for you? Use 2–3 vocabulary upgrades in your answer.'},
  {part:'Part 1',title:'Technology',prompt:'How often do you use technology for learning? What are the benefits and drawbacks?'},
  {part:'Part 2',title:'Describe a useful website',prompt:'Describe a website or app that helps you learn. You should say what it is, how often you use it, what features it has, and why it is useful.'},
  {part:'Part 2',title:'Describe a goal',prompt:'Describe an academic goal you want to achieve. Explain why it matters and how you plan to achieve it.'},
  {part:'Part 3',title:'Education and Society',prompt:'How can schools prepare students for the future? Should exams be the main way to measure ability?'},
  {part:'Part 3',title:'Technology and Work',prompt:'Will AI and automation create more opportunities or more problems for young people? Give reasons.'}
];

const listeningLessons = [
  {
    "id": "bbc-climate-box",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "BOX SET: 6 Minute English - Climate Change",
    "videoId": "tEL9bYk2iKE",
    "topic": "Environment",
    "level": "Band 6-7",
    "note": "Curated video lesson #1. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about environment",
      "Useful vocabulary: climate change, weather, emissions",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "climate change",
      "weather",
      "emissions"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Environment",
          "Health",
          "Technology",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on environment."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "climate change, weather, emissions",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: climate change, weather, emissions."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-human-behaviour",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "BOX SET: 6 Minute English - Human Behaviour",
    "videoId": "3cTM7s6UQrg",
    "topic": "Psychology",
    "level": "Band 6-7",
    "note": "Curated video lesson #2. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about psychology",
      "Useful vocabulary: behaviour, habits, choices",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "behaviour",
      "habits",
      "choices"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Psychology",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on psychology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "behaviour, habits, choices",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: behaviour, habits, choices."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-action-verbs",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "English Vocabulary Mega-class: Action Verbs",
    "videoId": "97U5wwPXzs8",
    "topic": "Vocabulary",
    "level": "Band 5-6",
    "note": "Curated video lesson #3. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about vocabulary",
      "Useful vocabulary: verbs, actions, collocations",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "verbs",
      "actions",
      "collocations"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Vocabulary",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on vocabulary."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "verbs, actions, collocations",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: verbs, actions, collocations."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-good-sleep",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Why you need a good night's sleep",
    "videoId": "j2PdEQpu5js",
    "topic": "Health",
    "level": "Band 5-6",
    "note": "Curated video lesson #4. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about health",
      "Useful vocabulary: sleep, health, benefits",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "sleep",
      "health",
      "benefits"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Health",
          "Technology",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on health."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "sleep, health, benefits",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: sleep, health, benefits."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-animals",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "BOX SET: 6 Minute English - Animals",
    "videoId": "GDc8bIbFTs4",
    "topic": "Nature",
    "level": "Band 6",
    "note": "Curated video lesson #5. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about nature",
      "Useful vocabulary: animals, conservation, behaviour",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "animals",
      "conservation",
      "behaviour"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Nature",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on nature."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "animals, conservation, behaviour",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: animals, conservation, behaviour."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-robot-companion",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Would you like a robot companion?",
    "videoId": "MXCrPmVuXjs",
    "topic": "Technology",
    "level": "Band 6-7",
    "note": "Curated video lesson #6. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about technology",
      "Useful vocabulary: robots, elderly care, companionship",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "robots",
      "elderly care",
      "companionship"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Technology",
          "Health",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on technology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "robots, elderly care, companionship",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: robots, elderly care, companionship."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-wellbeing",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "BOX SET: 6 Minute English - Wellbeing",
    "videoId": "WMokf0EgTcA",
    "topic": "Wellbeing",
    "level": "Band 6",
    "note": "Curated video lesson #7. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about wellbeing",
      "Useful vocabulary: mental health, wellbeing, lifestyle",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "mental health",
      "wellbeing",
      "lifestyle"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Wellbeing",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on wellbeing."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "mental health, wellbeing, lifestyle",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: mental health, wellbeing, lifestyle."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-cant-sleep",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "What to do when you can't sleep",
    "videoId": "HZd53TJpmoQ",
    "topic": "Health",
    "level": "Band 5-6",
    "note": "Curated video lesson #8. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about health",
      "Useful vocabulary: insomnia, routine, relaxation",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "insomnia",
      "routine",
      "relaxation"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Health",
          "Technology",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on health."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "insomnia, routine, relaxation",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: insomnia, routine, relaxation."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-two-word",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "English Vocabulary Mega-class: Two-word Expressions",
    "videoId": "HblUS4Ha1io",
    "topic": "Vocabulary",
    "level": "Band 5-6",
    "note": "Curated video lesson #9. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about vocabulary",
      "Useful vocabulary: phrasal style, expressions",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "phrasal style",
      "expressions"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Vocabulary",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on vocabulary."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "phrasal style, expressions",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: phrasal style, expressions."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-trust-eyes",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Can you trust your own eyes?",
    "videoId": "p98SLjcy7hM",
    "topic": "Science",
    "level": "Band 6-7",
    "note": "Curated video lesson #10. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about science",
      "Useful vocabulary: perception, illusion, evidence",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "perception",
      "illusion",
      "evidence"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Science",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on science."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "perception, illusion, evidence",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: perception, illusion, evidence."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-ai-mind",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Can AI have a mind of its own?",
    "videoId": "tHZRXN_pVi8",
    "topic": "Technology",
    "level": "Band 7",
    "note": "Curated video lesson #11. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about technology",
      "Useful vocabulary: AI, consciousness, ethics",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "AI",
      "consciousness",
      "ethics"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Technology",
          "Health",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on technology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "AI, consciousness, ethics",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: AI, consciousness, ethics."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-dreams",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Are you following your dreams?",
    "videoId": "26PrgjTboVQ",
    "topic": "Life Goals",
    "level": "Band 5-6",
    "note": "Curated video lesson #12. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about life goals",
      "Useful vocabulary: dreams, motivation, personal change",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "dreams",
      "motivation",
      "personal change"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Life Goals",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on life goals."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "dreams, motivation, personal change",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: dreams, motivation, personal change."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-food-mood",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Food and mood",
    "videoId": "fG7dJ6A3l7w",
    "topic": "Health",
    "level": "Band 6",
    "note": "Curated video lesson #13. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about health",
      "Useful vocabulary: food, mood, mental health",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "food",
      "mood",
      "mental health"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Health",
          "Technology",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on health."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "food, mood, mental health",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: food, mood, mental health."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-doing-nothing",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "The benefits of doing nothing",
    "videoId": "Y681hXWwhQY",
    "topic": "Wellbeing",
    "level": "Band 6",
    "note": "Curated video lesson #14. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about wellbeing",
      "Useful vocabulary: rest, productivity, stress",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "rest",
      "productivity",
      "stress"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Wellbeing",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on wellbeing."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "rest, productivity, stress",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: rest, productivity, stress."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-lonely-crowd",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Are you lonely in a crowd?",
    "videoId": "j8d5kkKfDbo",
    "topic": "Society",
    "level": "Band 6-7",
    "note": "Curated video lesson #15. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about society",
      "Useful vocabulary: loneliness, social life, cities",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "loneliness",
      "social life",
      "cities"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Society",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on society."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "loneliness, social life, cities",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: loneliness, social life, cities."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-recipes",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Translating recipes",
    "videoId": "31FjeWvLIxM",
    "topic": "Culture",
    "level": "Band 6",
    "note": "Curated video lesson #16. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about culture",
      "Useful vocabulary: food, translation, culture",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "food",
      "translation",
      "culture"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Culture",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on culture."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "food, translation, culture",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: food, translation, culture."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-memory",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Improving your memory",
    "videoId": "we4KiShNjlA",
    "topic": "Learning",
    "level": "Band 5-6",
    "note": "Curated video lesson #17. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about learning",
      "Useful vocabulary: memory, learning techniques",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "memory",
      "learning techniques"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Learning",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on learning."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "memory, learning techniques",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: memory, learning techniques."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-doomscrolling",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Doomscrolling: Why do we do it?",
    "videoId": "WsKg6HsoDaw",
    "topic": "Technology",
    "level": "Band 6-7",
    "note": "Curated video lesson #18. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about technology",
      "Useful vocabulary: social media, anxiety, attention",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "social media",
      "anxiety",
      "attention"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Technology",
          "Health",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on technology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "social media, anxiety, attention",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: social media, anxiety, attention."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-little-italy",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "What and where is Little Italy?",
    "videoId": "Y5sSvaAKF90",
    "topic": "Culture",
    "level": "Band 6",
    "note": "Curated video lesson #19. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about culture",
      "Useful vocabulary: migration, communities, identity",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "migration",
      "communities",
      "identity"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Culture",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on culture."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "migration, communities, identity",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: migration, communities, identity."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-jealous",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Do you get jealous easily?",
    "videoId": "7BIp53who2A",
    "topic": "Psychology",
    "level": "Band 6",
    "note": "Curated video lesson #20. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about psychology",
      "Useful vocabulary: jealousy, emotions, relationships",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "jealousy",
      "emotions",
      "relationships"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Psychology",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on psychology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "jealousy, emotions, relationships",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: jealousy, emotions, relationships."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-sitting",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Why sitting is bad for health",
    "videoId": "DsQMLrPdLf8",
    "topic": "Health",
    "level": "Band 6",
    "note": "Curated video lesson #21. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about health",
      "Useful vocabulary: sedentary lifestyle, health risks",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "sedentary lifestyle",
      "health risks"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Health",
          "Technology",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on health."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "sedentary lifestyle, health risks",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: sedentary lifestyle, health risks."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-love-science",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "The science of falling in love",
    "videoId": "Tp8xIgyyK7I",
    "topic": "Science",
    "level": "Band 6-7",
    "note": "Curated video lesson #22. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about science",
      "Useful vocabulary: love, hormones, relationships",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "love",
      "hormones",
      "relationships"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Science",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on science."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "love, hormones, relationships",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: love, hormones, relationships."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-chatbots",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Should we fear chatbots?",
    "videoId": "DxR2waii1Ck",
    "topic": "Technology",
    "level": "Band 7",
    "note": "Curated video lesson #23. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about technology",
      "Useful vocabulary: chatbots, trust, misinformation",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "chatbots",
      "trust",
      "misinformation"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Technology",
          "Health",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on technology."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "chatbots, trust, misinformation",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: chatbots, trust, misinformation."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-lazy-exercise",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Exercise for the lazy",
    "videoId": "vq2x7k_nofw",
    "topic": "Health",
    "level": "Band 5-6",
    "note": "Curated video lesson #24. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about health",
      "Useful vocabulary: exercise, habits, small actions",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "exercise",
      "habits",
      "small actions"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Health",
          "Technology",
          "Environment",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on health."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "exercise, habits, small actions",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: exercise, habits, small actions."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-dumplings",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Why we love dumplings",
    "videoId": "fFLLQEFgK6s",
    "topic": "Culture",
    "level": "Band 6",
    "note": "Curated video lesson #25. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about culture",
      "Useful vocabulary: food culture, tradition, comfort",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "food culture",
      "tradition",
      "comfort"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Culture",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on culture."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "food culture, tradition, comfort",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: food culture, tradition, comfort."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-books-screens",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Why read books, not screens?",
    "videoId": "h_pvijqmolQ",
    "topic": "Education",
    "level": "Band 6-7",
    "note": "Curated video lesson #26. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about education",
      "Useful vocabulary: reading, screens, concentration",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "reading",
      "screens",
      "concentration"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Education",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on education."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "reading, screens, concentration",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: reading, screens, concentration."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-sorry",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "The right way to say sorry",
    "videoId": "Ag7-U4ga9mA",
    "topic": "Communication",
    "level": "Band 6",
    "note": "Curated video lesson #27. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about communication",
      "Useful vocabulary: apology, culture, politeness",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "apology",
      "culture",
      "politeness"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Communication",
          "Health",
          "Technology",
          "Environment"
        ],
        "answer": 0,
        "explain": "This lesson focuses on communication."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "apology, culture, politeness",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: apology, culture, politeness."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-eco-anxiety",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Do you have eco-anxiety?",
    "videoId": "VkLIUXjNwYc",
    "topic": "Environment",
    "level": "Band 6-7",
    "note": "Curated video lesson #28. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about environment",
      "Useful vocabulary: climate anxiety, emotions, action",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "climate anxiety",
      "emotions",
      "action"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Environment",
          "Health",
          "Technology",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on environment."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "climate anxiety, emotions, action",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: climate anxiety, emotions, action."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-disaster",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Can you stop a disaster?",
    "videoId": "UEH3oRSgVXQ",
    "topic": "Environment",
    "level": "Band 7",
    "note": "Curated video lesson #29. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about environment",
      "Useful vocabulary: disaster prevention, planning",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "disaster prevention",
      "planning"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Environment",
          "Health",
          "Technology",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on environment."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "disaster prevention, planning",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: disaster prevention, planning."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "bbc-heatwaves",
    "type": "video",
    "source": "BBC Learning English / YouTube",
    "title": "Heatwaves: Can we adapt?",
    "videoId": "ACG6qr4waWU",
    "topic": "Environment",
    "level": "Band 7",
    "note": "Curated video lesson #30. Watch once for the main idea, then watch again for examples and vocabulary. This website provides original companion notes and questions, not a copied transcript.",
    "focus": [
      "Main idea about environment",
      "Useful vocabulary: heatwaves, adaptation, housing",
      "Speaker attitude and supporting examples"
    ],
    "vocab": [
      "heatwaves",
      "adaptation",
      "housing"
    ],
    "questions": [
      {
        "q": "What is the main topic of this video lesson?",
        "options": [
          "Environment",
          "Health",
          "Technology",
          "Education"
        ],
        "answer": 0,
        "explain": "This lesson focuses on environment."
      },
      {
        "q": "What should you listen for first?",
        "options": [
          "The general idea before small details",
          "Every single word with no pause",
          "Only the speaker's accent",
          "Only numbers and dates"
        ],
        "answer": 0,
        "explain": "IELTS listening is easier when you catch the main idea first."
      },
      {
        "q": "Which vocabulary area is most relevant for this lesson?",
        "options": [
          "heatwaves, adaptation, housing",
          "airport announcements only",
          "formal complaint letters only",
          "geometry and algebra terms"
        ],
        "answer": 0,
        "explain": "Relevant vocabulary: heatwaves, adaptation, housing."
      },
      {
        "q": "What is the best post-listening task?",
        "options": [
          "Summarise the video in 2-3 sentences",
          "Memorise the whole video word-for-word",
          "Ignore unknown words",
          "Translate every sentence before understanding"
        ],
        "answer": 0,
        "explain": "A short summary trains comprehension and IELTS speaking/writing skills."
      }
    ]
  },
  {
    "id": "sim-campus-library",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Campus Library Orientation",
    "topic": "Education",
    "level": "Band 5-6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Good morning, everyone. Welcome to the campus library orientation. The library opens at eight thirty in the morning and closes at nine in the evening from Monday to Friday. On weekends, it closes earlier, at five o clock. New students can borrow up to six books for two weeks. If you need a quiet place to study, the silent study room is on the second floor. Group discussion rooms are on the third floor, and they must be booked online at least one day before use. If you have any questions, please speak to the help desk near the entrance.",
    "vocab": [],
    "questions": [
      {
        "q": "What time does the library open on weekdays?",
        "options": [
          "8:30 a.m.",
          "9:00 a.m.",
          "5:00 p.m.",
          "2:00 p.m."
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "Where is the silent study room?",
        "options": [
          "Second floor",
          "Third floor",
          "Near the entrance",
          "Online only"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "How should students book group rooms?",
        "options": [
          "Online at least one day before",
          "By calling after midnight",
          "By asking any student",
          "Without booking"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-city-transport",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "City Transport Announcement",
    "topic": "Transport",
    "level": "Band 5-6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "This is a service announcement for passengers using the city bus network. From next Monday, route twenty four will no longer stop outside the central museum because of road repairs. Passengers should use the temporary stop on King Street, opposite the post office. Buses will run every fifteen minutes during the morning rush hour and every thirty minutes after ten a.m. The changes are expected to last for three weeks. We apologise for any inconvenience and thank passengers for their patience.",
    "vocab": [],
    "questions": [
      {
        "q": "Why is the museum stop closed?",
        "options": [
          "Road repairs",
          "A festival",
          "Bad weather",
          "A new museum"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "Where is the temporary stop?",
        "options": [
          "On King Street",
          "Inside the museum",
          "At the airport",
          "Near the school gate"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "How long will changes last?",
        "options": [
          "Three weeks",
          "Three days",
          "One year",
          "Until tomorrow"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-health-talk",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Student Health Talk",
    "topic": "Health",
    "level": "Band 6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Today I want to talk about simple habits that can improve concentration. Many students believe they need to study for long hours without breaks, but research suggests that short regular breaks can make learning more effective. A five-minute walk, drinking water, or stretching can help the brain reset. Sleep is also essential. Students who sleep less than six hours often find it harder to remember information. Finally, try to study in a space with fewer distractions. Put your phone away for twenty minutes and focus on one task at a time.",
    "vocab": [],
    "questions": [
      {
        "q": "What habit can improve concentration?",
        "options": [
          "Short regular breaks",
          "Studying without sleep",
          "Checking the phone often",
          "Working in a noisy place"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What can help the brain reset?",
        "options": [
          "A short walk or stretching",
          "Skipping water",
          "Doing many tasks at once",
          "Sleeping less"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should students do with their phone?",
        "options": [
          "Put it away for a short focus session",
          "Keep it in their hand",
          "Use it every minute",
          "Turn up notifications"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-environment",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Community Recycling Plan",
    "topic": "Environment",
    "level": "Band 6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "The local council is introducing a new recycling plan next month. Each household will receive two containers: a blue box for paper and cardboard, and a green box for glass and metal. Plastic bottles should be placed in the existing yellow bag. Collection will take place every Thursday morning. Residents are asked to put containers outside before seven a.m. The council hopes the plan will reduce waste sent to landfill by twenty percent within the first year.",
    "vocab": [],
    "questions": [
      {
        "q": "What is the blue box for?",
        "options": [
          "Paper and cardboard",
          "Glass and metal",
          "Plastic bottles",
          "Food waste"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "When is collection?",
        "options": [
          "Thursday morning",
          "Monday evening",
          "Friday afternoon",
          "Every day"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What is the council’s goal?",
        "options": [
          "Reduce landfill waste by 20%",
          "Stop all transport",
          "Increase packaging",
          "Remove recycling bins"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-workshop",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "English Writing Workshop",
    "topic": "Education",
    "level": "Band 6-7",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "The writing workshop will focus on IELTS Task Two essays. In the first part, the tutor will explain how to analyse the question and identify the task type. After that, students will practise writing thesis statements and topic sentences. The final part of the workshop will be peer review, where students exchange paragraphs and give feedback using a checklist. Participants should bring a notebook, a pen, and one essay draft. The workshop will take place in room B twelve at two p.m. on Wednesday.",
    "vocab": [],
    "questions": [
      {
        "q": "What is the workshop mainly about?",
        "options": [
          "IELTS Task Two essays",
          "Cooking recipes",
          "Job interviews",
          "Travel planning"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What will students practise after question analysis?",
        "options": [
          "Thesis statements and topic sentences",
          "Drawing charts",
          "Pronouncing vowels only",
          "Writing stories only"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should participants bring?",
        "options": [
          "Notebook, pen, and one essay draft",
          "A laptop only",
          "Lunch and a camera",
          "A dictionary only"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-museum",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Museum Tour Information",
    "topic": "Culture",
    "level": "Band 5-6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Welcome to the City History Museum. The guided tour will begin in ten minutes in the main hall. It will last approximately forty five minutes. Please do not use flash photography, as it can damage some of the older objects. The cafe is located near the garden exit and offers sandwiches, tea, and cold drinks. If you are interested in local crafts, the gift shop sells handmade postcards and small ceramic bowls made by artists from the region.",
    "vocab": [],
    "questions": [
      {
        "q": "How long will the tour last?",
        "options": [
          "About 45 minutes",
          "10 minutes",
          "Two hours",
          "All day"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "Why is flash photography not allowed?",
        "options": [
          "It can damage older objects",
          "It is too expensive",
          "It makes noise",
          "It is boring"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What can visitors buy in the gift shop?",
        "options": [
          "Handmade postcards and ceramic bowls",
          "Large furniture",
          "Bus tickets",
          "Fresh vegetables"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-tech",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Technology in Classrooms",
    "topic": "Technology",
    "level": "Band 6-7",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "A recent school survey asked teachers how tablets affect classroom learning. Most teachers said tablets make it easier to share resources and give quick feedback. However, some teachers were concerned that students may become distracted if clear rules are not established. The school plans to introduce a digital learning policy next term. Students will be allowed to use tablets for research, quizzes, and note-taking, but social media will be blocked during lessons.",
    "vocab": [],
    "questions": [
      {
        "q": "What is one benefit of tablets?",
        "options": [
          "Sharing resources and quick feedback",
          "More social media use",
          "Longer school holidays",
          "Less reading"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What concern did teachers mention?",
        "options": [
          "Students may become distracted",
          "Tablets are too small to carry",
          "No one can type",
          "Books will disappear immediately"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What will be blocked during lessons?",
        "options": [
          "Social media",
          "Research websites",
          "Quizzes",
          "Note-taking apps"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-job-fair",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "University Job Fair",
    "topic": "Work",
    "level": "Band 6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "The university job fair will be held in the sports hall on Friday from ten a.m. to four p.m. More than thirty companies will attend, including technology firms, banks, and local charities. Students should bring several copies of their CV and prepare a short introduction about their skills and interests. There will also be a free seminar at one p.m. on how to answer common interview questions. Registration is recommended but not required.",
    "vocab": [],
    "questions": [
      {
        "q": "Where will the job fair be held?",
        "options": [
          "Sports hall",
          "Library",
          "City museum",
          "Main cafeteria"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should students bring?",
        "options": [
          "Several copies of their CV",
          "A passport only",
          "Sports clothes",
          "Textbooks"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What is the seminar about?",
        "options": [
          "Answering interview questions",
          "Cooking healthy food",
          "Writing fiction",
          "Choosing bus routes"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-housing",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Student Housing Advice",
    "topic": "Housing",
    "level": "Band 6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Students looking for accommodation should start early because rooms near campus are often taken quickly. Before signing a contract, check whether bills such as electricity, water, and internet are included in the rent. It is also important to visit the property if possible and test basic facilities, including heating, locks, and kitchen equipment. If you share a house, discuss cleaning responsibilities with your housemates at the beginning to avoid problems later.",
    "vocab": [],
    "questions": [
      {
        "q": "Why should students start early?",
        "options": [
          "Rooms near campus are taken quickly",
          "Contracts are never needed",
          "Rent is always free",
          "Houses disappear in winter"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should students check before signing?",
        "options": [
          "Whether bills are included",
          "The colour of every wall only",
          "The landlord’s favourite food",
          "The number of nearby cinemas only"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should housemates discuss early?",
        "options": [
          "Cleaning responsibilities",
          "Exam answers",
          "Travel souvenirs",
          "Museum tickets"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-science-club",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Science Club Meeting",
    "topic": "Science",
    "level": "Band 6-7",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "The science club will meet this Thursday to discuss a simple experiment on plant growth. Members will compare plants kept in natural light with plants kept under artificial light. The experiment will last four weeks, and students will record the height of each plant every three days. The club leader reminded everyone that the purpose is not only to get results but also to practise careful observation and accurate note-taking.",
    "vocab": [],
    "questions": [
      {
        "q": "What will the experiment compare?",
        "options": [
          "Natural and artificial light",
          "Two types of computers",
          "Different sports teams",
          "Hot and cold drinks"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "How long will the experiment last?",
        "options": [
          "Four weeks",
          "Three days",
          "One year",
          "One evening"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What skill is emphasised?",
        "options": [
          "Careful observation and accurate notes",
          "Fast guessing",
          "Perfect drawing only",
          "Speaking loudly"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-tourism",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Tourism Information Desk",
    "topic": "Travel",
    "level": "Band 5-6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Good afternoon. If you are visiting the old town, we recommend starting at the clock tower because it is easy to find and close to several attractions. Walking tours leave from the tower every hour between ten and three. Tickets cost eight pounds for adults and five pounds for students. The tour includes the market square, the river bridge, and the old theatre. Please wear comfortable shoes because some streets are steep and uneven.",
    "vocab": [],
    "questions": [
      {
        "q": "Where should visitors start?",
        "options": [
          "Clock tower",
          "Airport",
          "Science lab",
          "University library"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "How often do walking tours leave?",
        "options": [
          "Every hour",
          "Every five minutes",
          "Only once a week",
          "Every night at midnight"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "Why should visitors wear comfortable shoes?",
        "options": [
          "Some streets are steep and uneven",
          "The tour is underwater",
          "Shoes are sold there",
          "The buses are full"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  },
  {
    "id": "sim-budget",
    "type": "simulation",
    "source": "Lexora Original IELTS Simulation",
    "title": "Budgeting for Students",
    "topic": "Money",
    "level": "Band 6",
    "videoId": "",
    "note": "Original IELTS-style listening script. Use Play Audio first, answer the questions, then open the script for review.",
    "focus": [
      "Main idea",
      "Key details",
      "Numbers/locations/instructions"
    ],
    "script": "Managing money at university can be challenging, especially for students living away from home for the first time. A simple budget should include fixed costs such as rent and transport, as well as flexible costs such as food, entertainment, and clothes. Students are advised to record their spending for two weeks before making major changes. This helps them see where their money actually goes and identify small expenses that add up quickly.",
    "vocab": [],
    "questions": [
      {
        "q": "What are examples of fixed costs?",
        "options": [
          "Rent and transport",
          "Entertainment and clothes",
          "Snacks and cinema tickets",
          "Unexpected gifts only"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "What should students record?",
        "options": [
          "Their spending for two weeks",
          "Only their income",
          "Only exam scores",
          "Every conversation"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      },
      {
        "q": "Why record spending?",
        "options": [
          "To see where money goes",
          "To avoid all food",
          "To increase rent",
          "To buy more clothes"
        ],
        "answer": 0,
        "explain": "Answer comes from the original listening script."
      }
    ]
  }
];


function toast(msg, type='info'){
  const t = $('#toast'); t.textContent = msg; t.className = `toast show ${type}`;
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>t.classList.remove('show'), 3200);
}



function isLocalhost(){ return ['localhost','127.0.0.1','::1'].includes(location.hostname); }
function isSafeWebContext(){ return location.protocol === 'https:' || isLocalhost(); }
function decodeJwtPayload(token=''){
  try{
    const part = token.split('.')[1];
    if(!part) return null;
    const json = atob(part.replace(/-/g,'+').replace(/_/g,'/'));
    return JSON.parse(decodeURIComponent(Array.from(json).map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  }catch{ return null; }
}
function looksDangerousSupabaseKey(key=''){
  const clean = String(key || '').trim();
  if(!clean) return false;
  if(clean.startsWith('sb_secret_')) return true;
  if(clean.toLowerCase().includes('service_role')) return true;
  const payload = decodeJwtPayload(clean);
  return payload?.role === 'service_role';
}
function authInputStatus(){
  const email = $('#authEmail')?.value.trim() || '';
  const password = $('#authPassword')?.value || '';
  if(!/^\S+@\S+\.\S+$/.test(email)) return {ok:false,msg:'Email belum valid.'};
  if(password.length < 8) return {ok:false,msg:'Password minimal 8 karakter.'};
  if(!/[A-Za-z]/.test(password) || !/\d/.test(password)) return {ok:false,msg:'Password sebaiknya berisi huruf dan angka.'};
  return {ok:true,msg:'OK'};
}
function updateSecurityNotice(){
  const notice = $('#securityNotice');
  const badge = $('#securityBadge');
  let cls = 'security-notice';
  let msg = '🔐 Security ON: login wajib, RLS aktif, dan data dipisah per akun.';
  if(location.protocol === 'file:') { cls += ' danger'; msg = '⚠️ Jangan buka via file:// untuk login. Jalankan dengan Live Server atau python -m http.server.'; }
  else if(!isSafeWebContext()) { cls += ' warn'; msg = '⚠️ Gunakan HTTPS saat hosting supaya login dan microphone permission aman.'; }
  if(looksDangerousSupabaseKey(APP.SUPABASE_ANON_KEY)) { cls = 'security-notice danger'; msg = '⛔ config.js memakai secret/service_role key. Ganti dengan anon/publishable key sebelum website dipakai.'; }
  if(notice){ notice.className = cls; notice.textContent = msg; }
  if(badge){ badge.textContent = cls.includes('danger') ? '⛔ Security Risk' : (cls.includes('warn') ? '⚠️ Security Check' : '🔐 Security ON'); }
}


function cachedSupabaseSession(){
  if(!APP.SUPABASE_URL) return null;
  try{
    const ref = new URL(APP.SUPABASE_URL).hostname.split('.')[0];
    const keys = [
      `sb-${ref}-auth-token`,
      `sb-${ref}-auth-token-code-verifier`
    ];
    for(const key of Object.keys(localStorage)){
      if(!key.startsWith(`sb-${ref}-auth-token`)) continue;
      const raw = localStorage.getItem(key);
      if(!raw || raw.includes('code-verifier')) continue;
      let parsed = JSON.parse(raw);
      if(Array.isArray(parsed)) parsed = parsed[0];
      const session = parsed?.currentSession || parsed;
      const user = session?.user;
      const expiresAt = Number(session?.expires_at || 0);
      if(user?.id && (!expiresAt || expiresAt * 1000 > Date.now() - 60000)) return user;
    }
  }catch(err){ console.warn('Could not read cached Supabase session:', err); }
  return null;
}
function applyCachedSessionBeforeNetwork(){
  const user = cachedSupabaseSession();
  if(!user) return false;
  state.authUser = user;
  STUDENT_KEY = user.id;
  loadLocal();
  updateAuthUI();
  return true;
}

function appRedirectUrl(){
  if(location.protocol === 'file:') return undefined;
  return window.location.origin + window.location.pathname;
}
function updateLoginGate(){
  const logged = !!state.authUser;
  document.body.classList.remove('auth-checking');
  document.body.classList.toggle('account-ready', logged);
  document.body.classList.toggle('account-locked', !logged);
}
function updateAuthUI(){
  const logged = !!state.authUser;
  const label = logged ? (state.authUser.email || 'Logged in') : 'Login required';
  if($('#authBadge')) $('#authBadge').textContent = logged ? `👤 ${label}` : '🔒 Login required';
  if($('#authResult')) $('#authResult').innerHTML = logged ? `✅ Login aktif sebagai <b>${escapeHTML(label)}</b>. Kamu bisa mulai belajar.` : 'Masukkan email dan password untuk mulai belajar.';
  if($('#logoutBtn')) $('#logoutBtn').classList.toggle('hidden', !logged);
  if($('#logoutBtn2')) $('#logoutBtn2').classList.toggle('hidden', !logged);
  const adminNav = $('.admin-nav'); if(adminNav) adminNav.classList.toggle('hidden', !isAdminUser());
  const displayName = logged ? String(label).split('@')[0] : '';
  if($('#dashboardGreeting')) $('#dashboardGreeting').textContent = logged ? `Welcome back, ${displayName} 👋` : 'Welcome back 👋';
  updatePremiumUI();
  updateLoginGate();
  updateSecurityNotice();
}
async function refreshAuthSession(){
  if(!state.client) {
    const cached = applyCachedSessionBeforeNetwork();
    if(!cached){ state.authUser=null; STUDENT_KEY='guest-local'; updateAuthUI(); }
    return state.authUser || null;
  }
  let data = null;
  let timedOut = false;
  try{
    const timeout = new Promise(resolve => setTimeout(()=>resolve({data:null, timeout:true}), 1200));
    const result = await Promise.race([state.client.auth.getSession(), timeout]);
    timedOut = !!result?.timeout;
    data = result?.data || null;
    if(timedOut) console.warn('Auth session check timed out; keeping cached session if available.');
  }catch(err){
    console.warn('Auth session check failed:', err);
  }
  if(timedOut && state.authUser){ updateAuthUI(); return state.authUser; }
  if(timedOut && applyCachedSessionBeforeNetwork()) return state.authUser;
  const user = data?.session?.user || null;
  state.authUser = user;
  STUDENT_KEY = user?.id || 'guest-local';
  loadLocal();
  updateAuthUI();
  return user;
}
async function signUpEmail(){
  if(!state.client) return toast('Supabase belum dikonfigurasi. Isi URL dan anon key di config.js dulu.', 'error');
  const email=$('#authEmail')?.value.trim(); const password=$('#authPassword')?.value;
  const check = authInputStatus();
  if(!check.ok) return toast(check.msg, 'error');
  const options = appRedirectUrl() ? { emailRedirectTo: appRedirectUrl() } : {};
  const { data, error } = await state.client.auth.signUp({email,password, options});
  if(error) return toast(error.message, 'error');
  $('#authResult').innerHTML = data?.session ? 'Akun dibuat dan langsung login ✅' : 'Sign up berhasil. Cek email konfirmasi. Kalau link tidak kembali ke website, atur Site URL dan Redirect URLs di Supabase.';
  await refreshAuthSession();
}
async function loginEmail(){
  if(!state.client) return toast('Supabase belum dikonfigurasi. Isi URL dan anon key di config.js dulu.', 'error');
  const email=$('#authEmail')?.value.trim(); const password=$('#authPassword')?.value;
  if(!email || !password) return toast('Isi email dan password dulu.', 'error');
  if(password.length < 8) return toast('Password minimal 8 karakter.', 'error');
  const { error } = await state.client.auth.signInWithPassword({email,password});
  if(error) return toast(error.message, 'error');
  await refreshAuthSession(); await initSupabase(); await refreshData(); await loadPremiumStatus(); if(!redirectByPremium()) setView('dashboard');
  toast('Login berhasil. Progress sekarang tersimpan di akunmu.', 'success');
}
async function loginGoogle(){
  if(!state.client) return toast('Isi Supabase URL dan anon key dulu di config.js.', 'error');
  const { error } = await state.client.auth.signInWithOAuth({provider:'google', options:{redirectTo: appRedirectUrl() || window.location.href.split('#')[0]}});
  if(error) toast(error.message, 'error');
}
async function logoutAccount(){
  if(state.client) await state.client.auth.signOut();
  state.authUser=null; STUDENT_KEY='guest-local'; state.cloudReady=false; state.usingCloud=false;
  loadLocal(); updateAuthUI();
  toast('Logout berhasil. Silakan login lagi untuk belajar.', 'info');
}
async function initSupabase(){
  const has = APP.USE_SUPABASE !== false && APP.SUPABASE_URL && APP.SUPABASE_ANON_KEY && window.supabase;
  if(!has){ state.client=null; state.cloudReady=false; state.usingCloud=false; updateSyncBadges('Supabase config needed'); updateAuthUI(); return; }
  if(looksDangerousSupabaseKey(APP.SUPABASE_ANON_KEY)){ state.client=null; state.cloudReady=false; state.usingCloud=false; updateSyncBadges('Security key error'); updateAuthUI(); toast('Jangan pakai service_role/secret key di frontend. Pakai anon/publishable key.', 'error'); return; }
  try{
    if(!state.client) {
      state.client = window.supabase.createClient(APP.SUPABASE_URL, APP.SUPABASE_ANON_KEY);
      state.client.auth.onAuthStateChange(async (_event, session)=>{
        state.authUser = session?.user || null;
        STUDENT_KEY = state.authUser?.id || 'guest-local';
        loadLocal(); updateAuthUI();
        if(state.authUser){ state.cloudReady=true; updateSyncBadges('Supabase sync ON'); await refreshData(); await loadPremiumStatus(); if(!redirectByPremium()) setView('dashboard'); }
      });
    }
    const user = await refreshAuthSession();
    if(user) await loadPremiumStatus();
    if(!user){ state.cloudReady=false; state.usingCloud=false; updateSyncBadges('Login required'); updateAuthUI(); return; }
    const { error } = await state.client.from('ielts_vocabulary').select('slug', {count:'exact', head:true}).eq('student_key', STUDENT_KEY);
    if(error) throw error;
    state.cloudReady=true; updateSyncBadges('Supabase sync ON');
  }catch(err){
    console.error(err); state.cloudReady=false; state.usingCloud=false; updateSyncBadges('Supabase error');
    $('#setupResult') && ($('#setupResult').innerHTML = `Supabase belum siap: ${escapeHTML(err.message || err)}. Pastikan SQL Supabase versi terbaru sudah dijalankan dan kamu sudah login.`);
  }
}
function updateSyncBadges(text){
  $('#syncBadge').textContent = text;
  if($('#cloudMini')) $('#cloudMini').textContent = 'Progress tersimpan di browser ini';
}

async function refreshData(){
  const builtinItems = await loadBuiltinDataFile();
  const builtins = builtinItems.map(v => normalizeVocab({...v, source:'built-in'}));
  let vocab = applyLocalProgress(builtins);
  if(state.cloudReady){
    try{
      const { data, error } = await state.client.from('ielts_vocabulary').select('*').eq('student_key', STUDENT_KEY).order('word', {ascending:true}).limit(6000);
      if(error) throw error;
      if(data && data.length){
        const cloud = data.map(normalizeVocab);
        // Important: cloud progress/custom data must not hide the built-in 5000 vocabulary.
        // Merge Supabase rows on top of the built-in library so the library is always visible.
        const map = new Map(vocab.map(v=>[v.slug, v]));
        cloud.forEach(v=>map.set(v.slug, {...(map.get(v.slug)||{}), ...v}));
        vocab = [...map.values()];
        state.usingCloud=true; updateSyncBadges('Supabase sync ON');
      }
      else if(APP.AUTO_SEED_WHEN_EMPTY){ await seedSupabase(false); return refreshData(); }
    }catch(err){ console.error(err); toast('Gagal mengambil data Supabase, pakai local dulu.', 'error'); state.usingCloud=false; }
  }
  state.vocab = vocab;
  if(!state.vocab.length && builtinRaw().length){
    ensureVocabLoaded();
  }
  await loadCloudProgressExtras();
  if(!state.selected && state.vocab.length) state.selected = state.vocab[0].slug;
  await loadPremiumStatus();
  renderAll();
}
async function loadCloudProgressExtras(){
  if(!state.cloudReady) return;
  try{
    const [quiz, reading, grammar, daily, hard, modules] = await Promise.all([
      state.client.from('ielts_quiz_results').select('*').eq('student_key', STUDENT_KEY).order('created_at',{ascending:false}).limit(100),
      state.client.from('ielts_reading_results').select('*').eq('student_key', STUDENT_KEY).order('created_at',{ascending:false}).limit(100),
      state.client.from('ielts_grammar_progress').select('*').eq('student_key', STUDENT_KEY),
      state.client.from('ielts_daily_activity').select('activity_date,total_actions,updated_at').eq('student_key', STUDENT_KEY).order('activity_date',{ascending:false}).limit(400),
      state.client.from('ielts_hard_words').select('slug,review_step').eq('student_key', STUDENT_KEY).order('updated_at',{ascending:false}).limit(500),
      state.client.from('ielts_module_progress').select('*').eq('student_key', STUDENT_KEY).order('updated_at',{ascending:false}).limit(500)
    ]);
    if(!quiz.error) state.quizResults = quiz.data || [];
    if(!reading.error) state.readingResults = reading.data || [];
    if(!grammar.error){ state.grammarDone = {}; (grammar.data||[]).forEach(g=>state.grammarDone[g.lesson_id]=g.score_percent || 100); }
    if(!daily.error){
      const cloudDays = (daily.data || []).map(d=>String(d.activity_date).slice(0,10));
      state.local.streak.days = uniq([...(state.local.streak.days || []), ...cloudDays]).sort();
      refreshStreakCache();
    }
    if(!hard.error){
      state.local.reviewTracker = {};
      (hard.data || []).forEach(h=>state.local.reviewTracker[h.slug] = Number(h.review_step || 0));
    }
    if(!modules.error){
      state.moduleProgress = {};
      (modules.data || []).forEach(m=>state.moduleProgress[m.module_id] = m);
      state.local.moduleProgress = state.moduleProgress;
    }
    saveLocal();
  }catch(e){ console.warn(e); }
}
async function seedSupabase(showToast=true){
  if(!state.cloudReady){ toast('Supabase belum connect. Isi config.js dan jalankan SQL dulu.', 'error'); return; }
  const btns = [$('#importSupabaseBtn'), $('#importSupabaseBtn2')].filter(Boolean);
  btns.forEach(b=>{b.disabled=true; b.textContent='Syncing...';});
  try{
    const builtinItems = await loadBuiltinDataFile();
    if(!builtinItems.length) throw new Error('data/vocab-5000.js belum terbaca. Pastikan file data/vocab-5000.js ikut ter-upload.');
    const data = builtinItems.map(v => dbVocab({...v, source:'built-in'}));
    for(let i=0;i<data.length;i+=400){
      const chunk = data.slice(i,i+400);
      const { error } = await state.client.from('ielts_vocabulary').upsert(chunk, {onConflict:'student_key,slug'});
      if(error) throw error;
      if(showToast) toast(`Import ${Math.min(i+400,data.length)} / ${data.length} vocabulary...`);
    }
    if(showToast) toast('5000 vocabulary berhasil disimpan/sync ke akun Supabase kamu.', 'success');
    await refreshData();
  }catch(err){ console.error(err); toast(`Import gagal: ${err.message || err}`, 'error'); }
  finally{ btns.forEach(b=>{b.disabled=false; b.textContent=b.id==='importSupabaseBtn2'?'Import/Sync 5000':'Sync 5000';}); }
}
async function saveVocab(v){
  const item = normalizeVocab(v);
  if(state.cloudReady){
    const { error } = await state.client.from('ielts_vocabulary').upsert(dbVocab(item), {onConflict:'student_key,slug'});
    if(error){ console.error(error); toast('Disimpan di browser.', 'error'); }
    else { state.usingCloud=true; }
  }
  state.local.progress[item.slug] = {...(state.local.progress[item.slug] || {}), ...item};
  if(item.source === 'custom' && !(state.local.custom||[]).some(x=>x.slug===item.slug)) state.local.custom.push(item);
  saveLocal();
  const idx = state.vocab.findIndex(x=>x.slug===item.slug);
  if(idx >= 0) state.vocab[idx] = item; else state.vocab.unshift(item);
}

function computeStreak(days){
  const set = new Set((days || []).filter(Boolean));
  let current = 0;
  const todayKey = dateKey();
  const yesterdayKey = daysAgoKey(1);
  let cursor = set.has(todayKey) ? new Date() : (set.has(yesterdayKey) ? (()=>{const x=new Date(); x.setDate(x.getDate()-1); return x;})() : null);
  while(cursor && set.has(dateKey(cursor))){ current++; cursor.setDate(cursor.getDate()-1); }
  const sorted = [...set].sort();
  let best = 0, run = 0, prev = null;
  for(const key of sorted){
    if(!prev){ run = 1; }
    else { const d = Math.round((new Date(key) - new Date(prev)) / 86400000); run = d === 1 ? run + 1 : 1; }
    best = Math.max(best, run); prev = key;
  }
  return {current, best, lastActive: sorted.at(-1) || null, todayDone:set.has(todayKey)};
}
function refreshStreakCache(){
  const stats = computeStreak(state.local?.streak?.days || []);
  state.local.streak.current = stats.current;
  state.local.streak.best = Math.max(state.local.streak.best || 0, stats.best);
  state.local.streak.lastActive = stats.lastActive;
  return {...stats, best:Math.max(state.local.streak.best || 0, stats.best)};
}
async function recordActivity(kind='study', amount=1){
  if(!state.local) return;
  const key = dateKey();
  state.local.streak = state.local.streak || fallbackLocal().streak;
  if(!state.local.streak.days.includes(key)) state.local.streak.days.push(key);
  state.local.streak.days = uniq(state.local.streak.days).sort();
  state.local.streak.log = [{date:key, kind, amount, at:nowISO()}, ...(state.local.streak.log || [])].slice(0,120);
  refreshStreakCache(); saveLocal();
  renderStats(); renderDashboardStreak();
  if(state.cloudReady){
    try{
      const row = {student_key:STUDENT_KEY, activity_date:key, activities:[{kind, amount, at:nowISO()}], total_actions:amount, updated_at:nowISO()};
      await state.client.from('ielts_daily_activity').upsert(row, {onConflict:'student_key,activity_date'});
    }catch(e){ console.warn('Daily streak cloud sync skipped:', e.message || e); }
  }
}

async function saveQuizResult(type,total,correct,details={}){
  const scorePercent=Math.round(correct/total*100);
  const row = {student_key:STUDENT_KEY, quiz_type:type, total, correct, score_percent:scorePercent, details};
  state.quizResults.unshift({...row, created_at:nowISO()});
  state.local.quizResults = state.quizResults.slice(0,300); saveLocal();
  if(state.cloudReady){ await state.client.from('ielts_quiz_results').insert(row); }
  await saveModuleProgress(details, scorePercent);
  await recordActivity('quiz', total);
}
async function saveReadingResult(passageId,total,correct){
  const row = {student_key:STUDENT_KEY, passage_id:passageId, total, correct, score_percent:Math.round(correct/total*100)};
  state.readingResults.unshift({...row, created_at:nowISO()}); state.local.readingResults = state.readingResults.slice(0,100); saveLocal();
  if(state.cloudReady){ await state.client.from('ielts_reading_results').insert(row); }
  await recordActivity('reading', total);
}
async function markGrammarDone(id,score=100){
  state.grammarDone[id] = score; state.local.grammarDone = state.grammarDone; saveLocal();
  if(state.cloudReady){ await state.client.from('ielts_grammar_progress').upsert({student_key:STUDENT_KEY, lesson_id:id, done:true, score_percent:score, updated_at:nowISO()}, {onConflict:'student_key,lesson_id'}); }
  await recordActivity('grammar', 1);
}

function setView(view){
  state.currentView = view;
  $$('.nav-item').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  $$('.view').forEach(v=>v.classList.remove('active'));
  $(`#${view}View`)?.classList.add('active');
  const names = {dashboard:'Home Dashboard',vocab:'Vocabulary Library',expressions:'Daily Expressions',hardwords:'My Hard Words',idioms:'IELTS Idioms',flashcard:'Daily Review',testbank:'Test Modules',progress:'Learning Analytics',grammar:'Grammar Lessons',reading:'Reading Lab',writing:'Writing Check',speaking:'Speaking Practice',listening:'Listening Lab',settings:'Settings'};
  $('#pageTitle').textContent = names[view] || view;
  if($('#pageEyebrow')) $('#pageEyebrow').textContent = view==='dashboard' ? 'YOUR LEARNING SPACE' : view==='upgrade' ? 'ACCOUNT & ACCESS' : view==='progress' ? 'YOUR RESULTS' : view==='hardwords' ? 'PERSONAL REVIEW' : view==='testbank' ? 'STRUCTURED PRACTICE' : 'LEARN STEP BY STEP';
  document.body.classList.remove('sidebar-open');
  window.scrollTo({top:0,behavior:'smooth'});
  renderAll();
}
function renderAll(){ renderStats(); renderDashboard(); if(state.currentView==='upgrade') renderUpgrade(); if(state.currentView==='admin') renderAdmin(); if(state.currentView==='vocab') renderVocab(); if(state.currentView==='expressions') renderExpressions(); if(state.currentView==='hardwords') renderHardWordsPage(); if(state.currentView==='idioms') renderIdioms(); if(state.currentView==='flashcard') renderFlashcard(); if(state.currentView==='progress') renderProgressAnalytics(); if(state.currentView==='grammar') renderGrammar(); if(state.currentView==='listening') renderListening(); if(state.currentView==='reading') renderReading(); if(state.currentView==='writing') renderWriting(); if(state.currentView==='speaking') renderSpeaking(); if(state.currentView==='settings') renderSettings(); }
function isDue(v){ return !v.due_at || new Date(v.due_at) <= today(); }
function dueCards(){ return state.vocab.filter(isDue).sort((a,b)=>new Date(a.due_at)-new Date(b.due_at)); }
function renderStats(){
  const due = dueCards().length; const mastered = state.vocab.filter(v=>v.mastered || v.interval_days >= 21).length;
  const scores = [...state.quizResults, ...state.readingResults].map(x=>Number(x.score_percent)).filter(n=>!isNaN(n));
  const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  const streak = refreshStreakCache();
  const hardCount = Object.keys(state.local?.hardWords || state.local?.reviewTracker || {}).length;
  $('#statTotal').textContent = state.vocab.length.toLocaleString('en-US'); $('#statDue').textContent = due.toLocaleString('en-US'); $('#statMastered').textContent = mastered.toLocaleString('en-US'); $('#statAverage').textContent = `${avg}%`;
  if($('#statStreak')) $('#statStreak').textContent = `${streak.current}🔥`;
  if($('#statBestStreak')) $('#statBestStreak').textContent = `Best: ${streak.best} days`;
  $('#vocabBadge').textContent = `${state.vocab.length.toLocaleString('en-US')} vocab`;
  if($('#hubDueCount')) $('#hubDueCount').textContent = due.toLocaleString('en-US');
  if($('#hubAverageScore')) $('#hubAverageScore').textContent = `${avg}%`;
  if($('#hubHardCount')) $('#hubHardCount').textContent = hardCount.toLocaleString('en-US');
  const doneToday = state.vocab.filter(v => v.last_reviewed_at && new Date(v.last_reviewed_at).toDateString() === today().toDateString()).length;
  const hasAnyActivityToday = streak.todayDone || doneToday > 0;
  $('#todayMission').textContent = hasAnyActivityToday ? `Streak aman: ${streak.current} hari 🔥` : `Review ${Math.max(0,20-doneToday)} cards lagi`;
  $('#missionBar').style.width = `${clamp(Math.max(doneToday, hasAnyActivityToday ? 20 : 0)/20*100,0,100)}%`;
}
function renderDashboardStreak(){
  if(!$('#streakStrip')) return;
  const streak = refreshStreakCache();
  const done = new Set(state.local.streak.days || []);
  $('#streakBig').textContent = `${streak.current} ${streak.current===1?'day':'days'}`;
  $('#streakBest').textContent = `${streak.best} ${streak.best===1?'day':'days'}`;
  $('#streakToday').textContent = streak.todayDone ? 'Sudah ✅' : 'Belum';
  $('#streakStatus').textContent = streak.todayDone ? 'Streak aman hari ini' : 'Kerjakan 1 latihan untuk aktif';
  const items = [];
  for(let i=13;i>=0;i--){
    const key = daysAgoKey(i);
    const d = new Date(key);
    const label = i===0 ? 'Today' : d.toLocaleDateString('en-US',{weekday:'short'});
    items.push(`<div class="streak-dot ${done.has(key)?'done':''} ${i===0?'today':''}"><span>${done.has(key)?'🔥':'·'}</span><small>${label}</small></div>`);
  }
  $('#streakStrip').innerHTML = items.join('');
}
function dashboardCoachData(){
  const due = dueCards().length; const streak = refreshStreakCache();
  if(due > 40) return {msg:'Card yang due memang banyak, tapi jangan panik. Otak lebih suka target kecil yang selesai daripada target besar yang bikin stres.', tips:['Mulai dari 10 kartu dulu, lalu istirahat 2 menit.','Pilih 3 expression favorit dan ucapkan keras-keras.','Setelah itu baru lanjut grammar atau reading pendek.']};
  if(streak.current >= 5) return {msg:'Streak kamu sudah bagus. Sekarang fokusnya bukan nambah beban, tapi menjaga ritme yang nyaman dan konsisten.', tips:['Pertahankan sesi singkat 15–25 menit.','Pilih latihan yang berbeda supaya tidak bosan.','Akhiri dengan 1 kemenangan kecil: skor bagus atau 1 paragraf jadi.']};
  if(streak.current === 0) return {msg:'Mulai dari langkah yang kecil. Belajar 10 menit hari ini jauh lebih baik daripada menunggu mood sempurna.', tips:['Buka Daily Expressions atau Idioms dulu untuk pemanasan.','Review 5 kartu saja kalau sedang capek.','Tulis 3 kalimat pendek memakai kata baru.']};
  return {msg:'Kamu sudah bergerak. Supaya materi lebih nempel, gabungkan lihat, ucapkan, pakai, lalu ulangi lagi besok.', tips:['Setelah belajar kata baru, buat satu kalimatmu sendiri.','Gunakan tombol listen lalu tirukan pronunciation.','Cek writing untuk melihat kesalahan yang sering berulang.']};
}
function renderDashboardWeekly(){
  const box = $('#dashboardWeeklyBars'); if(!box) return;
  const days = []; const activeSet = new Set(state.local?.streak?.days || []);
  let activeCount = 0;
  for(let i=6;i>=0;i--){
    const key = daysAgoKey(i); const d = new Date(key); const active = activeSet.has(key); if(active) activeCount++;
    const activityRows = (state.local?.streak?.log || []).filter(x=>String(x.created_at||x.date||'').slice(0,10)===key);
    const amount = active ? Math.min(100, 35 + activityRows.length*18) : 8;
    days.push(`<div class="weekly-bar-item"><div class="weekly-bar-track"><span class="weekly-bar-fill" style="height:${amount}%"></span></div><small>${d.toLocaleDateString('en-US',{weekday:'short'}).slice(0,2)}</small></div>`);
  }
  box.innerHTML = days.join('');
  if($('#dashboardWeeklySessions')) $('#dashboardWeeklySessions').textContent = activeCount;
}

function renderDashboard(){
  $('#planList').innerHTML = [
    ['1','Warm-up','Mulai dari Daily Expressions, Idioms, atau 5 kartu vocab agar otak masuk mode belajar tanpa terasa berat.'],
    ['2','Focus Lesson','Selesaikan 1 lesson grammar atau 1 reading pendek.'],
    ['3','Active Recall','Kerjakan 10–20 soal agar vocabulary aktif, bukan cuma hafal pasif.'],
    ['4','Use the Language','Tulis 1 paragraf atau rekam 5 target words.']
  ].map(x=>`<div class="timeline-item"><div class="timeline-bubble">${x[0]}</div><div><h4>${x[1]}</h4><p>${x[2]}</p></div></div>`).join('');
  const due = dueCards().slice(0,10); $('#dueCountTag').textContent = `${dueCards().length} cards`;
  if($('#hubDueCount')) $('#hubDueCount').textContent = dueCards().length.toLocaleString('en-US');
  const completedModules = (state.quizResults || []).filter(r=>String(r.quiz_type||'').includes('module') || String(r.quiz_type||'').includes('pack')).length;
  if($('#hubNextModule')) $('#hubNextModule').textContent = completedModules ? `Kamu sudah menyelesaikan ${completedModules} modul/pack. Lanjutkan modul berikutnya.` : 'Pilih level Band lalu kerjakan Module 1 dulu.';
  $('#dueList').innerHTML = due.length ? due.map(v=>`<div class="mini-card"><div><b>${escapeHTML(v.word)}</b><small>${escapeHTML(v.meaning_id || v.definition_en)}</small></div><button class="btn ghost" data-review-slug="${v.slug}">Review</button></div>`).join('') : '<div class="empty-state">Belum ada due card. Mantap!</div>';
  $$('[data-review-slug]').forEach(b=>b.onclick=()=>{ state.selected=b.dataset.reviewSlug; setView('flashcard'); });
  const coach = dashboardCoachData();
  if($('#coachMessage')) $('#coachMessage').textContent = coach.msg;
  if($('#coachChecklist')) $('#coachChecklist').innerHTML = coach.tips.map(t=>`<li>${escapeHTML(t)}</li>`).join('');
  renderBandPath('dashboardBandPath', true);
  renderDashboardStreak();
  renderDashboardWeekly();
  renderDashboardHardWords();
}

function populateFilters(){
  const levels = uniq(state.vocab.map(v=>v.level)).sort(); const topics = uniq(state.vocab.map(v=>v.topic)).sort();
  const currentL = $('#levelFilter').value || 'all'; const currentT = $('#topicFilter').value || 'all';
  $('#levelFilter').innerHTML = '<option value="all">All levels</option>' + levels.map(l=>`<option>${escapeHTML(l)}</option>`).join('');
  $('#topicFilter').innerHTML = '<option value="all">All topics</option>' + topics.map(t=>`<option>${escapeHTML(t)}</option>`).join('');
  $('#levelFilter').value = levels.includes(currentL) ? currentL : 'all'; $('#topicFilter').value = topics.includes(currentT) ? currentT : 'all';
}
function filteredVocab(){
  const q = ($('#searchInput').value || '').toLowerCase().trim(); const level = $('#levelFilter').value; const topic = $('#topicFilter').value; const sort = $('#sortFilter').value;
  let data = state.vocab.filter(v => (level==='all'||v.level===level) && (topic==='all'||v.topic===topic));
  if(q) data = data.filter(v => [v.word,v.meaning_id,v.definition_en,v.example_en,v.topic,v.synonym,v.upgrade_from].join(' ').toLowerCase().includes(q));
  const sorter = {
    due:(a,b)=>(isDue(b)-isDue(a)) || (new Date(a.due_at)-new Date(b.due_at)),
    word:(a,b)=>a.word.localeCompare(b.word), hard:(a,b)=>(b.wrong_count-a.wrong_count)||(b.difficulty-a.difficulty), mastered:(a,b)=>(b.interval_days-a.interval_days)
  }[sort] || ((a,b)=>a.word.localeCompare(b.word));
  return data.sort(sorter);
}
function expressionSource(){
  const fav = state.local.expressionFavorites || {};
  return dailyExpressions.map(e=>({...e, favorite:!!fav[e.id]}));
}
function toggleExpressionFavorite(id){
  state.local.expressionFavorites[id] = !state.local.expressionFavorites[id];
  saveLocal(); renderExpressions();
}
function expressionOrderSort(items){
  if(!state.expressionOrder || !state.expressionOrder.length) return items;
  const order = new Map(state.expressionOrder.map((id,i)=>[id,i]));
  return [...items].sort((a,b)=>(order.get(a.id) ?? 9999) - (order.get(b.id) ?? 9999));
}
function reviewPool(){
  const tracker = state.local.reviewTracker || {};
  const manual = Object.keys(tracker).map(slug => state.vocab.find(v=>v.slug===slug)).filter(Boolean);
  const autoHard = state.vocab.filter(v => (v.wrong_count||0) > 0 || (v.lapses||0) > 0).sort((a,b)=>(b.wrong_count+b.lapses)-(a.wrong_count+a.lapses)).slice(0,20);
  const map = new Map();
  [...manual, ...autoHard].forEach(v=>map.set(v.slug, v));
  return [...map.values()].slice(0,40);
}
async function markHardWord(slug){
  const v = state.vocab.find(x=>x.slug===slug); if(!v) return;
  state.local.reviewTracker = state.local.reviewTracker || {};
  if(state.local.reviewTracker[slug] === undefined) state.local.reviewTracker[slug] = 0;
  saveLocal();
  if(state.cloudReady){ await state.client.from('ielts_hard_words').upsert({student_key:STUDENT_KEY, slug, review_step:state.local.reviewTracker[slug], updated_at:nowISO()}, {onConflict:'student_key,slug'}); }
  toast(`“${v.word}” masuk My Hard Words. ${state.cloudReady?'Tersimpan di akunmu.':'Masih tersimpan lokal karena belum login.'}`, 'success');
  renderDashboardHardWords(); if(state.currentView==='expressions'||state.currentView==='hardwords') renderReviewTable();
}
async function removeHardWord(slug){
  state.local.reviewTracker = state.local.reviewTracker || {};
  delete state.local.reviewTracker[slug]; saveLocal();
  if(state.cloudReady){ await state.client.from('ielts_hard_words').delete().eq('student_key', STUDENT_KEY).eq('slug', slug); }
  renderReviewTable(); renderDashboardHardWords(); toast('Dihapus dari My Hard Words.', 'info');
}
function hardRows(){ return reviewPool(); }
function bindHardWordsTable(bodyId){
  $$(`#${bodyId} [data-review-dot]`).forEach(b=>b.onclick=async()=>{ state.local.reviewTracker[b.dataset.reviewDot] = Number(b.dataset.reviewScore); saveLocal(); if(state.cloudReady){ await state.client.from('ielts_hard_words').upsert({student_key:STUDENT_KEY, slug:b.dataset.reviewDot, review_step:Number(b.dataset.reviewScore), updated_at:nowISO()}, {onConflict:'student_key,slug'}); } renderReviewTable(); renderDashboardHardWords(); toast('Review step updated. Sedikit-sedikit tapi konsisten 💪','success'); });
  $$(`#${bodyId} [data-speak-mini]`).forEach(b=>b.onclick=()=>speak(b.dataset.speakMini));
  $$(`#${bodyId} [data-review-now]`).forEach(b=>b.onclick=()=>{ state.selected=b.dataset.reviewNow; setView('flashcard'); });
  $$(`#${bodyId} [data-hard-remove]`).forEach(b=>b.onclick=()=>removeHardWord(b.dataset.hardRemove));
}
function renderHardWordsTable(bodyId='reviewTableBody'){
  const body = $('#'+bodyId); if(!body) return;
  const tracker = state.local.reviewTracker || {};
  const rows = hardRows();
  if(!rows.length){
    body.innerHTML = `<tr><td colspan="5"><div class="empty-state">Belum ada kata sulit pribadi. Buka Vocabulary lalu klik <b>⭐ Sulit Diingat</b> pada kata yang sering lupa.</div></td></tr>`;
    return;
  }
  body.innerHTML = rows.map((v,i)=>{ const score = tracker[v.slug] ?? Math.min(6, Math.max(0, Math.ceil((v.repetitions||0)/2))); const isManual = tracker[v.slug] !== undefined; return `<tr><td>${i+1}</td><td><b>${escapeHTML(v.word)}</b><br><small>${isManual?'⭐ kamu tandai sulit':'otomatis dari jawaban salah'}</small></td><td>${escapeHTML(v.meaning_id || v.definition_en || '-')}</td><td><div class="review-circles">${Array.from({length:6},(_,n)=>`<button class="review-dot ${n < score ? 'filled':''}" title="Step ${n+1}" data-review-dot="${v.slug}" data-review-score="${n+1}"></button>`).join('')}</div></td><td><div class="review-row-action"><button class="audio-mini" data-speak-mini="${escapeHTML(v.word)}">🔊</button><button class="small-ghost" data-review-now="${v.slug}">Review</button>${isManual?`<button class="small-ghost" data-hard-remove="${v.slug}">Remove</button>`:''}</div></td></tr>`; }).join('');
  bindHardWordsTable(bodyId);
}
function renderReviewTable(){
  renderHardWordsTable('reviewTableBody');
  renderHardWordsTable('hardWordsTableBody');
}
function renderHardWordsPage(){ renderReviewTable(); }
function renderDashboardHardWords(){
  const box = $('#dashboardHardWords'); if(!box) return;
  const rows = hardRows().slice(0,8);
  if($('#hardWordsCountTag')) $('#hardWordsCountTag').textContent = `${hardRows().length} words`;
  box.innerHTML = rows.length ? rows.map(v=>`<button class="hard-preview-card" data-hard-preview="${v.slug}"><b>${escapeHTML(v.word)}</b><small>${escapeHTML(v.meaning_id || v.definition_en || '-')}</small></button>`).join('') : '<div class="empty-state">Belum ada kata sulit. Tandai dari halaman Vocabulary dengan tombol ⭐ Sulit Diingat.</div>';
  $$('[data-hard-preview]').forEach(b=>b.onclick=()=>{ state.selected=b.dataset.hardPreview; setView('vocab'); });
}
function renderExpressions(){
  const cats = uniq(dailyExpressions.map(e=>e.category));
  const catSel = $('#expressionCategory');
  if(catSel && catSel.options.length <= 1){ catSel.innerHTML = '<option value="all">All categories</option>' + cats.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join(''); }
  const q = ($('#expressionSearch')?.value || '').toLowerCase().trim();
  const cat = ($('#expressionCategory')?.value || 'all');
  let data = expressionSource().filter(e => (cat==='all' || e.category===cat) && [e.phrase,e.meaning,e.note,e.example].join(' ').toLowerCase().includes(q));
  data = expressionOrderSort(data);
  $('#expressionGrid').innerHTML = data.map(e=>`<div class="expression-card"><div class="expression-top"><div><h4>${escapeHTML(e.phrase)}</h4><p class="meaning">${escapeHTML(e.meaning)}</p></div><button class="icon-fav" title="Favorite" data-exp-fav="${e.id}">${e.favorite?'♥':'♡'}</button></div><div class="expression-meta"><span class="chip">${escapeHTML(e.category)}</span></div><div class="expression-actions"><button class="expression-action-link" data-exp-more="${e.id}">More</button><button class="icon-circle mic" data-exp-mic="${e.phrase}">🎙️</button><button class="icon-circle listen" data-exp-listen="${e.phrase}">🔊</button></div><div class="expression-more hidden" id="expMore-${e.id}"><p><b>Kapan dipakai:</b> ${escapeHTML(e.note)}</p><p><b>Contoh:</b> ${escapeHTML(e.example)}</p></div></div>`).join('') || '<div class="empty-state">Expression tidak ditemukan.</div>';
  $$('[data-exp-fav]').forEach(b=>b.onclick=()=>toggleExpressionFavorite(b.dataset.expFav));
  $$('[data-exp-more]').forEach(b=>b.onclick=()=>{ const box = $('#expMore-'+b.dataset.expMore); if(box) box.classList.toggle('hidden'); });
  $$('[data-exp-listen]').forEach(b=>b.onclick=()=>speak(b.dataset.expListen));
  $$('[data-exp-mic]').forEach(b=>b.onclick=()=>{ setView('speaking'); $('#pronounceResult').innerHTML = `Target expression: <b>${escapeHTML(b.dataset.expMic)}</b><br>Klik <b>Speak Now</b> lalu coba ucapkan expression ini.`; $('#targetPronounce').textContent = b.dataset.expMic; $('#targetMeaning').textContent = 'Practice expression'; });
  renderReviewTable();
}


function idiomUseClass(use){
  if(use === 'Speaking safe') return 'speaking';
  if(use === 'Understand') return 'understand';
  if(use === 'Avoid in writing') return 'avoid';
  return 'caution';
}
function idiomById(id){ return idiomData.find(x=>x.id===id); }
function idiomOrdered(items){
  if(!state.idiomOrder || !state.idiomOrder.length) return items;
  const order = new Map(state.idiomOrder.map((id,i)=>[id,i]));
  return [...items].sort((a,b)=>(order.get(a.id) ?? 9999) - (order.get(b.id) ?? 9999));
}
function renderIdioms(){
  const catSel = $('#idiomCategoryFilter');
  if(catSel && catSel.options.length <= 1){
    const cats = uniq(idiomData.map(i=>i.category)).sort();
    catSel.innerHTML = '<option value="all">All categories</option>' + cats.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
  }
  const q = ($('#idiomSearch')?.value || '').toLowerCase().trim();
  const use = $('#idiomUseFilter')?.value || 'all';
  const cat = $('#idiomCategoryFilter')?.value || 'all';
  let data = idiomData.filter(i => (use==='all' || i.use===use) && (cat==='all' || i.category===cat));
  if(q) data = data.filter(i => [i.phrase,i.meaning,i.use,i.category,i.example,i.academic_alt].join(' ').toLowerCase().includes(q));
  data = idiomOrdered(data);
  $('#idiomGrid').innerHTML = data.map(i => `<article class="idiom-card">
    <span class="use-badge ${idiomUseClass(i.use)}">${escapeHTML(i.use)}</span>
    <h4>${escapeHTML(i.phrase)}</h4>
    <p class="meaning">${escapeHTML(i.meaning)}</p>
    <p class="example"><b>Example:</b> ${escapeHTML(i.example)}</p>
    <p class="academic-alt"><b>Academic alternative:</b> ${escapeHTML(i.academic_alt)}</p>
    <div class="chip-row"><span class="chip">${escapeHTML(i.category)}</span>${i.use==='Avoid in writing' || i.use==='Writing caution' ? '<span class="chip">Writing: hati-hati</span>' : '<span class="chip">Speaking: natural kalau cocok</span>'}</div>
    <div class="idiom-actions"><button class="btn secondary" data-idiom-listen="${i.id}">🔊 Listen</button><button class="btn ghost" data-idiom-speaking="${i.id}">🎙️ Practice</button></div>
  </article>`).join('') || '<div class="empty-state">Idiom tidak ditemukan.</div>';
  $$('[data-idiom-listen]').forEach(b=>b.onclick=()=>{ const item=idiomById(b.dataset.idiomListen); if(item) speak(item.phrase); });
  $$('[data-idiom-speaking]').forEach(b=>b.onclick=()=>{ const item=idiomById(b.dataset.idiomSpeaking); if(!item) return; setView('speaking'); $('#targetPronounce').textContent=item.phrase; $('#targetMeaning').textContent=item.meaning; $('#pronounceResult').innerHTML=`Target idiom: <b>${escapeHTML(item.phrase)}</b><br>${escapeHTML(item.meaning)}<br>Klik <b>Listen</b>, tirukan, lalu klik <b>Speak Now</b>.`; });
}

function makeIdiomQuestion(){
  const item = pick(idiomData);
  const distractors = sample(idiomData.filter(x=>x.id!==item.id),3).map(x=>x.meaning);
  const options = shuffle([item.meaning, ...distractors]);
  return {type:'idiom', prompt:`What does the idiom “${item.phrase}” mean?`, options, answer:options.indexOf(item.meaning), ref:item.id, explain:`Use: ${item.use}. Academic alternative: ${item.academic_alt}. Example: ${item.example}`};
}

function renderVocab(){
  if(!state.vocab.length && ensureVocabLoaded()){
    populateFilters();
  }
  populateFilters(); const data = filteredVocab();
  if(!state.selected && data[0]) state.selected = data[0].slug;
  $('#wordList').innerHTML = data.slice(0,400).map(v=>`<button class="word-card ${state.selected===v.slug?'active':''}" data-word="${v.slug}"><div class="word-card-top"><h4>${escapeHTML(v.word)}</h4><span class="chip">${escapeHTML(v.level)}</span></div><p>${escapeHTML(v.meaning_id || v.definition_en || '-')}</p><div class="chip-row"><span class="chip">${escapeHTML(v.topic)}</span>${isDue(v)?'<span class="chip">due</span>':''}${v.interval_days>=21?'<span class="chip">mastered</span>':''}</div></button>`).join('') || (state.vocab.length ? '<div class="empty-state">Tidak ada kata yang cocok.<br><button class="btn secondary" id="resetVocabFiltersBtn">Reset filter</button></div>' : '<div class="empty-state">Vocabulary belum terbaca.<br>Pastikan file <b>data/vocab-5000.js</b> ada di folder website.<br><button class="btn secondary" id="reloadVocabBtn">Reload vocabulary</button></div>');
  $$('.word-card').forEach(b=>b.onclick=()=>{state.selected=b.dataset.word; renderVocab();});
  if($('#resetVocabFiltersBtn')) $('#resetVocabFiltersBtn').onclick=()=>{ $('#searchInput').value=''; $('#levelFilter').value='all'; $('#topicFilter').value='all'; renderVocab(); };
  if($('#reloadVocabBtn')) $('#reloadVocabBtn').onclick=async()=>{ await loadBuiltinDataFile(); ensureVocabLoaded(); renderAll(); };
  renderWordDetail();
}
function renderWordDetail(){
  const v = state.vocab.find(x=>x.slug===state.selected) || state.vocab[0];
  if(!v){ $('#wordDetail').innerHTML = '<div class="empty-state">Belum ada vocabulary.</div>'; return; }
  const isHard = (state.local.reviewTracker || {})[v.slug] !== undefined;
  const qualityNote = String(v.meaning_id || '').includes('perlu dicek') ? '<div class="notice"><b>Catatan:</b> arti Indonesia kartu ini belum lengkap. Klik Edit untuk memperbaiki versi pribadimu.</div>' : '';
  $('#wordDetail').innerHTML = `<p class="label">${escapeHTML(v.part_of_speech)} • ${escapeHTML(v.level)}</p><h2>${escapeHTML(v.word)}</h2><div class="chip-row"><span class="chip">Topic: ${escapeHTML(v.topic)}</span><span class="chip">Due: ${new Date(v.due_at).toLocaleDateString()}</span><span class="chip">Correct ${v.correct_count}</span><span class="chip">Wrong ${v.wrong_count}</span>${isHard?'<span class="chip">⭐ My Hard Words</span>':''}</div>${qualityNote}<div class="detail-grid"><div class="detail-box"><span>Arti Indonesia</span><b>${escapeHTML(v.meaning_id || '-')}</b></div><div class="detail-box"><span>Definition</span><b>${escapeHTML(v.definition_en || '-')}</b></div><div class="detail-box"><span>Upgrade from</span><b>${escapeHTML(v.upgrade_from || '-')}</b></div><div class="detail-box"><span>Synonym / Antonym</span><b>${escapeHTML(v.synonym || '-')} ${v.antonym?'/ '+escapeHTML(v.antonym):''}</b></div></div><p class="example">“${escapeHTML(v.example_en || 'Try to make your own sentence with this word.')}”</p><div class="center-actions"><button class="btn secondary" id="detailListen">🔊 Listen</button><button class="btn primary" id="detailReview">Review Now</button><button class="btn secondary" id="detailHard">${isHard?'⭐ Sudah di List':'⭐ Sulit Diingat'}</button><button class="btn ghost" id="detailEdit">Edit</button></div>`;
  $('#detailListen').onclick = () => speak(v.word);
  $('#detailReview').onclick=()=>{state.selected=v.slug;setView('flashcard');};
  $('#detailHard').onclick=()=>{ markHardWord(v.slug); renderWordDetail(); };
  $('#detailEdit').onclick=()=>openWordModal(v);
}
function speak(text){
  if(!('speechSynthesis' in window)){ toast('Browser belum support text-to-speech.', 'error'); return; }
  window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=.9; window.speechSynthesis.speak(u);
}
function chooseFlash(){
  const due = dueCards(); const chosen = state.vocab.find(v=>v.slug===state.selected && isDue(v)) || due[0] || state.vocab.find(v=>v.slug===state.selected) || state.vocab[0];
  state.flash = chosen || null;
}
function renderFlashcard(){
  chooseFlash(); const v = state.flash;
  $('#flashCounter').textContent = `${dueCards().length} due`;
  $('#flashAnswer').classList.add('hidden'); $('#reviewActions').classList.add('hidden');
  if(!v){ $('#flashWord').textContent='No card'; $('#flashHint').textContent='Tambah vocabulary dulu.'; return; }
  $('#flashMeta').textContent = `${v.level} • ${v.topic} • due ${new Date(v.due_at).toLocaleDateString()}`;
  $('#flashWord').textContent = v.word; $('#flashHint').textContent = v.upgrade_from ? `Upgrade dari: ${v.upgrade_from}` : 'Coba tebak arti dan buat contoh kalimat sebelum lihat jawaban.';
  $('#flashAnswer').innerHTML = `<p><b>Meaning:</b> ${escapeHTML(v.meaning_id || '-')}</p><p><b>Definition:</b> ${escapeHTML(v.definition_en || '-')}</p><p><b>Example:</b> ${escapeHTML(v.example_en || '-')}</p><p><b>Synonym:</b> ${escapeHTML(v.synonym || '-')}</p>`;
}
async function reviewFlash(grade){
  const v = state.flash; if(!v) return;
  const nv = {...v}; nv.last_reviewed_at = nowISO(); nv.repetitions = (nv.repetitions||0)+1;
  if(grade===0){ nv.interval_days = 0; nv.lapses=(nv.lapses||0)+1; nv.wrong_count=(nv.wrong_count||0)+1; nv.ease=Math.max(1.3,(nv.ease||2.5)-.25); nv.due_at=daysFromNow(0); }
  if(grade===1){ nv.interval_days = Math.max(1, Math.ceil((nv.interval_days||1)*1.1)); nv.wrong_count=(nv.wrong_count||0)+1; nv.ease=Math.max(1.3,(nv.ease||2.5)-.1); nv.due_at=daysFromNow(1); }
  if(grade===2){ nv.interval_days = nv.interval_days ? Math.ceil(nv.interval_days*(nv.ease||2.5)) : 2; nv.correct_count=(nv.correct_count||0)+1; nv.due_at=daysFromNow(nv.interval_days); }
  if(grade===3){ nv.interval_days = nv.interval_days ? Math.ceil(nv.interval_days*(nv.ease||2.5)*1.5) : 4; nv.correct_count=(nv.correct_count||0)+1; nv.ease=(nv.ease||2.5)+.15; nv.due_at=daysFromNow(nv.interval_days); }
  nv.mastered = nv.interval_days >= 21; await saveVocab(nv); await recordActivity('flashcard', 1); state.selected = null; toast('Review saved. Jadwal kartu berikutnya sudah diupdate.', 'success'); renderAll();
}
function makeVocabMeaningQuestion(){
  const pool = state.vocab.filter(v=>v.meaning_id && v.word); const v = pick(pool); const distractors = sample(pool.filter(x=>x.slug!==v.slug && x.meaning_id),3).map(x=>x.meaning_id);
  const options = shuffle([v.meaning_id, ...distractors]); return {type:'vocab', prompt:`What does “${v.word}” mean?`, options, answer:options.indexOf(v.meaning_id), ref:v.slug, explain:v.example_en};
}
function makeVocabExampleQuestion(){
  const pool = state.vocab.filter(v=>v.example_en && v.word && v.example_en.toLowerCase().includes(v.word.split(' ')[0].toLowerCase())); const v = pick(pool.length?pool:state.vocab);
  const key = v.word.split(' ')[0]; const prompt = (v.example_en||`Use ${v.word} in a sentence.`).replace(new RegExp(key,'i'),'_____');
  const distractors = sample(state.vocab.filter(x=>x.slug!==v.slug),3).map(x=>x.word); const options = shuffle([v.word, ...distractors]); return {type:'vocab-example', prompt:`Fill the blank: ${prompt}`, options, answer:options.indexOf(v.word), ref:v.slug, explain:v.meaning_id};
}

const grammarFillBank = {
  'past-tenses': [
    {kind:'fill', prompt:'Fill the blank: I ___ TV when my mom called. (watch)', accept:['was watching'], explain:'Use past continuous for an action in progress interrupted by another past action.'},
    {kind:'fill', prompt:'Fill the blank: She ___ dinner while I was studying. (cook)', accept:['was cooking'], explain:'While + past continuous describes two actions happening at the same time.'},
    {kind:'fill', prompt:'Fill the blank: The figure ___ sharply in 2015. (increase)', accept:['increased'], explain:'Use past simple for a completed event in a past year.'},
    {kind:'fill', prompt:'Fill the blank: By the time the teacher arrived, we ___ the exercise. (finish)', accept:['had finished'], explain:'Past perfect shows the earlier past action.'},
    {kind:'fill', prompt:'Fill the blank: The room ___ cleaned before the guests arrived. (be)', accept:['had been'], explain:'Past perfect passive: had been + V3.'}
  ],
  'present-perfect': [
    {kind:'fill', prompt:'Fill the blank: I ___ English for two hours. (study)', accept:['have studied'], explain:'Use present perfect with for + duration.'},
    {kind:'fill', prompt:'Fill the blank: She ___ here since 2021. (live)', accept:['has lived'], explain:'Use has/have + V3 with since + starting point.'},
    {kind:'fill', prompt:'Fill the blank: Online learning ___ more common. (become)', accept:['has become'], explain:'Present perfect shows a change up to now.'},
    {kind:'fill', prompt:'Fill the blank: They ___ the project yet. (not finish)', accept:['have not finished',"haven't finished"], explain:'Use have/has not + V3 for negative present perfect.'},
    {kind:'fill', prompt:'Fill the blank: ___ you ever ___ abroad? (study)', accept:['have studied','have you studied'], explain:'Question form: Have/Has + subject + V3?'}
  ],
  'passive': [
    {kind:'fill', prompt:'Fill the blank: The data ___ collected in 2020. (be)', accept:['were'], explain:'Past passive: was/were + V3.'},
    {kind:'fill', prompt:'Fill the blank: The room ___ being cleaned now. (be)', accept:['is'], explain:'Present continuous passive: is/am/are being + V3.'},
    {kind:'fill', prompt:'Fill the blank: More funding should ___ provided. (be)', accept:['be'], explain:'Modal passive: modal + be + V3.'},
    {kind:'fill', prompt:'Fill the blank: The policy has ___ implemented nationwide. (be)', accept:['been'], explain:'Present perfect passive: has/have been + V3.'},
    {kind:'fill', prompt:'Fill the blank: Coffee ___ produced in many countries. (be)', accept:['is'], explain:'Present passive for general facts: is/are + V3.'}
  ],
  'conditionals': [
    {kind:'fill', prompt:'Fill the blank: If students practise daily, they ___ improve faster. (will)', accept:['will'], explain:'First conditional: if + present, will + verb.'},
    {kind:'fill', prompt:'Fill the blank: If public transport were cheaper, more people ___ use it. (would)', accept:['would'], explain:'Second conditional: if + past, would + verb.'},
    {kind:'fill', prompt:'Fill the blank: If people exercise regularly, they ___ healthier. (stay)', accept:['stay'], explain:'Zero conditional for general truths.'},
    {kind:'fill', prompt:'Fill the blank: If I had more time, I ___ more essays. (write)', accept:['would write'], explain:'Second conditional for imaginary situations.'},
    {kind:'fill', prompt:'Fill the blank: If governments invest more, pollution ___ decrease. (will)', accept:['will'], explain:'Use will in the result clause for real future possibility.'}
  ],
  'articles': [
    {kind:'fill', prompt:'Fill the blank: She bought ___ laptop yesterday.', accept:['a'], explain:'Use a before singular countable nouns when mentioned for the first time.'},
    {kind:'fill', prompt:'Fill the blank: He is ___ honest student.', accept:['an'], explain:'Use an before vowel sounds; honest starts with a vowel sound.'},
    {kind:'fill', prompt:'Fill the blank: ___ sun rises in the east.', accept:['the'], explain:'Use the for unique things such as the sun.'},
    {kind:'fill', prompt:'Fill the blank: ___ education is important for society. (general idea)', accept:['', 'no article', 'zero article'], explain:'Use zero article for abstract nouns in general statements.'},
    {kind:'fill', prompt:'Fill the blank: I saw ___ elephant at the zoo.', accept:['an'], explain:'Use an before a vowel sound.'}
  ],
  'prepositions': [
    {kind:'fill', prompt:'Fill the blank: I studied ___ two hours.', accept:['for'], explain:'Use for + duration.'},
    {kind:'fill', prompt:'Fill the blank: I have lived here ___ 2021.', accept:['since'], explain:'Use since + starting point.'},
    {kind:'fill', prompt:'Fill the blank: The meeting starts ___ 8 p.m.', accept:['at'], explain:'Use at for exact time.'},
    {kind:'fill', prompt:'Fill the blank: Please submit it ___ Friday.', accept:['by'], explain:'By means no later than the deadline.'},
    {kind:'fill', prompt:'Fill the blank: The figure increased ___ 20%.', accept:['by'], explain:'Increase by = amount of change.'}
  ],
  'subject-verb': [
    {kind:'fill', prompt:'Fill the blank: Many students ___ online learning. (prefer)', accept:['prefer'], explain:'Plural subject uses base verb.'},
    {kind:'fill', prompt:'Fill the blank: The number of students ___ increasing. (be)', accept:['is'], explain:'The number is singular.'},
    {kind:'fill', prompt:'Fill the blank: Each student ___ a different goal. (have)', accept:['has'], explain:'Each is singular.'},
    {kind:'fill', prompt:'Fill the blank: Education ___ important. (be)', accept:['is'], explain:'Education is singular/uncountable.'},
    {kind:'fill', prompt:'Fill the blank: People ___ technology every day. (use)', accept:['use'], explain:'People is plural.'}
  ],
  'count-uncount': [
    {kind:'fill', prompt:'Fill the blank: I need some ___. (information/informations)', accept:['information'], explain:'Information is uncountable.'},
    {kind:'fill', prompt:'Fill the blank: She gave me a piece of ___. (advice/advices)', accept:['advice'], explain:'Advice is uncountable; use a piece of advice.'},
    {kind:'fill', prompt:'Fill the blank: The school bought new ___. (equipment/equipments)', accept:['equipment'], explain:'Equipment is uncountable.'},
    {kind:'fill', prompt:'Fill the blank: There is a lot of ___. (evidence/evidences)', accept:['evidence'], explain:'Evidence is usually uncountable.'},
    {kind:'fill', prompt:'Fill the blank: He made several ___. (suggestion/suggestions)', accept:['suggestions'], explain:'Suggestion is countable.'}
  ],
  'modals': [
    {kind:'fill', prompt:'Fill the blank: Governments ___ invest more in education. (should)', accept:['should'], explain:'Should gives advice/recommendation.'},
    {kind:'fill', prompt:'Fill the blank: This policy ___ reduce pollution. (may)', accept:['may'], explain:'May shows possibility.'},
    {kind:'fill', prompt:'Fill the blank: Students ___ not rely only on memorisation. (should)', accept:['should'], explain:'Negative modal: should not + verb.'},
    {kind:'fill', prompt:'Fill the blank: Technology ___ improve access to information. (can)', accept:['can'], explain:'Can shows ability/possibility.'},
    {kind:'fill', prompt:'Fill the blank: We ___ consider the long-term effects. (must)', accept:['must'], explain:'Must shows strong necessity.'}
  ],
  'future': [
    {kind:'fill', prompt:'Fill the blank: The exam ___ start at 9 a.m. (will)', accept:['will'], explain:'Will + base verb.'},
    {kind:'fill', prompt:'Fill the blank: I am ___ to take a mock test tomorrow. (go)', accept:['going'], explain:'Be going to for plans.'},
    {kind:'fill', prompt:'Fill the blank: The population ___ likely to increase. (be)', accept:['is'], explain:'Is likely to + verb.'},
    {kind:'fill', prompt:'Fill the blank: They ___ meeting the teacher tomorrow. (be)', accept:['are'], explain:'Present continuous for fixed arrangements.'},
    {kind:'fill', prompt:'Fill the blank: This trend ___ continue in the future. (may)', accept:['may'], explain:'May shows future possibility.'}
  ]
};
function makeGrammarMatchQuestions(id){
  const f = grammarFormulaFor(id);
  const pool = [
    {left:'Positive (+) formula', answer:(f.positive||[])[0] || 'Subject + Verb'},
    {left:'Negative (-) formula', answer:(f.negative||[])[0] || 'Subject + do/does not + Verb'},
    {left:'Question (?) formula', answer:(f.question||[])[0] || 'Auxiliary + Subject + Verb?'},
    {left:'When to use', answer:f.when || 'Use depends on context'},
    {left:'IELTS-style example', answer:(f.ielts||[])[0] || (f.daily||[])[0] || 'Use in a clear sentence.'}
  ].filter(x=>x.answer);
  const options = shuffle(pool.map(x=>x.answer));
  return pool.map((x,i)=>({kind:'match', prompt:`Match: ${x.left}`, options, answer:x.answer, explain:`Correct match for ${x.left}.`}));
}
function makeGrammarMCQSet(id,count=10){
  const g = grammarLessons.find(x=>x.id===id);
  const base = grammarQuestionsFor(id).map(q=>({...q, lesson:id, title:g?.title || id}));
  const out=[];
  for(let i=0;i<count;i++) out.push(shuffleQuestionOptions(base[i % base.length] || pick(grammarAllQuestions())));
  return out.map(q=>({...q, kind:'mcq', type:'grammar', prompt:`[${g?.title || 'Grammar'}] ${q.q}`, explain:q.explain || g?.title || 'Grammar rule'}));
}
function makeGrammarPack(id='past-tenses'){
  const mcq = makeGrammarMCQSet(id,10);
  const fill = (grammarFillBank[id] || []).slice(0,5).map(q=>({...q,type:'grammar-fill'}));
  const match = makeGrammarMatchQuestions(id).slice(0,5).map(q=>({...q,type:'grammar-match'}));
  const filler = makeGrammarMCQSet(id, Math.max(0, 20 - mcq.length - fill.length - match.length));
  return [...mcq, ...fill, ...match, ...filler].slice(0,20);
}
function makeGrammarIntensivePack(){
  const ids = shuffle(grammarLessons.map(g=>g.id));
  const qs=[];
  ids.slice(0,4).forEach(id=>qs.push(...makeGrammarPack(id).slice(0,5)));
  return qs.slice(0,20);
}
function normalizeTextAnswer(s=''){
  return String(s).toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ').trim().replace(/[.!?]$/,'');
}
function isQuestionCorrect(q, ans){
  if(q.kind==='fill'){
    const a = normalizeTextAnswer(ans);
    return (q.accept||[]).map(normalizeTextAnswer).includes(a);
  }
  if(q.kind==='match') return String(ans) === String(q.answer);
  return ans === q.answer;
}
function correctAnswerText(q){
  if(q.kind==='fill') return (q.accept||[])[0] || '';
  if(q.kind==='match') return q.answer;
  return q.options?.[q.answer] ?? '';
}

function makeGrammarQuestion(){ const q = shuffleQuestionOptions(pick(grammarAllQuestions())); return {...q, type:'grammar', prompt:q.q, explain:q.explain || q.title || 'Grammar rule'}; }
function makeReadingMiniQuestion(){ const p = pick(readingPassages); const q = pick(p.questions); return {type:'reading', prompt:`[${p.title}] ${q.q}`, options:shuffle(q.options), answer:null, raw:q, passage:p.id, explain:'Based on reading passage.'}; }
function normalizeGenerated(q){ if(q.answer===null && q.raw){ q.answer = q.options.indexOf(q.raw.options[q.raw.answer]); } return q; }

const testBandCatalog = [
  {id:'beginner', label:'Beginner Foundation', focus:'basic words, simple sentences, articles, and daily grammar', levelWords:['Beginner'], modules:['Word Meaning 1','Word Meaning 2','Articles Basics','Simple Sentences','Present Simple','Prepositions','Listening Easy','Reading Easy','Daily Conversation','Beginner Checkpoint']},
  {id:'natural', label:'Natural English', focus:'natural expressions, collocations, phrasal verbs, and conversation grammar', levelWords:['Natural','Beginner'], modules:['Natural Vocabulary 1','Natural Vocabulary 2','Daily Expressions','Collocations','Phrasal Verbs','Grammar in Context','Listening Conversation','Reading Context','Speaking Phrases','Natural Checkpoint']},
  {id:'advanced', label:'Advanced Builder', focus:'advanced vocabulary, accuracy, longer texts, and academic patterns', levelWords:['Advanced','Natural'], modules:['Advanced Vocab 1','Advanced Vocab 2','Academic Collocations','Complex Sentences','Cohesion','Listening Detail','Reading Inference','Writing Accuracy','Idioms Control','Advanced Checkpoint']},
  {id:'band5', label:'IELTS Band 5', focus:'foundation IELTS: clear basic grammar and common topic vocabulary', levelWords:['IELTS Band 5','Beginner','Natural'], modules:['Band 5 Vocab Set 1','Band 5 Vocab Set 2','Articles + Agreement','Basic Tenses','Common Errors','Listening Part 1','Reading Basics','Writing Sentence Control','Speaking Part 1','Band 5 Mock']},
  {id:'band6', label:'IELTS Band 6', focus:'stable tenses, passive, modals, essay structure, and task response', levelWords:['IELTS Band 6','Natural','Advanced'], modules:['Band 6 Vocab Set 1','Band 6 Vocab Set 2','Past + Present Perfect','Passive + Modals','Conditionals','Essay Structure','Listening Part 2','Reading Detail','Writing Task 2','Band 6 Mock']},
  {id:'band7', label:'IELTS Band 7', focus:'academic style, cohesion, complex sentences, and precise vocabulary', levelWords:['IELTS Band 7','Advanced'], modules:['Band 7 Vocab Set 1','Band 7 Vocab Set 2','Complex Grammar','Cohesion Devices','Hedging','Nominalisation','Listening Part 3','Reading Inference','Writing Development','Band 7 Mock']},
  {id:'band8', label:'IELTS Band 8–9', focus:'precision, nuance, advanced vocabulary, sentence control, and fewer small errors', levelWords:['IELTS Band 8–9','IELTS Band 7','Advanced'], modules:['Precision Vocab 1','Precision Vocab 2','Advanced Hedging','Nominalisation Mastery','Punctuation Control','Nuance + Register','Listening Part 4','Reading Nuance','Writing Band 8','Band 8–9 Mock']}
];
function testBandInfo(id){ return testBandCatalog.find(b=>b.id===id) || testBandCatalog[0]; }
function moduleIdFor(bandId, index){ return `${bandId}-module-${String(index+1).padStart(2,'0')}`; }
function testModulesFor(bandId){ const b=testBandInfo(bandId); return b.modules.map((title,i)=>({id:moduleIdFor(b.id,i), band:b.id, index:i+1, title, skill:moduleSkillFromTitle(title), description:moduleDescription(b,title)})); }
function moduleSkillFromTitle(title){ const t=title.toLowerCase(); if(t.includes('vocab')) return 'vocabulary'; if(t.includes('grammar')||t.includes('tense')||t.includes('passive')||t.includes('modal')||t.includes('condition')||t.includes('sentence')||t.includes('punctuation')||t.includes('hedging')||t.includes('nominal')) return 'grammar'; if(t.includes('listening')) return 'listening'; if(t.includes('reading')) return 'reading'; if(t.includes('writing')) return 'writing'; if(t.includes('speaking')||t.includes('expression')||t.includes('idiom')) return 'speaking'; return 'mixed'; }
function moduleDescription(b,title){ return `${b.label}: ${title}. Focus: ${b.focus}.`; }
function completedModule(moduleId){ return state.moduleProgress && state.moduleProgress[moduleId]; }
function updateTestModuleSelect(){
  const bandId=$('#testBand')?.value || 'band5'; const modules=testModulesFor(bandId); const sel=$('#testModule'); if(!sel) return;
  const old=sel.value; sel.innerHTML = modules.map(m=>`<option value="${m.id}">${m.index}. ${escapeHTML(m.title)} ${completedModule(m.id)?'✅':''}</option>`).join('');
  sel.value = modules.some(m=>m.id===old) ? old : (modules.find(m=>!completedModule(m.id))?.id || modules[0]?.id || '');
  renderTestModuleGrid();
}
function renderTestModuleGrid(){
  const bandId=$('#testBand')?.value || 'band5'; const modules=testModulesFor(bandId); const active=$('#testModule')?.value; const info=testBandInfo(bandId);
  if($('#testLevelInfo')) $('#testLevelInfo').innerHTML = `<b>${escapeHTML(info.label)}</b><br>${escapeHTML(info.focus)}<br><small>Module akan berurutan. Yang sudah selesai diberi centang dan score tersimpan ke akun.</small>`;
  const grid=$('#testModuleGrid'); if(!grid) return;
  grid.innerHTML = modules.map(m=>{ const p=completedModule(m.id); return `<button class="module-card ${active===m.id?'active':''}" data-module-pick="${m.id}"><span class="chip">Module ${m.index}</span><span class="chip">${escapeHTML(m.skill)}</span><h4>${p?'✅ ':''}${escapeHTML(m.title)}</h4><p>${escapeHTML(m.description)}</p>${p?`<span class="module-score">Best ${p.best_score ?? p.score_percent ?? 0}%</span>`:'<span class="module-score">New</span>'}</button>`; }).join('');
  $$('[data-module-pick]').forEach(b=>b.onclick=()=>{ $('#testModule').value=b.dataset.modulePick; renderTestModuleGrid(); });
}
function bandVocabPool(bandId){ const b=testBandInfo(bandId); let pool=state.vocab.filter(v=>b.levelWords.includes(v.level)); if(pool.length<20) pool=state.vocab.filter(v=>String(v.level).toLowerCase().includes(bandId.replace('band','band ')) || b.levelWords.some(l=>String(v.level).includes(l))); if(pool.length<20) pool=state.vocab; return pool; }
function makeVocabMeaningQuestionFromPool(pool){ const v=pick(pool.filter(x=>x.meaning_id) || pool); const distractors=sample(pool.filter(x=>x.slug!==v.slug && x.meaning_id),3).map(x=>x.meaning_id); const options=shuffle([v.meaning_id,...distractors]); return {kind:'mcq',type:'vocabulary',prompt:`What does “${v.word}” mean?`,options,answer:options.indexOf(v.meaning_id),ref:v.slug,explain:v.example_en||v.definition_en||v.meaning_id}; }
function makeVocabExampleQuestionFromPool(pool){ const candidates=pool.filter(v=>v.example_en&&v.word); const v=pick(candidates.length?candidates:pool); const key=(v.word||'').split(' ')[0]; const prompt=(v.example_en||`I want to use ${v.word} correctly.`).replace(new RegExp(key,'i'),'_____'); const distractors=sample(pool.filter(x=>x.slug!==v.slug),3).map(x=>x.word); const options=shuffle([v.word,...distractors]); return {kind:'mcq',type:'vocab-example',prompt:`Fill the blank: ${prompt}`,options,answer:options.indexOf(v.word),ref:v.slug,explain:v.meaning_id||v.definition_en}; }
function grammarIdsForBand(bandId){ if(bandId==='beginner') return ['articles','subject-verb','present-simple-continuous','prepositions','count-uncount','common-errors']; if(bandId==='natural') return ['present-simple-continuous','past-tenses','present-perfect','relative-clauses','comparatives','common-errors']; if(bandId==='advanced') return ['complex-sentences','passive','conditionals','noun-phrases','cohesion','lexical-resource']; const levelMap={band5:'band5',band6:'band6',band7:'band7',band8:'band8'}; return testBandInfo(bandId).id ? (bandLevels.find(b=>b.id===levelMap[bandId])?.lessons || grammarLessons.map(g=>g.id)) : grammarLessons.map(g=>g.id); }
function makeBandGrammarQuestion(bandId){ const ids=grammarIdsForBand(bandId); const id=pick(ids); const qs=grammarQuestionsFor(id); if(qs.length){ const q=shuffleQuestionOptions(pick(qs)); return {...q,kind:'mcq',type:'grammar',prompt:`[${grammarLessons.find(g=>g.id===id)?.title||id}] ${q.q}`,explain:q.explain||'Grammar rule'}; } return makeGrammarQuestion(); }
function makeBandFillQuestion(bandId){ const ids=grammarIdsForBand(bandId).filter(id=>grammarFillBank[id]); const id=ids.length?pick(ids):'past-tenses'; const q=pick(grammarFillBank[id]||grammarFillBank['past-tenses']); return {...q,type:'grammar-fill'}; }
function makeSkillQuestion(skill, bandId){ const pool=bandVocabPool(bandId); if(skill==='vocabulary') return pick([()=>makeVocabMeaningQuestionFromPool(pool),()=>makeVocabExampleQuestionFromPool(pool)])(); if(skill==='grammar') return pick([()=>makeBandGrammarQuestion(bandId),()=>makeBandFillQuestion(bandId)])(); if(skill==='listening') return makeListeningQuestion(); if(skill==='reading') return makeReadingMiniQuestion(); if(skill==='speaking') return Math.random()<.5?makeIdiomQuestion():makeVocabMeaningQuestionFromPool(pool); if(skill==='writing') return makeBandGrammarQuestion(bandId); return pick([()=>makeVocabMeaningQuestionFromPool(pool),()=>makeVocabExampleQuestionFromPool(pool),()=>makeBandGrammarQuestion(bandId),()=>makeBandFillQuestion(bandId),makeIdiomQuestion,makeListeningQuestion,makeReadingMiniQuestion])(); }
function questionSignature(q){
  const ans = correctAnswerText ? correctAnswerText(q) : (q.answer ?? '');
  return `${q.type||''}|${q.kind||'mcq'}|${String(q.prompt||'').slice(0,140)}|${String(ans).slice(0,80)}`.toLowerCase();
}
function seenQuestionSet(scope){
  const set = new Set(Object.keys(state.local.attemptedQuestions || {}).filter(k=>k.startsWith(scope+'::')).map(k=>k.split('::').slice(1).join('::')));
  (state.quizResults || []).forEach(r=>{
    const d = r.details || {};
    if(d.band_level===scope || d.module_id===scope || (d.question_sigs_scope===scope)) (d.question_sigs||[]).forEach(sig=>set.add(sig));
  });
  return set;
}
function rememberQuestions(scope, questions){
  state.local.attemptedQuestions = state.local.attemptedQuestions || {};
  questions.map(questionSignature).forEach(sig=>state.local.attemptedQuestions[`${scope}::${sig}`]=nowISO());
  saveLocal();
}
function makeUniqueSkillQuestion(skill, bandId, seen){
  let q=null, sig='';
  for(let tries=0; tries<45; tries++){
    q = makeSkillQuestion(skill, bandId); sig = questionSignature(q);
    if(!seen.has(sig)){ seen.add(sig); return q; }
  }
  seen.add(sig); return q;
}
function generateModuleTest(bandId,moduleId,n=15){
  const modules=testModulesFor(bandId); const m=modules.find(x=>x.id===moduleId)||modules[0];
  const seen = seenQuestionSet(moduleId || bandId);
  if(m.skill==='mixed'||m.title.toLowerCase().includes('mock')||m.title.toLowerCase().includes('checkpoint')||m.title.toLowerCase().includes('final')){
    return Array.from({length:n},()=>makeUniqueSkillQuestion(pick(['vocabulary','grammar','listening','reading','speaking','writing']),bandId,seen)).map(normalizeGenerated);
  }
  const qs=[]; for(let i=0;i<n;i++){ qs.push(makeUniqueSkillQuestion(m.skill,bandId,seen)); }
  return qs.map(normalizeGenerated);
}
function renderProgressAnalytics(){
  const scores=[...state.quizResults,...state.readingResults].map(r=>({...r,created_at:r.created_at||nowISO()})).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  const modules=Object.values(state.moduleProgress||{}); const hardCount=Object.keys(state.local.reviewTracker||{}).length; const streak=refreshStreakCache(); const avg=scores.length?Math.round(scores.reduce((a,b)=>a+Number(b.score_percent||0),0)/scores.length):0;
  const skillNames=['vocabulary','grammar','listening','reading','writing','speaking','mixed'];
  const skillStats=Object.fromEntries(skillNames.map(s=>[s,{sum:0,count:0}]));
  scores.forEach(r=>{ const d=r.details||{}; const skill=d.skill||d.module_skill||String(r.quiz_type||'mixed').split('-')[0]||'mixed'; const k=skillStats[skill]?skill:'mixed'; skillStats[k].sum+=Number(r.score_percent||0); skillStats[k].count++; });
  if($('#analyticsGrid')) $('#analyticsGrid').innerHTML = `
    <div class="analytics-card"><h4>Completed Modules</h4><div class="analytics-number">${modules.length}</div><p class="soft">Module yang sudah kamu kerjakan.</p></div>
    <div class="analytics-card"><h4>Average Score</h4><div class="analytics-number">${avg}%</div><p class="soft">Rata-rata quiz + reading.</p></div>
    <div class="analytics-card"><h4>Current Streak</h4><div class="analytics-number">${streak.current}🔥</div><p class="soft">Hari belajar beruntun.</p></div>
    <div class="analytics-card"><h4>Hard Words</h4><div class="analytics-number">${hardCount}</div><p class="soft">Kata yang perlu diulang khusus.</p></div>
    <div class="analytics-card" style="grid-column:1/-1"><h4>Skill Progress</h4><div class="mini-bars">${skillNames.map(s=>{ const st=skillStats[s]; const val=st.count?Math.round(st.sum/st.count):0; return `<div class="mini-bar-row"><span>${escapeHTML(s)}</span><div class="mini-bar"><span style="width:${val}%"></span></div><b>${val}%</b></div>`; }).join('')}</div></div>`;
  if($('#moduleProgressTag')) $('#moduleProgressTag').textContent = `${modules.length} done`;
  if($('#moduleProgressList')) $('#moduleProgressList').innerHTML = modules.length ? modules.map(m=>`<div class="module-progress-item"><div><b>✅ ${escapeHTML(m.module_title||m.module_id)}</b><br><small>${escapeHTML(m.band_level||'')} • ${escapeHTML(m.skill||'module')}</small></div><strong>${m.best_score ?? m.score_percent ?? 0}%</strong></div>`).join('') : '<div class="empty-state">Belum ada module selesai. Mulai dari Test Bank dulu.</div>';
  if($('#scoreTrendChart')) $('#scoreTrendChart').innerHTML = scores.slice(0,12).map(r=>`<div class="score-bar"><small>${new Date(r.created_at).toLocaleDateString()}</small><div class="score-bar-track"><span style="width:${Number(r.score_percent||0)}%"></span></div><b>${r.score_percent||0}%</b></div>`).join('') || '<div class="empty-state">Belum ada score.</div>';
}
async function saveModuleProgress(details, scorePercent){
  if(!details?.module_id) return;
  const old=state.moduleProgress[details.module_id] || {};
  const best=Math.max(Number(old.best_score||0), scorePercent);
  const row={student_key:STUDENT_KEY,module_id:details.module_id,band_level:details.band_level||'',module_title:details.module_title||details.module_id,skill:details.skill||'',score_percent:scorePercent,best_score:best,attempts:Number(old.attempts||0)+1,completed:scorePercent>=60,updated_at:nowISO()};
  state.moduleProgress[details.module_id]=row; state.local.moduleProgress=state.moduleProgress; saveLocal();
  if(state.cloudReady){ try{ await state.client.from('ielts_module_progress').upsert(row,{onConflict:'student_key,module_id'}); }catch(e){ console.warn('module progress cloud skipped',e.message||e); } }
}
function generateTest(type,n,bandId=null,moduleId=null){
  const qs=[];
  bandId = bandId || ($('#testBand')?.value || 'band5');
  if(type==='module'){
    return generateModuleTest(bandId,moduleId || $('#testModule')?.value, n);
  }
  if(type && type.startsWith('grammar-pack:')){
    return makeGrammarPack(type.split(':')[1] || 'past-tenses').map(normalizeGenerated);
  }
  if(type==='grammar-intensive'){
    const ids=grammarIdsForBand(bandId);
    const out=[]; ids.slice(0,4).forEach(id=>out.push(...makeGrammarPack(id).slice(0,5)));
    return (out.length?out:makeGrammarIntensivePack()).slice(0,n).map(normalizeGenerated);
  }
  if(type==='grammar'){
    for(let i=0;i<n;i++) qs.push(makeBandGrammarQuestion(bandId));
    return qs.map(normalizeGenerated);
  }
  if(type==='idiom-meaning'){
    for(let i=0;i<n;i++) qs.push(makeIdiomQuestion());
    return qs.map(normalizeGenerated);
  }
  if(type==='listening-mini'){
    for(let i=0;i<n;i++) qs.push(makeListeningQuestion());
    return qs.map(normalizeGenerated);
  }
  const pool=bandVocabPool(bandId);
  for(let i=0;i<n;i++){
    if(type==='vocab-meaning') qs.push(makeVocabMeaningQuestionFromPool(pool));
    else if(type==='vocab-example') qs.push(makeVocabExampleQuestionFromPool(pool));
    else if(type==='reading-mini') qs.push(makeReadingMiniQuestion());
    else qs.push(makeSkillQuestion(pick(['vocabulary','grammar','listening','reading','speaking','writing']),bandId));
  }
  return qs.map(normalizeGenerated);
}
function renderQuestionInput(q,i,t){
  if(q.kind==='fill'){
    return `<input class="input test-fill" data-fill-q="${i}" placeholder="Type your answer..." value="${escapeHTML(t.answers[i] || '')}" />`;
  }
  if(q.kind==='match'){
    const opts = q.options || [];
    return `<select class="input test-match" data-match-q="${i}"><option value="">Choose the match...</option>${opts.map(o=>`<option value="${escapeHTML(o)}" ${t.answers[i]===o?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select>`;
  }
  return q.options.map((o,j)=>`<button class="option ${t.answers[i]===j?'selected':''}" data-q="${i}" data-o="${j}">${escapeHTML(o)}</button>`).join('');
}
function renderTest(){
  if(!state.currentTest){ $('#testArea').className='test-area empty-state'; $('#testArea').textContent='Pilih jenis test lalu klik Start Test.'; $('#testProgressBar').style.width='0%'; return; }
  const t = state.currentTest; $('#testArea').className='test-area'; const answered = t.answers.filter(x=>x!==undefined && x!=='').length; $('#testProgressBar').style.width = `${answered/t.questions.length*100}%`;
  $('#testArea').innerHTML = t.questions.map((q,i)=>`<div class="question-card ${q.kind==='fill'?'fill-card':q.kind==='match'?'match-card':''}"><div class="chip-row"><span class="chip">${escapeHTML(q.kind || 'mcq')}</span>${q.type?`<span class="chip">${escapeHTML(q.type)}</span>`:''}</div><h4>${i+1}. ${escapeHTML(q.prompt)}</h4>${renderQuestionInput(q,i,t)}</div>`).join('') + `<div class="center-actions"><button class="btn primary" id="finishTestBtn">Finish & Save Score</button><button class="btn ghost" id="cancelTestBtn">Cancel</button></div>`;
  $$('.option').forEach(b=>b.onclick=()=>{ t.answers[Number(b.dataset.q)] = Number(b.dataset.o); renderTest(); });
  $$('.test-fill').forEach(inp=>inp.oninput=()=>{ t.answers[Number(inp.dataset.fillQ)] = inp.value; $('#testProgressBar').style.width = `${t.answers.filter(x=>x!==undefined && x!=='').length/t.questions.length*100}%`; });
  $$('.test-match').forEach(sel=>sel.onchange=()=>{ t.answers[Number(sel.dataset.matchQ)] = sel.value; renderTest(); });
  $('#finishTestBtn').onclick = finishTest; $('#cancelTestBtn').onclick=()=>{state.currentTest=null;renderTest();};
}
async function finishTest(){
  const t = state.currentTest; if(!t) return; if(t.answers.some(x=>x===undefined || x==='')){ if(!confirm('Masih ada soal kosong. Tetap selesai?')) return; }
  let correct=0; t.questions.forEach((q,i)=>{ if(isQuestionCorrect(q,t.answers[i])) correct++; }); const qSigs=t.questions.map(questionSignature); if(t.moduleId) rememberQuestions(t.moduleId,t.questions); rememberQuestions(t.bandId||'general',t.questions); await saveQuizResult(t.type,t.questions.length,correct,{answers:t.answers, band_level:t.bandId||'', module_id:t.moduleId||'', module_title:t.moduleTitle||'', skill:t.moduleSkill||'', question_sigs:qSigs, question_sigs_scope:t.moduleId||t.bandId||'general'});
  const percent = Math.round(correct/t.questions.length*100);
  $('#testArea').innerHTML = `<div class="score-card"><h3>${percent}% ${percent>=80?'✅':'📌'}</h3><p>Benar ${correct} dari ${t.questions.length}. Nilai ini sudah disimpan.</p><button class="btn primary" id="reviewAnswersBtn">Review Answers</button><button class="btn secondary" id="newTestAgainBtn">New Test</button></div>`;
  $('#reviewAnswersBtn').onclick=()=>showAnswerReview(t,correct); $('#newTestAgainBtn').onclick=()=>{$('#startTestBtn').click();}; state.currentTest=null; renderStats();
}
function showAnswerReview(t){
  $('#testArea').innerHTML = t.questions.map((q,i)=>{
    const ok = isQuestionCorrect(q,t.answers[i]);
    if(q.kind==='fill' || q.kind==='match'){
      return `<div class="question-card"><h4>${i+1}. ${escapeHTML(q.prompt)}</h4><p><b>Your answer:</b> <span class="${ok?'answer-ok':'answer-bad'}">${escapeHTML(t.answers[i] || '-')}</span></p><p><b>Correct answer:</b> ${escapeHTML(correctAnswerText(q))}</p><p class="soft"><b>Explanation:</b> ${escapeHTML(q.explain || '')}</p></div>`;
    }
    return `<div class="question-card"><h4>${i+1}. ${escapeHTML(q.prompt)}</h4>${q.options.map((o,j)=>`<div class="option ${j===q.answer?'correct':''} ${t.answers[i]===j && j!==q.answer?'wrong':''}">${escapeHTML(o)}</div>`).join('')}<p class="soft"><b>Explanation:</b> ${escapeHTML(q.explain || '')}</p></div>`;
  }).join('') + '<button class="btn primary" id="anotherTestBtn">Start Another Test</button>';
  $('#anotherTestBtn').onclick=()=>$('#startTestBtn').click();
}
function renderHistory(){
  const rows = state.quizResults.slice(0,30); $('#testArea').className='test-area'; $('#testProgressBar').style.width='0%';
  $('#testArea').innerHTML = rows.length ? rows.map(r=>`<div class="history-item"><div><b>✅ ${escapeHTML(r.details?.module_title || r.quiz_type)}</b><br><small>${new Date(r.created_at).toLocaleString()} ${r.details?.band_level?'• '+escapeHTML(r.details.band_level):''}</small></div><strong>${r.score_percent}%</strong></div>`).join('') : '<div class="empty-state">Belum ada riwayat test.</div>';
}

const grammarFormulaBank = {
  'articles': {
    when:'Dipakai saat kamu menyebut benda/orang/ide: apakah satu benda baru (a/an), benda spesifik (the), atau ide umum tanpa article.',
    positive:['a/an + singular countable noun: I bought a laptop.','the + specific noun: The laptop I bought is fast.','zero article + general plural/abstract noun: Education is important.'],
    negative:['Tidak semua noun butuh the: Education is important, bukan The education is important.','Jangan hilangkan a/an pada singular countable noun: I bought a laptop, bukan I bought laptop.'],
    question:['What is the problem?','Is it a useful idea?','Do people need education?'],
    daily:['I saw an elephant yesterday.','The sun is very hot today.'],
    ielts:['A strong education system can reduce inequality.','The chart shows a significant rise in online shopping.']
  },
  'prepositions': {
    when:'Dipakai untuk waktu, tempat, durasi, deadline, perubahan angka, dan collocation. Preposition kecil tapi sering menurunkan akurasi IELTS.',
    positive:['in + month/year/place: in 2026, in Indonesia','on + day/date/surface: on Monday, on the table','at + exact time/point: at 8 p.m., at school','for + duration: for two hours','since + starting point: since 2021','by + deadline: by Friday'],
    negative:['Jangan pakai until untuk deadline tugas: Submit it by Friday.','Discuss tidak butuh about: discuss the issue.'],
    question:['When is the deadline? It is by Friday.','How long did you study? For two hours.','Since when have you lived here? Since 2021.'],
    daily:['I studied for two hours.','Please submit your homework by Friday.'],
    ielts:['The figure increased by 20% and reached 60% in 2020.','The proportion remained stable from 2010 to 2015.']
  },
  'present-simple-continuous': {
    when:'Present simple untuk fakta/kebiasaan; present continuous untuk aksi sedang berlangsung atau trend sementara.',
    positive:['Simple: Subject + V1/Vs: People use smartphones.','Continuous: Subject + am/is/are + V-ing: Technology is changing education.'],
    negative:['Simple: Subject + do/does not + V1: She does not study at night.','Continuous: Subject + am/is/are not + V-ing: They are not using books today.'],
    question:['Simple: Do/Does + Subject + V1? Do students use apps?','Continuous: Am/Is/Are + Subject + V-ing? Are students using apps now?'],
    daily:['I drink water every morning.','I am studying English right now.'],
    ielts:['The graph shows a steady increase.','More learners are using online platforms nowadays.']
  },
  'past-tenses': {
    when:'Past simple untuk kejadian selesai di masa lalu; past continuous untuk aksi yang sedang berlangsung di waktu lampau; past perfect untuk kejadian yang terjadi sebelum kejadian lampau lain.',
    positive:['Past simple (+): Subject + Verb 2: I studied yesterday.','Past continuous (+): Subject + was/were + V-ing: I was studying at 8 p.m.','Past perfect (+): Subject + had + V3: The figure had fallen before it recovered.'],
    negative:['Past simple (-): Subject + did not + Verb 1: I did not study yesterday.','Past continuous (-): Subject + was/were not + V-ing: She was not cooking.','Past perfect (-): Subject + had not + V3: The policy had not changed.'],
    question:['Past simple (?): Did + Subject + Verb 1? Did you study?','Past continuous (?): Was/Were + Subject + V-ing? Were you studying?','Past perfect (?): Had + Subject + V3? Had it changed?'],
    daily:['I was watching TV when my mom called me.','She cooked dinner last night.'],
    ielts:['The percentage rose sharply between 2000 and 2010.','Before the rate increased, it had remained stable for five years.']
  },
  'present-perfect': {
    when:'Dipakai untuk pengalaman, perubahan sampai sekarang, atau kejadian yang dimulai di masa lalu dan masih relevan sekarang.',
    positive:['Subject + have/has + V3: I have studied English.','since + titik awal: since 2021','for + durasi: for three years'],
    negative:['Subject + have/has not + V3: I have not finished it.','Jangan pakai since untuk durasi: for three hours, bukan since three hours.'],
    question:['Have/Has + Subject + V3? Have you finished?','How long have you studied English?'],
    daily:['I have lived here since 2021.','She has known her friend for years.'],
    ielts:['Online learning has become more common in recent years.','The number of users has increased significantly since 2015.']
  },
  'future': {
    when:'Will untuk prediksi/keputusan spontan; going to untuk rencana/bukti; present continuous untuk arrangement yang sudah fixed.',
    positive:['will + V1: The exam will start soon.','be going to + V1: I am going to study tonight.','am/is/are + V-ing for arrangement: I am taking a test tomorrow.'],
    negative:['will not + V1: It will not be easy.','am/is/are not going to + V1: I am not going to skip practice.'],
    question:['Will + Subject + V1? Will it help?','Be + Subject + going to + V1? Are you going to practise?'],
    daily:['I will call you later.','I am going to review vocabulary tonight.'],
    ielts:['This policy will reduce traffic congestion.','The government is going to invest in renewable energy.']
  },
  'passive': {
    when:'Dipakai saat pelaku tidak penting/ tidak diketahui, atau dalam Task 1 process dan academic writing.',
    positive:['Subject + be + V3: The data were collected.','Subject + modal + be + V3: More funding should be provided.','Subject + has/have been + V3: The policy has been implemented.'],
    negative:['Subject + be not + V3: The room was not cleaned.','Subject + has/have not been + V3: The plan has not been approved.'],
    question:['Be + Subject + V3? Was the data collected?','Has/Have + Subject + been + V3? Has the policy been implemented?'],
    daily:['The room is being cleaned now.','My bag was stolen yesterday.'],
    ielts:['The beans are roasted and then packaged.','More resources should be allocated to public schools.']
  },
  'modals': {
    when:'Dipakai untuk saran, kemungkinan, kewajiban, dan academic tone agar tidak terlalu mutlak.',
    positive:['Subject + modal + V1: Governments should invest.','may/might/could + V1: This may reduce pollution.'],
    negative:['Subject + modal not + V1: Students should not ignore grammar.','must not = larangan kuat.'],
    question:['Modal + Subject + V1? Should governments invest more?','Could this solution work?'],
    daily:['You should sleep earlier.','I can help you practise English.'],
    ielts:['Governments should provide better public transport.','This approach may improve access to education.']
  },
  'conditionals': {
    when:'Dipakai untuk sebab-akibat, solusi, dan kemungkinan dalam argumen.',
    positive:['Zero: If + present, present: If people exercise, they stay healthy.','First: If + present, will + V1: If cities invest, traffic will decrease.','Second: If + past, would + V1: If transport were cheaper, more people would use it.'],
    negative:['If + subject + do/does not + V1, ...','If cities did not invest, congestion would increase.'],
    question:['What will happen if people recycle more?','What would happen if public transport were free?'],
    daily:['If I have time, I will study tonight.','If I were you, I would practise speaking daily.'],
    ielts:['If governments improve public transport, air pollution will decrease.','If education were more affordable, more students would attend university.']
  },
  'relative-clauses': {
    when:'Dipakai untuk menambah informasi tentang orang, benda, tempat, atau ide tanpa membuat kalimat terpisah-pisah.',
    positive:['who + verb for people: Students who practise improve.','which/that for things: Technology that supports learning is useful.','where for places: Cities where transport is reliable are more efficient.'],
    negative:['People which live → People who live.','Technology who helps → Technology that/which helps.'],
    question:['Which policy is effective? The policy that reduces costs.','Who benefits? Students who live far from schools.'],
    daily:['I have a friend who speaks English well.','This is the app that I use every day.'],
    ielts:['Students who receive regular feedback tend to improve faster.','This policy, which is expensive, may bring long-term benefits.']
  },
  'noun-phrases': {
    when:'Dipakai untuk membuat tulisan lebih padat dan akademik dengan adjective + noun / noun + prepositional phrase.',
    positive:['adjective + noun: a significant problem','noun + of + noun: the development of technology','determiner + adjective + noun: a major social issue'],
    negative:['Jangan susun noun phrase seperti bahasa Indonesia: technology development rapid → rapid technological development.'],
    question:['What kind of problem? A serious environmental problem.','Which development? The development of public transport.'],
    daily:['I need a better study plan.','That was a useful explanation.'],
    ielts:['Rapid technological development has changed communication.','A lack of reliable information can affect decision-making.']
  },
  'comparatives': {
    when:'Dipakai untuk membandingkan data Task 1, pendapat, atau solusi.',
    positive:['adjective-er + than: cheaper than','more + adjective + than: more effective than','the most + adjective: the most important factor'],
    negative:['more better → better.','more easier → easier.'],
    question:['Which is more effective?','Is online learning cheaper than traditional learning?'],
    daily:['This lesson is easier than the last one.','My English is getting better.'],
    ielts:['Public transport is more sustainable than private car use.','The highest proportion was recorded in 2020.']
  },
  'trend-language': {
    when:'Dipakai di IELTS Writing Task 1 untuk menjelaskan naik, turun, stabil, dan perubahan angka.',
    positive:['Subject + increased/decreased/rose/fell + adverb: The figure rose sharply.','There was + adjective + noun: There was a sharp increase.'],
    negative:['Jangan campur verb dan noun salah: The number had an increase sharply → The number increased sharply.'],
    question:['What happened to the figure? It increased.','How did it change? It rose sharply.'],
    daily:['Prices went up last month.','The number of students fell slightly.'],
    ielts:['The percentage increased steadily from 2010 to 2020.','There was a dramatic decline in car use.']
  },
  'overview': {
    when:'Dipakai di Task 1 untuk menyimpulkan trend utama tanpa detail angka terlalu banyak.',
    positive:['Overall, it is clear that + main trend.','In general, X was the highest while Y was the lowest.'],
    negative:['Jangan memasukkan semua angka detail di overview.','Jangan lupa overview karena ini bagian penting Task Achievement.'],
    question:['What is the main trend?','Which category was highest/lowest overall?'],
    daily:['Overall, the lesson was useful.','In general, this method works well.'],
    ielts:['Overall, it is clear that internet use increased in all age groups.','In general, car travel remained the most popular mode of transport.']
  },
  'cohesion': {
    when:'Dipakai untuk menghubungkan ide: tambah informasi, kontras, sebab-akibat, dan contoh.',
    positive:['Addition: Moreover, Furthermore, In addition','Contrast: However, Nevertheless, Whereas','Result: Therefore, As a result','Example: For example, For instance'],
    negative:['Jangan terlalu banyak linking words dalam satu paragraf.','However harus diikuti koma: However, this solution is expensive.'],
    question:['Which linker shows contrast? However.','Which linker gives result? Therefore.'],
    daily:['I was tired. However, I kept studying.','I practised every day. As a result, I improved.'],
    ielts:['Moreover, online platforms can provide flexible access.','However, this solution may be expensive.']
  },
  'hedging': {
    when:'Dipakai agar klaim akademik tidak terlalu absolut. Cocok untuk Band 7+ writing.',
    positive:['may/might/could + V1: This may reduce pollution.','is likely to + V1: It is likely to improve access.','tends to + V1: Online learning tends to be flexible.'],
    negative:['Hindari always/never kalau tidak punya bukti kuat.','Jangan tulis everyone knows dalam academic writing.'],
    question:['How can we make the claim softer? Use may, might, could, tends to.'],
    daily:['This method might help you.','It is likely to rain later.'],
    ielts:['This policy may reduce traffic congestion.','Online learning tends to be more flexible than traditional classes.']
  },
  'nominalisation': {
    when:'Dipakai untuk mengubah verb/adjective menjadi noun agar writing lebih academic dan padat.',
    positive:['Verb → noun: improve → improvement','grow → growth','decide → decision','important → importance'],
    negative:['Jangan membuat noun form palsu: improvingment salah; yang benar improvement.'],
    question:['What is the noun form of improve? Improvement.','How can we nominalise “people consume more”? An increase in consumption.'],
    daily:['Your improvement is clear.','This decision is important.'],
    ielts:['The improvement in literacy was significant.','The growth of e-commerce has changed consumer habits.']
  },
  'complex-sentences': {
    when:'Dipakai untuk menggabungkan ide sebab, kontras, syarat, atau tambahan informasi. Penting untuk Band 7+ tapi tetap harus jelas.',
    positive:['Although + clause, main clause: Although it is costly, it is useful.','Because + clause, main clause: Because it is flexible, many students prefer it.','Despite + noun/gerund: Despite the cost, it may help.'],
    negative:['Although ..., but ... salah. Pilih Although atau but, jangan dua-duanya.','Despite it is expensive salah; gunakan Although it is expensive atau Despite being expensive.'],
    question:['Why is it useful? Because it improves access.','What is the contrast? Although it is expensive, it is effective.'],
    daily:['Although I was tired, I studied English.','Because I practised, I improved.'],
    ielts:['Although online learning is flexible, it may reduce social interaction.','Despite the high cost, the policy could bring long-term benefits.']
  },
  'subject-verb': {
    when:'Dipakai supaya subject dan verb cocok. Error kecil ini sering muncul di writing dan speaking.',
    positive:['Singular subject + Vs: She studies.','Plural subject + V1: Students study.','The number of + plural noun + singular verb: The number of students is increasing.'],
    negative:['People believes salah; people believe benar.','The number of students are salah; the number ... is benar.'],
    question:['Does she study?','Do students study?','Is the number increasing?'],
    daily:['She likes English.','Many students prefer online learning.'],
    ielts:['The number of online learners is increasing.','Many people believe technology is essential.']
  },
  'count-uncount': {
    when:'Dipakai untuk noun yang bisa dihitung dan tidak bisa dihitung. Ini penting untuk article, plural, much/many.',
    positive:['Countable: a suggestion, many books, several students','Uncountable: information, advice, equipment, furniture','a piece of advice / information'],
    negative:['informations salah; information benar.','advices salah; advice atau pieces of advice benar.'],
    question:['How much information do you need?','How many suggestions did you receive?'],
    daily:['I need some information.','Can you give me a piece of advice?'],
    ielts:['Students need reliable information.','Schools should provide modern equipment.']
  },
  'punctuation': {
    when:'Dipakai untuk mengontrol kalimat agar jelas. Punctuation yang rapi membuat writing lebih mudah dibaca.',
    positive:['Introductory phrase + comma: In recent years, ...','Independent clause + but/and/so + independent clause: It is useful, but it is expensive.','Semicolon for related clauses: Some agree; others disagree.'],
    negative:['Comma splice salah: It is useful, it is expensive.','Jangan membuat satu kalimat terlalu panjang tanpa koma/titik.'],
    question:['Where should the comma go? After introductory phrase.','Are there two complete sentences? Use conjunction, full stop, or semicolon.'],
    daily:['After school, I studied English.','I was tired, but I kept practising.'],
    ielts:['In recent years, online learning has become more common.','The policy is useful, but it may be expensive.']
  },
  'essay-structure': {
    when:'Dipakai untuk menyusun Task 2 agar jawaban jelas dan mudah diikuti.',
    positive:['Introduction: paraphrase + thesis','Body: topic sentence + explanation + example + result','Conclusion: summary + final opinion'],
    negative:['Jangan menambah ide baru di conclusion.','Jangan body paragraph tanpa topic sentence.'],
    question:['What is your position?','What is the main idea of this paragraph?'],
    daily:['First, I explain the idea. Then, I give an example.','Finally, I summarise my point.'],
    ielts:['This essay argues that the benefits outweigh the drawbacks.','One major advantage is that online platforms improve access to education.']
  },
  'task-response': {
    when:'Dipakai untuk memastikan jawaban benar-benar menjawab pertanyaan IELTS, bukan sekadar membahas topik umum.',
    positive:['Agree/disagree: state your degree of agreement.','Discuss both views: explain both sides + your opinion.','Advantages/disadvantages: cover both if asked.'],
    negative:['Jangan abaikan bagian pertanyaan seperti “to what extent”.','Jangan menulis contoh yang tidak relevan.'],
    question:['What exactly is the question asking?','Have I answered all parts?'],
    daily:['I partly agree with this idea.','There are two sides to this problem.'],
    ielts:['I partly agree because the policy has benefits but also serious limitations.','This essay will discuss both views before presenting my opinion.']
  },
  'lexical-resource': {
    when:'Dipakai untuk memilih kata yang tepat, natural, dan tidak repetitif. IELTS suka precision, bukan kata susah asal pakai.',
    positive:['important → crucial/essential/significant','bad → harmful/detrimental/problematic','help → support/facilitate/enable','cause → lead to/result in'],
    negative:['Jangan pakai advanced word kalau konteksnya salah.','Jangan mengulang kata yang sama terlalu sering.'],
    question:['What is a more precise word?','Is this word natural in this context?'],
    daily:['This app is useful for learning.','Good feedback helps students improve.'],
    ielts:['Regular feedback is beneficial for learners.','Air pollution has detrimental effects on public health.']
  },
  'common-errors': {
    when:'Dipakai untuk menghindari kesalahan umum pelajar Indonesia yang sering muncul di sentence level.',
    positive:['want + to + V1: I want to improve.','agree with + noun/person: I agree with this opinion.','discuss + noun: discuss the problem.','do homework, make a decision'],
    negative:['I am agree salah; I agree benar.','discuss about salah; discuss the issue benar.','more better salah; better benar.'],
    question:['Do you agree with this opinion?','What do you want to improve?'],
    daily:['I want to improve my English.','I did my homework last night.'],
    ielts:['Technology plays an essential role in education.','Many people agree with the idea that public transport should be improved.']
  }
};
function grammarFormulaFor(id){
  return grammarFormulaBank[id] || {
    when:'Dipakai sesuai konteks lesson ini. Fokus utama: bentuk kalimat jelas, meaning tepat, dan error kecil berkurang.',
    positive:['(+): Gunakan pola utama lesson ini dalam kalimat lengkap.'],
    negative:['(-): Perhatikan bentuk negative dan common mistake.'],
    question:['(?): Latih bentuk pertanyaan supaya speaking lebih lancar.'],
    daily:['Make one daily sentence with this grammar.'],
    ielts:['Use this structure in an IELTS-style sentence.']
  };
}

const grammarBeginnerGuide = {
  "articles": {
    "meaning": "Articles itu kata kecil sebelum noun: a, an, the. Dalam bahasa Indonesia sering tidak terlihat, makanya mudah lupa.",
    "when": [
      "Pakai a/an saat menyebut satu benda/orang yang belum spesifik: a laptop, an idea.",
      "Pakai the saat benda/orang itu sudah jelas atau spesifik: the laptop I bought.",
      "Tidak pakai article untuk ide umum: Education is important."
    ],
    "compare": [
      "a/an = satu hal baru atau belum spesifik.",
      "the = hal yang sudah diketahui/spesifik.",
      "zero article = membahas sesuatu secara umum."
    ],
    "examples": [
      [
        "Aku membeli laptop baru.",
        "I bought a new laptop."
      ],
      [
        "Matahari sangat panas hari ini.",
        "The sun is very hot today."
      ],
      [
        "Pendidikan penting untuk masa depan.",
        "Education is important for the future."
      ]
    ]
  },
  "present-simple-continuous": {
    "meaning": "Present simple = fakta/kebiasaan. Present continuous = sedang terjadi sekarang atau trend yang sedang berkembang.",
    "when": [
      "Present simple: rutinitas, fakta umum, atau kebiasaan.",
      "Present continuous: aksi sedang berlangsung sekarang.",
      "Present continuous juga bisa untuk perubahan/trend saat ini: Technology is changing education."
    ],
    "compare": [
      "I study English every day = kebiasaan.",
      "I am studying English now = sedang dilakukan sekarang.",
      "Technology changes learning = fakta umum. Technology is changing learning = proses/trend masih berlangsung."
    ],
    "examples": [
      [
        "Saya minum air setiap pagi.",
        "I drink water every morning."
      ],
      [
        "Saya sedang belajar bahasa Inggris sekarang.",
        "I am studying English right now."
      ],
      [
        "Teknologi sedang mengubah cara orang belajar.",
        "Technology is changing how people learn."
      ]
    ]
  },
  "past-tenses": {
    "meaning": "Past tense dipakai untuk kejadian di masa lalu. Bedanya: selesai, sedang terjadi saat itu, atau terjadi lebih dulu sebelum kejadian lain.",
    "when": [
      "Past simple: kejadian selesai di masa lalu.",
      "Past continuous: kejadian sedang berlangsung pada waktu tertentu di masa lalu.",
      "Past perfect: kejadian yang sudah terjadi sebelum kejadian lampau lain."
    ],
    "compare": [
      "I studied last night = selesai.",
      "I was studying when my friend called = sedang berlangsung, lalu ada kejadian lain.",
      "I had finished my homework before I slept = selesai lebih dulu."
    ],
    "examples": [
      [
        "Saya belajar kemarin malam.",
        "I studied last night."
      ],
      [
        "Saya sedang menonton TV ketika ibu saya menelepon.",
        "I was watching TV when my mom called."
      ],
      [
        "Dia sudah pergi sebelum saya datang.",
        "She had left before I arrived."
      ]
    ]
  },
  "present-perfect": {
    "meaning": "Present perfect menghubungkan masa lalu dengan sekarang. Fokusnya bukan kapan persis terjadi, tapi hasil/pengalaman sampai sekarang.",
    "when": [
      "Pengalaman hidup: I have visited Bali.",
      "Mulai dulu dan masih sampai sekarang: I have lived here since 2021.",
      "Perubahan yang masih relevan sekarang: Online learning has become common."
    ],
    "compare": [
      "I studied yesterday = ada waktu jelas di masa lalu.",
      "I have studied for two hours = durasi sampai sekarang.",
      "since + titik awal; for + durasi."
    ],
    "examples": [
      [
        "Saya sudah tinggal di sini sejak 2021.",
        "I have lived here since 2021."
      ],
      [
        "Saya sudah belajar selama dua jam.",
        "I have studied for two hours."
      ],
      [
        "Pembelajaran online menjadi semakin umum.",
        "Online learning has become more common."
      ]
    ]
  },
  "future": {
    "meaning": "Future forms dipakai untuk rencana, prediksi, keputusan spontan, atau jadwal yang akan terjadi.",
    "when": [
      "will: prediksi atau keputusan spontan.",
      "going to: rencana atau ada tanda/bukti.",
      "present continuous: rencana yang sudah fixed."
    ],
    "compare": [
      "I will study tonight = keputusan/prediksi.",
      "I am going to study tonight = sudah ada rencana.",
      "I am taking a test tomorrow = jadwal sudah jelas."
    ],
    "examples": [
      [
        "Saya akan belajar malam ini.",
        "I will study tonight."
      ],
      [
        "Saya berencana mengikuti IELTS tahun depan.",
        "I am going to take IELTS next year."
      ],
      [
        "Saya mengikuti mock test besok.",
        "I am taking a mock test tomorrow."
      ]
    ]
  },
  "passive": {
    "meaning": "Passive voice dipakai saat fokusnya pada benda/aksi, bukan pelakunya. Sering dipakai di IELTS Writing dan Task 1 process.",
    "when": [
      "Pelaku tidak penting atau tidak diketahui: My bag was stolen.",
      "Academic writing: The data were collected.",
      "Process: The beans are roasted."
    ],
    "compare": [
      "Active: People collect the data = fokus pelaku.",
      "Passive: The data are collected = fokus data/aksi.",
      "Passive selalu pakai be + Verb 3."
    ],
    "examples": [
      [
        "Tas saya dicuri kemarin.",
        "My bag was stolen yesterday."
      ],
      [
        "Data dikumpulkan dari 500 siswa.",
        "The data were collected from 500 students."
      ],
      [
        "Kopi diproduksi dalam beberapa tahap.",
        "Coffee is produced in several stages."
      ]
    ]
  },
  "modals": {
    "meaning": "Modals seperti can, should, must, may membantu menyampaikan kemampuan, saran, kewajiban, atau kemungkinan.",
    "when": [
      "can/could: kemampuan atau kemungkinan.",
      "should: saran.",
      "must: kewajiban kuat.",
      "may/might: kemungkinan yang lebih hati-hati."
    ],
    "compare": [
      "should study, bukan should to study.",
      "must reduce, bukan must to reduce.",
      "may = lebih hati-hati daripada will."
    ],
    "examples": [
      [
        "Siswa harus berlatih setiap hari.",
        "Students should practise every day."
      ],
      [
        "Teknologi dapat membantu pendidikan.",
        "Technology can support education."
      ],
      [
        "Kebijakan ini mungkin mengurangi polusi.",
        "This policy may reduce pollution."
      ]
    ]
  },
  "conditionals": {
    "meaning": "Conditional adalah kalimat “jika... maka...”. Dipakai untuk konsekuensi, kemungkinan, atau situasi imajinatif.",
    "when": [
      "Zero conditional: fakta umum.",
      "First conditional: kemungkinan nyata di masa depan.",
      "Second conditional: situasi imajinatif/tidak nyata sekarang."
    ],
    "compare": [
      "If people exercise, they stay healthy = fakta umum.",
      "If students practise, they will improve = mungkin terjadi.",
      "If I had more time, I would study more = imajinasi."
    ],
    "examples": [
      [
        "Jika siswa berlatih, mereka akan berkembang.",
        "If students practise, they will improve."
      ],
      [
        "Jika transportasi umum lebih murah, lebih banyak orang akan menggunakannya.",
        "If public transport were cheaper, more people would use it."
      ],
      [
        "Jika air mendidih, air berubah menjadi uap.",
        "If water boils, it turns into steam."
      ]
    ]
  },
  "relative-clauses": {
    "meaning": "Relative clause dipakai untuk memberi informasi tambahan tentang orang, benda, atau tempat tanpa membuat kalimat baru.",
    "when": [
      "who untuk orang.",
      "which/that untuk benda atau ide.",
      "where untuk tempat."
    ],
    "compare": [
      "Students who practise regularly improve faster.",
      "Technology which is used wisely can help students.",
      "A school where students feel safe is important."
    ],
    "examples": [
      [
        "Siswa yang berlatih rutin berkembang lebih cepat.",
        "Students who practise regularly improve faster."
      ],
      [
        "Aplikasi yang saya pakai sangat membantu.",
        "The app that I use is very helpful."
      ],
      [
        "Sekolah tempat siswa merasa aman itu penting.",
        "A school where students feel safe is important."
      ]
    ]
  },
  "complex-sentences": {
    "meaning": "Complex sentence menggabungkan dua ide: satu ide utama dan satu ide tambahan seperti alasan, kontras, atau kondisi.",
    "when": [
      "Although/while untuk kontras.",
      "Because untuk alasan.",
      "Despite + noun/gerund untuk kontras formal."
    ],
    "compare": [
      "Although..., jangan tambah but.",
      "Because..., jangan tambah so dalam pola yang sama.",
      "Despite being expensive = benar; despite it is expensive = salah."
    ],
    "examples": [
      [
        "Meskipun teknologi berguna, teknologi bisa mengganggu siswa.",
        "Although technology is useful, it can distract students."
      ],
      [
        "Karena biaya tinggi, beberapa orang menolak kebijakan itu.",
        "Because the cost is high, some people oppose the policy."
      ],
      [
        "Meskipun mahal, kebijakan itu bisa bermanfaat.",
        "Despite being expensive, the policy could be beneficial."
      ]
    ]
  },
  "subject-verb": {
    "meaning": "Subject-verb agreement berarti subject dan verb harus cocok: singular pakai verb singular, plural pakai verb plural.",
    "when": [
      "He/she/it biasanya pakai verb + s/es di present simple.",
      "They/we/you/I pakai verb dasar.",
      "Each/the number of biasanya singular."
    ],
    "compare": [
      "Many people believe, bukan many people believes.",
      "The number of students is increasing, bukan are increasing.",
      "Each student has, bukan have."
    ],
    "examples": [
      [
        "Banyak orang percaya teknologi penting.",
        "Many people believe technology is important."
      ],
      [
        "Jumlah siswa meningkat.",
        "The number of students is increasing."
      ],
      [
        "Setiap siswa memiliki tujuan berbeda.",
        "Each student has a different goal."
      ]
    ]
  },
  "count-uncount": {
    "meaning": "Beberapa noun tidak dihitung satu-satu dalam bahasa Inggris, misalnya information, advice, furniture, equipment.",
    "when": [
      "Pakai much/a lot of untuk uncountable.",
      "Pakai many/several untuk countable plural.",
      "Gunakan a piece of untuk advice/information kalau ingin “satu”."
    ],
    "compare": [
      "information, bukan informations.",
      "advice, bukan advices.",
      "equipment, bukan equipments."
    ],
    "examples": [
      [
        "Saya butuh beberapa informasi.",
        "I need some information."
      ],
      [
        "Dia memberi saya satu nasihat.",
        "She gave me a piece of advice."
      ],
      [
        "Sekolah membeli peralatan baru.",
        "The school bought new equipment."
      ]
    ]
  },
  "punctuation": {
    "meaning": "Punctuation membantu pembaca memahami kalimat. Dalam IELTS, koma dan titik bisa menyelamatkan grammar.",
    "when": [
      "Pakai koma setelah frasa pembuka: In recent years, ...",
      "Jangan gabungkan dua kalimat penuh hanya dengan koma.",
      "Kalimat terlalu panjang lebih mudah salah."
    ],
    "compare": [
      "The policy is useful, but it is expensive = benar.",
      "The policy is useful, it is expensive = comma splice/salah.",
      "However, this solution is not perfect = koma setelah however."
    ],
    "examples": [
      [
        "Dalam beberapa tahun terakhir, teknologi menjadi penting.",
        "In recent years, technology has become important."
      ],
      [
        "Kebijakan itu berguna, tetapi mahal.",
        "The policy is useful, but it is expensive."
      ],
      [
        "Namun, solusi ini tidak sempurna.",
        "However, this solution is not perfect."
      ]
    ]
  }
};

function grammarBeginnerGuideHTML(id){
  const g = grammarBeginnerGuide[id];
  if(!g) return `<div class="grammar-simple-guide"><div class="simple-hero"><span>Step 1 — pahami dulu</span><h4>Penjelasan sederhana</h4><p>Lesson ini dipakai untuk membuat kalimat lebih jelas. Baca rumusnya, lihat contoh Indonesia → English, lalu kerjakan practice pelan-pelan.</p></div></div>`;
  const list = arr => (arr||[]).map(x=>`<li>${escapeHTML(x)}</li>`).join('');
  const examples = (g.examples||[]).map(x=>`<div class="simple-example"><b>${escapeHTML(x[0])}</b><small>${escapeHTML(x[1])}</small></div>`).join('');
  return `<div class="grammar-simple-guide">
    <div class="simple-hero"><span>Step 1 — pahami dulu</span><h4>Apa artinya?</h4><p>${escapeHTML(g.meaning)}</p></div>
    <div class="simple-guide-grid">
      <div class="simple-guide-box"><h5>Kapan dipakai?</h5><ul>${list(g.when)}</ul></div>
      <div class="simple-guide-box"><h5>Bedanya dengan yang mirip</h5><ul>${list(g.compare)}</ul></div>
    </div>
    <div class="simple-guide-box"><h5>Contoh Indonesia → English</h5><div class="simple-example-list">${examples}</div></div>
  </div>`;
}

function grammarFormulaHTML(id){
  const f = grammarFormulaFor(id);
  const list = arr => arr.map(x=>`<li>${escapeHTML(x)}</li>`).join('');
  return `${grammarBeginnerGuideHTML(id)}<div class="formula-panel"><div class="formula-head"><h4>Step 2 — Rumus + / - / ?</h4><span class="tag">formula + contoh</span></div><div class="formula-use"><b>Inti penggunaan:</b> ${escapeHTML(f.when)}</div><div class="formula-grid"><div class="formula-card positive"><h5>✅ Positive (+)</h5><ul>${list(f.positive)}</ul></div><div class="formula-card negative"><h5>❌ Negative (-)</h5><ul>${list(f.negative)}</ul></div><div class="formula-card question"><h5>❓ Question (?)</h5><ul>${list(f.question)}</ul></div></div><div class="formula-examples"><div><h5>Daily Conversation</h5><ul>${list(f.daily)}</ul></div><div><h5>IELTS Example</h5><ul>${list(f.ielts)}</ul></div></div></div>`;
}

function renderGrammar(){
  const totalQuestions = grammarAllQuestions().length;
  const doneCount = Object.keys(state.grammarDone || {}).length;
  renderBandPath('grammarBandPath', true);
  const f = $('#grammarBandFilter'); if(f) f.value = state.grammarBand || 'all';
  const packSelect = $('#grammarPracticeLesson');
  if(packSelect && packSelect.options.length <= 1){ packSelect.innerHTML = grammarLessons.map(g=>`<option value="${g.id}">${escapeHTML(g.title)} — 20 soal</option>`).join(''); }
  const lessons = filteredGrammarLessons();
  $('#grammarGrid').innerHTML = lessons.map((g,i)=>{ const b=lessonBand(g.id); return `<button class="grammar-card" data-lesson="${g.id}"><div class="chip-row"><span class="chip">${i+1}</span><span class="chip target-band">${escapeHTML(b.short)}</span><span class="chip">${escapeHTML(g.level)}</span><span class="chip">${grammarQuestionsFor(g.id).length} soal</span>${state.grammarDone[g.id]?`<span class="chip">✅ ${state.grammarDone[g.id]}%</span>`:'<span class="chip">open</span>'}</div><h4>${escapeHTML(g.title)}</h4><p>${escapeHTML(g.summary)}</p><span class="btn ghost">Open lesson</span></button>`; }).join('');
  const panel = $('#grammarView .panel .panel-head .tag'); if(panel) panel.textContent = `${grammarLessons.length} lessons • ${totalQuestions} questions • ${doneCount} done`;
  $$('.grammar-card').forEach(b=>b.onclick=()=>openLesson(b.dataset.lesson));
}
function openLesson(id){
  const g = grammarLessons.find(x=>x.id===id); if(!g) return; const box = $('#lessonPanel'); box.classList.remove('hidden');
  const questions = grammarQuestionsFor(g.id).map(q=>({...q, explain:q.explain || g.title}));
  const answers = Array(questions.length);
  const b = lessonBand(g.id);
  const formulaHTML = grammarFormulaHTML(g.id);
  const bandNote = `${b.label}: ${b.goal} Fokus utama: ${b.focus}`;
  box.innerHTML = `<div class="panel-head"><div><h3>${escapeHTML(g.title)}</h3><p class="soft">${questions.length} latihan cepat di lesson ini. Untuk latihan besar, klik Full Practice Pack.</p><div class="center-actions"><button class="btn primary" id="lessonFullPackBtn">Start Full Practice Pack</button></div></div><span class="tag target-band">${escapeHTML(b.label)}</span></div><div class="lesson-content"><div class="lesson-band-note"><b>Target level:</b> ${escapeHTML(bandNote)}<br><small>Contoh: past tense masuk area Band 6 Builder karena di tahap ini kamu perlu mulai stabil menjelaskan kejadian, data lampau, dan pengalaman.</small></div>${formulaHTML}<div class="lesson-block"><h4>Konsep</h4><p class="soft">${escapeHTML(g.summary)}</p></div><div class="lesson-block"><h4>Pola penting</h4><ul>${g.patterns.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="lesson-block"><h4>Contoh IELTS</h4><ul>${g.examples.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="lesson-block"><h4>Kesalahan umum</h4><ul>${g.mistakes.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="lesson-block"><h4>Practice Quiz</h4><div class="mini-quiz" id="miniQuizBox">${questions.map((q,qi)=>`<div class="mini-question"><p><b>${qi+1}. ${escapeHTML(q.q)}</b></p>${q.options.map((o,oi)=>`<button data-mini-q="${qi}" data-mini-o="${oi}">${escapeHTML(o)}</button>`).join('')}<small class="soft hidden" id="miniExplain${qi}">${escapeHTML(q.explain || '')}</small></div>`).join('')}</div><div class="center-actions"><button class="btn primary" id="finishLessonQuizBtn">Check Score</button><button class="btn ghost" id="retryLessonQuizBtn">Retry Lesson</button></div><div id="lessonQuizFeedback" class="feedback-box hidden"></div></div></div>`;
  $('#lessonFullPackBtn').onclick=()=>{ const pack=makeGrammarPack(g.id); state.currentTest={type:'grammar-pack:'+g.id, questions:pack, answers:Array(pack.length)}; setView('testbank'); renderTest(); };
  $$('#miniQuizBox button', box).forEach(btn=>btn.onclick=()=>{ const qi=Number(btn.dataset.miniQ); answers[qi]=Number(btn.dataset.miniO); $$(`[data-mini-q="${qi}"]`, box).forEach(x=>x.classList.remove('selected','correct','wrong')); btn.classList.add('selected'); });
  $('#finishLessonQuizBtn').onclick = async()=>{
    let correct = 0;
    questions.forEach((q,qi)=>{
      const chosen = answers[qi]; if(chosen===q.answer) correct++;
      $$(`[data-mini-q="${qi}"]`, box).forEach(btn=>{ const oi=Number(btn.dataset.miniO); if(oi===q.answer) btn.classList.add('correct'); if(chosen===oi && oi!==q.answer) btn.classList.add('wrong'); });
      const exp = $(`#miniExplain${qi}`); if(exp) exp.classList.remove('hidden');
    });
    const score = Math.round(correct / questions.length * 100);
    $('#lessonQuizFeedback').classList.remove('hidden');
    $('#lessonQuizFeedback').innerHTML = `<b>Score: ${score}%</b><br>Benar ${correct}/${questions.length}. ${score>=70?'Lesson ini sudah ditandai selesai ✅':'Ulangi lagi sampai minimal 70% supaya benar-benar nempel.'}`;
    if(score>=70){ await markGrammarDone(g.id, score); renderGrammar(); toast('Lesson ditandai selesai ✅','success'); }
    else toast('Skor belum cukup. Coba ulangi lesson ini.', 'info');
  };
  $('#retryLessonQuizBtn').onclick = ()=>openLesson(id);
  box.scrollIntoView({behavior:'smooth',block:'start'});
}

function listeningOrdered(items){
  if(!state.listeningOrder || !state.listeningOrder.length) return items;
  const order = new Map(state.listeningOrder.map((id,i)=>[id,i]));
  return [...items].sort((a,b)=>(order.get(a.id) ?? 9999) - (order.get(b.id) ?? 9999));
}
function filteredListeningLessons(){
  const q = ($('#listeningSearch')?.value || '').toLowerCase().trim();
  const type = $('#listeningTypeFilter')?.value || 'all';
  const level = $('#listeningLevelFilter')?.value || 'all';
  let data = listeningLessons.filter(l => (type==='all'||l.type===type) && (level==='all'||l.level===level));
  if(q) data = data.filter(l => [l.title,l.topic,l.level,l.source,l.note,(l.vocab||[]).join(' ')].join(' ').toLowerCase().includes(q));
  return listeningOrdered(data);
}
function populateListeningFilters(){
  const levelSel = $('#listeningLevelFilter'); if(!levelSel) return;
  const old = levelSel.value || 'all';
  const levels = uniq(listeningLessons.map(l=>l.level)).sort();
  levelSel.innerHTML = '<option value="all">All levels</option>' + levels.map(l=>`<option value="${escapeHTML(l)}">${escapeHTML(l)}</option>`).join('');
  levelSel.value = levels.includes(old) ? old : 'all';
}
function renderListening(){
  populateListeningFilters();
  const lessons = filteredListeningLessons();
  if(!state.currentListening && lessons[0]) state.currentListening = lessons[0].id;
  if(lessons.length && !lessons.some(l=>l.id===state.currentListening)) state.currentListening = lessons[0].id;
  $('#listeningList').innerHTML = lessons.map((l,i)=>`<button class="listening-item ${state.currentListening===l.id?'active':''}" data-listening="${l.id}"><b>${i+1}. ${escapeHTML(l.title)}</b><small>${escapeHTML(l.type==='video'?'Video lesson':'Original simulation')} • ${escapeHTML(l.topic)} • ${escapeHTML(l.level)}</small></button>`).join('') || '<div class="empty-state">Listening lesson tidak ditemukan.</div>';
  $$('[data-listening]').forEach(b=>b.onclick=()=>{ state.currentListening=b.dataset.listening; renderListening(); });
  renderListeningContent();
}
function renderListeningContent(){
  const lesson = listeningLessons.find(l=>l.id===state.currentListening) || listeningLessons[0];
  if(!lesson){ $('#listeningContent').innerHTML='<div class="empty-state">Belum ada listening lesson.</div>'; return; }
  const media = lesson.type==='video'
    ? `<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${escapeHTML(lesson.videoId)}" title="${escapeHTML(lesson.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="listening-note"><b>Catatan:</b> Ini video embed dari YouTube. Questions dan notes di bawah adalah buatan original untuk latihan; bukan salinan transcript penuh dari video.</div>`
    : `<div class="listening-note"><b>Original IELTS simulation:</b> klik Play Audio dulu, jawab soal, lalu buka script kalau mau review.</div><div class="center-actions"><button class="btn primary" id="playListeningAudioBtn">▶️ Play Audio</button><button class="btn secondary" id="stopListeningAudioBtn">Stop</button><button class="btn ghost" id="toggleListeningScriptBtn">Show/Hide Script</button></div><div class="script-box hidden" id="listeningScriptBox">${escapeHTML(lesson.script || '')}</div>`;
  $('#listeningContent').innerHTML = `<div class="panel-head"><div><h3>${escapeHTML(lesson.title)}</h3><p class="soft">${escapeHTML(lesson.source)} • ${escapeHTML(lesson.topic)} • ${escapeHTML(lesson.level)}</p></div><span class="tag">${escapeHTML(lesson.type)}</span></div>${media}<p class="soft">${escapeHTML(lesson.note || '')}</p><div class="focus-grid">${(lesson.focus||[]).map(x=>`<div class="focus-card">${escapeHTML(x)}</div>`).join('')}</div><div class="chip-row">${(lesson.vocab||[]).map(v=>`<span class="chip">${escapeHTML(v)}</span>`).join('')}</div><h3>IELTS-style Questions</h3><div id="listeningQuestions">${lesson.questions.map((q,i)=>`<div class="listening-question"><h4>${i+1}. ${escapeHTML(q.q)}</h4>${q.options.map((o,j)=>`<button class="listening-option" data-lq="${i}" data-lo="${j}">${escapeHTML(o)}</button>`).join('')}<p class="soft hidden" id="listenExplain${i}"><b>Explanation:</b> ${escapeHTML(q.explain || '')}</p></div>`).join('')}</div><div class="center-actions"><button class="btn primary" id="checkListeningBtn">Check Answers</button><button class="btn ghost" id="resetListeningBtn">Reset</button></div><div id="listeningScoreBox" class="feedback-box hidden"></div>`;
  const ans = [];
  $$('#listeningQuestions .listening-option').forEach(b=>b.onclick=()=>{ const q=Number(b.dataset.lq); ans[q]=Number(b.dataset.lo); $$(`[data-lq="${q}"]`, $('#listeningQuestions')).forEach(x=>x.classList.remove('selected')); b.classList.add('selected'); });
  const playBtn = $('#playListeningAudioBtn'); if(playBtn) playBtn.onclick=()=>speak(lesson.script || lesson.note || lesson.title);
  const stopBtn = $('#stopListeningAudioBtn'); if(stopBtn) stopBtn.onclick=()=>window.speechSynthesis?.cancel();
  const scriptBtn = $('#toggleListeningScriptBtn'); if(scriptBtn) scriptBtn.onclick=()=>$('#listeningScriptBox')?.classList.toggle('hidden');
  $('#resetListeningBtn').onclick=()=>renderListeningContent();
  $('#checkListeningBtn').onclick=async()=>{
    let correct=0;
    lesson.questions.forEach((q,i)=>{
      const chosen=ans[i]; if(chosen===q.answer) correct++;
      $$(`[data-lq="${i}"]`, $('#listeningQuestions')).forEach(btn=>{ const oi=Number(btn.dataset.lo); if(oi===q.answer) btn.classList.add('correct'); if(chosen===oi && oi!==q.answer) btn.classList.add('wrong'); });
      $('#listenExplain'+i)?.classList.remove('hidden');
    });
    const percent = Math.round(correct/lesson.questions.length*100);
    $('#listeningScoreBox').classList.remove('hidden');
    $('#listeningScoreBox').innerHTML = `<b>Score: ${percent}%</b><br>Benar ${correct}/${lesson.questions.length}. ${percent>=70?'Good job ✅':'Coba tonton/putar lagi, lalu ulangi.'}`;
    await saveQuizResult('listening-'+lesson.type, lesson.questions.length, correct, {lesson_id:lesson.id, title:lesson.title});
  };
}
function makeListeningQuestion(){
  const lesson = pick(listeningLessons);
  const base = pick(lesson.questions);
  const options = shuffle(base.options);
  return {type:'listening', prompt:`[${lesson.title}] ${base.q}`, options, answer:options.indexOf(base.options[base.answer]), ref:lesson.id, explain:base.explain || `Topic: ${lesson.topic}`};
}

function renderReading(){
  if(!state.currentReading) state.currentReading = readingPassages[0].id;
  $('#readingList').innerHTML = readingPassages.map(p=>`<button class="reading-item ${state.currentReading===p.id?'active':''}" data-reading="${p.id}"><b>${escapeHTML(p.title)}</b><br><small>${escapeHTML(p.topic)} • ${p.questions.length} questions</small></button>`).join('');
  $$('.reading-item').forEach(b=>b.onclick=()=>{state.currentReading=b.dataset.reading;renderReading();}); renderReadingContent();
}
function renderReadingContent(){
  const p = readingPassages.find(x=>x.id===state.currentReading); if(!p) return;
  const best = state.readingResults.filter(r=>r.passage_id===p.id).sort((a,b)=>b.score_percent-a.score_percent)[0];
  $('#readingContent').innerHTML = `<div class="panel-head"><h3>${escapeHTML(p.title)}</h3><span class="tag">${best?'Best '+best.score_percent+'%':'not done'}</span></div><div class="reading-text">${escapeHTML(p.text)}</div><hr style="border-color:var(--border);margin:18px 0"><div id="readingQuestions">${p.questions.map((q,i)=>`<div class="question-card"><h4>${i+1}. ${escapeHTML(q.q)}</h4>${q.options.map((o,j)=>`<button class="option" data-rq="${i}" data-ro="${j}">${escapeHTML(o)}</button>`).join('')}</div>`).join('')}</div><button class="btn primary" id="finishReadingBtn">Check Reading</button>`;
  const ans = []; $$('#readingQuestions .option').forEach(b=>b.onclick=()=>{ const q=Number(b.dataset.rq); ans[q]=Number(b.dataset.ro); $$(`[data-rq="${q}"]`).forEach(x=>x.classList.remove('selected')); b.classList.add('selected'); });
  $('#finishReadingBtn').onclick = async()=>{ let correct=0; p.questions.forEach((q,i)=>{ if(ans[i]===q.answer) correct++; }); await saveReadingResult(p.id,p.questions.length,correct); const percent=Math.round(correct/p.questions.length*100); toast(`Reading score: ${percent}%`, percent>=70?'success':'info'); renderReading(); };
}
function renderWriting(){
  $('#writingPrompt').innerHTML = writingPrompts.map(p=>`<option value="${p.id}">${p.type} — ${escapeHTML(p.title)}</option>`).join('');
  if(!state.currentWritingPrompt) state.currentWritingPrompt = writingPrompts[0].id; $('#writingPrompt').value = state.currentWritingPrompt; updateWritingPrompt();
}
function updateWritingPrompt(){
  const p = writingPrompts.find(x=>x.id===$('#writingPrompt').value) || writingPrompts[0]; state.currentWritingPrompt = p.id;
  $('#writingPromptCard').innerHTML = `<h4>${escapeHTML(p.type)} — ${escapeHTML(p.title)}</h4><p>${escapeHTML(p.prompt)}</p><span class="chip">minimum ${p.min} words</span>`;
}
function wordCount(text){ return (text.trim().match(/\b[\w'-]+\b/g)||[]).length; }
function sentenceSplit(text){ return text.split(/[.!?]+/).map(s=>s.trim()).filter(Boolean); }
function checkWriting(){
  const text = $('#writingText').value.trim(); if(!text){ toast('Tulis jawaban dulu.', 'error'); return; }
  const prompt = writingPrompts.find(x=>x.id===state.currentWritingPrompt) || writingPrompts[0]; const wc = wordCount(text); const sentences = sentenceSplit(text); const avgLen = sentences.length ? Math.round(wc/sentences.length) : 0;
  const lower = text.toLowerCase(); const issues=[]; const corrections=[]; const strengths=[];
  const checks = [
    [/\bi\b/g, 'Gunakan huruf besar “I”, bukan “i”.'], [/\balot\b/g, 'Tulis “a lot”, bukan “alot”.'], [/\bpeoples\b/g, 'Biasanya “people”, bukan “peoples”.'], [/\bin my opinion,? i think\b/g, 'Hindari double phrase “In my opinion, I think”. Pilih salah satu.'], [/\bdiscuss about\b/g, 'Tulis “discuss the issue”, bukan “discuss about the issue”.'], [/\bmore better\b/g, 'Tulis “better”, bukan “more better”.'], [/\bi am agree\b/g, 'Tulis “I agree”, bukan “I am agree”.'], [/\bshould to\b/g, 'Tulis “should + verb”, tanpa “to”.'], [/\bmust to\b/g, 'Tulis “must + verb”, tanpa “to”.'], [/\bcan to\b/g, 'Tulis “can + verb”, tanpa “to”.'], [/\bdon't\b|\bcan't\b|\bwon't\b|\bisn't\b|\baren't\b/g, 'Untuk IELTS Writing, hindari contraction: write do not, cannot, will not.']
  ];
  checks.forEach(([re,msg])=>{ const found = text.match(re); if(found) issues.push(`${msg} (${found.length}x)`); });
  const casualIdioms = idiomData.filter(i => i.use==='Avoid in writing' || i.use==='Writing caution');
  casualIdioms.forEach(i=>{ if(lower.includes(i.phrase.toLowerCase())){ issues.push(`Idiom/phrase “${i.phrase}” kurang aman untuk Writing formal. Ganti dengan “${i.academic_alt}”.`); } });
  if(wc < prompt.min) issues.push(`Word count masih kurang: ${wc}/${prompt.min}. Tambahkan alasan, contoh, dan elaborasi.`); else strengths.push(`Word count sudah aman: ${wc} words.`);
  const linkers = ['however','therefore','moreover','furthermore','in addition','for example','for instance','nevertheless','as a result','whereas','while','although','despite','overall','in conclusion'];
  const usedLinkers = linkers.filter(l=>lower.includes(l)); if(usedLinkers.length < 3) issues.push('Cohesion masih lemah: tambahkan linking words seperti however, therefore, for example, moreover.'); else strengths.push(`Linking words bagus: ${usedLinkers.slice(0,8).join(', ')}.`);
  if(avgLen > 28) issues.push(`Rata-rata kalimat terlalu panjang (${avgLen} words). Pecah beberapa kalimat agar grammar lebih aman.`); else strengths.push(`Panjang kalimat cukup terkendali (${avgLen} words/sentence).`);
  const academic = ['significant','crucial','beneficial','detrimental','essential','considerable','effective','efficient','sustainable','reliable','consequence','impact','policy','evidence','development','investment'];
  const academicUsed = academic.filter(w=>lower.includes(w)); if(academicUsed.length < 4) issues.push('Lexical resource bisa dinaikkan: pakai kata akademik yang tepat, bukan sekadar very good/very bad.'); else strengths.push(`Academic vocabulary terlihat: ${academicUsed.slice(0,8).join(', ')}.`);
  const stop = new Set('the a an and or but to of in on at for from with by is are was were be been being it this that these those people because as if so very more many much some can will would should could may might i you we they he she my your our their'.split(' '));
  const words = (lower.match(/\b[a-z]{4,}\b/g)||[]).filter(w=>!stop.has(w)); const freq={}; words.forEach(w=>freq[w]=(freq[w]||0)+1); const repeated=Object.entries(freq).filter(([w,c])=>c>=5).sort((a,b)=>b[1]-a[1]).slice(0,6);
  if(repeated.length) issues.push(`Ada repetisi kata: ${repeated.map(([w,c])=>`${w} (${c}x)`).join(', ')}. Coba pakai synonym/phrase lain.`);
  if(prompt.type==='Task 2'){
    if(!/(i agree|i disagree|this essay|i believe|in my view|my opinion|i partly agree)/i.test(text)) issues.push('Task Response: posisi/opini belum terlihat jelas. Tambahkan thesis di introduction.');
    if(!/(for example|for instance|such as)/i.test(text)) issues.push('Support: tambahkan contoh konkret dengan “for example / for instance”.');
  } else {
    if(!/(overall|in general)/i.test(text)) issues.push('Task 1: overview belum jelas. Tambahkan kalimat “Overall, it is clear that...”.');
    if(!/(increase|decrease|rose|fell|higher|lower|remained|fluctuated|compared)/i.test(text)) issues.push('Task 1: gunakan trend/comparison language seperti increased, decreased, higher than, remained stable.');
  }
  const base = 5.0 + (wc>=prompt.min?1:.2) + Math.min(1.2, usedLinkers.length*.15) + Math.min(1.2, academicUsed.length*.12) - Math.min(2.0, issues.length*.18);
  const band = Math.round(clamp(base,3.5,8.0)*2)/2;
  corrections.push('Cek kembali article: a/an/the sebelum singular noun seperti “a policy”, “an issue”, “the government”.');
  corrections.push('Pastikan setiap body paragraph punya topic sentence → explanation → example → result.');
  corrections.push('Coba upgrade vocabulary: important → crucial/essential; good → beneficial/effective; bad → detrimental/problematic.');
  state.lastWritingFeedback = {band, wc, avgLen, issues, strengths, corrections, prompt:prompt.title};
  $('#writingFeedback').innerHTML = `<div class="feedback-card"><h4>Estimated Band: ${band}</h4><div class="meter"><span style="width:${band/9*100}%"></span></div><p>${wc} words • ${sentences.length} sentences • avg ${avgLen} words/sentence</p></div><div class="feedback-card"><h4>Yang sudah bagus</h4><ul>${(strengths.length?strengths:['Kamu sudah mulai menulis. Sekarang fokus tambah struktur dan akurasi.']).map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="feedback-card"><h4>Yang perlu diperbaiki</h4><ul>${(issues.length?issues:['Tidak ada masalah besar yang terdeteksi oleh checker lokal.']).map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="feedback-card"><h4>Saran revisi</h4><ul>${corrections.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div>`;
}
async function saveWriting(){
  const text = $('#writingText').value.trim(); if(!text){ toast('Tidak ada tulisan untuk disimpan.', 'error'); return; }
  if(!state.lastWritingFeedback) checkWriting(); const p = writingPrompts.find(x=>x.id===state.currentWritingPrompt) || writingPrompts[0]; const row = {student_key:STUDENT_KEY,prompt_title:p.title,prompt:p.prompt,answer:text,word_count:wordCount(text),feedback:state.lastWritingFeedback};
  state.local.writing.unshift({...row, created_at:nowISO()}); saveLocal(); if(state.cloudReady){ await state.client.from('ielts_writing_answers').insert(row); } await recordActivity('writing', 1); toast('Writing tersimpan.', 'success');
}
function renderSpeaking(){
  const pool = state.vocab.filter(v=>v.word && v.word.split(' ').length<=2); if(!pool.length) return;
  state.pronIndex = clamp(state.pronIndex,0,pool.length-1); const v = pool[state.pronIndex % pool.length];
  $('#targetPronounce').textContent = v.word; $('#targetMeaning').textContent = v.meaning_id || v.definition_en || '';
  if(!state.currentSpeakingPrompt) state.currentSpeakingPrompt = pick(speakingPrompts); renderSpeakingPrompt();
}
function renderSpeakingPrompt(){
  const p = state.currentSpeakingPrompt || speakingPrompts[0]; $('#speakingPrompt').innerHTML = `<h4>${escapeHTML(p.part)} — ${escapeHTML(p.title)}</h4><p>${escapeHTML(p.prompt)}</p>`;
}
async function enableMic(){
  if(!navigator.mediaDevices?.getUserMedia){ $('#pronounceResult').innerHTML='Browser tidak support getUserMedia. Pakai Chrome/Edge terbaru.'; return; }
  try{ const stream = await navigator.mediaDevices.getUserMedia({audio:true}); stream.getTracks().forEach(t=>t.stop()); $('#pronounceResult').innerHTML='Microphone permission aktif ✅ Sekarang klik Speak Now.'; }
  catch(e){ $('#pronounceResult').innerHTML=`Mic belum aktif: ${escapeHTML(e.message)}<br>Buka lewat localhost/HTTPS, lalu cek ikon mic di address bar.`; }
}
function normSpeech(s){ return s.toLowerCase().replace(/[^a-z\s]/g,'').trim(); }
function lev(a,b){ const m=[]; for(let i=0;i<=b.length;i++)m[i]=[i]; for(let j=0;j<=a.length;j++)m[0][j]=j; for(let i=1;i<=b.length;i++)for(let j=1;j<=a.length;j++)m[i][j]=b.charAt(i-1)===a.charAt(j-1)?m[i-1][j-1]:Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1); return m[b.length][a.length]; }
function recordPronunciation(){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){ $('#pronounceResult').innerHTML='Speech Recognition belum support di browser ini. Coba Chrome/Edge desktop.'; return; }
  const target = $('#targetPronounce').textContent; const rec = new SpeechRecognition(); rec.lang='en-US'; rec.interimResults=false; rec.maxAlternatives=3; rec.continuous=false;
  $('#pronounceResult').innerHTML='Listening... ucapkan target word dengan jelas.'; rec.start();
  rec.onresult = e => { const heard = e.results[0][0].transcript; const a=normSpeech(target), b=normSpeech(heard); const distance=lev(a,b); const score=Math.round(clamp((1-distance/Math.max(a.length,b.length,1))*100,0,100)); $('#pronounceResult').innerHTML = `<b>Heard:</b> ${escapeHTML(heard)}<br><b>Target:</b> ${escapeHTML(target)}<br><b>Score:</b> ${score}% ${score>=75?'✅ Good':'📌 Try again'}<br><small>Tips: klik Listen, tirukan stress dan vowel-nya, lalu rekam ulang.</small>`; if(score>=75) recordActivity('pronunciation',1);  };
  rec.onerror = e => { $('#pronounceResult').innerHTML = `Tidak bisa mulai recording: ${escapeHTML(e.error || 'unknown')}. Pastikan website dibuka via HTTPS/localhost dan mic sudah di-allow.`; };
}
async function saveSpeaking(){
  const notes = $('#speakingNotes').value.trim(); const p = state.currentSpeakingPrompt || speakingPrompts[0]; if(!notes){ toast('Tulis notes dulu.', 'error'); return; }
  const row = {student_key:STUDENT_KEY,prompt_title:p.title,prompt:p.prompt,notes}; state.local.speaking.unshift({...row, created_at:nowISO()}); saveLocal(); if(state.cloudReady){ await state.client.from('ielts_speaking_notes').insert(row); } await recordActivity('speaking', 1); toast('Speaking notes tersimpan.', 'success');
}

function isAdminUser(){
  const email = String(state.authUser?.email || '').toLowerCase();
  const admins = Array.isArray(APP.ADMIN_EMAILS) ? APP.ADMIN_EMAILS.map(x=>String(x).toLowerCase().trim()) : [];
  return !!email && admins.includes(email);
}

function updatePremiumUI(){
  const label = isAdminUser() ? '🛡️ Admin' : state.premiumStatus === 'active' ? '💎 Premium active' : state.premiumStatus === 'pending' ? '⏳ Payment pending' : state.premiumStatus === 'rejected' ? '❌ Payment rejected' : '🔒 Premium required';
  if($('#premiumBadge')) $('#premiumBadge').textContent = label;
  if($('#premiumStatusTag')) $('#premiumStatusTag').textContent = label;
  if($('#sidebarPremiumStatus')) $('#sidebarPremiumStatus').textContent = label.replace(/^[^ ]+ /,'');
  if($('#premiumPriceText')) $('#premiumPriceText').textContent = formatIDR(premiumPrice());
  if($('#qrisImage')) $('#qrisImage').src = APP.QRIS_IMAGE || 'assets/qris-placeholder.svg';
  const box = $('#premiumStateBox');
  if(box){
    if(isPremiumActive()) box.innerHTML = '✅ Akun ini sudah premium. Kamu bisa mengakses semua fitur.';
    else if(state.premiumStatus === 'pending') box.innerHTML = `⏳ Bukti pembayaran sedang menunggu approval admin.${state.premiumRequest?.payment_id ? '<br><b>Payment ID:</b> '+escapeHTML(state.premiumRequest.payment_id) : ''}`;
    else if(state.premiumStatus === 'rejected') box.innerHTML = '❌ Request pembayaran ditolak. Cek kembali bukti bayar atau hubungi admin.';
    else box.innerHTML = '🔒 Akun belum premium. Silakan bayar QRIS lalu upload bukti pembayaran.';
  }
  if($('#adminStatusTag')) $('#adminStatusTag').textContent = isAdminUser() ? 'admin access' : 'not admin';
}
async function loadPremiumStatus(){
  state.premiumStatus = 'free'; state.premiumRequest = null;
  if(!state.client || !state.authUser){ updatePremiumUI(); return state.premiumStatus; }
  try{
    const sub = await state.client.from('ielts_subscriptions').select('*').eq('student_key', STUDENT_KEY).eq('status','active').order('created_at',{ascending:false}).limit(1);
    if(!sub.error && sub.data && sub.data.length){ state.premiumStatus='active'; updatePremiumUI(); return 'active'; }
    const req = await state.client.from('ielts_payment_requests').select('*').eq('student_key', STUDENT_KEY).order('created_at',{ascending:false}).limit(1);
    if(!req.error && req.data && req.data.length){ state.premiumRequest=req.data[0]; state.premiumStatus=req.data[0].status || 'pending'; updatePremiumUI(); return state.premiumStatus; }
  }catch(e){ console.warn('Premium status check skipped:', e.message || e); }
  updatePremiumUI(); return state.premiumStatus;
}
function redirectByPremium(){ return false; }
function buildPaymentMessage(request){
  const email = state.authUser?.email || '-';
  return `Halo Hosea, saya sudah bayar Lexora Premium Rp${formatIDR(premiumPrice())}.\n\nEmail akun: ${email}\nPayment ID: ${request?.payment_id || '-'}\nStatus: ${request?.status || 'pending'}\n\nTolong dicek dan approve ya.`;
}
function openPaymentWhatsApp(){
  const wa = ownerWhatsapp();
  if(!wa) return toast('Nomor OWNER_WHATSAPP belum diisi di config.js.', 'error');
  const msg = encodeURIComponent(buildPaymentMessage(state.premiumRequest));
  window.open(`https://wa.me/${wa}?text=${msg}`, '_blank', 'noopener,noreferrer');
}
function renderUpgrade(){ updatePremiumUI(); }
async function submitPaymentRequest(){
  if(!state.client || !state.authUser) return toast('Login dan Supabase harus aktif dulu.', 'error');
  const file = $('#paymentProofFile')?.files?.[0];
  if(!file) return toast('Upload bukti pembayaran dulu.', 'error');
  const pid = paymentId();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');
  const path = `${STUDENT_KEY}/${pid}.${ext}`;
  let proofUrl = '';
  try{
    const up = await state.client.storage.from('payment-proofs').upload(path, file, {upsert:false, contentType:file.type || 'application/octet-stream'});
    if(up.error) throw up.error;
    const pub = state.client.storage.from('payment-proofs').getPublicUrl(path);
    proofUrl = pub?.data?.publicUrl || path;
  }catch(e){
    console.warn(e);
    return toast('Upload bukti gagal. Pastikan bucket payment-proofs sudah dibuat dari SQL schema.', 'error');
  }
  const row = {
    student_key: STUDENT_KEY,
    user_email: state.authUser.email || '',
    payment_id: pid,
    amount: premiumPrice(),
    provider: 'gopay_merchant_qris_manual',
    payer_name: $('#payerName')?.value.trim() || '',
    payer_whatsapp: $('#payerWhatsapp')?.value.trim() || '',
    note: $('#paymentNote')?.value.trim() || '',
    proof_url: proofUrl,
    status: 'pending'
  };
  const ins = await state.client.from('ielts_payment_requests').insert(row).select('*').single();
  if(ins.error) return toast(ins.error.message, 'error');
  state.premiumRequest = ins.data; state.premiumStatus = 'pending'; updatePremiumUI();
  if($('#paymentResult')) $('#paymentResult').innerHTML = `✅ Bukti pembayaran terkirim.<br><b>Payment ID:</b> ${escapeHTML(pid)}<br>Klik tombol WhatsApp agar admin cepat cek.`;
  toast('Bukti pembayaran terkirim. Sekarang kirim Payment ID ke WhatsApp admin.', 'success');
  openPaymentWhatsApp();
}
async function loadAdminRequests(){
  if(!isAdminUser()) { $('#adminRequests').innerHTML = '<div class="empty-state">Kamu bukan admin. Tambahkan email kamu ke ADMIN_EMAILS di config.js dan policy SQL.</div>'; return; }
  if(!state.client) return toast('Supabase belum aktif.', 'error');
  const res = await state.client.from('ielts_payment_requests').select('*').in('status',['pending','rejected']).order('created_at',{ascending:false}).limit(100);
  if(res.error){ $('#adminRequests').innerHTML = `<div class="empty-state">${escapeHTML(res.error.message)}</div>`; return; }
  state.paymentRequests = res.data || [];
  renderAdmin();
}
function renderAdmin(){
  updatePremiumUI();
  const box = $('#adminRequests'); if(!box) return;
  if(!isAdminUser()){ box.innerHTML = '<div class="empty-state">Admin only. Login memakai email admin yang ada di config.js.</div>'; return; }
  const rows = state.paymentRequests || [];
  box.classList.remove('empty-state');
  box.innerHTML = rows.length ? rows.map(r=>`<div class="payment-request-card"><h4>${escapeHTML(r.payment_id)} • ${escapeHTML(r.status)}</h4><p><b>Email:</b> ${escapeHTML(r.user_email || r.student_key)}</p><p><b>Amount:</b> Rp${formatIDR(r.amount)} • <b>Provider:</b> ${escapeHTML(r.provider || 'qris')}</p><p><b>Nama:</b> ${escapeHTML(r.payer_name || '-')} • <b>WA:</b> ${escapeHTML(r.payer_whatsapp || '-')}</p><p><b>Note:</b> ${escapeHTML(r.note || '-')}</p><div class="request-actions"><a class="btn secondary" href="${escapeHTML(r.proof_url || '#')}" target="_blank" rel="noopener">Lihat Bukti</a><button class="btn primary" data-approve-payment="${r.id}">Approve</button><button class="btn danger" data-reject-payment="${r.id}">Reject</button></div></div>`).join('') : '<div class="empty-state">Tidak ada request pending.</div>';
  $$('[data-approve-payment]').forEach(b=>b.onclick=()=>approvePayment(b.dataset.approvePayment));
  $$('[data-reject-payment]').forEach(b=>b.onclick=()=>rejectPayment(b.dataset.rejectPayment));
}
async function approvePayment(id){
  if(!isAdminUser()) return toast('Admin only.', 'error');
  const req = (state.paymentRequests||[]).find(x=>String(x.id)===String(id));
  if(!req) return toast('Request tidak ditemukan.', 'error');
  const upd = await state.client.from('ielts_payment_requests').update({status:'approved', reviewed_by:state.authUser.email, reviewed_at:nowISO()}).eq('id', id);
  if(upd.error) return toast(upd.error.message, 'error');
  const sub = await state.client.from('ielts_subscriptions').upsert({student_key:req.student_key, plan:'lifetime', status:'active', amount:req.amount||premiumPrice(), currency:'IDR', provider:req.provider||'qris_manual', provider_invoice_id:req.payment_id, paid_at:nowISO(), updated_at:nowISO()}, {onConflict:'student_key,plan'});
  if(sub.error) return toast(sub.error.message, 'error');
  toast('Premium approved ✅', 'success');
  await loadAdminRequests();
}
async function rejectPayment(id){
  if(!isAdminUser()) return toast('Admin only.', 'error');
  const reason = prompt('Alasan reject?', 'Bukti bayar belum sesuai.');
  const upd = await state.client.from('ielts_payment_requests').update({status:'rejected', admin_note:reason||'', reviewed_by:state.authUser.email, reviewed_at:nowISO()}).eq('id', id);
  if(upd.error) return toast(upd.error.message, 'error');
  toast('Request rejected.', 'info');
  await loadAdminRequests();
}

function renderSettings(){
  $('#configPreview').textContent = `window.APP_CONFIG = {\n  SUPABASE_URL: "${APP.SUPABASE_URL ? '✅ sudah diisi' : ''}",\n  SUPABASE_ANON_KEY: "${APP.SUPABASE_ANON_KEY ? '✅ sudah diisi' : ''}",\n  AUTH_USER: "${state.authUser ? (state.authUser.email || 'logged in') : 'not logged in'}",\n  USE_SUPABASE: ${APP.USE_SUPABASE !== false}\n};`;
}
function openWordModal(v=null){
  state.editingSlug = v?.slug || null; $('#modalTitle').textContent = v ? 'Edit Vocabulary' : 'Add Vocabulary';
  $('#modalWord').value = v?.word || ''; $('#modalMeaning').value = v?.meaning_id || ''; $('#modalLevel').value = v?.level || 'Intermediate'; $('#modalTopic').value = v?.topic || 'Custom'; $('#modalDefinition').value = v?.definition_en || ''; $('#modalExample').value = v?.example_en || '';
  $('#wordModal').classList.remove('hidden');
}
async function saveModalWord(){
  const word = $('#modalWord').value.trim(); if(!word) return toast('Word tidak boleh kosong.', 'error');
  const old = state.editingSlug ? state.vocab.find(x=>x.slug===state.editingSlug) : null;
  const item = normalizeVocab({...(old||{}), slug:old?.slug || slugify(word), word, meaning_id:$('#modalMeaning').value.trim(), level:$('#modalLevel').value.trim() || 'Intermediate', topic:$('#modalTopic').value.trim() || 'Custom', definition_en:$('#modalDefinition').value.trim(), example_en:$('#modalExample').value.trim(), source:old?.source || 'custom'});
  await saveVocab(item); state.selected=item.slug; $('#wordModal').classList.add('hidden'); toast('Vocabulary tersimpan.', 'success'); renderAll();
}
function exportJSON(){
  const blob = new Blob([JSON.stringify({exported_at:nowISO(), student_key:STUDENT_KEY, local:state.local, vocab:state.vocab},null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`ielts-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(a.href);
}
function importJSON(file){
  const reader = new FileReader(); reader.onload = () => { try{ const data=JSON.parse(reader.result); if(data.local) state.local=Object.assign(fallbackLocal(), data.local); else if(data.vocab) state.local.custom=data.vocab.map(normalizeVocab); saveLocal(); refreshData(); toast('Backup berhasil di-import.', 'success'); }catch(e){ toast('File JSON tidak valid.', 'error'); } }; reader.readAsText(file);
}

function dailyTipKey(){ return `lexora_daily_tip_seen_${dateKey()}`; }
function getDailyTip(){
  const start = new Date('2026-01-01T00:00:00');
  const diff = Math.floor((today() - start) / 86400000);
  return dailyTips[((diff % dailyTips.length) + dailyTips.length) % dailyTips.length];
}
function renderDailyTip(){
  const tip = getDailyTip();
  const content = $('#dailyTipContent');
  if(!content) return;
  content.innerHTML = `<h2 id="dailyTipTitle">${escapeHTML(tip.type)}: ${escapeHTML(tip.title)}</h2>
    <p>${escapeHTML(tip.intro)}</p>
    <div class="daily-tip-section"><h3>💡 What’s the difference?</h3><ul>${tip.rules.map(r=>`<li>${escapeHTML(r)}</li>`).join('')}</ul></div>
    <h3>📌 Examples</h3><div class="daily-tip-examples">${tip.examples.map(ex=>`<div class="daily-tip-example">➡️ ${escapeHTML(ex)}</div>`).join('')}</div>
    <div class="daily-tip-trick"><b>🎯 Quick Trick:</b><br>${escapeHTML(tip.trick)}</div>
    <div class="daily-tip-quiz"><h3>❓ Quick Question</h3><p>👉 ${escapeHTML(tip.question)}</p><div class="daily-tip-options">${tip.options.map((o,i)=>`<button class="daily-tip-option" data-tip-answer="${i}">${String.fromCharCode(65+i)}) ${escapeHTML(o)}</button>`).join('')}</div><div id="dailyTipResult" class="daily-tip-result hidden"></div></div>
    <div class="daily-tip-footer"><button class="btn secondary" id="dailyTipListenBtn">🔊 Listen Title</button><button class="btn primary" id="dailyTipPracticeBtn">Practice in Test Bank</button><button class="btn ghost" id="dailyTipDoneBtn">Done for Today</button></div>`;
  $$('[data-tip-answer]').forEach(btn=>btn.onclick=()=>checkDailyTipAnswer(Number(btn.dataset.tipAnswer)));
  const listenBtn = $('#dailyTipListenBtn'); if(listenBtn) listenBtn.onclick=()=>speak(`${tip.type}. ${tip.title}. ${tip.intro}`);
  const practiceBtn = $('#dailyTipPracticeBtn'); if(practiceBtn) practiceBtn.onclick=()=>{ hideDailyTip(false); setView('testbank'); };
  const doneBtn = $('#dailyTipDoneBtn'); if(doneBtn) doneBtn.onclick=()=>hideDailyTip(true);
}
function checkDailyTipAnswer(choice){
  const tip = getDailyTip();
  $$('[data-tip-answer]').forEach(btn=>{ const n=Number(btn.dataset.tipAnswer); btn.classList.toggle('correct', n===tip.answer); btn.classList.toggle('wrong', n===choice && n!==tip.answer); });
  const result=$('#dailyTipResult');
  if(result){ result.classList.remove('hidden'); result.innerHTML = choice===tip.answer ? `✅ Correct! ${escapeHTML(tip.explanation)}` : `📌 Not yet. Correct answer: <b>${String.fromCharCode(65+tip.answer)}) ${escapeHTML(tip.options[tip.answer])}</b><br>${escapeHTML(tip.explanation)}`; }
  recordActivity('daily-tip', 1);
}
function showDailyTip(force=false){
  const overlay = $('#dailyTipOverlay');
  if(!overlay) return;
  if(!force && localStorage.getItem(dailyTipKey()) === 'seen') return;
  renderDailyTip();
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden','false');
}
function hideDailyTip(markSeen=true){
  if(markSeen) localStorage.setItem(dailyTipKey(), 'seen');
  const overlay = $('#dailyTipOverlay');
  if(overlay){ overlay.classList.add('hidden'); overlay.setAttribute('aria-hidden','true'); }
}

function bindEvents(){
  $('#nav').onclick = e => { const b=e.target.closest('[data-view]'); if(b){ setView(b.dataset.view); document.body.classList.remove('sidebar-open'); } };
  const openSidebar=()=>document.body.classList.add('sidebar-open');
  const closeSidebar=()=>document.body.classList.remove('sidebar-open');
  if($('#sidebarOpenBtn')) $('#sidebarOpenBtn').onclick=openSidebar;
  if($('#sidebarCloseBtn')) $('#sidebarCloseBtn').onclick=closeSidebar;
  if($('#sidebarOverlay')) $('#sidebarOverlay').onclick=closeSidebar;
  if($('#mobileMoreBtn')) $('#mobileMoreBtn').onclick=openSidebar;
  if($('#openDailyTipBtn')) $('#openDailyTipBtn').onclick=()=>showDailyTip(true);
  if($('#openDailyTipBtn2')) $('#openDailyTipBtn2').onclick=()=>showDailyTip(true);
  
  ['authEmail','authPassword'].forEach(id=>{ const el=$('#'+id); if(el) el.addEventListener('input', updateSecurityNotice); });
  if($('#signUpBtn')) $('#signUpBtn').onclick=signUpEmail;
  if($('#loginBtn')) $('#loginBtn').onclick=loginEmail;
  if($('#googleLoginBtn')) $('#googleLoginBtn').onclick=loginGoogle;
  if($('#logoutBtn')) $('#logoutBtn').onclick=logoutAccount;
  if($('#logoutBtn2')) $('#logoutBtn2').onclick=logoutAccount;
  if($('#paymentProofFile')) $('#paymentProofFile').onchange=e=>{ const f=e.target.files?.[0]; if($('#paymentProofName')) $('#paymentProofName').textContent = f ? f.name : 'Belum ada file'; };
  if($('#submitPaymentBtn')) $('#submitPaymentBtn').onclick=submitPaymentRequest;
  if($('#openWaPaymentBtn')) $('#openWaPaymentBtn').onclick=openPaymentWhatsApp;
  if($('#refreshPremiumBtn')) $('#refreshPremiumBtn').onclick=async()=>{ await loadPremiumStatus(); toast('Status premium diperbarui.', 'success'); };
  if($('#loadPaymentRequestsBtn')) $('#loadPaymentRequestsBtn').onclick=loadAdminRequests;
  if($('#refreshAdminBtn')) $('#refreshAdminBtn').onclick=loadAdminRequests;
  if($('#dailyTipFloatBtn')) $('#dailyTipFloatBtn').onclick=()=>showDailyTip(true);
  if($('#dailyTipCloseBtn')) $('#dailyTipCloseBtn').onclick=()=>hideDailyTip(true);
  if($('#dailyTipOverlay')) $('#dailyTipOverlay').onclick=e=>{ if(e.target.id==='dailyTipOverlay') hideDailyTip(true); };
  window.addEventListener('keydown', e=>{ if(e.key==='Escape') hideDailyTip(false); });
  $$('[data-jump]').forEach(b=>b.onclick=()=>setView(b.dataset.jump));
  $('#themeBtn').onclick=()=>{ document.body.classList.add('light'); state.theme='light'; localStorage.setItem('ielts_theme','light'); $('#themeBtn').textContent='🌿'; toast('Tema terang fresh aktif 🌿', 'success'); };
  ['searchInput','levelFilter','topicFilter','sortFilter'].forEach(id=>$('#'+id).addEventListener(id==='searchInput'?'input':'change', renderVocab));
  if($('#expressionSearch')) $('#expressionSearch').addEventListener('input', renderExpressions);
  if($('#expressionCategory')) $('#expressionCategory').addEventListener('change', renderExpressions);
  if($('#shuffleExpressionBtn')) $('#shuffleExpressionBtn').onclick=()=>{ state.expressionOrder = shuffle(dailyExpressions.map(x=>x.id)); renderExpressions(); };
  if($('#listeningSearch')) $('#listeningSearch').addEventListener('input', renderListening);
  if($('#listeningTypeFilter')) $('#listeningTypeFilter').addEventListener('change', renderListening);
  if($('#listeningLevelFilter')) $('#listeningLevelFilter').addEventListener('change', renderListening);
  if($('#randomListeningBtn')) $('#randomListeningBtn').onclick=()=>{ state.listeningOrder = shuffle(listeningLessons.map(x=>x.id)); state.currentListening = state.listeningOrder[0]; renderListening(); };
  if($('#idiomSearch')) $('#idiomSearch').addEventListener('input', renderIdioms);
  if($('#idiomUseFilter')) $('#idiomUseFilter').addEventListener('change', renderIdioms);
  if($('#idiomCategoryFilter')) $('#idiomCategoryFilter').addEventListener('change', renderIdioms);
  if($('#shuffleIdiomsBtn')) $('#shuffleIdiomsBtn').onclick=()=>{ state.idiomOrder = shuffle(idiomData.map(x=>x.id)); renderIdioms(); };
  $('#addWordBtn').onclick=()=>openWordModal(); $('#closeModalBtn').onclick=()=>$('#wordModal').classList.add('hidden'); $('#saveWordBtn').onclick=saveModalWord;
  if($('#importSupabaseBtn')) $('#importSupabaseBtn').onclick=()=>seedSupabase(true); if($('#importSupabaseBtn2')) $('#importSupabaseBtn2').onclick=()=>seedSupabase(true); if($('#testSupabaseBtn')) $('#testSupabaseBtn').onclick=async()=>{ await initSupabase(); await refreshData(); if($('#setupResult')) $('#setupResult').innerHTML=state.cloudReady?'Supabase connected ✅ Progress tersimpan di browser ini.':'Supabase belum connected / belum login.'; };
  $('#listenFlashBtn').onclick=()=>state.flash && speak(state.flash.word); $('#showAnswerBtn').onclick=()=>{ $('#flashAnswer').classList.remove('hidden'); $('#reviewActions').classList.remove('hidden');}; $('#skipCardBtn').onclick=()=>{state.selected=null;renderFlashcard();}; $$('#reviewActions [data-grade]').forEach(b=>b.onclick=()=>reviewFlash(Number(b.dataset.grade)));
  if($('#testBand')) $('#testBand').onchange=()=>updateTestModuleSelect();
  if($('#testModule')) $('#testModule').onchange=()=>renderTestModuleGrid();
  if($('#testType')) $('#testType').onchange=()=>renderTestModuleGrid();
  updateTestModuleSelect();
  $('#startTestBtn').onclick=()=>{ const n=Number($('#testSize').value); const type=$('#testType').value; const bandId=$('#testBand')?.value || 'band5'; const moduleId=$('#testModule')?.value || ''; const module=(testModulesFor(bandId).find(m=>m.id===moduleId)||{}); const questions=generateTest(type,n,bandId,moduleId); state.currentTest={type, bandId, moduleId, moduleTitle:module.title||'', moduleSkill:module.skill||'', questions, answers:Array(questions.length)}; renderTest(); };
  $('#showHistoryBtn').onclick=renderHistory;
  if($('#grammarBandFilter')) $('#grammarBandFilter').onchange=e=>{ state.grammarBand=e.target.value; renderGrammar(); };
  if($('#startBandPlanBtn')) $('#startBandPlanBtn').onclick=()=>{ const lessons=filteredGrammarLessons(); if(lessons[0]) openLesson(lessons[0].id); };
  if($('#startGrammarPackBtn')) $('#startGrammarPackBtn').onclick=()=>{ const id=$('#grammarPracticeLesson')?.value || 'past-tenses'; const questions=makeGrammarPack(id); state.currentTest={type:'grammar-pack:'+id, questions, answers:Array(questions.length)}; setView('testbank'); renderTest(); };
  $('#writingPrompt').onchange=updateWritingPrompt; $('#randomWritingBtn').onclick=()=>{ const p=pick(writingPrompts); $('#writingPrompt').value=p.id; state.currentWritingPrompt=p.id; updateWritingPrompt();}; $('#loadSampleBtn').onclick=()=>{$('#writingText').value='In recent years, technology has become an essential part of education. Some people believe that digital tools make learning more effective, while others argue that they may distract students. In my view, technology is beneficial if schools use it responsibly and combine it with good teaching.\n\nOne major advantage is that online platforms can provide flexible access to information. For example, students who live far from good schools can watch lessons, practise exercises, and receive feedback through the internet. This can reduce educational inequality and help learners study at their own pace. However, technology can also create problems when students spend too much time on games or social media. Therefore, teachers and parents should guide students and set clear rules.\n\nIn conclusion, technology is not a perfect solution, but it can improve education when it is used carefully. The most effective approach is to combine digital resources with face-to-face support.';}; $('#checkWritingBtn').onclick=checkWriting; $('#saveWritingBtn').onclick=saveWriting; $('#clearWritingBtn').onclick=()=>{$('#writingText').value='';$('#writingFeedback').innerHTML='';state.lastWritingFeedback=null;};
  $('#enableMicBtn').onclick=enableMic; $('#listenPronounceBtn').onclick=()=>speak($('#targetPronounce').textContent); $('#recordPronounceBtn').onclick=recordPronunciation; $('#nextPronounceBtn').onclick=()=>{ state.pronIndex++; renderSpeaking(); }; $('#newSpeakingBtn').onclick=()=>{state.currentSpeakingPrompt=pick(speakingPrompts);renderSpeakingPrompt();}; $('#saveSpeakingBtn').onclick=saveSpeaking;
  if($('#exportBtn')) $('#exportBtn').onclick=exportJSON; if($('#importFile')) $('#importFile').onchange=e=>e.target.files[0]&&importJSON(e.target.files[0]); if($('#resetLocalBtn')) $('#resetLocalBtn').onclick=()=>{ if(confirm('Reset local data? Progress yang tersimpan di browser akan dihapus.')){ localStorage.removeItem(getLocalKey()); loadLocal(); refreshData(); } };
}
async function boot(){
  STUDENT_KEY = 'local-user';
  loadLocal();
  await loadBuiltinDataFile();
  ensureVocabLoaded();
  document.body.classList.add('light','account-ready');
  document.body.classList.remove('auth-checking','account-locked');
  state.theme = 'light';
  state.client = null;
  state.cloudReady = false;
  state.usingCloud = false;
  state.authUser = null;
  state.premiumStatus = 'free';
  localStorage.setItem('ielts_theme','light');
  if($('#themeBtn')) $('#themeBtn').textContent='🌿';
  if($('#cloudMini')) $('#cloudMini').textContent='Progress tersimpan di browser ini';
  if($('#syncBadge')) $('#syncBadge').textContent='Local progress';
  if($('#localSaveStatus')) $('#localSaveStatus').textContent='✓ Saved on this browser';
  bindEvents();
  await refreshData();
  renderTest();
  setView('dashboard');
  setTimeout(()=>showDailyTip(false), 750);
  toast('Lexora siap dipakai tanpa login.', 'success');
}
window.addEventListener('DOMContentLoaded', boot);
