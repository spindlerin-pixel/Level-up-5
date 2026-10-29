/* =====================================================================
   Level Up 5 · Probe-Klassenarbeiten zum Ausfüllen am Tablet
   Inhalt der 6 Englisch-Arbeiten (wie die PDFs) + je eine Hörverstehen-Aufgabe.

   Aufbau einer Arbeit:
     id, nr, lvl, pc (Farbe), sub, min (Minuten), pdfMax, bands (Mindestpunkte
     für Note 1–5 laut PDF-Lösung; daraus werden Prozent-Grenzen berechnet)
     tasks: [{ h: Titel, de: Untertitel, topic: Übungsthema in der App, parts: [...] }]

   Teil-Typen (t):
     words  items [[deutsch, 'antwort|alternative']]               je 1 P
     gaps   lines [['Satz mit {} Lücke', 'antwort|alt', …]]       je Lücke 1 P (gp = Punkte pro Lücke)
     para   text 'Text mit (1) {} …', ans ['…', …]                 je Lücke 1 P
     pick   items [[frage, [optionen], richtigerIndex]]            je 1 P   (oder opts für alle)
     sort   words [[wort, gruppenIndex]], groups [...]             je 1 P
     tf     items [[aussage, true/false]]                          je 1 P
     open   items [[frage, /schlüsselwort/ oder [..], 'Musterantwort']]  je 1 P (full: ganze Sätze)
     sent   items [[aufgabe, ['Lösung', 'Alternative']]]           pts je Satz (mode 'q' = Frage)
     split  items [[aufgabe, ['a ruler']]]                         ½ P erstes Wort + ½ P Rest
     listen text 'Text mit {wort} …'                               Text wird vorgelesen, je Lücke 1 P
     write  kind 'family' | 'email' | 'pets'                       14 P (Inhalt 5, Sprache 6, Form 3)
   ===================================================================== */
