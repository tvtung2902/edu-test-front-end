import { useDispatch } from "react-redux";
import ContentOfGroupDetailPage from "./content-of-page";
import { getGroupDetail } from "@/utils/groupsService";

export default async function GroupDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const group = await getGroupDetail(Number(id));

    return (
    <>
        <ContentOfGroupDetailPage group={group} />
    </> 
    )
}
