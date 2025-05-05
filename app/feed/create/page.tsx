"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ImageIcon, MapPin, Users } from "lucide-react"

export default function CreatePost() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("post")

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium ml-2">Create Post</h1>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
            Post
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid grid-cols-4 mb-0">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="alert">Alert</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Kathmandu, Ward 10</span>
            </div>
          </div>
        </div>

        {activeTab === "post" && (
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[200px] border-none focus-visible:ring-0 text-lg p-0"
              autoFocus
            />
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Add to your post</p>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-green-600">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <Users className="h-5 w-5 mr-2" />
                  Tag
                </Button>
                <Button variant="ghost" size="sm" className="text-amber-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "event" && (
          <div className="space-y-4">
            <Input placeholder="Event Title" className="text-lg font-medium" autoFocus />
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
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Location</label>
              <Input placeholder="Add location" />
            </div>
            <div className="border-t pt-4">
              <Button variant="outline" className="w-full">
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Event Photo
              </Button>
            </div>
          </div>
        )}

        {activeTab === "alert" && (
          <div className="space-y-4">
            <Input placeholder="Alert Title" className="text-lg font-medium" autoFocus />
            <Textarea placeholder="Alert Details" className="min-h-[150px]" />
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Severity</label>
              <select className="w-full border rounded-md p-2">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Location</label>
              <Input placeholder="Add affected area" />
            </div>
            <div className="border-t pt-4">
              <Button variant="outline" className="w-full">
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Photo
              </Button>
            </div>
          </div>
        )}

        {activeTab === "sell" && (
          <div className="space-y-4">
            <Input placeholder="Item Title" className="text-lg font-medium" autoFocus />
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Price</label>
              <Input placeholder="Rs. 0" type="number" />
            </div>
            <Textarea placeholder="Item Description" className="min-h-[100px]" />
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Category</label>
              <select className="w-full border rounded-md p-2">
                <option>Furniture</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Other</option>
              </select>
            </div>
            <div className="border-t pt-4">
              <Button variant="outline" className="w-full">
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Photos
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
