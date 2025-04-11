import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";

function GSTDetails() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [data, setData] = useState([]);

    const [fromDate, setFromDate] = useState("2024-04-01");
    const [toDate, setToDate] = useState("2025-04-05");

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    const downloadCSV = () => {
        if (data.length === 0) return;

        // Extract headers
        const headers = Object.keys(data[0]).join(",") + "\n";

        // Convert object values to CSV format
        const rows = data.map(obj => Object.values(obj).join(",")).join("\n");

        // Combine headers and rows
        const csvContent = headers + rows;

        // Create a Blob and trigger the download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const fileURL = URL.createObjectURL(blob);

        // Use a single `window.open` to download
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "data.csv";
        a.click();

        // Cleanup the Blob URL
        URL.revokeObjectURL(fileURL);
    };

    async function handleFetchData(token, id) {
        const fDate = formatDate(fromDate);
        const tDate = formatDate(toDate);

        await axios.get(`/api/SupplierPortalApi/getgstrtnstatus?CompanyId=${id}&FromDate=${fDate}&ToDate=${tDate}`, {
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
                            <div className="card-header blue">All GST Return State</div>
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
                                    <div>
                                        <button onClick={() => downloadCSV()}>Download Excel</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="card-text">LongName</th>
                                            <th class="card-text">PartyBillNo</th>
                                            <th class="card-text">PartyBillDate</th>
                                            <th class="card-text">TrnDate</th>
                                            <th class="card-text">TrnNO</th>
                                            <th class="card-text">SysTaxableValue</th>
                                            <th class="card-text">SysCGstAmt</th>
                                            <th class="card-text">SysSGstAmt</th>
                                            <th class="card-text">SysIGstAmt</th>
                                            <th class="card-text">SysInvoiceValue</th>
                                            <th class="card-text">SysRate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((details, index) => (
                                                <tr key={index}>
                                                    <td class="card-text">{details.LongName}</td>
                                                    <td class="card-text">{details.PartyBillNo}</td>
                                                    <td class="card-text">{details.PartyBillDate}</td>
                                                    <td class="card-text">{details.TrnDate}</td>
                                                    <td class="card-text">{details.TrnNO}</td>
                                                    <td class="card-text">{details.SysTaxableValue}</td>
                                                    <td class="card-text">{details.SysCGstAmt}</td>
                                                    <td class="card-text">{details.SysSGstAmt}</td>
                                                    <td class="card-text">{details.SysIGstAmt}</td>
                                                    <td class="card-text">{details.SysInvoiceValue}</td>
                                                    <td class="card-text">{details.SysRate}</td>
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
export default GSTDetails;