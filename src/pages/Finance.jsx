import "./Services.css";
import DashboardImg from "../assets/dashboard1.jpg";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Link } from "react-router-dom";

function Finance() {

    return (
        <>
            <Header/>
            <Tabs/>
            <div>
                <main id="po-dashboard-ui" className="main-content">
                    <div className="card-container">
                        <div className="card1">
                            <div className="card-header orange">Supplier Debit Note</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Purchase Order" />
                                <div className="card-text2">
                                    <p><Link to="/debit">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header red">Supplier Credit Note</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Schedule Agreement" />
                                <div className="card-text2">
                                    <p><Link to="/credit">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">Supplier Rejection Details</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Confirmations" />
                                <div className="card-text2">
                                    <p><Link to="/rejection">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="card1">
                            <div className="card-header blue">Payment Advice</div>
                            <div className="card-body">
                                <img src={DashboardImg} alt="Confirmations" />
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