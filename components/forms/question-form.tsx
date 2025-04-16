"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Plus, Trash2 } from "lucide-react"

const questionFormSchema = z.object({
  text: z.string().min(5, {
    message: "Question text must be at least 5 characters.",
  }),
  type: z.enum(["single", "multiple"], {
    required_error: "Please select a question type.",
  }),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level.",
  }),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text is required"),
        isCorrect: z.boolean().default(false),
      }),
    )
    .min(2, "At least 2 options are required"),
})

type QuestionFormValues = z.infer<typeof questionFormSchema>

interface QuestionFormProps {
  initialData?: Partial<QuestionFormValues>
  onSubmit: (data: QuestionFormValues) => void
  isSubmitting?: boolean
  mode?: "create" | "edit"
}

export function QuestionForm({ initialData, onSubmit, isSubmitting = false, mode = "create" }: QuestionFormProps) {
  const defaultOptions = initialData?.options || [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      text: initialData?.text || "",
      type: initialData?.type || "single",
      difficulty: initialData?.difficulty || "medium",
      options: defaultOptions,
    },
  })

  const questionType = form.watch("type")
  const options = form.watch("options")

  const addOption = () => {
    const currentOptions = form.getValues("options")
    form.setValue("options", [...currentOptions, { text: "", isCorrect: false }])
  }

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options")
    if (currentOptions.length <= 2) return
    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index),
    )
  }

  const handleSingleOptionChange = (index: number) => {
    const currentOptions = form.getValues("options").map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }))
    form.setValue("options", currentOptions)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What is the value of x in the equation 2x + 5 = 15?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single Answer</SelectItem>
                    <SelectItem value="multiple">Multiple Answers</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {questionType === "single"
                    ? "Students can select only one correct answer"
                    : "Students can select multiple correct answers"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Answer Options</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addOption}>
              <Plus className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>

          {questionType === "single" ? (
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 space-y-0 py-2">
                  <RadioGroupItem
                    value={index.toString()}
                    checked={option.isCorrect}
                    onClick={() => handleSingleOptionChange(index)}
                  />
                  <FormField
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Option ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 space-y-0 py-2">
                  <FormField
                    control={form.control}
                    name={`options.${index}.isCorrect`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Option ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {form.formState.errors.options?.message && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.options?.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "create" ? "Creating Question..." : "Updating Question..."}
            </>
          ) : (
            <>{mode === "create" ? "Create Question" : "Update Question"}</>
          )}
        </Button>
      </form>
    </Form>
  )
}
