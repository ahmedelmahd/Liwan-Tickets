'use client'

import React, { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useTheme } from "next-themes"
import { IconUpload, IconHome, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import Image from "next/image"

const FloatingNav = () => {
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 150) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  })

  const themeIcon = theme === "dark" ? (
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-md bg-white dark:bg-gray-800 shadow-lg z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4"
    >
      <button
        className="relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-gray-200 dark:hover:text-white duration-300 hover:text-neutral-500"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {themeIcon}
      </button>
      <Link
        href="/"
        className="relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-gray-200 dark:hover:text-white duration-300 hover:text-neutral-500"
      >
        <span className="block sm:hidden">
          <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
        </span>
        <span className="hidden sm:block text-sm">Profile</span>
      </Link>
      <Link
        href="/"
        className="relative font-semibold items-center flex space-x-1 text-neutral-800 dark:text-gray-200 dark:hover:text-white duration-300 hover:text-neutral-500"
      >
        <span className="block sm:hidden">
          <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
        </span>
        <span className="hidden sm:block text-sm">Home</span>
      </Link>
      <Image
        src={theme === "dark" ? "/liwan-dark-no-bg.png" : "/liwan-logo-inverted.png"}
        width={80}
        height={80}
        alt="Liwan Logo"
      />
    </motion.div>
  )
}

const TicketForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const [issueType, setIssueType] = useState("")
  const { theme } = useTheme()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleIssueTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIssueType(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission
    console.log("Issue Type:", issueType)
    // Add other form data handling here
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Submit a ticket</h1>
          <Image
            src={theme === "dark" ? "/liwan-dark-no-bg.png" : "/liwan-logo-inverted.png"}
            width={100}
            height={40}
            alt="Liwan Logo"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="issue-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Issue Type
            </label>
            <select
              id="issue-type"
              value={issueType}
              onChange={handleIssueTypeChange}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an issue type</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature Request</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="issue-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Issue description
            </label>
            <textarea
              id="issue-description"
              rows={6}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your issue here..."
            ></textarea>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">max 1000 words</p>
          </div>
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attach a file
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <IconUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C8A97E] hover:bg-[#B69A6F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A97E]"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="relative">
      <TicketForm />
    </div>
  )
}