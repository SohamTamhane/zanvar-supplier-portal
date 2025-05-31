import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Context } from "../config/Context";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import axios from "axios";
import AnnouncementCard from "../components/AnnouncementCard";
import { MdFiberNew } from "react-icons/md";

function Home() {

    const [cookies, setCookie] = useCookies(['supplierportal']);
    const navigate = useNavigate();
    const { userInfo } = useContext(Context);
    const [data, setData] = useState([]);

    async function handleFetchData(token, id) {

        await axios.get(`/api/SupplierPortalApi/getsupplierportalnotice?CompanyId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setData(res.data.data);
                // console.log(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (cookies.supplierportal && userInfo) {
            handleFetchData(cookies.supplierportal, userInfo?.companyId);
        }
    }, [])

    useEffect(() => {
        if (!userInfo?.companyId) {
            // if(cookies.supplierportal){
            //     navigate('/company');
            // }
            // else{
            navigate('/auth/login');
            // }
        }
    }, [])

    return (
        <>
            <Header />
            <Tabs active="Home" />
            {/* <div className="home-page-div1">
                Welcome to the Zanvar Groups Supplier Portal!
                <div className="announcement-data" style={{lineHeight: "25px", marginTop: "20px"}}>
                    Dear {userInfo?.companyName} – {userInfo.vendorCode}, <br /> <br />
                    Welcome to the Zanvar Groups Supplier Portal! We are excited to have you onboard and to provide you with a more streamlined, efficient, and transparent way of managing our collaboration. <br /> <br />
                    Here, you'll have easy access to important information, including order management, delivery tracking, and key documents—all in one place. Our goal is to make working with us as smooth and efficient as possible, and we believe this portal will help us achieve that. <br /> <br />
                    If you need any assistance or have questions along the way, our dedicated support team is always available to help.
                    Thank you for being an essential part of the Zanvar Groups supply chain. We look forward to a long and successful partnership.
                    <br /><br />
                    Best regards, <br />
                    Zanvar Groups Team
                </div>
            </div> */}
            <div className="home-page-div">
                {
                    data && data.length !== 0 ?
                        data.map((elm, index) => (
                            <AnnouncementCard key={index} NoticeCode={elm.NoticeCode} NoticeDate={elm.NoticeDate} NoticeSubject={elm.NoticeSubject} NoticeSummary={elm.NoticeSummary} Attachments={elm.Attachments} />
                        ))
                        :
                        <div className="home-page-div1">
                            <div className="announcement-card-main-div">
                                <div className="announcement-title"><MdFiberNew className="new-logo-div" /> <span>Welcome to the Zanvar Groups Supplier Portal!</span></div>
                                <div className="announcement-data">
                                    Dear {userInfo?.companyName} – {userInfo.vendorCode}, <br /> <br />
                                    Welcome to the Zanvar Groups Supplier Portal! We are excited to have you onboard and to provide you with a more streamlined, efficient, and transparent way of managing our collaboration. <br /> <br />
                                    Here, you'll have easy access to important information, including order management, delivery tracking, and key documents—all in one place. Our goal is to make working with us as smooth and efficient as possible, and we believe this portal will help us achieve that. <br /> <br />
                                    If you need any assistance or have questions along the way, our dedicated support team is always available to help.
                                    Thank you for being an essential part of the Zanvar Groups supply chain. We look forward to a long and successful partnership.
                                    <br /><br />
                                    Best regards, <br />
                                    Zanvar Groups Team
                                </div>
                            </div>
                            {/* All Announcement will be displayed here... */}
                        </div>
                }
            </div>
        </>
    )
}

export default Home;