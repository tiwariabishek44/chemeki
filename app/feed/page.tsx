"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Heart,
  Share2,
  AlertTriangle,
  Calendar,
  ImageIcon,
  ShoppingBag,
  Users,
  Bell,
  FileText,
  Building,
  Hospital,
  MapPin,
  MoreHorizontal,
  Bookmark,
  CheckCircle2,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for posts with different sources and types
const posts = [
  {
    id: 1,
    author: "Rathanagar Nagarpalika",
    avatar: "/placeholder.svg?height=40&width=40",
    neighborhood: "Rathanagar",
    time: "2 hours ago",
    content:
      "NOTICE: Road maintenance work will be carried out on the main road from Central Market to Bus Park starting tomorrow. Please use alternative routes from 10 AM to 4 PM for the next three days.",
    category: "Notice",
    source: "Municipality",
    verified: true,
    comments: 15,
    likes: 42,
    hasImage: false,
  },
  {
    id: 2,
    author: "Rathanagar Bakular Hospital",
    avatar: "/placeholder.svg?height=40&width=40",
    neighborhood: "Rathanagar",
    time: "Yesterday",
    content:
      "ALERT: Due to rising dengue cases in our area, we advise all residents to eliminate standing water sources around homes and use mosquito repellents. Free dengue testing is available at our hospital from 9 AM to 5 PM daily.",
    category: "Alert",
    source: "Government Hospital",
    verified: true,
    comments: 28,
    likes: 76,
    hasImage: false,
  },
  {
    id: 3,
    author: "Ramesh Thapa",
    avatar: "/placeholder.svg?height=40&width=40",
    neighborhood: "Rathanagar, Ward 5",
    time: "4 hours ago",
    content:
      "Has anyone seen a brown labrador running around Central Park? He got off his leash and ran away. He's wearing a red collar with the name 'Rocky'. Please contact me if you find him!",
    category: "Lost & Found",
    source: "Community Member",
    verified: false,
    comments: 5,
    likes: 3,
    hasImage: true,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    author: "Sarita Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    neighborhood: "Rathanagar, Ward 3",
    time: "6 hours ago",
    content:
      "The farmer's market this weekend was amazing! So many fresh vegetables and local crafts. I highly recommend everyone to visit next Saturday.",
    category: "Community",
    source: "Community Member",
    verified: false,
    comments: 8,
    likes: 12,
    hasImage: false,
  },
  {
    id: 5,
    author: "Anita Gurung",
    avatar: "/placeholder.svg?height=40&width=40",
    neighborhood: "Rathanagar, Ward 7",
    time: "2 days ago",
    content:
      "Our monthly meeting will be held this Sunday at the community hall. We'll be discussing the upcoming skill development program for women entrepreneurs. All members are requested to attend.",
    category: "Group",
    source: "Community Group",
    verified: true,
    comments: 8,
    likes: 24,
    hasImage: false,
    groupName: "Agrami Aama Samuha (Mother's Group)",
  },
]

// Category icons mapping
const categoryIcons = {
  "Lost & Found": <AlertTriangle className="h-4 w-4" />,
  Events: <Calendar className="h-4 w-4" />,
  Alert: <Bell className="h-4 w-4 text-red-500" />,
  Notice: <FileText className="h-4 w-4 text-blue-500" />,
  Health: <Hospital className="h-4 w-4 text-green-500" />,
  Group: <Users className="h-4 w-4 text-purple-500" />,
  "For Sale": <ShoppingBag className="h-4 w-4" />,
  Community: <Users className="h-4 w-4" />,
}

// Source icons mapping
const sourceIcons = {
  Municipality: <Building className="h-4 w-4 text-blue-500" />,
  "Ward Office": <Building className="h-4 w-4 text-green-500" />,
  "Government Hospital": <Hospital className="h-4 w-4 text-red-500" />,
  "Government Office": <FileText className="h-4 w-4 text-blue-500" />,
  "Community Member": <Users className="h-4 w-4 text-gray-500" />,
  "Community Group": <Users className="h-4 w-4 text-purple-500" />,
}

