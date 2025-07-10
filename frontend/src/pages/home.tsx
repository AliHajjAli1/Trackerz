import Navbar from "../components/navbar"
import Table from "../components/table"
import Footer from "../components/footer"
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    document.title = "Trackerz";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar addAvailable={true} />
      <main className="flex-grow flex items-center justify-center">
        <Table />
      </main>
      <Footer />
    </div>
  );
}

export default Home