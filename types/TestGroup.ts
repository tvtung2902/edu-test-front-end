interface Participant {
    id: number;
    name: string;
    avatar: string;
}

interface TestGroup {
    id: number;
    name: string;
    status: 'incoming' | 'ongoing' | 'completed';
    users: Participant[];
}
export type { TestGroup, Participant };
