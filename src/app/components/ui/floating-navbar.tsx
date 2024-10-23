"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { IconHome, IconUser } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const themeIcon = mounted ? (
    theme === "dark" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 transition duration-300 ease-in-out transform hover:rotate-180"
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
        className="w-6 h-6 transition duration-300 ease-in-out transform hover:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0112.003 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.207 2.663-7.793 6.423-9.126.45-.164.938.086 1.06.55a.749.749 0 01-.347.826 8.251 8.251 0 1010.965 10.965.75.75 0 01.826-.347c.464.122.714.61.55 1.06z"
        />
      </svg>
    )
  ) : null;

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-md bg-white dark:bg-Secondary shadow-lg z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {/* Theme Toggle Button */}
        <button
          className="relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-Primary dark:hover:text-white duration-300 hover:text-neutral-500"
          onClick={toggleTheme}
        >
          {themeIcon}
        </button>

        {/* Navigation Links */}
        <Link
          href="/"
          className={cn(
            "relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-Primary dark:hover:text-neutral-300 duration-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">
            <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
          </span>
          <span className="hidden sm:block text-sm">Profile</span>
        </Link>
        <Link
          href="/"
          className={cn(
            "relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-Primary dark:hover:text-neutral-300 duration-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">
            <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
          </span>
          <span className="hidden sm:block text-sm">Home</span>
        </Link>

        <img
          src="/liwan-logo-inverted.png"
          width={80}
          height={80}
          alt="logo Icon"
        />
      </motion.div>
    </AnimatePresence>
  );
};
