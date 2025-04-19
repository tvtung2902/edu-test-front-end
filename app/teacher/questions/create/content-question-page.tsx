import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { fetchCategories } from "@/redux/features/categorySlice";
import { QuestionForm } from "@/components/forms/question-form";

export default function ContentQuestionPage() {
    const { categories } = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch<AppDispatch>();

    const addQuestion = (question: any) => {
        console.log(question);
    }

    useEffect(() => {
        dispatch(fetchCategories({ showAll: true }) as any);
    }, [dispatch]);

    return (
        <>
            <QuestionForm onSubmit={addQuestion} categories={categories} isEdit={false} />
        </>
    )
}
