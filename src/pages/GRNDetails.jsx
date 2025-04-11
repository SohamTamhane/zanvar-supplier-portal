import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";

function GRNDetails() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [data, setData] = useState([]);

    const [fromDate, setFromDate] = useState("2024-04-01");
    const [toDate, setToDate] = useState("2025-04-05");

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    async function handleFetchData(token, id) {
        const fDate = formatDate(fromDate);
        const tDate = formatDate(toDate);
        
        await axios.get(`/api/SupplierPortalApi/getgrnlist?CompanyId=${id}&FromDate=${fDate}&ToDate=${tDate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setData(res.data.data);
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
        <>
            <Header />
            <Tabs />
            <div>
                <main className="main-content">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header blue">All GRN</div>
                            <div className="card-body">
                               
                                    <div className="card-body1">
                                       
                                        <div>
                                            From: <input onChange={(e)=>setFromDate(e.target.value)} required type="date" value={fromDate} name="fromdate" id="fromdate"/>
                                        </div>
                                        <div>
                                            To: <input value={toDate} onChange={(e)=>setToDate(e.target.value)} required type="date" name="todate" id="todate"/>
                                        </div>
                                        <div>
                                            <button onClick={()=>handleFetchData(cookies.supplierportal, userInfo?.companyId)}>Search</button>
                                        </div>
                                    </div>
                            </div>
                            <div style={{overflowX: "auto"}}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="card-text">TrnNo</th>
                                            <th className="card-text">SubGlAcNo</th>
                                            <th className="card-text">TrnDate</th>
                                            <th className="card-text">MaterialCode</th>
                                            <th className="card-text">MaterialName</th>
                                            <th className="card-text">Quantity</th>
                                            <th className="card-text">MaterialUom</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((details, index)=>(
                                                <tr key={index}>
                                                    <td className="card-text">{details.ShortTrnNo}</td>
                                                    <td className="card-text">{details.SubGlAcNo}</td>
                                                    <td className="card-text">{details.TrnDate}</td>
                                                    <td className="card-text">{details.MaterialCode}</td>
                                                    <td className="card-text">{details.MaterialName}</td>
                                                    <td className="card-text">{details.Quantity}</td>
                                                    <td className="card-text">{details.MaterialUom}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default GRNDetails;