window.LU5KA_DATA = [

/* ---------------------------------------------------------------- 1 */
{ id: 'e1', nr: 1, lvl: 'Warm-up', pc: '#FFD66B', sub: 'Welcome · Unit 1 · My family', min: 45, pdfMax: 64, bands: [58, 48, 38, 29, 13],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken.',
      text: 'Hello! My name is Jack and I am {twelve} years old. I live in Brighton with my family. My mum is a {teacher} and my dad is a postman. I have two {sisters}. {Their} names are Amy and Kate. We have a {rabbit}. Its name is Snowy and it is {white}. My favourite colour is {blue} and my hobby is football. On {Saturday} we go to the beach.' }
  ]},
  { h: 'Words', de: 'Vokabeln', topic: 'voc', parts: [
    { t: 'words', q: 'a) Schreib das englische Wort auf.', items: [
      ['der Strand', 'beach'], ['die Schwester', 'sister'], ['das Lineal', 'ruler'], ['lila', 'purple'], ['die Eltern', 'parents'], ['das Kaninchen', 'rabbit'],
      ['oben (im Haus)', 'upstairs'], ['niedlich', 'cute'], ['die Nachricht', 'message'], ['wissen', 'know'], ['die Tante', 'aunt'], ['Lieblings-', 'favourite'] ] },
    { t: 'pick', q: 'b) Tippe die richtige Schreibweise an.', items: [
      ['', ['yers', 'years', 'yeares'], 1], ['', ['flawer', 'fallowe', 'flower'], 2], ['', ['parents', 'parends', 'perents'], 0], ['', ['budgy', 'badgie', 'budgie'], 2] ] }
  ]},
  { h: 'am, is or are?', de: 'Setze am, is oder are ein.', topic: 'be', parts: [
    { t: 'gaps', lines: [
      ['I {} eleven years old.', 'am'], ['My sister {} nine.', 'is'], ['My grandparents {} from Speyer.', 'are'], ['{} you from Brighton?', 'Are'],
      ['The beach {} awesome.', 'is'], ['We {} in Year 5.', 'are'], ['My dog {} very cute.', 'is'], ['Mum and Dad {} at home.', 'are'] ] }
  ]},
  { h: 'he, she, they – his, her, their', de: 'Welches Wort passt? Jedes Wort einmal oder öfter.', topic: 'hisher', parts: [
    { t: 'gaps', box: 'he she they his her their', tip: 'Kommt danach ein Verb (is, likes …)? → he / she / they. Kommt ein Nomen (name, cat …)? → his / her / their.', lines: [
      ['This is my brother. {} name is Ben.', 'His'], ['My mum is from Italy. {} likes singing.', 'She'], ['My grandparents are lovely. {} names are Rosa and Kurt.', 'Their'],
      ['My cousins are twins. {} are ten years old.', 'They'], ['My aunt has a cat. {} cat is called Luna.', 'Her'], ['My dad is funny. {} likes football.', 'He'],
      ['Lily is my friend. {} favourite colour is pink.', 'Her'], ['Tom and Mia are my cousins. {} hobbies are reading and swimming.', 'Their'] ] }
  ]},
  { h: 'Question words', de: 'Lies die Antwort. Setze das richtige Fragewort ein.', topic: 'qw', parts: [
    { t: 'gaps', box: 'Who What Where How How old', lines: [
      ['{} is your name? – My name is Kim.', 'What'], ['{} are you from? – I’m from Germany.', 'Where'], ['{} are you? – I’m fine, thanks.', 'How'],
      ['{} is your sister? – She’s eight.', 'How old'], ['{} is your English teacher? – Mrs Cox.', 'Who'], ['{} are your hobbies? – Dancing and swimming.', 'What'] ] }
  ]},
  { h: 'Plurals', de: 'Schreib die Mehrzahl.', topic: 'plur', parts: [
    { t: 'gaps', lines: [
      ['one sister → two {}', 'sisters'], ['one family → two {}', 'families'], ['one hobby → two {}', 'hobbies'],
      ['one sandwich → two {}', 'sandwiches'], ['one person → two {}', 'people'], ['one day → two {}', 'days'] ] }
  ]},
  { h: 'Reading', de: 'Lies den Text. Tippe an: true oder false? Beantworte dann die Fragen.', topic: 'read', parts: [
    { t: 'tf', text: 'Hi! My name is Lia and I’m eleven years old. I’m from Brighton, a city by the sea. This is my family. My mum’s name is Sarah. She is a teacher. My dad’s name is Tom. His hobby is football. I have one brother. His name is Sam and he is seven. We have a dog. Its name is Toby. My grandparents live in London. Their names are Rose and Jack. My favourite colour is green and my hobbies are dancing and reading.',
      items: [['Lia is ten years old.', false], ['Lia’s mum is a teacher.', true], ['Sam is Lia’s cousin.', false], ['Lia’s grandparents live in Brighton.', false]] },
    { t: 'open', items: [
      ['What is the dog’s name?', [/toby/], 'Its name is Toby.'],
      ['What are Lia’s hobbies?', [/danc/, /read/], 'Her hobbies are dancing and reading.'] ] }
  ]},
  { h: 'Writing: My family', de: 'Schreib etwa 10 Sätze über deine Familie.', topic: 'family', parts: [
    { t: 'write', kind: 'family', help: 'Satzanfänge, die dir helfen: My name is … · I am … years old. · I am from … · This is my family. · I have … / I am an only child. · His name is … · Her name is … · Their names are … · He / She is … years old. · His / Her favourite colour is … · Their hobbies are … · We have a … · They are very nice.' }
  ]}
]},

