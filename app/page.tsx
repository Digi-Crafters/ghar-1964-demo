import React from 'react'
import Hero from './components/Hero'
import Experiences from './components/Experience'
import AboutGhar1964 from './components/AboutUs'
import Services from './components/Services'
import Footer from './components/Footer'
import Accomodation from './components/Accomodation'

const page = () => {
  return (
    <div><Hero></Hero>
    <Experiences/>
    <AboutGhar1964/>
    <Accomodation/>
    <Services/>
    <Footer/>
    </div>
  )
}

export default page