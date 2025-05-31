import LogoImg from "../../assets/logo1.png";
import Img1 from "../../assets/img1.png";
import "./Login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Context } from "../../config/Context";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { userInfo, setUserInfo } = useContext(Context);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['supplierportal']);

    async function handleSubmit() {
        if (username === "" || password == "") {
            setMessage("Fill All the Details");
        }
        else {
            setLoading(true);
            await axios.post("/api/login/SupplierLoginToken", {
                'vendorCode': username, 'pin': password
            })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data == 2) {
                        setMessage("Invalid Credentials");
                    }
                    else {
                        setUserInfo({
                            ...userInfo,
                            vendorCode: username
                        })
                        setMessage("Login Successful !!");
                        setCookie('supplierportal', res.data, { path: '/', maxAge: 30 * 30 * 24 * 7 });
                        navigate("/company");
                    }
                }).catch((err) => {
                    console.log(err);
                }).finally(()=>{
                    setLoading(false);
                })

        }
    }

    return (
        <div className="body">
            <div className="container">
                <div className="login-section">
                    <h2>Welcome Back</h2>
                    <div className="form">
                        <input autoFocus onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }} type="text" placeholder="Your Vendor Code" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }} type="password" placeholder="Your Pin" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="options">
                            <label><input type="checkbox" checked /> Keep me logged in</label>
                            {/* <a href="/auth/reset_password">Forgot Password</a> */}
                        </div>
                        <div>
                            <div className="message-div">{message}</div>
                        </div>
                        {
                            loading ?
                                <div className="spinnerMainDiv">
                                    <div class="spinner1"></div>
                                </div>
                                :
                                <button onClick={handleSubmit}>Log in</button>
                        }
                    </div>
                    <p style={{ textAlign: "center" }} className="contact-info">
                        Login Problem? Contact - 023125245555<br />
                        For any login or technical issue, please write email to support@ztcs.com
                    </p>
                    <div className="powered-by">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src={LogoImg} alt="Zanvar Logo" />
                        </div>
                        <p style={{ textAlign: "center" }}>Copyright© 2024, Zanvar Technology Consultancy Services Pvt Ltd - All
                            Rights Reserved</p>
                    </div>
                </div>
                <div className="info-section">
                    <h2>Supplier Portal</h2>
                    <img src={Img1} alt="Illustration" />
                    <p>Transforming Complexity into Clarity !!!</p>
                </div>
            </div>
        </div>
    )
}

export default Login;