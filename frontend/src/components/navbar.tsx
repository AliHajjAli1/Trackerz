import React, { useState } from "react";
import { Dialog } from "@mui/material";

const Navbar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");

  return (
    <nav className="bg-orange-600 opacity-60 text-white px-6 py-4 shadow-md fixed top-0 w-full left-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Trackerz</h1>
          <img
            src="/TrackerzLogo.png"
            alt="Trackerz Logo"
            className="h-8 sm:h-10 md:h-12 bg-white rounded-full shadow-lg"
          />
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="text-orange-600 font-semibold px-4 py-2 bg-white rounded-lg shadow cursor-pointer hover:bg-orange-100 active:scale-95 transition-transform duration-100"
        >
          Add Item
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Item Created:", { name, status });
              setDialogOpen(false);
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
              <option className="text-green-800" value="Pending">Pending</option>
              <option className="text-green-800" value="In Progress">In Progress</option>
              <option className="text-green-800" value="Approved">Approved</option>
              <option className="text-green-800" value="Rejected">Rejected</option>
            </select>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
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
    </nav>
  );
};

export default Navbar;
