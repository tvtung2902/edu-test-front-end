'use client'
import QuestionForm from "@/components/forms/question-form";
import { RootState } from "@/redux/store/store";
import { fetchCategories } from "@/redux/features/categorySlice";
import { AppDispatch } from "@/redux/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchQuestion } from "@/redux/features/questionSlice";

export default function ContentEditPage({id}: {id: string}) {
    const { categories } = useSelector((state: RootState) => state.categories);
    const { question } = useSelector((state: RootState) => state.questions);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCategories({ showAll: true }) as any);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchQuestion(Number(id)) as any);
    }, [dispatch]);

    return (
        <>
            <QuestionForm key={question?.id} initialData={question} 
            onSubmit={() => {}} categories={categories} isEdit={true} type="QUESTION_PAGE" />
        </>
    )
}
