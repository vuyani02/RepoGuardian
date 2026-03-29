'use client'

import { useStyles } from './style'
import LandingNavbar from '@/components/landing/LandingNavbar'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import CtaBanner from '@/components/landing/CtaBanner'
import LandingFooter from '@/components/landing/LandingFooter'

const Home = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.page}>
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaBanner />
      <LandingFooter />
    </div>
  )
}

export default Home
