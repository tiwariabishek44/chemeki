"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Users,
    MapPin,
    CalendarClock,
    Calendar,
    MessageSquare,
    Heart,
    Share2,
    Bookmark,
    Repeat2,
    CheckCircle2,
    Bell,
    ImageIcon,
    MoreHorizontal
} from "lucide-react";
import { cn } from '@/lib/utils';

interface Group {
    id: string;
    name: string;
    description: string;
    headerImage: string;
    profileImage: string;
    members: number;
    location: string;
    category: string;
    createdAt: string;
    posts: Post[];
    events: Event[];
    isOfficial: boolean;
    admins: GroupMember[];
    aboutHtml: string;
}

interface Post {
    id: string;
    content: string;
    author: GroupMember;
    createdAt: string;
    likes: number;
    comments: number;
    image?: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
}

interface GroupMember {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'member';
}

// Mock data function to get group details by ID
const getGroupById = (id: string): Group => {
    // This would be replaced by actual API call in a real app
    return {
        id,
        name: id === '1' ? 'Veterans and Military Families of the DC Area' :
            id === '2' ? 'Centreville Cats' : 'Centreville friends',
        description: "A community for connecting, sharing resources, and supporting one another.",
        headerImage: id === '1' ? '/images/groups/veterans-header.png' :
            id === '2' ? '/images/groups/cats-header.png' : '/images/groups/friends-header.png',
        profileImage: id === '1' ? '/images/groups/veterans.png' :
            id === '2' ? '/images/groups/cats.png' : '/images/groups/friends.png',
        members: id === '1' ? 8887 : id === '2' ? 799 : 36,
        location: id === '1' ? 'Washington DC Area' : 'Centreville',
        category: id === '1' ? 'Community' : id === '2' ? 'Pets' : 'Social',
        createdAt: 'January 2020',
        isOfficial: id === '1',
        admins: [
            {
                id: 'admin1',
                name: 'John Miller',
                avatar: '/placeholder-user.jpg',
                role: 'admin'
            },
            {
                id: 'admin2',
                name: 'Sarah Wilson',
                avatar: '/placeholder-user.jpg',
                role: 'admin'
            }
        ],
        aboutHtml: `
      <p>Welcome to our community group! We are dedicated to bringing people together and creating a supportive environment.</p>
      <p>Our mission is to foster connections, share resources, and support one another through various activities and events.</p>
      <h4>Community Guidelines:</h4>
      <ul>
        <li>Be respectful and kind to all members</li>
        <li>Share relevant content and resources</li>
        <li>Participate actively in discussions</li>
        <li>Help others whenever possible</li>
      </ul>
    `,
        posts: [
            {
                id: 'post1',
                content: "Happy to announce our community meetup this weekend at Central Park! Everyone is welcome to join us for food, games, and great conversation.",
                author: {
                    id: 'user1',
                    name: 'John Miller',
                    avatar: '/placeholder-user.jpg',
                    role: 'admin'
                },
                createdAt: '2 hours ago',
                likes: 24,
                comments: 5,
                image: '/placeholder.jpg'
            },
            {
                id: 'post2',
                content: "Thanks to everyone who participated in yesterday's volunteer activity. We made a real difference in our community!",
                author: {
                    id: 'user2',
                    name: 'Sarah Wilson',
                    avatar: '/placeholder-user.jpg',
                    role: 'admin'
                },
                createdAt: 'Yesterday',
                likes: 42,
                comments: 8
            }
        ],
        events: [
            {
                id: 'event1',
                title: 'Monthly Community Meetup',
                date: '2025-05-15',
                time: '18:00',
                location: 'Central Park',
                attendees: 23
            },
            {
                id: 'event2',
                title: 'Volunteer Day',
                date: '2025-05-22',
                time: '10:00',
                location: 'Community Center',
                attendees: 15
            }
        ]
    };
};

