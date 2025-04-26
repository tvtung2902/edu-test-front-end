"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionList } from "./question-list"
import { TestPreview } from "./test-preview"
import { Save, FileDown } from "lucide-react"
import QuestionForm from "../forms/question-form"

export type QuestionType = "single" | "multiple"

export type Option = {
  id: string
  text: string
  isCorrect: boolean
  imageUrl?: string
}

export type Question = {
  id: string
  text: string
  imageUrl?: string
  type: QuestionType
  options: Option[]
}

export function TestCreator() {
  const [testTitle, setTestTitle] = useState("Test 1")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentTab, setCurrentTab] = useState("edit")

  const addQuestion = (question: Omit<Question, "id">) => {
    const newQuestion = {
      //fake data
      id: `question-${Date.now()}`,
      text: "What is the capital of France?",
      imageUrl: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
      type: "single" as QuestionType,
      options: [
        {
          id: "1",
          text: "Paris",
          isCorrect: true,
          imageUrl: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
        },
        {
          id: "2",
          text: "Paris",
          isCorrect: true,
          imageUrl: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
        },
        {
          id: "3",
          text: "Paris",
          isCorrect: true,
          imageUrl: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
        }
      ],
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updatedQuestion: Omit<Question, "id">) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...updatedQuestion, id } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const draggedQuestion = questions[dragIndex]
    const newQuestions = [...questions]
    newQuestions.splice(dragIndex, 1)
    newQuestions.splice(hoverIndex, 0, draggedQuestion)
    setQuestions(newQuestions)
  }

  const saveTest = () => {
    const testData = {
      title: testTitle,
      questions: questions,
    }

    const blob = new Blob([JSON.stringify(testData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${testTitle.replace(/\s+/g, "-").toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleAddQuestion = () => {
    addQuestion({
      text: "New Question",
      type: "single" as QuestionType,
      options: [
        { id: "1", text: "Option 1", isCorrect: false },
        { id: "2", text: "Option 2", isCorrect: false }
      ]
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="test-title">Test 1</Label>
          <Button variant="outline" onClick={handleAddQuestion}>Add Question</Button>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="edit">Edit Test</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveTest}>
                <Save className="h-4 w-4 mr-2" />
                Save Test
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const printWindow = window.open("", "_blank")
                  if (printWindow) {
                    printWindow.document.write(`
                    <html>
                      <head>
                        <title>${testTitle}</title>
                        <style>
                          body { font-family: system-ui, sans-serif; padding: 2rem; }
                          .question { margin-bottom: 1.5rem; }
                          .options { margin-left: 1.5rem; }
                          img { max-width: 100%; height: auto; margin: 10px 0; }
                        </style>
                      </head>
                      <body>
                        <h1>${testTitle}</h1>
                        ${questions
                        .map(
                          (q, i) => `
                          <div class="question">
                            <p><strong>${i + 1}. ${q.text}</strong></p>
                            ${q.imageUrl ? `<img src="${q.imageUrl}" alt="Question image">` : ""}
                            <div class="options">
                              ${q.options
                              .map(
                                (o, j) => `
                                <p>${String.fromCharCode(65 + j)}. ${o.text}</p>
                                ${o.imageUrl ? `<img src="${o.imageUrl}" alt="Option image" style="max-width: 200px;">` : ""}
                              `,
                              )
                              .join("")}
                            </div>
                          </div>
                        `,
                        )
                        .join("")}
                      </body>
                    </html>
                  `)
                    printWindow.document.close()
                    printWindow.print()
                  }
                }}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <TabsContent value="edit" className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              {questions.length > 0 ? (
                <QuestionList
                  questions={questions}
                  onEdit={updateQuestion}
                  onDelete={removeQuestion}
                  onMove={moveQuestion}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No questions added yet. Add your first question below.
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
            <QuestionForm categories={[]} isEdit={false} onSubmit={() => { }} />
          </TabsContent>

          <TabsContent value="preview">
            <TestPreview title={testTitle} questions={questions} />
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  )
}
