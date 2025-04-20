import Category from "./Category";
import { Option, OptionRequestDTO } from "./Option";
export interface Question {
    id: number;
    content: string;
    explanation: string;
    image: string;
    categories: Category[];
    options: Option[];
    createdAt: Date;
}
  
export interface QuestionDTO {
  content: string;
  explanation: string;
  categoryIds: number[];
  choices: OptionRequestDTO[];
  changedImg?: boolean
}
