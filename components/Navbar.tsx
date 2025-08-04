"use client"

import React from 'react'
import Link from 'next/link'
import ThemeToggleButton from "./ui/theme-toggle-button"
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'


const Navbar = () => {
  const { data: session } = useSession()

  const handleAuthClick = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  return (
    <nav className="w-full px-6 py-4 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Quickfeed Logo" 
              className="h-8 w-8 md:h-10 md:w-10 dark:invert"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-primary">Quick</span>Feed
            </h1>
          </div>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {session && (
            <Link href="/projects">
              <Button 
                variant="ghost"
                className="text-sm md:text-base hover:cursor-pointer"
              >
                Projects
              </Button>
            </Link>
          )}
          <Button 
            onClick={handleAuthClick}
            className="text-sm md:text-base hover:cursor-pointer"
          >
            {session ? 'Logout' : 'Login'}
          </Button>
          <ThemeToggleButton variant="circle-blur" start="top-right"/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar