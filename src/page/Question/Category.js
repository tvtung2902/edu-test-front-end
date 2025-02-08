import { Button, Radio, Tooltip, Modal, Input, Skeleton } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateCategory from "../../component/AddUpdateCategory";
import { fetchDataCategory } from "../../action/category";
const { Search } = Input;

export default function Category() {
    const [open, setOpen] = useState(false);
    const { categories, status, error } = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const handleOpenModalAdd = () => {
        setOpen(true);
    }

    const handleCloseModalAdd = () => {
        setOpen(false);
    }

    useEffect(() => {
            dispatch(fetchDataCategory());
        }, [dispatch]);
    
    return (
        <>  
            <AddUpdateCategory open={open} handleCloseModal={handleCloseModalAdd}/>
            
            <section className="head">
                <div className="head__wrapper container">
                    <div className="head__search">
                        <Search placeholder="Nhập nội dung danh mục" onSearch={onSearch} enterButton />
                    </div>
                    <div className="head__wrapper-button">
                        <Button type="primary" className="head__btn-add" onClick={handleOpenModalAdd}><span>Tạo danh mục</span><i class="fa-solid fa-plus"></i></Button>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="categories__wrapper container">
                {status === 'loading' ? (
                        Array(7).fill().map((_, index) => (
                            <Skeleton.Button
                                key={index}
                                active
                                style={{ display: "block", height: 70, width: '100%', borderRadius: "15px" }}
                                shape="default"
                            />
                        ))
                    ) : (
                        categories.length > 0
                            ?
                            (categories.map(it => {
                                return (
                                    <>
                                        <CategoryItem key={it.id} item={it} />
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
    )
}