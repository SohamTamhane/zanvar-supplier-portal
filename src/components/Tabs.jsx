import { Link } from "react-router-dom";
import "./Tabs.css";

function Tabs(){

    return (
        <div className="tabs-div">
            <Link to='/' className="tabs-block">Home</Link>
            <Link to='/services' className="tabs-block">Supplier Self Service</Link>
            <Link to='/finance' className="tabs-block">Finance</Link>
            <Link to='/bankDetails' className="tabs-block">Bank Details</Link>
        </div>
    )
}
export default Tabs;