import { Button, Radio, Tooltip, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined, FilterOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from "react";
import CategoryItem from "./CategoryItem";
const { Search } = Input;

export default function Category() {
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
                    <CategoryItem />
                </div>
            </section>
        </>
    )
}