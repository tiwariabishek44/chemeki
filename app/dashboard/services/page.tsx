import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MapPin, Phone, Globe, Plus, Filter, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for services
const services = [
  {
    id: 1,
    name: "Ram Plumbing Services",
    category: "Plumbing",
    description: "Professional plumbing services for residential and commercial properties.",
    address: "Thamel, Kathmandu",
    phone: "9841-123456",
    website: "www.ramplumbing.com.np",
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=80&width=80",
    verified: true,
  },
  {
    id: 2,
    name: "Shrestha Electricals",
    category: "Electrical",
    description: "Electrical installation, repair, and maintenance services.",
    address: "Patan, Lalitpur",
    phone: "9851-234567",
    website: "www.shresthaelectricals.com.np",
    rating: 4.5,
    reviews: 32,
    image: "/placeholder.svg?height=80&width=80",
    verified: true,
  },
  {
    id: 3,
    name: "Gurung Carpentry",
    category: "Carpentry",
    description: "Custom furniture making and woodwork services.",
    address: "Bhaktapur",
    phone: "9860-345678",
    website: "",
    rating: 4.7,
    reviews: 28,
    image: "/placeholder.svg?height=80&width=80",
    verified: false,
  },
  {
    id: 4,
    name: "Kathmandu Cleaning Services",
    category: "Cleaning",
    description: "Professional cleaning services for homes and offices.",
    address: "Baluwatar, Kathmandu",
    phone: "9801-456789",
    website: "www.ktmcleaning.com",
    rating: 4.3,
    reviews: 56,
    image: "/placeholder.svg?height=80&width=80",
    verified: true,
  },
  {
    id: 5,
    name: "Thapa Painting",
    category: "Painting",
    description: "Interior and exterior painting services with quality materials.",
    address: "Kirtipur, Kathmandu",
    phone: "9818-567890",
    website: "",
    rating: 4.6,
    reviews: 19,
    image: "/placeholder.svg?height=80&width=80",
    verified: false,
  },
  {
    id: 6,
    name: "Nepal IT Solutions",
    category: "IT Services",
    description: "Computer repair, networking, and IT support for homes and businesses.",
    address: "New Road, Kathmandu",
    phone: "9849-678901",
    website: "www.nepalitsolutions.com.np",
    rating: 4.9,
    reviews: 37,
    image: "/placeholder.svg?height=80&width=80",
    verified: true,
  },
]

// Service categories
const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Painting",
  "IT Services",
  "Gardening",
  "Home Repair",
  "Moving",
  "Tutoring",
]

export default function ServicesPage() {
  return (
    <div>
      <DashboardHeader
        title="Local Services"
        description="Find and recommend trusted local service providers"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="my-services">My Services</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for services..." className="w-full pl-8" />
              </div>

              <div className="flex gap-2">
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                  <option value="">All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                    <DropdownMenuItem>Most Reviewed</DropdownMenuItem>
                    <DropdownMenuItem>Verified Only</DropdownMenuItem>
                    <DropdownMenuItem>Nearest to Me</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={service.image || "/placeholder.svg"} alt={service.name} />
                        <AvatarFallback className="rounded-md">{service.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          {service.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant="secondary">{service.category}</Badge>
                          <div className="flex items-center ml-2 text-amber-500">
                            <Star className="fill-current h-4 w-4" />
                            <span className="ml-1 text-sm">{service.rating}</span>
                            <span className="ml-1 text-xs text-muted-foreground">({service.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{service.address}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{service.phone}</span>
                      </div>
                      {service.website && (
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`https://${service.website}`} className="text-green-600 hover:underline">
                            {service.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Contact</Button>
                    <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services
                .filter((service) => service.rating >= 4.5)
                .map((service) => (
                  <Card key={service.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 rounded-md">
                          <AvatarImage src={service.image || "/placeholder.svg"} alt={service.name} />
                          <AvatarFallback className="rounded-md">{service.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            {service.verified && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary">{service.category}</Badge>
                            <div className="flex items-center ml-2 text-amber-500">
                              <Star className="fill-current h-4 w-4" />
                              <span className="ml-1 text-sm">{service.rating}</span>
                              <span className="ml-1 text-xs text-muted-foreground">({service.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{service.address}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{service.phone}</span>
                        </div>
                        {service.website && (
                          <div className="flex items-center text-sm">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <a href={`https://${service.website}`} className="text-green-600 hover:underline">
                              {service.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Contact</Button>
                      <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="my-services">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No services added yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your business or service to connect with the community
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your Service
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
