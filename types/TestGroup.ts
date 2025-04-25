interface Participant {
    id: number;
    name: string;
    avatar: string;
}

interface TestGroup {
    id: number;
    name: string;
    image: string;
    startDate: string;
    endDate: string;
    users?: Participant[];
}

type TestStatus = 'incoming' | 'ongoing' | 'ended';

interface TestGroupWithStatus extends TestGroup {
    status: TestStatus;
}


export type { TestGroup, Participant, TestGroupWithStatus, TestStatus };

