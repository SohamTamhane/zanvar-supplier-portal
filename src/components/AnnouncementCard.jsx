import axios from "axios";
import { useCookies } from "react-cookie";
import { MdFiberNew } from "react-icons/md";
import { Context } from "../config/Context";
import { useContext } from "react";

function AnnouncementCard({ NoticeCode, NoticeDate, NoticeSubject, NoticeSummary, Attachments, id }) {

    const [cookies, setCookie] = useCookies(['supplierportal']);
    const { userInfo } = useContext(Context);

    async function handleDownloadData(token, id, NoticeCode, SrNo) {
        await axios.get(`/api/SupplierPortalApi/getnoticeattachment?CompanyId=${id}&NoticeCode=${NoticeCode}&SrNo=${SrNo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob',
        })
            .then((response) => {
                // setData(res.data.data);
                // console.log(res.data);
                const disposition = response.headers['content-disposition'];
                let fileName = 'downloaded-file';

                if (disposition && disposition.includes('filename=')) {
                    const fileNameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1].replace(/['"]/g, '');
                    }
                }

                // Create a blob URL and trigger download
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="announcement-card-main-div">
            <div className="announcement-title"><MdFiberNew className="new-logo-div" /> <span>{NoticeSubject}</span></div>
            <div className="announcement-data">{NoticeSummary}</div>
            <div className="announcement-attachments">
                <span>Attachments: </span>
                {
                    Attachments?.map((elm, index) => (
                        <span key={index} className="attachments-links" onClick={() => handleDownloadData(cookies.supplierportal, userInfo?.companyId, elm.NoticeCode, elm.SrNo)}>
                            {elm.FileName}
                        </span>
                    ))
                }
            </div>
            <div className="announcement-uploaded-on">Uploaded On: {NoticeDate}</div>
        </div>
    )
}
export default AnnouncementCard;