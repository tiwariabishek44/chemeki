"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Share2,
    Bookmark,
    Flag,
    MessageSquare,
    Phone,
    Building2,
    Briefcase,
    Users,
    Calendar,
    GraduationCap,
    Globe,
    ChevronRight,
    Heart,
    Mail,
    ShieldCheck,
} from "lucide-react";

// Extended job data interface
interface JobDetail {
    id: number;
    title: string;
    company: string;
    companyDescription: string;
    location: string;
    salary: string;
    type: string;
    workType: string; // Remote, Hybrid, On-site
    postedTime: string;
    deadline: string;
    logo: string;
    featured: boolean;
    verified: boolean;
    skills: string[];
    description: string;
    responsibilities: string[];
    requirements: {
        education: string;
        experience: string;
        skills: string[];
        other?: string[];
    };
    benefits: string[];
    companyInfo: {
        size: string;
        industry: string;
        website: string;
        founded: string;
        location: string;
        employees: string;
    };
    contactPerson?: {
        name: string;
        position: string;
        email: string;
        phone?: string;
    };
    similarJobs: Array<{
        id: number;
        title: string;
        company: string;
        location: string;
        salary: string;
        type: string;
        postedTime: string;
        logo: string;
    }>;
}

// Mock function to get job details
const getJobById = (id: string): JobDetail => {
    return {
        id: parseInt(id),
        title: id === "1" ? "Full Stack Developer" : "Marketing Manager",
        company: id === "1" ? "TechNepal Solutions" : "Himalayan Organic Foods",
        companyDescription: id === "1"
            ? "TechNepal Solutions is a leading tech company in Nepal focused on building innovative web and mobile applications for clients worldwide. We have a team of experienced developers working on cutting-edge technologies."
            : "Himalayan Organic Foods is Nepal's premier organic food company, providing high-quality organic produce from the Himalayan region to customers nationwide and abroad.",
        location: id === "1" ? "Kathmandu, Nepal" : "Lalitpur, Nepal",
        salary: id === "1" ? "Rs. 80,000 - 120,000" : "Rs. 75,000 - 95,000",
        type: id === "1" ? "Full-time" : "Full-time",
        workType: id === "1" ? "Hybrid" : "On-site",
        postedTime: id === "1" ? "2 days ago" : "5 days ago",
        deadline: id === "1" ? "May 30, 2025" : "June 5, 2025",
        logo: "/placeholder.svg?height=80&width=80",
        featured: id === "1" ? true : false,
        verified: true,
        skills: id === "1"
            ? ["React", "Node.js", "MongoDB", "TypeScript", "Git"]
            : ["Digital Marketing", "SEO", "Social Media", "Content Strategy", "Google Analytics"],
        description: id === "1"
            ? "We are looking for a Full Stack Developer to join our dynamic team. The ideal candidate will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack. You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase."
            : "We are seeking a skilled Marketing Manager to develop and implement marketing strategies for our organic food products. The successful candidate will manage all marketing activities from conception to execution, work closely with the sales team, and analyze market trends to identify new opportunities.",
        responsibilities: id === "1"
            ? [
                "Design and implement user interface components for JavaScript-based web and mobile applications",
                "Build reusable code and libraries for future use",
                "Optimize applications for maximum speed and scalability",
                "Collaborate with the back-end development team to integrate user-facing elements with server-side logic",
                "Maintain and improve website functionality",
                "Design and develop APIs"
            ]
            : [
                "Develop and implement marketing strategies to reach target audience",
                "Create and manage marketing campaigns across various channels",
                "Analyze market trends and identify new business opportunities",
                "Manage and coordinate marketing activities and ensure brand consistency",
                "Prepare marketing reports by collecting and analyzing data",
                "Manage social media platforms and develop engaging content"
            ],
        requirements: {
            education: id === "1"
                ? "Bachelor's degree in Computer Science or related field"
                : "Bachelor's degree in Marketing, Business Administration, or related field",
            experience: id === "1"
                ? "Minimum 2 years of experience as a Full Stack Developer"
                : "Minimum 3 years of experience in marketing with proven success",
            skills: id === "1"
                ? [
                    "Strong proficiency in JavaScript, HTML, CSS",
                    "Knowledge of React.js and its core principles",
                    "Experience with MongoDB and Node.js",
                    "Familiarity with RESTful APIs",
                    "Knowledge of modern authorization mechanisms"
                ]
                : [
                    "Proven experience in developing marketing strategies",
                    "Experience in creating and optimizing campaigns on various marketing channels",
                    "Strong analytical skills to evaluate marketing performance",
                    "Excellent communication and presentation skills",
                    "Proficiency in marketing software and tools"
                ],
            other: id === "1"
                ? [
                    "Good problem-solving skills",
                    "Excellent verbal and written communication",
                    "Team player with good interpersonal skills"
                ]
                : [
                    "Self-motivated with strong organizational skills",
                    "Ability to work in a fast-paced environment",
                    "Creativity and innovation"
                ]
        },
        benefits: id === "1"
            ? [
                "Competitive salary",
                "Health insurance",
                "Flexible working hours",
                "Work from home option 2 days a week",
                "Annual performance bonus",
                "Professional development opportunities"
            ]
            : [
                "Competitive salary with performance bonuses",
                "Health and dental insurance",
                "Employee discount on our products",
                "Regular team outings",
                "Career growth opportunities",
                "Annual paid leave"
            ],
        companyInfo: {
            size: id === "1" ? "50-100 employees" : "20-50 employees",
            industry: id === "1" ? "Information Technology" : "Food & Beverages",
            website: id === "1" ? "www.technepal.com" : "www.himalayanorganicfoods.com",
            founded: id === "1" ? "2015" : "2012",
            location: id === "1" ? "Kathmandu, Nepal" : "Lalitpur, Nepal",
            employees: id === "1" ? "75" : "35"
        },
        contactPerson: id === "1"
            ? {
                name: "Bikash Shrestha",
                position: "HR Manager",
                email: "careers@technepal.com",
                phone: "+977-01-1234567"
            }
            : {
                name: "Sarita Sharma",
                position: "HR Director",
                email: "hr@himalayanorganicfoods.com",
                phone: "+977-01-9876543"
            },
        similarJobs: id === "1"
            ? [
                {
                    id: 3,
                    title: "Backend Developer",
                    company: "Digital Nepal",
                    location: "Kathmandu",
                    salary: "Rs. 70,000 - 90,000",
                    type: "Full-time",
                    postedTime: "1 week ago",
                    logo: "/placeholder.svg?height=40&width=40"
                },
                {
                    id: 4,
                    title: "React Developer",
                    company: "Everest Tech",
                    location: "Remote",
                    salary: "Rs. 60,000 - 80,000",
                    type: "Contract",
                    postedTime: "3 days ago",
                    logo: "/placeholder.svg?height=40&width=40"
                }
            ]
            : [
                {
                    id: 5,
                    title: "Brand Manager",
                    company: "Nepal Foods Ltd",
                    location: "Kathmandu",
                    salary: "Rs. 65,000 - 85,000",
                    type: "Full-time",
                    postedTime: "1 week ago",
                    logo: "/placeholder.svg?height=40&width=40"
                },
                {
                    id: 6,
                    title: "Digital Marketing Specialist",
                    company: "Mountain Media",
                    location: "Lalitpur",
                    salary: "Rs. 50,000 - 70,000",
                    type: "Full-time",
                    postedTime: "2 days ago",
                    logo: "/placeholder.svg?height=40&width=40"
                }
            ]
    };
};

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState<JobDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (params.id) {
            // In a real app, this would be an API call
            const jobData = getJobById(params.id as string);
            setJob(jobData);
            setLoading(false);
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-green-500"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <h1 className="text-xl font-medium mb-2">Job not found</h1>
                <p className="text-gray-500 mb-4 text-center">
                    The job you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/dashboard/jobs" className="text-green-500 hover:underline">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="pb-10">
            {/* Back button */}
            <div className="mb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="flex items-center px-0 hover:bg-transparent hover:text-green-600"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Back to Jobs</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Job details */}
                <div className="col-span-2 space-y-6">
                    {/* Job header */}
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white border flex-shrink-0">
                                    <Image
                                        src={job.logo}
                                        alt={job.company}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold">{job.title}</h1>
                                                {job.featured && (
                                                    <Badge variant="secondary" className="bg-green-100 text-green-800">Featured</Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="font-medium">{job.company}</span>
                                                {job.verified && (
                                                    <ShieldCheck className="h-4 w-4 text-green-500" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className={`rounded-full ${isBookmarked ? 'text-green-500 border-green-500' : ''}`}
                                                onClick={() => setIsBookmarked(!isBookmarked)}
                                            >
                                                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-green-500' : ''}`} />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full">
                                                <Share2 className="h-5 w-5" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full">
                                                <Flag className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                                            {job.type}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Building2 className="h-4 w-4 mr-1 text-gray-500" />
                                            {job.workType}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                            Posted {job.postedTime}
                                        </div>
                                    </div>

                                    <p className="font-semibold text-green-600 mt-3 text-lg">{job.salary}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button className="bg-green-500 hover:bg-green-600 text-white mr-3">
                                    Apply Now
                                </Button>
                                <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Contact Recruiter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job tabs */}
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="company">Company</TabsTrigger>
                            <TabsTrigger value="similar">Similar Jobs</TabsTrigger>
                        </TabsList>

                        {/* Description tab */}
                        <TabsContent value="description" className="space-y-6 mt-4">
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                                <p className="text-gray-700">{job.description}</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.responsibilities.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <GraduationCap className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Education</p>
                                            <p className="text-gray-700">{job.requirements.education}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Experience</p>
                                            <p className="text-gray-700">{job.requirements.experience}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium mb-2">Skills</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {job.requirements.skills.map((skill, index) => (
                                                <li key={index} className="text-gray-700">{skill}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {job.requirements.other && (
                                        <div>
                                            <p className="font-medium mb-2">Other Requirements</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {job.requirements.other.map((item, index) => (
                                                    <li key={index} className="text-gray-700">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-3">Benefits</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="text-gray-700">{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            <div>
                                <h2 className="text-lg font-semibold mb-3">Application Information</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">Deadline: {job.deadline}</span>
                                    </div>
                                    {job.contactPerson && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-500" />
                                                <span className="text-gray-700">Contact: {job.contactPerson.name}, {job.contactPerson.position}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span className="text-gray-700">{job.contactPerson.email}</span>
                                            </div>
                                            {job.contactPerson.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-gray-500" />
                                                    <span className="text-gray-700">{job.contactPerson.phone}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Company tab */}
                        <TabsContent value="company" className="space-y-6 mt-4">
                            <div className="flex items-start gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white border flex-shrink-0">
                                    <Image
                                        src={job.logo}
                                        alt={job.company}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{job.company}</h2>
                                    <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.companyInfo.location}</span>
                                        <span>•</span>
                                        <Globe className="h-4 w-4" />
                                        <a href={`https://${job.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                            {job.companyInfo.website}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">About Company</h3>
                                <p className="text-gray-700">{job.companyDescription}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border rounded-md p-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Industry</p>
                                            <p className="font-medium">{job.companyInfo.industry}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Company Size</p>
                                            <p className="font-medium">{job.companyInfo.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Founded</p>
                                            <p className="font-medium">{job.companyInfo.founded}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border rounded-md p-4">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Other Jobs</p>
                                            <Link href={`/dashboard/jobs?company=${encodeURIComponent(job.company)}`} className="font-medium text-green-600 hover:underline">
                                                View all jobs
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Similar Jobs tab */}
                        <TabsContent value="similar" className="space-y-4 mt-4">
                            <h2 className="text-lg font-semibold mb-3">Similar Jobs</h2>
                            <div className="space-y-3">
                                {job.similarJobs.map((similarJob) => (
                                    <Link href={`/dashboard/jobs/${similarJob.id}`} key={similarJob.id}>
                                        <Card className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between">
                                                    <div className="flex gap-3">
                                                        <Avatar className="h-10 w-10 rounded-md">
                                                            <AvatarImage src={similarJob.logo} alt={similarJob.company} />
                                                            <AvatarFallback>{similarJob.company.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h3 className="font-medium text-base">{similarJob.title}</h3>
                                                            <p className="text-muted-foreground text-sm">{similarJob.company}</p>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                <div className="flex items-center text-xs text-muted-foreground">
                                                                    <MapPin className="h-3 w-3 mr-1" />
                                                                    {similarJob.location}
                                                                </div>
                                                                <div className="flex items-center text-xs text-muted-foreground">
                                                                    <Clock className="h-3 w-3 mr-1" />
                                                                    {similarJob.postedTime}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-green-600">{similarJob.salary}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{similarJob.type}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                                <div className="text-center">
                                    <Link href="/dashboard/jobs" className="text-green-600 hover:underline flex items-center justify-center">
                                        View more jobs <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right column - Apply now card and related info */}
                <div className="space-y-4">
                    {/* Apply now card */}
                    <Card className="overflow-hidden border-gray-200">
                        <CardHeader className="bg-green-50 border-b border-gray-200 p-4">
                            <CardTitle className="text-lg">Job Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Job Type:</span>
                                    <span className="font-medium">{job.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Work Model:</span>
                                    <span className="font-medium">{job.workType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Salary:</span>
                                    <span className="font-medium">{job.salary}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Posted:</span>
                                    <span className="font-medium">{job.postedTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Deadline:</span>
                                    <span className="font-medium">{job.deadline}</span>
                                </div>
                            </div>

                            <Separator />

                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                Apply Now
                            </Button>
                            <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save Job
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Company quick info */}
                    <Card className="overflow-hidden border-gray-200">
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Company Info</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-white border">
                                    <Image
                                        src={job.logo}
                                        alt={job.company}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">{job.company}</h3>
                                    <a
                                        href={`https://${job.companyInfo.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-green-600 hover:underline"
                                    >
                                        {job.companyInfo.website}
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{job.companyInfo.industry}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{job.companyInfo.employees} employees</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{job.companyInfo.location}</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between text-green-600 hover:text-green-700 hover:bg-green-50 pl-0 pr-0"
                                >
                                    <span>View company profile</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Report card */}
                    <Card className="overflow-hidden border-gray-200 bg-gray-50">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <Flag className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-600">
                                    <p>See something wrong with this job? Report this job listing.</p>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-xs text-green-600 hover:text-green-700"
                                    >
                                        Report Job
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}