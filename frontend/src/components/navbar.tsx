import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom"; 
import { addApplication, type Application } from "../api/apps";
import { getStatusId } from "../functions/getStatus";
import { Snack } from "./Snack";

interface NavbarProps {
  addAvailable?: boolean;
  onAdd: (newApp: Application) => void;
}

const Navbar: React.FC<NavbarProps> = ({ addAvailable, onAdd }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("New");
  const [value, setValue] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [location, setLocation] = useState("");

  const cancelAdd = () => {
    setDialogOpen(false);
    setName("");
    setLocation("");
    setStatus("New");
    setValue(null);
  };

  const onAddSubmit = async(e: React.FormEvent) => {
    
    e.preventDefault();

    const newItem: Application = {
      id: 0,
      name,
      value,
      location,
      createdAt: new Date().toISOString().split("T")[0] + "T00:00:00",
      statusId: getStatusId(status),
      startDate: null,
      endDate: null,
      status: status,
    };

    try {
      const addedApp = await addApplication(newItem);
      onAdd(addedApp ? addedApp : newItem);
      console.log("Added app", addedApp);
    } 
    catch (err) {
      console.error(err);
    }

    console.log("Item Created:", newItem);
    setDialogOpen(false);
    setSnackbarOpen(true);
    setName("");
    setStatus("New");
    setValue(0);
    setLocation("");
  };

  return (
    <nav className="bg-[#f39f6b] text-white px-6 py-4 shadow-md fixed top-0 w-full left-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="focus:outline-none">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">Trackerz</h1>
            <img
              src="/TrackerzLogo.png"
              alt="Trackerz Logo"
              className="h-8 sm:h-10 md:h-12 bg-white rounded-full shadow-lg"
            />
          </div>
        </Link>
        <button
          onClick={() => setDialogOpen(true)}
          style={{ display: addAvailable ? "block" : "none" }}
          className="text-orange-600 font-semibold px-4 py-2 bg-white rounded-lg shadow cursor-pointer hover:bg-orange-100 active:scale-95 transition-transform duration-100 focus:outline-none"
        >
          Add Item{" "}
          <FiPlusCircle className="inline-block ml-2 font-semibold mb-0.5" />
        </button>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-800">
              Create New Item
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details below to create a new item.
            </p>
          </div>

          <form onSubmit={onAddSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <input
              type="text"
              placeholder="Enter value"
              value={value ? value.toString() : ""}
              onChange={(e) => setValue(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 text-green-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
              required
            >
              <option className="text-green-800" value="New">
                New
              </option>
              <option className="text-green-800" value="In Progress">
                In Progress
              </option>
              <option className="text-green-800" value="Approved">
                Approved
              </option>
              <option className="text-green-800" value="Closed">
                Closed
              </option>
              <option className="text-green-800" value="Completed">
                Completed
              </option>
              <option className="text-green-800" value="Site Issues">
                Site Issues
              </option>
              <option className="text-green-800" value="Awaiting PreChecks">
                Awaiting PreChecks
              </option>
              <option
                className="text-green-800"
                value="Additional Documents Required"
              >
                Additional Documents Required
              </option>
              <option className="text-green-800" value="New Quotes Required">
                New Quotes Required
              </option>
            </select>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={cancelAdd}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:scale-95 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-300 active:scale-95 transition duration-150"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Dialog>
      <Snack open={snackbarOpen} text="App created successfully!" setSnackOpen={setSnackbarOpen} />
    </nav>
  );
};

export default Navbar;