import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

    const downloadCSV = async () => {

        if (data.length === 0) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Data");

        // Add headers
        // const headers = Object.keys(data[0]);
        const headers = ["GSTIN of supplier", "Trade/Legal name of the Supplier", "Trn No", "Trn Date", "Invoice number", "Invoice Date", "Invoice Value (₹)", "Place of supply", "Rate (%)", "Taxable Value (₹)", "Integrated Tax  (₹)", "Central Tax (₹)", "State/UT tax (₹)", "Status", "GSTIN of supplier", "Trade/Legal name of the Supplier", "Invoice number", "Invoice Date", "Invoice Value (₹)", "Place of supply", "Rate (%)", "Taxable Value (₹)", "Integrated Tax  (₹)", "Central Tax (₹)", "State/UT tax (₹)", "Counter Party Return status", "Doc Type"];
        // worksheet.addRow(headers);

        worksheet.columns = headers.map(header => ({
            header,
            key: header,
            width: 15,
        }));

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
        });

        // Add data rows
        data.forEach(row => {
            // const newRow = worksheet.addRow(Object.values(row));
            const newRow = worksheet.addRow([row.GstIn, row.LongName, row.PrnTrnNo, row.PrnTrnDate, row.SortInvNo, row.SortDate, row.SysInvoiceValue, row.SysStateName, row.SysRate, row.SysTaxableValue, row.SysIGstAmt, row.SysCGstAmt, row.SysSGstAmt, row.MatchStatus, row.PortalGstIn, row.PortalLongName, row.PortalInvoiceNo, row.PortalInvoiceDate, row.PortalInvoiceValue, row.SysStateName, row.PortalRate, row.PortalTaxableValue, row.PortalIGstAmt, row.PortalCGstAmt, row.PortalSGstAmt, row.RtnStatus, row.InvoiceType]);
            // console.log(row);
            newRow.eachCell((cell, colNumber) => {
                // Example: color based on cell value
                if (typeof cell.value === "string") {
                    const val = cell.value.toLowerCase();
                    if (val === "match") {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "90EE90" },
                        };
                    } else if (val === "mismatch") {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "FF4500" },
                        };
                    }
                }
            });
        });

        // Export the file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `GST_Details_${fromDate}_${toDate}.xlsx`);
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
            <Tabs active="Finance" />
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
                                {
                                    data.length === 0 ?
                                        <div className="spinnerMainDiv">
                                            <div class="spinner"></div>
                                        </div>
                                        :
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
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default GSTDetails;