import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Company from './pages/auth/Company'
import AppContext from './config/Context'
import Services from './pages/Services'
import PoDetails from './pages/PoDetails'
import GRNDetails from './pages/GRNDetails'
import GSTDetails from './pages/GSTDetails'
import ScheduleDetails from './pages/ScheduleDetails'
import Finance from './pages/Finance'
import DebitDetails from './pages/DebitDetails'
import RejectionNoteDetails from './pages/RejectionNoteDetails'
import BankDetailsTab from './pages/BankDetailsTab'
import FinanceDetailsTab from './pages/FinanceDetailsTab'
import PoConfirmDetails from './pages/PoConfirmDetails'
import PaymentDetails from './pages/PaymentDetails'
import CreditDetails from './pages/CreditDetails'
import ContactUs from './pages/ContactUs'

function App() {

    return (
        <>
            <BrowserRouter>
                <AppContext>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/auth/login' element={<Login/>}/>
                        <Route path='/company' element={<Company/>}/>
                        <Route path='/services' element={<Services/>}/>
                        <Route path='/po' element={<PoDetails/>}/>
                        <Route path='/po/confirm' element={<PoConfirmDetails/>}/>
                        <Route path='/grn' element={<GRNDetails/>}/>
                        <Route path='/gst' element={<GSTDetails/>}/>
                        <Route path='/schedule' element={<ScheduleDetails/>}/>

                        <Route path='/finance' element={<Finance/>}/>
                        <Route path='/debit' element={<DebitDetails/>}/>
                        <Route path='/credit' element={<CreditDetails/>}/>
                        <Route path='/payment' element={<PaymentDetails/>}/>
                        <Route path='/rejection' element={<RejectionNoteDetails/>}/>

                        <Route path='/bankDetails' element={<BankDetailsTab/>}/>
                        <Route path='/bankDetails/finance' element={<FinanceDetailsTab/>}/>

                        <Route path='/contact' element={<ContactUs/>}/>
                    </Routes>
                </AppContext>
            </BrowserRouter>
        </>
    )
}

export default App
