import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import SpecialsGrid from '../components/SpecialsGrid.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryBar />
      <SpecialsGrid />
      <HowItWorks />
      <Footer />
    </>
  )
}
