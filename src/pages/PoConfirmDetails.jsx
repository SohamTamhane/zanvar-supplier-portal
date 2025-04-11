import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import "./PoDetails.css";
import { Context } from "../config/Context";
import { useCookies } from "react-cookie";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";

function PoConfirmDetails() {

    const {userInfo, setUserInfo} = useContext(Context);
    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [poDetails, setPoDetails] = useState([]);

    async function handleFetchData(token, id){
        await axios.get(`/api/SupplierPortalApi/getpolist?CompanyId=${id}`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        .then((res)=>{
            setPoDetails(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    async function handleDownloadData(token, id, trn, amendNo) {
        // const trn = id + trn.replace("-", "");
        // console.log(trn);
        
        await axios.get(`/api/SupplierPortalApi/GetPoPdf?CompanyId=${id}&TrnNo=${trn}&AmendNo=${amendNo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        })
            .then((response) => {

                const blob = new Blob([response.data], { type: 'application/pdf' });
                saveAs(blob, `PO_${trn}.pdf`);


            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(cookies.supplierportal && userInfo){
            handleFetchData(cookies.supplierportal, userInfo?.companyId);   
        }
    }, [])

    // For Debugging
    // useEffect(()=>{
    //     if(userInfo){
    //         console.log(userInfo);
    //     }
    // }, [])

    return (
        <>
            <Header />
            <Tabs />
            <div>
                <main className="main-content">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-header orange">All Purchase Orders (Confirmed)</div>
                            <div style={{ overflowX: "auto" }}>
                                <table>
                                    <tr>
                                        <th className="card-text">PoNo</th>
                                        <th className="card-text">PoAmend</th>
                                        <th className="card-text">Date</th>
                                        <th className="card-text">PoType</th>
                                        <th className="card-text">MaterialCode</th>
                                        <th className="card-text">Uom</th>
                                        <th className="card-text">Rate</th>
                                        <th className="card-text">PoQty</th>
                                        <th className="card-text">MaterialName</th>
                                        <th className="card-text">PendQty</th>
                                        <th className="card-text">PDF</th>
                                    </tr>

                                    {
                                        poDetails.map((details, index)=>(
                                            
                                                details.IsConfirm === 1 ?
                                                    <tr key={index}>
                                                        <td className="card-text">{details.PoNo}</td>
                                                        <td className="card-text">{details.PoAmend}</td>
                                                        <td className="card-text">{details.PoDate}</td>
                                                        <td className="card-text">{details.PoType}</td>
                                                        <td className="card-text">{details.MaterialCode}</td>
                                                        <td className="card-text">{details.Uom}</td>
                                                        <td className="card-text">{details.Rate}</td>
                                                        <td className="card-text">{details.PoQty}</td>
                                                        <td className="card-text">{details.MaterialName}</td>
                                                        <td className="card-text">{details.PendQty}</td>
                                                        <td class="card-text" onClick={() => handleDownloadData(cookies.supplierportal, userInfo?.companyId, details.PoNo, details.PoAmend)}><IoMdDownload /></td>
                                                    </tr>
                                                : <></>
                                            
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default PoConfirmDetails;