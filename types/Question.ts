import Category from "./Category";
import { Option } from "./Option";
export interface Question {
    id: number;
    content: string;
    explanation: string;
    image: string;
    categories: Category[];
    options: Option[];
    createdAt: Date;
}
  