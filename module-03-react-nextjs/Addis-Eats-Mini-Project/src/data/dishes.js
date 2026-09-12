// Sample dish data — replace with your API fetch later.
// Price is in ETB (Ethiopian Birr).

export const dishes = [
  {
    id: 'doro-wot',
    title: 'Doro Wot',
    price: 320,
    tag: "Chef's pick",
    category: 'stews',
    rating: 4.9,
    reviews: 128,
    emoji: '🥘',
    c1: '#E2683A',
    c2: '#A23A1B',
    description:
      'Slow-stewed chicken drumstick in a berbere-spiced sauce with hard-boiled egg and injera.'
  },
  {
    id: 'kitfo',
    title: 'Kitfo',
    price: 380,
    tag: 'Bestseller',
    category: 'meat',
    rating: 4.8,
    reviews: 96,
    emoji: '🥩',
    c1: '#C9954B',
    c2: '#7A4A1E',
    description:
      'Hand-minced lean beef seasoned with mitmita spice and herbed butter. Served rare, medium, or well-done.'
  },
  {
    id: 'shiro',
    title: 'Shiro',
    price: 150,
    tag: 'Vegan',
    category: 'vegan',
    rating: 4.7,
    reviews: 204,
    emoji: '🌱',
    c1: '#6E8E3E',
    c2: '#3F5A21',
    description:
      'Creamy chickpea flour stew slow-simmered with garlic, ginger, and a touch of berbere.'
  },
  {
    id: 'baklava',
    title: 'Baklava',
    price: 90,
    tag: 'New',
    category: 'desserts',
    rating: 4.9,
    reviews: 58,
    emoji: '🍮',
    c1: '#D9A441',
    c2: '#8E5C12',
    description:
      'Layers of paper-thin filo, walnut, and honey syrup. A sweet finish to any meal.'
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
