'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { Home, Package, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
    isLoggedIn: boolean
    isAdmin: boolean
}

export function MobileNav({ isLoggedIn, isAdmin }: MobileNavProps) {
    const { t } = useI18n()
    const pathname = usePathname()

    if (!isLoggedIn) return null

    const navItems = [
        {
            href: "/",
            label: t('home.title').split(' ')[0] || "首页",
            icon: Home,
            active: pathname === "/"
        },
        {
            href: "/orders",
            label: t('common.myOrders'),
            icon: Package,
            active: pathname === "/orders" || pathname.startsWith("/order/")
        },
        ...(isAdmin ? [{
            href: "/admin/settings",
            label: t('common.admin'),
            icon: Settings,
            active: pathname.startsWith("/admin")
        }] : []),
        {
            href: "#profile",
            label: t('common.myOrders').includes('订单') ? "我的" : "Me",
            icon: User,
            active: false,
            isProfile: true
        }
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 safe-area-pb">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    if (item.isProfile) {
                        // Profile is just a placeholder to show user info - clicking goes to orders
                        return (
                            <Link
                                key={item.href}
                                href="/orders"
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                                    "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    }
                    
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                                item.active 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5",
                                item.active && "text-primary"
                            )} />
                            <span className={cn(
                                "text-xs font-medium",
                                item.active && "text-primary"
                            )}>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
