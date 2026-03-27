import { useState } from "react";
import { Search, Filter, BookOpen, Video, FileText, Link as LinkIcon } from "lucide-react";
import { Annotation } from "../ui/Annotation";

interface Resource {
  id: string;
  title: string;
  type: "video" | "article" | "book" | "link";
  category: string;
  description: string;
  author: string;
  duration?: string;
  rating: number;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    type: "book",
    category: "Algorithms",
    description: "Comprehensive guide to algorithm design and analysis",
    author: "Thomas H. Cormen",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Understanding Big O Notation",
    type: "video",
    category: "Algorithms",
    description: "Visual explanation of time and space complexity",
    author: "Tech Academy",
    duration: "45 min",
    rating: 4.6,
  },
  {
    id: "3",
    title: "Database Design Best Practices",
    type: "article",
    category: "Databases",
    description: "Learn how to design scalable database schemas",
    author: "Sarah Johnson",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    type: "book",
    category: "Operating Systems",
    description: "Deep dive into OS principles and architecture",
    author: "Abraham Silberschatz",
    rating: 4.9,
  },
  {
    id: "5",
    title: "Machine Learning Crash Course",
    type: "video",
    category: "Machine Learning",
    description: "Quick introduction to ML fundamentals",
    author: "Google Developers",
    duration: "3 hours",
    rating: 4.5,
  },
  {
    id: "6",
    title: "System Design Interview Guide",
    type: "link",
    category: "System Design",
    description: "Comprehensive guide for system design interviews",
    author: "Alex Xu",
    rating: 4.8,
  },
];

export function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "video":
        return Video;
      case "article":
        return FileText;
      case "book":
        return BookOpen;
      case "link":
        return LinkIcon;
    }
  };

  const getTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-600";
      case "article":
        return "bg-blue-100 text-blue-600";
      case "book":
        return "bg-green-100 text-green-600";
      case "link":
        return "bg-purple-100 text-purple-600";
    }
  };

  return (
    <div className="p-8 relative">
      <Annotation number={3} label="Resource Library – Browse and search learning materials" position="top-right" />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Resource Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Curated learning materials for your academic journey</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-[16px] p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 relative">
        <Annotation number={4} label="Search Bar – Search for courses and resources by keyword" position="top-right" />
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getTypeIcon(resource.type);
          
          return (
            <div
              key={resource.id}
              className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${getTypeColor(resource.type)} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#06B6D4] transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{resource.author}</span>
                {resource.duration && (
                  <span className="text-gray-500">{resource.duration}</span>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-[#F8FAFC] text-gray-600 rounded-full text-xs">
                  {resource.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}