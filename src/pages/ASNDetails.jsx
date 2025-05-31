import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function ASNDetails() {

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

        await axios.get(`/api/SupplierPortalApi/getsupplierasndetails?CompanyId=${id}&FromDate=${fDate}&ToDate=${tDate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleDeleteData(token, asn) {
        const fDate = formatDate(fromDate);
        const tDate = formatDate(toDate);

        await axios.get(`/api/SupplierPortalApi/deletesupplierasn?AsnNo=${asn}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                handleFetchData(cookies.supplierportal, userInfo?.companyId);
                // setData(res.data.data);
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
            <Tabs active="Service" />
            <div>
                <main className="main-content">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header blue">ASN Details</div>
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
                                                    <th className="card-text">AsnNo</th>
                                                    <th className="card-text">PoNo</th>
                                                    <th className="card-text">ItemNo</th>
                                                    <th className="card-text">Quantity</th>
                                                    <th className="card-text">VendorChallenNo</th>
                                                    <th className="card-text">ChallenDate</th>
                                                    <th className="card-text">NetPoRate</th>
                                                    <th className="card-text">BasicAmount</th>
                                                    <th className="card-text">TaxableAmount</th>
                                                    <th className="card-text">CgstAmount</th>
                                                    <th className="card-text">SgstAmount</th>
                                                    <th className="card-text">IgstAmount</th>
                                                    <th className="card-text">CgstRate</th>
                                                    <th className="card-text">SgstRate</th>
                                                    <th className="card-text">IgstRate</th>
                                                    <th className="card-text">InvoiceValue</th>
                                                    <th className="card-text">Gstin</th>
                                                    <th className="card-text">VehicleNo</th>
                                                    <th className="card-text">TransporterName</th>
                                                    <th className="card-text">IrnNo</th>
                                                    {/* <th className="card-text">ChallenNo</th> */}
                                                    <th className="card-text">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((details, index) => (
                                                        <tr key={index}>
                                                            <td className="card-text">{details.AsnNo}</td>
                                                            <td className="card-text">{details.PoNo}</td>
                                                            <td className="card-text">{details.ItemNo}</td>
                                                            <td className="card-text">{details.Quantity}</td>
                                                            <td className="card-text">{details.VendorChallenNo}</td>
                                                            <td className="card-text">{details.ChallenDate}</td>
                                                            <td className="card-text">{details.NetPoRate}</td>
                                                            <td className="card-text">{details.BasicAmount}</td>
                                                            <td className="card-text">{details.TaxableAmount}</td>
                                                            <td className="card-text">{details.CgstAmount}</td>
                                                            <td className="card-text">{details.SgstAmount}</td>
                                                            <td className="card-text">{details.IgstAmount}</td>
                                                            <td className="card-text">{details.CgstRate}</td>
                                                            <td className="card-text">{details.SgstAmount}</td>
                                                            <td className="card-text">{details.IgstRate}</td>
                                                            <td className="card-text">{details.InvoiceValue}</td>
                                                            <td className="card-text">{details.Gstin}</td>
                                                            <td className="card-text">{details.VehicleNo}</td>
                                                            <td className="card-text">{details.TransporterName}</td>
                                                            <td className="card-text">{details.IrnNo}</td>
                                                            {/* <td className="card-text">{details.ChallenNo}</td> */}
                                                            <td className="card-text" style={{ cursor: "pointer" }} onClick={() => handleDeleteData(cookies.supplierportal, details.AsnNo)}><MdDelete /></td>
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
export default ASNDetails;