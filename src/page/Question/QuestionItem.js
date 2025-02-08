import { Button, Radio, Tooltip, Input, Popover, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Children, useState } from "react";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import ContentPopOver from "../../component/ContentPopOver";
import AddUpdateQuestionModal from "../../component/AddUpdateQuestion/AddUpdateQuestionModal";
import { deleteQuestion } from "../../action/question";
const { Search } = Input;

export default function QuestionItem({ item }) {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const dispatch = useDispatch();

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true);
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
    }


    const handleUpdateCategoryOfQuestion = () => {

    }
    const [messageApi, contextHolder] = message.useMessage();

    const handleDeleteQuestion = (questionId) => {
        dispatch(deleteQuestion(questionId));
        messageApi.success('Xóa thành công!');
    }
    return (
        <>
            {contextHolder}
            <AddUpdateQuestionModal open={openModalEdit} handleCloseModal={handleCloseModalEdit} />

            <div className="questions__item">
                <div className="questions__left-content">
                    <Radio></Radio>
                    <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                    <p>{item.content}</p>
                </div>
                <div className="questions__right-content">
                    <Popover className="questions__wrap-category" placement="rightTop" overlayInnerStyle={{ width: "230px" }}
                        content={<ContentPopOver btn="Chỉnh sửa" handleOk={handleUpdateCategoryOfQuestion} />} title="" trigger="click">
                        <UnorderedListOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                        <span className="questions__category-text" >Danh mục</span>
                    </Popover>
                    <div className="questions__actions">
                        <Tooltip title="Sửa">
                            <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} onClick={handleOpenModalEdit} />
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
                            onConfirm={() => handleDeleteQuestion(item.id)}                        
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                        >
                            <Tooltip title="Xóa">
                                <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} onClick={() => { }} />
                            </Tooltip>
                        </Popconfirm>

                    </div>
                </div>
            </div>
        </>

    )
}