// ============================================================
// QUESTION TYPE CONFIGURATION
// ============================================================

const QUESTION_TYPE_CONFIG = {
    classic: { label: "CLASSIC QUESTION", icon: "🎯" },
    song: { label: "NAME THAT SONG", icon: "🎵" },
    speed: { label: "SPEED ROUND", icon: "⚡" },
    wta: { label: "WINNER TAKES ALL", icon: "🏆" }
};

// ============================================================
// THE ULTIMATE QUIZ — EXPANDED NAME THAT SONG BANK
// 180 songs: 60 from the 1980s, 60 from the 1990s/2000s, 60 modern
// Audio previews are resolved at runtime through the iTunes Search API.
// ============================================================

const SONG_QUESTIONS = [
    {
        id: "song-001",
        era: "80s",
        title: "Take on Me",
        artist: "a-ha",
        answers: ["Take on Me", "The Boys of Summer", "Girls Just Want to Have Fun", "Summer of '69"]
    },
    {
        id: "song-002",
        era: "80s",
        title: "Billie Jean",
        artist: "Michael Jackson",
        answers: ["Billie Jean", "You Spin Me Round", "The Final Countdown", "Toy Soldiers"]
    },
    {
        id: "song-003",
        era: "80s",
        title: "Wake Me Up Before You Go-Go",
        artist: "Wham!",
        answers: ["Wake Me Up Before You Go-Go", "It's Raining Men", "Every Breath You Take", "Come on Eileen"]
    },
    {
        id: "song-004",
        era: "80s",
        title: "Girls Just Want to Have Fun",
        artist: "Cyndi Lauper",
        answers: ["Girls Just Want to Have Fun", "When Doves Cry", "The Power of Love", "Toy Soldiers"]
    },
    {
        id: "song-005",
        era: "80s",
        title: "Livin' on a Prayer",
        artist: "Bon Jovi",
        answers: ["Livin' on a Prayer", "Ghostbusters", "Gold", "Man in the Mirror"]
    },
    {
        id: "song-006",
        era: "80s",
        title: "Don't Stop Believin'",
        artist: "Journey",
        answers: ["Don't Stop Believin'", "The Boys of Summer", "True", "Don't You Want Me"]
    },
    {
        id: "song-007",
        era: "80s",
        title: "Africa",
        artist: "Toto",
        answers: ["Africa", "When Doves Cry", "Danger Zone", "I Think We're Alone Now"]
    },
    {
        id: "song-008",
        era: "80s",
        title: "Every Breath You Take",
        artist: "The Police",
        answers: ["Every Breath You Take", "Sweet Dreams", "Faith", "The Power of Love"]
    },
    {
        id: "song-009",
        era: "80s",
        title: "Never Gonna Give You Up",
        artist: "Rick Astley",
        answers: ["Never Gonna Give You Up", "The Power of Love", "Karma Chameleon", "Total Eclipse of the Heart"]
    },
    {
        id: "song-010",
        era: "80s",
        title: "I Wanna Dance with Somebody",
        artist: "Whitney Houston",
        answers: ["I Wanna Dance with Somebody", "Heaven Is a Place on Earth", "Faith", "Here Comes the Rain Again"]
    },
    {
        id: "song-011",
        era: "80s",
        title: "Sweet Child o' Mine",
        artist: "Guns N' Roses",
        answers: ["Sweet Child o' Mine", "Beat It", "Heaven", "Down Under"]
    },
    {
        id: "song-012",
        era: "80s",
        title: "The Final Countdown",
        artist: "Europe",
        answers: ["The Final Countdown", "Here Comes the Rain Again", "Down Under", "Kiss"]
    },
    {
        id: "song-013",
        era: "80s",
        title: "Karma Chameleon",
        artist: "Culture Club",
        answers: ["Karma Chameleon", "Kyrie", "Walking on Sunshine", "The Way You Make Me Feel"]
    },
    {
        id: "song-014",
        era: "80s",
        title: "Careless Whisper",
        artist: "George Michael",
        answers: ["Careless Whisper", "Never Gonna Give You Up", "Danger Zone", "Purple Rain"]
    },
    {
        id: "song-015",
        era: "80s",
        title: "Like a Prayer",
        artist: "Madonna",
        answers: ["Like a Prayer", "Wake Me Up Before You Go-Go", "Heaven", "I Love Rock 'n Roll"]
    },
    {
        id: "song-016",
        era: "80s",
        title: "With or Without You",
        artist: "U2",
        answers: ["With or Without You", "The Final Countdown", "Kyrie", "Thriller"]
    },
    {
        id: "song-017",
        era: "80s",
        title: "The Power of Love",
        artist: "Huey Lewis and the News",
        answers: ["The Power of Love", "Don't You Want Me", "Footloose", "Summer of '69"]
    },
    {
        id: "song-018",
        era: "80s",
        title: "Material Girl",
        artist: "Madonna",
        answers: ["Material Girl", "Kiss", "Simply the Best", "We Built This City"]
    },
    {
        id: "song-019",
        era: "80s",
        title: "Heaven Is a Place on Earth",
        artist: "Belinda Carlisle",
        answers: ["Heaven Is a Place on Earth", "Thriller", "Karma Chameleon", "Billie Jean"]
    },
    {
        id: "song-020",
        era: "80s",
        title: "Heaven",
        artist: "Bryan Adams",
        answers: ["Heaven", "Fast Car", "Livin' on a Prayer", "Girls Just Want to Have Fun"]
    },
    {
        id: "song-021",
        era: "80s",
        title: "Footloose",
        artist: "Kenny Loggins",
        answers: ["Footloose", "Come on Eileen", "Billie Jean", "The Look"]
    },
    {
        id: "song-022",
        era: "80s",
        title: "Time After Time",
        artist: "Cyndi Lauper",
        answers: ["Time After Time", "Footloose", "Thriller", "The Power of Love"]
    },
    {
        id: "song-023",
        era: "80s",
        title: "Tainted Love",
        artist: "Soft Cell",
        answers: ["Tainted Love", "Down Under", "Simply the Best", "Don't You Want Me"]
    },
    {
        id: "song-024",
        era: "80s",
        title: "99 Red Balloons",
        artist: "Nena",
        answers: ["99 Red Balloons", "Girls Just Want to Have Fun", "Man in the Mirror", "Faith"]
    },
    {
        id: "song-025",
        era: "80s",
        title: "Come on Eileen",
        artist: "Dexys Midnight Runners",
        answers: ["Come on Eileen", "Gold", "Heaven", "Pour Some Sugar on Me"]
    },
    {
        id: "song-026",
        era: "80s",
        title: "You Spin Me Round",
        artist: "Dead or Alive",
        answers: ["You Spin Me Round", "Every Breath You Take", "Sweet Dreams", "Girls Just Want to Have Fun"]
    },
    {
        id: "song-027",
        era: "80s",
        title: "Walking on Sunshine",
        artist: "Katrina and the Waves",
        answers: ["Walking on Sunshine", "Ghostbusters", "True", "Sweet Dreams"]
    },
    {
        id: "song-028",
        era: "80s",
        title: "Down Under",
        artist: "Men at Work",
        answers: ["Down Under", "Careless Whisper", "Material Girl", "Gold"]
    },
    {
        id: "song-029",
        era: "80s",
        title: "Total Eclipse of the Heart",
        artist: "Bonnie Tyler",
        answers: ["Total Eclipse of the Heart", "Purple Rain", "Simply the Best", "Never Gonna Give You Up"]
    },
    {
        id: "song-030",
        era: "80s",
        title: "Man in the Mirror",
        artist: "Michael Jackson",
        answers: ["Man in the Mirror", "Billie Jean", "I Think We're Alone Now", "Africa"]
    },
    {
        id: "song-031",
        era: "80s",
        title: "Beat It",
        artist: "Michael Jackson",
        answers: ["Beat It", "Livin' on a Prayer", "Time After Time", "Eye of the Tiger"]
    },
    {
        id: "song-032",
        era: "80s",
        title: "Thriller",
        artist: "Michael Jackson",
        answers: ["Thriller", "Like a Prayer", "The Boys of Summer", "Every Breath You Take"]
    },
    {
        id: "song-033",
        era: "80s",
        title: "Purple Rain",
        artist: "Prince",
        answers: ["Purple Rain", "The Boys of Summer", "Sweet Child o' Mine", "Beat It"]
    },
    {
        id: "song-034",
        era: "80s",
        title: "When Doves Cry",
        artist: "Prince",
        answers: ["When Doves Cry", "The Boys of Summer", "Sweet Child o' Mine", "The Look"]
    },
    {
        id: "song-035",
        era: "80s",
        title: "Kiss",
        artist: "Prince",
        answers: ["Kiss", "The Way You Make Me Feel", "The Look", "Fast Car"]
    },
    {
        id: "song-036",
        era: "80s",
        title: "Faith",
        artist: "George Michael",
        answers: ["Faith", "Take on Me", "Girls Just Want to Have Fun", "Tainted Love"]
    },
    {
        id: "song-037",
        era: "80s",
        title: "I Think We're Alone Now",
        artist: "Tiffany",
        answers: ["I Think We're Alone Now", "Come on Eileen", "99 Red Balloons", "Kiss"]
    },
    {
        id: "song-038",
        era: "80s",
        title: "True",
        artist: "Spandau Ballet",
        answers: ["True", "Danger Zone", "Total Eclipse of the Heart", "Down Under"]
    },
    {
        id: "song-039",
        era: "80s",
        title: "Gold",
        artist: "Spandau Ballet",
        answers: ["Gold", "Karma Chameleon", "Total Eclipse of the Heart", "Come on Eileen"]
    },
    {
        id: "song-040",
        era: "80s",
        title: "Don't You Want Me",
        artist: "The Human League",
        answers: ["Don't You Want Me", "I Wanna Dance with Somebody", "It's Raining Men", "Jump"]
    },
    {
        id: "song-041",
        era: "80s",
        title: "Sweet Dreams",
        artist: "Eurythmics",
        answers: ["Sweet Dreams", "Here Comes the Rain Again", "Man in the Mirror", "Beat It"]
    },
    {
        id: "song-042",
        era: "80s",
        title: "Here Comes the Rain Again",
        artist: "Eurythmics",
        answers: ["Here Comes the Rain Again", "Walking on Sunshine", "The Final Countdown", "Material Girl"]
    },
    {
        id: "song-043",
        era: "80s",
        title: "It's Raining Men",
        artist: "The Weather Girls",
        answers: ["It's Raining Men", "Africa", "We Built This City", "The Final Countdown"]
    },
    {
        id: "song-044",
        era: "80s",
        title: "The Boys of Summer",
        artist: "Don Henley",
        answers: ["The Boys of Summer", "Don't You Want Me", "Billie Jean", "Every Breath You Take"]
    },
    {
        id: "song-045",
        era: "80s",
        title: "Summer of '69",
        artist: "Bryan Adams",
        answers: ["Summer of '69", "Faith", "Thriller", "Karma Chameleon"]
    },
    {
        id: "song-046",
        era: "80s",
        title: "Pour Some Sugar on Me",
        artist: "Def Leppard",
        answers: ["Pour Some Sugar on Me", "Toy Soldiers", "The Power of Love", "Danger Zone"]
    },
    {
        id: "song-047",
        era: "80s",
        title: "We Built This City",
        artist: "Starship",
        answers: ["We Built This City", "Toy Soldiers", "Karma Chameleon", "Time After Time"]
    },
    {
        id: "song-048",
        era: "80s",
        title: "Jump",
        artist: "Van Halen",
        answers: ["Jump", "Don't You Want Me", "It's Raining Men", "Kyrie"]
    },
    {
        id: "song-049",
        era: "80s",
        title: "Danger Zone",
        artist: "Kenny Loggins",
        answers: ["Danger Zone", "We Built This City", "Jump", "The Final Countdown"]
    },
    {
        id: "song-050",
        era: "80s",
        title: "Ghostbusters",
        artist: "Ray Parker Jr.",
        answers: ["Ghostbusters", "Africa", "Every Breath You Take", "Fast Car"]
    },
    {
        id: "song-051",
        era: "80s",
        title: "Eye of the Tiger",
        artist: "Survivor",
        answers: ["Eye of the Tiger", "You Spin Me Round", "I Think We're Alone Now", "Never Gonna Give You Up"]
    },
    {
        id: "song-052",
        era: "80s",
        title: "I Love Rock 'n Roll",
        artist: "Joan Jett & the Blackhearts",
        answers: ["I Love Rock 'n Roll", "Material Girl", "Total Eclipse of the Heart", "Girls Just Want to Have Fun"]
    },
    {
        id: "song-053",
        era: "80s",
        title: "Heaven",
        artist: "The Psychedelic Furs",
        answers: ["Heaven", "When Doves Cry", "Danger Zone", "Footloose"]
    },
    {
        id: "song-054",
        era: "80s",
        title: "Kyrie",
        artist: "Mr. Mister",
        answers: ["Kyrie", "Here Comes the Rain Again", "The Look", "It's Raining Men"]
    },
    {
        id: "song-055",
        era: "80s",
        title: "Electric Blue",
        artist: "Icehouse",
        answers: ["Electric Blue", "You Spin Me Round", "Beat It", "Heaven"]
    },
    {
        id: "song-056",
        era: "80s",
        title: "The Look",
        artist: "Roxette",
        answers: ["The Look", "When Doves Cry", "Man in the Mirror", "Don't Stop Believin'"]
    },
    {
        id: "song-057",
        era: "80s",
        title: "Toy Soldiers",
        artist: "Martika",
        answers: ["Toy Soldiers", "You Spin Me Round", "Material Girl", "Pour Some Sugar on Me"]
    },
    {
        id: "song-058",
        era: "80s",
        title: "Fast Car",
        artist: "Tracy Chapman",
        answers: ["Fast Car", "Beat It", "Jump", "Take on Me"]
    },
    {
        id: "song-059",
        era: "80s",
        title: "Simply the Best",
        artist: "Tina Turner",
        answers: ["Simply the Best", "The Look", "Purple Rain", "We Built This City"]
    },
    {
        id: "song-060",
        era: "80s",
        title: "The Way You Make Me Feel",
        artist: "Michael Jackson",
        answers: ["The Way You Make Me Feel", "Don't Stop Believin'", "Sweet Child o' Mine", "Girls Just Want to Have Fun"]
    },
    {
        id: "song-061",
        era: "90s & 00s",
        title: "Vogue",
        artist: "Madonna",
        answers: ["Vogue", "Sk8er Boi", "Mambo No. 5", "Saturday Night"]
    },
    {
        id: "song-062",
        era: "90s & 00s",
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        answers: ["Smells Like Teen Spirit", "No Limit", "Losing My Religion", "Waterfalls"]
    },
    {
        id: "song-063",
        era: "90s & 00s",
        title: "Wonderwall",
        artist: "Oasis",
        answers: ["Wonderwall", "Kiss Me", "Macarena", "My Heart Will Go On"]
    },
    {
        id: "song-064",
        era: "90s & 00s",
        title: "Creep",
        artist: "Radiohead",
        answers: ["Creep", "Crazy in Love", "Mambo No. 5", "Vogue"]
    },
    {
        id: "song-065",
        era: "90s & 00s",
        title: "Wannabe",
        artist: "Spice Girls",
        answers: ["Wannabe", "Torn", "All Star", "Mr. Brightside"]
    },
    {
        id: "song-066",
        era: "90s & 00s",
        title: "No Scrubs",
        artist: "TLC",
        answers: ["No Scrubs", "Barbie Girl", "...Baby One More Time", "Torn"]
    },
    {
        id: "song-067",
        era: "90s & 00s",
        title: "Baby One More Time",
        artist: "Britney Spears",
        answers: ["Baby One More Time", "...Baby One More Time", "Whenever, Wherever", "Ray of Light"]
    },
    {
        id: "song-068",
        era: "90s & 00s",
        title: "...Baby One More Time",
        artist: "Britney Spears",
        answers: ["...Baby One More Time", "Kiss Me", "Juicy", "Cotton Eye Joe"]
    },
    {
        id: "song-069",
        era: "90s & 00s",
        title: "Genie in a Bottle",
        artist: "Christina Aguilera",
        answers: ["Genie in a Bottle", "Basket Case", "Wonderwall", "Around the World"]
    },
    {
        id: "song-070",
        era: "90s & 00s",
        title: "Torn",
        artist: "Natalie Imbruglia",
        answers: ["Torn", "Yeah!", "No Scrubs", "Saturday Night"]
    },
    {
        id: "song-071",
        era: "90s & 00s",
        title: "Kiss Me",
        artist: "Sixpence None the Richer",
        answers: ["Kiss Me", "Freed from Desire", "Zombie", "Return of the Mack"]
    },
    {
        id: "song-072",
        era: "90s & 00s",
        title: "Iris",
        artist: "Goo Goo Dolls",
        answers: ["Iris", "Crazy in Love", "Torn", "Sk8er Boi"]
    },
    {
        id: "song-073",
        era: "90s & 00s",
        title: "Everybody",
        artist: "Backstreet Boys",
        answers: ["Everybody", "The Sign", "Vogue", "Baby One More Time"]
    },
    {
        id: "song-074",
        era: "90s & 00s",
        title: "MMMBop",
        artist: "Hanson",
        answers: ["MMMBop", "Baby One More Time", "Linger", "Zombie"]
    },
    {
        id: "song-075",
        era: "90s & 00s",
        title: "Tubthumping",
        artist: "Chumbawamba",
        answers: ["Tubthumping", "Basket Case", "Un-Break My Heart", "Yeah!"]
    },
    {
        id: "song-076",
        era: "90s & 00s",
        title: "Barbie Girl",
        artist: "Aqua",
        answers: ["Barbie Girl", "California Love", "My Heart Will Go On", "In the End"]
    },
    {
        id: "song-077",
        era: "90s & 00s",
        title: "Macarena",
        artist: "Los del Río",
        answers: ["Macarena", "Linger", "Whenever, Wherever", "Rhythm Is a Dancer"]
    },
    {
        id: "song-078",
        era: "90s & 00s",
        title: "What Is Love",
        artist: "Haddaway",
        answers: ["What Is Love", "Whenever, Wherever", "Vogue", "My Heart Will Go On"]
    },
    {
        id: "song-079",
        era: "90s & 00s",
        title: "Rhythm Is a Dancer",
        artist: "Snap!",
        answers: ["Rhythm Is a Dancer", "Crazy in Love", "Barbie Girl", "Everybody"]
    },
    {
        id: "song-080",
        era: "90s & 00s",
        title: "Freed from Desire",
        artist: "Gala",
        answers: ["Freed from Desire", "Killing Me Softly", "Tubthumping", "Linger"]
    },
    {
        id: "song-081",
        era: "90s & 00s",
        title: "The Sign",
        artist: "Ace of Base",
        answers: ["The Sign", "MMMBop", "All Star", "Smells Like Teen Spirit"]
    },
    {
        id: "song-082",
        era: "90s & 00s",
        title: "Blue (Da Ba Dee)",
        artist: "Eiffel 65",
        answers: ["Blue (Da Ba Dee)", "All Star", "Un-Break My Heart", "Song 2"]
    },
    {
        id: "song-083",
        era: "90s & 00s",
        title: "Around the World",
        artist: "Daft Punk",
        answers: ["Around the World", "Hey Ya!", "Return of the Mack", "Juicy"]
    },
    {
        id: "song-084",
        era: "90s & 00s",
        title: "No Limit",
        artist: "2 Unlimited",
        answers: ["No Limit", "Steal My Sunshine", "Genie in a Bottle", "Wannabe"]
    },
    {
        id: "song-085",
        era: "90s & 00s",
        title: "Return of the Mack",
        artist: "Mark Morrison",
        answers: ["Return of the Mack", "No Limit", "Genie in a Bottle", "Whenever, Wherever"]
    },
    {
        id: "song-086",
        era: "90s & 00s",
        title: "Gangsta's Paradise",
        artist: "Coolio",
        answers: ["Gangsta's Paradise", "Dreams", "Juicy", "Believe"]
    },
    {
        id: "song-087",
        era: "90s & 00s",
        title: "California Love",
        artist: "2Pac",
        answers: ["California Love", "...Baby One More Time", "What Is Love", "Semi-Charmed Life"]
    },
    {
        id: "song-088",
        era: "90s & 00s",
        title: "Juicy",
        artist: "The Notorious B.I.G.",
        answers: ["Juicy", "Barbie Girl", "Gangsta's Paradise", "Basket Case"]
    },
    {
        id: "song-089",
        era: "90s & 00s",
        title: "Killing Me Softly",
        artist: "Fugees",
        answers: ["Killing Me Softly", "No Scrubs", "Cotton Eye Joe", "Wannabe"]
    },
    {
        id: "song-090",
        era: "90s & 00s",
        title: "Waterfalls",
        artist: "TLC",
        answers: ["Waterfalls", "The Sign", "My Heart Will Go On", "Return of the Mack"]
    },
    {
        id: "song-091",
        era: "90s & 00s",
        title: "Un-Break My Heart",
        artist: "Toni Braxton",
        answers: ["Un-Break My Heart", "Linger", "Under the Bridge", "Return of the Mack"]
    },
    {
        id: "song-092",
        era: "90s & 00s",
        title: "My Heart Will Go On",
        artist: "Celine Dion",
        answers: ["My Heart Will Go On", "Dreams", "All Star", "Wonderwall"]
    },
    {
        id: "song-093",
        era: "90s & 00s",
        title: "Believe",
        artist: "Cher",
        answers: ["Believe", "Vogue", "Mambo No. 5", "Everybody"]
    },
    {
        id: "song-094",
        era: "90s & 00s",
        title: "Ray of Light",
        artist: "Madonna",
        answers: ["Ray of Light", "The Man Who Sold the World", "Toxic", "...Baby One More Time"]
    },
    {
        id: "song-095",
        era: "90s & 00s",
        title: "Black or White",
        artist: "Michael Jackson",
        answers: ["Black or White", "Juicy", "Baby One More Time", "Believe"]
    },
    {
        id: "song-096",
        era: "90s & 00s",
        title: "Losing My Religion",
        artist: "R.E.M.",
        answers: ["Losing My Religion", "Dreams", "The Man Who Sold the World", "Black or White"]
    },
    {
        id: "song-097",
        era: "90s & 00s",
        title: "Under the Bridge",
        artist: "Red Hot Chili Peppers",
        answers: ["Under the Bridge", "Waterfalls", "Semi-Charmed Life", "The Sign"]
    },
    {
        id: "song-098",
        era: "90s & 00s",
        title: "Song 2",
        artist: "Blur",
        answers: ["Song 2", "Whenever, Wherever", "Believe", "Basket Case"]
    },
    {
        id: "song-099",
        era: "90s & 00s",
        title: "Bitter Sweet Symphony",
        artist: "The Verve",
        answers: ["Bitter Sweet Symphony", "Kiss Me", "Steal My Sunshine", "California Love"]
    },
    {
        id: "song-100",
        era: "90s & 00s",
        title: "The Man Who Sold the World",
        artist: "Nirvana",
        answers: ["The Man Who Sold the World", "Saturday Night", "No Limit", "Under the Bridge"]
    },
    {
        id: "song-101",
        era: "90s & 00s",
        title: "Linger",
        artist: "The Cranberries",
        answers: ["Linger", "Semi-Charmed Life", "Rhythm Is a Dancer", "Smells Like Teen Spirit"]
    },
    {
        id: "song-102",
        era: "90s & 00s",
        title: "Zombie",
        artist: "The Cranberries",
        answers: ["Zombie", "Bitter Sweet Symphony", "Ray of Light", "Torn"]
    },
    {
        id: "song-103",
        era: "90s & 00s",
        title: "Dreams",
        artist: "The Cranberries",
        answers: ["Dreams", "Baby One More Time", "All Star", "Complicated"]
    },
    {
        id: "song-104",
        era: "90s & 00s",
        title: "Basket Case",
        artist: "Green Day",
        answers: ["Basket Case", "Macarena", "Believe", "Un-Break My Heart"]
    },
    {
        id: "song-105",
        era: "90s & 00s",
        title: "Semi-Charmed Life",
        artist: "Third Eye Blind",
        answers: ["Semi-Charmed Life", "Dreams", "MMMBop", "Steal My Sunshine"]
    },
    {
        id: "song-106",
        era: "90s & 00s",
        title: "All Star",
        artist: "Smash Mouth",
        answers: ["All Star", "What Is Love", "No Limit", "In the End"]
    },
    {
        id: "song-107",
        era: "90s & 00s",
        title: "Steal My Sunshine",
        artist: "Len",
        answers: ["Steal My Sunshine", "Mambo No. 5", "No Limit", "Semi-Charmed Life"]
    },
    {
        id: "song-108",
        era: "90s & 00s",
        title: "Mambo No. 5",
        artist: "Lou Bega",
        answers: ["Mambo No. 5", "No Scrubs", "Cotton Eye Joe", "California Love"]
    },
    {
        id: "song-109",
        era: "90s & 00s",
        title: "Cotton Eye Joe",
        artist: "Rednex",
        answers: ["Cotton Eye Joe", "No Scrubs", "Sk8er Boi", "Vogue"]
    },
    {
        id: "song-110",
        era: "90s & 00s",
        title: "Saturday Night",
        artist: "Whigfield",
        answers: ["Saturday Night", "Baby One More Time", "Waterfalls", "Kiss Me"]
    },
    {
        id: "song-111",
        era: "90s & 00s",
        title: "Crazy in Love",
        artist: "Beyoncé",
        answers: ["Crazy in Love", "MMMBop", "Freed from Desire", "Cotton Eye Joe"]
    },
    {
        id: "song-112",
        era: "90s & 00s",
        title: "Yeah!",
        artist: "Usher",
        answers: ["Yeah!", "Linger", "The Sign", "Juicy"]
    },
    {
        id: "song-113",
        era: "90s & 00s",
        title: "In the End",
        artist: "Linkin Park",
        answers: ["In the End", "Un-Break My Heart", "No Limit", "Complicated"]
    },
    {
        id: "song-114",
        era: "90s & 00s",
        title: "Mr. Brightside",
        artist: "The Killers",
        answers: ["Mr. Brightside", "Smells Like Teen Spirit", "Un-Break My Heart", "Baby One More Time"]
    },
    {
        id: "song-115",
        era: "90s & 00s",
        title: "Seven Nation Army",
        artist: "The White Stripes",
        answers: ["Seven Nation Army", "No Scrubs", "Ray of Light", "Bitter Sweet Symphony"]
    },
    {
        id: "song-116",
        era: "90s & 00s",
        title: "Hey Ya!",
        artist: "Outkast",
        answers: ["Hey Ya!", "The Man Who Sold the World", "In the End", "Basket Case"]
    },
    {
        id: "song-117",
        era: "90s & 00s",
        title: "Toxic",
        artist: "Britney Spears",
        answers: ["Toxic", "Bitter Sweet Symphony", "Blue (Da Ba Dee)", "Mr. Brightside"]
    },
    {
        id: "song-118",
        era: "90s & 00s",
        title: "Complicated",
        artist: "Avril Lavigne",
        answers: ["Complicated", "My Heart Will Go On", "Black or White", "No Limit"]
    },
    {
        id: "song-119",
        era: "90s & 00s",
        title: "Sk8er Boi",
        artist: "Avril Lavigne",
        answers: ["Sk8er Boi", "Wonderwall", "Gangsta's Paradise", "Barbie Girl"]
    },
    {
        id: "song-120",
        era: "90s & 00s",
        title: "Whenever, Wherever",
        artist: "Shakira",
        answers: ["Whenever, Wherever", "Smells Like Teen Spirit", "Sk8er Boi", "Linger"]
    },
    {
        id: "song-121",
        era: "Modern",
        title: "Blinding Lights",
        artist: "The Weeknd",
        answers: ["Blinding Lights", "Taste", "bad guy", "Drivers License"]
    },
    {
        id: "song-122",
        era: "Modern",
        title: "As It Was",
        artist: "Harry Styles",
        answers: ["As It Was", "Beautiful Things", "Therefore I Am", "Heat Waves"]
    },
    {
        id: "song-123",
        era: "Modern",
        title: "Espresso",
        artist: "Sabrina Carpenter",
        answers: ["Espresso", "Late Night Talking", "Deja Vu", "Adore You"]
    },
    {
        id: "song-124",
        era: "Modern",
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        answers: ["Birds of a Feather", "As It Was", "Bad Habits", "Paint the Town Red"]
    },
    {
        id: "song-125",
        era: "Modern",
        title: "Good Luck, Babe!",
        artist: "Chappell Roan",
        answers: ["Good Luck, Babe!", "Watermelon Sugar", "Birds of a Feather", "Lavender Haze"]
    },
    {
        id: "song-126",
        era: "Modern",
        title: "Beautiful Things",
        artist: "Benson Boone",
        answers: ["Beautiful Things", "Fortnight", "Into You", "One Kiss"]
    },
    {
        id: "song-127",
        era: "Modern",
        title: "Flowers",
        artist: "Miley Cyrus",
        answers: ["Flowers", "Therefore I Am", "Dance Monkey", "As It Was"]
    },
    {
        id: "song-128",
        era: "Modern",
        title: "Houdini",
        artist: "Dua Lipa",
        answers: ["Houdini", "Late Night Talking", "Shape of You", "One Kiss"]
    },
    {
        id: "song-129",
        era: "Modern",
        title: "Levitating",
        artist: "Dua Lipa",
        answers: ["Levitating", "good 4 u", "Pink Pony Club", "Beautiful Things"]
    },
    {
        id: "song-130",
        era: "Modern",
        title: "Anti-Hero",
        artist: "Taylor Swift",
        answers: ["Anti-Hero", "What Was I Made For?", "Into You", "Levitating"]
    },
    {
        id: "song-131",
        era: "Modern",
        title: "good 4 u",
        artist: "Olivia Rodrigo",
        answers: ["good 4 u", "Dance Monkey", "HOT TO GO!", "Paint the Town Red"]
    },
    {
        id: "song-132",
        era: "Modern",
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        answers: ["Stay", "Vampire", "bad guy", "Shallow"]
    },
    {
        id: "song-133",
        era: "Modern",
        title: "Shape of You",
        artist: "Ed Sheeran",
        answers: ["Shape of You", "Houdini", "Perfect", "One Kiss"]
    },
    {
        id: "song-134",
        era: "Modern",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        answers: ["Watermelon Sugar", "As It Was", "Good Luck, Babe!", "What Was I Made For?"]
    },
    {
        id: "song-135",
        era: "Modern",
        title: "Dance The Night",
        artist: "Dua Lipa",
        answers: ["Dance The Night", "Into You", "Drivers License", "Golden Hour"]
    },
    {
        id: "song-136",
        era: "Modern",
        title: "Drivers License",
        artist: "Olivia Rodrigo",
        answers: ["Drivers License", "Blinding Lights", "Paint the Town Red", "Hello"]
    },
    {
        id: "song-137",
        era: "Modern",
        title: "Vampire",
        artist: "Olivia Rodrigo",
        answers: ["Vampire", "Drivers License", "Calm Down", "Shallow"]
    },
    {
        id: "song-138",
        era: "Modern",
        title: "Deja Vu",
        artist: "Olivia Rodrigo",
        answers: ["Deja Vu", "Die for You", "Shape of You", "good 4 u"]
    },
    {
        id: "song-139",
        era: "Modern",
        title: "Cruel Summer",
        artist: "Taylor Swift",
        answers: ["Cruel Summer", "Anti-Hero", "Don't Start Now", "Easy on Me"]
    },
    {
        id: "song-140",
        era: "Modern",
        title: "Fortnight",
        artist: "Taylor Swift feat. Post Malone",
        answers: ["Fortnight", "Golden Hour", "Blank Space", "thank u, next"]
    },
    {
        id: "song-141",
        era: "Modern",
        title: "Paint the Town Red",
        artist: "Doja Cat",
        answers: ["Paint the Town Red", "Fortnight", "Blank Space", "Happier Than Ever"]
    },
    {
        id: "song-142",
        era: "Modern",
        title: "Say So",
        artist: "Doja Cat",
        answers: ["Say So", "7 rings", "Late Night Talking", "Physical"]
    },
    {
        id: "song-143",
        era: "Modern",
        title: "One Kiss",
        artist: "Calvin Harris & Dua Lipa",
        answers: ["One Kiss", "Happier Than Ever", "Pink Pony Club", "bad guy"]
    },
    {
        id: "song-144",
        era: "Modern",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        answers: ["Don't Start Now", "Lavender Haze", "As It Was", "Blank Space"]
    },
    {
        id: "song-145",
        era: "Modern",
        title: "New Rules",
        artist: "Dua Lipa",
        answers: ["New Rules", "Unholy", "Save Your Tears", "Watermelon Sugar"]
    },
    {
        id: "song-146",
        era: "Modern",
        title: "Physical",
        artist: "Dua Lipa",
        answers: ["Physical", "Hello", "Beautiful Things", "Flowers"]
    },
    {
        id: "song-147",
        era: "Modern",
        title: "Save Your Tears",
        artist: "The Weeknd",
        answers: ["Save Your Tears", "Rain on Me", "Happier Than Ever", "Espresso"]
    },
    {
        id: "song-148",
        era: "Modern",
        title: "Starboy",
        artist: "The Weeknd",
        answers: ["Starboy", "Save Your Tears", "Die for You", "Drivers License"]
    },
    {
        id: "song-149",
        era: "Modern",
        title: "Die for You",
        artist: "The Weeknd",
        answers: ["Die for You", "HOT TO GO!", "Pink Pony Club", "Please Please Please"]
    },
    {
        id: "song-150",
        era: "Modern",
        title: "Adore You",
        artist: "Harry Styles",
        answers: ["Adore You", "Don't Start Now", "Birds of a Feather", "Heat Waves"]
    },
    {
        id: "song-151",
        era: "Modern",
        title: "Late Night Talking",
        artist: "Harry Styles",
        answers: ["Late Night Talking", "Physical", "good 4 u", "thank u, next"]
    },
    {
        id: "song-152",
        era: "Modern",
        title: "Therefore I Am",
        artist: "Billie Eilish",
        answers: ["Therefore I Am", "Dance Monkey", "Into You", "Vampire"]
    },
    {
        id: "song-153",
        era: "Modern",
        title: "bad guy",
        artist: "Billie Eilish",
        answers: ["bad guy", "Dance Monkey", "Die for You", "Fortnight"]
    },
    {
        id: "song-154",
        era: "Modern",
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        answers: ["Happier Than Ever", "Fortnight", "Dance The Night", "thank u, next"]
    },
    {
        id: "song-155",
        era: "Modern",
        title: "What Was I Made For?",
        artist: "Billie Eilish",
        answers: ["What Was I Made For?", "Beautiful Things", "Feather", "Easy on Me"]
    },
    {
        id: "song-156",
        era: "Modern",
        title: "Pink Pony Club",
        artist: "Chappell Roan",
        answers: ["Pink Pony Club", "Drivers License", "Into You", "Someone You Loved"]
    },
    {
        id: "song-157",
        era: "Modern",
        title: "HOT TO GO!",
        artist: "Chappell Roan",
        answers: ["HOT TO GO!", "Flowers", "Dance The Night", "Taste"]
    },
    {
        id: "song-158",
        era: "Modern",
        title: "Feather",
        artist: "Sabrina Carpenter",
        answers: ["Feather", "Golden Hour", "Perfect", "Physical"]
    },
    {
        id: "song-159",
        era: "Modern",
        title: "Please Please Please",
        artist: "Sabrina Carpenter",
        answers: ["Please Please Please", "Shallow", "Drivers License", "Say So"]
    },
    {
        id: "song-160",
        era: "Modern",
        title: "Taste",
        artist: "Sabrina Carpenter",
        answers: ["Taste", "Hello", "Shallow", "Deja Vu"]
    },
    {
        id: "song-161",
        era: "Modern",
        title: "Fortnight",
        artist: "Taylor Swift",
        answers: ["Fortnight", "Cruel Summer", "Calm Down", "Late Night Talking"]
    },
    {
        id: "song-162",
        era: "Modern",
        title: "Blank Space",
        artist: "Taylor Swift",
        answers: ["Blank Space", "thank u, next", "Beautiful Things", "Vampire"]
    },
    {
        id: "song-163",
        era: "Modern",
        title: "Lavender Haze",
        artist: "Taylor Swift",
        answers: ["Lavender Haze", "Easy on Me", "Shallow", "Drivers License"]
    },
    {
        id: "song-164",
        era: "Modern",
        title: "Easy on Me",
        artist: "Adele",
        answers: ["Easy on Me", "Stay", "Bad Habits", "Drivers License"]
    },
    {
        id: "song-165",
        era: "Modern",
        title: "Hello",
        artist: "Adele",
        answers: ["Hello", "Save Your Tears", "One Kiss", "Drivers License"]
    },
    {
        id: "song-166",
        era: "Modern",
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        answers: ["Someone You Loved", "Say So", "Bad Habits", "Good Luck, Babe!"]
    },
    {
        id: "song-167",
        era: "Modern",
        title: "Before You Go",
        artist: "Lewis Capaldi",
        answers: ["Before You Go", "What Was I Made For?", "Vampire", "As It Was"]
    },
    {
        id: "song-168",
        era: "Modern",
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        answers: ["Shallow", "Adore You", "Die for You", "Perfect"]
    },
    {
        id: "song-169",
        era: "Modern",
        title: "Rain on Me",
        artist: "Lady Gaga & Ariana Grande",
        answers: ["Rain on Me", "7 rings", "Flowers", "Shape of You"]
    },
    {
        id: "song-170",
        era: "Modern",
        title: "Positions",
        artist: "Ariana Grande",
        answers: ["Positions", "Houdini", "Golden Hour", "Late Night Talking"]
    },
    {
        id: "song-171",
        era: "Modern",
        title: "7 rings",
        artist: "Ariana Grande",
        answers: ["7 rings", "Dance The Night", "Taste", "good 4 u"]
    },
    {
        id: "song-172",
        era: "Modern",
        title: "thank u, next",
        artist: "Ariana Grande",
        answers: ["thank u, next", "Golden Hour", "Therefore I Am", "Stay"]
    },
    {
        id: "song-173",
        era: "Modern",
        title: "Into You",
        artist: "Ariana Grande",
        answers: ["Into You", "Therefore I Am", "One Kiss", "Fortnight"]
    },
    {
        id: "song-174",
        era: "Modern",
        title: "Golden Hour",
        artist: "JVKE",
        answers: ["Golden Hour", "New Rules", "bad guy", "Shape of You"]
    },
    {
        id: "song-175",
        era: "Modern",
        title: "Unholy",
        artist: "Sam Smith & Kim Petras",
        answers: ["Unholy", "Beautiful Things", "Rain on Me", "Pink Pony Club"]
    },
    {
        id: "song-176",
        era: "Modern",
        title: "Calm Down",
        artist: "Rema & Selena Gomez",
        answers: ["Calm Down", "Into You", "HOT TO GO!", "Hello"]
    },
    {
        id: "song-177",
        era: "Modern",
        title: "Dance Monkey",
        artist: "Tones and I",
        answers: ["Dance Monkey", "Happier Than Ever", "Someone You Loved", "Calm Down"]
    },
    {
        id: "song-178",
        era: "Modern",
        title: "Heat Waves",
        artist: "Glass Animals",
        answers: ["Heat Waves", "Birds of a Feather", "Starboy", "Espresso"]
    },
    {
        id: "song-179",
        era: "Modern",
        title: "Bad Habits",
        artist: "Ed Sheeran",
        answers: ["Bad Habits", "Late Night Talking", "One Kiss", "Heat Waves"]
    },
    {
        id: "song-180",
        era: "Modern",
        title: "Perfect",
        artist: "Ed Sheeran",
        answers: ["Perfect", "bad guy", "Calm Down", "Adore You"]
    }
];

