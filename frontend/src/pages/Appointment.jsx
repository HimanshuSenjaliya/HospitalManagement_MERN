/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import AppointmentForm from '../components/AppointmentForm'

const Appointment = () => {
  return (
    <div>
        <Hero title={"Schedule Your Appointment | Apollo Hospital"} imageUrl={"/signin.png"}/>
        <AppointmentForm/>
    </div>
  )
}

export default Appointment