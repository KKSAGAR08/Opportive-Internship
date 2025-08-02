import React, { useEffect } from "react";
import {BrowserRouter as Router,Routes, Route , Navigate } from "react-router-dom";
import {useAuthStore} from "./store/userAuthStore"
import HomePage from "./pages/homepage";
import { Loader } from "lucide-react";
import LoginPage from "./pages/loginpage";
import {Toaster} from "react-hot-toast"
import SignupPage from "./pages/signup"
import LandingPage from "./pages/landingpage";

function App() {

  const {userAuth,isChecking,checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[])

  if(!userAuth && isChecking){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return(
  <>
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={userAuth?<HomePage />:<Navigate to="/login"/>} />
      <Route path="/login" element={!userAuth?<LoginPage />:<Navigate to="/home" />} />
      <Route path="/signup" element={!userAuth?<SignupPage />:<Navigate to="/home" />} />
    </Routes>
    </Router>
    <Toaster/>
  </>
  );
}

export default App;