/* ---------------------------------------------------------------- 2 */
{ id: 'e2', nr: 2, lvl: 'Normal', pc: '#8FD3FF', sub: 'Welcome · Unit 1 · My family', min: 45, pdfMax: 62, bands: [56, 46, 37, 28, 12],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken. Zahlen schreibst du als Wort.',
      text: 'Hi, I am Olivia and I am {eleven}. This is my family. My dad’s name is Ben. He is {forty-two}. My mum is from {Scotland}. Her name is Fiona and she likes {singing}. I have one {brother}. He is nine and his hobby is {swimming}. We have two {cats} and a budgie. The budgie is green and yellow. My {grandparents} live in a big house by the sea.' }
  ]},
  { h: 'Words', de: 'Vokabeln', topic: 'voc', parts: [
    { t: 'pick', q: 'a) Was gehört zusammen? Tippe die richtige Bedeutung an.', opts: ['A nützlich', 'B die Türklingel', 'C geschieden', 'D unten (im Haus)', 'E manchmal', 'F der Regenschirm'],
      items: [['doorbell', 1], ['sometimes', 4], ['downstairs', 3], ['umbrella', 5], ['useful', 0], ['divorced', 2]] },
    { t: 'words', q: 'b) Schreib das englische Wort auf.', items: [
      ['der Bruder', 'brother'], ['die Großeltern', 'grandparents'], ['der Cousin', 'cousin'], ['das Zimmer', 'room'],
      ['die Schultasche', 'schoolbag|school bag'], ['schwarz', 'black'], ['die Sprachen', 'languages'], ['verstehen', 'understand'] ] }
  ]},
  { h: 'Short answers', de: 'Antworte mit einer Kurzantwort. Beispiel: Are you ten? – Yes, I am. / No, I’m not.', topic: 'beq', parts: [
    { t: 'gaps', lines: [
      ['Are you eleven? – Yes, {}', 'I am'], ['Is your sister at home? – No, {}', 'she isn’t|she is not|she’s not'],
      ['Are your parents from Germany? – Yes, {}', 'they are'], ['Is the dog cute? – Yes, {}', 'it is'],
      ['Is your dad a teacher? – No, {}', 'he isn’t|he is not|he’s not'], ['Are you and your brother in Year 5? – No, {}', 'we aren’t|we are not|we’re not'],
      ['Is Brighton by the sea? – Yes, {}', 'it is'], ['Are you from London? – No, {}', 'I’m not|I am not'] ] }
  ]},
  { h: 'Ben’s family', de: 'Setze die Wörter aus dem Kasten ein. Jedes Wort passt genau einmal.', topic: 'hisher', parts: [
    { t: 'para', box: 'he his she her they their we our',
      text: 'Hi, I’m Ben. This is my family. My mum is from Scotland. (1) {} name is Kate. My dad is from Germany. (2) {} is a postman. (3) {} favourite hobby is football. I have two sisters. (4) {} names are Ella and Ruby. (5) {} are eight – they’re twins! My grandma lives with us. (6) {} likes reading. My sisters and I have a rabbit. (7) {} rabbit is called Snowy. (8) {} are a happy family.',
      ans: ['Her', 'He', 'His', 'Their', 'They', 'She', 'Our', 'We'] }
  ]},
  { h: 'Questions', de: 'Bring die Wörter in die richtige Reihenfolge und schreib die Frage auf. (je 2 P: Wortstellung + Großschreibung und Fragezeichen)', topic: 'beq', parts: [
    { t: 'sent', mode: 'q', pts: 2, items: [
      ['your / is / name / what / ?', ['What is your name?']],
      ['from / are / where / you / ?', ['Where are you from?']],
      ['old / sister / how / your / is / ?', ['How old is your sister?']] ] }
  ]},
  { h: 'Mistake detective', de: 'In jedem Satz ist ein Fehler. Schreib den Satz richtig auf.', topic: 'fix', parts: [
    { t: 'sent', strict: true, items: [
      ['Welcome in Speyer!', ['Welcome to Speyer!']], ['my brother is twelve.', ['My brother is twelve.']], ['She name is Mia.', ['Her name is Mia.']],
      ['I have three sister.', ['I have three sisters.']], ['Theyre very nice.', ['They’re very nice.']], ['I am in class 5.', ['I am in Year 5.']] ] }
  ]},
  { h: 'Reading: An e-mail from Joe', de: 'Lies die E-Mail. Tippe an und beantworte die Fragen.', topic: 'read', parts: [
    { t: 'tf', text: 'Hi!\nMy name is Joe and I’m twelve. I live in Brighton with my mum and my two brothers. My parents are divorced, so my dad lives in London. My brothers’ names are Max and Leo. Max is fourteen and Leo is nine. Leo is very funny! We have a budgie. Its name is Kiwi. My favourite colour is blue and my hobbies are football and swimming. What about you and your family?\nBye, Joe',
      items: [['Joe lives with his dad.', false], ['Joe has two brothers.', true], ['Leo is fourteen.', false], ['Kiwi is a budgie.', true]] },
    { t: 'open', items: [
      ['Who is nine?', [/\bleo\b/], 'Leo is nine.'],
      ['What are Joe’s hobbies?', [/football/, /swim/], 'His hobbies are football and swimming.'] ] }
  ]},
  { h: 'Writing: My family', de: 'Schreib etwa 10 Sätze über deine Familie.', topic: 'family', parts: [
    { t: 'write', kind: 'family', help: 'Denk an: Personen · Namen · Alter · Hobbys · Lieblingsfarbe / Lieblingstier · Haustiere · Wohnort' }
  ]}
]},

