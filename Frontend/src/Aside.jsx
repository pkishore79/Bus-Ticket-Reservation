import './Aside.css'

import React from 'react'

function Aside() {
  return (
    <div className='aside'> 
        <section>
            <img src="src/images/booking.png" alt="" />
            <h2>Easy Booking</h2>
            <p>Find and book your seat in just a few taps, no hassle.</p>
        </section>
        <section>
            <img src="src/images/credit-card.png" alt="" />
            <h2>Secured Payments</h2>
            <p>Your bookings and details are protected end to end.</p>
        </section>
        <section>
            <img src="src/images/time.png" alt="" />
            <h2>Real-Time Seats</h2>
            <p>See live seats availability across every routes.</p>
        </section>
    </div>
  )
}

export default Aside