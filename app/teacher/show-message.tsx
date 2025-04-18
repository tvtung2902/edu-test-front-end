import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { message } from "antd"
import { useEffect } from "react"
import { fetchTests } from "@/redux/features/testSlice";
import { useSearchParams } from "next/navigation";
import { fetchGroups } from "@/redux/features/groupSlice";

export default function ShowMessage() {
    const { status: statusTest } = useSelector((state: RootState) => state.tests);
    const { status: statusGroup } = useSelector((state: RootState) => state.groups);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch<AppDispatch>();
    const dispatchGroup = useDispatch<AppDispatch>();

    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";

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
    }, [statusTest, statusGroup]);

    return <>{contextHolder}</>;
}
