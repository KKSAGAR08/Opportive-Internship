import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

import { MessageCircle, Users, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">ChatFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
            <Button variant="outline" size="sm" className="cursor-pointer">
              Sign In
            </Button>
            </Link>
            <Link to="/signup">
            <Button variant="outline" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white cursor-pointer">
              Sign Up
            </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simple Chat for <span className="text-emerald-600">Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with friends, family, and colleagues instantly. Fast,
            secure, and easy to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3 cursor-pointer   "
            >
              <span className="text-white">
                Start Chatting Free
              </span>
            </Button>
            </Link>
            <Link to="/login">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 bg-transparent cursor-pointer"
            >
              Sign In
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ChatFlow?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for seamless communication
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-emerald-600 mx-auto mb-2" />}
              title="Instant Messages"
              desc="Lightning-fast real-time messaging"
            />
            <FeatureCard
              icon={
                <Users className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
              }
              title="Group Chats"
              desc="Create groups and chat with multiple people"
            />
            <FeatureCard
              icon={
                <Shield className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
              }
              title="Secure & Private"
              desc="Your conversations are encrypted and safe"
            />
            <FeatureCard
              icon={
                <MessageCircle className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
              }
              title="Easy to Use"
              desc="Simple interface that anyone can master"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start chatting?
          </h2>
          <p className="text-lg text-emerald-100 mb-6">
            Join our community and connect with people around the world.
          </p>
          <Link to="/signup">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3 cursor-pointer">
            Get Started Now
          </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">ChatFlow</span>
          </div>
          <p className="text-gray-400 mb-4">Simple chat for everyone</p>
          <p className="text-sm text-gray-500">
            &copy; 2024 ChatFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="text-center border-0 shadow-lg">
      <CardHeader>
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}
