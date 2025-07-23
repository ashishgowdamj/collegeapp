import { Heart, MapPin, Star, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import type { College } from "@shared/schema";

interface CollegeCardProps {
  college: College;
  onFavorite?: (collegeId: number) => void;
  isFavorited?: boolean;
  onCompare?: (college: College) => void;
  showCompareButton?: boolean;
  isCompareDisabled?: boolean;
}

export default function CollegeCard({ 
  college, 
  onFavorite, 
  isFavorited = false, 
  onCompare,
  showCompareButton = false,
  isCompareDisabled = false
}: CollegeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(college.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare?.(college);
  };

  const formatFees = (fees: string | null, period: string | null) => {
    if (!fees) return "Not specified";
    const amount = parseFloat(fees);
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L${period === "total" ? " total" : "/year"}`;
    }
    return `₹${amount.toLocaleString()}${period === "total" ? " total" : "/year"}`;
  };

  const renderStars = (rating: string | null) => {
    if (!rating) return null;
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < fullStars
                ? "fill-current"
                : i === fullStars && hasHalfStar
                ? "fill-current opacity-50"
                : "stroke-current"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Link to={`/college/${college.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
        <div className="relative">
          <img
            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200"}
            alt={`${college.name} campus`}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              #{college.overallRank || "N/A"}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 leading-tight">
                {college.name}
              </h3>
              <div className="flex items-center space-x-1.5 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{college.location}</span>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 -m-1 ml-2 shrink-0"
            >
              <Heart className={`w-4.5 h-4.5 ${isFavorited ? "fill-current text-red-500" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">Fees</span>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {formatFees(college.fees, college.feesPeriod)}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">Type</span>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {college.type}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              {renderStars(college.rating)}
              {college.rating && (
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {college.rating} • {college.reviewCount?.toLocaleString() || 0} reviews
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {showCompareButton && (
                <button
                  onClick={handleCompareClick}
                  disabled={isCompareDisabled}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isCompareDisabled 
                      ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'border-primary/20 text-primary hover:bg-primary/10'
                  }`}
                  title={isCompareDisabled ? "Maximum 4 colleges can be compared" : "Compare this college"}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors whitespace-nowrap">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
