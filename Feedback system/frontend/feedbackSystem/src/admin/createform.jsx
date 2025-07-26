import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  SquarePen,
  Plus,
  MessageSquare,
  Trash2,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import HalfRating from "../assets/starRating";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

function Createform() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    status: "draft",
    description: "",
  });

  const [formQuestions, setFormQuestions] = useState([
    {
      id: "Q1",
      text: "",
      type: "text-input",
      required: true,
    },
  ]);

  const overallRating = {
    id: "R1",
    text: "Overall Rating",
    type: "star-rating",
    required: true,
  };

  const getFieldTypeIcon = (type) => {
    switch (type) {
      case "text-input":
        return <MessageSquare className="h-4 w-4" />;
      case "star-rating":
        return <Star className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getFieldTypeLabel = (type) => {
    switch (type) {
      case "text-input":
        return "Text Input";
      case "star-rating":
        return "Star Rating";
      default:
        return "Text Input";
    }
  };

  const normalizeQuestionIds = (questions) =>
    questions.map((q, index) => ({
      ...q,
      id: `Q${index + 1}`,
    }));

  const addQuestions = () => {
    const newQuestions = {
      id: "Q" + (formQuestions.length + 1),
      text: "",
      type: "text-input",
      required: true,
    };

    setFormQuestions([...formQuestions, newQuestions]);
  };

  const removeQuestion = (id) => {
    const filtered = formQuestions.filter((q) => q.id !== id);
    const updatedList = normalizeQuestionIds(filtered);
    setFormQuestions(updatedList);
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    const finalForm = { ...formData, formQuestions, overallRating };

    try {
      console.log(finalForm);
      const response = await axios.post(
        "http://localhost:3000/admin/form/create",
        finalForm
      );
      console.log(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(
        "error from backend " + (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <>
      <div className="w-full">
        <header className="bg-white shadow-sm border-b mb-8">
          <div className="flex items-center gap-3  px-4 py-4">
            <Link to="/dashboard">
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft />
                <span className="hidden sm:block">Back to Dashboard</span>
              </Button>
            </Link>
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              Create New Form
            </span>
          </div>
        </header>

        <div className="max-w-4xl px-5 mx-auto">
          <form className="space-y-8" onSubmit={handSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Form Details
                </h2>
                <span className="text-sm text-muted-foreground">
                  Basic information about your feedback form
                </span>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="mb-3">
                      Form Title
                    </Label>
                    <Input
                      id="title"
                      className="capitalize"
                      placeholder="Enter form title"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      value={formData.title}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="status" className="mb-3">
                      Status
                    </Label>
                    <Select
                      id="form-status"
                      className="w-full"
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 mt-7 ">
                  <Label htmlFor="description" className="">
                    Description
                  </Label>
                  <Textarea
                    placeholder="Describe what this form is for"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    value={formData.description}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="flex justify-between items-center mx-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold">
                    Form Questions
                  </h2>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    Add different types of questions to collect feedback
                  </span>
                </div>
                <Link href="/admin/forms/create">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={addQuestions}
                  >
                    <Plus className="h-4 w-4 mr-0 sm:mr-2" />
                    <span className="hidden sm:block">Add Question</span>
                  </Button>
                </Link>
              </div>

              {formQuestions.map((question, index) => (
                <Card key={index} className="mx-3 sm:mx-6">
                  <CardHeader className="px-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="h-7">
                          {question.id}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getFieldTypeIcon(question.type)}
                          <span className="text-sm text-muted-foreground">
                            {getFieldTypeLabel(question.type)}
                          </span>
                        </div>
                      </div>
                      {formQuestions.length > 1 && (
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="mb-3">
                          Question Text
                        </Label>
                        <Input
                          id="title"
                          className="capitalize"
                          placeholder={`Enter question ${index + 1} `}
                          onChange={(e) =>
                            setFormQuestions((prev) =>
                              prev.map((q) =>
                                q.id === question.id
                                  ? { ...q, text: e.target.value }
                                  : q
                              )
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="status" className="mb-3">
                          Question Type
                        </Label>
                        <Select
                          className="w-full"
                          value={question.type}
                          onValueChange={(value) =>
                            setFormQuestions((prev) =>
                              prev.map((q) =>
                                q.id === question.id ? { ...q, type: value } : q
                              )
                            )
                          }
                        >
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text-input">
                              Text Input
                            </SelectItem>
                            <SelectItem value="star-rating">
                              Star Rating
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {question.type === "text-input" && (
                      <div className="space-y-4 mt-7 ">
                        <Label htmlFor="description" className="">
                          Preview
                        </Label>
                        <Input
                          id="response1"
                          placeholder="User will type their response here...."
                          className="h-10"
                          disabled
                        />
                      </div>
                    )}

                    {question.type === "star-rating" && (
                      <div className="space-y-4 mt-7 ">
                        <Label htmlFor="description" className="">
                          Preview
                        </Label>
                        <Rating
                          name="half-rating"
                          defaultValue={0}
                          precision={1}
                          readOnly
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Card className="mx-3 sm:mx-6">
                <CardContent>
                  <div className="flex items-center justify-center gap-6">
                    <Label htmlFor="title" className="text-lg">
                      Overall Rating
                    </Label>
                    <Rating
                      name="half-rating"
                      defaultValue={0}
                      precision={1}
                      readOnly
                    />
                  </div>
                </CardContent>

                <CardFooter className="justify-center">
                  <span className="text-sm text-muted-foreground">
                    This will be taken for avg rating
                  </span>
                </CardFooter>
              </Card>
            </Card>

            <div className="flex gap-4 mb-8">
              <Button type="submit" className="flex-1 h-11 cursor-pointer">
                Create Form
              </Button>
              <Link href="/admin/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createform;
