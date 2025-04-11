import { useContext, useEffect } from "react";
import LogoImg from "../assets/logo2.png";
import "./Header.css";
import {Context} from "../config/Context";
import { Link } from "react-router-dom";

function Header() {

    const {userInfo, setUserInfo} = useContext(Context);

    return (
        <nav>
            <div className="nav-main-div">
                <div>
                    <img style={{ width: "auto", height: "35px" }} src={LogoImg} alt="" />
                </div>
                <div className="nav-text">
                    Welcome, {userInfo?.companyName}
                </div>
                <header className="header">
                    <div className="header-content">
                        <div className="logo"></div>
                        <nav className="nav">
                            <Link to="/contact">Contact Us</Link>
                        </nav>
                    </div>
                </header>
            </div>
        </nav>
    )
}
export default Header;