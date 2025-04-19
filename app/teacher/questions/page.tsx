import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import QuestionList from "./question-list"
import QuestionSearch from "./question-search"
import QuestionPagination from "./question-pagination"
import Test from "./test"

export default function QuestionsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Questions</h1>
                <Link href="/teacher/questions/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                    </Button>
                </Link>
            </div>
            <div className="flex justify-start gap-4">
                <QuestionSearch />
                <Test />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <QuestionList />
            </div>
            <div className="flex justify-center">
                <QuestionPagination />
            </div>
        </div>
    )
}
