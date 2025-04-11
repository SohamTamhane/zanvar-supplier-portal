import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Context } from "../config/Context";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import axios from "axios";
import AnnouncementCard from "../components/AnnouncementCard";

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
            <Tabs />
            <div className="home-page-div1">
                All Notices will be Displayed here 
            </div>
            <div className="home-page-div">
                {
                    data && data.length !== 0 ?
                        data.map((elm, index) => (
                            <AnnouncementCard key={index} NoticeCode={elm.NoticeCode} NoticeDate={elm.NoticeDate} NoticeSubject={elm.NoticeSubject} NoticeSummary={elm.NoticeSummary} Attachments={elm.Attachments} />
                        ))
                        :
                        <div className="home-page-div1">
                            All Announcement will be displayed here...
                        </div>
                }
            </div>
        </>
    )
}

export default Home;