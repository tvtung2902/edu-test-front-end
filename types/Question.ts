// types/SortQuestionTestDTO.ts

export interface SortQuestionTestDTO {
  orderNumber: number;
  questionId: number;
}
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

export interface QuestionInTest extends Question {
    orderNumber: number;
}

export interface QuestionDTO {
  content: string;
  explanation: string;
  categoryIds: number[];
  choices: OptionRequestDTO[];
  changedImg?: boolean
}

export interface QuestionTestRequestDTO {
  questionIds: number[];
}


export interface SortQuestionTestDTO {
  orderNumber: number;
  questionId: number;
}

export interface DeleteQuestionTestDTO {
  orderNumber: number;
  questionId: number;
}