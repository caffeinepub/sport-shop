// Seeded product catalog for the Sports Shop
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cricket Bat',
    price: 89.99,
    description: 'Professional grade cricket bat for serious players'
  },
  {
    id: '2',
    name: 'Football',
    price: 34.99,
    description: 'Official size and weight football for matches'
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Lightweight running shoes with superior cushioning'
  },
  {
    id: '4',
    name: 'Tennis Racket',
    price: 159.99,
    description: 'Carbon fiber tennis racket for power and control'
  },
  {
    id: '5',
    name: 'Sports Jersey',
    price: 49.99,
    description: 'Breathable sports jersey with moisture-wicking fabric'
  }
];
