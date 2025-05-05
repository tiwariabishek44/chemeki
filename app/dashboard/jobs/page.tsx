"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, MapPin, Clock, Building2, Plus, Calendar, GraduationCap, Search, BookmarkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for job listings
const jobs = [
    {
        id: 1,
        title: "Software Developer",
        company: "Techstars Nepal",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Kathmandu, Ward 10",
        salary: "Rs. 60,000 - 80,000",
        jobType: "Full-time",
        postedTime: "2 days ago",
        description: "We are looking for a skilled software developer with experience in React and Node.js to join our team.",
        requirements: ["3+ years experience in web development", "Strong knowledge of JavaScript", "Experience with React"],
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "Digital Horizons",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Lalitpur, Ward 3",
        salary: "Rs. 65,000 - 85,000",
        jobType: "Full-time",
        postedTime: "1 week ago",
        description: "Join our marketing team to develop and implement effective marketing strategies for various clients.",
        requirements: ["5+ years in marketing", "Experience with digital campaigns", "Strong analytical skills"],
    },
    {
        id: 3,
        title: "Civil Engineer",
        company: "Nepal Constructions Ltd",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Bhaktapur, Ward 5",
        salary: "Rs. 50,000 - 70,000",
        jobType: "Full-time",
        postedTime: "3 days ago",
        description: "Civil engineer needed for ongoing infrastructure projects around Bhaktapur area.",
        requirements: ["Bachelor's degree in Civil Engineering", "2+ years field experience", "Knowledge of local building codes"],
    },
    {
        id: 4,
        title: "Administrative Assistant",
        company: "Global Services",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Kathmandu, Ward 7",
        salary: "Rs. 30,000 - 40,000",
        jobType: "Part-time",
        postedTime: "Just now",
        description: "Looking for a detail-oriented assistant to help with office administration and client coordination.",
        requirements: ["Strong organizational skills", "Proficient in MS Office", "Good communication skills"],
    },
    {
        id: 5,
        title: "Restaurant Manager",
        company: "Himalayan Bistro",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Thamel, Kathmandu",
        salary: "Rs. 45,000 - 55,000",
        jobType: "Full-time",
        postedTime: "5 days ago",
        description: "Experienced restaurant manager needed to oversee daily operations and staff management.",
        requirements: ["3+ years in restaurant management", "Customer service orientation", "Staff management experience"],
    },
    {
        id: 6,
        title: "Graphic Designer",
        company: "Creative Solutions",
        logo: "/placeholder.svg?height=40&width=40",
        location: "Patan, Lalitpur",
        salary: "Rs. 35,000 - 50,000",
        jobType: "Remote",
        postedTime: "1 day ago",
        description: "Creative graphic designer needed for branding and marketing materials for various clients.",
        requirements: ["Proficient in Adobe Creative Suite", "Strong portfolio", "At least 2 years experience"],
    },
]

// Mock data for user's job applications
const userApplications = [
    {
        id: 101,
        jobId: 1,
        company: "Techstars Nepal",
        jobTitle: "Software Developer",
        logo: "/placeholder.svg?height=40&width=40",
        appliedDate: "May 2, 2025",
        status: "Under Review",
    },
    {
        id: 102,
        jobId: 6,
        company: "Creative Solutions",
        jobTitle: "Graphic Designer",
        logo: "/placeholder.svg?height=40&width=40",
        appliedDate: "May 3, 2025",
        status: "Application Received",
    },
]

