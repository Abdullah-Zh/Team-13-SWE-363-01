import { useState } from "react";
import { Check, Lock, BookOpen, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { SuccessModal } from "../modals/SuccessModal";
import { ErrorModal } from "../modals/ErrorModal";
import { Annotation } from "../ui/Annotation";

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  color: "yellow" | "blue" | "green" | "orange" | "purple" | "gray" | "pink";
  status: "completed" | "in-progress" | "available" | "locked";
  prerequisites: string[];
  hasLab?: boolean;
}

interface Semester {
  title: string;
  year: string;
  totalCredits: number;
  courses: Course[];
}

const semesters: Semester[] = [
  {
    title: "1st Semester",
    year: "Freshman",
    totalCredits: 18,
    courses: [
      { id: "math101", code: "MATH 101", name: "Calculus I", credits: 4, color: "yellow", status: "completed", prerequisites: [] },
      { id: "engl101", code: "ENGL 101", name: "English Communication I", credits: 3, color: "blue", status: "completed", prerequisites: [] },
      { id: "ias121", code: "IAS 121", name: "Islamic Studies I", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "phys101", code: "PHYS 101", name: "General Physics I", credits: 4, color: "purple", status: "completed", prerequisites: [], hasLab: true },
      { id: "ics104", code: "ICS 104", name: "Intro to Programming in Python", credits: 4, color: "green", status: "completed", prerequisites: [], hasLab: true },
      { id: "pe101", code: "PE 101", name: "Physical Education", credits: 1, color: "blue", status: "completed", prerequisites: [] },
    ]
  },
  {
    title: "2nd Semester",
    year: "Freshman",
    totalCredits: 17,
    courses: [
      { id: "math102", code: "MATH 102", name: "Calculus II", credits: 4, color: "yellow", status: "completed", prerequisites: ["math101"] },
      { id: "engl102", code: "ENGL 102", name: "English Communication II", credits: 3, color: "blue", status: "completed", prerequisites: ["engl101"] },
      { id: "ias111", code: "IAS 111", name: "Islamic Studies II", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "phys102", code: "PHYS 102", name: "General Physics II", credits: 4, color: "purple", status: "completed", prerequisites: ["phys101"], hasLab: true },
      { id: "ics108", code: "ICS 108", name: "Object Oriented Programming", credits: 4, color: "orange", status: "completed", prerequisites: ["ics104"], hasLab: true },
    ]
  },
  {
    title: "1st Semester",
    year: "Sophomore",
    totalCredits: 17,
    courses: [
      { id: "math201", code: "MATH 201", name: "Calculus III", credits: 4, color: "yellow", status: "completed", prerequisites: ["math102"] },
      { id: "engl214", code: "ENGL 214", name: "Technical Report Writing", credits: 3, color: "blue", status: "completed", prerequisites: ["engl102"] },
      { id: "ias212", code: "IAS 212", name: "Islamic Studies III", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "ics202", code: "ICS 202", name: "Data Structures", credits: 4, color: "orange", status: "in-progress", prerequisites: ["ics108"], hasLab: true },
      { id: "ise291", code: "ISE 291", name: "Engineering Management", credits: 4, color: "green", status: "in-progress", prerequisites: [] },
    ]
  },
  {
    title: "2nd Semester",
    year: "Sophomore",
    totalCredits: 17,
    courses: [
      { id: "math208", code: "MATH 208", name: "Discrete Mathematics", credits: 3, color: "yellow", status: "available", prerequisites: ["math102"] },
      { id: "ics253", code: "ICS 253", name: "Discrete Structures", credits: 3, color: "orange", status: "available", prerequisites: ["ics202", "math208"] },
      { id: "ics321", code: "ICS 321", name: "Algorithm Design & Analysis", credits: 3, color: "orange", status: "available", prerequisites: ["ics202", "math208"] },
      { id: "swe206", code: "SWE 206", name: "Intro to Software Engineering", credits: 3, color: "orange", status: "available", prerequisites: ["ics202"] },
      { id: "coe292", code: "COE 292", name: "Computer Organization", credits: 4, color: "green", status: "available", prerequisites: ["ics108"], hasLab: true },
      { id: "scxxx", code: "SC XXX", name: "Science Elective", credits: 3, color: "yellow", status: "available", prerequisites: [] },
    ]
  },
  {
    title: "1st Semester",
    year: "Junior",
    totalCredits: 16,
    courses: [
      { id: "stat201", code: "STAT 201", name: "Probability & Statistics", credits: 3, color: "yellow", status: "locked", prerequisites: ["math201"] },
      { id: "coe233", code: "COE 233", name: "Computer Organization & Assembly", credits: 4, color: "orange", status: "locked", prerequisites: ["coe292"], hasLab: true },
      { id: "ics343", code: "ICS 343", name: "Software Design & Architecture", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe316", code: "SWE 316", name: "Software Requirements Analysis", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe363", code: "SWE 363", name: "Web Engineering & Development", credits: 3, color: "orange", status: "locked", prerequisites: ["ics202"], hasLab: true },
    ]
  },
  {
    title: "2nd Semester",
    year: "Junior",
    totalCredits: 16,
    courses: [
      { id: "ics344", code: "ICS 344", name: "Software Quality Assurance", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343"] },
      { id: "ics353", code: "ICS 353", name: "Database Systems", credits: 3, color: "orange", status: "locked", prerequisites: ["ics202"], hasLab: true },
      { id: "swe326", code: "SWE 326", name: "Software Project Management", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe387", code: "SWE 387", name: "Software Testing & Validation", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"], hasLab: true },
      { id: "bus200", code: "BUS 200", name: "Business Fundamentals", credits: 3, color: "green", status: "locked", prerequisites: [] },
      { id: "iasxxx", code: "IAS XXX", name: "Islamic Studies Elective", credits: 2, color: "gray", status: "locked", prerequisites: [] },
    ]
  },
  {
    title: "Summer",
    year: "Summer",
    totalCredits: 6,
    courses: [
      { id: "swe399", code: "SWE 399", name: "Internship/Co-op", credits: 3, color: "orange", status: "locked", prerequisites: ["junior-standing"] },
      { id: "cgs392", code: "CGS 392", name: "Practical Training", credits: 3, color: "pink", status: "locked", prerequisites: [] },
    ]
  },
  {
    title: "1st Semester",
    year: "Senior",
    totalCredits: 13,
    courses: [
      { id: "swe413", code: "SWE 413", name: "Software Architecture", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343"] },
      { id: "swe414", code: "SWE 414", name: "Software Project I", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343", "swe326"], hasLab: true },
      { id: "sweelec1", code: "SWE XXX", name: "SWE Elective I", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec2", code: "SWE XXX", name: "SWE Elective II", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "gsxxx", code: "GS XXX", name: "General Studies Elective", credits: 3, color: "pink", status: "locked", prerequisites: [] },
    ]
  },
  {
    title: "2nd Semester",
    year: "Senior",
    totalCredits: 12,
    courses: [
      { id: "swe439", code: "SWE 439", name: "Software Project II", credits: 3, color: "orange", status: "locked", prerequisites: ["swe414"], hasLab: true },
      { id: "sweelec3", code: "SWE XXX", name: "SWE Elective III", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec4", code: "SWE XXX", name: "SWE Elective IV", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec5", code: "SWE XXX", name: "SWE Elective V", credits: 3, color: "orange", status: "locked", prerequisites: [] },
    ]
  }
];

export function Roadmap() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: "", message: "" });
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [successCourseName, setSuccessCourseName] = useState("");
  const navigate = useNavigate();

  const handleAddToPlan = (course: Course) => {
    // Check if already added
    if (addedCourses.includes(course.id)) {
      setErrorMessage({
        title: "Action Failed",
        message: "This course is already in your Major Plan."
      });
      setErrorModalOpen(true);
      return;
    }

    // Check if prerequisites are met
    const hasUnmetPrereqs = course.prerequisites.some(prereqId => {
      const prereq = semesters.flatMap(s => s.courses).find(c => c.id === prereqId);
      return prereq && prereq.status !== "completed";
    });

    if (hasUnmetPrereqs) {
      setErrorMessage({
        title: "Registration Failed",
        message: "You must complete the required prerequisite before registering for this course."
      });
      setErrorModalOpen(true);
      return;
    }

    // Success - add to plan
    setAddedCourses([...addedCourses, course.id]);
    setSuccessCourseName(`${course.code} - ${course.name}`);
    setSuccessModalOpen(true);
  };

  const getColorClasses = (color: Course["color"], status: Course["status"]) => {
    const baseColors = {
      yellow: "bg-[#FEF3C7] border-[#FCD34D] text-[#92400E]",
      blue: "bg-[#DBEAFE] border-[#93C5FD] text-[#1E40AF]",
      green: "bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]",
      orange: "bg-[#FED7AA] border-[#FB923C] text-[#9A3412]",
      purple: "bg-[#E9D5FF] border-[#C084FC] text-[#6B21A8]",
      gray: "bg-[#E5E7EB] border-[#9CA3AF] text-[#374151]",
      pink: "bg-[#FBCFE8] border-[#F472B6] text-[#9F1239]",
    };

    if (status === "completed") {
      return "bg-[#10B981] border-[#10B981] text-white";
    } else if (status === "in-progress") {
      return "bg-[#06B6D4] border-[#06B6D4] text-white";
    } else if (status === "locked") {
      return "bg-gray-100 border-gray-300 text-gray-400 opacity-60";
    }

    return baseColors[color];
  };

  const getStatusIcon = (status: Course["status"]) => {
    if (status === "completed") {
      return <Check className="w-4 h-4" />;
    } else if (status === "locked") {
      return <Lock className="w-4 h-4" />;
    }
    return null;
  };

  const completedCredits = semesters.reduce((total, semester) => {
    return total + semester.courses.filter(c => c.status === "completed").reduce((sum, c) => sum + c.credits, 0);
  }, 0);

  const inProgressCredits = semesters.reduce((total, semester) => {
    return total + semester.courses.filter(c => c.status === "in-progress").reduce((sum, c) => sum + c.credits, 0);
  }, 0);

  return (
    <div className="p-8 relative">
      <Annotation number={3} label="Credit Summary Cards – Display completed, in-progress, and remaining credits" position="top-right" />
      
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="text-sm font-semibold text-[#1E3A8A] dark:text-[#06B6D4] mb-1">KING FAHD UNIVERSITY OF PETROLEUM & MINERALS</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">College of Computer Sciences & Engineering</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Software Engineering (SWE) Pre-Requisites Chart
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">(129 Credit-Hours)</p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 dark:from-[#10B981]/20 dark:to-[#10B981]/10 rounded-[16px] p-4 border border-[#10B981]/20">
            <div className="text-2xl font-bold text-[#10B981]">{completedCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</div>
          </div>
          <div className="bg-gradient-to-br from-[#06B6D4]/10 to-[#06B6D4]/5 dark:from-[#06B6D4]/20 dark:to-[#06B6D4]/10 rounded-[16px] p-4 border border-[#06B6D4]/20">
            <div className="text-2xl font-bold text-[#06B6D4]">{inProgressCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-gradient-to-br from-[#1E3A8A]/10 to-[#1E3A8A]/5 dark:from-[#1E3A8A]/20 dark:to-[#1E3A8A]/10 rounded-[16px] p-4 border border-[#1E3A8A]/20">
            <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#06B6D4]">{129 - completedCredits - inProgressCredits}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-[16px] p-6 shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto relative">
        <Annotation number={4} label="Roadmap Chart – Shows prerequisite structure and course status" position="top-right" />
        <div className="min-w-[1200px]">
          <div className="grid grid-cols-9 gap-4">
            {semesters.map((semester, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Semester Header */}
                <div className="mb-4 text-center">
                  <div className="text-xs font-semibold text-[#1E3A8A] dark:text-[#06B6D4] uppercase tracking-wide">
                    {semester.year}
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {semester.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {semester.totalCredits} CH
                  </div>
                </div>

                {/* Courses */}
                <div className="flex-1 space-y-3">
                  {semester.courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      onMouseEnter={() => setHoveredCourse(course.id)}
                      onMouseLeave={() => setHoveredCourse(null)}
                      className={`
                        relative rounded-[12px] border-2 p-3 cursor-pointer
                        transition-all duration-200
                        ${getColorClasses(course.color, course.status)}
                        ${hoveredCourse === course.id ? "scale-105 shadow-lg" : "shadow-sm"}
                        ${selectedCourse?.id === course.id ? "ring-4 ring-[#1E3A8A]/30" : ""}
                        ${course.status === "locked" ? "cursor-not-allowed" : "hover:shadow-md"}
                      `}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-xs font-bold leading-tight">
                          {course.code}
                        </div>
                        {getStatusIcon(course.status)}
                      </div>
                      <div className="text-[10px] leading-tight font-medium line-clamp-2 mb-2">
                        {course.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold">
                          {course.credits} CH
                        </span>
                        {course.hasLab && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-black/10 rounded">
                            LAB
                          </span>
                        )}
                      </div>
                      {course.status !== "locked" && (
                        <button
                          onClick={() => handleAddToPlan(course)}
                          className="absolute top-2 right-2 bg-[#1E3A8A] dark:bg-[#06B6D4] text-white text-xs font-bold px-2 py-1 rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Details Panel */}
      {selectedCourse && (
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-[16px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedCourse.code}</h2>
                <span className={`
                  px-4 py-1.5 rounded-full text-sm font-medium capitalize
                  ${selectedCourse.status === "completed" ? "bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/20" : ""}
                  ${selectedCourse.status === "in-progress" ? "bg-[#06B6D4]/10 text-[#06B6D4] dark:bg-[#06B6D4]/20" : ""}
                  ${selectedCourse.status === "available" ? "bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-[#06B6D4]/20 dark:text-[#06B6D4]" : ""}
                  ${selectedCourse.status === "locked" ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" : ""}
                `}>
                  {selectedCourse.status.replace("-", " ")}
                </span>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">{selectedCourse.name}</p>
            </div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#06B6D4]" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Credits</h3>
              </div>
              <p className="text-2xl font-bold text-[#1E3A8A] dark:text-[#06B6D4]">{selectedCourse.credits}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Credit Hours</p>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#1E3A8A] dark:text-[#06B6D4]" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Format</h3>
              </div>
              <p className="text-lg font-bold text-[#1E3A8A] dark:text-[#06B6D4]">
                {selectedCourse.hasLab ? "Lecture + Lab" : "Lecture"}
              </p>
            </div>

            <div className="col-span-2 bg-[#F8FAFC] dark:bg-gray-800 rounded-[12px] p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Prerequisites</h3>
              {selectedCourse.prerequisites.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.prerequisites.map((prereqId) => {
                    const prereq = semesters
                      .flatMap(s => s.courses)
                      .find(c => c.id === prereqId);
                    return prereq ? (
                      <span
                        key={prereqId}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        {prereq.code}
                      </span>
                    ) : prereqId === "junior-standing" ? (
                      <span
                        key={prereqId}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        Junior Standing
                      </span>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No prerequisites required</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-gradient-to-r from-[#1E3A8A]/5 to-[#06B6D4]/5 dark:from-[#1E3A8A]/10 dark:to-[#06B6D4]/10 rounded-[16px] p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981] border-2 border-[#10B981] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#06B6D4] border-2 border-[#06B6D4]"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FED7AA] border-2 border-[#FB923C]"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Locked</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onViewPlan={() => {
          setSuccessModalOpen(false);
          navigate("/app/dashboard");
        }}
        courseName={successCourseName}
      />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title={errorMessage.title}
        message={errorMessage.message}
      />
    </div>
  );
}