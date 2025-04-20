"use client"

import { useState } from "react"
import type { Question } from "@/components/question-in-test/test-creator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"

type TestPreviewProps = {
  title: string
  questions: Question[]
}

export function TestPreview({ title, questions }: TestPreviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const handleSingleAnswer = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    })
  }

  const handleMultipleAnswer = (questionId: string, optionId: string, checked: boolean) => {
    const currentAnswers = (answers[questionId] as string[]) || []

    let newAnswers: string[]
    if (checked) {
      newAnswers = [...currentAnswers, optionId]
    } else {
      newAnswers = currentAnswers.filter((id) => id !== optionId)
    }

    setAnswers({
      ...answers,
      [questionId]: newAnswers,
    })
  }

  const nextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const isQuestionAnswered = (questionId: string) => {
    if (!answers[questionId]) return false

    if (Array.isArray(answers[questionId])) {
      return (answers[questionId] as string[]).length > 0
    }

    return true
  }

  const calculateScore = () => {
    let correctAnswers = 0
    questions.forEach((question) => {
      const selectedAnswer = answers[question.id]

      if (question.type === "single") {
        const correctOption = question.options.find((o) => o.isCorrect)
        if (selectedAnswer && correctOption && selectedAnswer === correctOption.id) {
          correctAnswers++
        }
      } else {
        // For multiple choice, all correct options must be selected and no incorrect ones
        const selectedOptions = (selectedAnswer as string[]) || []
        const correctOptionIds = question.options.filter((o) => o.isCorrect).map((o) => o.id)
        const incorrectOptionIds = question.options.filter((o) => !o.isCorrect).map((o) => o.id)

        const allCorrectSelected = correctOptionIds.every((id) => selectedOptions.includes(id))
        const noIncorrectSelected = !selectedOptions.some((id) => incorrectOptionIds.includes(id))

        if (allCorrectSelected && noIncorrectSelected) {
          correctAnswers++
        }
      }
    })
    return {
      score: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    }
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">No questions added yet</h2>
        <p className="text-muted-foreground">Add some questions to preview your test</p>
      </div>
    )
  }

  if (showResults) {
    const { score, total, percentage } = calculateScore()
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{title} - Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-2">{percentage}%</div>
            <p className="text-xl">
              You scored {score} out of {total} questions
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Question Review</h3>
            {questions.map((question, index) => {
              let isCorrect = false

              if (question.type === "single") {
                const selectedOptionId = answers[question.id] as string
                const correctOption = question.options.find((o) => o.isCorrect)
                isCorrect = selectedOptionId === correctOption?.id
              } else {
                const selectedOptions = (answers[question.id] as string[]) || []
                const correctOptionIds = question.options.filter((o) => o.isCorrect).map((o) => o.id)
                const incorrectOptionIds = question.options.filter((o) => !o.isCorrect).map((o) => o.id)

                const allCorrectSelected = correctOptionIds.every((id) => selectedOptions.includes(id))
                const noIncorrectSelected = !selectedOptions.some((id) => incorrectOptionIds.includes(id))

                isCorrect = allCorrectSelected && noIncorrectSelected
              }

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className={`flex-none rounded-full w-6 h-6 flex items-center justify-center ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {index + 1}. {question.text}
                      </p>

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

                      <div className="mt-2 pl-2">
                        <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
                        <div className="space-y-1">
                          {question.type === "single" ? (
                            <div>
                              {(() => {
                                const selectedOptionId = answers[question.id] as string
                                const selectedOption = question.options.find((o) => o.id === selectedOptionId)
                                const correctOption = question.options.find((o) => o.isCorrect)

                                return (
                                  <p className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                    {selectedOption ? selectedOption.text : "Not answered"}
                                  </p>
                                )
                              })()}
                            </div>
                          ) : (
                            <div>
                              {(() => {
                                const selectedOptionIds = (answers[question.id] as string[]) || []
                                const selectedOptions = question.options.filter((o) => selectedOptionIds.includes(o.id))

                                return selectedOptions.length > 0 ? (
                                  <ul className="list-disc list-inside">
                                    {selectedOptions.map((option) => (
                                      <li
                                        key={option.id}
                                        className={option.isCorrect ? "text-green-600" : "text-red-600"}
                                      >
                                        {option.text}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-red-600 font-medium">Not answered</p>
                                )
                              })()}
                            </div>
                          )}
                        </div>

                        {!isCorrect && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground mb-1">Correct answer:</p>
                            {question.type === "single" ? (
                              <p className="text-green-600 font-medium">
                                {question.options.find((o) => o.isCorrect)?.text}
                              </p>
                            ) : (
                              <ul className="list-disc list-inside">
                                {question.options
                                  .filter((o) => o.isCorrect)
                                  .map((option) => (
                                    <li key={option.id} className="text-green-600">
                                      {option.text}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowResults(false)}>Back to Test</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {currentQuestion && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>
                {Object.keys(answers).length} of {questions.length} answered
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">{currentQuestion.text}</h3>

              {currentQuestion.imageUrl && (
                <div className="border rounded-md p-2 max-w-md mx-auto">
                  <img
                    src={currentQuestion.imageUrl || "/placeholder.svg"}
                    alt="Question image"
                    className="max-h-[300px] object-contain mx-auto"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=400"
                      ;(e.target as HTMLImageElement).alt = "Image failed to load"
                    }}
                  />
                </div>
              )}

              {currentQuestion.type === "single" ? (
                <RadioGroup
                  value={(answers[currentQuestion.id] as string) || ""}
                  onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, i) => (
                    <div key={option.id} className="flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value={option.id} id={`preview-${option.id}`} className="mt-1" />
                        <Label htmlFor={`preview-${option.id}`} className="flex-1 cursor-pointer">
                          <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                          {option.text}
                        </Label>
                      </div>

                      {option.imageUrl && (
                        <div className="ml-6 border rounded-md p-2 max-w-[300px]">
                          <img
                            src={option.imageUrl || "/placeholder.svg"}
                            alt={`Option ${String.fromCharCode(65 + i)} image`}
                            className="max-h-[150px] object-contain mx-auto"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=150&width=200"
                              ;(e.target as HTMLImageElement).alt = "Image failed to load"
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => {
                    const selectedOptions = (answers[currentQuestion.id] as string[]) || []
                    const isChecked = selectedOptions.includes(option.id)

                    return (
                      <div key={option.id} className="flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id={`preview-${option.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handleMultipleAnswer(currentQuestion.id, option.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <Label htmlFor={`preview-${option.id}`} className="flex-1 cursor-pointer">
                            <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                            {option.text}
                          </Label>
                        </div>

                        {option.imageUrl && (
                          <div className="ml-6 border rounded-md p-2 max-w-[300px]">
                            <img
                              src={option.imageUrl || "/placeholder.svg"}
                              alt={`Option ${String.fromCharCode(65 + i)} image`}
                              className="max-h-[150px] object-contain mx-auto"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=150&width=200"
                                ;(e.target as HTMLImageElement).alt = "Image failed to load"
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevQuestion} disabled={isFirstQuestion}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button onClick={() => setShowResults(true)} disabled={!isQuestionAnswered(currentQuestion.id)}>
                  Show Results
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={nextQuestion}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
