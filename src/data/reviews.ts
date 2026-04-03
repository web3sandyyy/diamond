export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  images?: string[];
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "Fatima Al-Maktoum",
    location: "Dubai, UAE",
    rating: 5,
    title: "Absolutely Breathtaking",
    content: "My fiancé proposed with this ring and I was speechless. The diamond sparkles unlike anything I've ever seen. The team helped him choose the perfect size and even engraved a special message inside the band. Every time I look at it, I fall in love all over again.",
    date: "2024-02-15",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    ],
    helpful: 47,
  },
  {
    id: "r2",
    productId: "1",
    author: "Charlotte Weber",
    location: "Munich, Germany",
    rating: 5,
    title: "Perfect Engagement Ring",
    content: "We researched lab-grown diamonds extensively and chose Lumière for their quality and ethics. The ring arrived beautifully packaged with all certifications. The craftsmanship is exceptional — you truly cannot tell any difference from a mined diamond.",
    date: "2024-01-28",
    verified: true,
    helpful: 32,
  },
  {
    id: "r3",
    productId: "1",
    author: "Sophia Romano",
    location: "Milan, Italy",
    rating: 4,
    title: "Beautiful Ring, Minor Sizing Issue",
    content: "The ring itself is stunning and exactly as pictured. I had a minor issue with sizing (ordered based on the guide but it was slightly large), but customer service was incredibly helpful and handled the exchange seamlessly. Now it fits perfectly!",
    date: "2024-01-10",
    verified: true,
    helpful: 18,
  },
  {
    id: "r4",
    productId: "3",
    author: "Layla Hassan",
    location: "Riyadh, Saudi Arabia",
    rating: 5,
    title: "My Everyday Luxury",
    content: "I wear these studs every single day and they still look as brilliant as when I first opened the box. The screw backs give me confidence that they won't fall out. I've received countless compliments. Worth every cent.",
    date: "2024-02-20",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    ],
    helpful: 89,
  },
  {
    id: "r5",
    productId: "5",
    author: "Emma Lindqvist",
    location: "Stockholm, Sweden",
    rating: 5,
    title: "The Perfect Gift",
    content: "Purchased this as a birthday gift for my mother. The presentation was impeccable — the packaging alone made her emotional before she even saw the necklace. The diamond catches light beautifully and the adjustable chain means she can wear it with anything.",
    date: "2024-03-05",
    verified: true,
    helpful: 56,
  },
  {
    id: "r6",
    productId: "7",
    author: "Aisha Patel",
    location: "London, UK",
    rating: 5,
    title: "Investment Piece",
    content: "I saved up for this tennis bracelet and it exceeded all expectations. The diamonds are perfectly matched and the clasp is secure but easy to operate. It elevates every outfit — from casual to formal. Highly recommend the book-a-consultation service for such an important purchase.",
    date: "2024-02-01",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
    ],
    helpful: 73,
  },
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter((review) => review.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / productReviews.length;
};
