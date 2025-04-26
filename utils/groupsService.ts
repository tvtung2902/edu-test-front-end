import { ApiGetResponse } from "@/types/ApiResponse";
import { get } from "./request";
import { Group } from "@/types/Group";
const api: string = 'groups/'

export const getGroupDetail = async (id: number): Promise<Group | null> => {
    try {
        const path: string = `${api}${id}`;
        const res = await get<ApiGetResponse<Group>>(path);
        console.log("res", res);
        return res.response;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}; 