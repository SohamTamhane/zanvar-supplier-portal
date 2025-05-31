import { useContext, useEffect, useState } from "react";
import LogoImg from "../assets/logo2.png";
import "./Header.css";
import { Context } from "../config/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Header() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [username, setUsername] = useState(false);

    async function handleFetchData(token, id) {

        await axios.get(`/api/SupplierPortalApi/getuerdetails?CompanyId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log(res.data.data);
                setUsername(res.data.data.LongName);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (cookies.supplierportal && userInfo) {
            handleFetchData(cookies.supplierportal, userInfo?.companyId);
        }
    }, [])

    return (
        <nav>
            <div className="nav-main-div">
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <img style={{ width: "auto", height: "35px" }} src={LogoImg} alt="" />
                    <div className="nav-text">
                        Welcome, {username}
                        {/* Welcome, {userInfo?.companyName} */}
                    </div>
                </div>
                <header className="header">
                    <div className="header-content">
                        <div className="logo"></div>
                        <nav className="nav">
                            <div className="nav-text">
                                {userInfo?.companyName}
                            </div>
                            <Link to="/contact">Contact Us</Link>
                        </nav>
                    </div>
                </header>
            </div>
        </nav>
    )
}
export default Header;