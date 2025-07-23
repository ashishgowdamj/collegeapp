import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, FileText, ExternalLink } from "lucide-react";
import AppHeader from "@/components/app-header";
import BottomNavigation from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Exam } from "@shared/schema";

export default function Exams() {
  const { data: exams = [], isLoading } = useQuery<Exam[]>({
    queryKey: ["/api/exams"],
  });

  const getExamTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'engineering':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'medical':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'mba':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <AppHeader title="Entrance Exams" />
      
      <main className="px-4 py-4 pb-20 bg-background-gray min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Entrance Exams 2024
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with important exam dates and information
          </p>
        </div>

        {/* Exam Categories */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Engineering</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">JEE, BITSAT</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <FileText className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Medical</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">NEET, AIIMS</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <FileText className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">MBA</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">CAT, XAT</div>
          </div>
        </div>

        {/* Upcoming Exams Alert */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Upcoming Deadlines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">JEE Advanced application closes in 5 days</p>
            </div>
          </div>
        </div>

        {/* Exam List */}
        <section className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading exams...</p>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No exams found</h3>
              <p className="text-gray-500 dark:text-gray-400">Check back later for exam updates</p>
            </div>
          ) : (
            exams.map((exam) => (
              <Card key={exam.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{exam.name}</CardTitle>
                      {exam.fullName && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exam.fullName}</p>
                      )}
                    </div>
                    <Badge className={getExamTypeColor(exam.type)}>
                      {exam.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {exam.conductingBody && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Conducted by:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{exam.conductingBody}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {exam.totalMarks && (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span>Total Marks: {exam.totalMarks}</span>
                      </div>
                    )}
                    {exam.duration && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Duration: {exam.duration}</span>
                      </div>
                    )}
                  </div>

                  {exam.eligibility && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Eligibility:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exam.eligibility}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    {exam.website && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={exam.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Official Site
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </main>

      <BottomNavigation />
    </>
  );
}
