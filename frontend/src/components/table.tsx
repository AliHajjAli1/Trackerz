import React, { useState, useEffect } from "react";
import {
  FiEdit2,
  FiMoreHorizontal,
  FiTrash,
  FiXCircle,
  FiCheckCircle,
  FiClock,
  FiPlayCircle,
  FiHelpCircle,
} from "react-icons/fi";
import { Menu, MenuItem, Divider, Dialog } from "@mui/material";
import data from "../data/data.json";

interface Item {
  itemName: string;
  status: string;
  inquiries: number;
  createdAt: string;
}

const ITEMS_PER_PAGE = 8;

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const open = Boolean(anchorEl);

  const gotoEditPage = () => {
    if (selectedItemName) {
      window.location.href = `/edit?itemName=${encodeURIComponent(
        selectedItemName
      )}`;
    }
  };

  const handleClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    itemName: string
  ) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setSelectedItemName(itemName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItemName(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    setItems(data);
  }, []);

  const filteredItems = items
    .filter(
      (item) =>
        (statusFilter === "All" || item.status === statusFilter) &&
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.itemName.localeCompare(b.itemName);
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const getIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <FiCheckCircle className="inline-block ml-1 mb-0.5 text-green-600 bg-white rounded-full" />
        );
      case "Pending":
        return (
          <FiPlayCircle className="inline-block ml-1 mb-0.5 text-yellow-600 bg-white rounded-full" />
        );
      case "In Progress":
        return (
          <FiClock className="inline-block ml-1 mb-0.5 text-blue-600 bg-white rounded-full" />
        );
      case "Rejected":
        return (
          <FiXCircle className="inline-block ml-1 mb-0.5 text-red-600 bg-white rounded-full border-gray-300" />
        );
      default:
        return (
          <FiHelpCircle className="inline-block ml-1 mb-0.5 text-gray-600 bg-white rounded-full" />
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-23 px-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Items Table</h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-green-800 font-medium mr-2">
              Filter by Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="text-green-800 font-medium mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "name" | "date");
                setCurrentPage(1);
              }}
              className="p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="date">Created At (Newest)</option>
              <option value="name">Item Name (A–Z)</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-orange-200 rounded-lg">
            <table className="min-w-full divide-y divide-orange-200">
              <thead className="bg-orange-100 text-green-800">
                <tr>
                  <th className="py-3 px-4 text-left">Item Name</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Inquiries</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-100">
                {paginatedItems.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-orange-50 text-orange-600"
                  >
                    <td className="py-2 px-4 font-semibold">{item.itemName}</td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 rounded-full text-sm whitespace-nowrap bg-gray-300 text-gray-800 inline-block text-center font-medium">
                        {item.status} {getIcon(item.status)}
                      </span>
                    </td>
                    <td className="py-2 px-4">{item.inquiries}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-between">
                        {item.createdAt}
                        <FiMoreHorizontal
                          className="text-green-800 cursor-pointer"
                          onClick={(e) => handleClick(e, item.itemName)}
                        />

                        <Menu
                          id="fade-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            sx: { boxShadow: "0px 4px 10px rgba(0,0,0,0.18)" },
                          }}
                        >
                          <MenuItem onClick={gotoEditPage}>
                            Edit <FiEdit2 className="ml-6" />
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleDeleteClick}>
                            Delete <FiTrash className="ml-2 " />
                          </MenuItem>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-row justify-between items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-600 text-white rounded cursor-pointer disabled:opacity-50 hover:bg-orange-700 active:scale-95 transition"
        >
          Previous
        </button>
        <span className="text-green-800 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-orange-600 text-white rounded cursor-pointer disabled:opacity-50 hover:bg-orange-700 active:scale-95 transition"
        >
          Next
        </button>
      </div>

      {openDeleteDialog && (
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Delete Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded mr-2 cursor-pointer hover:bg-gray-300 active:scale-95 transition"
                onClick={handleDeleteDialogClose}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 active:scale-95 transition">
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Table;
