import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
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
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

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
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Items Table</h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-green-800 font-medium mr-2">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="date">Created At (Newest)</option>
              <option value="name">Item Name (A–Z)</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-orange-200 shadow-md rounded-lg">
          <thead className="bg-orange-100 text-green-800">
            <tr>
              <th className="py-3 px-4 border-b border-orange-200 text-left">Item Name</th>
              <th className="py-3 px-4 border-b border-orange-200 text-left">Status</th>
              <th className="py-3 px-4 border-b border-orange-200 text-left">Inquiries</th>
              <th className="py-3 px-4 border-b border-orange-200 text-left">Created At</th>
              <th className="py-3 px-4 border-b border-orange-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={index} className="hover:bg-orange-50 text-orange-600 relative">
                <td className="py-2 px-4 border-b border-orange-100 font-semibold">{item.itemName}</td>
                <td className="py-2 px-4 border-b border-orange-100">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-orange-100">{item.inquiries}</td>
                <td className="py-2 px-4 border-b border-orange-100">{item.createdAt}</td>
                <td className="py-2 px-4 border-b border-orange-100 relative">
                  <button
                    onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                    className="text-2xl text-orange-600 hover:text-orange-800"
                  >
                    <FiMoreVertical />
                  </button>
                  {openMenuIndex === index && (
                    <div className="absolute right-4 top-10 z-10 bg-white border border-orange-200 shadow-md rounded-md w-28">
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-100">Edit</button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-100">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {paginatedItems.length < ITEMS_PER_PAGE &&
              Array.from({ length: ITEMS_PER_PAGE - paginatedItems.length }).map((_, idx) => (
                <tr key={`empty-${idx}`}>
                  <td className="py-2 px-4 border-b border-orange-100">&nbsp;</td>
                  <td className="py-2 px-4 border-b border-orange-100"></td>
                  <td className="py-2 px-4 border-b border-orange-100"></td>
                  <td className="py-2 px-4 border-b border-orange-100"></td>
                  <td className="py-2 px-4 border-b border-orange-100"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50 hover:bg-orange-700 active:scale-95 transition"
        >
          Previous
        </button>
        <span className="text-green-800 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50 hover:bg-orange-700 active:scale-95 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
