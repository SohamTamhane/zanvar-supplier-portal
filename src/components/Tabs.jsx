import { Link } from "react-router-dom";
import "./Tabs.css";

function Tabs({active}){

    return (
        <div className="tabs-div">
            {
                active === "Home" ?
                    <Link to='/' className="tabs-block active-tab">Home</Link>
                : <Link to='/' className="tabs-block">Home</Link>
            }
            {
                active === "Service" ?
                    <Link to='/services' className="tabs-block active-tab">Supplier Self Service</Link>
                : <Link to='/services' className="tabs-block">Supplier Self Service</Link>
            }
            {
                active === "Finance" ?
                    <Link to='/finance' className="tabs-block active-tab">Finance</Link>
                : <Link to='/finance' className="tabs-block">Finance</Link>
            }
            {
                active === "Bank" ?
                    <Link to='/bankDetails' className="tabs-block active-tab">Supplier Info</Link>
                : <Link to='/bankDetails' className="tabs-block">Supplier Info</Link>
            }
        </div>
    )
}
export default Tabs;