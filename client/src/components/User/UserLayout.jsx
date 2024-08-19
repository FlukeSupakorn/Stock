import React from 'react'
import UserSidebar from './UserSidebar'

function UserLayout({ children }) {
  return (
    <div className="flex flex-row mx-48 2xl:mx-80">
      <UserSidebar />
      <div className='flex w-3/4 pl-14'>{children}</div>
    </div>
  )
}

export default UserLayout