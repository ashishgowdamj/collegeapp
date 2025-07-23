import { useState } from "react";
import { User, Settings, Heart, History, Bell, HelpCircle, LogOut } from "lucide-react";
import AppHeader from "@/components/app-header";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    { icon: Heart, label: "Favorite Colleges", count: 5 },
    { icon: History, label: "Search History", count: null },
    { icon: Settings, label: "Settings", count: null },
    { icon: Bell, label: "Notifications", count: null, hasSwitch: true },
    { icon: HelpCircle, label: "Help & Support", count: null },
  ];

  return (
    <>
      <AppHeader title="Profile" />
      
      <main className="px-4 py-4 pb-20 bg-background-gray min-h-screen">
        {/* User Profile Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">John Doe</h2>
                <p className="text-gray-600 dark:text-gray-400">johndoe@example.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">JEE Aspirant 2024</p>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Colleges Viewed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-secondary">5</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Comparisons</div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Interested Courses:</span>
              <span className="font-medium">Engineering, MBA</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Preferred Locations:</span>
              <span className="font-medium">Delhi, Mumbai, Bangalore</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Budget Range:</span>
              <span className="font-medium">₹2L - ₹10L per year</span>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.count && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                    {item.hasSwitch ? (
                      <Switch
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    ) : (
                      <span className="text-gray-400">›</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sign Out */}
        <Card className="mt-6 cursor-pointer hover:shadow-md transition-shadow border-red-200 dark:border-red-800">
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-600 dark:text-red-400">Sign Out</span>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center mt-8 mb-4">
          <p className="text-xs text-gray-400">College Duniya v1.0.0</p>
        </div>
      </main>

      <BottomNavigation />
    </>
  );
}
