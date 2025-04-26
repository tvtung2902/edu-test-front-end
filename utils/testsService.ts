import { ApiGetResponse } from "@/types/ApiResponse";
import { get } from "./request";
import { Test } from "@/types/Test";
const api: string = 'tests/'

export const getTestDetail = async (id: string): Promise<Test> => {
    const path: string = `${api}${id}`;
    const res = await get<ApiGetResponse<Test>>(path);
    return res.response;
};

export const fetchAvailableTests = async (groupId: number): Promise<any[]> => {
    const path: string = `groups/${groupId}/tests/unassigned`;
    const res = await get<ApiGetResponse<any[]>>(path);
    console.log("resssssssssssssssssssssssss", res);
    return res.response;
};