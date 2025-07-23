import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "wouter";
import type { College } from "@shared/schema";

interface CollegeCardProps {
  college: College;
  onFavorite?: (collegeId: number) => void;
  isFavorited?: boolean;
}

export default function CollegeCard({ college, onFavorite, isFavorited = false }: CollegeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(college.id);
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
    <Link to={`/college/${college.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200"}
            alt={`${college.name} campus`}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              #{college.overallRank || "N/A"} Rank
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
                {college.name}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <MapPin className="w-3 h-3" />
                <span>{college.location}</span>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Fees:</span>
              <span className="font-medium ml-1 text-gray-800 dark:text-gray-200">
                {formatFees(college.fees, college.feesPeriod)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Type:</span>
              <span className="font-medium ml-1 text-gray-800 dark:text-gray-200">
                {college.type}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-1">
              {renderStars(college.rating)}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {college.rating} ({college.reviewCount?.toLocaleString()} reviews)
              </span>
            </div>
            <span className="text-primary text-sm font-medium">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
