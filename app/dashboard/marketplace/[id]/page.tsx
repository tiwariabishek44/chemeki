"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Share2,
    Bookmark,
    Flag,
    MessageSquare,
    Phone,
    Star,
    Heart,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    ShieldCheck
} from "lucide-react";

// Extended product data for product detail page
interface ProductDetail {
    id: number;
    title: string;
    description: string;
    price: string;
    location: string;
    postedTime: string;
    images: string[];
    category: string;
    condition: string;
    seller: {
        id: string;
        name: string;
        avatar: string;
        rating: number;
        memberSince: string;
        responseRate: string;
        verifiedUser: boolean;
        otherListingsCount: number;
    };
    specifications: {
        [key: string]: string;
    };
}

// Mock function to get product details
const getProductById = (id: string): ProductDetail => {
    return {
        id: parseInt(id),
        title: id === "1" ? "Wooden Dining Table" : "Samsung Galaxy S21",
        description: id === "1"
            ? "Beautiful handcrafted wooden dining table made from solid teak wood. Perfect for a family of 6. Minor scratches on one leg but otherwise in excellent condition. Selling because we are moving abroad."
            : "Samsung Galaxy S21 in excellent condition. Only used for 6 months. Comes with original box, charger, and headphones. Battery health is 98%. No scratches or dents.",
        price: id === "1" ? "Rs. 15,000" : "Rs. 45,000",
        location: id === "1" ? "Kathmandu, Ward 10" : "Lalitpur, Ward 3",
        postedTime: id === "1" ? "2 hours ago" : "Yesterday",
        images: id === "1"
            ? ["/placeholder.svg?height=500&width=800", "/placeholder.svg?height=500&width=800", "/placeholder.svg?height=500&width=800"]
            : ["/placeholder.svg?height=500&width=800", "/placeholder.svg?height=500&width=800"],
        category: id === "1" ? "Furniture" : "Electronics",
        condition: id === "1" ? "Used - Good" : "Used - Like New",
        seller: {
            id: id === "1" ? "user1" : "user2",
            name: id === "1" ? "Ramesh Thapa" : "Anita Gurung",
            avatar: "/placeholder-user.jpg",
            rating: id === "1" ? 4.7 : 4.9,
            memberSince: id === "1" ? "March 2022" : "January 2021",
            responseRate: id === "1" ? "89%" : "95%",
            verifiedUser: id === "1" ? true : true,
            otherListingsCount: id === "1" ? 3 : 7
        },
        specifications: id === "1"
            ? {
                "Material": "Teak Wood",
                "Dimensions": "180cm x 90cm x 75cm (L x W x H)",
                "Seating Capacity": "6 persons",
                "Weight": "Approximately 35kg",
                "Age": "3 years"
            }
            : {
                "Brand": "Samsung",
                "Model": "Galaxy S21",
                "Memory": "8GB RAM, 128GB Storage",
                "Color": "Phantom Black",
                "Battery": "4000mAh",
                "Operating System": "Android 11 (Upgradable to 13)"
            }
    };
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (params.id) {
            // In a real app, this would be an API call
            const productData = getProductById(params.id as string);
            setProduct(productData);
            setLoading(false);
        }
    }, [params.id]);

    const handlePreviousImage = () => {
        if (product?.images) {
            setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
        }
    };

    const handleNextImage = () => {
        if (product?.images) {
            setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-green-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <h1 className="text-xl font-medium mb-2">Product not found</h1>
                <p className="text-gray-500 mb-4 text-center">
                    The product you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/dashboard/marketplace" className="text-green-500 hover:underline">
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    const renderRatingStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half-star" className="relative">
                    <Star className="text-gray-300 h-4 w-4" />
                    <Star className="absolute top-0 left-0 fill-yellow-400 text-yellow-400 h-4 w-4 [clip-path:inset(0_50%_0_0)]" />
                </span>
            );
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="text-gray-300 h-4 w-4" />);
        }

        return stars;
    };

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
                    <span>Back to Marketplace</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Product images */}
                <div className="col-span-2 space-y-4">
                    {/* Image gallery */}
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={product.images[currentImageIndex]}
                            alt={product.title}
                            fill
                            className="object-contain"
                            priority
                        />

                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePreviousImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
                                    {product.images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`block h-1.5 rounded-full ${index === currentImageIndex ? 'bg-green-500 w-4' : 'bg-gray-300 w-1.5'
                                                }`}
                                        ></span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Thumbnail gallery */}
                    {product.images.length > 1 && (
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative h-16 w-16 flex-shrink-0 rounded overflow-hidden border-2 ${index === currentImageIndex ? 'border-green-500' : 'border-transparent'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Product information */}
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge className="mb-2 bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                    {product.category}
                                </Badge>
                                <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
                                <p className="text-2xl font-bold text-green-600 mb-2">{product.price}</p>
                                <p className="text-sm text-gray-600 mb-1">{product.condition}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span>{product.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span>Posted {product.postedTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsSaved(!isSaved)}
                                    className={`rounded-full ${isSaved ? 'text-red-500 hover:text-red-600' : ''}`}
                                >
                                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500' : ''}`} />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Flag className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div>
                            <h2 className="font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        <Separator className="my-4" />

                        <div>
                            <h2 className="font-semibold mb-3">Specifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column - Seller information and actions */}
                <div className="space-y-4">
                    {/* Contact seller card */}
                    <Card className="overflow-hidden border-gray-200">
                        <CardContent className="p-4 space-y-4">
                            <h2 className="font-semibold text-lg">Contact Seller</h2>

                            <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center">
                                        <p className="font-medium">{product.seller.name}</p>
                                        {product.seller.verifiedUser && (
                                            <ShieldCheck className="h-4 w-4 text-green-500 ml-1" />
                                        )}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        {renderRatingStars(product.seller.rating)}
                                        <span className="text-sm text-gray-600 ml-1">({product.seller.rating})</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Member since:</span>
                                    <span>{product.seller.memberSince}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Response rate:</span>
                                    <span>{product.seller.responseRate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Active listings:</span>
                                    <span>{product.seller.otherListingsCount}</span>
                                </div>
                            </div>

                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                            </Button>
                            <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                                <Phone className="h-4 w-4 mr-2" />
                                Request Phone Number
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Payment safety tips */}
                    <Card className="overflow-hidden border-gray-200 bg-gray-50">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <CircleDollarSign className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-sm">Safety Tips for Buyers</h3>
                                    <ul className="text-xs space-y-1 text-gray-600 mt-1 list-disc pl-4">
                                        <li>Meet in a public, well-lit place</li>
                                        <li>Check the item before paying</li>
                                        <li>Pay only after inspecting the item</li>
                                        <li>Don't send money in advance</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seller's other listings */}
                    {product.seller.otherListingsCount > 0 && (
                        <div>
                            <h3 className="font-medium mb-3">More from this Seller</h3>
                            {/* Just showing placeholder listings */}
                            <div className="grid grid-cols-2 gap-2">
                                {[...Array(Math.min(4, product.seller.otherListingsCount))].map((_, index) => (
                                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                                        <div className="aspect-square relative bg-gray-100">
                                            <Image
                                                src="/placeholder.svg?height=100&width=100"
                                                alt="Other listing"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <p className="text-xs font-medium truncate">Item {index + 1}</p>
                                            <p className="text-xs text-green-600">Rs. {Math.floor(Math.random() * 10000)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {product.seller.otherListingsCount > 4 && (
                                <Button
                                    variant="ghost"
                                    className="w-full mt-2 text-green-600 hover:text-green-700 hover:bg-green-50 text-sm"
                                >
                                    See all {product.seller.otherListingsCount} items
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}