import { Link } from "react-router-dom";
import "./Tabs.css";

function BankTabs(){

    return (
        <div className="tabs-div1">
            <Link to='/bankDetails' className="tabs-block1">General Details</Link>
            <Link to='/bankDetails/finance' className="tabs-block1">Finance Details</Link>
        </div>
    )
}
export default BankTabs;