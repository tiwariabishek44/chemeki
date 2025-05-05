"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, Send, Phone, Video, ImageIcon, Paperclip, MoreVertical, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarita Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Do you have any recommendations for a good plumber?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Ramesh Thapa",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll bring the tools for the community garden project tomorrow.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Anita Gurung",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for helping with the children's art competition!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Bikash Shrestha",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Are you coming to the community meeting on Thursday?",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Laxmi Maharjan",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have some extra vegetables from my garden if you'd like some.",
    time: "Sunday",
    unread: 0,
    online: false,
  },
]

// Mock data for messages in a conversation
const messages = [
  {
    id: 1,
    sender: "Sarita Sharma",
    content: "Hello! I'm looking for a reliable plumber in our area. My kitchen sink is leaking.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi Sarita! I had a similar issue last month. I used Ram Plumbing Services and they did a great job.",
    time: "10:20 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Sarita Sharma",
    content: "That's great to hear! Do you have their contact information?",
    time: "10:25 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content: "Yes, their number is 9841-123456. Ask for Hari, he's very professional and charges reasonable rates.",
    time: "10:28 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Sarita Sharma",
    content: "Do you have any recommendations for a good plumber?",
    time: "10:30 AM",
    isMe: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div>
      <DashboardHeader title="Messages" description="Connect with your neighbors through private messages" />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="w-full pl-8" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="p-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors",
                    selectedConversation.id === conversation.id && "bg-muted",
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{conversation.name}</p>
                      <p className="text-xs text-muted-foreground">{conversation.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="flex-shrink-0 h-5 w-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        alt={selectedConversation.name}
                      />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedConversation.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.online ? <span className="text-green-600">Online</span> : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex", message.isMe ? "justify-end" : "justify-start")}>
                      <div className="flex items-end gap-2 max-w-[80%]">
                        {!message.isMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={selectedConversation.avatar || "/placeholder.svg"}
                              alt={selectedConversation.name}
                            />
                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={cn(
                              "rounded-lg p-3",
                              message.isMe ? "bg-green-600 text-white rounded-br-none" : "bg-muted rounded-bl-none",
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <span>{message.time}</span>
                            {message.isMe && <Check className="h-3 w-3 ml-1 text-green-600" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-3 border-t">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Type a message..."
                    className="min-h-10 resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="text-sm text-muted-foreground">Select a conversation to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
