import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    // --- New Attractive Footer Style ---
    // Blends with the bg-gray-50 page background
    // Uses a subtle top border for separation
    <footer className="w-full p-4 bg-gray-50 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto">
      &copy; {year} CampusTales. All rights reserved.
    </footer>
  )
}

export default Footer