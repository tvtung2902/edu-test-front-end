import { Button, Radio, Tooltip, Modal, Input, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from "react";
import CustomModal from "../../component/Modal";
import AddUpdateCategory from "../../component/AddUpdateCategory";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../action/category";

export default function CategoryItem({ item }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const handleOpenModalUpdate = () => {
        setOpen(true);
    }

    const handleCloseModalUpdate = () => {
        setOpen(false);
    }

    const handleDeleteCategory = (categoryId) => {
        messageApi.success('Xóa thành công!');
        dispatch(deleteCategory(categoryId));
    }
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <AddUpdateCategory open={open} handleCloseModal={handleCloseModalUpdate} />
            <div className="categories__item">
                <div className="categories__left-content">
                    <UnorderedListOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                    <p>{item.name}</p>
                </div>
                <div className="categories__actions">
                    <Tooltip title="Sửa">
                        <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} onClick={handleOpenModalUpdate} />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa Câu Hỏi"
                        description="Bạn có chắc chắn muốn xóa không?"
                        okText="Đồng ý"
                        cancelText="Hủy"
                        okButtonProps={{
                            style: {
                                backgroundColor: 'red',
                                borderColor: 'red',
                                color: 'white',
                            },
                        }}
                        onConfirm={() => handleDeleteCategory(item.id)}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <Tooltip title="Xóa">
                            <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} />
                        </Tooltip>
                    </Popconfirm>
                </div>
            </div>
        </>
    )
}