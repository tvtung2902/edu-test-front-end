import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Question } from "@/types/Question"

interface QuestionItemType {
    question: Question;
    onDelete: () => void;
}

export default function QuestionItem({question, onDelete}: QuestionItemType) {
    return ( 
        <Card className="overflow-hidden">
            <div className="relative h-[140px] w-full overflow-hidden bg-muted">
                <Image priority src={question.image || "/placeholder.svg"} alt="Question image" fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {question.categories.map((category) => (
                            <div key={category.id} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                {category.name}
                            </div>
                        ))}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={`/teacher/questions/${question.id}`}>
                                <DropdownMenuItem>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit question
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={onDelete}>Delete question</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1">{question.content}</CardTitle>
                <CardDescription className="line-clamp-2">{question.explanation}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
                <div className="text-xs text-muted-foreground">Created {new Date(question.createdAt).toLocaleDateString()}</div>
            </CardFooter>
        </Card>
    )
} 