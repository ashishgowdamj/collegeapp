import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import AppHeader from "@/components/app-header";
import BottomNavigation from "@/components/bottom-navigation";
import CollegeCard from "@/components/college-card";
import FilterModal, { type FilterState } from "@/components/filter-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { College } from "@shared/schema";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    courseTypes: [],
    state: "all",
    feesRange: 30,
    entranceExams: [],
  });

  const buildQueryString = () => {
    const params: string[] = [];
    if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
    if (filters.state && filters.state !== "all") params.push(`state=${encodeURIComponent(filters.state)}`);
    if (filters.feesRange < 30) params.push(`maxFees=${filters.feesRange * 100000}`);
    return params.length > 0 ? params.join('&') : '';
  };

  const { data: colleges = [], isLoading } = useQuery<College[]>({
    queryKey: [`/api/colleges?${buildQueryString()}`],
  });

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const sortedColleges = [...colleges].sort((a, b) => {
    switch (sortBy) {
      case "rank":
        return (a.overallRank || 999) - (b.overallRank || 999);
      case "fees":
        return parseFloat(a.fees || "0") - parseFloat(b.fees || "0");
      case "rating":
        return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <AppHeader title="Search Colleges" />
      
      <main className="px-4 py-4 pb-20 bg-background-gray min-h-screen">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search colleges, courses, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-3"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rank">Rank</SelectItem>
                <SelectItem value="fees">Fees</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center space-x-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {colleges.length} colleges found
          </p>
        </div>

        {/* College Results */}
        <section className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Searching colleges...</p>
            </div>
          ) : sortedColleges.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No colleges found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            sortedColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))
          )}
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
