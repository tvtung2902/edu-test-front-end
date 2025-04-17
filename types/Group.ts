export interface Group {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  numberOfTests: number;
  numberOfMembers: number;
  isPublic: boolean;
  code: string;
}