
import {Route, Routes }  from "react-router-dom";
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
 
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/home" element= {<ProtectedRoute element={<Homepage />} />}   />
      <Route path="/login" element= {< LoginPage />}   />
      <Route path="/register" element= {< Registerpage />}   />
    </Routes>

    </div>
  )
}

export default App
