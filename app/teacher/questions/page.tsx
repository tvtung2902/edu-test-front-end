import Link from "next/link"
import QuestionList from "./question-list"
import QuestionSearch from "./question-search"
import FilterPopover from "./filter"
import { Button } from "antd"
import { Plus } from "lucide-react"

export default function QuestionsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between" style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                borderRadius: 10,
                padding: 20,
                backgroundColor: 'white'
            }}>
                <div className="flex justify-start gap-4">
                    <QuestionSearch />
                    <FilterPopover />
                </div>
                <Link href="/teacher/questions/create">
                    <Button type="primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                    </Button>
                </Link>
            </div>
            <QuestionList />
        </div>
    )
}
