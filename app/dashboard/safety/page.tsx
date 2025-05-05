import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Plus, Search, AlertTriangle, Bell, MapPin, Clock, ThumbsUp, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for safety alerts
const alerts = [
  {
    id: 1,
    title: "Motorcycle Thefts in Thamel",
    description:
      "Multiple motorcycles have been reported stolen in the Thamel area over the past week. Please ensure your vehicles are properly secured with disc locks and parked in well-lit areas.",
    location: "Thamel, Kathmandu",
    time: "2 hours ago",
    severity: "high",
    category: "Crime",
    author: {
      name: "Bikash Shrestha",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Community Safety Officer",
    },
    verifiedBy: "Kathmandu Metropolitan Police",
    likes: 45,
    comments: 23,
  },
  {
    id: 2,
    title: "Water Shortage Expected",
    description:
      "Due to maintenance work on the main water supply line, residents in Lalitpur area may experience water shortages this weekend. Please store water for essential use.",
    location: "Lalitpur Metropolitan City",
    time: "Yesterday",
    severity: "medium",
    category: "Utilities",
    author: {
      name: "Anita Gurung",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Ward Representative",
    },
    verifiedBy: "Lalitpur Metropolitan City Office",
    likes: 32,
    comments: 15,
  },
  {
    id: 3,
    title: "Landslide Risk on Nagarjun Hill",
    description:
      "Recent heavy rainfall has increased the risk of landslides on Nagarjun Hill. Residents in the area should be cautious and report any signs of land movement to local authorities.",
    location: "Nagarjun, Kathmandu",
    time: "2 days ago",
    severity: "high",
    category: "Natural Hazard",
    author: {
      name: "Ramesh Thapa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Geologist",
    },
    verifiedBy: "Department of Mines and Geology",
    likes: 67,
    comments: 28,
  },
  {
    id: 4,
    title: "Stray Dogs in Bhaktapur Area",
    description:
      "There has been an increase in stray dog activity around Bhaktapur Durbar Square. Some dogs appear aggressive. Please be cautious, especially with children.",
    location: "Bhaktapur Durbar Square",
    time: "3 days ago",
    severity: "medium",
    category: "Animal Safety",
    author: {
      name: "Sarita Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Animal Welfare Volunteer",
    },
    verifiedBy: "Bhaktapur Municipality",
    likes: 29,
    comments: 42,
  },
  {
    id: 5,
    title: "Road Construction Delays",
    description:
      "The road construction on Ringroad between Kalanki and Balaju is causing significant traffic delays. Please plan alternative routes during peak hours.",
    location: "Ringroad, Kathmandu",
    time: "4 days ago",
    severity: "low",
    category: "Traffic",
    author: {
      name: "Mohan Karki",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Traffic Police Officer",
    },
    verifiedBy: "Kathmandu Traffic Police",
    likes: 53,
    comments: 31,
  },
]

// Severity badge colors
const severityColors = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
}

export default function SafetyPage() {
  return (
    <div>
      <DashboardHeader
        title="Safety Alerts"
        description="Stay informed about safety concerns in your community"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="local">My Area</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search alerts..." className="w-full pl-8" />
              </div>
            </div>

            <div className="space-y-6">
              {alerts.map((alert) => (
                <Card key={alert.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${severityColors[alert.severity as keyof typeof severityColors]}`}>
                            {alert.severity === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                          </Badge>
                          <Badge variant="outline">{alert.category}</Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{alert.location}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{alert.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={alert.author.avatar || "/placeholder.svg"} alt={alert.author.name} />
                        <AvatarFallback>{alert.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{alert.author.name}</p>
                        <p className="text-xs text-muted-foreground">{alert.author.role}</p>
                      </div>
                    </div>

                    {alert.verifiedBy && (
                      <div className="mt-3 flex items-center text-xs text-green-600">
                        <Shield className="h-3 w-3 mr-1" />
                        <span>Verified by {alert.verifiedBy}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {alert.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {alert.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Bell className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No local alerts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  There are currently no safety alerts in your immediate area
                </p>
                <Button>View All Alerts</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verified">
            <div className="space-y-6">
              {alerts
                .filter((alert) => alert.verifiedBy)
                .map((alert) => (
                  <Card key={alert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${severityColors[alert.severity as keyof typeof severityColors]}`}>
                              {alert.severity === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                            </Badge>
                            <Badge variant="outline">{alert.category}</Badge>
                          </div>
                          <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{alert.location}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{alert.description}</p>

                      <div className="mt-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={alert.author.avatar || "/placeholder.svg"} alt={alert.author.name} />
                          <AvatarFallback>{alert.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{alert.author.name}</p>
                          <p className="text-xs text-muted-foreground">{alert.author.role}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center text-xs text-green-600">
                        <Shield className="h-3 w-3 mr-1" />
                        <span>Verified by {alert.verifiedBy}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {alert.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {alert.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Bell className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency">
            <div className="space-y-6">
              {alerts
                .filter((alert) => alert.severity === "high")
                .map((alert) => (
                  <Card key={alert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-500">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              High Severity
                            </Badge>
                            <Badge variant="outline">{alert.category}</Badge>
                          </div>
                          <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{alert.location}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{alert.description}</p>

                      <div className="mt-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={alert.author.avatar || "/placeholder.svg"} alt={alert.author.name} />
                          <AvatarFallback>{alert.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{alert.author.name}</p>
                          <p className="text-xs text-muted-foreground">{alert.author.role}</p>
                        </div>
                      </div>

                      {alert.verifiedBy && (
                        <div className="mt-3 flex items-center text-xs text-green-600">
                          <Shield className="h-3 w-3 mr-1" />
                          <span>Verified by {alert.verifiedBy}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {alert.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {alert.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Bell className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
