import { useNavigate } from "react-router";
import { ArrowRight, Users, BookOpen, Shield, TrendingUp } from "lucide-react";

export function Overview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#06B6D4] text-white p-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[16px] bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] mb-6 shadow-2xl">
            <span className="text-4xl font-bold">SC</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">SWE Compass</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            A comprehensive academic platform for software engineering students at KFUPM to track prerequisites, access learning resources, and plan their academic journey.
          </p>
        </div>

        {/* Project Description */}
        <div className="bg-white/10 backdrop-blur-sm rounded-[16px] p-8 mb-12 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Project Goal</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-6">
            SWE Compass helps students navigate the 129 credit-hour Software Engineering curriculum by visualizing course prerequisites, 
            managing their academic plans, and accessing peer-reviewed study materials. The platform supports three user roles with distinct 
            capabilities to ensure a collaborative and quality-controlled learning environment.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-[#06B6D4]" />
                <h3 className="font-bold text-lg">Students</h3>
              </div>
              <p className="text-sm text-blue-100">
                View prerequisite roadmap, track progress, search resources, and upload study materials for review.
              </p>
            </div>

            <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-[#10B981]" />
                <h3 className="font-bold text-lg">Moderators</h3>
              </div>
              <p className="text-sm text-blue-100">
                Review pending resource submissions, approve or reject content, and ensure quality control.
              </p>
            </div>

            <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-[#F59E0B]" />
                <h3 className="font-bold text-lg">Admins</h3>
              </div>
              <p className="text-sm text-blue-100">
                Manage users, curriculum structure, course information, and prerequisite relationships.
              </p>
            </div>
          </div>
        </div>

        {/* User Flow Diagram */}
        <div className="bg-white/10 backdrop-blur-sm rounded-[16px] p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">User Flow</h2>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="bg-white text-[#1E3A8A] rounded-[12px] px-6 py-4 font-semibold shadow-lg">
              Login / Sign Up
            </div>
            <ArrowRight className="w-6 h-6" />
            <div className="bg-white text-[#1E3A8A] rounded-[12px] px-6 py-4 font-semibold shadow-lg">
              Dashboard
            </div>
            <ArrowRight className="w-6 h-6" />
            <div className="bg-white text-[#1E3A8A] rounded-[12px] px-6 py-4 font-semibold shadow-lg">
              Prerequisite Roadmap
            </div>
            <ArrowRight className="w-6 h-6" />
            <div className="bg-white text-[#1E3A8A] rounded-[12px] px-6 py-4 font-semibold shadow-lg">
              Resource Library
            </div>
            <ArrowRight className="w-6 h-6" />
            <div className="bg-white text-[#1E3A8A] rounded-[12px] px-6 py-4 font-semibold shadow-lg">
              Upload Materials
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-100 mb-4">Additional flows based on role:</p>
            <div className="flex justify-center gap-4">
              <div className="bg-[#10B981]/20 text-white rounded-[12px] px-4 py-2 text-sm border border-[#10B981]/30">
                Moderator → Review Submissions
              </div>
              <div className="bg-[#F59E0B]/20 text-white rounded-[12px] px-4 py-2 text-sm border border-[#F59E0B]/30">
                Admin → Manage System
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-blue-100">Monitor completed, in-progress, and remaining credits</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Interactive Roadmap</h3>
            <p className="text-sm text-blue-100">Visual prerequisite chart with 129 credit hours</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Peer Resources</h3>
            <p className="text-sm text-blue-100">Curated study materials from fellow students</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-sm text-blue-100">Moderated content ensures accuracy</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#1E3A8A] px-8 py-4 rounded-[12px] font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-blue-100 border-t border-white/20 pt-8">
          <p>King Fahd University of Petroleum & Minerals</p>
          <p className="mt-1">College of Computer Sciences & Engineering</p>
        </div>
      </div>
    </div>
  );
}
