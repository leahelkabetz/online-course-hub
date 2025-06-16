
export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  students: number;
  rating: number;
  badge?: string;
  image?: string;
}