import React from 'react'
import './Intro.css'

function Intro() {
  return (
    <div className='Intro'>
        <section className='right'>
            <h3><span>Travel made simple</span></h3>
            <h1>BOOK BUS TICKETS EASILY</h1>
            <p>Search thousands of routes, compare buses, and reserve your seat in seconds. Your next trip is just a few clicks away</p>
        </section>
        <section className='left'>
            <img src="src/images/intro.jpg" alt="" />
        </section>
    </div>
  )
}

export default Intro