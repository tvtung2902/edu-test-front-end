"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QuestionForm } from "@/components/forms/question-form"
import { Breadcrumb } from "@/components/breadcrumb"
import { ArrowLeft, GripVertical, Plus, Save, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function TestQuestionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What is the value of x in the equation 2x + 5 = 15?",
      type: "single",
      difficulty: "easy",
      options: [
        { text: "5", isCorrect: true },
        { text: "7", isCorrect: false },
        { text: "10", isCorrect: false },
        { text: "15", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "If a rectangle has a length of 8 units and a width of 6 units, what is its area?",
      type: "single",
      difficulty: "medium",
      options: [
        { text: "14 square units", isCorrect: false },
        { text: "28 square units", isCorrect: false },
        { text: "48 square units", isCorrect: true },
        { text: "64 square units", isCorrect: false },
      ],
    },
    {
      id: 3,
      text: "Which of the following are prime numbers?",
      type: "multiple",
      difficulty: "medium",
      options: [
        { text: "2", isCorrect: true },
        { text: "4", isCorrect: false },
        { text: "7", isCorrect: true },
        { text: "9", isCorrect: false },
        { text: "11", isCorrect: true },
      ],
    },
  ])

  const [existingQuestions, setExistingQuestions] = useState([
    {
      id: 4,
      text: "What is the result of 3² × 4?",
      type: "single",
      difficulty: "medium",
      options: [
        { text: "12", isCorrect: false },
        { text: "24", isCorrect: false },
        { text: "36", isCorrect: true },
        { text: "48", isCorrect: false },
      ],
    },
    {
      id: 5,
      text: "Simplify the expression: 2(x + 3) - 4x",
      type: "single",
      difficulty: "hard",
      options: [
        { text: "2x + 6", isCorrect: false },
        { text: "-2x + 6", isCorrect: true },
        { text: "6 - 2x", isCorrect: false },
        { text: "6 - 4x", isCorrect: false },
      ],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setQuestions(items)
  }

  const handleAddQuestion = async (data: any) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newQuestion = {
      id: questions.length + 10, // Just for demo
      ...data,
    }

    setQuestions([...questions, newQuestion])
    setIsSubmitting(false)
    setIsAddDialogOpen(false)
  }

  const handleRemoveQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleSaveTest = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Saving test with questions:", questions)
    setIsSubmitting(false)
    router.push("/teacher/tests")
  }

  const handleToggleQuestion = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id))
    } else {
      setSelectedQuestions([...selectedQuestions, id])
    }
  }

  const handleAddSelectedQuestions = () => {
    const questionsToAdd = existingQuestions.filter((q) => selectedQuestions.includes(q.id))
    setQuestions([...questions, ...questionsToAdd])
    setSelectedQuestions([])
  }

  const filteredExistingQuestions = existingQuestions.filter((q) =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto space-y-6 py-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Questions</h1>
          <p className="text-muted-foreground">Add and organize questions for your test</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSaveTest} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Test"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="existing">Add Existing Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="questions" className="mt-6">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold">Test Questions</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                  <DialogDescription>Create a new question for this test</DialogDescription>
                </DialogHeader>
                <QuestionForm onSubmit={handleAddQuestion} isSubmitting={isSubmitting} mode="create" />
              </DialogContent>
            </Dialog>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {questions.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="mb-4 text-muted-foreground">No questions added yet</p>
                        <Button onClick={() => setIsAddDialogOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Question
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    questions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border-l-4 border-l-primary"
                          >
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{index + 1}</Badge>
                                    <Badge variant={question.type === "single" ? "default" : "secondary"}>
                                      {question.type === "single" ? "Single Answer" : "Multiple Answers"}
                                    </Badge>
                                    <Badge
                                      variant={
                                        question.difficulty === "easy"
                                          ? "outline"
                                          : question.difficulty === "medium"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                    >
                                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                    </Badge>
                                  </div>
                                  <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(question.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                                <CardTitle className="mt-2 text-base">{question.text}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                {question.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className={cn(
                                      "flex items-center gap-2 rounded-md border p-2",
                                      option.isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "flex h-5 w-5 items-center justify-center rounded-full border",
                                        option.isCorrect && "border-green-500 bg-green-500 text-white",
                                      )}
                                    >
                                      {option.isCorrect && (question.type === "single" ? "✓" : "+")}
                                    </div>
                                    <span>{option.text}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
        <TabsContent value="existing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Existing Questions</CardTitle>
              <CardDescription>Select questions from your question bank</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search questions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredExistingQuestions.map((question) => (
                  <div key={question.id} className="flex items-start gap-2 rounded-md border p-4">
                    <Checkbox
                      id={`question-${question.id}`}
                      checked={selectedQuestions.includes(question.id)}
                      onCheckedChange={() => handleToggleQuestion(question.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={`question-${question.id}`} className="font-medium">
                        {question.text}
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant={question.type === "single" ? "default" : "secondary"}>
                          {question.type === "single" ? "Single Answer" : "Multiple Answers"}
                        </Badge>
                        <Badge
                          variant={
                            question.difficulty === "easy"
                              ? "outline"
                              : question.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredExistingQuestions.length === 0 && (
                  <div className="py-4 text-center text-muted-foreground">No questions found matching your search</div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleAddSelectedQuestions} disabled={selectedQuestions.length === 0}>
                  Add Selected Questions ({selectedQuestions.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
