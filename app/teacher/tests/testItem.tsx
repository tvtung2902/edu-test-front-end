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
import { Clock, FileQuestion, FolderPlus, MoreHorizontal, Pencil, Plus, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Test } from "@/types/Test"

interface TestItemType {
    test: Test;
    onDelete: () => void;
}

export default function TestItem({ test, onDelete }: TestItemType) {
    return (
        <Link href={`/teacher/tests/${test.id}/questions`}>
            <Card className="overflow-hidden">
                <div className="relative h-[140px] w-full overflow-hidden bg-muted">
                    <Image priority src={test.image || "/placeholder.svg"} alt={test.name} fill className="object-cover" />
                    <div
                        className={`absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-medium ${test.isPublic
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                    >
                        {test.isPublic ? "Công khai" : "Không công khai"}
                    </div>
                </div>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            English
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link href={`/teacher/tests/${test.id}`}>
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit test
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FolderPlus className="mr-2 h-4 w-4" />
                                    Add to group
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={onDelete}>Delete test</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <CardTitle className="line-clamp-1">{test.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{test.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <FileQuestion className="h-4 w-4 text-muted-foreground" />
                            <span>{test.numberOfQuestions} câu hỏi</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{test.duration} minutes</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <div className="text-xs text-muted-foreground">Created {test.createdAt}</div>
                </CardFooter>
            </Card>
        </Link>
    )
}