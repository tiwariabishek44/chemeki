import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Layers, Navigation, AlertTriangle, Calendar, ShoppingBag, Users } from "lucide-react"

export default function MapPage() {
  return (
    <div>
      <DashboardHeader
        title="Community Map"
        description="Explore your neighborhood and discover local points of interest"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <MapPin className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="saved">Saved Places</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <Card className="overflow-hidden">
                  <div className="relative aspect-[4/3] md:aspect-[16/9] bg-muted">
                    {/* This would be a real map in a production app */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Map would be displayed here using a mapping library like Leaflet or Google Maps
                        </p>
                      </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Layers className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Map Markers (would be dynamic in a real app) */}
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <MapPin className="h-8 w-8 text-red-500" />
                        <Badge className="absolute -top-2 -right-2 bg-red-500">3</Badge>
                      </div>
                    </div>
                    <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <MapPin className="h-8 w-8 text-green-500" />
                        <Badge className="absolute -top-2 -right-2 bg-green-500">2</Badge>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <MapPin className="h-8 w-8 text-blue-500" />
                        <Badge className="absolute -top-2 -right-2 bg-blue-500">5</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Map Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-events"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                        <label htmlFor="filter-events" className="ml-2 flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-green-500" />
                          Events
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-alerts"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                        <label htmlFor="filter-alerts" className="ml-2 flex items-center text-sm">
                          <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                          Safety Alerts
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-marketplace"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                        <label htmlFor="filter-marketplace" className="ml-2 flex items-center text-sm">
                          <ShoppingBag className="h-4 w-4 mr-1 text-blue-500" />
                          Marketplace
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-groups"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                        <label htmlFor="filter-groups" className="ml-2 flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-purple-500" />
                          Group Meetups
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Distance</h3>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                        <option>Within 1 km</option>
                        <option>Within 5 km</option>
                        <option selected>Within 10 km</option>
                        <option>Any distance</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Time Frame</h3>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                        <option>Today</option>
                        <option selected>This Week</option>
                        <option>This Month</option>
                        <option>Any time</option>
                      </select>
                    </div>

                    <Button className="w-full mt-4">Apply Filters</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium mb-4">Nearby Points of Interest</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Water Shortage Alert</h3>
                        <p className="text-sm text-muted-foreground">Lalitpur, Ward 3</p>
                        <p className="text-xs text-muted-foreground mt-1">500m away • Posted yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Community Cleanup</h3>
                        <p className="text-sm text-muted-foreground">Ratnapark, Kathmandu</p>
                        <p className="text-xs text-muted-foreground mt-1">1.2km away • Tomorrow, 9:00 AM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Wooden Dining Table</h3>
                        <p className="text-sm text-muted-foreground">Rs. 15,000 • Kathmandu, Ward 10</p>
                        <p className="text-xs text-muted-foreground mt-1">800m away • Posted 2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nearby">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nearby Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Community Cleanup</h3>
                          <p className="text-sm text-muted-foreground">Ratnapark, Kathmandu</p>
                          <p className="text-xs text-muted-foreground mt-1">Tomorrow, 9:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Local Food Festival</h3>
                          <p className="text-sm text-muted-foreground">Patan Durbar Square</p>
                          <p className="text-xs text-muted-foreground mt-1">Saturday, 11:00 AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nearby Safety Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Water Shortage Alert</h3>
                          <p className="text-sm text-muted-foreground">Lalitpur, Ward 3</p>
                          <p className="text-xs text-muted-foreground mt-1">Posted yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Road Construction</h3>
                          <p className="text-sm text-muted-foreground">Ringroad, Kathmandu</p>
                          <p className="text-xs text-muted-foreground mt-1">Posted 4 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nearby Marketplace Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                          <ShoppingBag className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wooden Dining Table</h3>
                          <p className="text-sm text-muted-foreground">Rs. 15,000 • Kathmandu, Ward 10</p>
                          <p className="text-xs text-muted-foreground mt-1">Posted 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                          <ShoppingBag className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Samsung Galaxy S21</h3>
                          <p className="text-sm text-muted-foreground">Rs. 45,000 • Lalitpur, Ward 3</p>
                          <p className="text-xs text-muted-foreground mt-1">Posted yesterday</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nearby Group Meetups</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Kathmandu Foodies</h3>
                          <p className="text-sm text-muted-foreground">Weekly Meetup at Thamel</p>
                          <p className="text-xs text-muted-foreground mt-1">Friday, 6:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Kathmandu Valley Gardeners</h3>
                          <p className="text-sm text-muted-foreground">Seed Exchange Event</p>
                          <p className="text-xs text-muted-foreground mt-1">Sunday, 10:00 AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved places</h3>
                <p className="text-sm text-muted-foreground mb-4">Save locations to quickly access them later</p>
                <Button>Explore Map</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
