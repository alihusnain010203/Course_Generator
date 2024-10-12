import Featured from "@/_components/Featured/Featured"
import Footer from "@/_components/Footer/Footer"
import Header from "@/_components/Header/Header"
import Hero from "@/_components/Hero/Hero"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
   <Header/>
   <Hero/>
   <Featured/>
   <Footer/>
    </div>
  )
}
