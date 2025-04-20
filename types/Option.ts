export interface Option  {
    id: string
    content: string
    isCorrect: boolean
    image?: string
  }

export interface OptionRequestDTO {
  id?: string | null,
  content: string
  isCorrect: boolean
  image?: string
  changedImg?: boolean
  added?: boolean
}
