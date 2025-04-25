import { getGroupDetail } from "@/utils/groupsService";
import GroupDetailPage from "./content-layout";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = params;
    const group = await getGroupDetail(Number(id));
    console.log("group", group);

    return (
        <GroupDetailPage group={group} children={children} />
    );
}
