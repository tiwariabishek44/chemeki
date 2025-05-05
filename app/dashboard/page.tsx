import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Heart,
  Share2,
  AlertTriangle,
  Calendar,
  HelpCircle,
  ShoppingBag,
  Users,
  MapPin,
  ImageIcon,
  BadgeCheck,
  Building2,
  Bell,
  ThumbsUp,
  User,
  MoreHorizontal,
  Bookmark,
  Image as ImageLucide,
  Repeat2,
  Search,
  TrendingUp,
  Settings,
  Mail,
  Flame,
  Clock,
  Hash,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Image from "next/image"

// Enum for post types
enum PostType {
  AUTHORITY = "authority",
  USER = "user",
  GROUP = "group",
}

// Enum for post content types
enum PostContentType {
  TEXT = "text",
  IMAGE = "image_text",
}

// Mock data for posts
const posts = [
  {
    id: 1,
    author: "Ratnanagar Nagarpalika",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Official Notice",
    time: "2 hours ago",
    content:
      "NOTICE: The water supply will be disrupted on Saturday (May 5) from 10 AM to 5 PM due to maintenance work. Please store enough water for your needs. We apologize for any inconvenience.",
    category: "Notice",
    comments: 15,
    likes: 32,
    shares: 56,
    type: PostType.AUTHORITY,
    contentType: PostContentType.TEXT,
    verified: true,
    authorLevel: "Municipality",
    liked: false,  // Add this
    saved: false,  // Add this
  },
  {
    id: 2,
    author: "Bakular Hospital",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Health Alert",
    time: "Yesterday",
    content:
      "HEALTH ALERT: We are conducting free dengue screening camps from May 7-10 at our premises. Please bring your ID card. Timings: 9 AM - 4 PM. Please share this information with others in your community.",
    image: "/placeholder.jpg",
    category: "Alert",
    comments: 27,
    likes: 89,
    shares: 145,
    type: PostType.AUTHORITY,
    contentType: PostContentType.IMAGE,
    verified: true,
    authorLevel: "Healthcare",
    liked: true,  // Add this
    saved: false,  // Add this
  },
  {
    id: 3,
    author: "Sarita Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Kathmandu, Ward 10",
    time: "3 hours ago",
    content:
      "Has anyone seen a brown dog running around Ratnapark? He got off his leash and ran away. He's wearing a red collar with the name 'Rocky'. Please contact me if you find him!",
    image: "/placeholder.jpg",
    category: "Lost & Found",
    comments: 5,
    likes: 3,
    shares: 12,
    type: PostType.USER,
    contentType: PostContentType.IMAGE,
    liked: false,  // Add this
    saved: false,  // Add this
  },
  {
    id: 4,
    author: "Ramesh Thapa",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Lalitpur, Ward 3",
    time: "Yesterday",
    content:
      "The farmer's market at Patan Durbar Square is amazing this weekend! Fresh vegetables and local crafts. Open until 2pm today.",
    category: "Events",
    comments: 8,
    likes: 12,
    shares: 4,
    type: PostType.USER,
    contentType: PostContentType.TEXT,
    liked: false,  // Add this
    saved: false,  // Add this
  },
  {
    id: 5,
    author: "Haka Sampang",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Revolution Nepal",
    time: "1 day ago",
    content:
      "Our group is organizing a community cleanup event this Sunday at 8 AM. We'll be focusing on the riverbank area. Please bring gloves if you have them. Refreshments will be provided!",
    image: "/placeholder.jpg",
    category: "Community",
    comments: 23,
    likes: 56,
    shares: 18,
    type: PostType.GROUP,
    contentType: PostContentType.IMAGE,
    groupName: "Revolution Nepal",
    liked: false,  // Add this
    saved: false,  // Add this
  },
  {
    id: 6,
    author: "Anita Gurung",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Bhaktapur, Ward 5",
    time: "3 days ago",
    content: "Can anyone recommend a good plumber in Bhaktapur area? I have a leaky pipe that needs fixing ASAP.",
    category: "Recommendations",
    comments: 15,
    likes: 2,
    shares: 1,
    type: PostType.USER,
    contentType: PostContentType.TEXT,
    liked: false,  // Add this
    saved: false,  // Add this
  },
  {
    id: 7,
    author: "Bikash Shrestha",
    avatar: "/placeholder-user.jpg",
    location: "Digital Nepal",
    time: "5 days ago",
    content:
      "Our group is organizing a coding workshop for beginners this Saturday. If you're interested in learning programming basics, this is your chance! Registration link in the comments.",
    category: "Event",
    comments: 17,
    likes: 34,
    shares: 9,
    type: PostType.GROUP,
    contentType: PostContentType.TEXT,
    groupName: "Digital Nepal",
    liked: false,  // Add this
    saved: false,  // Add this
  },
]

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Lost & Found": <AlertTriangle className="h-4 w-4" />,
  Events: <Calendar className="h-4 w-4" />,
  Event: <Calendar className="h-4 w-4" />,
  Recommendations: <HelpCircle className="h-4 w-4" />,
  "Safety Alert": <AlertTriangle className="h-4 w-4 text-red-500" />,
  Alert: <Bell className="h-4 w-4 text-red-500" />,
  "For Sale": <ShoppingBag className="h-4 w-4" />,
  Notice: <Building2 className="h-4 w-4 text-blue-500" />,
  Community: <Users className="h-4 w-4" />,
}

