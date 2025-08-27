"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import ThemeToggleButton from "./ui/theme-toggle-button"
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'


const Navbar = () => {
  const { data: session } = useSession()
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const handleAuthClick = async () => {
    if (session) {
      setIsAuthLoading(true)
      await signOut()
      setIsAuthLoading(false)
    } else {
      setIsAuthLoading(true)
      await signIn()
      // Don't set loading false here - page will navigate
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
              className="h-8 w-8 dark:invert"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-primary">Quick</span>Feed
            </h1>
          </div>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {session && (
            <Link href="/projects" className="hidden md:block">
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
            disabled={isAuthLoading}
            className="text-sm md:text-base hover:cursor-pointer"
          >
            {isAuthLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              session ? 'Logout' : 'Login'
            )}
          </Button>
          <ThemeToggleButton variant="circle-blur" start="top-right"/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar