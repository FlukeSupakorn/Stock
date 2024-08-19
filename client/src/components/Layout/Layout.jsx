import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

export default function Layout({children}) {
  return (
    <div className='font-noto'>
      <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow p-4 mt-20">
        {children}
      </main>
      <Footer />
      </div>
    </div>
  )
}
