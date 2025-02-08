import { Button, Radio, Tooltip, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function CategoryItem() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    
    return (
        <>
            <div className="categories__item">
                <div className="categories__left-content">
                    <UnorderedListOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                    <p>Nội dung danh mục 1</p>
                </div>
                <div className="categories__actions">
                    <Tooltip title="Sửa">
                        <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} onClick={showLoading} />
                    </Tooltip>
                    <Modal
                        title={<p>Chỉnh sửa danh mục</p>}
                        footer={
                            <Button type="primary" onClick={() => setOpen(false)}>
                                Ok
                            </Button>
                        }
                        loading={loading}
                        open={open}
                        onCancel={() => setOpen(false)}
                    >

                    </Modal>
                    <Tooltip title="Xóa">
                        <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} />
                    </Tooltip>
                </div>
            </div>
        </>
    )
}