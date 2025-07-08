import Navbar from "../components/navbar"
import Table from "../components/table"
import Footer from "../components/footer"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Table />
      </div>
      <Footer />
    </div>
  )
}

export default Home