export default function GroupDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [group, setGroup] = useState<Group | null>(null);
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call
        if (params.id) {
            const groupData = getGroupById(params.id as string);
            setGroup(groupData);
            setLoading(false);
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-green-500"></div>
            </div>
        );
    }

    if (!group) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-xl font-medium mb-2">Group not found</h1>
                <p className="text-gray-500 mb-4 text-center">The group you're looking for doesn't exist or has been removed.</p>
                <Link href="/dashboard/groups" className={buttonVariants({ variant: "default", className: "rounded-full" })}>
                    Back to Groups
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="font-medium text-lg">{group.name.split(' ')[0]}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                {/* Cover Image */}
                <div className="h-36 sm:h-48 bg-gray-200 dark:bg-gray-700 relative">
                    <Image
                        src={group.headerImage || '/placeholder.svg'}
                        alt=""
                        fill
                        className="object-cover"
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                        }}
                    />
                </div>

                {/* Profile and Info Section */}
                <div className="px-4">
                    <div className="flex justify-between relative">
                        {/* Profile Image */}
                        <div className="absolute -top-12 border-4 border-white dark:border-gray-900 rounded-full overflow-hidden h-24 w-24">
                            <Image
                                src={group.profileImage || '/placeholder.svg'}
                                alt={group.name}
                                width={96}
                                height={96}
                                className="object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder.svg';
                                }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="ml-auto mt-3 flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full h-9"
                            >
                                <Bell className="h-4 w-4 mr-1" />
                                <span className="sr-only sm:not-sr-only">Notify</span>
                            </Button>

                            <Button
                                onClick={() => setJoined(!joined)}
                                size="sm"
                                className={cn(
                                    "rounded-full h-9",
                                    joined
                                        ? "bg-gray-900 hover:bg-gray-700 text-white"
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                )}
                            >
                                {joined ? 'Joined' : 'Join Group'}
                            </Button>
                        </div>
                    </div>

                    {/* Group Info */}
                    <div className="mt-14 pb-3">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold mr-1">{group.name}</h1>
                            {group.isOfficial && (
                                <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{group.members.toLocaleString()} members</span>
                        </div>

                        <div className="flex flex-wrap gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {group.location && (
                                <div className="flex items-center mr-3">
                                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span>{group.location}</span>
                                </div>
                            )}

                            <div className="flex items-center">
                                <CalendarClock className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span>Created {group.createdAt}</span>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {group.description}
                        </p>
                    </div>
                </div>

                {/* No tabs anymore - removed the tab navigation */}
            </div>

            {/* Content - directly showing posts */}
            <div className="max-w-2xl mx-auto px-4 py-3">
                {/* Create Post */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 mb-4">
                    <div className="p-4">
                        <div className="flex items-start space-x-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div
                                    onClick={() => { }}
                                    className="w-full min-h-[40px] py-2 text-gray-500 dark:text-gray-400 cursor-pointer"
                                >
                                    <span className="text-sm">Share something with the group...</span>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full p-2 h-8 w-8">
                                            <ImageIcon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full p-2 h-8 w-8">
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        className="rounded-full bg-green-500 hover:bg-green-600 text-white px-4 h-8 text-sm"
                                        size="sm"
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    {group.posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
                            <div className="flex">
                                {/* Avatar column */}
                                <div className="mr-3 flex-shrink-0">
                                    <Avatar>
                                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Content column */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-wrap items-center">
                                            <p className="font-medium text-gray-900 dark:text-white mr-1 hover:underline">
                                                {post.author.name}
                                            </p>
                                            {post.author.role === 'admin' && (
                                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                                    Admin
                                                </span>
                                            )}
                                            <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                                                · {post.createdAt}
                                            </span>
                                        </div>
                                        <button className="text-gray-500 p-1 -mr-1 -mt-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <p className="text-gray-900 dark:text-white text-sm mt-1">
                                        {post.content}
                                    </p>

                                    {post.image && (
                                        <div className="mt-3">
                                            <img
                                                src={post.image}
                                                alt="Post image"
                                                className="rounded-lg w-full object-cover max-h-80 border border-gray-100 dark:border-gray-700"
                                            />
                                        </div>
                                    )}

                                    {/* Post Actions - Simplified */}
                                    <div className="mt-3 flex items-center justify-around border-t border-gray-100 dark:border-gray-700 pt-3">
                                        <button className="flex items-center text-gray-500 hover:text-green-500">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            <span className="text-xs">{post.comments}</span>
                                        </button>

                                        <button className="flex items-center text-gray-500 hover:text-green-500">
                                            <Repeat2 className="h-4 w-4 mr-2" />
                                            <span className="text-xs">0</span>
                                        </button>

                                        <button className="flex items-center text-gray-500 hover:text-pink-500">
                                            <Heart className="h-4 w-4 mr-2" />
                                            <span className="text-xs">{post.likes}</span>
                                        </button>

                                        <button className="flex items-center text-gray-500 hover:text-green-500">
                                            <Share2 className="h-4 w-4" />
                                        </button>

                                        <button className="flex items-center text-gray-500 hover:text-yellow-500">
                                            <Bookmark className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}