/* ---------------------------------------------------------------- 3 */
{ id: 'e3', nr: 3, lvl: 'Normal', pc: '#B9E6B0', sub: 'Welcome · Unit 1 · My family', min: 45, pdfMax: 63, bands: [57, 47, 38, 28, 13],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken. Zahlen schreibst du als Wort.',
      text: 'In my schoolbag I have a pencil case, a {ruler} and two {exercise} books. My pencil case is {purple}. In my pencil case there are {five} pencils, a {rubber} and a {sharpener}. My best friend is Mia. She is ten. {Her} schoolbag is red. Our English teacher is Mr Hill. He is very nice and {funny}.' }
  ]},
  { h: 'Words', de: 'Vokabeln', topic: 'voc', parts: [
    { t: 'pick', q: 'a) Odd one out: Welches Wort passt nicht dazu? Tippe es an.', items: [
      ['', ['rabbit', 'snake', 'budgie', 'ruler'], 3], ['', ['aunt', 'uncle', 'chair', 'cousin'], 2], ['', ['black', 'sky', 'purple', 'pink'], 1],
      ['', ['pen', 'pencil', 'beach', 'rubber'], 2], ['', ['Monday', 'French', 'Friday', 'Sunday'], 1] ] },
    { t: 'words', q: 'b) Schreib das englische Wort auf.', items: [
      ['das Mädchen', 'girl'], ['der Junge', 'boy'], ['die Möwe', 'seagull'], ['die Straße', 'street|road'], ['der Briefträger', 'postman'],
      ['vielleicht', 'maybe'], ['warum', 'why'], ['die Leute', 'people'], ['die Frage', 'question'], ['die Antwort', 'answer'] ] }
  ]},
  { h: 'I, you, he, she, it, we, they', de: 'Ersetze die fett gedruckten Wörter durch das richtige Pronomen.', topic: 'pron', parts: [
    { t: 'gaps', lines: [
      ['<b>Tom</b> is my cousin. → {}', 'He'], ['<b>My mum and dad</b> are at home. → {}', 'They'], ['<b>The beach</b> is awesome. → {}', 'It'],
      ['<b>Lisa and I</b> are friends. → {}', 'We'], ['<b>My grandma</b> likes music. → {}', 'She'], ['<b>The pencils</b> are new. → {}', 'They'] ] }
  ]},
  { h: 'Short forms', de: 'Schreib die Kurzform mit Apostroph.', topic: 'beneg', parts: [
    { t: 'gaps', lines: [
      ['I am → {}', 'I’m'], ['she is → {}', 'she’s'], ['they are → {}', 'they’re'], ['is not → {}', 'isn’t'], ['are not → {}', 'aren’t'], ['you are → {}', 'you’re'] ] }
  ]},
  { h: 'my, your, his, her, its, our, their', de: 'Welches Wort passt?', topic: 'poss', parts: [
    { t: 'gaps', box: 'my your his her its our their', lines: [
      ['I’m Lena. {} name is Lena.', 'My'], ['Are you Kim? Is this {} bag?', 'your'], ['Look at the dog! {} name is Lola.', 'Its'],
      ['Harry has a sister. {} name is Rosie.', 'Her'], ['Esther has a brother. {} name is Harry.', 'His'], ['Mik and Carol are grandparents. {} house is in Canada.', 'Their'],
      ['My brother and I have a hamster. {} hamster is cute.', 'Our'], ['My uncle likes cars. {} car is red.', 'His'] ] }
  ]},
  { h: 'Plurals', de: 'Schreib das Wort in der Klammer in der Mehrzahl.', topic: 'plur', parts: [
    { t: 'gaps', lines: [
      ['I have two {} (brother).', 'brothers'], ['My {} (cousin) are from Berlin.', 'cousins'], ['Brighton and London are {} (city) in England.', 'cities'],
      ['We have two {} (fish).', 'fish'], ['Her {} (hobby) are dancing and reading.', 'hobbies'], ['Five {} (person) are in the room.', 'people'] ] }
  ]},
  { h: 'Reading: Emma’s family tree', de: 'Schau dir den Stammbaum an und ergänze die Sätze.', topic: 'gen', parts: [
    { t: 'gaps', tree: [
        [['Grandpa', 'Jack', 70], ['Grandma', 'Rose', 68]],
        [['Dad', 'Paul', 42], ['Mum', 'Anna', 40], ['Aunt', 'Kate', 38]],
        [['me', 'Emma', 11], ['brother', 'Sam', 7], ['dog', 'Bobby', 2], ['Kate’s daughter', 'Lily', 5]] ],
      tip: 'Paul und Kate sind Geschwister. Jack und Rose sind ihre Eltern.', lines: [
      ['Emma’s brother is {}.', 'Sam'], ['Emma’s dad? {} name is Paul.', 'His'], ['Rose and Jack are Emma’s {}.', 'grandparents'], ['Kate is Emma’s {}.', 'aunt'],
      ['Lily is Emma’s {}.', 'cousin'], ['Sam {} seven years old.', 'is'], ['Paul and Kate {} brother and sister.', 'are'], ['The dog? {} name is Bobby.', 'Its'] ] }
  ]},
  { h: 'Writing: My family', de: 'Schreib etwa 10 Sätze über deine Familie. Schreib über mindestens drei Personen: Name, Alter und Hobby oder Lieblingsfarbe.', topic: 'family', parts: [
    { t: 'write', kind: 'family', help: 'Denk an: Personen · Namen · Alter · Hobbys · Lieblingsfarbe / Lieblingstier · Haustiere · Wohnort' }
  ]}
]},

