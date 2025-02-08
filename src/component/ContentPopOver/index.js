import { Button, Radio, Tooltip, Input, Drawer, Popconfirm, Popover, Select } from "antd";

export default function ContentPopOver ({btn, handleOk}) {
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

    const handleFilter = () => {

    }
    return(
        <>
            <div className="contentPopOverFilter">
            <Select
            mode="tags"
            style={{
                width: '100%',
            }}
            placeholder="Chọn danh mục"
            onChange={handleChange}
            options={options}
            />
                <Button className="contentPopOverFilter__btn" type="primary" onClick={handleOk}>{btn}</Button>
            </div>
        </>
    );
}
