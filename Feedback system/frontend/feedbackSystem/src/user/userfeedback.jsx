import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import axios from "axios";
import StarRating2 from "../assets/starRating2";

function UserFeedbackForm() {
  const { id: formId } = useParams();
  const [currentStep, setCurrentStep] = useState("details");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [formAnswers, setFormAnswers] = useState({});
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/form/${formId}`
        );
        setFormData(response.data.data.formData);
      } catch (error) {
        alert("Error from backend" + error);
      }
    };

    fetchForms();
  }, [formId]);

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    if (userDetails.name && userDetails.email) {
      setCurrentStep("questions");
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setFormAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  await new Promise((resolve) => setTimeout(resolve, 1500));
  setIsSubmitting(false);

  let unAnswered = [];

  // Check if all normal questions are answered
  formData.questions.forEach((question) => {
    if (!(question.id in formAnswers)) {
      unAnswered.push(`${question.text}`);
    }
  });

  // Check if overall rating is answered
  if (!formAnswers["R1"]) {
    unAnswered.push("Overall Rating");
  }

  if (unAnswered.length > 0) {
    alert("Unanswered questions:\n" + unAnswered.join("\n"));
    return;
  }

  const responses = formData.questions.map((question) => ({
    qid: question.id,
    qtype: question.type,
    answer: String(formAnswers[question.id] ?? ""),
  }));

  const overallRating = {
    qid: "R1",
    qtype: "star-rating",
    answer: String(formAnswers["R1"] ?? ""),
  };

  const finalForm = {
    formId,
    userDetails,
    responses,
    overallRating,
  };

  console.log(finalForm);


    try {
      const response = await axios.post(
        `http://localhost:3000/user/${formId}`,
        finalForm
      );
      console.log(response.data.message);

      setCurrentStep("success");
    } catch (error) {
      alert(
        "error from backend " + (error.response?.data?.error || error.message)
      );
    }
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (formData.status !== "active") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-red-600">Form Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This feedback form is currently not active.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.title}
          </h1>
          <p className="text-gray-600">{formData.description}</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "details"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {currentStep === "details" ? "1" : "✓"}
            </div>
            <div className="w-16 h-1 bg-gray-300 mx-2">
              <div
                className={`h-full bg-blue-600 transition-all duration-300 ${
                  currentStep !== "details" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === "questions"
                  ? "bg-blue-600 text-white"
                  : currentStep === "success"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {currentStep === "success" ? "✓" : "2"}
            </div>
          </div>
        </div>

        {currentStep === "details" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>
                Please provide your contact information to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue to Questions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "questions" && (
          <Card>
            <CardHeader>
              <CardTitle>Feedback Questions</CardTitle>
              <CardDescription>
                Hello {userDetails.name}! Please answer the following questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {formData.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <Label className="text-base font-medium">
                      {index + 1}. {question.text}
                    </Label>

                    {question.type === "text-input" && (
                      <Textarea
                        placeholder="Type your response here..."
                        value={formAnswers[question.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        required={question.required}
                      />
                    )}

                    {question.type === "star-rating" && (
                      <div className="space-y-2">
                        <StarRating2
                          value={formAnswers[question.id] || 0}
                          setValue={(val) =>
                            handleAnswerChange(question.id, val)
                          }
                        />
                        {showValidation &&
                          question.required &&
                          !formAnswers[question.id] && (
                            <p className="text-sm text-red-500">
                              Please select a rating
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                ))}

                <Card>
                  <CardContent>
                    <div className="flex items-center justify-center gap-6">
                      <Label htmlFor="title" className="text-lg">
                        Overall Rating
                      </Label>
                      <StarRating2
                        value={formAnswers["R1"] || 0}
                        setValue={(val) => handleAnswerChange("R1", val)}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="justify-center">
                    <span className="text-sm text-muted-foreground">
                      This will be taken for avg rating
                    </span>
                  </CardFooter>
                </Card>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("details")}
                    className="flex-1"
                  >
                    Back to Details
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "success" && (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-600">Thank You!</CardTitle>
              <CardDescription>
                Your feedback has been submitted successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Thank you, <strong>{userDetails.name}</strong>, for taking the
                  time to provide your valuable feedback. We appreciate your
                  input and will use it to improve our services.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    A confirmation has been sent to{" "}
                    <strong>{userDetails.email}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default UserFeedbackForm;
