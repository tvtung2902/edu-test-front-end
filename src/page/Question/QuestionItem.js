import { Button, Radio, Tooltip, Input, Popover } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Children, useState } from "react";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import ContentPopOver from "../../component/ContentPopOver";
const { Search } = Input;

export default function QuestionItem({ handleOpenDelete, handleOpenEdit, item }) {
    const handleUpdateCategory = () => {

    }
    return (
        <div className="questions__item">
            <div className="questions__left-content">
                <Radio></Radio>
                <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                <p>{item.content}</p>
            </div>
            <div className="questions__right-content">
                <Popover className="questions__wrap-category" placement="rightTop" overlayInnerStyle={{ width: "230px" }}
                    content={<ContentPopOver btn="Chỉnh sửa" handleOk={handleUpdateCategory} />} title="" trigger="click">
                    <UnorderedListOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                    <span className="questions__category-text" >Danh mục</span>
                </Popover>
                <div className="questions__actions">
                    <Tooltip title="Sửa">
                        <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} onClick={handleOpenEdit} />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} onClick={handleOpenDelete} />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}