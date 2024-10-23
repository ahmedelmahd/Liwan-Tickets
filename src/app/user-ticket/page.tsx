"use client";
import React from "react";
import { FloatingNav } from "@/app/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { div } from "framer-motion/client";
import Form from "@/app/components/ui/submit-form";
import { ThemeProvider } from "next-themes";
export function FloatingNavDemo() {
    const navItems = [
      {
      name: "Contact",
      link: "/contact",
      icon: (
          <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
      },
    {
      name: "Profile",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Home",
      link: "/",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    
      <div className="inset-0 absolute bg-grid-black/[0.1] dark:bg-grid-white/[0.2]" />
    // </div>
  );
};
export default function page() {
    return (
        <main className="bg-Primary">
            <ThemeProvider attribute="class">
              <FloatingNavDemo />
              <Form />
            </ThemeProvider>
        </main>
    );
}
