// RandomGenerator.js
export class RandomGenerator {
  static randomLetter() {
    const letters = 'BCDFGHJKLMNPQRSTVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }

  static randomVowel() {
    const vowels = 'AEIOU';
    return vowels[Math.floor(Math.random() * vowels.length)] + '...';
  }

  static randomNoun() {
    const nouns = [
    "apple", "banana", "pineapple", "carrot", "dog", "cat", "hammer", "screwdriver", "nail", "pencil",
    "book", "cup", "plate", "fork", "knife", "spoon", "lamp", "shoe", "hat", "glove", "scissors", "glasses",
    "watch", "wallet", "guitar", "violin", "drum", "piano", "mouse",
     "ball", "frisbee", "kite", "skateboard", "rollerblade", "bicycle", 
     "parachute", "telescope", "microscope", "binoculars", "umbrella", "clock", "key", "ring", 
    "coin", "straw", "bottle", "candle", "matchbox", "rubber band", "chalk", "paintbrush", "easel", "notebook", 
    "pen", "pencil sharpener", "sunglasses", "shoes", "boots", "belt", "bracelet", "necklace", "earring", 
    "watch", "wallet", "glove", "fishing rod", "tent", "sleeping bag", "water bottle", "rock", "gemstone", "pebble",
    "shell", "leaf", "flower", "twig", "branch", "pinecone", "acorn", "mushroom", "fern", "grass", "tree", 
    "bird", "butterfly", "spider", "ant", "bee", "ladybug", "worm", "snail", "dragonfly", "cricket", "grasshopper",
    "caterpillar", "frog", "toad", "lizard", "snake", "rabbit", "squirrel", "deer", "fox", "mouse", "rat", "bat", 
    "hawk", "owl", "sparrow", "eagle", "crow", "pigeon", "dove", "parrot", "swan", "goose", "duck", "turkey", 
    "chicken", "cow", "horse", "sheep", "pig", "goat", "llama", "alpaca", "camel", "kangaroo", "koala", "platypus", 
    "kangaroo", "wallaby", "elephant", "rhinoceros", "hippopotamus", "hippopotamus", "giraffe", "zebra", "tiger", 
    "lion", "cheetah", "leopard", "gorilla", "chimpanzee", "orangutan", "monkey", "donkey", "mule", "buffalo", 
    "bison", "deer", "moose", "elk", "camel", "goose", "horse", "rabbit", "mouse", "butterfly", "honeybee", 
    "firefly", "dragonfly", "ladybug", "fly", "mosquito", "cockroach", "ant", "termite", "wasp",  
    "bee", "ladybug", "caterpillar", "dragonfly", "pigeon", "rat", "mole", "hedgehog", "chipmunk", "marmot", 
    "woodpecker", "beetle", "caterpillar", "owl", "toad", "clam", "starfish", "sea shell", "octopus", "scorpion",
    "tarantula", "seahorse", "jellyfish", "squid", "clam", "sea urchin", "sea cucumber", "lobster", "crab", "shrimp", 
    "shrimp", "clams", "barnacle", "coral", "sea sponge", "water lily", "pond", "swamp", "brook", "stream", "river",
    "creek", "waterfall", "ocean", "lake", "oasis", "bay", "beach", "sand", "dune", "rockpool", "snow", "ice",
    "hail", "hailstone", "snowflake", "frost", "dew", "mist", "rain", "snowman", "snowball", "icicle", "snowshoe",
    "skis", "snowboard", "sled", "sledges", "toboggan", "ice skates", "shovel", "brush", "spade", "hoe", "rake", 
    "fork", "pitchfork", "hoe", "wrench", "tape measure", "spanner", "pliers", "file", "saw", "axe", "machete",
    "crowbar", "chisel", "mallet", "trowel", "broom", "dustpan", "bucket", "pail", "ladle", "pitcher", "vase", 
    "flowerpot", "planter", "watering can", "faucet", "hose", "garden shears", "pruner", "weed trimmer",
    "stool", "chair", "table", "cushion", "mattress", "blanket", "pillow", "quilt", "carpet", "rug", "doormat", 
    "curtain", "towel", "sheets", "bedspread", "clock", "door handle", "doorknob", "lock", "key", "paperclip", 
    "stapler", "rubber band", "sticky note", "marker", "highlighter", "sharpener", "binder", 
    "folder", "envelope", "letter", "mail", "magazine", "newspaper", "card", "poster", "tape", "glue stick",
     "duct tape", "string", "cord", "wire", "chain", "rope", "net", "web", "thread", "needle", 
    "scissors", "measuring tape", "compass", "protractor", "ruler", "calculator", "abacus", "glue gun", "glue", 
    "paint", "paintbrush", "canvas", "easel", "watercolor", "acrylic paint", "oil paint", "pastels", "charcoal", 
    "graphite", "sketchpad", "sketchbook", "clay", "sculpting tool", "sewing kit", "knitting", "crochet", "yarn",
    "fabric", "thread", "fabric glue", "scotch tape", "tissue", "napkin", "wipe", "band-aid", 
    "toothbrush", "toothpaste", "razor", "shampoo", "conditioner", "soap", "lotion", "nail clipper", "nail file", 
    "mirror", "comb", "brush", "tweezers", "hair tie", "hairpin", "lip balm", "perfume", "deodorant",  
    "shaving cream", "toilet paper", "bath towel", "hand towel", "washcloth", "kitchen towel", "dishcloth", "sponge",
    "scrubber", "dishwasher", "oven", "stove", "microwave", "refrigerator", "freezer", "broom", "bucket", "frying pan",
    "pot", "pan", "teapot", "coffee pot", "teacup", "coffee cup", "mug", "plate", "bowl", "serving tray", "knife",
    "fork", "spoon", "chopsticks", "toothpick", "napkin", "wine glass", "champagne glass", "beer mug", "champagne flute",
    "whisk", "strainer", "colander", "ladle", "measuring cup", "strainer", "rolling pin", "cookie cutter", "baking sheet",
    "oven mitt", "saucepan", "baking dish", "grater", "peeler", "can opener", "opener", "bottle opener", "tongs", "spatula",
    "ladle", "scales", "chopping board", "measuring spoon", "mixing bowl", "spice jar", "salt shaker", "pepper shaker",
    "syrup dispenser", "oil bottle", "vinegar bottle", "sugar bowl", "sugar jar", "flour jar", "flour sifter", "syrup bottle"
  ];
    return nouns[Math.floor(Math.random() * nouns.length)].toLowerCase();
  }

  static randomRelation() {
    const relations = [
        'Mother', 'Father', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Cousin', 'Grandmother', 'Grandfather', 'Niece',
        'Nephew', 'Step-parent', 'Step-sibling', 'Half-sibling', 'Godparent', 'Godchild', 'In-law', 'Spouse', 'Fiance', 'Boyfriend',
        'Girlfriend', 'Partner', 'Ex-lover', 'Ex-spouse', 'Best friend', 'Childhood friend', 'Acquaintance', 'Colleague', 'Boss', 'Mentor',
        'Mentee', 'Neighbor', 'Roommate', 'Classmate', 'Teammate', 'Business partner', 'Client', 'Customer', 'Teacher', 'Student',
        'Coach', 'Therapist', 'Doctor', 'Caregiver', 'Pet owner', 'Foster parent', 'Foster child', 'Landlord', 'Tenant', 'Stranger you met in the store'
    ];
    return relations[Math.floor(Math.random() * relations.length)];
  }

  static randomTrait() {
    const traits = [
        'Kind', 'Jealous', 'Ambitious', 'Generous', 'Anxious', 'Brave', 'Cheerful', 'Curious', 'Diligent', 'Honest',
        'Impulsive', 'Loyal', 'Moody', 'Optimistic', 'Patient', 'Reckless', 'Shy', 'Stubborn', 'Thoughtful', 'Witty',
        'Arrogant', 'Compassionate', 'Dependable', 'Eccentric', 'Friendly', 'Grumpy', 'Humble', 'Insecure', 'Judgmental', 'Naive',
        'Outgoing', 'Pessimistic', 'Quirky', 'Resilient', 'Sensitive', 'Tactful', 'Unreliable', 'Vain', 'Warm-hearted', 'Zealous',
        'Bold', 'Cautious', 'Deceitful', 'Empathetic', 'Fearless', 'Gullible', 'Helpful', 'Idealistic', 'Joyful', 'Mischievous'
    ]
    return traits[Math.floor(Math.random() * traits.length)];
  }

  static randomCombo() {
    return this.randomLetter() + this.randomVowel().toLowerCase();
  }
} 