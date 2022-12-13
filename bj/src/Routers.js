import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentA from "./component/componentA";
import ComponentB from "./component/componentB";
import Je from "./component/je";
import Token from "./component/Token"
import Balance from "./component/Balance"

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ComponentA/>}/>
                <Route path="/componentb" element={<ComponentB/>}/>
                <Route path="/je" element={<Je/>}/>
                <Route path="/Token" element={<Token/>}/>
                <Route path="/Balance" element={<Balance/>}/>


            </Routes>
        </BrowserRouter>
    )
}
export default Routers
