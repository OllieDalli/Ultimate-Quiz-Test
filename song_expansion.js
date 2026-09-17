// ============================================================
// ULTIMATE QUIZ — EXTRA NAME THAT SONG LIBRARY
// Loaded after question_types.js. Adds a large mix of 80s, 90s, 2000s and modern tracks.
// ============================================================

(function loadExtraSongLibrary() {
    const extraSongs = [
    {
        id: "song-181",
        era: "80s",
        title: "Jump",
        artist: "Van Halen",
        answers: ["Jump", "Walk Like an Egyptian", "You Spin Me Round (Like a Record)", "The Look"]
    },
    {
        id: "song-182",
        era: "80s",
        title: "Walk Like an Egyptian",
        artist: "The Bangles",
        answers: ["Walk Like an Egyptian", "Listen to Your Heart", "Never Tear Us Apart", "What a Feeling"]
    },
    {
        id: "song-183",
        era: "80s",
        title: "You Spin Me Round (Like a Record)",
        artist: "Dead or Alive",
        answers: ["You Spin Me Round (Like a Record)", "The Look", "Listen to Your Heart", "Never Tear Us Apart"]
    },
    {
        id: "song-184",
        era: "80s",
        title: "The Look",
        artist: "Roxette",
        answers: ["The Look", "Listen to Your Heart", "Never Tear Us Apart", "Need You Tonight"]
    },
    {
        id: "song-185",
        era: "80s",
        title: "Listen to Your Heart",
        artist: "Roxette",
        answers: ["Listen to Your Heart", "Never Tear Us Apart", "Need You Tonight", "What a Feeling"]
    },
    {
        id: "song-186",
        era: "80s",
        title: "Never Tear Us Apart",
        artist: "INXS",
        answers: ["Never Tear Us Apart", "Need You Tonight", "What a Feeling", "Flashdance... What a Feeling"]
    },
    {
        id: "song-187",
        era: "80s",
        title: "Need You Tonight",
        artist: "INXS",
        answers: ["Need You Tonight", "What a Feeling", "Flashdance... What a Feeling", "Take My Breath Away"]
    },
    {
        id: "song-188",
        era: "80s",
        title: "What a Feeling",
        artist: "Irene Cara",
        answers: ["What a Feeling", "Flashdance... What a Feeling", "Take My Breath Away", "St. Elmo's Fire (Man in Motion)"]
    },
    {
        id: "song-189",
        era: "80s",
        title: "Flashdance... What a Feeling",
        artist: "Irene Cara",
        answers: ["Flashdance... What a Feeling", "Take My Breath Away", "St. Elmo's Fire (Man in Motion)", "Maniac"]
    },
    {
        id: "song-190",
        era: "80s",
        title: "Take My Breath Away",
        artist: "Berlin",
        answers: ["Take My Breath Away", "St. Elmo's Fire (Man in Motion)", "Maniac", "Centerfold"]
    },
    {
        id: "song-191",
        era: "80s",
        title: "St. Elmo's Fire (Man in Motion)",
        artist: "John Parr",
        answers: ["St. Elmo's Fire (Man in Motion)", "Maniac", "Centerfold", "Jessie's Girl"]
    },
    {
        id: "song-192",
        era: "80s",
        title: "Maniac",
        artist: "Michael Sembello",
        answers: ["Maniac", "Centerfold", "Jessie's Girl", "The Boys Are Back in Town"]
    },
    {
        id: "song-193",
        era: "80s",
        title: "Centerfold",
        artist: "The J. Geils Band",
        answers: ["Centerfold", "Jessie's Girl", "The Boys Are Back in Town", "Shaddap You Face"]
    },
    {
        id: "song-194",
        era: "80s",
        title: "Jessie's Girl",
        artist: "Rick Springfield",
        answers: ["Jessie's Girl", "The Boys Are Back in Town", "Shaddap You Face", "Vienna"]
    },
    {
        id: "song-195",
        era: "80s",
        title: "The Boys Are Back in Town",
        artist: "The Bus Boys",
        answers: ["The Boys Are Back in Town", "Shaddap You Face", "Vienna", "Don't You (Forget About Me)"]
    },
    {
        id: "song-196",
        era: "80s",
        title: "Shaddap You Face",
        artist: "Joe Dolce Music Theatre",
        answers: ["Shaddap You Face", "Vienna", "Don't You (Forget About Me)", "Alive and Kicking"]
    },
    {
        id: "song-197",
        era: "80s",
        title: "Vienna",
        artist: "Ultravox",
        answers: ["Vienna", "Don't You (Forget About Me)", "Alive and Kicking", "Sledgehammer"]
    },
    {
        id: "song-198",
        era: "80s",
        title: "Don't You (Forget About Me)",
        artist: "Simple Minds",
        answers: ["Don't You (Forget About Me)", "Alive and Kicking", "Sledgehammer", "Red Rain"]
    },
    {
        id: "song-199",
        era: "80s",
        title: "Alive and Kicking",
        artist: "Simple Minds",
        answers: ["Alive and Kicking", "Sledgehammer", "Red Rain", "You Can Call Me Al"]
    },
    {
        id: "song-200",
        era: "80s",
        title: "Sledgehammer",
        artist: "Peter Gabriel",
        answers: ["Sledgehammer", "Red Rain", "You Can Call Me Al", "The Lady in Red"]
    },
    {
        id: "song-201",
        era: "80s",
        title: "Red Rain",
        artist: "Peter Gabriel",
        answers: ["Red Rain", "You Can Call Me Al", "The Lady in Red", "True Colors"]
    },
    {
        id: "song-202",
        era: "80s",
        title: "You Can Call Me Al",
        artist: "Paul Simon",
        answers: ["You Can Call Me Al", "The Lady in Red", "True Colors", "All Night Long (All Night)"]
    },
    {
        id: "song-203",
        era: "80s",
        title: "The Lady in Red",
        artist: "Chris de Burgh",
        answers: ["The Lady in Red", "True Colors", "All Night Long (All Night)", "Hello"]
    },
    {
        id: "song-204",
        era: "80s",
        title: "True Colors",
        artist: "Cyndi Lauper",
        answers: ["True Colors", "All Night Long (All Night)", "Hello", "Easy Lover"]
    },
    {
        id: "song-205",
        era: "80s",
        title: "All Night Long (All Night)",
        artist: "Lionel Richie",
        answers: ["All Night Long (All Night)", "Hello", "Easy Lover", "Against All Odds (Take a Look at Me Now)"]
    },
    {
        id: "song-206",
        era: "80s",
        title: "Hello",
        artist: "Lionel Richie",
        answers: ["Hello", "Easy Lover", "Against All Odds (Take a Look at Me Now)", "Another Day in Paradise"]
    },
    {
        id: "song-207",
        era: "80s",
        title: "Easy Lover",
        artist: "Philip Bailey & Phil Collins",
        answers: ["Easy Lover", "Against All Odds (Take a Look at Me Now)", "Another Day in Paradise", "In the Air Tonight"]
    },
    {
        id: "song-208",
        era: "80s",
        title: "Against All Odds (Take a Look at Me Now)",
        artist: "Phil Collins",
        answers: ["Against All Odds (Take a Look at Me Now)", "Another Day in Paradise", "In the Air Tonight", "Simply Irresistible"]
    },
    {
        id: "song-209",
        era: "80s",
        title: "Another Day in Paradise",
        artist: "Phil Collins",
        answers: ["Another Day in Paradise", "In the Air Tonight", "Simply Irresistible", "Addicted to Love"]
    },
    {
        id: "song-210",
        era: "80s",
        title: "In the Air Tonight",
        artist: "Phil Collins",
        answers: ["In the Air Tonight", "Simply Irresistible", "Addicted to Love", "Everybody Wants to Rule the World"]
    },
    {
        id: "song-211",
        era: "80s",
        title: "Simply Irresistible",
        artist: "Robert Palmer",
        answers: ["Simply Irresistible", "Addicted to Love", "Everybody Wants to Rule the World", "Shout"]
    },
    {
        id: "song-212",
        era: "80s",
        title: "Addicted to Love",
        artist: "Robert Palmer",
        answers: ["Addicted to Love", "Everybody Wants to Rule the World", "Shout", "Head Over Heels"]
    },
    {
        id: "song-213",
        era: "80s",
        title: "Everybody Wants to Rule the World",
        artist: "Tears for Fears",
        answers: ["Everybody Wants to Rule the World", "Shout", "Head Over Heels", "Broken Wings"]
    },
    {
        id: "song-214",
        era: "80s",
        title: "Shout",
        artist: "Tears for Fears",
        answers: ["Shout", "Head Over Heels", "Broken Wings", "Walking in Memphis"]
    },
    {
        id: "song-215",
        era: "80s",
        title: "Head Over Heels",
        artist: "Tears for Fears",
        answers: ["Head Over Heels", "Broken Wings", "Walking in Memphis", "I Wanna Be a Cowboy"]
    },
    {
        id: "song-216",
        era: "80s",
        title: "Broken Wings",
        artist: "Mr. Mister",
        answers: ["Broken Wings", "Walking in Memphis", "I Wanna Be a Cowboy", "Mickey"]
    },
    {
        id: "song-217",
        era: "80s",
        title: "Walking in Memphis",
        artist: "Marc Cohn",
        answers: ["Walking in Memphis", "I Wanna Be a Cowboy", "Mickey", "99 Luftballons"]
    },
    {
        id: "song-218",
        era: "80s",
        title: "I Wanna Be a Cowboy",
        artist: "Boys Don't Cry",
        answers: ["I Wanna Be a Cowboy", "Mickey", "99 Luftballons", "Toy Soldiers"]
    },
    {
        id: "song-219",
        era: "80s",
        title: "Mickey",
        artist: "Toni Basil",
        answers: ["Mickey", "99 Luftballons", "Toy Soldiers", "Break My Stride"]
    },
    {
        id: "song-220",
        era: "80s",
        title: "99 Luftballons",
        artist: "Nena",
        answers: ["99 Luftballons", "Toy Soldiers", "Break My Stride", "The Tide Is High"]
    },
    {
        id: "song-221",
        era: "80s",
        title: "Toy Soldiers",
        artist: "Martika",
        answers: ["Toy Soldiers", "Break My Stride", "The Tide Is High", "Call Me"]
    },
    {
        id: "song-222",
        era: "80s",
        title: "Break My Stride",
        artist: "Matthew Wilder",
        answers: ["Break My Stride", "The Tide Is High", "Call Me", "Bette Davis Eyes"]
    },
    {
        id: "song-223",
        era: "80s",
        title: "The Tide Is High",
        artist: "Blondie",
        answers: ["The Tide Is High", "Call Me", "Bette Davis Eyes", "Kids in America"]
    },
    {
        id: "song-224",
        era: "80s",
        title: "Call Me",
        artist: "Blondie",
        answers: ["Call Me", "Bette Davis Eyes", "Kids in America", "You Keep Me Hangin' On"]
    },
    {
        id: "song-225",
        era: "80s",
        title: "Bette Davis Eyes",
        artist: "Kim Carnes",
        answers: ["Bette Davis Eyes", "Kids in America", "You Keep Me Hangin' On", "What's Love Got to Do with It"]
    },
    {
        id: "song-226",
        era: "80s",
        title: "Kids in America",
        artist: "Kim Wilde",
        answers: ["Kids in America", "You Keep Me Hangin' On", "What's Love Got to Do with It", "Private Dancer"]
    },
    {
        id: "song-227",
        era: "80s",
        title: "You Keep Me Hangin' On",
        artist: "Kim Wilde",
        answers: ["You Keep Me Hangin' On", "What's Love Got to Do with It", "Private Dancer", "We Don't Need Another Hero"]
    },
    {
        id: "song-228",
        era: "80s",
        title: "What's Love Got to Do with It",
        artist: "Tina Turner",
        answers: ["What's Love Got to Do with It", "Private Dancer", "We Don't Need Another Hero", "Simply the Best"]
    },
    {
        id: "song-229",
        era: "80s",
        title: "Private Dancer",
        artist: "Tina Turner",
        answers: ["Private Dancer", "We Don't Need Another Hero", "Simply the Best", "Take on Me"]
    },
    {
        id: "song-230",
        era: "80s",
        title: "We Don't Need Another Hero",
        artist: "Tina Turner",
        answers: ["We Don't Need Another Hero", "Simply the Best", "Take on Me", "Billie Jean"]
    },
    {
        id: "song-231",
        era: "90s",
        title: "Wonderwall",
        artist: "Oasis",
        answers: ["Wonderwall", "Don't Look Back in Anger", "Live Forever", "Champagne Supernova"]
    },
    {
        id: "song-232",
        era: "90s",
        title: "Don't Look Back in Anger",
        artist: "Oasis",
        answers: ["Don't Look Back in Anger", "Live Forever", "Champagne Supernova", "Common People"]
    },
    {
        id: "song-233",
        era: "90s",
        title: "Live Forever",
        artist: "Oasis",
        answers: ["Live Forever", "Champagne Supernova", "Common People", "Disco 2000"]
    },
    {
        id: "song-234",
        era: "90s",
        title: "Champagne Supernova",
        artist: "Oasis",
        answers: ["Champagne Supernova", "Common People", "Disco 2000", "Song 2"]
    },
    {
        id: "song-235",
        era: "90s",
        title: "Common People",
        artist: "Pulp",
        answers: ["Common People", "Disco 2000", "Song 2", "Parklife"]
    },
    {
        id: "song-236",
        era: "90s",
        title: "Disco 2000",
        artist: "Pulp",
        answers: ["Disco 2000", "Song 2", "Parklife", "Girls & Boys"]
    },
    {
        id: "song-237",
        era: "90s",
        title: "Song 2",
        artist: "Blur",
        answers: ["Song 2", "Parklife", "Girls & Boys", "Bittersweet Symphony"]
    },
    {
        id: "song-238",
        era: "90s",
        title: "Parklife",
        artist: "Blur",
        answers: ["Parklife", "Girls & Boys", "Bittersweet Symphony", "The Drugs Don't Work"]
    },
    {
        id: "song-239",
        era: "90s",
        title: "Girls & Boys",
        artist: "Blur",
        answers: ["Girls & Boys", "Bittersweet Symphony", "The Drugs Don't Work", "Creep"]
    },
    {
        id: "song-240",
        era: "90s",
        title: "Bittersweet Symphony",
        artist: "The Verve",
        answers: ["Bittersweet Symphony", "The Drugs Don't Work", "Creep", "Karma Police"]
    },
    {
        id: "song-241",
        era: "90s",
        title: "The Drugs Don't Work",
        artist: "The Verve",
        answers: ["The Drugs Don't Work", "Creep", "Karma Police", "No Surprises"]
    },
    {
        id: "song-242",
        era: "90s",
        title: "Creep",
        artist: "Radiohead",
        answers: ["Creep", "Karma Police", "No Surprises", "Basket Case"]
    },
    {
        id: "song-243",
        era: "90s",
        title: "Karma Police",
        artist: "Radiohead",
        answers: ["Karma Police", "No Surprises", "Basket Case", "When I Come Around"]
    },
    {
        id: "song-244",
        era: "90s",
        title: "No Surprises",
        artist: "Radiohead",
        answers: ["No Surprises", "Basket Case", "When I Come Around", "Smells Like Teen Spirit"]
    },
    {
        id: "song-245",
        era: "90s",
        title: "Basket Case",
        artist: "Green Day",
        answers: ["Basket Case", "When I Come Around", "Smells Like Teen Spirit", "Come as You Are"]
    },
    {
        id: "song-246",
        era: "90s",
        title: "When I Come Around",
        artist: "Green Day",
        answers: ["When I Come Around", "Smells Like Teen Spirit", "Come as You Are", "Under the Bridge"]
    },
    {
        id: "song-247",
        era: "90s",
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        answers: ["Smells Like Teen Spirit", "Come as You Are", "Under the Bridge", "Californication"]
    },
    {
        id: "song-248",
        era: "90s",
        title: "Come as You Are",
        artist: "Nirvana",
        answers: ["Come as You Are", "Under the Bridge", "Californication", "Losing My Religion"]
    },
    {
        id: "song-249",
        era: "90s",
        title: "Under the Bridge",
        artist: "Red Hot Chili Peppers",
        answers: ["Under the Bridge", "Californication", "Losing My Religion", "Everybody Hurts"]
    },
    {
        id: "song-250",
        era: "90s",
        title: "Californication",
        artist: "Red Hot Chili Peppers",
        answers: ["Californication", "Losing My Religion", "Everybody Hurts", "What Is Love"]
    },
    {
        id: "song-251",
        era: "90s",
        title: "Losing My Religion",
        artist: "R.E.M.",
        answers: ["Losing My Religion", "Everybody Hurts", "What Is Love", "Rhythm Is a Dancer"]
    },
    {
        id: "song-252",
        era: "90s",
        title: "Everybody Hurts",
        artist: "R.E.M.",
        answers: ["Everybody Hurts", "What Is Love", "Rhythm Is a Dancer", "Freed from Desire"]
    },
    {
        id: "song-253",
        era: "90s",
        title: "Rhythm Is a Dancer",
        artist: "Snap!",
        answers: ["Rhythm Is a Dancer", "Freed from Desire", "Blue (Da Ba Dee)", "Finally"]
    },
    {
        id: "song-254",
        era: "90s",
        title: "Freed from Desire",
        artist: "Gala",
        answers: ["Freed from Desire", "Blue (Da Ba Dee)", "Finally", "Show Me Love"]
    },
    {
        id: "song-255",
        era: "90s",
        title: "Blue (Da Ba Dee)",
        artist: "Eiffel 65",
        answers: ["Blue (Da Ba Dee)", "Finally", "Show Me Love", "No Limit"]
    },
    {
        id: "song-256",
        era: "90s",
        title: "Finally",
        artist: "CeCe Peniston",
        answers: ["Finally", "Show Me Love", "No Limit", "Believe"]
    },
    {
        id: "song-257",
        era: "90s",
        title: "Show Me Love",
        artist: "Robin S.",
        answers: ["Show Me Love", "No Limit", "Believe", "Torn"]
    },
    {
        id: "song-258",
        era: "90s",
        title: "No Limit",
        artist: "2 Unlimited",
        answers: ["No Limit", "Believe", "Torn", "Ironic"]
    },
    {
        id: "song-259",
        era: "90s",
        title: "Believe",
        artist: "Cher",
        answers: ["Believe", "Torn", "Ironic", "You Oughta Know"]
    },
    {
        id: "song-260",
        era: "90s",
        title: "Torn",
        artist: "Natalie Imbruglia",
        answers: ["Torn", "Ironic", "You Oughta Know", "I Want It That Way"]
    },
    {
        id: "song-261",
        era: "90s",
        title: "Ironic",
        artist: "Alanis Morissette",
        answers: ["Ironic", "You Oughta Know", "I Want It That Way", "Everybody (Backstreet's Back)"]
    },
    {
        id: "song-262",
        era: "90s",
        title: "You Oughta Know",
        artist: "Alanis Morissette",
        answers: ["You Oughta Know", "I Want It That Way", "Everybody (Backstreet's Back)", "...Baby One More Time"]
    },
    {
        id: "song-263",
        era: "90s",
        title: "I Want It That Way",
        artist: "Backstreet Boys",
        answers: ["I Want It That Way", "Everybody (Backstreet's Back)", "...Baby One More Time", "Genie in a Bottle"]
    },
    {
        id: "song-264",
        era: "90s",
        title: "Everybody (Backstreet's Back)",
        artist: "Backstreet Boys",
        answers: ["Everybody (Backstreet's Back)", "...Baby One More Time", "Genie in a Bottle", "Wannabe"]
    },
    {
        id: "song-265",
        era: "90s",
        title: "...Baby One More Time",
        artist: "Britney Spears",
        answers: ["...Baby One More Time", "Genie in a Bottle", "Wannabe", "Say My Name"]
    },
    {
        id: "song-266",
        era: "90s",
        title: "Genie in a Bottle",
        artist: "Christina Aguilera",
        answers: ["Genie in a Bottle", "Wannabe", "Say My Name", "No Scrubs"]
    },
    {
        id: "song-267",
        era: "90s",
        title: "Wannabe",
        artist: "Spice Girls",
        answers: ["Wannabe", "Say My Name", "No Scrubs", "Waterfalls"]
    },
    {
        id: "song-268",
        era: "90s",
        title: "Say My Name",
        artist: "Destiny's Child",
        answers: ["Say My Name", "No Scrubs", "Waterfalls", "Man! I Feel Like a Woman!"]
    },
    {
        id: "song-269",
        era: "90s",
        title: "No Scrubs",
        artist: "TLC",
        answers: ["No Scrubs", "Waterfalls", "Man! I Feel Like a Woman!", "My Heart Will Go On"]
    },
    {
        id: "song-270",
        era: "90s",
        title: "Waterfalls",
        artist: "TLC",
        answers: ["Waterfalls", "Man! I Feel Like a Woman!", "My Heart Will Go On", "Truly Madly Deeply"]
    },
    {
        id: "song-271",
        era: "90s",
        title: "Man! I Feel Like a Woman!",
        artist: "Shania Twain",
        answers: ["Man! I Feel Like a Woman!", "My Heart Will Go On", "Truly Madly Deeply", "Kiss Me"]
    },
    {
        id: "song-272",
        era: "90s",
        title: "My Heart Will Go On",
        artist: "Celine Dion",
        answers: ["My Heart Will Go On", "Truly Madly Deeply", "Kiss Me", "Steal My Sunshine"]
    },
    {
        id: "song-273",
        era: "90s",
        title: "Truly Madly Deeply",
        artist: "Savage Garden",
        answers: ["Truly Madly Deeply", "Kiss Me", "Steal My Sunshine", "Wonderwall"]
    },
    {
        id: "song-274",
        era: "90s",
        title: "I Knew I Loved You",
        artist: "Savage Garden",
        answers: ["I Knew I Loved You", "Kiss Me", "Steal My Sunshine", "Wonderwall"]
    },
    {
        id: "song-275",
        era: "90s",
        title: "Kiss Me",
        artist: "Sixpence None the Richer",
        answers: ["Kiss Me", "Steal My Sunshine", "Wonderwall", "Don't Look Back in Anger"]
    },
    {
        id: "song-276",
        era: "90s",
        title: "Steal My Sunshine",
        artist: "Len",
        answers: ["Steal My Sunshine", "Wonderwall", "Don't Look Back in Anger", "Live Forever"]
    },
    {
        id: "song-277",
        era: "2000s",
        title: "Mr. Brightside",
        artist: "The Killers",
        answers: ["Mr. Brightside", "Somebody Told Me", "When You Were Young", "Take Me Out"]
    },
    {
        id: "song-278",
        era: "2000s",
        title: "Somebody Told Me",
        artist: "The Killers",
        answers: ["Somebody Told Me", "When You Were Young", "Take Me Out", "Do You Want To"]
    },
    {
        id: "song-279",
        era: "2000s",
        title: "When You Were Young",
        artist: "The Killers",
        answers: ["When You Were Young", "Take Me Out", "Do You Want To", "Chelsea Dagger"]
    },
    {
        id: "song-280",
        era: "2000s",
        title: "Take Me Out",
        artist: "Franz Ferdinand",
        answers: ["Take Me Out", "Do You Want To", "Chelsea Dagger", "Naive"]
    },
    {
        id: "song-281",
        era: "2000s",
        title: "Do You Want To",
        artist: "Franz Ferdinand",
        answers: ["Do You Want To", "Chelsea Dagger", "Naive", "She Moves in Her Own Way"]
    },
    {
        id: "song-282",
        era: "2000s",
        title: "Chelsea Dagger",
        artist: "The Fratellis",
        answers: ["Chelsea Dagger", "Naive", "She Moves in Her Own Way", "I Bet You Look Good on the Dancefloor"]
    },
    {
        id: "song-283",
        era: "2000s",
        title: "Naive",
        artist: "The Kooks",
        answers: ["Naive", "She Moves in Her Own Way", "I Bet You Look Good on the Dancefloor", "Fluorescent Adolescent"]
    },
    {
        id: "song-284",
        era: "2000s",
        title: "She Moves in Her Own Way",
        artist: "The Kooks",
        answers: ["She Moves in Her Own Way", "I Bet You Look Good on the Dancefloor", "Fluorescent Adolescent", "Ruby"]
    },
    {
        id: "song-285",
        era: "2000s",
        title: "I Bet You Look Good on the Dancefloor",
        artist: "Arctic Monkeys",
        answers: ["I Bet You Look Good on the Dancefloor", "Fluorescent Adolescent", "Ruby", "Oh My God"]
    },
    {
        id: "song-286",
        era: "2000s",
        title: "Fluorescent Adolescent",
        artist: "Arctic Monkeys",
        answers: ["Fluorescent Adolescent", "Ruby", "Oh My God", "Dakota"]
    },
    {
        id: "song-287",
        era: "2000s",
        title: "Ruby",
        artist: "Kaiser Chiefs",
        answers: ["Ruby", "Oh My God", "Dakota", "Have a Nice Day"]
    },
    {
        id: "song-288",
        era: "2000s",
        title: "Oh My God",
        artist: "Kaiser Chiefs",
        answers: ["Oh My God", "Dakota", "Have a Nice Day", "The Importance of Being Idle"]
    },
    {
        id: "song-289",
        era: "2000s",
        title: "Dakota",
        artist: "Stereophonics",
        answers: ["Dakota", "Have a Nice Day", "The Importance of Being Idle", "Are You Gonna Be My Girl"]
    },
    {
        id: "song-290",
        era: "2000s",
        title: "Have a Nice Day",
        artist: "Stereophonics",
        answers: ["Have a Nice Day", "The Importance of Being Idle", "Are You Gonna Be My Girl", "Sex on Fire"]
    },
    {
        id: "song-291",
        era: "2000s",
        title: "The Importance of Being Idle",
        artist: "Oasis",
        answers: ["The Importance of Being Idle", "Are You Gonna Be My Girl", "Sex on Fire", "Use Somebody"]
    },
    {
        id: "song-292",
        era: "2000s",
        title: "Are You Gonna Be My Girl",
        artist: "Jet",
        answers: ["Are You Gonna Be My Girl", "Sex on Fire", "Use Somebody", "Rehab"]
    },
    {
        id: "song-293",
        era: "2000s",
        title: "Sex on Fire",
        artist: "Kings of Leon",
        answers: ["Sex on Fire", "Use Somebody", "Rehab", "Back to Black"]
    },
    {
        id: "song-294",
        era: "2000s",
        title: "Use Somebody",
        artist: "Kings of Leon",
        answers: ["Use Somebody", "Rehab", "Back to Black", "Valerie"]
    },
    {
        id: "song-295",
        era: "2000s",
        title: "Rehab",
        artist: "Amy Winehouse",
        answers: ["Rehab", "Back to Black", "Valerie", "Crazy"]
    },
    {
        id: "song-296",
        era: "2000s",
        title: "Back to Black",
        artist: "Amy Winehouse",
        answers: ["Back to Black", "Valerie", "Crazy", "Paper Planes"]
    },
    {
        id: "song-297",
        era: "2000s",
        title: "Valerie",
        artist: "Mark Ronson feat. Amy Winehouse",
        answers: ["Valerie", "Crazy", "Paper Planes", "Hey Ya!"]
    },
    {
        id: "song-298",
        era: "2000s",
        title: "Crazy",
        artist: "Gnarls Barkley",
        answers: ["Crazy", "Paper Planes", "Hey Ya!", "Crazy in Love"]
    },
    {
        id: "song-299",
        era: "2000s",
        title: "Paper Planes",
        artist: "M.I.A.",
        answers: ["Paper Planes", "Hey Ya!", "Crazy in Love", "Umbrella"]
    },
    {
        id: "song-300",
        era: "2000s",
        title: "Hey Ya!",
        artist: "Outkast",
        answers: ["Hey Ya!", "Crazy in Love", "Umbrella", "Disturbia"]
    },
    {
        id: "song-301",
        era: "2000s",
        title: "Crazy in Love",
        artist: "Beyoncé feat. Jay-Z",
        answers: ["Crazy in Love", "Umbrella", "Disturbia", "Poker Face"]
    },
    {
        id: "song-302",
        era: "2000s",
        title: "Umbrella",
        artist: "Rihanna feat. Jay-Z",
        answers: ["Umbrella", "Disturbia", "Poker Face", "Just Dance"]
    },
    {
        id: "song-303",
        era: "2000s",
        title: "Disturbia",
        artist: "Rihanna",
        answers: ["Disturbia", "Poker Face", "Just Dance", "Bad Romance"]
    },
    {
        id: "song-304",
        era: "2000s",
        title: "Poker Face",
        artist: "Lady Gaga",
        answers: ["Poker Face", "Just Dance", "Bad Romance", "Hips Don't Lie"]
    },
    {
        id: "song-305",
        era: "2000s",
        title: "Just Dance",
        artist: "Lady Gaga",
        answers: ["Just Dance", "Bad Romance", "Hips Don't Lie", "Whenever, Wherever"]
    },
    {
        id: "song-306",
        era: "2000s",
        title: "Bad Romance",
        artist: "Lady Gaga",
        answers: ["Bad Romance", "Hips Don't Lie", "Whenever, Wherever", "Hot in Herre"]
    },
    {
        id: "song-307",
        era: "2000s",
        title: "Hips Don't Lie",
        artist: "Shakira feat. Wyclef Jean",
        answers: ["Hips Don't Lie", "Whenever, Wherever", "Hot in Herre", "In da Club"]
    },
    {
        id: "song-308",
        era: "2000s",
        title: "Whenever, Wherever",
        artist: "Shakira",
        answers: ["Whenever, Wherever", "Hot in Herre", "In da Club", "Yeah!"]
    },
    {
        id: "song-309",
        era: "2000s",
        title: "Hot in Herre",
        artist: "Nelly",
        answers: ["Hot in Herre", "In da Club", "Yeah!", "Hey There Delilah"]
    },
    {
        id: "song-310",
        era: "2000s",
        title: "In da Club",
        artist: "50 Cent",
        answers: ["In da Club", "Yeah!", "Hey There Delilah", "Chasing Cars"]
    },
    {
        id: "song-311",
        era: "2000s",
        title: "Yeah!",
        artist: "Usher feat. Lil Jon & Ludacris",
        answers: ["Yeah!", "Hey There Delilah", "Chasing Cars", "Run"]
    },
    {
        id: "song-312",
        era: "2000s",
        title: "Hey There Delilah",
        artist: "Plain White T's",
        answers: ["Hey There Delilah", "Chasing Cars", "Run", "Somewhere Only We Know"]
    },
    {
        id: "song-313",
        era: "2000s",
        title: "Chasing Cars",
        artist: "Snow Patrol",
        answers: ["Chasing Cars", "Run", "Somewhere Only We Know", "Everybody's Changing"]
    },
    {
        id: "song-314",
        era: "2000s",
        title: "Run",
        artist: "Snow Patrol",
        answers: ["Run", "Somewhere Only We Know", "Everybody's Changing", "Yellow"]
    },
    {
        id: "song-315",
        era: "2000s",
        title: "Somewhere Only We Know",
        artist: "Keane",
        answers: ["Somewhere Only We Know", "Everybody's Changing", "Yellow", "The Scientist"]
    },
    {
        id: "song-316",
        era: "2000s",
        title: "Everybody's Changing",
        artist: "Keane",
        answers: ["Everybody's Changing", "Yellow", "The Scientist", "Fix You"]
    },
    {
        id: "song-317",
        era: "2000s",
        title: "Yellow",
        artist: "Coldplay",
        answers: ["Yellow", "The Scientist", "Fix You", "Viva la Vida"]
    },
    {
        id: "song-318",
        era: "2000s",
        title: "The Scientist",
        artist: "Coldplay",
        answers: ["The Scientist", "Fix You", "Viva la Vida", "Clocks"]
    },
    {
        id: "song-319",
        era: "2000s",
        title: "Fix You",
        artist: "Coldplay",
        answers: ["Fix You", "Viva la Vida", "Clocks", "Beautiful Day"]
    },
    {
        id: "song-320",
        era: "2000s",
        title: "Viva la Vida",
        artist: "Coldplay",
        answers: ["Viva la Vida", "Clocks", "Beautiful Day", "Vertigo"]
    },
    {
        id: "song-321",
        era: "2000s",
        title: "Clocks",
        artist: "Coldplay",
        answers: ["Clocks", "Beautiful Day", "Vertigo", "Seven Nation Army"]
    },
    {
        id: "song-322",
        era: "2000s",
        title: "Beautiful Day",
        artist: "U2",
        answers: ["Beautiful Day", "Vertigo", "Seven Nation Army", "Last Nite"]
    },
    {
        id: "song-323",
        era: "2000s",
        title: "Vertigo",
        artist: "U2",
        answers: ["Vertigo", "Seven Nation Army", "Last Nite", "Reptilia"]
    },
    {
        id: "song-324",
        era: "2000s",
        title: "Seven Nation Army",
        artist: "The White Stripes",
        answers: ["Seven Nation Army", "Last Nite", "Reptilia", "Lonely Boy"]
    },
    {
        id: "song-325",
        era: "2000s",
        title: "Last Nite",
        artist: "The Strokes",
        answers: ["Last Nite", "Reptilia", "Lonely Boy", "Take Your Mama"]
    },
    {
        id: "song-326",
        era: "2000s",
        title: "Reptilia",
        artist: "The Strokes",
        answers: ["Reptilia", "Lonely Boy", "Take Your Mama", "I Believe in a Thing Called Love"]
    },
    {
        id: "song-327",
        era: "2000s",
        title: "Lonely Boy",
        artist: "The Black Keys",
        answers: ["Lonely Boy", "Take Your Mama", "I Believe in a Thing Called Love", "Suddenly I See"]
    },
    {
        id: "song-328",
        era: "2000s",
        title: "Take Your Mama",
        artist: "Scissor Sisters",
        answers: ["Take Your Mama", "I Believe in a Thing Called Love", "Suddenly I See", "Murder on the Dancefloor"]
    },
    {
        id: "song-329",
        era: "2000s",
        title: "I Believe in a Thing Called Love",
        artist: "The Darkness",
        answers: ["I Believe in a Thing Called Love", "Suddenly I See", "Murder on the Dancefloor", "Don't Stop Movin'"]
    },
    {
        id: "song-330",
        era: "2000s",
        title: "Suddenly I See",
        artist: "KT Tunstall",
        answers: ["Suddenly I See", "Murder on the Dancefloor", "Don't Stop Movin'", "Reach"]
    },
    {
        id: "song-331",
        era: "2000s",
        title: "Murder on the Dancefloor",
        artist: "Sophie Ellis-Bextor",
        answers: ["Murder on the Dancefloor", "Don't Stop Movin'", "Reach", "Bleeding Love"]
    },
    {
        id: "song-332",
        era: "2000s",
        title: "Don't Stop Movin'",
        artist: "S Club 7",
        answers: ["Don't Stop Movin'", "Reach", "Bleeding Love", "Beautiful Soul"]
    },
    {
        id: "song-333",
        era: "2000s",
        title: "Reach",
        artist: "S Club 7",
        answers: ["Reach", "Bleeding Love", "Beautiful Soul", "Apologize"]
    },
    {
        id: "song-334",
        era: "2000s",
        title: "Bleeding Love",
        artist: "Leona Lewis",
        answers: ["Bleeding Love", "Beautiful Soul", "Apologize", "Mr. Brightside"]
    },
    {
        id: "song-335",
        era: "2000s",
        title: "Beautiful Soul",
        artist: "Jesse McCartney",
        answers: ["Beautiful Soul", "Apologize", "Mr. Brightside", "Somebody Told Me"]
    },
    {
        id: "song-336",
        era: "2000s",
        title: "Apologize",
        artist: "Timbaland feat. OneRepublic",
        answers: ["Apologize", "Mr. Brightside", "Somebody Told Me", "When You Were Young"]
    },
    {
        id: "song-337",
        era: "Modern",
        title: "Rolling in the Deep",
        artist: "Adele",
        answers: ["Rolling in the Deep", "Someone Like You", "Set Fire to the Rain", "Hello"]
    },
    {
        id: "song-338",
        era: "Modern",
        title: "Someone Like You",
        artist: "Adele",
        answers: ["Someone Like You", "Set Fire to the Rain", "Hello", "Uptown Funk"]
    },
    {
        id: "song-339",
        era: "Modern",
        title: "Set Fire to the Rain",
        artist: "Adele",
        answers: ["Set Fire to the Rain", "Hello", "Uptown Funk", "Locked Out of Heaven"]
    },
    {
        id: "song-340",
        era: "Modern",
        title: "Hello",
        artist: "Adele",
        answers: ["Hello", "Uptown Funk", "Locked Out of Heaven", "Just the Way You Are"]
    },
    {
        id: "song-341",
        era: "Modern",
        title: "Uptown Funk",
        artist: "Mark Ronson feat. Bruno Mars",
        answers: ["Uptown Funk", "Locked Out of Heaven", "Just the Way You Are", "Grenade"]
    },
    {
        id: "song-342",
        era: "Modern",
        title: "Locked Out of Heaven",
        artist: "Bruno Mars",
        answers: ["Locked Out of Heaven", "Just the Way You Are", "Grenade", "Shape of You"]
    },
    {
        id: "song-343",
        era: "Modern",
        title: "Just the Way You Are",
        artist: "Bruno Mars",
        answers: ["Just the Way You Are", "Grenade", "Shape of You", "Castle on the Hill"]
    },
    {
        id: "song-344",
        era: "Modern",
        title: "Grenade",
        artist: "Bruno Mars",
        answers: ["Grenade", "Shape of You", "Castle on the Hill", "Thinking Out Loud"]
    },
    {
        id: "song-345",
        era: "Modern",
        title: "Shape of You",
        artist: "Ed Sheeran",
        answers: ["Shape of You", "Castle on the Hill", "Thinking Out Loud", "Someone You Loved"]
    },
    {
        id: "song-346",
        era: "Modern",
        title: "Castle on the Hill",
        artist: "Ed Sheeran",
        answers: ["Castle on the Hill", "Thinking Out Loud", "Someone You Loved", "Before You Go"]
    },
    {
        id: "song-347",
        era: "Modern",
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        answers: ["Thinking Out Loud", "Someone You Loved", "Before You Go", "Pompeii"]
    },
    {
        id: "song-348",
        era: "Modern",
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        answers: ["Someone You Loved", "Before You Go", "Pompeii", "Happier"]
    },
    {
        id: "song-349",
        era: "Modern",
        title: "Before You Go",
        artist: "Lewis Capaldi",
        answers: ["Before You Go", "Pompeii", "Happier", "Counting Stars"]
    },
    {
        id: "song-350",
        era: "Modern",
        title: "Pompeii",
        artist: "Bastille",
        answers: ["Pompeii", "Happier", "Counting Stars", "Rude"]
    },
    {
        id: "song-351",
        era: "Modern",
        title: "Happier",
        artist: "Marshmello & Bastille",
        answers: ["Happier", "Counting Stars", "Rude", "Royals"]
    },
    {
        id: "song-352",
        era: "Modern",
        title: "Counting Stars",
        artist: "OneRepublic",
        answers: ["Counting Stars", "Rude", "Royals", "Team"]
    },
    {
        id: "song-353",
        era: "Modern",
        title: "Rude",
        artist: "MAGIC!",
        answers: ["Rude", "Royals", "Team", "Get Lucky"]
    },
    {
        id: "song-354",
        era: "Modern",
        title: "Royals",
        artist: "Lorde",
        answers: ["Royals", "Team", "Get Lucky", "Starboy"]
    },
    {
        id: "song-355",
        era: "Modern",
        title: "Team",
        artist: "Lorde",
        answers: ["Team", "Get Lucky", "Starboy", "Can't Feel My Face"]
    },
    {
        id: "song-356",
        era: "Modern",
        title: "Get Lucky",
        artist: "Daft Punk feat. Pharrell Williams",
        answers: ["Get Lucky", "Starboy", "Can't Feel My Face", "Blinding Lights"]
    },
    {
        id: "song-357",
        era: "Modern",
        title: "Starboy",
        artist: "The Weeknd feat. Daft Punk",
        answers: ["Starboy", "Can't Feel My Face", "Blinding Lights", "Closer"]
    },
    {
        id: "song-358",
        era: "Modern",
        title: "Can't Feel My Face",
        artist: "The Weeknd",
        answers: ["Can't Feel My Face", "Blinding Lights", "Closer", "Don't Start Now"]
    },
    {
        id: "song-359",
        era: "Modern",
        title: "Blinding Lights",
        artist: "The Weeknd",
        answers: ["Blinding Lights", "Closer", "Don't Start Now", "New Rules"]
    },
    {
        id: "song-360",
        era: "Modern",
        title: "Closer",
        artist: "The Chainsmokers feat. Halsey",
        answers: ["Closer", "Don't Start Now", "New Rules", "One Kiss"]
    },
    {
        id: "song-361",
        era: "Modern",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        answers: ["Don't Start Now", "New Rules", "One Kiss", "Shallow"]
    },
    {
        id: "song-362",
        era: "Modern",
        title: "New Rules",
        artist: "Dua Lipa",
        answers: ["New Rules", "One Kiss", "Shallow", "A Sky Full of Stars"]
    },
    {
        id: "song-363",
        era: "Modern",
        title: "One Kiss",
        artist: "Calvin Harris & Dua Lipa",
        answers: ["One Kiss", "Shallow", "A Sky Full of Stars", "Paradise"]
    },
    {
        id: "song-364",
        era: "Modern",
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        answers: ["Shallow", "A Sky Full of Stars", "Paradise", "Radioactive"]
    },
    {
        id: "song-365",
        era: "Modern",
        title: "A Sky Full of Stars",
        artist: "Coldplay",
        answers: ["A Sky Full of Stars", "Paradise", "Radioactive", "Believer"]
    },
    {
        id: "song-366",
        era: "Modern",
        title: "Paradise",
        artist: "Coldplay",
        answers: ["Paradise", "Radioactive", "Believer", "Thunder"]
    },
    {
        id: "song-367",
        era: "Modern",
        title: "Radioactive",
        artist: "Imagine Dragons",
        answers: ["Radioactive", "Believer", "Thunder", "Somebody That I Used to Know"]
    },
    {
        id: "song-368",
        era: "Modern",
        title: "Believer",
        artist: "Imagine Dragons",
        answers: ["Believer", "Thunder", "Somebody That I Used to Know", "Take Me to Church"]
    },
    {
        id: "song-369",
        era: "Modern",
        title: "Thunder",
        artist: "Imagine Dragons",
        answers: ["Thunder", "Somebody That I Used to Know", "Take Me to Church", "As It Was"]
    },
    {
        id: "song-370",
        era: "Modern",
        title: "Somebody That I Used to Know",
        artist: "Gotye feat. Kimbra",
        answers: ["Somebody That I Used to Know", "Take Me to Church", "As It Was", "Watermelon Sugar"]
    },
    {
        id: "song-371",
        era: "Modern",
        title: "Take Me to Church",
        artist: "Hozier",
        answers: ["Take Me to Church", "As It Was", "Watermelon Sugar", "Adore You"]
    },
    {
        id: "song-372",
        era: "Modern",
        title: "As It Was",
        artist: "Harry Styles",
        answers: ["As It Was", "Watermelon Sugar", "Adore You", "Flowers"]
    },
    {
        id: "song-373",
        era: "Modern",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        answers: ["Watermelon Sugar", "Adore You", "Flowers", "Midnight Sky"]
    },
    {
        id: "song-374",
        era: "Modern",
        title: "Adore You",
        artist: "Harry Styles",
        answers: ["Adore You", "Flowers", "Midnight Sky", "Anti-Hero"]
    },
    {
        id: "song-375",
        era: "Modern",
        title: "Flowers",
        artist: "Miley Cyrus",
        answers: ["Flowers", "Midnight Sky", "Anti-Hero", "Cruel Summer"]
    },
    {
        id: "song-376",
        era: "Modern",
        title: "Midnight Sky",
        artist: "Miley Cyrus",
        answers: ["Midnight Sky", "Anti-Hero", "Cruel Summer", "Fortnight"]
    },
    {
        id: "song-377",
        era: "Modern",
        title: "Anti-Hero",
        artist: "Taylor Swift",
        answers: ["Anti-Hero", "Cruel Summer", "Fortnight", "Espresso"]
    },
    {
        id: "song-378",
        era: "Modern",
        title: "Cruel Summer",
        artist: "Taylor Swift",
        answers: ["Cruel Summer", "Fortnight", "Espresso", "Please Please Please"]
    },
    {
        id: "song-379",
        era: "Modern",
        title: "Fortnight",
        artist: "Taylor Swift feat. Post Malone",
        answers: ["Fortnight", "Espresso", "Please Please Please", "Birds of a Feather"]
    },
    {
        id: "song-380",
        era: "Modern",
        title: "Espresso",
        artist: "Sabrina Carpenter",
        answers: ["Espresso", "Please Please Please", "Birds of a Feather", "bad guy"]
    },
    {
        id: "song-381",
        era: "Modern",
        title: "Please Please Please",
        artist: "Sabrina Carpenter",
        answers: ["Please Please Please", "Birds of a Feather", "bad guy", "What Was I Made For?"]
    },
    {
        id: "song-382",
        era: "Modern",
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        answers: ["Birds of a Feather", "bad guy", "What Was I Made For?", "Dance The Night"]
    },
    {
        id: "song-383",
        era: "Modern",
        title: "bad guy",
        artist: "Billie Eilish",
        answers: ["bad guy", "What Was I Made For?", "Dance The Night", "Levitating"]
    },
    {
        id: "song-384",
        era: "Modern",
        title: "What Was I Made For?",
        artist: "Billie Eilish",
        answers: ["What Was I Made For?", "Dance The Night", "Levitating", "About Damn Time"]
    },
    {
        id: "song-385",
        era: "Modern",
        title: "Dance The Night",
        artist: "Dua Lipa",
        answers: ["Dance The Night", "Levitating", "About Damn Time", "Good 4 U"]
    },
    {
        id: "song-386",
        era: "Modern",
        title: "Levitating",
        artist: "Dua Lipa",
        answers: ["Levitating", "About Damn Time", "Good 4 U", "Drivers License"]
    },
    {
        id: "song-387",
        era: "Modern",
        title: "About Damn Time",
        artist: "Lizzo",
        answers: ["About Damn Time", "Good 4 U", "Drivers License", "Vampire"]
    },
    {
        id: "song-388",
        era: "Modern",
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        answers: ["Good 4 U", "Drivers License", "Vampire", "Calm Down"]
    },
    {
        id: "song-389",
        era: "Modern",
        title: "Drivers License",
        artist: "Olivia Rodrigo",
        answers: ["Drivers License", "Vampire", "Calm Down", "About You"]
    },
    {
        id: "song-390",
        era: "Modern",
        title: "Vampire",
        artist: "Olivia Rodrigo",
        answers: ["Vampire", "Calm Down", "About You", "Golden Hour"]
    },
    {
        id: "song-391",
        era: "Modern",
        title: "Calm Down",
        artist: "Rema & Selena Gomez",
        answers: ["Calm Down", "About You", "Golden Hour", "Stay"]
    },
    {
        id: "song-392",
        era: "Modern",
        title: "About You",
        artist: "The 1975",
        answers: ["About You", "Golden Hour", "Stay", "Unholy"]
    },
    {
        id: "song-393",
        era: "Modern",
        title: "Golden Hour",
        artist: "JVKE",
        answers: ["Golden Hour", "Stay", "Unholy", "Heat Waves"]
    },
    {
        id: "song-394",
        era: "Modern",
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        answers: ["Stay", "Unholy", "Heat Waves", "Dance Monkey"]
    },
    {
        id: "song-395",
        era: "Modern",
        title: "Unholy",
        artist: "Sam Smith & Kim Petras",
        answers: ["Unholy", "Heat Waves", "Dance Monkey", "As It Was"]
    }
    ];

    const addSongs = () => {
        if (typeof SONG_QUESTIONS === "undefined") {
            setTimeout(addSongs, 0);
            return;
        }

        const existingIds = new Set(SONG_QUESTIONS.map(song => song.id));
        extraSongs.forEach(song => {
            if (existingIds.has(song.id)) return;
            song.question = "Which song is this?";
            song.answer = song.title;
            song.correct = song.title;
            song.type = "song";
            song.audio = null;
            song.audioTitle = null;
            song.audioArtist = null;
            SONG_QUESTIONS.push(song);
        });

        console.log(`Extra song library loaded: ${extraSongs.length} additional songs.`);
    };

    addSongs();
})();
