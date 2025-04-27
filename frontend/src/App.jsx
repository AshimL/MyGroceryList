
import {Route, Routes }  from "react-router-dom";
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Loginpage";


function App() {
 
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element= {< Homepage />}   />
      <Route path="/login" element= {< LoginPage />}   />
    </Routes>

    </div>
  )
}

export default App
