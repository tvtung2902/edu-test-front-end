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

export interface ApiGetResponse<T> {
    message: string;
    response: T;
    status: number;
}

export interface ApiGetListNonPaginationResponse<T> {
    message: string;
    response: T[];
    status: number;
}



export interface ApiResponse {
    message: string;
    response: {
        id: number;
    };
    status: number;
}