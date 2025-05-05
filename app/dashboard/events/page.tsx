import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Plus, Search, MapPin, Clock, Users, CalendarDays, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Community Cleanup Drive",
    description: "Join us for a community cleanup event at Ratnapark. Bring gloves and water!",
    date: "May 15, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Ratnapark, Kathmandu",
    organizer: {
      name: "Kathmandu Ward 10 Committee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 45,
    category: "Community",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Local Food Festival",
    description:
      "Celebrate the diverse culinary traditions of Nepal with local food vendors and cultural performances.",
    date: "May 20, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Patan Durbar Square, Lalitpur",
    organizer: {
      name: "Lalitpur Metropolitan City",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 230,
    category: "Food & Culture",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Entrepreneurship Workshop",
    description: "Learn from successful local entrepreneurs about starting and growing a business in Nepal.",
    date: "May 25, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Nepal Chamber of Commerce, Kathmandu",
    organizer: {
      name: "Nepal Entrepreneurs Network",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 85,
    category: "Business",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Traditional Music Concert",
    description: "Enjoy an evening of traditional Nepali music featuring local artists and instruments.",
    date: "June 1, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Bhaktapur Durbar Square",
    organizer: {
      name: "Bhaktapur Cultural Preservation Society",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 120,
    category: "Arts & Culture",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "Monsoon Tree Planting",
    description: "Help make our community greener by planting trees before the monsoon season begins.",
    date: "June 5, 2025",
    time: "8:00 AM - 1:00 PM",
    location: "Shivapuri National Park, Kathmandu",
    organizer: {
      name: "Green Nepal Initiative",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 65,
    category: "Environment",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Children's Art Competition",
    description: "Annual art competition for children aged 5-15 with prizes and certificates.",
    date: "June 12, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Kathmandu Art Gallery",
    organizer: {
      name: "Nepal Children's Art Foundation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    attendees: 150,
    category: "Education",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function EventsPage() {
  return (
    <div>
      <DashboardHeader
        title="Events"
        description="Discover and join local events in your community"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search events..." className="w-full pl-8" />
              </div>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="culture">Arts & Culture</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">{event.category}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                        <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {event.organizer.name}
                      </span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Attend
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-events">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No events yet</h3>
                <p className="text-sm text-muted-foreground mb-4">You haven't created or joined any events</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No past events</h3>
                <p className="text-sm text-muted-foreground">Your attended events will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
