import "./Services.css";
import DashboardImg from "../assets/dashboard1.jpg";
import PoImg from "../assets/po.png";
import ScheduleImg from "../assets/schedule.png";
import grnImg from "../assets/grn.jpg";
import asnImg from "../assets/asn.jpg";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";

import Papa from 'papaparse';
import { useContext, useEffect, useState } from "react";
import { Context } from "../config/Context";
import axios from "axios";
import { useCookies } from "react-cookie";

function Services() {

    const [csvData, setCsvData] = useState([]);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const { userInfo } = useContext(Context);
    const [data, setData] = useState([]);
    const [togglePopup, setTogglePopup] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        Papa.parse(file, {
            skipEmptyLines: true,
            complete: function (results) {
                const allRows = results.data;

                const headers = allRows[1];
                const dataRows = allRows.slice(2);

                const parsedData = dataRows.map((row) => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header.trim()] = row[index];
                    });
                    obj["CompanyId"] = userInfo?.companyId;
                    obj["VendorCode"] = userInfo?.vendorCode;
                    return obj;
                });

                setCsvData(parsedData);
            },
        });
    };

    async function handleUploadData() {

        await axios.post(`/api/SupplierPortalApi/createsupplierportalasn`,
            [...csvData]
            , {
                headers: {
                    Authorization: `Bearer ${cookies.supplierportal}`
                },

            })
            .then((res) => {
                setData(res.data.data);
                setTogglePopup(true);
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        console.log(csvData);
    }, [csvData])

    return (
        <>
            <Header />
            <Tabs active="Service" />
            <div>
                <main id="po-dashboard-ui" className="main-content">
                    <div className="card-container">
                        <div className="card1">
                            <div className="card-header orange">Purchase order Agreements</div>
                            <div className="card-body">
                                <img src={PoImg} alt="Purchase Order" />
                                <div className="card-text2">
                                    <p><Link to="/po">New</Link></p>
                                    <p><Link to="/po/confirm">Confirmed</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header red">Monthly Schedule releases</div>
                            <div className="card-body">
                                <img src={ScheduleImg} alt="Schedule Agreement" />
                                <div className="card-text2">
                                    <p><Link to="/schedule">New Schedule</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">GRN Status</div>
                            <div className="card-body">
                                <img src={grnImg} alt="Confirmations" />
                                <div className="card-text2">
                                    <p><Link to="/grn">View Details</Link></p>
                                    {/* <p><Link to="/gst">View GST List</Link></p> */}
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header green">Advance Shipment notifications (ASN)</div>
                            <div className="card-body">
                                <img src={asnImg} alt="ASN" />
                                <div className="card-text2">
                                    <form action="asndownload" method="post">
                                        <a href="/asn_template.csv" download="asn_template.csv" style={{ color: "rgb(0 2 245)", backgroundColor: "transparent", border: "none", cursor: "pointer" }} type="submit" name="download_asn" value="download_asn">Download File Format</a>
                                    </form>

                                    <div>
                                        <button onClick={handleUploadData} style={{ color: "rgb(0 2 245)", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>Upload ASN</button>
                                        <input type="file" id="csv_file" name="csv_file" accept=".csv" onChange={handleFileUpload} />
                                    </div>
                                    <p><Link to="/asn">ASN Details</Link></p>
                                    {/* <p>ASN Details</p> */}

                                </div>

                                {
                                    togglePopup ? 
                                        <div id="popup-div" style={{ display: "block", overflowY: "scroll", "position": "absolute", backgroundColor: "white", width: "60%", left: "320px", height: "300px", top: "150px", border: "2px solid black"}}>
                                            <table>
                                                <tr>
                                                    <th class="card-text1">AsnNo</th>
                                                    <th class="card-text1">ChallenNo</th>
                                                    <th class="card-text1">PoNo</th>
                                                    <th class="card-text1">ChallenDate</th>
                                                    <th class="card-text1">ERROR</th>
                                                </tr>
                                                {
                                                    data.map((details)=>(
                                                        <tr>
                                                            <td class="card-text1">{details.AsnNo}</td>
                                                            <td class="card-text1">{details.ChallenNo}</td>
                                                            <td class="card-text1">{details.PoNo}</td>
                                                            <td class="card-text1">{details.ChallenDate}</td>
                                                            <td class="card-text1">{details.ERROR}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </table>
                                            <span id="close-btn" onClick={()=>setTogglePopup(false)} style={{position: "absolute", right: 0, top: 0, textDecoration: "underline", color: "blue", cursor: "pointer"}}>Close</span>
                                        </div>
                                    : <></>
                                }
                                
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Services;