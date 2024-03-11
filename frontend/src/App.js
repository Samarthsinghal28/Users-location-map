import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Map from './map';
import LocationComponent from "./LocationComponent";

function App(){
    return(
    <Router>  
        <Routes>
            <Route exact path="/" element={<LocationComponent/>} />
            {/* <Route path="/Map" element={<Map/>} />  */}
        </Routes>
    </Router>
    )

}

export default App