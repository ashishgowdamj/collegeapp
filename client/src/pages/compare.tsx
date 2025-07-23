import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, X, BarChart3 } from "lucide-react";
import AppHeader from "@/components/app-header";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { College } from "@shared/schema";

export default function Compare() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: colleges = [] } = useQuery<College[]>({
    queryKey: [`/api/colleges?${searchQuery ? `search=${encodeURIComponent(searchQuery)}&` : ''}limit=20`],
  });

  const addCollege = (college: College) => {
    if (selectedColleges.length < 4 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeCollege = (collegeId: number) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId));
  };

  const formatFees = (fees: string | null, period: string | null) => {
    if (!fees) return "Not specified";
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
  };

  const comparisonFields = [
    { key: 'overallRank', label: 'Overall Rank', format: (value: any) => `#${value || 'N/A'}` },
    { key: 'type', label: 'Type', format: (value: any) => value || 'N/A' },
    { key: 'establishedYear', label: 'Established', format: (value: any) => value || 'N/A' },
    { key: 'fees', label: 'Fees', format: (value: any, college: College) => formatFees(value, college.feesPeriod) },
    { key: 'rating', label: 'Rating', format: (value: any) => value ? `${value}/5` : 'N/A' },
    { key: 'placementRate', label: 'Placement Rate', format: (value: any) => value ? `${value}%` : 'N/A' },
    { key: 'averagePackage', label: 'Avg Package', format: (value: any) => value ? `₹${(parseFloat(value) / 100000).toFixed(1)}L` : 'N/A' },
    { key: 'hasHostel', label: 'Hostel', format: (value: any) => value ? 'Available' : 'Not Available' },
  ];

  return (
    <>
      <AppHeader title="Compare Colleges" />
      
      <main className="pb-20 bg-background-gray min-h-screen">
        {/* Selected Colleges Header */}
        {selectedColleges.length > 0 && (
          <div className="px-4 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Comparing {selectedColleges.length} college{selectedColleges.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {selectedColleges.map((college) => (
                <div key={college.id} className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                  <span className="text-sm font-medium">{college.shortName || college.name}</span>
                  <button onClick={() => removeCollege(college.id)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedColleges.length >= 2 && (
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>College Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* College Headers */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {selectedColleges.map((college, index) => (
                    <div key={college.id} className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <button
                          onClick={() => removeCollege(college.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight mb-2" title={college.name}>
                          {college.shortName || college.name}
                        </h3>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {college.location}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          Rank #{college.overallRank || 'N/A'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comparison Data - Card Format */}
                <div className="space-y-4">
                  {comparisonFields.map((field) => {
                    // Determine best value for highlighting
                    const values = selectedColleges.map(college => {
                      const rawValue = (college as any)[field.key];
                      if (field.key === 'overallRank') return rawValue ? parseInt(rawValue) : 999;
                      if (field.key === 'fees') return rawValue ? parseFloat(rawValue) : 999999;
                      if (field.key === 'rating' || field.key === 'placementRate' || field.key === 'averagePackage') {
                        return rawValue ? parseFloat(rawValue) : 0;
                      }
                      return rawValue;
                    });
                    
                    const getBestIndex = () => {
                      if (field.key === 'overallRank' || field.key === 'fees') {
                        const minValue = Math.min(...values.filter(v => v > 0));
                        return values.findIndex(v => v === minValue);
                      }
                      if (field.key === 'rating' || field.key === 'placementRate' || field.key === 'averagePackage') {
                        const maxValue = Math.max(...values);
                        return values.findIndex(v => v === maxValue);
                      }
                      return -1;
                    };
                    
                    const bestIndex = getBestIndex();
                    
                    return (
                      <div key={field.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
                          {field.label}
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {selectedColleges.map((college, index) => {
                            const value = field.format((college as any)[field.key], college);
                            const isBest = index === bestIndex && bestIndex !== -1;
                            return (
                              <div key={college.id} className={`rounded-lg p-3 text-center border transition-all ${
                                isBest 
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 ring-2 ring-green-200 dark:ring-green-700' 
                                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                              }`}>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  College {index + 1}
                                </div>
                                <div className={`font-semibold text-sm ${
                                  isBest ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-gray-100'
                                }`}>
                                  {value}
                                  {isBest && (
                                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                      ✓ Best
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Comparing {selectedColleges.length} colleges side by side
                    </span>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedColleges([])}
                      >
                        Clear All
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => window.print()}
                      >
                        Print Comparison
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparison Instructions */}
        {selectedColleges.length === 1 && (
          <div className="p-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Add one more college to compare
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Select another college from the list below to see a detailed side-by-side comparison.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Add Colleges */}
        <div className="p-4">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search colleges to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {selectedColleges.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Start Comparing</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Search and select colleges to compare side by side</p>
              
              {/* Quick Compare Options */}
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Start:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const topColleges = colleges.slice(0, 2);
                      if (topColleges.length >= 2) {
                        setSelectedColleges(topColleges);
                      }
                    }}
                    className="text-sm"
                    disabled={colleges.length < 2}
                  >
                    Compare Top 2 Colleges
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const topColleges = colleges.slice(0, 3);
                      if (topColleges.length >= 3) {
                        setSelectedColleges(topColleges);
                      }
                    }}
                    className="text-sm"
                    disabled={colleges.length < 3}
                  >
                    Compare Top 3 Colleges
                  </Button>
                </div>
              </div>
            </div>
          )}

          {colleges.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {searchQuery ? 'Search Results' : 'Popular Colleges'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {colleges
                  .filter(college => !selectedColleges.find(c => c.id === college.id))
                  .slice(0, 10)
                  .map((college) => (
                    <div
                      key={college.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 truncate">
                          {college.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="truncate">{college.location}</span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            #{college.overallRank || 'N/A'}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addCollege(college)}
                        disabled={selectedColleges.length >= 4}
                        className="flex items-center space-x-1 ml-3 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {selectedColleges.length >= 4 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Maximum 4 colleges can be compared at once. Remove some colleges to add more.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
