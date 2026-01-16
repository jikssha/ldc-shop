import { auth } from "@/lib/auth"
import { MobileNav } from "./mobile-nav"

export async function MobileNavWrapper() {
    const session = await auth()
    const user = session?.user

    // Check if admin (case-insensitive)
    const rawAdminUsers = process.env.ADMIN_USERS?.split(',') || []
    const adminUsers = rawAdminUsers.map(u => u.toLowerCase())
    const isAdmin = user?.username && adminUsers.includes(user.username.toLowerCase()) || false

    return <MobileNav isLoggedIn={!!user} isAdmin={isAdmin} />
}
