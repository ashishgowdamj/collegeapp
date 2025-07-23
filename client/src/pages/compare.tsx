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
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                          Criteria
                        </th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-40 border-b border-gray-200 dark:border-gray-600">
                            <div className="flex flex-col">
                              <div className="truncate font-medium" title={college.name}>
                                {college.shortName || college.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                                {college.location}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFields.map((field, index) => (
                        <tr key={field.key} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}>
                          <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                            {field.label}
                          </td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="py-4 px-4 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700">
                              <span className="font-medium">
                                {field.format((college as any)[field.key], college)}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <p className="text-gray-500 dark:text-gray-400">Search and select colleges to compare side by side</p>
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
