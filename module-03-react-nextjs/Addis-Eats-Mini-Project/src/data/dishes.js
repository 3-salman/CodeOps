// Sample dish data — replace with your API fetch later.
// Price is in ETB (Ethiopian Birr).

export const dishes = [
  {
    "id": "chechebsa",
    "title": "Chechebsa",
    "price": 95,
    "category": "bakery",
    "emoji": "🥞",
    "description": "Shredded flatbread pan-fried in spiced butter and berbere.",
    "image": "/images/chechebsa.jpg"
  },
  {
    "id": "key-wot",
    "title": "Key Wot",
    "price": 290,
    "category": "stews",
    "emoji": "🌶️",
    "description": "A fiery beef stew slow-cooked in a deep red berbere base.",
    "image": "/images/key-wot.jpg"
  },

  {
    "id": "fish-goulash",
    "title": "Asa Wot (Fish Stew)",
    "price": 310,
    "category": "stews",
    "emoji": "🐟",
    "description": "Nile perch simmered in a mild berbere and tomato sauce.",
    "image": "/images/fish-goulash.jpg"
  },
  {
    "id": "zil-tibzs",
    "title": "Zilzil Tibs",
    "price": 355,
    "category": "meat",
    "emoji": "🔥",
    "description": "Thin strips of grilled beef tossed in a spiced awaze sauce.",
    "image": "/images/zil-tibzs.jpg"
  }
]

export const categories = [
  { id: 'all',     label: 'All',      icon: '' },
  { id: 'meat',    label: 'Meat',     icon: '🥩' },
  { id: 'vegan',   label: 'Vegan',    icon: '🌱' },
  { id: 'stews',   label: 'Stews',    icon: '🍲' },
  { id: 'drinks',  label: 'Drinks',   icon: '🫖' },
  { id: 'bakery',  label: 'Bakery',   icon: '🍞' },
  { id: 'desserts',label: 'Desserts', icon: '🍰' }
]
