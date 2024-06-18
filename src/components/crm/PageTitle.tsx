import React from 'react'

export const AdminPageTitle = ({ title }: { title?: string }) => {
  return (
    <div className="relative z-10 p-1.5">
      <h4 className="banner-title mb-8 text-2xl font-light text-white">
        {title}
      </h4>
    </div>
  )
}
