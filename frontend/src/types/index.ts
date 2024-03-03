export interface Cat {
  id: string;
  name: string;
  birth: string;
  location: string;
  image: string;
  food: string;
  height: number;
  weight: number;
  likes: number;
}

export interface CatSession {
  cat_id:     string;
  session_id: string;
  id:         string;
}