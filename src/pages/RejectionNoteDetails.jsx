import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";

function RejectionNoteDetails() {

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

        await axios.get(`/api/SupplierPortalApi/getsupplierrejectiondetails?CompanyId=${id}&FromDate=${fDate}&ToDate=${tDate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setData(res.data.data);
                console.log(res.data.data);
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
            <Tabs active="Finance" />
            <div>
                <main className="main-content">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header blue">Supplier Rejection Note</div>
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
                                {
                                    data.length === 0 ?
                                        <div className="spinnerMainDiv">
                                            <div class="spinner"></div>
                                        </div>
                                        :
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="card-text">InvNo</th>
                                                    <th class="card-text">InvDate</th>
                                                    <th class="card-text">PoNo</th>
                                                    <th class="card-text">PoAmendNo</th>
                                                    <th class="card-text">MaterialName</th>
                                                    <th class="card-text">Quantity</th>
                                                    <th class="card-text">Basic Amount</th>
                                                    <th class="card-text">CGST</th>
                                                    <th class="card-text">SGST</th>
                                                    <th class="card-text">IGST</th>
                                                    <th class="card-text">Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((details, index) => (
                                                        <tr key={index}>
                                                            <td class="card-text">{details.InvNo}</td>
                                                            <td class="card-text">{details.InvDate}</td>
                                                            <td class="card-text">{details.PoNo}</td>
                                                            <td class="card-text">{details.PoAmendNo}</td>
                                                            <td class="card-text">{details.MaterialName}</td>
                                                            <td class="card-text">{details.Quantity}</td>
                                                            <td class="card-text">{details.Rate}</td>
                                                            <td class="card-text">{details.CgstAmount}</td>
                                                            <td class="card-text">{details.SgstAmount}</td>
                                                            <td class="card-text">{details.IgstAmount}</td>
                                                            <td class="card-text">{details.Amount}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default RejectionNoteDetails;