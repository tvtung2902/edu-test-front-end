import ContentHeader from "../../component/ContentHeader";
import './question.scss'
import { Outlet } from "react-router-dom";

export default function Question() {
    return (
        <>
            <ContentHeader />
            <Outlet />
        </>
    );
}