import "./Services.css";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import BankTabs from "../components/BankTabs";
import "./BankDetails.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function FinanceDetailsTab() {

    const { userInfo, setUserInfo } = useContext(Context);
    const [data, setData] = useState();
    const [companyList, setCompanyList] = useState([]);
    const [pendingBankList, setPendingBankList] = useState([]);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [togglePopup, setTogglePopup] = useState("none");
    const [bankList, setBankList] = useState([]);
    const [branchList, setBranchList] = useState([]);


    const [bankCode, setBankCode] = useState();
    const [branchCode, setBranchCode] = useState();
    const [ifscCode, setIfscCode] = useState();
    const [accountNo, setAccountNo] = useState();
    const [bankAddress, setBankAddress] = useState();
    const [applicableFor, setApplicableFor] = useState(userInfo.companyId);

    async function handleFetchData(token, id) {
        await axios.get(`/api/SupplierPortalApi/GetExistingSupplierBank?CompanyId=${id}`, {
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

    async function handleFetchCompany(token) {
        await axios.get("/api/SupplierPortalApi/getcompanylist", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setCompanyList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleFetchBankPending(token, id) {
        await axios.get(`/api/SupplierPortalApi/BankConfirmationApprovalPending?CompanyId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setPendingBankList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleFetchBankList(token, id) {
        await axios.get(`/api/SupplierPortalApi/GetBankList?CompanyId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setBankCode(res.data.data[0].SuppRefBankCode);
                setBankList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleFetchBranchList(token, id, bankCode) {
        await axios.get(`/api/SupplierPortalApi/GetBranchList?CompanyId=${id}&BankCode=${bankCode}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setBranchList(res.data.data);
                setBranchCode(res.data.data[0].BankCode);
                setBankAddress(res.data.data[0].BankAddress)
                setIfscCode(res.data.data[0].IfscCode);
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleEditRequest() {
        setTogglePopup("block");
        handleFetchBankList(cookies.supplierportal, userInfo?.companyId);
    }

    async function handleChangeBank(token, id) {

        await axios.post(`/api/SupplierPortalApi/CreateSupplierBankInfo?CompanyId=${id}`, {
            'SubGlAcNo': userInfo.vendorCode,
            'BankCode': bankCode,
            'AccountNumber': accountNo,
            'BranchCode': branchCode,
            'BankAddress': bankAddress,
            'IfscCode': ifscCode,
            'CompanyCode': applicableFor
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                toast.success("Bank Details Updated Successfully !!");
                setTogglePopup("none");
                handleFetchBankPending(cookies.supplierportal, userInfo?.companyId);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (cookies.supplierportal && userInfo) {
            handleFetchData(cookies.supplierportal, userInfo?.companyId);
            handleFetchCompany(cookies.supplierportal);
            handleFetchBankPending(cookies.supplierportal, userInfo?.companyId);
        }
    }, [])

    useEffect(() => {
        if (bankCode) {
            handleFetchBranchList(cookies.supplierportal, userInfo?.companyId, bankCode);
        }
    }, [bankCode]);

    return (
        <>
            <Header />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Tabs active="Bank" />
            </div>
            <div>
                <BankTabs />
            </div>
            <div className="bank-main-div-tab">
                <div style={{ overflowX: "auto" }}>
                    {
                        data ?
                            <table>
                                <thead>
                                    <tr>
                                        <th className="card-text">Sr No</th>
                                        <th className="card-text">Bank Name	</th>
                                        <th className="card-text">Branch Name</th>
                                        <th className="card-text">IFSC Code</th>
                                        <th className="card-text">Account No.</th>
                                        <th className="card-text">Bank Address</th>
                                        <th className="card-text">Status</th>
                                        <th className="card-text">Applicable For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="card-text">1</td>
                                        <td className="card-text">{data?.BankName}</td>
                                        <td className="card-text">{data?.BranchName}</td>
                                        <td className="card-text">{data?.IfscCode}</td>
                                        <td className="card-text">{data?.AccountNumber}</td>
                                        <td className="card-text">{data?.BankAddress}</td>
                                        <td className="card-text">Confirmed</td>
                                        <td className="card-text">
                                            {data?.CompanyCode == 0 ?
                                                <>
                                                    {/* {
                                                    companyList.map((elm, index) => (
                                                        <div key={index}>{index + 1}. {elm.CompanyName}</div>
                                                    ))
                                                } */}
                                                    All
                                                </>
                                                : data?.CompanyCode}
                                        </td>
                                    </tr>
                                    {
                                        pendingBankList.map((elm, index) => (
                                            <tr key={index}>
                                                <td className="card-text">{index + 2}</td>
                                                <td className="card-text">{elm?.BankName}</td>
                                                <td className="card-text">{elm?.BranchName}</td>
                                                <td className="card-text">{elm?.IfscCode}</td>
                                                <td className="card-text">{elm?.AccountNumber}</td>
                                                <td className="card-text">{elm?.BankAddress}</td>
                                                <td className="card-text">Pending</td>
                                                <td className="card-text">
                                                    {elm?.CompanyCode == 0 ?
                                                        <>
                                                            {/* {
                                                            companyList.map((elm, index) => (
                                                                <div key={index}>{index + 1}. {elm.CompanyName}</div>
                                                            ))
                                                        } */}
                                                            All
                                                        </>
                                                        : data?.CompanyCode}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <div className="spinnerMainDiv">
                                <div class="spinner"></div>
                            </div>
                    }
                </div>
                {
                    pendingBankList.length === 0 ?
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <button>Change Bank</button>
                        </div>
                        : <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <button onClick={() => handleEditRequest()}>Edit Bank</button>
                        </div>
                }

                <div style={{ display: togglePopup, marginTop: "25px" }}>
                    <div class="row mt-3">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <label>Bank Name: </label>
                            <select onChange={(e) => {
                                setBankCode(e.target.value);

                            }} style={{ width: "200px", padding: "5px 5px" }} class="form-control" name="bank_name">
                                {
                                    bankList.map((elm, index) => (
                                        <option key={index} value={elm.SuppRefBankCode}>{elm.SuppRefBankName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
                            <label>Branch Name</label>
                            <select onChange={(e) => {
                                setBranchCode(e.target.value);
                                branchList.map((elm) => {
                                    if (elm.BankCode == e.target.value) {
                                        setBankAddress(elm.BankAddress)
                                        setIfscCode(elm.IfscCode);
                                    }
                                })
                            }} style={{ width: "200px", padding: "5px 5px" }} class="form-control" name="branch_name">
                                {
                                    branchList.map((elm, index) => (
                                        <option key={index} value={elm.BankCode}>{elm.BranchName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
                            <label>Account No</label>
                            <input value={accountNo} onChange={(e) => setAccountNo(e.target.value)} type="text" class="form-control" name="account_no" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
                            <label>IFSC Code</label>
                            <input value={ifscCode} type="text" class="form-control" name="account_no" disabled />
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0px" }}>
                        <label>Update Bank For: </label> <br />
                        <input name="applicable_for" onClick={() => setApplicableFor(0)} type="radio" />
                        <label for="all">All</label> <br />
                        <input name="applicable_for" onClick={() => setApplicableFor(userInfo?.companyId)} checked type="radio" />
                        <label for="curr">Current - {userInfo?.companyName}</label>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                        <button onClick={() => handleChangeBank(cookies.supplierportal, userInfo?.companyId)} type="submit" class="btn btn-success btn-save"><i class="fas fa-save"></i> Save</button>
                        <button style={{ marginLeft: "15px" }} onClick={() => setTogglePopup("none")} type="reset" class="btn btn-danger btn-cancel"><i class="fas fa-times"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FinanceDetailsTab;