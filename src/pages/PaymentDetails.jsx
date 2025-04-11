import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";

function PaymentDetails() {

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

        await axios.get(`/api/SupplierPortalApi/getsupplierpaymentdetails?CompanyId=${id}&FromDate=${fDate}&ToDate=${tDate}`, {
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

    async function handleDownloadData(token, id, trn) {
        // const trn = id + trn.replace("-", "");
        // console.log(trn);
        
        await axios.get(`/api/SupplierPortalApi/getpaymentpdf?CompanyId=${id}&TrnNo=${trn}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        })
            .then((response) => {

                const blob = new Blob([response.data], { type: 'application/pdf' });
                saveAs(blob, `Pay_${trn}.pdf`);


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
                            <div className="card-header blue">Supplier Payment Advice</div>
                            <div className="card-body">

                                <div className="card-body1">

                                    <div>
                                        From: <input onChange={(e) => setFromDate(e.target.value)} required type="date" value={fromDate} name="fromdate" id="fromdate" />
                                    </div>
                                    <div>
                                        To: <input value={toDate} onChange={(e) => setToDate(e.target.value)} required type="date" name="todate" id="todate" />
                                    </div>
                                    <div>
                                        <button onClick={() => handleFetchData(cookies.supplierportal, userInfo?.companyId)}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="card-text">TrnNo</th>
                                            <th class="card-text">PayDate</th>
                                            <th class="card-text">PayNo</th>
                                            <th class="card-text">ChequeDate</th>
                                            <th class="card-text">ChequeNo</th>
                                            <th class="card-text">Amount</th>
                                            <th class="card-text">PDF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((details, index) => (
                                                <tr key={index}>
                                                    <td class="card-text">{details.TrnNo}</td>
                                                    <td class="card-text">{details.PayDate}</td>
                                                    <td class="card-text">{details.PayNo}</td>
                                                    <td class="card-text">{details.ChequeDate}</td>
                                                    <td class="card-text">{details.ChequeNo}</td>
                                                    <td class="card-text">{details.Amount}</td>
                                                    <td class="card-text" onClick={() => handleDownloadData(cookies.supplierportal, userInfo?.companyId, details.TrnNo)}><IoMdDownload /></td>
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
export default PaymentDetails;