import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Star, MessageSquare } from "lucide-react";
import axios from "axios";
import Rating from "@mui/material/Rating";
const apiUrl = import.meta.env.VITE_API_URL;

export default function EditForm() {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/admin/form/${formId}`
        );
        const form = response.data.data.formData;

        setFormData({
          title: form.title,
          description: form.description,
          status: form.status,
        });

        setQuestions(form.questions);
      } catch (error) {
        alert("Failed to fetch form data: " + error.message);
      }
    };
    fetchForm();
  }, [formId]);

  const normalizeQuestionIds = (questions) =>
    questions.map((q, index) => ({
      ...q,
      id: `Q${index + 1}`,
    }));


  const updateQuestion = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const removeQuestion = (id) => {
    const filtered = questions.filter((q) => q.id !== id);
    const updatedList = normalizeQuestionIds(filtered);
    setQuestions(updatedList);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: "Q" + (questions.length + 1),
      text: "",
      type: "text-input",
      required: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const overallRating = {
    id: "R1",
    text: "Overall Rating",
    type: "star-rating",
    required: true,
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = { ...formData, questions, overallRating };
      await axios.put(
        `${apiUrl}/admin/form/${formId}`,
        updatedForm
      );
      navigate(`/dashboard/${formId}`);

    console.log(updatedForm)
    } catch (error) {
      alert(
        "Error updating form: " + (error.response?.data?.error || error.message)
      );
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to={`/dashboard/${formId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Form</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
              <CardDescription>
                Update your feedback form settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Form Questions</CardTitle>
                  <CardDescription>Edit your form questions</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addQuestion}>
                  <Plus className="h-4 w-4 mr-2" /> Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      <div className="flex items-center gap-1">
                        {getFieldTypeIcon(question.type)}
                        <span className="text-sm text-muted-foreground">
                          {getFieldTypeLabel(question.type)}
                        </span>
                      </div>
                    </div>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Question Text</Label>
                      <Input
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(question.id, { text: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) =>
                          updateQuestion(question.id, { type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text-input">Text Input</SelectItem>
                          <SelectItem value="star-rating">
                            Star Rating
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {question.type === "text-input" && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <Input
                        disabled
                        placeholder="User will type their response here..."
                      />
                    </div>
                  )}

                  {question.type === "star-rating" && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="flex items-center gap-1">
                        <Rating
                          name="half-rating"
                          defaultValue={0}
                          precision={1}
                          readOnly
                        />
                        <span className="text-sm text-muted-foreground ml-2">
                          1–5 star rating
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card >
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 cursor-pointer">
              Update Form
            </Button>
            <Link to={`/dashboard/${formId}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
