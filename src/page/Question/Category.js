import { Button, Radio, Tooltip, Modal, Input, Skeleton, Pagination, message } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateCategory from "../../component/AddUpdateCategory";
import { fetchDataCategory } from "../../action/category";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pageSize } from "./Const";
const { Search } = Input;

export default function Category() {
    const [open, setOpen] = useState(false);
    const { dataOfPage, status, error } = useSelector(state => state.categoryReducer);
    console.log("status: ", status);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const onSearch = (value, _e, _info) => {
        setSearchParams({ name: value })
    };
    const [messageApi, contextHolder] = message.useMessage();

    const handleOpenModalAdd = () => {
        setOpen(true);
    }

    const handleCloseModalAdd = () => {
        setOpen(false);
    }

    const handleChangePage = (pageNo) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("page-no", pageNo);
            return newParams;
        });
    }

    const showStatus = () => {
        switch (status) {
            case 'ADD_SUCCESS':
                messageApi.destroy();
                messageApi.success("Thêm thành công");
                break;
            case 'DELETE_SUCCESS':
                messageApi.destroy();
                messageApi.success("Xóa thành công!");
                break;
            case 'UPDATE_SUCCESS':
                messageApi.success('Sửa thành công');
            case 'ADD_FAILED':
                messageApi.error('Thêm thất bại');
                break;
            case 'ADD_LOADING':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang thêm danh mục',
                    duration: 0,
                });
                break;
            case 'DELETE_LOADING':
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa danh mục',
                    duration: 0,
                });
        }
    }

    const pageNo = searchParams.get("page-no") || 1;
    const searchName = searchParams.get("name") || "";
    const getData = () => fetchDataCategory(pageNo, pageSize, searchName)

    useEffect(() => {
        dispatch(getData());
    }, [searchParams]);

    useEffect(() => {
        console.log("run this func with status: ", status);
        showStatus();
    }, [status]);

    return (
        <>
            {contextHolder}
            <AddUpdateCategory open={open}
                handleCloseModal={handleCloseModalAdd}
                getData={getData}
            />

            <section className="head">
                <div className="head__wrapper container">
                    <div className="head__search">
                        <Search placeholder="Nhập nội dung danh mục" onSearch={onSearch} enterButton defaultValue={searchName} />
                    </div>
                    <div className="head__wrapper-button">
                        <Button type="primary" className="head__btn-add" onClick={handleOpenModalAdd}><span>Tạo danh mục</span><i class="fa-solid fa-plus"></i></Button>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="categories__wrapper container">
                    {status === 'GET_LOADING' ? (
                        Array(pageSize).fill().map((_, index) => (
                            <Skeleton.Button
                                key={index}
                                active
                                style={{ display: "block", height: 70, width: '100%', borderRadius: "15px" }}
                                shape="default"
                            />
                        ))
                    ) : (

                        dataOfPage && dataOfPage.data && dataOfPage.data.length > 0
                            ?
                            (dataOfPage.data.map(it => {
                                return (
                                    <>
                                        <CategoryItem key={it.id} item={it} getData={getData}
                                        />
                                    </>
                                )
                            }))
                            :
                            (<>
                                <h4>empty data...</h4>
                            </>)
                    )}
                    <div className="categories__pagination">
                        {dataOfPage && dataOfPage.totalPages > 0 &&
                            <Pagination
                                key={`${searchParams}-${dataOfPage.totalPages}`}
                                showSizeChanger={false}
                                defaultCurrent={pageNo}
                                pageSize={pageSize}
                                total={dataOfPage.totalPages * pageSize}
                                onChange={(pageNo) => { handleChangePage(pageNo) }}
                            />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}