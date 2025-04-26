'use client'
import QuestionsAction from "./action";
import QuestionForm from "@/components/forms/question-form";
import { useEffect, useState } from "react";
import { deleteQuestionFromTest, fetchQuestionsInTest, sortQuestionsInTest } from "@/redux/features/questionTestSlice";
import { AppDispatch, RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionList } from "./question-in-test-list";
import { Question as BackendQuestion, DeleteQuestionTestDTO, Question, QuestionInTest, SortQuestionTestDTO } from "@/types/Question";
import { useParams } from "next/navigation";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { fetchCategories } from "@/redux/features/categorySlice";
import { Button, Space, message } from "antd";

export default function ContentOfPage({ testId }: { testId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { questions } = useSelector((state: RootState) => state.questionTest);
    const {categories} = useSelector((state: RootState) => state.categories);
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionInTest | null>(null);
    const [isSorting, setIsSorting] = useState(false);
    const [tempQuestions, setTempQuestions] = useState<QuestionInTest[]>([]);

    const addQuestion = () => {

    }

    const updateQuestion = (question: QuestionInTest) => {
        setSelectedQuestion(question);
    }

    const removeQuestion = (question: QuestionInTest) => {
        const deleteRequest: DeleteQuestionTestDTO = {
            orderNumber: question.orderNumber,
            questionId: question.id
        }
        dispatch(deleteQuestionFromTest({ testId: parseInt(testId), deleteRequest }) as any);
    }

    const moveQuestion = (dragIndex: number, hoverIndex: number) => {
        const draggedQuestion = tempQuestions[dragIndex]
        const newQuestions = [...tempQuestions]
        newQuestions.splice(dragIndex, 1)
        newQuestions.splice(hoverIndex, 0, draggedQuestion)
        setTempQuestions(newQuestions)
    }

    const handleStartSort = () => {
        setIsSorting(true);
        setTempQuestions([...questions]);
    }

    const handleCancelSort = () => {
        setIsSorting(false);
        setTempQuestions([]);
    }

    const handleConfirmSort = async () => {
        try {
            const sortList: SortQuestionTestDTO[] = tempQuestions.map((question, index) => ({
                questionId: question.id,
                orderNumber: index + 1
            }));

            await dispatch(sortQuestionsInTest({
                testId: parseInt(testId),
                sortList
            }) as any);
            
            message.success('Đã sắp xếp câu hỏi thành công');
            setIsSorting(false);
            setTempQuestions([]);
        } catch (error) {
            message.error('Có lỗi xảy ra khi sắp xếp câu hỏi');
        }
    }

    useEffect(() => {
        if (testId) {
            dispatch(fetchQuestionsInTest({ testId: parseInt(testId) }) as any);
        }
    }, [testId]);

    useEffect(() => {
        dispatch(fetchCategories({ showAll: true }) as any);
    }, [dispatch]);

    console.log("questions in content of page", questions);
    return (
        <>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold" data-section="question-list">Danh sách câu hỏi</h2>
                            {isSorting && (
                                <Space>
                                    <Button onClick={handleCancelSort}>Hủy</Button>
                                    <Button type="primary" onClick={handleConfirmSort}>Xác nhận</Button>
                                </Space>
                            )}
                        </div>
                        <div className="min-h-60 max-h-[500px] overflow-y-auto p-5 bg-white rounded-lg">
                            {questions?.length > 0 ? (
                                <QuestionList
                                    key={isSorting ? 'sorting' : questions.length}
                                    questions={isSorting ? tempQuestions : questions}
                                    onEdit={updateQuestion}
                                    onDelete={(question: QuestionInTest) => removeQuestion(question)}
                                    onMove={moveQuestion}
                                    isSorting={isSorting}
                                />
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    Không có câu hỏi nào được thêm vào. Thêm câu hỏi dưới đây.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-20">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold" data-section="question-form">Câu hỏi</h2>
                            <QuestionForm
                                onSubmit={() => { }}
                                onCancel={() => {
                                    setSelectedQuestion(null);
                                }}
                                categories={categories}
                                isEdit={selectedQuestion ? true : false}
                                type="TEST_PAGE"
                                testId={parseInt(testId)}
                                initialData={selectedQuestion}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <QuestionsAction 
                        testId={testId} 
                        setQuestionEdit={setSelectedQuestion} 
                        onStartSort={handleStartSort}
                        isSorting={isSorting}
                    />
                </div>
        </>
    )
}
