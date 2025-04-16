import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, FileQuestion, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"

// Sample questions data
const questions = [
  {
    id: 1,
    text: "What is the value of x in the equation 2x + 5 = 15?",
    type: "Multiple Choice",
    test: "Mathematics Fundamentals",
    difficulty: "Easy",
    createdAt: "Jan 12, 2023",
  },
  {
    id: 2,
    text: "Identify the subject in the following sentence: 'The quick brown fox jumps over the lazy dog.'",
    type: "Multiple Choice",
    test: "English Grammar",
    difficulty: "Medium",
    createdAt: "Feb 15, 2023",
  },
  {
    id: 3,
    text: "What is the chemical symbol for gold?",
    type: "Multiple Choice",
    test: "Science Basics",
    difficulty: "Easy",
    createdAt: "Mar 3, 2023",
  },
  {
    id: 4,
    text: "In which year did World War II end?",
    type: "Multiple Choice",
    test: "History: World War II",
    difficulty: "Easy",
    createdAt: "Apr 22, 2023",
  },
  {
    id: 5,
    text: "What is the time complexity of a binary search algorithm?",
    type: "Multiple Choice",
    test: "Computer Science Basics",
    difficulty: "Hard",
    createdAt: "May 9, 2023",
  },
  {
    id: 6,
    text: "What is the capital of Australia?",
    type: "Multiple Choice",
    test: "Geography Quiz",
    difficulty: "Medium",
    createdAt: "Jun 17, 2023",
  },
]

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Management</h1>
          <p className="text-muted-foreground">Create and manage questions for your tests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Question
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Questions</CardTitle>
          <CardDescription>Total of {questions.length} questions in your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search questions..." className="w-[250px] pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-[400px]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10">
                          <FileQuestion className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-medium line-clamp-1">{question.text}</div>
                      </div>
                    </TableCell>
                    <TableCell>{question.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.test}</Badge>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          question.difficulty === "Easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : question.difficulty === "Medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {question.difficulty}
                      </div>
                    </TableCell>
                    <TableCell>{question.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit question</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete question</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>6</strong> of <strong>50</strong> results
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