/* ---------------------------------------------------------------- 4 */
{ id: 'e4', nr: 4, lvl: 'Profi', pc: '#FFB3C7', sub: 'Welcome · Unit 1 · My family', min: 45, pdfMax: 66, bands: [59, 50, 40, 30, 13],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken. Zahlen schreibst du als Wort.',
      text: 'Hello, my name is Tom. I am {thirteen} years old and I live in Brighton. My parents are {divorced}. I live with my dad and my little {sister} Rosie. Rosie is {six} and she loves animals. We have a dog and two {guinea pigs}. The dog’s name is Max. My mum lives in {London}. I see her every {Sunday}. My favourite subject at school is {art}. What about you?' }
  ]},
  { h: 'Words', de: 'Vokabeln', topic: 'themen', parts: [
    { t: 'sort', q: 'a) Sortiere die Wörter: Tippe bei jedem Wort die richtige Gruppe an.', groups: ['family', 'pets', 'school things', 'colours'],
      words: [['aunt', 0], ['budgie', 1], ['ruler', 2], ['purple', 3], ['uncle', 0], ['spider', 1], ['pencil case', 2], ['grey', 3], ['cousin', 0], ['guinea pig', 1], ['sharpener', 2], ['brown', 3]] },
    { t: 'sent', q: 'b) Wie sagst du das auf Englisch?', items: [
      ['Wie alt bist du?', ['How old are you?']], ['Woher kommst du?', ['Where are you from?', 'Where do you come from?']],
      ['Ich bin ein Einzelkind.', ['I’m an only child.']], ['Freut mich, dich kennenzulernen.', ['Nice to meet you.', 'Pleased to meet you.']] ] }
  ]},
  { h: 'A dialogue', de: 'Ergänze: am, is, are, isn’t oder aren’t.', topic: 'be', parts: [
    { t: 'para', box: 'am is are isn’t aren’t', lines: true,
      text: 'Mia: Hi! I (1) {} Mia. Who (2) {} you?\nTom: I’m Tom. (3) {} you new here?\nMia: Yes, I (4) {}. My family (5) {} from Germany.\nTom: (6) {} your parents at home now?\nMia: No, they (7) {}. They’re in the park.\nTom: And your brother? Is he in the park too?\nMia: No, he (8) {}. He’s at school.',
      ans: ['am', 'are', 'Are', 'am', 'is', 'Are', 'aren’t|are not', 'isn’t|is not'] }
  ]},
  { h: 'Question words', de: 'Setze das richtige Fragewort ein. Achtung: kein Kasten!', topic: 'qw', parts: [
    { t: 'gaps', lines: [
      ['{} is your favourite animal? – The cat.', 'What'], ['{} is in the photo? – My grandma.', 'Who'], ['{} is Joel in town? – He needs a new phone.', 'Why'],
      ['{} old are your cousins? – They’re nine.', 'How'], ['{} are your grandparents from? – From Poland.', 'Where'], ['{} are you today? – I’m fine, thanks.', 'How'] ] }
  ]},
  { h: 'Harry’s family', de: 'Setze he, she, they, his, her oder their ein.', topic: 'hisher', parts: [
    { t: 'para', box: 'he she they his her their',
      text: 'This is Harry. (1) {} is eleven. (2) {} mum is Lucy. (3) {} is very nice. Harry has two sisters. (4) {} names are Esther and Rosie. (5) {} are funny. Harry’s dad is Brian. (6) {} favourite hobby is football. Harry’s grandparents are Mik and Carol. (7) {} are from Canada. (8) {} house is very big.',
      ans: ['He', 'His', 'She', 'Their', 'They', 'His', 'They', 'Their'] }
  ]},
  { h: 'Mistake detective', de: 'In jedem Satz ist ein Fehler. Schreib den Satz richtig auf.', topic: 'fix', parts: [
    { t: 'sent', strict: true, items: [
      ['My parends are very nice.', ['My parents are very nice.']], ['I have ten years.', ['I am ten years old.', 'I am ten.']],
      ['Let’s us play a game.', ['Let’s play a game.']], ['On monday I have French.', ['On Monday I have French.']],
      ['He’s name is Leo.', ['His name is Leo.']], ['I am a only child.', ['I am an only child.']],
      ['My favourite colour is Blue.', ['My favourite colour is blue.']], ['We have a lots of trees.', ['We have lots of trees.', 'We have a lot of trees.']] ] }
  ]},
  { h: 'Reading: Sunita’s family', de: 'Lies den Text. Tippe an und beantworte die Fragen in ganzen Sätzen.', topic: 'read', parts: [
    { t: 'tf', text: 'Sunita is my best friend. She’s eleven. Her family is from India, but now they live in Brighton. Sunita has a big family. She has two sisters and a brother. Her sisters’ names are Priya and Asha. Her brother is Ravi. He’s six and he’s very funny. Sunita’s grandma lives with the family. Her hobby is singing. Sunita and her sisters love animals. They have two guinea pigs. Their names are Pepper and Salt.',
      items: [['Sunita’s family is from India.', true], ['Sunita has two brothers.', false], ['Sunita’s grandma lives in India.', false]] },
    { t: 'open', full: true, items: [
      ['How old is Ravi?', [/\bsix\b|\b6\b/], 'He’s six.'],
      ['What is the grandma’s hobby?', [/sing/], 'Her hobby is singing.'],
      ['What are the guinea pigs’ names?', [/pepper/, /salt/], 'Their names are Pepper and Salt.'] ] }
  ]},
  { h: 'Writing: An e-mail to Joe', de: 'Joe aus Brighton möchte deine Familie kennenlernen. Schreib ihm eine E-Mail mit etwa 10 Sätzen.', topic: 'family', parts: [
    { t: 'write', kind: 'email', help: 'Beginne mit „Hi Joe,“ und ende mit „Bye,“ und deinem Namen. Schreib über dich und mindestens drei Personen aus deiner Familie.' }
  ]}
]},

