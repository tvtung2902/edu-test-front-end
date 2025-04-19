import Category from "./Category";

export interface Question {
    id: number;
    content: string;
    explanation: string;
    image: string;
    categories: Category[];
    createdAt: Date;
}
  