SONG_QUESTIONS.forEach(song => {
    song.question = "Which song is this?";
    song.answer = song.title;
    song.correct = song.title;
    song.type = "song";
    song.audio = null;
    song.audioTitle = null;
    song.audioArtist = null;
});

const songPreviewCache = new Map();

function normaliseSongText(value = "") {
    return String(value)
        .toLowerCase()
        .replace(/[’‘]/g, "'")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function loadDeezerSearch(query, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
        const callbackName = `deezerSearch_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        const script = document.createElement("script");
        const timeoutId = setTimeout(() => {
            cleanup();
            reject(new Error("Deezer search timed out"));
        }, timeoutMs);

        function cleanup() {
            clearTimeout(timeoutId);
            try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
            script.remove();
        }

        window[callbackName] = data => {
            cleanup();
            resolve(data || {});
        };

        script.onerror = () => {
            cleanup();
            reject(new Error("Deezer search failed"));
        };

        script.src = `https://api.deezer.com/search/track?q=${encodeURIComponent(query)}&limit=10&output=jsonp&callback=${callbackName}`;
        document.head.appendChild(script);
    });
}

async function lookupSongPreview(song) {
    if (!song) return null;

    if (songPreviewCache.has(song.id)) {
        const cached = songPreviewCache.get(song.id);
        if (cached) song.audio = cached;
        return cached;
    }

    const targetTitle = normaliseSongText(song.title);
    const targetArtist = normaliseSongText(song.artist);

    // Provider 1: Apple/iTunes. This is kept as the first choice because it
    // has historically supplied the cleanest previews for this quiz.
    try {
        const query = `${song.title} ${song.artist}`;
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&country=GB&limit=10`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        let response;
        try {
            response = await fetch(url, {
                method: "GET",
                cache: "no-store",
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }

        if (response.ok) {
            const data = await response.json();
            const match = (data.results || []).find(result => {
                const resultTitle = normaliseSongText(result.trackName);
                const resultArtist = normaliseSongText(result.artistName);
                return result.previewUrl &&
                    (resultTitle === targetTitle || resultTitle.includes(targetTitle) || targetTitle.includes(resultTitle)) &&
                    (resultArtist.includes(targetArtist) || targetArtist.includes(resultArtist));
            }) || (data.results || []).find(result => result.previewUrl);

            const previewUrl = match?.previewUrl || null;
            if (previewUrl) {
                song.audio = previewUrl;
                song.audioTitle = match.trackName;
                song.audioArtist = match.artistName;
                songPreviewCache.set(song.id, previewUrl);
                return previewUrl;
            }
        }
    } catch (error) {
        console.warn(`Apple/iTunes preview lookup failed for ${song.title}:`, error);
    }

    // Provider 2: Deezer. Apple changed behaviour around the legacy Search
    // API, so use Deezer's public JSONP endpoint as a reliable fallback.
    try {
        const data = await loadDeezerSearch(`${song.title} ${song.artist}`);
        const results = Array.isArray(data.data) ? data.data : [];

        const match = results.find(result => {
            const resultTitle = normaliseSongText(result.title);
            const resultArtist = normaliseSongText(result.artist?.name);
            return result.preview &&
                (resultTitle === targetTitle || resultTitle.includes(targetTitle) || targetTitle.includes(resultTitle)) &&
                (resultArtist === targetArtist || resultArtist.includes(targetArtist) || targetArtist.includes(resultArtist));
        }) || results.find(result => result.preview);

        if (match?.preview) {
            const previewUrl = String(match.preview).replace(/^http:/, "https:");
            song.audio = previewUrl;
            song.audioTitle = match.title || song.title;
            song.audioArtist = match.artist?.name || song.artist;
            songPreviewCache.set(song.id, previewUrl);
            return previewUrl;
        }
    } catch (error) {
        console.warn(`Deezer preview lookup failed for ${song.title}:`, error);
    }

    songPreviewCache.set(song.id, null);
    return null;
}

async function getSongQuestionById(id) {
    const song = SONG_QUESTIONS.find(item => item.id === id) || null;
    if (!song) return null;

    // Do not make the question wait for iTunes. The quiz question itself
    // must always load even if the external audio service is unavailable.
    lookupSongPreview(song).catch(error => {
        console.warn("Background song preview lookup failed:", error);
    });

    return song;
}

async function getRandomSongQuestion(usedQuestionIds = new Set()) {
    const used = usedQuestionIds instanceof Set
        ? usedQuestionIds
        : new Set(usedQuestionIds || []);

    const available = SONG_QUESTIONS.filter(song => !used.has(song.id));

    if (!available.length) return null;

    // Shuffle first so unavailable previews don't always produce the same song.
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Selecting a question must never depend on an external audio request.
    // iTunes is only used to supply the optional 30-second preview.
    const selectedSong = shuffled[0] || null;
    if (selectedSong) {
        lookupSongPreview(selectedSong).catch(error => {
            console.warn("Background song preview lookup failed:", error);
        });
    }

    return selectedSong;
}


// ============================================================
// SPEED ROUND QUESTION BANK
// Everyone answers simultaneously. Faster correct answers score more.
// ============================================================

const SPEED_QUESTIONS = [
    {
        id: "speed-001",
        question: 'What is the capital of Italy?',
        answers: ['Rome', 'Milan', 'Venice', 'Naples'],
        correct: 'Rome'
    },
    {
        id: "speed-002",
        question: 'How many sides does a hexagon have?',
        answers: ['6', '5', '7', '8'],
        correct: '6'
    },
    {
        id: "speed-003",
        question: 'Which ocean is between Africa and Australia?',
        answers: ['Indian Ocean', 'Atlantic Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correct: 'Indian Ocean'
    },
    {
        id: "speed-004",
        question: 'What colour do you get by mixing blue and yellow?',
        answers: ['Green', 'Purple', 'Orange', 'Brown'],
        correct: 'Green'
    },
    {
        id: "speed-005",
        question: 'How many minutes are in an hour?',
        answers: ['60', '50', '70', '100'],
        correct: '60'
    },
    {
        id: "speed-006",
        question: "Which animal is known as man's best friend?",
        answers: ['Dog', 'Horse', 'Cat', 'Rabbit'],
        correct: 'Dog'
    },
    {
        id: "speed-007",
        question: 'What is 9 × 8?',
        answers: ['72', '64', '81', '76'],
        correct: '72'
    },
    {
        id: "speed-008",
        question: 'Which country is famous for the pyramids at Giza?',
        answers: ['Egypt', 'Greece', 'Mexico', 'Turkey'],
        correct: 'Egypt'
    },
    {
        id: "speed-009",
        question: 'How many players are on a football team on the pitch at one time?',
        answers: ['11', '10', '12', '9'],
        correct: '11'
    },
    {
        id: "speed-010",
        question: 'Which gas do humans need to breathe?',
        answers: ['Oxygen', 'Helium', 'Hydrogen', 'Carbon dioxide'],
        correct: 'Oxygen'
    },
    {
        id: "speed-011",
        question: 'What is the largest planet in our solar system?',
        answers: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
        correct: 'Jupiter'
    },
    {
        id: "speed-012",
        question: 'How many letters are in the English alphabet?',
        answers: ['26', '24', '25', '28'],
        correct: '26'
    },
    {
        id: "speed-013",
        question: 'Which month comes immediately after September?',
        answers: ['October', 'August', 'November', 'December'],
        correct: 'October'
    },
    {
        id: "speed-014",
        question: "What is the opposite of 'ancient'?",
        answers: ['Modern', 'Old', 'Historic', 'Early'],
        correct: 'Modern'
    },
    {
        id: "speed-015",
        question: 'Which sport uses a shuttlecock?',
        answers: ['Badminton', 'Tennis', 'Squash', 'Table tennis'],
        correct: 'Badminton'
    },
    {
        id: "speed-016",
        question: 'What is 100 divided by 4?',
        answers: ['25', '20', '40', '50'],
        correct: '25'
    },
    {
        id: "speed-017",
        question: 'Which continent is Brazil in?',
        answers: ['South America', 'North America', 'Europe', 'Africa'],
        correct: 'South America'
    },
    {
        id: "speed-018",
        question: 'What is the freezing point of water in Celsius?',
        answers: ['0°C', '10°C', '-10°C', '100°C'],
        correct: '0°C'
    },
    {
        id: "speed-019",
        question: 'Which instrument has black and white keys?',
        answers: ['Piano', 'Violin', 'Trumpet', 'Flute'],
        correct: 'Piano'
    },
    {
        id: "speed-020",
        question: 'How many wheels does a standard bicycle have?',
        answers: ['2', '3', '4', '1'],
        correct: '2'
    },
    {
        id: "speed-021",
        question: 'Which planet is closest to the Sun?',
        answers: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correct: 'Mercury'
    },
    {
        id: "speed-022",
        question: 'What is the tallest land animal?',
        answers: ['Giraffe', 'Elephant', 'Horse', 'Camel'],
        correct: 'Giraffe'
    },
    {
        id: "speed-023",
        question: 'Which country is London the capital of?',
        answers: ['United Kingdom', 'Ireland', 'France', 'England'],
        correct: 'United Kingdom'
    },
    {
        id: "speed-024",
        question: 'How many days are in a week?',
        answers: ['7', '6', '8', '5'],
        correct: '7'
    },
    {
        id: "speed-025",
        question: 'Which shape has three sides?',
        answers: ['Triangle', 'Square', 'Pentagon', 'Circle'],
        correct: 'Triangle'
    },
    {
        id: "speed-026",
        question: 'What is 15 + 27?',
        answers: ['42', '41', '43', '52'],
        correct: '42'
    },
    {
        id: "speed-027",
        question: 'Which bird cannot fly and is strongly associated with Antarctica?',
        answers: ['Penguin', 'Eagle', 'Swan', 'Owl'],
        correct: 'Penguin'
    },
    {
        id: "speed-028",
        question: 'What is the chemical symbol for gold?',
        answers: ['Au', 'Ag', 'Gd', 'Go'],
        correct: 'Au'
    },
    {
        id: "speed-029",
        question: 'Which famous clock tower is in London?',
        answers: ['Big Ben', 'Leaning Tower', "Clock of St Mark's", 'Elizabeth Tower of Paris'],
        correct: 'Big Ben'
    },
    {
        id: "speed-030",
        question: 'What is the smallest prime number?',
        answers: ['2', '1', '3', '0'],
        correct: '2'
    },
    {
        id: "speed-031",
        question: 'Which sea creature has eight arms?',
        answers: ['Octopus', 'Squid', 'Starfish', 'Crab'],
        correct: 'Octopus'
    },
    {
        id: "speed-032",
        question: 'What is the capital of Scotland?',
        answers: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
        correct: 'Edinburgh'
    },
    {
        id: "speed-033",
        question: 'Which planet is famous for its rings?',
        answers: ['Saturn', 'Mars', 'Venus', 'Mercury'],
        correct: 'Saturn'
    },
    {
        id: "speed-034",
        question: 'How many colours are traditionally in a rainbow?',
        answers: ['7', '6', '8', '5'],
        correct: '7'
    },
    {
        id: "speed-035",
        question: 'Which fruit is traditionally used to make guacamole?',
        answers: ['Avocado', 'Mango', 'Lime', 'Apple'],
        correct: 'Avocado'
    },
    {
        id: "speed-036",
        question: 'What is 12 squared?',
        answers: ['144', '124', '132', '154'],
        correct: '144'
    },
    {
        id: "speed-037",
        question: 'Which metal is liquid at room temperature?',
        answers: ['Mercury', 'Iron', 'Copper', 'Silver'],
        correct: 'Mercury'
    },
    {
        id: "speed-038",
        question: 'Which country gave the Statue of Liberty to the United States?',
        answers: ['France', 'Spain', 'Italy', 'Canada'],
        correct: 'France'
    },
    {
        id: "speed-039",
        question: 'What is the largest mammal on Earth?',
        answers: ['Blue whale', 'Elephant', 'Giraffe', 'Orca'],
        correct: 'Blue whale'
    },
    {
        id: "speed-040",
        question: 'Which direction does the sun rise from?',
        answers: ['East', 'West', 'North', 'South'],
        correct: 'East'
    },
    {
        id: "speed-041",
        question: 'What is 50% of 80?',
        answers: ['40', '30', '50', '60'],
        correct: '40'
    },
    {
        id: "speed-042",
        question: 'Which famous detective lived at 221B Baker Street?',
        answers: ['Sherlock Holmes', 'Hercule Poirot', 'Miss Marple', 'Columbo'],
        correct: 'Sherlock Holmes'
    },
    {
        id: "speed-043",
        question: 'How many months have 31 days?',
        answers: ['7', '6', '5', '8'],
        correct: '7'
    },
    {
        id: "speed-044",
        question: 'Which country is shaped like a boot?',
        answers: ['Italy', 'Portugal', 'Greece', 'Chile'],
        correct: 'Italy'
    },
    {
        id: "speed-045",
        question: 'What is the main language spoken in Brazil?',
        answers: ['Portuguese', 'Spanish', 'French', 'English'],
        correct: 'Portuguese'
    },
    {
        id: "speed-046",
        question: 'Which organ pumps blood around the human body?',
        answers: ['Heart', 'Lung', 'Liver', 'Kidney'],
        correct: 'Heart'
    },
    {
        id: "speed-047",
        question: 'What is 7 × 7?',
        answers: ['49', '42', '56', '63'],
        correct: '49'
    },
    {
        id: "speed-048",
        question: 'Which Disney character is a wooden puppet?',
        answers: ['Pinocchio', 'Aladdin', 'Dumbo', 'Simba'],
        correct: 'Pinocchio'
    },
    {
        id: "speed-049",
        question: 'What is the capital of Spain?',
        answers: ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
        correct: 'Madrid'
    },
    {
        id: "speed-050",
        question: "Which gas makes up most of Earth's atmosphere?",
        answers: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen'],
        correct: 'Nitrogen'
    },
    {
        id: "speed-051",
        question: 'How many legs does a spider have?',
        answers: ['8', '6', '10', '12'],
        correct: '8'
    },
    {
        id: "speed-052",
        question: 'Which sport is played at Wimbledon?',
        answers: ['Tennis', 'Cricket', 'Golf', 'Rugby'],
        correct: 'Tennis'
    },
    {
        id: "speed-053",
        question: 'What is the square root of 81?',
        answers: ['9', '8', '7', '10'],
        correct: '9'
    },
    {
        id: "speed-054",
        question: 'Which famous ship sank in 1912?',
        answers: ['Titanic', 'Mayflower', 'Beagle', 'Endeavour'],
        correct: 'Titanic'
    },
    {
        id: "speed-055",
        question: 'What is the capital of Germany?',
        answers: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
        correct: 'Berlin'
    },
    {
        id: "speed-056",
        question: 'Which animal produces wool?',
        answers: ['Sheep', 'Cow', 'Goat', 'Horse'],
        correct: 'Sheep'
    },
    {
        id: "speed-057",
        question: 'How many degrees are in a right angle?',
        answers: ['90', '45', '180', '360'],
        correct: '90'
    },
    {
        id: "speed-058",
        question: 'Which planet do we live on?',
        answers: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        correct: 'Earth'
    },
    {
        id: "speed-059",
        question: 'What is the first letter of the Greek alphabet?',
        answers: ['Alpha', 'Beta', 'Gamma', 'Delta'],
        correct: 'Alpha'
    },
    {
        id: "speed-060",
        question: 'Which drink is traditionally made from fermented grapes?',
        answers: ['Wine', 'Tea', 'Coffee', 'Lemonade'],
        correct: 'Wine'
    },
    {
        id: "speed-061",
        question: 'What is 1000 metres equal to?',
        answers: ['1 kilometre', '10 kilometres', '100 centimetres', '1 mile'],
        correct: '1 kilometre'
    }
];

function getSpeedQuestionById(id) {
    return SPEED_QUESTIONS.find(question => question.id === id) || null;
}

function getRandomSpeedQuestion(usedQuestionIds = new Set()) {
    const used = usedQuestionIds instanceof Set
        ? usedQuestionIds
        : new Set(usedQuestionIds || []);

    const available = SPEED_QUESTIONS.filter(question => !used.has(question.id));
    if (!available.length) return null;

    return available[Math.floor(Math.random() * available.length)];
}