/* ---------------------------------------------------------------- 6 (Schwerpunkte) */
{ id: 'e6', nr: 6, lvl: 'Schwerpunkte', pc: '#FFC48A', sub: 'Schwerpunkte: Tiere · Zahlen · Schulsachen · Familie', min: 45, pdfMax: 62, bands: [55, 47, 38, 28, 12],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken. Zahlen schreibst du als Wort.',
      text: 'Hello! My name is Sam. I am {eleven}. I have a big family: I have {three} brothers and one sister. My sister’s name is Lucy. She is {eighteen}. At home we have lots of pets: two {rabbits}, a {parrot} and three {fish}. The parrot can say hello! In my schoolbag I have a pen, a ruler and an {exercise book}. My favourite number is {forty}.' }
  ]},
  { h: 'Numbers', de: 'Zahlen', topic: 'num', parts: [
    { t: 'words', q: 'a) Schreib die Zahl als Wort. Achte genau auf die Rechtschreibung.', items: [
      ['12', 'twelve'], ['11', 'eleven'], ['15', 'fifteen'], ['18', 'eighteen'], ['40', 'forty'], ['67', 'sixty-seven'] ] },
    { t: 'words', q: 'b) Schreib die Zahl als Ziffer.', num: true, items: [
      ['twenty', '20'], ['thirteen', '13'], ['fifty-four', '54'], ['a hundred', '100'] ] }
  ]},
  { h: 'How many?', de: 'Rechnen und zählen – Ergebnis als Wort', topic: 'num', parts: [
    { t: 'words', q: 'a) Rechne und schreib das Ergebnis als Wort.', items: [
      ['6 + 5 =', 'eleven'], ['20 − 3 =', 'seventeen'], ['10 + 4 =', 'fourteen'] ] },
    { t: 'split', q: 'b) Zähl genau und ergänze den Satz: Zahl als Wort und das Tier oder Ding in der richtigen Form (je ½ P).', pre: 'I can see', items: [
      ['🐟🐟🐟🐟🐟🐟🐟🐟', ['eight fish']], ['✏️✏️✏️✏️✏️✏️', ['six pencils']], ['🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️🕷️', ['nine spiders']] ] }
  ]},
  { h: 'Animals', de: 'Tiere', topic: 'themen', parts: [
    { t: 'words', q: 'a) Schreib das englische Wort auf.', items: [
      ['das Kaninchen', 'rabbit'], ['die Schlange', 'snake'], ['das Meerschweinchen', 'guinea pig'], ['die Spinne', 'spider'], ['der Wellensittich', 'budgie'], ['der Papagei', 'parrot'] ] },
    { t: 'gaps', q: 'b) Schreib die Mehrzahl.', lines: [['one fish → two {}', 'fish'], ['one guinea pig → three {}', 'guinea pigs']] }
  ]},
  { h: 'School things', de: 'Was ist in deiner Schultasche? Schreib das Wort mit a oder an (je ½ P für a/an und ½ P für das Wort).', topic: 'aan', parts: [
    { t: 'split', tip: 'Beispiel: der Stuhl → a chair · Tipp: Fängt das Wort mit a, e, i, o, u an? → an', items: [
      ['das Lineal', ['a ruler']], ['das Heft', ['an exercise book']], ['der Anspitzer', ['a sharpener', 'a pencil sharpener']], ['das Federmäppchen', ['a pencil case']],
      ['der Radiergummi', ['a rubber', 'an eraser']], ['der Kugelschreiber', ['a pen']], ['die Schultasche', ['a schoolbag', 'a school bag', 'a bag']], ['der Schreibtisch', ['a desk']] ] }
  ]},
  { h: 'Family', de: 'Familie', topic: 'hisher', parts: [
    { t: 'gaps', q: 'a) Family riddles: Wer ist das? Schreib das Familienwort auf. Beispiel: My mum’s mum is my grandma.', lines: [
      ['My dad’s brother is my {}.', 'uncle'], ['My mum’s sister is my {}.', 'aunt'], ['My aunt’s son is my {}.', 'cousin'],
      ['My mum and dad are my {}.', 'parents'], ['My dad’s dad is my {}.', 'grandpa|grandfather|granddad'], ['Grandma and Grandpa are my {}.', 'grandparents'] ] },
    { t: 'gaps', q: 'b) Setze he, she, his, her oder their ein.', box: 'he she his her their', lines: [
      ['This is my aunt. {} name is Kate.', 'Her'], ['My uncle has a dog. {} dog is Max.', 'His'], ['My cousins are twins. {} names are Ida and Finn.', 'Their'], ['My grandma is lovely. {} likes reading.', 'She'] ] }
  ]},
  { h: 'Reading: Amy’s family', de: 'Lies, tippe an, antworte in ganzen Sätzen.', topic: 'read', parts: [
    { t: 'tf', text: 'Hi! I’m Amy and I’m eleven years old. I live in Brighton with my mum, my dad and my little brother Ben. Ben is seven. We have two pets: a rabbit and a budgie. The rabbit’s name is Hoppy and the budgie’s name is Kiwi. My grandparents live in London. They have a big black dog. My aunt Sue is from Scotland. She has three cats! My favourite animal is the guinea pig. In my schoolbag I have a purple pencil case, two exercise books and a ruler.',
      items: [['Amy is twelve years old.', false], ['Ben is Amy’s brother.', true], ['Amy’s grandparents have a cat.', false]] },
    { t: 'open', full: true, items: [
      ['What are the names of Amy’s pets?', [/hoppy/, /kiwi/], 'Their names are Hoppy and Kiwi.'],
      ['Who is from Scotland?', [/\bsue\b/], 'Her aunt Sue is from Scotland.'],
      ['What colour is Amy’s pencil case?', [/purple/], 'It’s purple.'] ] }
  ]},
  { h: 'Writing: Me, my family and my pets', de: 'Schreib etwa 10 Sätze.', topic: 'family', parts: [
    { t: 'write', kind: 'pets', help: 'Schreib über mindestens drei Personen aus deiner Familie (Name und Alter – Zahlen als Wort!), über eure Haustiere oder dein Lieblingstier und darüber, was in deiner Schultasche ist. Satzanfänge: I have … · His / Her name is … · He / She is … years old. · Their names are … · We have a … / I don’t have a pet. · My favourite animal is … · In my schoolbag I have …' }
  ]}
]},

