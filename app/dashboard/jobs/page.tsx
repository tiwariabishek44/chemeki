"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Search,
    MapPin,
    Plus,
    Clock,
    Building,
    Phone,
} from "lucide-react"

// Mock data for job listings based on Nepal's structure
const jobs = [
    {
        id: 1,
        title: "Need Helper for Rice Planting",
        description: "Looking for 2 people to help plant rice for 3 days",
        location: "Ward 5, Lalitpur",
        level: "Ward",
        payment: "Rs. 1,200 per day",
        postedTime: "2 days ago",
        contact: "9801234567",
        postedBy: "Krishna Sharma"
    },
    {
        id: 2,
        title: "Tailor needed for local shop",
        description: "Experienced tailor needed for a small tailoring shop",
        location: "Ward 8, Kathmandu",
        level: "Ward",
        payment: "Rs. 20,000 monthly",
        postedTime: "5 days ago",
        contact: "9867654321",
        postedBy: "Ramesh Pradhan"
    },
    {
        id: 3,
        title: "Driver for School Bus",
        description: "School needs a driver with heavy license for morning and afternoon shifts",
        location: "Bhaktapur Municipality",
        level: "Municipality",
        payment: "Rs. 25,000 monthly",
        postedTime: "1 day ago",
        contact: "9812345678",
        postedBy: "Sunrise School"
    },
    {
        id: 4,
        title: "Construction Workers Needed",
        description: "Need 5 workers for building construction project",
        location: "Lalitpur Metropolitan City",
        level: "Municipality",
        payment: "Rs. 1,500 per day",
        postedTime: "3 days ago",
        contact: "9854321098",
        postedBy: "Namuna Construction"
    },
    {
        id: 5,
        title: "Tour Guide for Patan",
        description: "Looking for local guide who knows Patan area well",
        location: "Lalitpur District",
        level: "District",
        payment: "Rs. 2,000 per tour",
        postedTime: "Just now",
        contact: "9876543210",
        postedBy: "Nepal Travels"
    }
]

export default function JobsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [areaLevel, setAreaLevel] = useState<string>("all")
    const [showPostJobDialog, setShowPostJobDialog] = useState(false)

    // Filter jobs based on search term and area level
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLevel = areaLevel === "all" ? true : job.level === areaLevel

        return matchesSearch && matchesLevel
    })

    return (
        <div className="space-y-6">
            {/* Jobs header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Community Jobs</h1>
                <p className="text-sm text-muted-foreground">Find or post job opportunities in your neighborhood</p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search jobs in your area..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={areaLevel} onValueChange={setAreaLevel}>
                    <SelectTrigger className="w-[180px]">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{areaLevel === "all" ? "All Areas" : areaLevel}</span>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="Ward">Ward</SelectItem>
                        <SelectItem value="Municipality">Municipality/Metro</SelectItem>
                        <SelectItem value="District">District</SelectItem>
                        <SelectItem value="Province">Province</SelectItem>
                        <SelectItem value="Nation">National</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => setShowPostJobDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Post Job
                </Button>
            </div>

            <div className="text-sm text-muted-foreground">
                Showing {filteredJobs.length} jobs
            </div>

            {/* Jobs listing */}
            <div className="grid grid-cols-1 gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <Link href={`/dashboard/jobs/${job.id}`} key={job.id}>
                            <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-lg">{job.title}</h3>
                                            <Badge variant="outline">{job.level}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{job.description}</p>

                                        <div className="flex flex-wrap gap-4 mt-3">
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {job.postedTime}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-3">
                                            <span className="font-medium text-green-600">{job.payment}</span>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Phone className="h-3 w-3 mr-1" />
                                                {job.contact}
                                            </div>
                                        </div>

                                        <div className="mt-2 text-sm">
                                            <span className="text-muted-foreground">Posted by:</span> {job.postedBy}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No jobs found matching your search</p>
                        <Button variant="outline" className="mt-4" onClick={() => {
                            setSearchTerm("");
                            setAreaLevel("all");
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Post Job Dialog */}
            <Dialog open={showPostJobDialog} onOpenChange={setShowPostJobDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Post a Job</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="job-title">Job Title</Label>
                            <Input id="job-title" placeholder="E.g., Need a plumber" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="job-description">Description</Label>
                            <Textarea id="job-description" placeholder="Describe the job requirements" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="job-payment">Payment/Salary</Label>
                                <Input id="job-payment" placeholder="E.g., Rs. 1000 per day" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="area-level">Area Level</Label>
                                <Select defaultValue="Ward">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select area level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ward">Ward</SelectItem>
                                        <SelectItem value="Municipality">Municipality/Metro</SelectItem>
                                        <SelectItem value="District">District</SelectItem>
                                        <SelectItem value="Province">Province</SelectItem>
                                        <SelectItem value="Nation">National</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Specific Location</Label>
                            <Input id="location" placeholder="E.g., Ward 5, Lalitpur" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contact">Contact Number</Label>
                            <Input id="contact" placeholder="Your phone number" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Post Job</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}