'use client'
import { Question } from "@/types/Question"
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchQuestions, deleteQuestion } from "@/redux/features/questionSlice";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSearchParams } from "next/navigation";
import QuestionItem from "./questionItem";

export default function QuestionList() {
    const {questions} = useSelector((state: RootState) => state.questions);
    const dispatch = useDispatch<AppDispatch>();
    const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 0;
    const content = searchParams.get('content') || '';
    const categoryIds = useMemo(() => {
      const raw = searchParams.get('categoryIds');
      return raw ? raw.split(',').map(Number) : [];
    }, [searchParams]);    

    useEffect(() => {
      console.log("content", content);
      console.log("categoryIds", categoryIds);
      console.log("pageNo", pageNo);
        dispatch(fetchQuestions({content, categoryIds, pageNo}) as any);
    }, [content, pageNo, categoryIds]);

    const handleDeleteQuestion = (question: Question) => {
        setQuestionToDelete(question);
    };

    const handleConfirmDelete = async () => {
        if (questionToDelete) {
            try {
                setQuestionToDelete(null);
                await dispatch(deleteQuestion(questionToDelete.id) as any);
            } catch (error) {
                console.error("Failed to delete question:", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setQuestionToDelete(null);
    };

    return (
        <>
          <Modal
            title={
              <div className="flex items-center gap-2 text-red-500">
                <ExclamationCircleOutlined />
                <span>Xác nhận xóa</span>
              </div>
            }
            open={questionToDelete !== null}
            onOk={handleConfirmDelete}
            onCancel={handleCancelDelete}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ 
              danger: true,
            }}
          >
            <p>Bạn có chắc chắn muốn xóa câu hỏi này không?</p>
          </Modal>
          {questions.map((question: Question) => (
              <QuestionItem 
                key={question.id} 
                question={question} 
                onDelete={() => handleDeleteQuestion(question)}
              />
          ))}
        </>
    )
} 