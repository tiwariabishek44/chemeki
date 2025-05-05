"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, MapPin, Clock, Tag, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for marketplace listings (products)
const listings = [
  {
    id: 1,
    title: "Wooden Dining Table",
    price: "Rs. 15,000",
    location: "Kathmandu, Ward 10",
    postedTime: "2 hours ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Ramesh Thapa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Furniture",
    productType: "Complex",
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    price: "Rs. 45,000",
    location: "Lalitpur, Ward 3",
    postedTime: "Yesterday",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Anita Gurung",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Electronics",
    productType: "Complex",
  },
  {
    id: 3,
    title: "Local Organic Vegetables",
    price: "Rs. 250/kg",
    location: "Bhaktapur, Ward 5",
    postedTime: "3 hours ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Shanti Tamang",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Food",
    productType: "Local",
  },
  {
    id: 4,
    title: "Handmade Pashmina Shawl",
    price: "Rs. 3,500",
    location: "Kathmandu, Ward 7",
    postedTime: "1 week ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Sarita Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Clothing",
    productType: "Local",
  },
  {
    id: 5,
    title: "Refrigerator - LG",
    price: "Rs. 35,000",
    location: "Kathmandu, Ward 14",
    postedTime: "2 days ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Mohan Karki",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Appliances",
    productType: "Complex",
  },
  {
    id: 6,
    title: "Nepali Thangka Painting",
    price: "Rs. 12,000",
    location: "Patan, Ward 2",
    postedTime: "5 days ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Laxmi Maharjan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Art",
    productType: "Local",
  },
  {
    id: 7,
    title: "Fresh Local Honey",
    price: "Rs. 650/bottle",
    location: "Kathmandu, Ward 3",
    postedTime: "1 day ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Bina Shrestha",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Food",
    productType: "Local",
  },
  {
    id: 8,
    title: "Handcrafted Copper Pot",
    price: "Rs. 2,800",
    location: "Bhaktapur, Ward 1",
    postedTime: "4 days ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Rajan Tamang",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Home Decor",
    productType: "Local",
  },
  {
    id: 9,
    title: "Homemade Pickles",
    price: "Rs. 300/jar",
    location: "Lalitpur, Ward 6",
    postedTime: "2 days ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Gita Pradhan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Food",
    productType: "Local",
  },
  {
    id: 10,
    title: "Mountain Bike",
    price: "Rs. 25,000",
    location: "Bhaktapur, Ward 5",
    postedTime: "3 days ago",
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "Bikash Shrestha",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Sports",
    productType: "Complex",
  },
]

