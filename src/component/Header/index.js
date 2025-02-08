import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__wrap-logo" aria-label="Home">
        <FontAwesomeIcon icon={faGraduationCap} className="header__icon" />
        <p>Edu</p>
        <p>Test</p>
      </Link>
      <div className="header__wrap-right">
        <ul className="header__list-nav">
          <li className="header__item-nav">
            <Link to="/tests">Đề Thi</Link>
          </li>
          <li className="header__item-nav">
            <Link to="/questions">Câu Hỏi</Link>
          </li>
          <li className="header__item-nav">
            <Link to="/groups">Nhóm</Link>
          </li>
          <li className="header__item-nav">
            <Link to="/ranking">Xếp Hạng</Link>
          </li>
        </ul>
        <Link to="/login">
          <Button type="primary" size="large" className="button-one">Đăng nhập</Button>
        </Link>
      </div>
    </header>
  );
}
