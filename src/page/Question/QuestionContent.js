import { Button, Radio, Tooltip, Input, Drawer, Popconfirm, Popover, Select, Skeleton, Form, Switch, Upload, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Children, useEffect, useState } from "react";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";
import { fetchDataQuestion, test } from "../../action/question";
import ContentPopOver from "../../component/ContentPopOver";
import TextArea from "antd/es/input/TextArea";
import CustomModal from "../../component/Modal";
import AddUpdateQuestionModal from "../../component/AddUpdateQuestion/AddUpdateQuestionModal";
const { Search } = Input;


export default function QuestionContent() {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { questions, loading, error } = useSelector(state => state.questionReducer);
    const dispatch = useDispatch();
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        dispatch(fetchDataQuestion());
    }, [dispatch]);


    const handleOpenModalAdd = () => {
        setOpenModalAdd(true);
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    }

    return (
        <>  
            <AddUpdateQuestionModal open={openModalAdd} handleCloseModal={handleCloseModalAdd}/>
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
                        <Button onClick={handleOpenModalAdd} type="primary" className="head__btn-add"><span>Tạo câu hỏi</span><i class="fa-solid fa-plus"></i></Button>
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
                                        <QuestionItem key={it.id} item={it} />
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
