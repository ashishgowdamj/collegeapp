import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  courseTypes: string[];
  state: string;
  feesRange: number;
  entranceExams: string[];
}

const courseTypeOptions = ["Engineering", "MBA", "Medical", "Arts", "Commerce", "Science"];
const stateOptions = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Uttar Pradesh"];
const entranceExamOptions = ["JEE Main", "JEE Advanced", "NEET", "CAT", "GATE", "CLAT"];

export default function FilterModal({ isOpen, onClose, onApplyFilters, initialFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      courseTypes: [],
      state: "all",
      feesRange: 15,
      entranceExams: [],
    }
  );

  if (!isOpen) return null;

  const handleCourseTypeChange = (courseType: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      courseTypes: checked
        ? [...prev.courseTypes, courseType]
        : prev.courseTypes.filter(ct => ct !== courseType)
    }));
  };

  const handleEntranceExamChange = (exam: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      entranceExams: checked
        ? [...prev.entranceExams, exam]
        : prev.entranceExams.filter(e => e !== exam)
    }));
  };

  const handleClearAll = () => {
    setFilters({
      courseTypes: [],
      state: "all",
      feesRange: 15,
      entranceExams: [],
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Course Type */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Course Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {courseTypeOptions.map(courseType => (
                <div key={courseType} className="flex items-center space-x-2">
                  <Checkbox
                    id={courseType}
                    checked={filters.courseTypes.includes(courseType)}
                    onCheckedChange={(checked) => 
                      handleCourseTypeChange(courseType, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={courseType}
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {courseType}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">State</h3>
            <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {stateOptions.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fees Range */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Fees Range (Per Year)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>₹0</span>
                <span>₹30L+</span>
              </div>
              <Slider
                value={[filters.feesRange]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, feesRange: value[0] }))}
                max={30}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Up to <span className="font-medium">₹{filters.feesRange}L per year</span>
              </div>
            </div>
          </div>

          {/* Entrance Exam */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Entrance Exam</h3>
            <div className="space-y-2">
              {entranceExamOptions.map(exam => (
                <div key={exam} className="flex items-center space-x-2">
                  <Checkbox
                    id={exam}
                    checked={filters.entranceExams.includes(exam)}
                    onCheckedChange={(checked) => 
                      handleEntranceExamChange(exam, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={exam}
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {exam}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={handleClearAll}>
              Clear All
            </Button>
            <Button className="flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
