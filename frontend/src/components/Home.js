import React from 'react'
import SideBar from './SideBar'
import Banner from './Banner'
import DynamicComponent from './DynamicComponent'

function Home() {
  return (
    <div className='home-container'>
        <SideBar />
        <Banner />
        <DynamicComponent />
    </div>
  )
}

export default Home