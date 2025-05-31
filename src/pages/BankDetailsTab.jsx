import "./Services.css";
import DashboardImg from "../assets/dashboard1.jpg";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";
import BankTabs from "../components/BankTabs";
import "./BankDetails.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";

function BankDetailsTab() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [data, setData] = useState();
    const [cookies, setCookie] = useCookies(['supplierportal']);

    async function handleFetchData(token, id) {
        await axios.get(`/api/SupplierPortalApi/GetExistingSupplier?CompanyId=${id}`, {
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

    return (
        <>
            <Header />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Tabs active="Bank" />
            </div>
            <div>
                <BankTabs />
            </div>
            <div>
                {
                    data ?
                        <div className="bank-main-div-tab">
                            {/* <form method="POST"> */}
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Supplier Name</label>
                                    <input type="text" className="form-control" value={data?.LongName} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-3">
                                    <label>Pan No</label>
                                    <input type="text" className="form-control highlight" value={data?.PanNo} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-3">
                                    <label>GST No</label>
                                    <input type="text" className="form-control highlight" value={data?.GstIn} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Address</label>
                                    <input type="text" className="form-control highlight" value={data?.Address} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-3">
                                    <label>City</label>
                                    <input type="text" className="form-control highlight" value={data?.CityName} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-3">
                                    <label>State</label>
                                    <input type="text" className="form-control highlight" value={data?.StateName} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-3">
                                    <label>Phone Number1</label>
                                    <input type="text" className="form-control" value={data?.Phone1} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-3">
                                    <label>Phone Number2</label>
                                    <input type="text" className="form-control" value={data?.Phone2} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Email Id1</label>
                                    <input type="text" className="form-control" value={data?.EmailId} />
                                </div>
                            </div>

                            <div>
                                <div className="col-md-6">
                                    <label>Email Id2</label>
                                    <input type="text" className="form-control" value={data?.EmailId2} />
                                </div>
                            </div>

                        </div>
                        :
                        <div className="spinnerMainDiv">
                            <div class="spinner"></div>
                        </div>
                }
            </div>
        </>
    )
}

export default BankDetailsTab;