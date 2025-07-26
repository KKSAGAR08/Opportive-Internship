import React from "react";
import Dashboard from "./admin/dashboard"
import Form from "./admin/form"
import CreateForm from "./admin/createform"
import EditForm from "./admin/editform"
import UserDashboard from "./user/homepage"
import UserFeedback from "./user/userfeedback"
import Home from "./admin/home"
import AdminLogin from "./authentication/adminlogin"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ScrollUp from "@/components/ui/scroleUp"

function App(){
  return(
    <Router>
      <ScrollUp/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<AdminLogin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/dashboard/create" element={<CreateForm/>}></Route>
        <Route path="/dashboard/:id" element={<Form />} />
        <Route path="/dashboard/:id/edit" element={<EditForm/>}/>

        <Route path="/user/:id" element={<UserDashboard/>}/>
        <Route path="/user/:id/feedback" element={<UserFeedback/>}/>
      </Routes>
    </Router>
  )
}

export default App;

