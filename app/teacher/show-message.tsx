import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { message } from "antd"
import { useEffect } from "react"
import { fetchTests } from "@/redux/features/testSlice";
import { useSearchParams } from "next/navigation";
export default function ShowMessage() {
    const { status } = useSelector((state: RootState) => state.tests);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch<AppDispatch>();

    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";

    const showStatus = () => {

        if (status.endsWith('succeeded') || status.endsWith('failed')) {
            messageApi.destroy();
        }

        switch (status) {
            case 'add succeeded':
                messageApi.success('Thêm đề thi thành công');
                break;
            case 'delete succeeded':
                messageApi.success('Xóa đề thi thành công!');
                dispatch(fetchTests({search, pageNo}) as any);
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

    useEffect(() => {
        showStatus();
    }, [status]);

    return (
        <>
            {contextHolder}
        </>
    )
}
