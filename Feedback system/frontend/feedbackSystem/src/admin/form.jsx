import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  SquarePen,
  Plus,
  MessageSquare,
  FileQuestionMark,
  MessageSquareQuote,
  Copy,
  Check,
  Pointer,
} from "lucide-react";
import { Link } from "react-router-dom";
import LineChart from "../assets/lineChart";
import PieChart from "../assets/pieChart";
import BarChart from "../assets/barChart";
import { ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import StarRating2 from "../assets/starRating2";
const apiUrl = import.meta.env.VITE_API_URL;

function Form() {
  const { id } = useParams();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/form/${id}`);
        setFormData(response.data.data.formData);
      } catch (error) {
        alert("Error from backend" + error);
      }
    };

    fetchForms();
  }, [id]);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/${id}`);

        setFormResponse(response.data.data.allResponse);
      } catch (error) {
        alert("Error from backend" + error);
      }
    };

    fetchResponse();
  }, [id]);

  const [formData, setFormData] = useState([]);
  const [formResponse, setFormResponse] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const monthBuckets = [
      "Jan-Feb",
      "Mar-Apr",
      "May-Jun",
      "Jul-Aug",
      "Sep-Oct",
      "Nov-Dec",
    ];

    const groupedData = [0, 1, 2, 3, 4, 5].map((bucketIndex) => {
      const count = formResponse.filter((response) => {
        const month = new Date(response.createdAt).getMonth();
        return Math.floor(month / 2) === bucketIndex;
      }).length;

      return {
        month: monthBuckets[bucketIndex],
        desktop: count,
      };
    });

    setChartData(groupedData);
  }, [formResponse]);

  useEffect(() => {
    const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    formResponse.forEach((response) => {
      const rating = Number(response.overallRating?.answer);
      if (rating >= 1 && rating <= 5) {
        ratingCount[rating]++;
      }
    });

    const chartData = Object.entries(ratingCount).map(([rating, count]) => ({
      month: `${rating} ⭐`,
      desktop: count,
    }));

    setBarChartData(chartData);
  }, [formResponse]);

  useEffect(() => {
    const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const ratingColor = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#6366f1"];

    formResponse.forEach((response) => {
      const rating = Number(response.overallRating?.answer);
      if (rating >= 1 && rating <= 5) {
        ratingCount[rating]++;
      }
    });

    const chartData = Object.entries(ratingCount).map(
      ([rating, count], index) => ({
        star: `${rating} Star`,
        response: count,
        color: ratingColor[index],
      })
    );

    console.log(chartData);

    setPieChartData(chartData);
  }, [formResponse]);

  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/user/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="w-full">
        <header className="bg-white shadow-sm border-b mb-8">
          <div className="container px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="outline" className="cursor-pointer">
                  <ArrowLeft />
                  <span className="hidden sm:block">Back to Dashboard</span>
                </Button>
              </Link>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-gray-900">
                  {formData.title}
                </span>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {formData.description}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className={`cursor-pointer transition-all duration-200 ${
                  copiedUrl
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}
              >
                {copiedUrl ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    <span className="hidden sm:block">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="hidden sm:block">Copy</span>
                  </>
                )}
              </Button>
              <Badge variant="default">{formData.status}</Badge>
              <Link to={`/dashboard/${id}/edit`}>
                <Button variant="outline" className="cursor-pointer">
                  <SquarePen />
                  <span className="hidden sm:block">Edit Form</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center mb-8 mx-6">
          <h2 className="text-lg sm:text-xl font-semibold">Form Analytics</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 mx-6 gap-6 mb-8">
          <LineChart data={chartData} />
          <BarChart data={barChartData} />
          <PieChart data={pieChartData} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 mx-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Responses
              </CardTitle>
              <MessageSquareQuote />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{formResponse?.length}</div>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium ">
                Total Questions
              </CardTitle>
              <FileQuestionMark />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">
                {formData.questions?.length}
              </div>
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
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 mx-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg sm:text-2xl font-semibold">
                Form Questions
              </h2>
            </CardHeader>
            <CardContent>
              {formData.questions?.map((form, index) => (
                <div className="flex items-center gap-6 mb-3" key={index}>
                  <Badge variant="outline" className="h-7 w-7 rounded-2xl">
                    {form.id}
                  </Badge>
                  <h2>{form.text}</h2>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-8 mx-6">
          <h2 className="text-lg sm:text-xl font-semibold">User Responses</h2>
        </div>

        <div className="mb-8 mx-6 flex flex-col gap-6 ">
          {formResponse.map((response, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg text-gray-900 font-semibold ">
                      {response.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {response.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg text-gray-900 font-semibold ">
                      ⭐{response.overallRating.answer}/5
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {response.createdAt.split("T")[0]}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {response.responses.map((ans, index) => {
                    const question = formData.questions?.find(
                      (q) => q.id === ans.qid
                    );
                    return (
                      <div key={index}>
                        <p className="font-medium text-sm text-gray-700 mb-1">
                          {question ? question.text : ans.qid}?
                        </p>
                        {ans.qtype === "star-rating" ? (
                          <StarRating2 value={ans.answer} readOnly={true} />
                        ) : (
                          <p className="text-gray-900">{ans.answer}</p>
                        )}
                        <Separator className="mt-3" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Form;
