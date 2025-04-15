export interface ApiGetListResponse<T> {
    message: string;
    response: {
        pageNo: number;
        pageSize: number;
        totalPages: number;
        data: T[];
      };
    status: number;
}

export interface ApiResponse {
    message: string;
    response: {
        id: number;
    };
    status: number;
}