// Seeded product catalog for the Sports Shop
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cricket Bat',
    price: 89.99,
    description: 'Professional grade cricket bat for serious players',
    images: [
      '/assets/generated/cricket-bat-1.dim_256x256.png',
      '/assets/generated/cricket-bat-2.dim_256x256.png',
      '/assets/generated/cricket-bat-3.dim_256x256.png'
    ]
  },
  {
    id: '2',
    name: 'Football',
    price: 34.99,
    description: 'Official size and weight football for matches',
    images: [
      '/assets/generated/football-1.dim_256x256.png',
      '/assets/generated/football-2.dim_256x256.png'
    ]
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Lightweight running shoes with superior cushioning',
    images: [
      '/assets/generated/running-shoes-1.dim_256x256.png',
      '/assets/generated/running-shoes-2.dim_256x256.png',
      '/assets/generated/running-shoes-3.dim_256x256.png'
    ]
  },
  {
    id: '4',
    name: 'Tennis Racket',
    price: 159.99,
    description: 'Carbon fiber tennis racket for power and control',
    images: [
      '/assets/generated/tennis-racket-1.dim_256x256.png',
      '/assets/generated/tennis-racket-2.dim_256x256.png'
    ]
  },
  {
    id: '5',
    name: 'Sports Jersey',
    price: 49.99,
    description: 'Breathable sports jersey with moisture-wicking fabric',
    images: [
      '/assets/generated/sports-jersey-1.dim_256x256.png',
      '/assets/generated/sports-jersey-2.dim_256x256.png'
    ]
  },
  {
    id: '6',
    name: 'Jacket',
    price: 79.99,
    description: 'Warm and comfortable sports jacket with wind-resistant fabric',
    images: [
      '/assets/generated/jacket-1.dim_256x256.png',
      '/assets/generated/jacket-2.dim_256x256.png'
    ]
  },
  {
    id: '7',
    name: 'Half Pant',
    price: 29.99,
    description: 'Lightweight half pants perfect for training and casual wear',
    images: [
      '/assets/generated/half-pant-1.dim_256x256.png',
      '/assets/generated/half-pant-2.dim_256x256.png'
    ]
  },
  {
    id: '8',
    name: 'Full Pant',
    price: 44.99,
    description: 'Comfortable full-length sports pants with elastic waistband',
    images: [
      '/assets/generated/full-pant-1.dim_256x256.png',
      '/assets/generated/full-pant-2.dim_256x256.png'
    ]
  },
  {
    id: '9',
    name: 'Football T-Shirt',
    price: 39.99,
    description: 'Premium football t-shirt with breathable mesh panels',
    images: [
      '/assets/generated/football-tshirt-1.dim_256x256.png',
      '/assets/generated/football-tshirt-2.dim_256x256.png'
    ]
  }
];