export default function JobsPage() {
    const [activeTab, setActiveTab] = useState("all")

    return (
        <div>
            {/* Jobs header with green theme */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Jobs</h1>
                    <p className="text-sm text-gray-500">Find and apply for jobs in your community</p>
                </div>
            </div>

            {/* Jobs navigation tabs */}
            <div className="border-b border-gray-200 mb-5">
                <nav className="-mb-px flex space-x-8" aria-label="Jobs Navigation">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "all" ? "border-green-500 text-green-600" : ""
                            }`}
                    >
                        All Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "applications" ? "border-green-500 text-green-600" : ""
                            }`}
                    >
                        My Applications
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "saved" ? "border-green-500 text-green-600" : ""
                            }`}
                    >
                        Saved Jobs
                    </button>
                </nav>
            </div>

            {/* Main content area */}
            <div className="mb-6">
                {/* All Jobs tab content */}
                {activeTab === "all" && (
                    <>
                        {/* Job Search Filters */}
                        <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <Search className="w-4 h-4 text-gray-500" />
                                </div>
                                <input
                                    type="search"
                                    className="block w-full p-2.5 ps-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500"
                                    placeholder="Search job titles"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full p-2.5 ps-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500"
                                    placeholder="Location"
                                />
                            </div>
                            <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                                <option value="">Job Type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="remote">Remote</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {jobs.map((job) => (
                                <Card key={job.id} className="overflow-hidden border-gray-200 hover:border-gray-300 transition-colors">
                                    <CardContent className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <Avatar className="h-16 w-16 rounded-lg border border-gray-200">
                                                    <AvatarImage src={job.logo} alt={job.company} />
                                                    <AvatarFallback className="bg-green-100 text-green-800 rounded-lg">
                                                        {job.company.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <div className="flex-grow space-y-2">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                    <h3 className="text-lg font-semibold">{job.title}</h3>
                                                    <div className="flex items-center mt-1 md:mt-0">
                                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                                            {job.jobType}
                                                        </Badge>
                                                        <Badge className="bg-gray-100 text-gray-800 border-gray-200 ml-2">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {job.postedTime}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center text-sm">
                                                        <Building2 className="h-4 w-4 mr-1 text-gray-500" />
                                                        <span className="font-medium">{job.company}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-green-600 font-medium mt-1">
                                                        <span>{job.salary}</span>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600 mt-2">
                                                    {job.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {job.requirements.slice(0, 2).map((req, i) => (
                                                        <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                                            {req}
                                                        </span>
                                                    ))}
                                                    {job.requirements.length > 2 && (
                                                        <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                                            +{job.requirements.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-gray-50 px-5 py-3 flex justify-between">
                                        <div className="text-xs text-gray-500 flex items-center">
                                            <Calendar className="h-3.5 w-3.5 mr-1" />
                                            Apply before May 15, 2025
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 text-gray-700 hover:text-gray-900 hover:bg-gray-200"
                                            >
                                                <BookmarkIcon className="h-4 w-4 mr-1" />
                                                Save
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-8 bg-green-500 hover:bg-green-600 text-white"
                                            >
                                                Apply Now
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                )}

                {/* My Applications tab content */}
                {activeTab === "applications" && (
                    <>
                        <div className="mb-5 flex justify-end">
                            <Button className="bg-green-500 hover:bg-green-600 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Post Job
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {userApplications.length > 0 ? (
                                userApplications.map((application) => (
                                    <Card key={application.id} className="overflow-hidden border-gray-200">
                                        <CardContent className="p-5">
                                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <Avatar className="h-16 w-16 rounded-lg border border-gray-200">
                                                        <AvatarImage src={application.logo} alt={application.company} />
                                                        <AvatarFallback className="bg-green-100 text-green-800 rounded-lg">
                                                            {application.company.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>

                                                <div className="flex-grow space-y-2">
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                        <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                                                        <Badge className={`
                              ${application.status === 'Under Review' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                              ${application.status === 'Application Received' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                            `}>
                                                            {application.status}
                                                        </Badge>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center text-sm">
                                                            <Building2 className="h-4 w-4 mr-1 text-gray-500" />
                                                            <span className="font-medium">{application.company}</span>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            <span>Applied on {application.appliedDate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="bg-gray-50 px-5 py-3 flex justify-between">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                Withdraw Application
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 border-green-200 text-green-600 hover:bg-green-50"
                                            >
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                                    <Briefcase className="mx-auto h-10 w-10 text-gray-400" />
                                    <h3 className="mt-2 font-medium">No job applications yet</h3>
                                    <p className="text-sm text-gray-500 mt-1">Start applying for jobs to see your applications here</p>
                                    <Button
                                        className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                                        onClick={() => setActiveTab("all")}
                                    >
                                        Browse Jobs
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Saved jobs tab content */}
                {activeTab === "saved" && (
                    <div className="text-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <BookmarkIcon className="mx-auto h-10 w-10 text-gray-400" />
                        <h3 className="mt-2 font-medium">No saved jobs yet</h3>
                        <p className="text-sm text-gray-500 mt-1">Jobs you save will appear here</p>
                        <Button
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => setActiveTab("all")}
                        >
                            Browse Jobs
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}