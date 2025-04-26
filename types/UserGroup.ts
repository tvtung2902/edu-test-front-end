export interface UserGroup {
    id: number;
    name: string;
    avatar: string;
    username: string;
    email: string;
    status: 'PENDING' | 'JOINED' 
}