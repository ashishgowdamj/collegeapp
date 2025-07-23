import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Share2, MapPin, Phone, Globe, Star, Users, TrendingUp, Building, Wifi } from "lucide-react";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { College, Review } from "@shared/schema";

export default function CollegeDetails() {
  const { id } = useParams();
  const collegeId = parseInt(id || "0");

  const { data: college, isLoading } = useQuery<College>({
    queryKey: [`/api/colleges/${collegeId}`],
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: [`/api/colleges/${collegeId}/reviews`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">College not found</h2>
          <Link to="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            className={`w-4 h-4 ${
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
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 px-4 py-3 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-20">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"}
            alt={`${college.name} campus`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              #{college.overallRank || "N/A"} Rank
            </span>
          </div>
        </div>

        {/* College Info */}
        <div className="px-4 py-4 bg-white dark:bg-gray-900">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {college.name}
            </h1>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{college.location}</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              {renderStars(college.rating)}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {college.rating} ({college.reviewCount?.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex space-x-2">
              <Badge>{college.type}</Badge>
              <Badge variant="outline">Est. {college.establishedYear}</Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatFees(college.fees, college.feesPeriod)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fees</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {college.placementRate || "N/A"}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Placement Rate</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="placement">Placement</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>About College</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {college.description || "No description available."}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Affiliation:</span>
                    <span className="font-medium">{college.affiliation || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Admission Process:</span>
                    <span className="font-medium">{college.admissionProcess || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Hostel Available:</span>
                    <span className="font-medium">{college.hasHostel ? "Yes" : "No"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5" />
                  <span>Facilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Library</Badge>
                  <Badge variant="outline">Wi-Fi</Badge>
                  <Badge variant="outline">Sports Complex</Badge>
                  <Badge variant="outline">Cafeteria</Badge>
                  {college.hasHostel && <Badge variant="outline">Hostel</Badge>}
                  <Badge variant="outline">Labs</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 dark:text-gray-400">
                  Course information will be loaded here. This would typically show:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Available degree programs</li>
                    <li>Specializations offered</li>
                    <li>Seat matrix</li>
                    <li>Eligibility criteria</li>
                    <li>Course fees breakdown</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placement" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Placement Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {college.averagePackage ? `₹${(parseFloat(college.averagePackage) / 100000).toFixed(1)}L` : "N/A"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Package</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {college.highestPackage ? `₹${(parseFloat(college.highestPackage) / 100000).toFixed(1)}L` : "N/A"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Highest Package</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Detailed placement statistics and top recruiting companies information would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-4">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Be the first to review this college</p>
                  <Button className="mt-4">Write a Review</Button>
                </CardContent>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {review.studentName || "Anonymous"}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {review.course} • Class of {review.graduationYear}
                        </p>
                      </div>
                      {review.rating && renderStars(review.rating)}
                    </div>
                    {review.title && (
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        {review.title}
                      </h5>
                    )}
                    <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </>
  );
}
