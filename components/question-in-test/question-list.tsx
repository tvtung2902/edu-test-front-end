"use client"

import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import type { Question } from "@/components/question-in-test/test-creator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, GripVertical, CheckSquare, Square } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

type QuestionItemProps = {
  question: Question
  index: number
  onEdit: (id: string, question: Omit<Question, "id">) => void
  onDelete: (id: string) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
}

const QuestionItem = ({ question, index, onEdit, onDelete, onMove }: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: "QUESTION",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "QUESTION",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <Card className={`mb-3 ${isDragging ? "opacity-50" : ""}`} ref={preview as any}>
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <div ref={ref} className="cursor-move mt-1 p-1 rounded hover:bg-muted">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto text-left font-medium hover:bg-transparent">
                      <span className="mr-2">{index + 1}.</span> {question.text}
                    </Button>
                  </CollapsibleTrigger>
                  <Badge variant={question.type === "single" ? "default" : "secondary"}>
                    {question.type === "single" ? "Single Choice" : "Multiple Choice"}
                  </Badge>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(question.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>

              <CollapsibleContent>
                <div className="pl-6 mt-2 space-y-4">
                  {question.imageUrl && (
                    <div className="border rounded-md p-2 max-w-md">
                      <img
                        src={question.imageUrl || "/placeholder.svg"}
                        alt="Question image"
                        className="max-h-[200px] object-contain mx-auto"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=300"
                          ;(e.target as HTMLImageElement).alt = "Image failed to load"
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    {question.options.map((option, i) => (
                      <div key={option.id} className="flex items-start gap-2 mb-1">
                        <div className="mt-0.5">
                          {question.type === "single" ? (
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${option.isCorrect ? "bg-green-100 text-green-700 border border-green-300" : "bg-muted text-muted-foreground"}`}
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                          ) : option.isCorrect ? (
                            <CheckSquare className="h-5 w-5 text-green-600" />
                          ) : (
                            <Square className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span>{option.text}</span>
                          {option.imageUrl && (
                            <div className="mt-1 border rounded-md p-2 max-w-[200px]">
                              <img
                                src={option.imageUrl || "/placeholder.svg"}
                                alt={`Option ${String.fromCharCode(65 + i)} image`}
                                className="max-h-[100px] object-contain mx-auto"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=100&width=150"
                                  ;(e.target as HTMLImageElement).alt = "Image failed to load"
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {isEditing && (
              // <div className="mt-4 border-t pt-4">
              //   <QuestionForm
              //     initialData={question}
              //     onSubmit={(updatedQuestion) => {
              //       onEdit(question.id, updatedQuestion)
              //       setIsEditing(false)
              //     }}
              //     onCancel={() => setIsEditing(false)}
              //   />
              // </div>
              <></>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type QuestionListProps = {
  questions: Question[]
  onEdit: (id: string, question: Omit<Question, "id">) => void
  onDelete: (id: string) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
}

export function QuestionList({ questions, onEdit, onDelete, onMove }: QuestionListProps) {
  return (
    <div>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  )
}
