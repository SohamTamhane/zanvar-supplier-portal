import Header from "../components/Header";
import Tabs from "../components/Tabs";
import ContactImg from "../assets/contact.png";
import "../App.css";

function ContactUs(){
    return(
        <>
            <Header/>
            <Tabs/>
            <div className="contact-page-main-div">
                <img src={ContactImg} alt="" />
            </div>
        </>
    )
}

export default ContactUs;