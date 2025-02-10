import { Button, Radio, Tooltip, Modal, Input, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CustomModal from "../../component/Modal";
import AddUpdateCategory from "../../component/AddUpdateCategory";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchDataCategory } from "../../action/category";

export default function CategoryItem({ item, getData, mess }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const handleOpenModalUpdate = () => {
        setOpen(true);
    }

    const handleCloseModalUpdate = () => {
        setOpen(false);
    }

    const handleDeleteCategory = async (categoryId) => {
        await dispatch(deleteCategory(categoryId));
        dispatch(getData());
    }

    return (
        <>
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
                        title="Xóa Danh Mục"
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