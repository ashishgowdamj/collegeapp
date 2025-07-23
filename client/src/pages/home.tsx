import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, BarChart3, Lightbulb, Calendar, SlidersHorizontal, X } from "lucide-react";
import AppHeader from "@/components/app-header";
import BottomNavigation from "@/components/bottom-navigation";
import CollegeCard from "@/components/college-card";
import FilterModal, { type FilterState } from "@/components/filter-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { College } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [compareList, setCompareList] = useState<College[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    courseTypes: [],
    state: "all",
    feesRange: 30,
    entranceExams: [],
  });

  const { data: colleges = [], isLoading } = useQuery<College[]>({
    queryKey: [`/api/colleges?${searchQuery ? `search=${encodeURIComponent(searchQuery)}&` : ''}limit=10`],
  });

  const quickFilters = ["Engineering", "MBA", "Medical", "Arts"];

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // TODO: Apply filters to college query
  };

  const handleAddToCompare = (college: College) => {
    if (compareList.length < 4 && !compareList.find(c => c.id === college.id)) {
      setCompareList([...compareList, college]);
    }
  };

  const handleRemoveFromCompare = (collegeId: number) => {
    setCompareList(compareList.filter(c => c.id !== collegeId));
  };

  const handleGoToCompare = () => {
    setLocation('/compare');
  };

  return (
    <>
      <AppHeader />
      
      {/* Comparison Bar */}
      {compareList.length > 0 && (
        <div className="bg-primary text-white px-4 py-2 border-b border-primary-dark">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {compareList.length} college{compareList.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {compareList.length >= 2 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleGoToCompare}
                  className="text-xs h-7 bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Compare Now
                </Button>
              )}
              <button
                onClick={() => setCompareList([])}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex space-x-1 mt-2 overflow-x-auto">
            {compareList.map((college) => (
              <div key={college.id} className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded text-xs whitespace-nowrap">
                <span>{college.shortName || college.name}</span>
                <button onClick={() => handleRemoveFromCompare(college.id)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Search Section */}
      <section className="px-4 py-4 bg-primary text-white">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search colleges, courses, exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-3 bg-white text-gray-800 border-0"
          />
        </div>
        
        {/* Quick Filters */}
        <div className="flex space-x-2 overflow-x-auto">
          <div className="flex space-x-2 whitespace-nowrap">
            {quickFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 cursor-pointer px-3 py-1.5"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <main className="px-4 py-4 pb-20 bg-background-gray min-h-screen">
        {/* Feature Cards */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/compare">
              <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Compare</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Colleges</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Predictor</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Find colleges</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Find Colleges</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center space-x-1 text-primary"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </Button>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <div className="flex space-x-2 whitespace-nowrap">
              <Badge className="bg-primary text-white">All Courses</Badge>
              <Badge variant="outline">Location</Badge>
              <Badge variant="outline">Fees</Badge>
              <Badge variant="outline">Ranking</Badge>
            </div>
          </div>
        </section>

        {/* College List */}
        <section className="mb-8">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading colleges...</p>
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No colleges found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {colleges.map((college) => (
                <div key={college.id} className="w-full">
                  <CollegeCard 
                    college={college} 
                    showCompareButton={true}
                    onCompare={handleAddToCompare}
                    isCompareDisabled={compareList.length >= 4 || compareList.some(c => c.id === college.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommendation Section */}
        <section className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Recommended for You</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">College Predictor</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Find colleges based on your JEE Main score</p>
                </div>
                <Button size="sm" className="text-primary bg-transparent hover:bg-primary/10 text-sm font-medium">
                  Try Now
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-100 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Exam Calendar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">JEE Advanced registration starts in 2 days</p>
                </div>
                <Link to="/exams">
                  <Button size="sm" className="text-secondary bg-transparent hover:bg-secondary/10 text-sm font-medium">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />

      <BottomNavigation />
    </>
  );
}
