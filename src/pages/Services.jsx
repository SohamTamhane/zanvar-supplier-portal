import "./Services.css";
import DashboardImg from "../assets/dashboard1.jpg";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";

import Papa from 'papaparse';
import { useEffect, useState } from "react";

function Services() {

    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                const parsedData = results.data.map((row) => ({
                    CompanyId: row.CompanyId,
                    VendorCode: row.VendorCode,
                    PoNo: row.PoNo,
                    ItemNo: row.ItemNo,
                    Quantity: row.Quantity,
                    VendorChallenNo: row.VendorChallenNo,
                    ChallenDate: row.ChallenDate,
                    NetPoRate: row.NetPoRate,
                    BasicAmount: row.BasicAmount,
                    TaxableAmount: row.TaxableAmount,
                    CgstAmount: row.CgstAmount,
                    SgstAmount: row.SgstAmount,
                    IgstAmount: row.IgstAmount,
                    CgstRate: row.CgstRate,
                    SgstRate: row.SgstRate,
                    IgstRate: row.IgstRate,
                    InvoiceValue: row.InvoiceValue,
                    Gstin: row.Gstin,
                    VehicleNo: row.VehicleNo,
                    TransporterName: row.TransporterName,
                    IrnNo: row.IrnNo
                }));

                setCsvData(parsedData);
                // uploadToServer(parsedData);
            },
        });
    };

    useEffect(()=>{
        console.log(csvData);
    }, [csvData])

    return (
        <>
            <Header />
            <Tabs />
            <div>
                <main id="po-dashboard-ui" className="main-content">
                    <div className="card-container">
                        <div className="card1">
                            <div className="card-header orange">All Purchase Orders</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Purchase Order" />
                                <div className="card-text2">
                                    <p><Link to="/po">New</Link></p>
                                    <p><Link to="/po/confirm">Confirmed</Link></p>
                                    {/* <p>In Process (0)</p>
                                    <p>Confirmed</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header red">All Schedule Agreement Releases</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Schedule Agreement" />
                                <div className="card-text2">
                                    <p><Link to="/schedule">New Schedule</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">All GRN</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Confirmations" />
                                <div className="card-text2">
                                    <p><Link to="/grn">View GRN List</Link></p>
                                    <p><Link to="/gst">View GST List</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header green">All ASNs</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="ASN" />
                                <div className="card-text2">
                                    <form action="asndownload" method="post">
                                        <a href="/asn_template.csv" download="asn_template.csv" style={{ color: "rgb(0 2 245)", backgroundColor: "transparent", border: "none", cursor: "pointer" }} type="submit" name="download_asn" value="download_asn">Download File Format</a>
                                    </form>

                                    <div>
                                        <button style={{ color: "rgb(0 2 245)", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>Upload ASN</button>
                                        <input type="file" id="csv_file" name="csv_file" accept=".csv" onChange={handleFileUpload}/>
                                    </div>
                                    <p>ASN Details</p>

                                </div>


                                {/* <div id="popup-div" style={{display: "block", overflowY: "scroll", position: "absolute", backgroundColor: "white", width: "80%", left: "150px", height: "300px", top: "150px"}}>
                            <table>
                                <tr>
                                    <th className="card-text1">AsnNo</th>
                                    <th className="card-text1">ChallenNo</th>
                                    <th className="card-text1">PoNo</th>
                                    <th className="card-text1">ChallenDate</th>
                                    <th className="card-text1">ERROR</th>
                                </tr>
                                
                                <tr>
                                    <td className="card-text1">AsnNo</td>
                                    <td className="card-text1">ChallenNo</td>
                                    <td className="card-text1">PoNo</td>
                                    <td className="card-text1">ChallenDate</td>
                                    <td className="card-text1">ERROR</td>
                                </tr>
                                
                            </table>
                            <span id="close-btn" style={{position: "absolute", right: 0, top: 0, textDecoration: "underline", color: "blue", cursor: "pointer"}}>Close</span>
                        </div> */}



                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Services;