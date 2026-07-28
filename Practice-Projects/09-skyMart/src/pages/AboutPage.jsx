import React from 'react'
import AboutHero from '../components/about/AboutHero'
import OurStory from '../components/about/OurStory'
import ValuesSection from '../components/about/ValueSections'
import TeamSection from '../components/about/TeamSection'
import AboutCTA from '../components/about/AboutCTA'

const AboutPage = () => {
  return (
    <div className='max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8 py-12 animate-fade-in'>
        <AboutHero/>
        <OurStory/>
        <ValuesSection/>
        <TeamSection/>
        <AboutCTA/>
    </div>
  )
}

export default AboutPage