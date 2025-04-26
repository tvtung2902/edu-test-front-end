import ContentOfPage from "./content-of-page";
import { useEffect } from "react";
import { fetchQuestionsInTest } from "@/redux/features/questionTestSlice";
export default async function QuestionsPage({ params }: { params: { id: string } }) {
    const testId = params.id;
    return (
        <ContentOfPage testId={testId} />
    )
}
