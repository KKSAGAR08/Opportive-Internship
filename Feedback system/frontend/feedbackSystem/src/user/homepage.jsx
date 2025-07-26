import { React, useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestionMark, MessageSquare, Star, Users } from "lucide-react";
import axios from "axios";


export default function FeedbackHome() {
  const { id: formId } = useParams();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/form/${formId}`
        );
        setFormData(response.data.data.formData)
      } catch (error) {
        alert("Error from backend" + error);
      }
    };

    fetchForms();
  }, [formId]);


  const [formData, setFormData] = useState([]);

  console.log(formData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your opinion matters to us. Choose a feedback form below to share
            your thoughts and help us improve.
          </p>
        </div>

        {/* Available Forms */}
        <div>
            <Card
              className="hover:shadow-lg transition-shadow max-w-md mx-auto"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{formData.title}</CardTitle>
                    <CardDescription className="text-base">
                      {formData.description}
                    </CardDescription>
                  </div>
                  <MessageSquare className="h-6 w-6 text-blue-600 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FileQuestionMark className="h-4 w-4"/>
                        <span>Total Questions:-</span>
                        {formData.questions?.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Response:-</span>
                        {formData.response}
                      </span>
                    </div>
                  </div>

                  <Link to={`/user/${formId}/feedback`}>
                    <Button className="w-full cursor-pointer">Start Feedback</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
