import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { Annotation } from "../ui/Annotation";

export function Dashboard() {
  const stats = [
    { label: "Courses Completed", value: "12", icon: BookOpen, color: "bg-[#06B6D4]" },
    { label: "Active Students", value: "2,456", icon: Users, color: "bg-[#10B981]" },
    { label: "Certificates Earned", value: "847", icon: Award, color: "bg-[#1E3A8A]" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "bg-purple-600" },
  ];

  const recentCourses = [
    { 
      name: "Data Structures & Algorithms", 
      progress: 75, 
      status: "In Progress",
      nextDeadline: "Mar 5, 2026"
    },
    { 
      name: "Operating Systems", 
      progress: 100, 
      status: "Completed",
      nextDeadline: null
    },
    { 
      name: "Database Systems", 
      progress: 45, 
      status: "In Progress",
      nextDeadline: "Mar 12, 2026"
    },
  ];

  return (
    <div className="p-8 space-y-8 relative">
      <Annotation number={3} label="Hero Section – Quick overview with action button" position="top-right" />
      
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] rounded-[16px] p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Abdullah! 👋</h1>
          <p className="text-blue-100 mb-6">
            You're on track to complete your Software Engineering pathway this semester.
          </p>
          <Link 
            to="/roadmap" 
            className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] px-6 py-3 rounded-2xl hover:shadow-lg transition-all"
          >
            View Your Roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-48 h-48 bg-white/5 rounded-full -mb-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 relative">
        <Annotation number={4} label="Statistics Cards – Display key metrics and achievements" position="top-right" />
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-[16px] p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Courses */}
      <div className="bg-white dark:bg-gray-900 rounded-[16px] p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative">
        <Annotation number={5} label="Recent Courses – Track your course progress" position="top-right" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Courses</h2>
          <Link to="/roadmap" className="text-[#06B6D4] hover:text-[#1E3A8A] dark:hover:text-[#06B6D4] transition-colors">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentCourses.map((course, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{course.name}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-xs">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          course.progress === 100 ? 'bg-[#10B981]' : 'bg-[#06B6D4]'
                        } transition-all`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-8">
                {course.nextDeadline && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {course.nextDeadline}
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs ${
                  course.status === "Completed" 
                    ? "bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/20"
                    : "bg-[#06B6D4]/10 text-[#06B6D4] dark:bg-[#06B6D4]/20"
                }`}>
                  {course.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}