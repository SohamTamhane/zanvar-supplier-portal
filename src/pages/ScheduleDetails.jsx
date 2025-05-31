import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";

function ScheduleDetails() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [data, setData] = useState([]);

    const [fromDate, setFromDate] = useState("2024-04-01");
    // const [toDate, setToDate] = useState("2025-04-05");

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    async function handleFetchData(token, id) {
        const fDate = formatDate(fromDate);

        await axios.get(`/api/SupplierPortalApi/getshedule?CompanyId=${id}&Month=${fDate}`, {
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
            <Tabs active="Service"/>
            <div>
                <main className="main-content">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header blue">All Schedule Agreement Releases</div>
                            <div className="card-body">

                                <div className="card-body1">

                                    <div>
                                        Month: <input onChange={(e) => setFromDate(e.target.value)} required type="date" value={fromDate} name="fromdate" id="fromdate" />
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
                                            <th class="card-text">ShortTrnNo</th>
                                            <th class="card-text">SubGlAcNo</th>
                                            <th class="card-text">TrnDate</th>
                                            <th class="card-text">MaterialCode</th>
                                            <th class="card-text">ScheduleDate</th>
                                            <th class="card-text">ScheduleQuantity</th>
                                            <th class="card-text">MaterialName</th>
                                            <th class="card-text">MaterialUom</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((details, index) => (
                                                <tr key={index}>
                                                    <td class="card-text">{details.ShortTrnNo}</td>
                                                    <td class="card-text">{details.SubGlAcNo}</td>
                                                    <td class="card-text">{details.TrnDate}</td>
                                                    <td class="card-text">{details.MaterialCode}</td>
                                                    <td class="card-text">{details.ScheduleDate}</td>
                                                    <td class="card-text">{details.ScheduleQuantity}</td>
                                                    <td class="card-text">{details.MaterialName}</td>
                                                    <td class="card-text">{details.MaterialUom}</td>
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
export default ScheduleDetails;