"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Lock,
  Search,
  PlusCircle,
  MapPin,
  Bell
} from "lucide-react";

interface Group {
  id: string;
  name: string;
  members: number;
  image: string;
  status: 'open' | 'request';
  description?: string;
  location?: string;
  category?: string;
  isOfficial?: boolean;
  lastActivity?: string;
}

export default function GroupsPage() {
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Veterans and Military Families of the DC Area',
      members: 8887,
      image: '/images/groups/veterans.png',
      status: 'open',
      description: 'A community for veterans, active duty military, and their families to connect, share resources, and support one another.',
      location: 'Washington DC Area',
      category: 'Community',
      isOfficial: true,
      lastActivity: 'Today'
    },
    {
      id: '2',
      name: 'Centreville Cats',
      members: 799,
      image: '/images/groups/cats.png',
      status: 'request',
      description: 'For cat lovers in Centreville to share photos, advice, and organize meetups.',
      location: 'Centreville',
      category: 'Pets',
      lastActivity: 'Yesterday'
    },
    {
      id: '3',
      name: 'Centreville friends',
      members: 36,
      image: '/images/groups/friends.png',
      status: 'open',
      description: 'A place for neighbors in Centreville to socialize, organize get-togethers, and build community.',
      location: 'Centreville',
      category: 'Social',
      lastActivity: '3 days ago'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
        <div className="px-4 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <h1 className="font-bold text-xl tracking-tight">Groups</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-2xl mx-auto">
        {/* Search and Create Group */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm"
              placeholder="Search groups"
            />
          </div>
          <div className="mt-3">
            <Button className="w-full rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Group
            </Button>
          </div>
        </div>

        {/* Groups List */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Groups near you</h2>
          <span className="text-sm text-gray-500">3 groups</span>
        </div>

        <div className="space-y-3">
          {groups.map((group) => (
            <Link href={`/dashboard/groups/${group.id}`} key={group.id}>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200 flex items-start space-x-3">
                <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{group.name}</h3>

                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{group.members.toLocaleString()}</span>
                      </div>

                      {group.location && (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{group.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                      {group.description}
                    </p>

                    <div className="mt-3">
                      {group.status === 'open' ? (
                        <Button size="sm" className="h-7 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs px-4">
                          Join
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="h-7 rounded-full flex items-center text-xs px-3">
                          <Lock className="w-3 h-3 mr-1" />
                          Request to Join
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}