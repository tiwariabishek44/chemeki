"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Bell,
  MessageSquare,
  Heart,
  UserPlus,
  Calendar,
  AlertTriangle,
  ShoppingBag,
  Check,
  X,
  Settings,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: "message",
    content: "Sarita Sharma sent you a message",
    time: "10 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Sarita Sharma",
  },
  {
    id: 2,
    type: "like",
    content: "Ramesh Thapa liked your post about the community garden",
    time: "1 hour ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Ramesh Thapa",
  },
  {
    id: 3,
    type: "friend",
    content: "Anita Gurung sent you a friend request",
    time: "3 hours ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Anita Gurung",
  },
  {
    id: 4,
    type: "event",
    content: "Reminder: Community Cleanup event tomorrow at 9:00 AM",
    time: "5 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Event Reminder",
  },
  {
    id: 5,
    type: "alert",
    content: "New safety alert: Water shortage expected in Lalitpur area",
    time: "Yesterday",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Safety Alert",
  },
  {
    id: 6,
    type: "marketplace",
    content: "Someone is interested in your 'Wooden Dining Table' listing",
    time: "2 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Marketplace",
  },
]

// Notification type icons
const notificationIcons: Record<string, React.ReactNode> = {
  message: <MessageSquare className="h-4 w-4" />,
  like: <Heart className="h-4 w-4" />,
  friend: <UserPlus className="h-4 w-4" />,
  event: <Calendar className="h-4 w-4" />,
  alert: <AlertTriangle className="h-4 w-4" />,
  marketplace: <ShoppingBag className="h-4 w-4" />,
}

// Notification type colors
const notificationColors: Record<string, string> = {
  message: "bg-blue-100 text-blue-500 dark:bg-blue-900",
  like: "bg-pink-100 text-pink-500 dark:bg-pink-900",
  friend: "bg-purple-100 text-purple-500 dark:bg-purple-900",
  event: "bg-green-100 text-green-500 dark:bg-green-900",
  alert: "bg-red-100 text-red-500 dark:bg-red-900",
  marketplace: "bg-amber-100 text-amber-500 dark:bg-amber-900",
}

export default function NotificationsPage() {
  const [activeNotifications, setActiveNotifications] = useState(notifications)

  const markAllAsRead = () => {
    setActiveNotifications(
      activeNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: number) => {
    setActiveNotifications(
      activeNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const deleteNotification = (id: number) => {
    setActiveNotifications(activeNotifications.filter((notification) => notification.id !== id))
  }

  return (
    <div>
      <DashboardHeader
        title="Notifications"
        description="Stay updated with activity from your community"
        actions={
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        }
      />

      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {activeNotifications.length > 0 ? (
                activeNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={notification.read ? "opacity-75" : "border-l-4 border-l-green-600"}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${notificationColors[notification.type]}`}>
                            {notificationIcons[notification.type]}
                          </div>
                          <div>
                            <p className="font-medium">{notification.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No notifications</h3>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-4">
              {activeNotifications.filter((n) => !n.read).length > 0 ? (
                activeNotifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <Card key={notification.id} className="border-l-4 border-l-green-600">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${notificationColors[notification.type]}`}>
                              {notificationIcons[notification.type]}
                            </div>
                            <div>
                              <p className="font-medium">{notification.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No unread notifications</h3>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="mentions">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No mentions</h3>
                <p className="text-sm text-muted-foreground">
                  When someone mentions you, those notifications will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-messages" className="flex-1">
                        Direct messages
                      </Label>
                      <Switch id="email-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-friend-requests" className="flex-1">
                        Friend requests
                      </Label>
                      <Switch id="email-friend-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-events" className="flex-1">
                        Event reminders
                      </Label>
                      <Switch id="email-events" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-safety" className="flex-1">
                        Safety alerts
                      </Label>
                      <Switch id="email-safety" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-marketplace" className="flex-1">
                        Marketplace activity
                      </Label>
                      <Switch id="email-marketplace" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-messages" className="flex-1">
                        Direct messages
                      </Label>
                      <Switch id="push-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-friend-requests" className="flex-1">
                        Friend requests
                      </Label>
                      <Switch id="push-friend-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-events" className="flex-1">
                        Event reminders
                      </Label>
                      <Switch id="push-events" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-safety" className="flex-1">
                        Safety alerts
                      </Label>
                      <Switch id="push-safety" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-marketplace" className="flex-1">
                        Marketplace activity
                      </Label>
                      <Switch id="push-marketplace" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Settings className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
