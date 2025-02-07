import { Button, Radio, Tooltip, Input, Drawer, Popconfirm, Popover, Select, Skeleton, Form, Switch, Upload, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Children, useEffect, useState } from "react";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";
import { fetchData, test } from "../../action/question";
import ContentPopOver from "../../component/ContentPopOver";
import TextArea from "antd/es/input/TextArea";
const { Search } = Input;


export default function QuestionContent() {
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [open, setOpen] = useState(false);
    const { questions, loading, error } = useSelector(state => state.questionReducer);
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState({
        open: false,
        title: "",
        onOk: () => { },
        children: null,
        footer: null,
        loading: false
    })

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const [choices, setChoices] = useState([
        { content: "", isCorrect: false, image: null },
        { content: "", isCorrect: false, image: null },
        { content: "", isCorrect: false, image: null },
        { content: "", isCorrect: false, image: null },
    ]);

    const handleChoiceChange = () => {

    }

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleOpenAdd = () => {
        const handleAddData = () => {
            setModalState((prev) => ({ ...prev, open: false }));
            console.log("add");
        }

        const DataOfModal = () => {
            return (
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    style={{ width: '100%', maxHeight: '450px', overflowY: 'auto' }}
                >
                    <Form.Item
                        name="categoryIds"
                        label="Danh mục"
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Chọn danh mục"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Câu hỏi"
                        rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
                    >
                        <Input.Group style={{}}>
                            <TextArea rows={3} placeholder="Nhập câu hỏi..." style={{ width: '90%', marginRight: '10px' }} />
                            <Upload listType="picture">
                                <Button icon={<UploadOutlined />} />
                            </Upload>
                        </Input.Group>

                    </Form.Item>

                    {choices.map((choice, index) => (
                        <Form.Item key={index} label={`Câu trả lời ${index + 1}`}>
                            <Input.Group>
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder={`Nhập câu trả lời ${index + 1}...`}
                                    onChange={(e) => handleChoiceChange(index, "content", e.target.value)}
                                />
                                <Switch
                                    style={{ margin: '0 8px' }}
                                    checked={choice.isCorrect}
                                    onChange={(checked) => handleChoiceChange(index, "isCorrect", checked)}
                                />
                                <Upload
                                    beforeUpload={() => false}
                                    listType="picture"
                                    onChange={({ file }) => handleChoiceChange(index, "image", file)}
                                >
                                    <Button icon={<UploadOutlined />} />
                                </Upload>
                            </Input.Group>
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button type="primary">Thêm câu trả lời</Button>
                    </Form.Item>

                    <Form.Item label="Giải thích">
                        <TextArea rows={3} placeholder="Giải thích..." />
                    </Form.Item>
                </Form>
            );
        };


        setModalState({
            open: true,
            title: "THÊM CÂU HỎI",
            onCancel: () => setModalState((prev) => ({ ...prev, open: false })),
            children: <DataOfModal />,
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
            children: <DataOfModal />,
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
            children: <DataOfModal />,
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
                        <Popover overlayInnerStyle={{ width: "230px" }}
                            content={<ContentPopOver btn="Lọc" />} placement="bottom" title="" trigger="click">
                            <Button style={{
                                backgroundColor: "#e0e0e0",
                                color: "black",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                            }}><span>Lọc</span><FilterOutlined /></Button>
                        </Popover>
                        <Button onClick={handleOpenAdd} type="primary" className="head__btn-add"><span>Tạo câu hỏi</span><i class="fa-solid fa-plus"></i></Button>
                    </div>
                </div>
            </section>

            <section className="questions">
                <div className="questions__wrapper container">
                    {loading ? (
                        Array(7).fill().map((_, index) => (
                            <Skeleton.Button
                                key={index}
                                active
                                style={{ display: "block", height: 100, width: '100%', borderRadius: "15px" }}
                                shape="default"
                            />
                        ))
                    ) : (
                        questions.length > 0
                            ?
                            (questions.map(it => {
                                return (
                                    <>
                                        <QuestionItem key={it.id} item={it} handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />
                                    </>
                                )
                            }))
                            :
                            (<>
                                <h4>empty data...</h4>
                            </>)
                    )}
                </div>
            </section>
        </>
    );
}
