'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Home, History, LogOut, X } from 'lucide-react'
import Link from 'next/link'
import { ThemeProvider, useTheme } from 'next-themes'
import { IconBrandSuperhuman, IconDashboard, IconPlus, IconBuildingBank, IconBuildingHospital, IconDeviceLaptop, IconUsers } from '@tabler/icons-react'

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <style jsx global>{`
          select option {
            display: flex;
            align-items: center;
            padding: 0.5rem;
          }
          select option svg {
            margin-right: 0.5rem;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'manager' | 'department'>('manager')

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const themeIcon = mounted ? (
    theme === "dark" ? (
      <Sun size={20} />
    ) : (
      <Moon size={20} />
    )
  ) : null

  const openModal = (type: 'manager' | 'department') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full dark:bg-neutral-950 text-neutral-200 bg-Primary p-4 transition-all duration-300 ease-in-out z-10 flex flex-col ${isExpanded ? 'w-[300px]' : 'w-[72px]'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex items-center mb-8">
          <Link href={"/Profile"} className='flex items-center'>
            <img src="/Sidebar-icon.jpg" alt="Admin" className="w-10 h-10 rounded-full mr-3" />
            {isExpanded && <span className="text-xl font-semibold">Admin</span>}
          </Link>
        </div>
        <nav className="flex-grow">
          <SidebarItem icon={<Home size={20} />} label="Home" href="/" isExpanded={isExpanded} />
          <SidebarItem icon={<History size={20} />} label="History" href="/ticket-history" isExpanded={isExpanded} />
          <SidebarItem icon={<LogOut size={20} />} label="Log out" href="#" isExpanded={isExpanded} />
        </nav>
        <button
          onClick={toggleTheme}
          className={`mt-auto w-full py-2 flex items-center hover:bg-gray-700 text-white hover:bg-opacity-80 transition-colors duration-300 rounded ${isExpanded ? 'text-left' : 'text-center'}`}
        >
          {themeIcon}
          {isExpanded && <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </aside>

      {/* Main content */}
      <main className={`flex-1 p-4 transition-all duration-300 dark:bg-Primary dark:text-neutral-200 bg-neutral-200 text-Primary h-fit ${isExpanded ? 'ml-[300px]' : 'ml-[72px]'}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 px-8">Dashboard</h1>
        
        {/* Managers Section */}
        <h2 className='text-xl font-semibold mb-4 px-8'>Add Managers:</h2>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 px-8 pt-4'>
          {[1, 2, 3].map((manager, index) => (
            <div key={index} className='border-2 dark:border-Primary border-neutral-200 shadow-lg rounded-lg hover:shadow-xl p-4'>
              <div className='md:max-w-none max-w-full'>
                <h3 className='font-semibold text-xl truncate'>Manager {manager}</h3>
                <p className='text-sm break-words'>Email: ahmedsamir.0120495@gmail.com</p>
                <p className='text-sm break-words'>Phone number: 01093179123</p>
                <p className='text-sm break-words'>Ext number: 1234432</p>
                <div className='flex justify-end'>
                  <button className='bg-red-700 p-2 rounded-lg text-white font-semibold'>Delete</button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Manager Card */}
          <div className='border-2 dark:border-Primary border-neutral-200 shadow-lg rounded-lg hover:shadow-xl p-4'>
            <div className='flex justify-center items-center p-14'>
              <button className='flex justify-center items-center' onClick={() => openModal('manager')}>
                <IconPlus width={40} height={40} />
                <span className='font-semibold px-4'>Add Manager</span>
              </button>
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <h2 className='text-xl font-semibold px-8 py-8'>Add Departments:</h2>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 px-8 pt-4'>
          {["Human Resources", "Finance", "IT"].map((department, index) => (
            <div key={index} className='border-2 dark:border-Primary border-neutral-200 shadow-lg rounded-lg hover:shadow-xl p-4'>
              <div className='md:max-w-none max-w-full'>
                <h3 className='font-semibold text-xl truncate'>{department}</h3>
                <div className='flex justify-center items-center p-4'>
                  <button className='flex justify-center items-center'>
                    <IconBrandSuperhuman width={40} height={40} />
                  </button>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-red-700 p-2 rounded-lg text-white font-semibold'>Delete</button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Department Card */}
          <div className='border-2 dark:border-Primary border-neutral-200 shadow-lg rounded-lg hover:shadow-xl p-4'>
            <div className='flex justify-center items-center p-14'>
              <button className='flex justify-center items-center' onClick={() => openModal('department')}>
                <IconPlus width={40} height={40} />
                <span className='font-semibold px-4'>Add Department</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalType === 'manager' ? 'Add New Manager' : 'Add New Department'}
      >
        {modalType === 'manager' ? (
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-Primary dark:text-neutral-200">Name</label>
              <input type="text" id="name" name="name" className="mt-1 dark:bg-neutral-200 bg-neutral-700 text-neutral-200 dark:text-Primary block w-full rounded-md border-gray-300 shadow-sm p-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-Primary dark:text-neutral-200">Email</label>
              <input type="email" id="email" name="email" className="mt-1 dark:bg-neutral-200 bg-neutral-700 text-neutral-200 dark:text-Primary p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-Primary dark:text-neutral-200">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="mt-1 dark:bg-neutral-200 bg-neutral-700 text-neutral-200 dark:text-Primary block w-full rounded-md border-gray-300 shadow-sm p-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="ext" className="block text-sm font-semibold text-Primary dark:text-neutral-200">Ext Number</label>
              <input type="text" id="ext" name="ext" className="mt-1 dark:bg-neutral-200 bg-neutral-700 text-neutral-200 dark:text-Primary block w-full rounded-md border-gray-300 shadow-sm p-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-Primary text-white dark:bg-neutral-200 dark:text-Primary hover:dark:bg-neutral-300 hover:bg-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add Manager
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* Add your form submission logic here */ }}>
            <div>
            <label htmlFor="name" className="block text-sm font-semibold text-Primary dark:text-neutral-200">Department</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full bg-neutral-700 text-white dark:bg-neutral-300 dark:text-Primary p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-Primary text-neutral-200 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-Primary hover:dark:bg-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add Department
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

function SidebarItem({ icon, label, href, isExpanded }: { icon: React.ReactNode; label: string; href: string; isExpanded: boolean }) {
  return (
    <Link href={href} className="flex items-center mb-4 text-gray-200 hover:bg-gray-600 rounded transition-colors duration-300 p-2">
      {icon}
      {isExpanded && <span className="ml-2">{label}</span>}
    </Link>
  )
}

export default function Page() {
  return (
    <ThemeProvider attribute="class">
      <AdminDashboard />
    </ThemeProvider>
  )
}