"use client";
import React, { useState, useEffect } from "react";
import {
  Sidebar as SidebarComponent,
  SidebarBody,
  SidebarLink,
  useSidebar,
  SidebarProvider,
} from "@/app/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeProvider, useTheme } from "next-themes";
import { cn } from "@/app/lib/utils";
import { Carousel, Card } from "@/app/components/ui/card-carousel";

// Theme Toggle Component (using your provided code)
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return   
 null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2   
 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6   
 transition duration-300 ease-in-out transform hover:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.719 17.719l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.719 6.281l1.061-1.061M12 9a3 3 0 100 6 3 3 0 000-6z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6   
 transition duration-300 ease-in-out transform hover:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112.003 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.207 2.663-7.793 6.423-9.126.45-.164.938.086 1.06.55a.749.749 0 01-.347.826 8.251 8.251 0 1010.965 10.965.75.75 0 01.826-.347c.464.122.714.61.55 1.06z"
          />
        </svg>
      )}
    </button>
  );
};

// Dummy dashboard component with light/dark mode
const Dashboard = () => {
  const { open } = useSidebar();

  return (
    <div
      className={`flex flex-1 overflow-y-auto ${
        open ? "md:translate-x-0 translate-x-64" : "translate-x-0"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-2 md:p-10 rounded-tl-2xl card bg-neutral-100 dark:bg-Primary flex flex-col gap-2 flex-1 w-full h-full">
        <AppleCardsCarouselDemo />
      </div>
    </div>
  );
};

// Carousel Demo Component with Light/Dark Mode
export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-screen overflow-hidden py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-Primary dark:text-neutral-200 font-sans pb-6">
        How Can We Help?
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

// Dummy Content with Light/Dark Mode
const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-Secondary dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          ></div>
        );
      })}
    </>
  );
};

// Data for Carousel Cards
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "/card_one.jpg",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "/card_two.jpg",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/card_three.jpg",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "/card_four.jpg",
    content: <DummyContent />,
  },
];

// Sidebar Demo with Light/Dark Mode
export function SidebarDemo() {
  const links = [
    {
      label: "My Tickets",
      href: "/user-main/ticket",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0 mx-2" />
      ),
    },
    {
      label: "Profile",
      href: "/Profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0 mx-2" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0 mx-2" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-Primary dark:bg-neutral-950 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      <SidebarProvider open={open} setOpen={setOpen}>
        <Sidebar open={open} setOpen={setOpen} links={links} />
        <Dashboard />
      </SidebarProvider>
    </div>
  );
}

// Sidebar Component
export const Sidebar = ({
  open,
  setOpen,
  links,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  links: Array<{ label: string; href: string; icon: React.ReactNode }>;
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col bg-Primary dark:bg-neutral-950 h-full transition-all duration-300 ease-in-out",
        open ? "w-[300px]" : "w-[40px]"
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Theme Toggle Button at the bottom */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-6">
        {open ? <Logo /> : <LogoIcon />}
        <div className="mt-8 flex flex-col gap-2">
          {links.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
        </div>
        <div className="mt-auto pb-4"> {/* Push to bottom */}
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

// Logo for Expanded Sidebar
export const Logo = () => {
  return (
    <Link
      href="/Profile"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-100 py-1 relative z-20"
    >
      <Image
        src="/Sidebar-Icon.jpg"
        width={40}
        height={40}
        className="rounded-full"
        alt="Profile Icon"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Profile
      </motion.span>
    </Link>
  );
};

// Logo Icon for Collapsed Sidebar
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <Image
        src="/Sidebar-Icon.jpg"
        width={30}
        height={30}
        className="rounded-full mx-1"
        alt="Profile Icon"
      />
    </Link>
  );
};

// Main Page Export
export default function page() {
  return (
    <div className="flex flex-1">
      <ThemeProvider attribute="class">
        <SidebarDemo />
      </ThemeProvider>
    </div>
  );
}