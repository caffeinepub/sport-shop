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
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '2',
    name: 'Football',
    price: 34.99,
    description: 'Official size and weight football for matches',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Lightweight running shoes with superior cushioning',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '4',
    name: 'Tennis Racket',
    price: 159.99,
    description: 'Carbon fiber tennis racket for power and control',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '5',
    name: 'Sports Jersey',
    price: 49.99,
    description: 'Breathable sports jersey with moisture-wicking fabric',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '6',
    name: 'Jacket',
    price: 79.99,
    description: 'Warm and comfortable sports jacket with wind-resistant fabric',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '7',
    name: 'Half Pant',
    price: 29.99,
    description: 'Lightweight half pants perfect for training and casual wear',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '8',
    name: 'Full Pant',
    price: 44.99,
    description: 'Comfortable full-length sports pants with elastic waistband',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  },
  {
    id: '9',
    name: 'Football T-Shirt',
    price: 39.99,
    description: 'Premium football t-shirt with breathable mesh panels',
    images: [
      '/assets/generated/product-placeholder.dim_256x256.png',
      '/assets/generated/product-placeholder.dim_256x256.png'
    ]
  }
];
