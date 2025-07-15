import Navbar from "../components/navbar"
import Table from "../components/table"
import Footer from "../components/footer"
import { useState, useEffect } from "react";
import { fetchApplications, type Application } from "../api/apps";
import { CircularProgress } from "@mui/material";
import { FiXCircle } from "react-icons/fi";

const Home = () => {

  useEffect(() => {
    document.title = "Trackerz";
  }, []);

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetchApplications();
        if (response && response.data) {
          setApplications(response.data);
        } 
        else {
          setApplications([]);
        }
      } 
      catch (err) {
        setError('Failed to fetch applications');
      } 
      finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  if (loading) {
      return (
        <div className="min-h-screen flex flex-col">
          <Navbar onAdd={() => {}} />
          <main className="flex-grow flex items-center justify-center">
            <CircularProgress color="success" />
          </main>
          <Footer />
        </div>
      );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onAdd={() => {}} />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col text-center p-8">
            <FiXCircle className="text-red-500" /> 
            Error! Try refreshing the page.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar addAvailable={true} onAdd={(newApp) => setApplications((prev) => [...prev, newApp])} />
      <main className="flex-grow flex items-center justify-center">
        <Table applications={applications} onDelete={handleDelete}/>
      </main>
      <Footer />
    </div>
  );
}

export default Home