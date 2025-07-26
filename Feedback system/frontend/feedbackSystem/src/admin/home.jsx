import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  MessageSquare,
  BarChart3,
  Settings,
  Users
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">FeedbackPro</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Powerful feedback management system to collect, analyze, and act on customer insights
          </p>
          <Link to="/login">
            <Button size="lg" className="px-8 py-3 text-lg cursor-pointer">
              Admin Login
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Collect Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create custom feedback forms and collect responses from users</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View detailed analytics and insights from your feedback data</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Settings className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Manage Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create, edit, and manage your feedback forms with ease</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-orange-600 mb-4" />
              <CardTitle>User Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Track and analyze all user responses in one place</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Access your admin dashboard to manage feedback forms and analyze responses
          </p>
          <Link to="/admin/login">
            <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
              Access Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
