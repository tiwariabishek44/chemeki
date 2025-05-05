"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Search,
    MapPin,
    Clock,
    Briefcase,
    ArrowUpRight,
    Plus,
    BookmarkPlus,
    Filter,
    HandHelping,
    FileSearch,
} from "lucide-react"

// Mock data for community job listings
const jobs = [
    {
        id: 1,
        title: "Need Help with Farm Harvest",
        company: "Krishna's Organic Farm",
        location: "Bhaktapur, Nepal",
        payment: "Rs. 1,200 per day",
        type: "Short-term",
        postedTime: "2 days ago",
        logo: "/placeholder.svg?height=40&width=40",
        featured: true,
        category: "Agriculture",
        description: "Looking for 3-4 people to help with seasonal harvest for 3 days. Food and transportation provided.",
    },
    {
        id: 2,
        title: "Community Center Needs Volunteer Teacher",
        company: "Lalitpur Learning Center",
        location: "Lalitpur, Nepal",
        payment: "Rs. 500 per session",
        type: "Part-time",
        postedTime: "5 days ago",
        logo: "/placeholder.svg?height=40&width=40",
        featured: false,
        category: "Education",
        description: "Teaching basic English to community children, 2 hours per day, 3 days a week.",
    },
    {
        id: 3,
        title: "Delivery Partner for Local Restaurant",
        company: "Himalayan Delights",
        location: "Kathmandu, Nepal",
        payment: "Rs. 200 per delivery + tips",
        type: "Flexible",
        postedTime: "1 week ago",
        logo: "/placeholder.svg?height=40&width=40",
        featured: false,
        category: "Food & Restaurant",
        description: "Need reliable person with motorcycle for local food delivery. Flexible hours, payment daily.",
    },
    {
        id: 4,
        title: "Elderly Care Assistant",
        company: "Private Family",
        location: "Patan, Nepal",
        payment: "Rs. 20,000 monthly",
        type: "Full-time",
        postedTime: "3 days ago",
        logo: "/placeholder.svg?height=40&width=40",
        featured: true,
        category: "Healthcare",
        description: "Looking for compassionate person to assist elderly grandmother with daily activities and companionship.",
    },
    {
        id: 5,
        title: "Handyman for Home Repairs",
        company: "Neighborhood Association",
        location: "Pokhara, Nepal",
        payment: "Rs. 1,500 per day",
        type: "On-demand",
        postedTime: "Just now",
        logo: "/placeholder.svg?height=40&width=40",
        featured: false,
        category: "Construction",
        description: "Need experienced handyman for various repairs including plumbing, electrical and carpentry.",
    },
    {
        id: 6,
        title: "Local Tour Guide",
        company: "Trekking Nepal",
        location: "Kathmandu Valley",
        payment: "Rs. 3,000 per tour",
        type: "Weekend",
        postedTime: "1 day ago",
        logo: "/placeholder.svg?height=40&width=40",
        featured: false,
        category: "Tourism",
        description: "Seeking knowledgeable local guides for weekend cultural tours around Kathmandu Valley.",
    },
]

export default function JobsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [jobType, setJobType] = useState<string>("all")
    const [location, setLocation] = useState<string>("all")
    const [category, setCategory] = useState<string>("all")

    // Filter jobs based on search term and filters
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = jobType === "all" ? true : job.type === jobType
        const matchesLocation = location === "all" ? true : job.location.includes(location)
        const matchesCategory = category === "all" ? true : job.category === category

        return matchesSearch && matchesType && matchesLocation && matchesCategory
    })

    return (
        <div className="space-y-6">
            {/* Jobs header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Community Jobs</h1>
                <p className="text-sm text-muted-foreground">Find local work or post jobs for your community needs</p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search jobs in your community..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{jobType === "all" ? "Time Commitment" : jobType}</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Short-term">Short-term</SelectItem>
                            <SelectItem value="On-demand">On-demand</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                            <SelectItem value="Weekend">Weekend</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{location === "all" ? "Location" : location}</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                            <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                            <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                            <SelectItem value="Pokhara">Pokhara</SelectItem>
                            <SelectItem value="Patan">Patan</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{category === "all" ? "Category" : category}</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Agriculture">Agriculture</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Food & Restaurant">Food & Restaurant</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Construction">Construction</SelectItem>
                            <SelectItem value="Tourism">Tourism</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Services">Services</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{filteredJobs.length} community opportunities found</p>
                <div className="flex gap-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <HandHelping className="h-4 w-4 mr-2" /> I Need Help
                    </Button>
                    <Button variant="outline">
                        <FileSearch className="h-4 w-4 mr-2" /> I'm Looking for Work
                    </Button>
                </div>
            </div>

            {/* Tabs for different job views */}
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredJobs.map((job) => (
                                <Link href={`/dashboard/jobs/${job.id}`} key={job.id}>
                                    <Card className={`hover:shadow-md transition-shadow ${job.featured ? 'border-l-4 border-l-green-500' : ''}`}>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <Avatar className="h-12 w-12 rounded-md">
                                                        <AvatarImage src={job.logo} alt={job.company} />
                                                        <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-medium text-base flex items-center gap-2">
                                                            {job.title}
                                                            {job.featured && (
                                                                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                                                                    Urgent
                                                                </Badge>
                                                            )}
                                                        </h3>
                                                        <p className="text-muted-foreground text-sm">{job.company}</p>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <MapPin className="h-3 w-3 mr-1" />
                                                                {job.location}
                                                            </div>
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <Briefcase className="h-3 w-3 mr-1" />
                                                                {job.type}
                                                            </div>
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {job.postedTime}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-green-600">{job.payment}</p>
                                                    <Button size="sm" variant="outline" className="mt-2">
                                                        <ArrowUpRight className="h-3 w-3 mr-1" /> Connect
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>
                                            <Badge variant="outline" className="mt-2">{job.category}</Badge>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No jobs matching your search criteria</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="nearby" className="space-y-4">
                    <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
                        <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Enable location services</h3>
                        <p className="text-sm text-muted-foreground mt-1">Allow location access to see nearby jobs</p>
                        <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                            Enable Location
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="saved" className="space-y-4">
                    <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
                        <BookmarkPlus className="h-10 w-10 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No saved jobs</h3>
                        <p className="text-sm text-muted-foreground mt-1">Save jobs to connect with them later</p>
                        <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white" onClick={() => setActiveTab("all")}>
                            Browse Community Jobs
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Post a job button */}
            <div className="fixed bottom-20 right-4 md:bottom-4">
                <Button className="rounded-full w-12 h-12 p-0 bg-green-500 hover:bg-green-600">
                    <Plus />
                </Button>
            </div>
        </div>
    )
}