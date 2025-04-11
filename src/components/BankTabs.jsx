import { Link } from "react-router-dom";
import "./Tabs.css";

function BankTabs(){

    return (
        <div className="tabs-div">
            <Link to='/bankDetails' className="tabs-block">General Details</Link>
            <Link to='/bankDetails/finance' className="tabs-block">Finance Details</Link>
        </div>
    )
}
export default BankTabs;