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
                <CardTitle>College Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Criteria
                        </th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left py-2 px-3 text-sm font-medium text-gray-900 dark:text-gray-100 min-w-32">
                            <div className="truncate" title={college.name}>
                              {college.shortName || college.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFields.map((field) => (
                        <tr key={field.key} className="border-t border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {field.label}
                          </td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="py-3 px-3 text-sm text-gray-900 dark:text-gray-100">
                              {field.format((college as any)[field.key], college)}
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
            <div className="space-y-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {searchQuery ? 'Search Results' : 'Popular Colleges'}
              </h3>
              {colleges
                .filter(college => !selectedColleges.find(c => c.id === college.id))
                .slice(0, 10)
                .map((college) => (
                  <div
                    key={college.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {college.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{college.location}</span>
                        <Badge variant="outline" className="text-xs">
                          #{college.overallRank || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addCollege(college)}
                      disabled={selectedColleges.length >= 4}
                      className="flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </Button>
                  </div>
                ))}
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
