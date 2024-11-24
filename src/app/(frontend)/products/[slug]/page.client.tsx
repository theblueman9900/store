'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // setHeaderTheme('dark') // commented this out to show the text in the header
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
