import { Button, Radio, Tooltip, Modal, Input  } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from "react";
const { Search } = Input;

export default function Category(){
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <section className="head">
                <div className="head__wrapper container">
                    <div className="head__search">
                        <Search placeholder="Nhập nội dung danh mục" onSearch={onSearch} enterButton />

                    </div>
                    <div className="head__wrapper-button">
                        <Button type="primary" className="head__btn-add"><span>Tạo danh mục</span><i class="fa-solid fa-plus"></i></Button>
                    </div>
                </div>
            </section>
            
            <section className="categories">
                <div className="categories__wrapper container">
                    <div className="categories__item">
                        <div className="categories__left-content">
                            <UnorderedListOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                            <p>Nội dung danh mục 1</p>
                        </div>
                        <div className="questions__actions">
                                <Tooltip title="Sửa">
                                    <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} onClick={showLoading} />
                                </Tooltip>
                                <Modal
                                        title={<p>Chỉnh sửa câu hỏi</p>}
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
                </div>
            </section>
        </>
    )
}