export interface NewsMedia {
  type: 'image' | 'video';
  src: string;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string; // ISO
  image: string;
  category: string;
  excerpt: string;
  content: string;
  media?: NewsMedia[];
}