// Post type styling
const postTypeStyles: Record<PostType, { borderColor: string; bgColor: string }> = {
  [PostType.AUTHORITY]: {
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
  [PostType.USER]: {
    borderColor: "border-gray-200",
    bgColor: "bg-white",
  },
  [PostType.GROUP]: {
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
}

export default function Dashboard() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <DashboardHeader title="Community Feed" description="Connect with your local community" />

      {/* Search bar - Updated with green theme */}
      <div className="max-w-7xl mx-auto px-4 mt-2">
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Search for posts, events, and community members..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mt-2 px-4 max-w-7xl mx-auto">
        {/* Main Content - Updated with green theme */}
        <div className="md:col-span-9 lg:col-span-7 space-y-4">
          {/* Create Post - Updated with green theme */}
          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening in your community?"
                    className="mb-3 resize-none border-none bg-gray-50 focus-visible:ring-1 focus-visible:ring-green-300 focus-visible:ring-offset-0 rounded-2xl px-4 py-3 text-sm placeholder:text-gray-500"
                  />
                  <div className="flex flex-wrap items-center">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="text-gray-600 rounded-full p-2 h-9 hover:bg-green-50 hover:text-green-600">
                        <ImageLucide className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 rounded-full p-2 h-9 hover:bg-green-50 hover:text-green-600">
                        <Calendar className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 rounded-full p-2 h-9 hover:bg-amber-50 hover:text-amber-600">
                        <AlertTriangle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 rounded-full p-2 h-9 hover:bg-red-50 hover:text-red-600">
                        <MapPin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 rounded-full p-2 h-9 hover:bg-purple-50 hover:text-purple-600">
                        <Hash className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button className="ml-auto rounded-full bg-green-500 hover:bg-green-600 text-white px-5 font-medium">Post</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed Tabs - Updated with green theme */}
          <Tabs defaultValue="all">
            <div className="bg-white p-1.5 mb-4 rounded-full border border-gray-200 shadow-sm">
              <TabsList className="w-full grid grid-cols-3 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 
                  data-[state=active]:text-white rounded-full text-sm py-2.5 transition-all duration-200"
                >
                  <span className="font-medium">All Posts</span>
                </TabsTrigger>
                <TabsTrigger
                  value="authority"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 
                  data-[state=active]:text-white rounded-full text-sm py-2.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="bg-green-100 rounded-full p-0.5 flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">Official</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="local"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 
                  data-[state=active]:text-white rounded-full text-sm py-2.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="bg-green-100 rounded-full p-0.5 flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">Community</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4 mt-0">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  {/* Updated post header with redesigned verification badge */}
                  <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className={`h-10 w-10 ${post.verified ? "ring-2 ring-green-400 border-2 border-white" : ""}`}>
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>

                        {/* Redesigned verification badge with green theme */}
                        {post.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <div className="bg-green-500 rounded-full p-0.5">
                              <BadgeCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-sm">{post.author}</span>

                          {post.type === PostType.AUTHORITY && (
                            <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full ml-1 font-medium">
                              {post.authorLevel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                          <span>{post.location}</span>
                          <span className="mx-1">·</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-0.5" />
                            {post.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className={`inline-flex items-center py-0.5 px-2 mr-2 rounded-full text-xs 
                        ${post.type === PostType.AUTHORITY ? 'bg-green-50 text-green-600 border border-green-100' :
                          post.type === PostType.GROUP ? 'bg-green-50 text-green-600 border border-green-100' :
                            'bg-gray-50 text-gray-600 border border-gray-100'}`}>
                        {categoryIcons[post.category]}
                        <span className="ml-1">{post.category}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 pt-3 pb-3">
                    <p className={`text-sm ${post.type === PostType.AUTHORITY ? 'font-medium' : ''}`}>
                      {post.content}
                    </p>

                    {post.contentType === PostContentType.IMAGE && post.image && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                        <Image
                          src={post.image}
                          alt="Post image"
                          width={600}
                          height={400}
                          className="w-full object-cover hover:opacity-95 transition-opacity"
                          style={{ maxHeight: '450px' }}
                        />
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="border-t px-4 py-2 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full px-3 flex-1"
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} />
                      <span className="text-xs">{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="text-xs">{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                    >
                      <Repeat2 className="h-4 w-4 mr-2" />
                      <span className="text-xs">{post.shares}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full px-3"
                    >
                      <Bookmark className={`h-4 w-4 ${post.saved ? "fill-amber-500 text-amber-500" : ""}`} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="authority" className="space-y-4">
              {/* Similar updates to "authority" tab content with green theme */}
              {posts
                .filter(post => post.type === PostType.AUTHORITY)
                .map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className={`h-10 w-10 ${post.verified ? "ring-2 ring-green-400 border-2 border-white" : ""}`}>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>

                          {post.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                              <div className="bg-green-500 rounded-full p-0.5">
                                <BadgeCheck className="h-3.5 w-3.5 text-white" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">{post.author}</span>
                            {post.type === PostType.AUTHORITY && (
                              <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full ml-1 font-medium">
                                {post.authorLevel}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-xs text-gray-500">
                            <span>{post.location}</span>
                            <span className="mx-1">·</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-0.5" />
                              {post.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="inline-flex items-center py-0.5 px-2 mr-2 rounded-full text-xs bg-green-50 text-green-600 border border-green-100">
                          {categoryIcons[post.category]}
                          <span className="ml-1">{post.category}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 pt-3 pb-3">
                      <p className="text-sm font-medium">{post.content}</p>

                      {post.contentType === PostContentType.IMAGE && post.image && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                          <Image
                            src={post.image}
                            alt="Post image"
                            width={600}
                            height={400}
                            className="w-full object-cover hover:opacity-95 transition-opacity"
                            style={{ maxHeight: '450px' }}
                          />
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="border-t px-4 py-2 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full px-3 flex-1"
                      >
                        <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                      >
                        <Repeat2 className="h-4 w-4 mr-2" />
                        <span className="text-xs">{post.shares}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full px-3"
                      >
                        <Bookmark className={`h-4 w-4 ${post.saved ? "fill-amber-500 text-amber-500" : ""}`} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="local">
              {/* Similar updates to "local" tab content with green theme */}
              {posts
                .filter(post => post.type === PostType.USER)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
                      {/* Similar structure as above with green theme */}
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">{post.author}</span>
                          </div>

                          <div className="flex items-center text-xs text-gray-500">
                            <span>{post.location}</span>
                            <span className="mx-1">·</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-0.5" />
                              {post.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="inline-flex items-center py-0.5 px-2 mr-2 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-100">
                          {categoryIcons[post.category]}
                          <span className="ml-1">{post.category}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 pt-3 pb-3">
                      <p className="text-sm">{post.content}</p>

                      {post.contentType === PostContentType.IMAGE && post.image && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                          <Image
                            src={post.image}
                            alt="Post image"
                            width={600}
                            height={400}
                            className="w-full object-cover hover:opacity-95 transition-opacity"
                            style={{ maxHeight: '450px' }}
                          />
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="border-t px-4 py-2 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full px-3 flex-1"
                      >
                        <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full px-3 flex-1"
                      >
                        <Repeat2 className="h-4 w-4 mr-2" />
                        <span className="text-xs">{post.shares}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full px-3"
                      >
                        <Bookmark className={`h-4 w-4 ${post.saved ? "fill-amber-500 text-amber-500" : ""}`} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>

            {/* Removed groups and trending tabs to simplify the UI */}
          </Tabs>
        </div>

        {/* Right Sidebar - Updated with green theme */}
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          {/* Trending topics with green theme */}
          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            <CardHeader className="p-4 pb-2 border-b">
              <h3 className="font-semibold text-md flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                Trending In Your Area
              </h3>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {[
                { topic: "Community Cleanup", posts: 24 },
                { topic: "Local Elections", posts: 18 },
                { topic: "Water Supply Issue", posts: 12 }
              ].map((item, i) => (
                <div key={i} className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{item.topic}</p>
                      <p className="text-xs text-gray-500">{item.posts} posts</p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">#{i + 1}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            <CardHeader className="p-4 pb-2 border-b">
              <h3 className="font-semibold text-md">Your Community</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 rounded-full p-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Kathmandu, Ward 10</p>
                  <p className="text-xs text-gray-500">1,245 neighbors</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-green-500" />
                    Upcoming Events
                  </h4>
                  <Button variant="ghost" size="sm" className="text-green-500 h-auto p-0 text-xs hover:bg-green-50 hover:underline">See all</Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50/30 transition-colors">
                    <div className="bg-green-100 text-green-600 rounded-lg h-12 w-12 flex items-center justify-center text-xs font-semibold shadow-sm">
                      <div className="flex flex-col items-center">
                        <span>MAY</span>
                        <span className="text-lg">5</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Community Cleanup</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        9:00 AM • Ratnapark, Kathmandu
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <Avatar key={i} className="h-5 w-5 border border-white">
                              <AvatarImage src={`/placeholder.svg?text=${i}`} />
                              <AvatarFallback>{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+15 going</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50/30 transition-colors">
                    <div className="bg-green-100 text-green-600 rounded-lg h-12 w-12 flex items-center justify-center text-xs font-semibold shadow-sm">
                      <div className="flex flex-col items-center">
                        <span>MAY</span>
                        <span className="text-lg">11</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Local Food Festival</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        11:00 AM • Patan Durbar Square
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map(i => (
                            <Avatar key={i} className="h-5 w-5 border border-white">
                              <AvatarImage src={`/placeholder.svg?text=${i}`} />
                              <AvatarFallback>{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+28 going</span>
                      </div>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs rounded-full border-green-200 text-green-600 hover:bg-green-50">
                        RSVP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            {/* Official Notices Card Header with green theme */}
            <CardHeader className="p-4 pb-2 border-b flex flex-row items-center justify-between">
              <h3 className="font-semibold text-md flex items-center gap-1.5">
                <div className="bg-green-500 rounded-full p-1">
                  <BadgeCheck className="h-4 w-4 text-white" />
                </div>
                <span>Official Notices</span>
              </h3>
              <Button variant="ghost" size="sm" className="text-green-500 h-auto p-0 text-xs hover:bg-green-50 hover:underline">
                View all
              </Button>
            </CardHeader>

            {/* Official Notice Items with green theme */}
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 hover:bg-green-50/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8 ring-1 ring-green-400 border border-white shadow-sm">
                        <AvatarImage src="/placeholder.svg" alt="Municipality" />
                        <AvatarFallback>RM</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <div className="bg-green-500 rounded-full p-0.5">
                          <BadgeCheck className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Ratnanagar Municipality</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2 pl-11">Property tax deadline extended to May 15th</p>
                  <p className="text-[10px] text-gray-400 mt-1 pl-11">2 days ago</p>
                </div>

                <div className="p-4 hover:bg-green-50/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8 ring-1 ring-green-400 border border-white shadow-sm">
                        <AvatarImage src="/placeholder.svg" alt="Electricity" />
                        <AvatarFallback>EA</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <div className="bg-green-500 rounded-full p-0.5">
                          <BadgeCheck className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Electricity Authority</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2 pl-11">Scheduled power maintenance on May 8th</p>
                  <p className="text-[10px] text-gray-400 mt-1 pl-11">1 day ago</p>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-3">
              <Button className="w-full rounded-full bg-white border border-green-200 text-green-600 hover:bg-green-50 text-sm h-9">
                Follow more official accounts
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden border-gray-200 shadow-sm bg-white">
            <CardHeader className="p-4 pb-2 border-b flex flex-row items-center justify-between">
              <h3 className="font-semibold text-md flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Safety Alerts
              </h3>
              <Button variant="ghost" size="sm" className="text-amber-600 h-auto p-0 text-xs hover:bg-amber-50 hover:underline">Manage alerts</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 bg-red-50/30 hover:bg-red-50/60 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-sm text-red-700">Motorcycle Thefts</p>
                        <span className="ml-2 text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">HIGH</span>
                      </div>
                      <p className="text-xs text-red-600 mt-1">Multiple reports near Thamel area</p>
                      <p className="text-[10px] text-red-400 mt-1">Updated 3 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/30 hover:bg-amber-50/60 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-sm text-amber-700">Water Shortage</p>
                        <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">MEDIUM</span>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">Expected in Lalitpur area this weekend</p>
                      <p className="text-[10px] text-amber-400 mt-1">Updated 12 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation - Updated with green theme */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-1 flex justify-around md:hidden z-50">
        <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 rounded-none w-full">
          <Users className="h-5 w-5" />
          <span className="text-[10px] mt-1">Community</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 rounded-none w-full">
          <Calendar className="h-5 w-5" />
          <span className="text-[10px] mt-1">Events</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 rounded-none w-full text-green-600">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center -mt-5 border-4 border-white shadow-sm">
            <MessageSquare className="h-6 w-6" />
          </div>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 rounded-none w-full">
          <Bell className="h-5 w-5" />
          <span className="text-[10px] mt-1">Alerts</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 rounded-none w-full">
          <User className="h-5 w-5" />
          <span className="text-[10px] mt-1">Profile</span>
        </Button>
      </div>
    </div>
  )
}
