import { useEffect, useState } from "react";
import { FiPlus, FiXCircle } from "react-icons/fi";
import { Dialog, CircularProgress, Skeleton } from "@mui/material";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Inquiry from "../components/inquiry";
import { fetchApplications, updateApplication, type Application } from "../api/apps";
import { fetchInquiries, addInquiry, type Inquiries } from "../api/inquiries";
import { getStatus, getStatusId } from "../functions/getStatus";
import { Snack } from "../components/Snack";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [selectedItem, setSelectedItem] = useState<Application | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const itemNameFromUrl = queryParams.get("itemName") || "";
  console.log("Item Name from URL:", itemNameFromUrl);

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Trackerz - Edit";
  }, []);

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
    const found = applications.find((item) => item.name === itemNameFromUrl);
    setSelectedItem(found || null);
  }, [itemNameFromUrl, applications]);

  const [name, setName] = useState(itemNameFromUrl || "");
  const [status, setStatus] = useState(getStatus(selectedItem?.statusId || 1));
  useEffect(() => {
    setStatus(getStatus(selectedItem?.statusId || 1));
  }, [selectedItem]);

  const [inquiries, setInquiries] = useState<Inquiries[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [inquiriesError, setInquiriesError] = useState<string | null>(null);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const response = await fetchInquiries();
        if (response && response.data) {
          setInquiries(response.data);
        } 
        else {
          setInquiries([]);
        }
      } 
      catch (err) {
        setInquiriesError("Failed to fetch inquiries");
      } 
      finally {
        setInquiriesLoading(false);
      }
    };

    loadInquiries();
  }, []);

  console.log("Inquiries:", inquiries);
  console.log("Inquiries Error", inquiriesError);

  const relatedInquiries = inquiries.filter(
    (inq) => inq.applicationId === selectedItem?.id
  );

  console.log("Related Inquiries:", relatedInquiries);
  console.log("selected", selectedItem);

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const edittedApp: Application = {
      id: selectedItem?.id || 0,
      name,
      value: selectedItem?.value || null,
      statusId: getStatusId(status),
      status,
      location: selectedItem?.location || null,
      startDate: selectedItem?.startDate || null,
      endDate: selectedItem?.endDate || null,
      createdAt: selectedItem?.createdAt || null
    }

    try {
      await updateApplication(edittedApp);
      console.log("Updated app: ", edittedApp);
      setSnackBarText("App updated successfully!");
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  const refreshInqs = ( inquiry: Inquiries) => {
    setInquiries((prev)=>[...prev, inquiry])
  }

  const addNewInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: Inquiries = {
      id: 0,
      subject: title,
      inquiryText: description,
      askedDt: new Date().toISOString().split("T")[0] + "T00:00:00",
      applicationId: selectedItem?.id || 0,
    };

    try {
      const addedInquiry = await addInquiry(newInquiry);
      console.log("Added inquiry", addedInquiry);
    } catch (err) {
      console.error(err);
    }

    console.log("Inquiry Created:", newInquiry);
    setSnackBarText("Inquiry added successfully!")
    refreshInqs(newInquiry);
    setSnackbarOpen(true);
    setDialogOpen(false);
    setTitle("");
    setDescription("");
  };

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
      <Navbar onAdd={() => {}} />
      <main className="flex-grow flex flex-col space-y-4 items-center justify-center">
        <div className="bg-white rounded-lg border-gray-200 border p-6 space-y-4 w-9/10 md:w-2/5 mt-30">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">
              View/Edit Item
            </h1>
            <p className="text-sm text-gray-500">
              See/Update the details below to edit the item.
            </p>
          </div>

          <form
            onSubmit={submitEdit}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              spellCheck={true}
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
              <option value="Additional Documents Required">Additional Documents Required</option>
              <option value="New Quotes Required">New Quotes Required</option>
              <option value="Completed">Completed</option>
            </select>
            <label className="border border-gray-300 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed">
              Location: {selectedItem ? selectedItem.location : "N/A"}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed">
              Open Date:{" "}
              {new Date(selectedItem?.createdAt || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed">
              Start Date:{" "}
              {new Date(selectedItem?.startDate || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed">
              End Date:{" "}
              {new Date(selectedItem?.endDate || "").toLocaleDateString("en-UK")}
            </label>
            <label className="border border-gray-300 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed">
              Value: {selectedItem ? selectedItem.value : "N/A"}
            </label>
            <div className="flex justify-center space-x-16 pt-2">
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 active:scale-95 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white cursor-pointer rounded hover:bg-orange-300 active:scale-95 transition duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg border-gray-200 border mt-10 p-6 space-y-4 w-9/10 md:w-2/5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">Inquiries</h1>
            <p className="text-sm text-gray-500">
              View and add inquiries for this application.
            </p>
            {inquiriesLoading ? (
              <div className="mt-4 space-y-4">
                <Skeleton variant="text" width={"50%"} height={"4%"} />
                <Skeleton variant="text" width={"40%"} height={"3%"} />
                <Skeleton variant="text" width={"70%"} height={"5%"} />
              </div>
            ) : (
              <>
                {relatedInquiries.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {relatedInquiries.map((inq) => (
                      <li key={inq.id}>
                        <Inquiry
                          title={inq.subject}
                          description={inq.inquiryText}
                          date={new Date(inq.askedDt).toLocaleDateString(
                            "en-UK"
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4">
                    No inquiries found for this application.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-600 cursor-pointer hover:bg-orange-500 text-white p-4 rounded-full shadow-lg focus:outline-none active:scale-95 transition-transform z-50"
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

          <form onSubmit={addNewInquiry} className="flex flex-col space-y-4">
            <input
              type="text"
              spellCheck={true}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <input
              type="text"
              placeholder="Description"
              spellCheck={true}
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
      <Snack open = {snackbarOpen} text={snackBarText} setSnackOpen={setSnackbarOpen} />
    </div>
  );
};

export default Edit;