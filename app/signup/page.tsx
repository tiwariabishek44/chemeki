"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser } from "@/app/actions"
import { nepalData } from "@/lib/nepal-data"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    province: "",
    district: "",
    municipality: "",
    ward: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [districts, setDistricts] = useState<string[]>([])
  const [municipalities, setMunicipalities] = useState<string[]>([])
  const [wards, setWards] = useState<string[]>([])

  useEffect(() => {
    if (formData.province) {
      const selectedProvince = nepalData.find((p) => p.name === formData.province)
      setDistricts(selectedProvince ? selectedProvince.districts.map((d) => d.name) : [])
      setFormData((prev) => ({ ...prev, district: "", municipality: "", ward: "" }))
    }
  }, [formData.province])

  useEffect(() => {
    if (formData.province && formData.district) {
      const selectedProvince = nepalData.find((p) => p.name === formData.province)
      const selectedDistrict = selectedProvince?.districts.find((d) => d.name === formData.district)
      setMunicipalities(selectedDistrict ? selectedDistrict.municipalities.map((m) => m.name) : [])
      setFormData((prev) => ({ ...prev, municipality: "", ward: "" }))
    }
  }, [formData.district, formData.province])

  useEffect(() => {
    if (formData.province && formData.district && formData.municipality) {
      const selectedProvince = nepalData.find((p) => p.name === formData.province)
      const selectedDistrict = selectedProvince?.districts.find((d) => d.name === formData.district)
      const selectedMunicipality = selectedDistrict?.municipalities.find((m) => m.name === formData.municipality)

      // Generate wards 1-20 (typical range for Nepal)
      const wardNumbers = Array.from({ length: 20 }, (_, i) => (i + 1).toString())
      setWards(wardNumbers)
      setFormData((prev) => ({ ...prev, ward: "" }))
    }
  }, [formData.municipality, formData.district, formData.province])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.province || !formData.district || !formData.municipality || !formData.ward) {
      setError("Please complete your location information")
      return
    }

    try {
      setLoading(true)
      // In a real app, this would connect to a database
      await createUser(formData)
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create account. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-green-600">Chemiki</h1>
          </div>
          <CardTitle className="text-2xl text-center">Join Your Community</CardTitle>
          <CardDescription className="text-center">Create an account to connect with your neighbors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select onValueChange={(value) => handleSelectChange("province", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your province" />
                </SelectTrigger>
                <SelectContent>
                  {nepalData.map((province) => (
                    <SelectItem key={province.name} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select onValueChange={(value) => handleSelectChange("district", value)} disabled={!formData.province}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality/Rural Municipality</Label>
              <Select
                onValueChange={(value) => handleSelectChange("municipality", value)}
                disabled={!formData.district}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Select onValueChange={(value) => handleSelectChange("ward", value)} disabled={!formData.municipality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ward" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward} value={ward}>
                      Ward {ward}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
