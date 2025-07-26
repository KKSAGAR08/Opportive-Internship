import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Plus, LogOut, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardFooter } from "../components/ui/card";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/form`);
        setFormData(response.data.data.allForms);
      } catch (error) {
        alert("Error from backend" + error);
      }
    };

    fetchForms();
  }, []);

  const [formData, setFormData] = useState([]);
  const [totalResponse, setTotalResponse] = useState(0);
  const [totalActiveForm, setTotalActiveForm] = useState(0);

  useEffect(() => {
    const total = formData.reduce((sum, e) => sum + e.response, 0);
    setTotalResponse(total);

    const active = formData.filter((form) => form.status === "active");
    setTotalActiveForm(active);
  }, [formData]);

  return (
    <>
      <div className="w-screen">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Link to="/dashboard/create">
                <Button className="cursor-pointer flex justify-center items-center sm:rounded-md bg-blue-600 sm:bg-black ">
                  <Plus className="h-4 w-4 mr-0 sm:mr-2 " />
                  <span className="hidden sm:block">Create Form</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="cursor-pointer flex justify-center items-center"
                onClick={() => {
                  localStorage.removeItem("token"); 
                  navigate("/login");
                }}
              >
                <LogOut className="h-4 w-4 mr-0 sm:mr-2" />
                <span className="hidden sm:block">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        <div className=" grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 mt-6 mx-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Responses
              </CardTitle>
              <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{totalResponse}</div>
              <p className="text-sm text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Forms
              </CardTitle>
              <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{formData?.length}</div>
              <p className="text-sm text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Active Forms
              </CardTitle>
              <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">
                {totalActiveForm.length}
              </div>
              <p className="text-sm text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Forms
              </CardTitle>
              <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">3</div>
              <p className="text-sm text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-8 mx-6">
          <h2 className="text-lg sm:text-2xl font-bold">Feedback Forms</h2>
          <Link to="/dashboard/create">
            <Button variant="outline" className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              New Form
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 mb-8 mt-6 mx-6 gap-4">
          {formData?.map((forms, index) => (
            <Card className="hover:shadow-2xl transition-shadow" key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <Badge variant="default">{forms.status}</Badge>
                <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
              </CardHeader>
              <CardHeader>
                <CardTitle className="font-semibold">{forms.title}</CardTitle>
                <CardDescription>{forms.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Responses</span>
                  <span className="font-medium">50</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {forms.createdAt.split("T")[0]}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Link to={`/dashboard/${forms._id}`} className="w-full">
                  <Button className="w-full cursor-pointer">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
