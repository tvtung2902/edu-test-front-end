import ContentEditPage from "./content-edit-page";

export default function QuestionEdit({ params }: { params: { id: string } }) {
    return (
        <>
            <ContentEditPage id={params.id} />
        </>
    )
}
