import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { message } from "antd"
import { useEffect } from "react"
import { fetchTests } from "@/redux/features/testSlice";
import { useSearchParams } from "next/navigation";
import { fetchGroups } from "@/redux/features/groupSlice";
import { fetchQuestions } from "@/redux/features/questionSlice";
import { fetchTestGroups } from "@/redux/features/testGroupSlice";
import { TestStatus } from "@/types/TestGroup";
import { fetchUserGroups } from "@/redux/features/userGroupSlice";
export default function ShowMessage() {
    const { status: statusTest } = useSelector((state: RootState) => state.tests);
    const { status: statusGroup } = useSelector((state: RootState) => state.groups);
    const { status: statusQuestion } = useSelector((state: RootState) => state.questions);
    const { status: statusTestGroup } = useSelector((state: RootState) => state.testGroups);
    const { status: statusUserGroup } = useSelector((state: RootState) => state.userGroups);

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch<AppDispatch>();
    const dispatchGroup = useDispatch<AppDispatch>();

    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";
    const content = searchParams.get('content') || "";
    const categoryIds = searchParams.get('categoryIds')?.split(',').map(Number) || [];
    const status = searchParams.get('status') || "";

    const showStatusUserGroup = () => {
        if (statusUserGroup.endsWith('succeeded') || statusUserGroup.endsWith('failed')) {
            messageApi.destroy();
        }
        switch (statusUserGroup) {
            case 'add succeeded':
                messageApi.success('Thêm thành viên vào nhóm thành công');
                break;
            case 'delete succeeded':
                messageApi.success('Xóa thành viên khỏi nhóm thành công');
                dispatch(fetchUserGroups({groupId: 1, pageNo : pageNo, search: search, status : status as 'PENDING' | 'JOINED'}) as any)
                break;
            case 'add failed':
                messageApi.error('Thêm thành viên vào nhóm thất bại');
                break;
            case 'delete failed':
                messageApi.error('Xóa thành viên khỏi nhóm thất bại');
                break;
            case 'add loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm thành viên vào nhóm',
                    duration: 0,
                });
                break;
        }
    }

    const showStatusTestGroups = () => {
        if (statusTestGroup.endsWith('succeeded') || statusTestGroup.endsWith('failed')) {
            messageApi.destroy();
        }
        switch (statusTestGroup) {
            case 'add succeeded':
                messageApi.success('Thêm các đề thi vào nhóm thành công');
                dispatchGroup(fetchTestGroups({ groupId: 1, search, pageNo, status: status as TestStatus }) as any);
                break;
            case 'delete succeeded':
                messageApi.success('Xóa các đề thi khỏi nhóm thành công');
                dispatchGroup(fetchTestGroups({ groupId: 1, search, pageNo, status: status as TestStatus }) as any);
                break;
            case 'add failed':  
                messageApi.error('Thêm các đề thi vào nhóm thất bại');
                break;
            case 'delete failed':
                messageApi.error('Xóa các đề thi khỏi nhóm thất bại');
                break;
            case 'add loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm các đề thi vào nhóm',
                    duration: 0,
                });
                break;
            case 'delete loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa các đề thi khỏi nhóm',
                    duration: 0,
                });
                break;
        }
    }

    const showStatusQuestions = () => {
        if (statusQuestion.endsWith('succeeded') || statusQuestion.endsWith('failed')) {
            messageApi.destroy();
        }
        switch (statusQuestion) {
            case 'add succeeded':
                messageApi.success('Thêm câu hỏi thành công');
                break;
            case 'delete succeeded':
                messageApi.success('Xóa câu hỏi thành công');
                dispatch(fetchQuestions({ content, pageNo, categoryIds}) as any);
                break;
            case 'update succeeded':
                messageApi.success('Sửa câu hỏi thành công');
                break;
            case 'add failed':
                messageApi.error('Thêm câu hỏi thất bại');
                break;
            case 'delete failed':
                messageApi.error('Xóa câu hỏi thất bại');
                break;
            case 'update failed':
                messageApi.error('Sửa câu hỏi thất bại');
                break;
            case 'add loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm câu hỏi',
                    duration: 0,
                });
                break;
            case 'update loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang sửa câu hỏi',
                    duration: 0,
                });
                break;  
            case 'delete loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa câu hỏi',
                    duration: 0,
                });
                break;
        }
    }

    const showStatusTests = () => {
        if (statusTest.endsWith('succeeded') || statusTest.endsWith('failed')) {
            messageApi.destroy();
        }

        switch (statusTest) {
            case 'add succeeded':
                messageApi.success('Thêm đề thi thành công');
                break;
            case 'delete succeeded':
                messageApi.success('Xóa đề thi thành công!');
                dispatch(fetchTests({ search, pageNo }) as any);
                break;
            case 'update succeeded':
                messageApi.success('Sửa đề thi thành công');
                break;
            case 'add failed':
                messageApi.error('Thêm đề thi thất bại');
                break;
            case 'update failed':
                messageApi.error('Sửa đề thi thất bại');
                break;
            case 'delete failed':
                messageApi.error('Xóa đề thi thất bại');
                break;

            case 'add loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm đề thi',
                    duration: 0,
                });
                break;
            case 'update loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang sửa đề thi',
                    duration: 0,
                });
                break;
            case 'delete loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa đề thi',
                    duration: 0,
                });
                break;
        }
    };

    const showStatusGroups = () => {
        if (statusGroup.endsWith('succeeded') || statusGroup.endsWith('failed')) {
            messageApi.destroy();
        }
        switch (statusGroup) {
            case 'fetch detail loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang tải dữ liệu',
                    duration: 0,
                });
                break;
            case 'fetch detail failed':
                messageApi.error('Đã xảy ra lỗi');
                break;
            case 'add succeeded':
                messageApi.success('Thêm nhóm thành công');
                dispatchGroup(fetchGroups({ search, pageNo }) as any);
                break;
            case 'delete succeeded':
                messageApi.success('Xóa nhóm thành công');
                dispatchGroup(fetchGroups({ search, pageNo }) as any);
                break;
            case 'update succeeded':
                messageApi.success('Sửa nhóm thành công');  
                break;
            case 'add failed':
                messageApi.error('Thêm nhóm thất bại');
                break;
            case 'update failed':
                messageApi.error('Sửa nhóm thất bại');
                break;
            case 'delete failed':
                messageApi.error('Xóa nhóm thất bại');
                break;
            case 'add loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm nhóm',
                    duration: 0,
                });
                break;
            case 'update loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang sửa nhóm',
                    duration: 0,
                });
                break;
            case 'delete loading':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa nhóm',
                    duration: 0,
                });
                break;
        }
    };

    useEffect(() => {
        showStatusTests();
        showStatusGroups();
        showStatusQuestions(); 
        showStatusTestGroups();
        showStatusUserGroup()
    }, [statusTest, statusGroup, statusQuestion, statusTestGroup, statusUserGroup]);

    return <>{contextHolder}</>;
}
