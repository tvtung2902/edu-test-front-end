import { Button, Radio, Tooltip, Input } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Children, useState } from "react";
import Modal from "../../component/Modal";
const { Search } = Input;


export default function QuestionContent() {
    const [modalState, setModalState] = useState({
        open: false,
        title: "",
        onOk: () => {},
        children: null,
        footer: null,
        loading: false
    })

<<<<<<< HEAD
    const dataQuestion

=======
>>>>>>> main
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleOpenAdd = () => {
        const handleAddData = () => {
            setModalState((prev) => ({ ...prev, open: false }));
            console.log("add");
        }

        const DataOfModal = () => {
            return (
                <>
                    add addaddaddaddaddaddaddaddadd
                </>
            )
        }

        setModalState({
            open: true,
            title: "Thêm câu hỏi",
            onCancel: () => setModalState((prev) => ({ ...prev, open: false })),
            onOk: handleAddData,
            children: <DataOfModal/>,
            footer: null,
            loading: false,
          });
    }

    const handleOpenEdit = () => {
        const handleAddData = () => {
            setModalState((prev) => ({ ...prev, open: false }));
            console.log("edit");
        }

        const DataOfModal = () => {
            return (
                <>
                    edit
                </>
            )
        }

        setModalState({
            open: true,
            title: "Sửa câu hỏi",
            onCancel: () => setModalState((prev) => ({ ...prev, open: false })),
            onOk: handleAddData,
            children: <DataOfModal/>,
            footer: null,
            loading: false,
          });
    }

    const handleOpenDelete = () => {
        const handleAddData = () => {
            setModalState((prev) => ({ ...prev, open: false }));
            console.log("delete");
        }

        const DataOfModal = () => {
            return (
                <>
                    delete
                </>
            )
        }

        setModalState({
            open: true,
            title: "Xóa câu hỏi",
            onCancel: () => setModalState((prev) => ({ ...prev, open: false })),
            onOk: handleAddData,
            children: <DataOfModal/>,
            footer: null,
            loading: false,
        });
    }

    return (
        <>
            <Modal 
                  open={modalState.open} 
                  title={modalState.title} 
                  onOk={modalState.onOk} 
                  loading={modalState.loading}
                  children={modalState.children}
                  onCancel={modalState.onCancel}
            />
            <section className="head">
                <div className="head__wrapper container">
                    <div className="head__search">
                        <Search placeholder="Nhập nội dung câu hỏi" onSearch={onSearch} enterButton />

                    </div>
                    <div className="head__wrapper-button">
                        <Button style={{
                            backgroundColor: "#e0e0e0",
                            color: "black",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                        }} color="gold" variant="solid"><span>Lọc</span><FilterOutlined /></Button>
                        <Button onClick={handleOpenAdd} type="primary" className="head__btn-add"><span>Tạo câu hỏi</span><i class="fa-solid fa-plus"></i></Button>
                    </div>
                </div>
            </section>
            <section className="questions">
                <div className="questions__wrapper container">
                    <div className="questions__item">
                        <div className="questions__left-content">
                            <Radio></Radio>
                            <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                            <p>Nội dung câu hỏi 1</p>
                        </div>
                        <div className="questions__right-content">
                            <div className="questions__wrap-category">
                                <UnorderedListOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                                <span className="questions__category-text" >Tieng Anh</span>
                            </div>
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
                    <div className="questions__item">
                        <div className="questions__left-content">
                            <Radio></Radio>
                            <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                            <p>Nội dung câu hỏi 1</p>
                        </div>
                        <div className="questions__right-content">
                            <div className="questions__wrap-category">
                                <UnorderedListOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                                <span className="questions__category-text" >Tieng Anh</span>
                            </div>
                            <div className="questions__actions">
                                <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                                <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} />
                            </div>
                        </div>

                    </div>
                    <div className="questions__item">
                        <div className="questions__left-content">
                            <Radio></Radio>
                            <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1677FF' }} />
                            <p>Nội dung câu hỏi 1</p>
                        </div>
                        <div className="questions__right-content">
                            <div className="questions__wrap-category">
                                <UnorderedListOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                                <span className="questions__category-text" >Tieng Anh</span>
                            </div>
                            <div className="questions__actions">
                                <EditOutlined style={{ fontSize: '25px', color: '#1677FF' }} />
                                <DeleteOutlined style={{ fontSize: '25px', color: 'red' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}