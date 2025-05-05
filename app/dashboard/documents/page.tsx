import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  FileText,
  Plus,
  Search,
  Download,
  Share2,
  Trash2,
  FileIcon,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  Clock,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for documents
const documents = [
  {
    id: 1,
    name: "Community Meeting Minutes - April 2025.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedBy: "Ramesh Thapa",
    uploadedDate: "May 1, 2025",
    category: "Meeting Minutes",
  },
  {
    id: 2,
    name: "Ward 10 Budget Proposal.xlsx",
    type: "spreadsheet",
    size: "845 KB",
    uploadedBy: "Sarita Sharma",
    uploadedDate: "April 28, 2025",
    category: "Financial",
  },
  {
    id: 3,
    name: "Community Garden Layout.jpg",
    type: "image",
    size: "3.5 MB",
    uploadedBy: "Anita Gurung",
    uploadedDate: "April 25, 2025",
    category: "Projects",
  },
  {
    id: 4,
    name: "Waste Management Guidelines.pdf",
    type: "pdf",
    size: "2.1 MB",
    uploadedBy: "Bikash Shrestha",
    uploadedDate: "April 20, 2025",
    category: "Guidelines",
  },
  {
    id: 5,
    name: "Local Business Directory.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    uploadedBy: "Mohan Karki",
    uploadedDate: "April 15, 2025",
    category: "Directory",
  },
  {
    id: 6,
    name: "Community Event Calendar.pdf",
    type: "pdf",
    size: "980 KB",
    uploadedBy: "Laxmi Maharjan",
    uploadedDate: "April 10, 2025",
    category: "Events",
  },
]

// File type icons
const fileIcons: Record<string, React.ReactNode> = {
  pdf: <FilePdf className="h-8 w-8 text-red-500" />,
  spreadsheet: <FileSpreadsheet className="h-8 w-8 text-green-500" />,
  image: <FileImage className="h-8 w-8 text-blue-500" />,
  document: <FileText className="h-8 w-8 text-amber-500" />,
  default: <FileIcon className="h-8 w-8 text-gray-500" />,
}

export default function DocumentsPage() {
  return (
    <div>
      <DashboardHeader
        title="Community Documents"
        description="Access and share important community documents"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search documents..." className="w-full pl-8" />
              </div>

              <div className="flex gap-2">
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                  <option value="">All Categories</option>
                  <option value="meeting-minutes">Meeting Minutes</option>
                  <option value="financial">Financial</option>
                  <option value="projects">Projects</option>
                  <option value="guidelines">Guidelines</option>
                  <option value="directory">Directory</option>
                  <option value="events">Events</option>
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
                    <DropdownMenuItem>Date: Newest First</DropdownMenuItem>
                    <DropdownMenuItem>Date: Oldest First</DropdownMenuItem>
                    <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
                    <DropdownMenuItem>Size: Largest First</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{fileIcons[document.type] || fileIcons.default}</div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{document.name}</h3>
                          <Badge variant="outline">{document.category}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{document.size}</span>
                          <span className="mx-2">•</span>
                          <span>Uploaded by {document.uploadedBy}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{document.uploadedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No shared documents</h3>
                <p className="text-sm text-muted-foreground mb-4">Documents shared with you will appear here</p>
                <Button>Browse All Documents</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-uploads">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No uploaded documents</h3>
                <p className="text-sm text-muted-foreground mb-4">Documents you upload will appear here</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-4">
              {documents.slice(0, 3).map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{fileIcons[document.type] || fileIcons.default}</div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{document.name}</h3>
                          <Badge variant="outline">{document.category}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{document.size}</span>
                          <span className="mx-2">•</span>
                          <span>Uploaded by {document.uploadedBy}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{document.uploadedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
