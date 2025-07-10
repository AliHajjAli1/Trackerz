import { useEffect, useState } from "react";
import { FiPlus, FiX, FiXCircle } from "react-icons/fi";
import { Dialog, CircularProgress, Snackbar } from "@mui/material";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Inquiry from "../components/inquiry";
import { fetchApplications, type Application } from "../api/apps";

const Edit = () => {

  interface Inquiry {
    title: string;
    date: string;
    description: string;
  }

  interface Item {
    itemName: string;
    status: string;
    inquiries: number;
    createdAt: string;
    location: string;
    startDate: string;
    endDate: string;
    value: string;
    "inquiries-content"?: Inquiry[];
  }

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [items, setItems] = useState<Application[]>([]);
  const [selectedItem, setSelectedItem] = useState<Application | null>(null);
  const [itemName, setItemName] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const itemNameFromUrl = queryParams.get("itemName") || "";
  console.log("Item Name from URL:", itemNameFromUrl);

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetchApplications();
        if (response && response.data) {
          setApplications(response.data);
        } else {
          setApplications([]);
        }
      } catch (err) {
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  console.log("Applications:", applications);
  console.log("Error", error);

  useEffect(() => {
    setItemName(itemNameFromUrl);
  }, [itemNameFromUrl]);


  useEffect(() => {
    setItems(applications)
  }, [applications]);

  useEffect(() => {
    const found = applications.find((item) => item.name === itemNameFromUrl);
    setSelectedItem(found || null);
  }, [itemNameFromUrl, applications]);

  const getStatus = (statusId: number): string => {
    switch (statusId) {
      case 1:
        return "New";
      case 2:
        return "Awaiting PreChecks";
      case 3:
        return "Approved";
      case 4:
        return "In Progress";
      case 5:
        return "Completed";
      case 6:
        return "Site Issues";
      case 7:
        return "Additional Documents Required";
      case 8:
        return "New Quotes Required";
      case 9:
        return "Closed";
      default:
        return "Unknown";
    }
  };

  const [name, setName] = useState(itemNameFromUrl || "");
  const [status, setStatus] = useState(getStatus(selectedItem?.statusId || 1));
  useEffect(() => {
    setStatus(getStatus(selectedItem?.statusId || 1));
  }, [selectedItem]);

  const submitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setDialogOpen(false);
    setTitle("");
    setDescription("");
  };

  if (loading) {
        return (
          <div className="min-h-screen flex flex-col">
            <Navbar />
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
            <Navbar />
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
      <Navbar />
      <main className="flex-grow flex flex-col space-y-4 items-center justify-center">
        <div className="bg-white rounded-lg border-gray-200 border p-6 space-y-4 md:w-2/5 mt-30">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">
              View/Edit Item
            </h1>
            <p className="text-sm text-gray-500">
              See/Update the details below to edit the item.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Item Created:", { name, status });
            }}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 text-green-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Approved">Approved</option>
              <option value="Closed">Closed</option>
              <option value="Awaiting PreChecks">Awaiting PreChecks</option>
              <option value="Site Issues">Site Issues</option>
              <option value="Additional Documents Required">
                Additional Documents Required
              </option>
              <option value="New Quotes Required">New Quotes Required</option>
              <option value="Completed">Completed</option>
            </select>
            <label className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150">
              Location: {selectedItem ? selectedItem.location : "N/A"}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150">
              Open Date: {new Date(selectedItem?.createdAt || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150">
              Start Date: {new Date(selectedItem?.startDate || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150">
              End Date: {new Date(selectedItem?.endDate || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150">
              Value: {selectedItem ? selectedItem.value : "N/A"}
            </label>
            <div className="flex justify-center space-x-16 pt-2">
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:scale-95 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-300 active:scale-95 transition duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg border-gray-200 border mt-10 p-6 space-y-4 md:w-2/5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">Inquiries</h1>
            <p className="text-sm text-gray-500">
              View and add inquiries for this application.
            </p>
            {selectedItem ? (
              <div className="mt-4">
                <div className="mt-3">
                  {selectedItem["inquiries-content"] &&
                  selectedItem["inquiries-content"].length > 0 ? (
                    <ul className="space-y-4">
                      {selectedItem["inquiries-content"].map((inquiry, i) => (
                        <li key={i}>
                          <Inquiry
                            title={inquiry.title}
                            date={inquiry.date}
                            description={inquiry.description}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-gray-500">
                      No inquiries available.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 italic mt-4">
                No Inquiries yet!
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg focus:outline-none active:scale-95 transition-transform z-50"
      >
        <FiPlus className="text-2xl" />
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">
              Write an Inquiry
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details below to create a new inquiry.
            </p>
          </div>

          <form onSubmit={submitInquiry} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <div className="flex justify-center space-x-16 pt-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:scale-95 transition duration-150"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-300 active:scale-95 transition duration-150"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        message={
          <span style={{ color: "#fff" }}>Inquiry added successfully!</span>
        }
        ContentProps={{
          sx: { backgroundColor: "rgb(9, 130, 54)" },
        }}
        action={
          <FiX
            className="text-white cursor-pointer"
            onClick={() => setSnackbarOpen(false)}
          />
        }
      />
    </div>
  );
};

export default Edit;
