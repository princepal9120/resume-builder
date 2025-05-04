"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileTextIcon, 
  LayoutDashboardIcon, 
  BriefcaseIcon, 
  UserIcon, 
  SettingsIcon, 
  LineChartIcon, 
  MessageSquareIcon,
  SparklesIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function DashboardNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Resumes",
      href: "/dashboard/resumes",
      icon: <FileTextIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Applications",
      href: "/dashboard/applications",
      icon: <BriefcaseIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "AI Assistant",
      href: "/dashboard/ai-assistant",
      icon: <SparklesIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <LineChartIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquareIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <UserIcon className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <SettingsIcon className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}