export default function Feed() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const isMobile = useMobile()
  const router = useRouter()

  const handleCreatePost = () => {
    if (isMobile) {
      router.push("/feed/create")
    } else {
      setIsPostModalOpen(true)
    }
  }

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all") return true
    if (activeTab === "official")
      return ["Municipality", "Ward Office", "Government Hospital", "Government Office"].includes(post.source)
    if (activeTab === "alerts") return post.category === "Alert"
    if (activeTab === "groups") return post.source === "Community Group"
    if (activeTab === "community") return post.source === "Community Member"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-6">
        {/* Create Post Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4 p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div
              onClick={handleCreatePost}
              className="bg-gray-100 dark:bg-gray-700 rounded-full py-2.5 px-4 flex-grow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray-500 dark:text-gray-400">Share something with your neighbors...</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 overflow-x-auto">
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400" onClick={handleCreatePost}>
              <ImageIcon className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Photo</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400" onClick={handleCreatePost}>
              <Calendar className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Event</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400" onClick={handleCreatePost}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Alert</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400" onClick={handleCreatePost}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">Sell</span>
            </Button>
          </div>
        </div>

        {/* Feed Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4 overflow-x-auto">
          <div className="flex p-1">
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
                activeTab === "all"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
              )}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
                activeTab === "official"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
              )}
              onClick={() => setActiveTab("official")}
            >
              Official
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
                activeTab === "alerts"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
              )}
              onClick={() => setActiveTab("alerts")}
            >
              Alerts
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
                activeTab === "groups"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
              )}
              onClick={() => setActiveTab("groups")}
            >
              Groups
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden",
                post.category === "Alert" && "border-l-4 border-red-500",
                post.category === "Notice" && "border-l-4 border-blue-500",
                post.source === "Community Group" && "border-l-4 border-purple-500",
              )}
            >
              {/* Post Header */}
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                        {post.verified && <CheckCircle2 className="h-4 w-4 ml-1 text-blue-500 fill-blue-500" />}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>
                          {post.neighborhood} • {post.time}
                        </span>
                      </div>
                      {post.groupName && (
                        <div className="text-xs text-purple-500 mt-1">
                          <Users className="h-3 w-3 inline mr-1" />
                          Posted in {post.groupName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                      {categoryIcons[post.category as keyof typeof categoryIcons]}
                      <span className="ml-1 text-gray-700 dark:text-gray-300">{post.category}</span>
                    </div>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-3">
                  <p
                    className={cn(
                      "text-gray-900 dark:text-white",
                      post.category === "Alert" && "font-medium text-red-600 dark:text-red-400",
                      post.category === "Notice" && "font-medium text-blue-600 dark:text-blue-400",
                    )}
                  >
                    {post.content}
                  </p>
                  {post.hasImage && post.image && (
                    <div className="mt-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="rounded-md w-full object-cover max-h-96"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="mt-4 flex justify-between border-t pt-3 text-gray-500 dark:text-gray-400">
                  <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-200">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center hover:text-red-500">
                    <Heart className="h-5 w-5 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-200">
                    <Bookmark className="h-5 w-5 mr-1" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-200">
                    <Share2 className="h-5 w-5 mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal (for desktop) */}
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">Create Post</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>Rathanagar, Ward 10</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="post">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="post">Post</TabsTrigger>
              <TabsTrigger value="event">Event</TabsTrigger>
              <TabsTrigger value="alert">Alert</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              <Textarea placeholder="What's on your mind?" className="min-h-[150px] mb-4" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Add to your post</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-green-600">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Users className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-amber-600">
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">Post</Button>
            </TabsContent>
            <TabsContent value="event">
              <div className="space-y-4">
                <Input placeholder="Event Title" />
                <Textarea placeholder="Event Description" className="min-h-[100px]" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Time</label>
                    <Input type="time" />
                  </div>
                </div>
                <Input placeholder="Location" />
                <Button className="w-full bg-green-600 hover:bg-green-700">Create Event</Button>
              </div>
            </TabsContent>
            <TabsContent value="alert">
              <div className="space-y-4">
                <Input placeholder="Alert Title" />
                <Textarea placeholder="Alert Details" className="min-h-[100px]" />
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-500">Severity:</label>
                  <select className="border rounded p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Post Alert</Button>
              </div>
            </TabsContent>
            <TabsContent value="sell">
              <div className="space-y-4">
                <Input placeholder="Item Title" />
                <Input placeholder="Price" type="number" />
                <Textarea placeholder="Item Description" className="min-h-[100px]" />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Add Photos</p>
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">List Item</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
