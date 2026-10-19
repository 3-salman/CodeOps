import Hero from '@/components/Hero'
import CategoryBar from '@/components/CategoryBar'
import SpecialsGrid from '@/components/SpecialsGrid'
import HowItWorks from '@/components/HowItWorks'

export const metadata = { title: 'Home' }

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBar />
      <SpecialsGrid />
      <HowItWorks />
    </>
  )
}
