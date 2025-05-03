"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

interface NavItem {
  name: string;
  path: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  onClose: () => void;
}

const MobileNav = ({ navItems, onClose }: MobileNavProps) => {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 rounded-md bg-background p-4">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <ModeToggle />
              <div className="space-x-2">
                <Link href="/login" onClick={onClose}>
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link href="/signup" onClick={onClose}>
                  <Button variant="default" size="sm">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;