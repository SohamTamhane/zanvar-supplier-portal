import "./Company.css";
import LogoImg from "../../assets/logo2.png";

import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../config/Context";

function Company() {

    const [cookies, setCookie] = useCookies(['supplierportal']);
    const [companyList, setCompanyList] = useState([]);

    const {userInfo, setUserInfo} = useContext(Context);
    const navigate = useNavigate();

    async function handleSelectCompany(id, companyName, shortName){
        setUserInfo({
            ...userInfo,
            companyId: id,
            companyName: companyName,
            shortName: shortName
        })
        navigate("/");
    }

    async function handleFetchCompany(token){
        await axios.get("/api/SupplierPortalApi/getcompanylist", {headers: {
            Authorization: `Bearer ${token}`
        }})
        .then((res)=>{
            // console.log(res.data);
            setCompanyList(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        // console.log(cookies.supplierportal);
        if(cookies.supplierportal){
            handleFetchCompany(cookies.supplierportal);   
        }
    }, [])

    // For Debugging
    // useEffect(()=>{
    //     if(companyList){
    //         console.log(companyList);
    //     }
    // }, [companyList])

    return (
        <>
            <nav>
                <div className="nav-main-div">
                    <div>
                        <img style={{width: "auto", height: "35px"}} src={LogoImg} alt=""/>
                    </div>
                    <div className="nav-text">
                        Zanvar Group of Industries
                    </div>
                </div>
            </nav>
            <div className="main-div">
                <div className="main-div2">
                    {
                        companyList.map((elm, index)=>(
                            <div key={index} className="box1">
                                <div onClick={()=>handleSelectCompany(elm.CompanyId, elm.CompanyName, elm.CompanyShortName)}>{elm.CompanyName}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Company;