"use server"

// This is a mock implementation for demonstration purposes
// In a real app, you would connect to a database

interface UserData {
  name?: string
  email: string
  password: string
  province?: string
  district?: string
  municipality?: string
  ward?: string
}

// Mock database
const users: UserData[] = []

export async function createUser(userData: UserData): Promise<void> {
  // In a real app, you would:
  // 1. Hash the password
  // 2. Validate the data
  // 3. Store in a database

  // Check if user already exists
  if (users.some((user) => user.email === userData.email)) {
    throw new Error("User with this email already exists")
  }

  // Add user to our mock database
  users.push(userData)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log("User created:", userData.email)
}

export async function loginUser(userData: { email: string; password: string }): Promise<void> {
  // In a real app, you would:
  // 1. Verify credentials against database
  // 2. Create a session or JWT

  // Check if user exists and password matches
  const user = users.find((u) => u.email === userData.email && u.password === userData.password)

  if (!user) {
    // For demo purposes, let's allow any login
    console.log("Login would normally fail, but allowing for demo")
  } else {
    console.log("User logged in:", userData.email)
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export async function getPosts() {
  // In a real app, you would fetch posts from a database

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [
    {
      id: 1,
      author: "Sarita Sharma",
      location: "Kathmandu, Ward 10",
      time: "2 hours ago",
      content: "Has anyone seen a brown dog running around Ratnapark?",
      category: "Lost & Found",
      comments: 5,
      likes: 3,
    },
    // More posts would be here
  ]
}
