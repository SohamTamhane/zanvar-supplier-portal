import "./Services.css";
import DashboardImg from "../assets/dashboard1.jpg";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";

import PoImg from "../assets/dncn.png";
import ScheduleImg from "../assets/gst.jpg";
import grnImg from "../assets/rejection.jpg";
import asnImg from "../assets/payment.jpg";

function Finance() {

    return (
        <>
            <Header/>
            <Tabs active="Finance"/>
            <div>
                <main id="po-dashboard-ui" className="main-content">
                    <div className="card-container">
                        <div className="card1">
                            <div className="card-header orange">Debit / Credit Note</div>
                            <div className="card-body">
                                <img src={PoImg} alt="Purchase Order" />
                                <div className="card-text2">
                                    <p><Link to="/debit">View DN</Link></p>
                                    <p><Link to="/credit">View CN</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header red">Supplier GST Status</div>
                            <div className="card-body">
                                <img src={ScheduleImg} alt="Schedule Agreement" />
                                <div className="card-text2">
                                    <p><Link to="/gst">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">Supplier Rejection Details</div>
                            <div className="card-body">
                                <img src={grnImg} alt="Confirmations" />
                                <div className="card-text2">
                                    <p><Link to="/rejection">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">Payment Advice</div>
                            <div className="card-body">
                                <img src={asnImg} alt="Confirmations" />
                                <div className="card-text2">
                                    <p><Link to="/payment">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Finance;