/* ---------------------------------------------------------------- 5 (Generalprobe) */
{ id: 'e5', nr: 5, lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Welcome · Unit 1 · My family – wie in der echten Arbeit', min: 45, pdfMax: 67, bands: [60, 50, 40, 30, 13],
  tasks: [
  { h: 'Listening', de: 'Hören und Lücken füllen', topic: 'listen', parts: [
    { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal. Schreib beim Zuhören die fehlenden Wörter in die Lücken. Zahlen schreibst du als Wort.',
      text: 'Hi! I am Ella. I am from Speyer in {Germany}, but my {grandma} is from England. She lives in Brighton. Her house is near the {beach}. I have an uncle and an {aunt} in Brighton too. Their son Leo is my {cousin}. He is {fourteen}. Leo has a snake! Its name is Spike. I think snakes are {scary}, but Leo says they are cool. My favourite animal is the {horse}.' }
  ]},
  { h: 'Words', de: 'Schreib das englische Wort auf. Achte genau auf die Rechtschreibung.', topic: 'voc', parts: [
    { t: 'words', items: [
      ['die Familie', 'family'], ['der Stammbaum', 'family tree'], ['der Kugelschreiber', 'pen'], ['die Tafel', 'board'], ['der Wellensittich', 'budgie'], ['unheimlich', 'scary'],
      ['langweilig', 'boring'], ['seltsam', 'weird'], ['manchmal', 'sometimes'], ['das Land', 'country'], ['der Satz', 'sentence'], ['die Rechtschreibung', 'spelling'] ] }
  ]},
  { h: 'Translate', de: 'Übersetze die Sätze ins Englische (je 2 P).', topic: 'phr', parts: [
    { t: 'sent', pts: 2, items: [
      ['Ich bin im 5. Jahrgang.', ['I am in Year 5.', 'I am in Year five.']], ['Ihr Name ist Sophie.', ['Her name is Sophie.']],
      ['Meine Großeltern sind sehr nett.', ['My grandparents are very nice.']], ['Wir haben keinen Garten.', ['We do not have a garden.', 'We have no garden.', 'We have not got a garden.']] ] }
  ]},
  { h: 'Negative sentences', de: 'Schreib die Sätze verneint auf (mit not / n’t).', topic: 'beneg', parts: [
    { t: 'sent', items: [
      ['I’m from London.', ['I am not from London.']], ['My brother is at home.', ['My brother is not at home.']], ['They’re in the park.', ['They are not in the park.']],
      ['It is boring.', ['It is not boring.']], ['We are in Year 6.', ['We are not in Year 6.']], ['You’re right.', ['You are not right.']] ] }
  ]},
  { h: 'Noah’s family', de: 'Ergänze die Lücken. Kein Kasten – du musst selbst überlegen!', topic: 'hisher', parts: [
    { t: 'para',
      text: 'My name is Noah. I (1) {} from Speyer. My mum’s name is Clara. (2) {} is a nurse. (3) {} favourite colour is red. My dad is Marc. (4) {} likes cars. I have two cousins. (5) {} names are Ida and Finn. (6) {} are from Berlin. Ida (7) {} ten and Finn (8) {} six. My cousins and I love animals. (9) {} favourite animal is the parrot. We have a cat. (10) {} name is Mimi.',
      ans: ['am', 'She', 'Her', 'He', 'Their', 'They', 'is', 'is', 'Our', 'Its'] }
  ]},
  { h: 'Ask questions', de: 'Hier sind die Antworten. Schreib die passenden Fragen auf (je 2 P).', topic: 'beq', parts: [
    { t: 'sent', mode: 'q', pts: 2, items: [
      ['…? – My name is Lena.', ['What is your name?']], ['…? – I’m eleven.', ['How old are you?']], ['…? – I’m from Germany.', ['Where are you from?', 'Where do you come from?']] ] }
  ]},
  { h: 'Plurals', de: 'Schreib die Mehrzahl.', topic: 'plur', parts: [
    { t: 'gaps', lines: [['country → {}', 'countries'], ['fish → {}', 'fish'], ['person → {}', 'people'], ['sandwich → {}', 'sandwiches'], ['day → {}', 'days']] }
  ]},
  { h: 'Reading: Zoe', de: 'Lies den Text und beantworte die Fragen in ganzen Sätzen.', topic: 'read', parts: [
    { t: 'open', full: true, text: 'Hi, I’m Zoe and I’m eleven. I’m from Brighton. My parents are divorced. I live with my mum and my sister Holly in a small house. Holly is seven. Her favourite animal is the snake – weird! My dad lives in London. I’m at Varndean School. I like art and history, and my favourite colour is purple. Sometimes my dad and I hang out at the beach. It’s great!',
      items: [
      ['How old is Holly?', [/seven|\b7\b/], 'She’s seven.'],
      ['What is Holly’s favourite animal?', [/snake/], 'Her favourite animal is the snake.'],
      ['Is Zoe from London?', [/\bno\b|is not|brighton/], 'No, she isn’t. She’s from Brighton.'],
      ['What is Zoe’s favourite colour?', [/purple/], 'Her favourite colour is purple.'],
      ['Are Zoe’s parents together?', [/\bno\b|are not|divorced/], 'No, they aren’t. They’re divorced.'],
      ['Who is Holly?', [/sister/], 'She’s Zoe’s sister.'] ] }
  ]},
  { h: 'Writing: My family', de: 'Schreib etwa 10 Sätze über deine Familie – ganz ohne Hilfe, wie in der Klassenarbeit.', topic: 'family', parts: [
    { t: 'write', kind: 'family' }
  ]}
]}
];
