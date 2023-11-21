import Image from 'next/image'
import CountrySelector from "@/components/CountrySelector/CountrySelector";

export default function Home() {
  return (
    <div className="container">
      <h1>Select a Country</h1>
      <CountrySelector />
    </div>
  )
}