// Mock data for user's listings
const userListings = [
  {
    id: 101,
    title: "Wooden Coffee Table",
    price: "Rs. 8,000",
    location: "Kathmandu, Ward 10",
    postedTime: "1 week ago",
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
    productType: "Complex",
    status: "Active",
  },
  {
    id: 102,
    title: "Leather Jacket",
    price: "Rs. 5,500",
    location: "Kathmandu, Ward 10",
    postedTime: "2 weeks ago",
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    productType: "Local",
    status: "Active",
  },
  {
    id: 103,
    title: "Homemade Sel Roti",
    price: "Rs. 100/piece",
    location: "Kathmandu, Ward 10",
    postedTime: "1 day ago",
    image: "/placeholder.svg?height=300&width=300",
    category: "Food",
    productType: "Local",
    status: "Active",
  },
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  // Filter listings based on the product type filter
  const filteredListings = productFilter === "all" 
    ? listings 
    : listings.filter(listing => listing.productType.toLowerCase() === productFilter.toLowerCase())

  // Filter user listings based on the product type filter
  const filteredUserListings = productFilter === "all" 
    ? userListings 
    : userListings.filter(listing => listing.productType.toLowerCase() === productFilter.toLowerCase())

  return (
    <div>
      {/* Marketplace header with green theme - removed Sell Item button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <p className="text-sm text-gray-500">Buy and sell products in your community</p>
        </div>
      </div>

      {/* Listings navigation tabs */}
      <div className="border-b border-gray-200 mb-5">
        <nav className="-mb-px flex space-x-8" aria-label="Listings">
          <button
            onClick={() => setActiveTab("all")}
            className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "all" ? "border-green-500 text-green-600" : ""
              }`}
          >
            All listings
          </button>
          <button
            onClick={() => setActiveTab("your")}
            className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "your" ? "border-green-500 text-green-600" : ""
              }`}
          >
            Your listings
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === "saved" ? "border-green-500 text-green-600" : ""
              }`}
          >
            Saved listings
          </button>
        </nav>
      </div>

      {/* Product type filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={productFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setProductFilter("all")}
          className={productFilter === "all" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        >
          All Products
        </Button>
        <Button 
          variant={productFilter === "local" ? "default" : "outline"}
          size="sm"
          onClick={() => setProductFilter("local")}
          className={productFilter === "local" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        >
          Local Products
        </Button>
        <Button 
          variant={productFilter === "complex" ? "default" : "outline"}
          size="sm"
          onClick={() => setProductFilter("complex")}
          className={productFilter === "complex" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        >
          Complex Items
        </Button>
      </div>

      {/* Main content area */}
      <div className="mb-6">
        {/* All listings tab content */}
        {activeTab === "all" && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/dashboard/marketplace/${listing.id}`}>
                <Card className="overflow-hidden flex flex-col h-full border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-square relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-700 border-green-200 text-xs px-1.5 py-0.5">
                      {listing.category}
                    </Badge>
                    <Badge className={`absolute top-2 left-2 ${listing.productType === "Local" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-purple-100 text-purple-700 border-purple-200"} text-xs px-1.5 py-0.5`}>
                      {listing.productType}
                    </Badge>
                  </div>
                  <CardContent className="p-2 sm:p-3 flex-grow">
                    <h3 className="font-medium text-sm sm:text-base truncate">{listing.title}</h3>
                    <p className="font-bold text-base sm:text-lg text-green-600">{listing.price}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{listing.postedTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 sm:p-3 pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src={listing.seller.avatar || "/placeholder.svg"} alt={listing.seller.name} />
                        <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate max-w-[60px] sm:max-w-[80px]">
                        {listing.seller.name}
                      </span>
                    </div>
                    <span className="h-7 px-2 text-xs text-green-600 border border-green-200 rounded-md flex items-center hover:bg-green-50">
                      View
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Your listings tab content with Sell Item button */}
        {activeTab === "your" && (
          <>
            {/* Sell Item button shows before listings in "Your listings" tab */}
            <div className="mb-5 flex justify-end">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Sell Item
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredUserListings.length > 0 ? (
                filteredUserListings.map((listing) => (
                  <Link key={listing.id} href={`/dashboard/marketplace/${listing.id}`}>
                    <Card className="overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="aspect-square relative">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          className="object-cover w-full h-full"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-100 text-green-700 border-green-200 text-xs px-1.5 py-0.5">
                          {listing.category}
                        </Badge>
                        <Badge className={`absolute bottom-2 left-2 ${listing.productType === "Local" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-purple-100 text-purple-700 border-purple-200"} text-xs px-1.5 py-0.5`}>
                          {listing.productType}
                        </Badge>
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs px-1.5 py-0.5">
                          {listing.status}
                        </Badge>
                      </div>
                      <CardContent className="p-2 sm:p-3 flex-grow">
                        <h3 className="font-medium text-sm sm:text-base truncate">{listing.title}</h3>
                        <p className="font-bold text-base sm:text-lg text-green-600">{listing.price}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{listing.postedTime}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-2 sm:p-3 pt-0 flex items-center justify-between">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-green-600 border-green-200 hover:bg-green-50">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50">
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <Tag className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 font-medium">You haven't listed any items yet</h3>
                  <p className="text-sm text-gray-500 mt-1">Create your first listing</p>
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Saved listings tab content */}
        {activeTab === "saved" && (
          <div className="text-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <h3 className="mt-2 font-medium">No saved items yet</h3>
            <p className="text-sm text-gray-500 mt-1">Items you save will appear here</p>
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
              Browse Marketplace
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
