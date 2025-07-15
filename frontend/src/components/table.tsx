import React, { useState, useEffect, useMemo } from "react";
import { FiEdit2, FiMoreHorizontal, FiTrash } from "react-icons/fi";
import { Menu, MenuItem, Divider, Dialog } from "@mui/material";
import { deleteApplication, type Application } from "../api/apps";
import { getStatus } from "../functions/getStatus";
import { getIcon } from "../functions/getIcon";
import { Snack } from "./Snack";
import { Filter } from "./filter";

interface Item {
  itemName: string | null;
  status: string | null;
  value: number | null;
  createdAt: Date | null;
}

type Props = {
  applications: Application[];
  onDelete: (id: number) => void; 
};

const ITEMS_PER_PAGE = 8;

const Table: React.FC<Props> = ({ applications, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "date-newest" | "date-oldest">("date-newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  const gotoEditPage = () => {
    if (selectedItemName) {
      window.location.href = `/edit?itemName=${encodeURIComponent(
        selectedItemName
      )}`;
    }
  };

  const handleDeleteApp = async () => {
    if (selectedItemName) {
      let id = applications.find(app => app.name === selectedItemName)?.id || 0;
      await deleteApplication(id);
      onDelete(id);
      handleClose();
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
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
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setAnchorEl(null);
  };

  const handleFilter = (str: string) => {
    setStatusFilter(str);
    setCurrentPage(1);
  }

  const handleSort = (str: string) => {
    setSortBy(str as | "name-asc" | "name-desc" | "date-newest" | "date-oldest");
    setCurrentPage(1);
  }

  const handleSearch = (str: string) => {
    setSearchTerm(str);
    if (str.startsWith("@")) {
      const afterAt = str.slice(1);
      const num = Number(afterAt);
      if (!isNaN(num) && Number.isInteger(num)) {
        const clampedPage = Math.max(1, Math.min(num, totalPages || 1));
        setCurrentPage(clampedPage);
        setSearchQuery("");
      } 
      else {
        setSearchQuery(str);
        setCurrentPage(1);
      }
    } 
    else {
      setSearchQuery(str);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    setItems(applications.map((app) => ({
      itemName: app.name,
      status: getStatus(app.statusId || 1),
      value: app.value,
      createdAt: app.createdAt ? new Date(app.createdAt) : null,
    })));
  }, [applications]);

  const filteredItems = useMemo(() => {
    return items
      .filter(
        (item) =>
          (statusFilter === "All" || item.status === statusFilter) &&
          item.itemName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const aName = a.itemName || "";
        const bName = b.itemName || "";

        const aStartsWithLetter = /^[a-zA-Z]/.test(aName);
        const bStartsWithLetter = /^[a-zA-Z]/.test(bName);

        switch (sortBy) {
          case "name-asc":
            if (aStartsWithLetter && !bStartsWithLetter) return -1;
            if (!aStartsWithLetter && bStartsWithLetter) return 1;
            return aName.localeCompare(bName, "en", {
              numeric: true,
              sensitivity: "base",
            });

          case "name-desc":
            if (aStartsWithLetter && !bStartsWithLetter) return 1;
            if (!aStartsWithLetter && bStartsWithLetter) return -1;
            return bName.localeCompare(aName, "en", {
              numeric: true,
              sensitivity: "base",
            });

          case "date-oldest":
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return a.createdAt.getTime() - b.createdAt.getTime();

          case "date-newest":
          default:
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });
  }, [items, statusFilter, searchQuery, sortBy]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full md:w-2/3 mt-23 px-4">
      <h1 className="text-2xl font-bold text-[#f39f6b] mb-4">Applications Table</h1>
      <Filter filterValue={statusFilter} filterOnChange={handleFilter} sortValue={sortBy}
       sortOnChange={handleSort} searchValue={searchTerm} searchOnChange={handleSearch}/>
      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-orange-200 rounded-lg">
            <table className="min-w-full divide-y divide-orange-200 table-auto">
              <thead className="bg-orange-100 text-green-800">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Value</th>
                  <th className="py-3 px-4 text-left">Date</th>
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
                        {item.status} {getIcon(item.status ? item.status : "")}
                      </span>
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      {item.value ? item.value : 0} $
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-between">
                        {item.createdAt ? item.createdAt.toLocaleDateString("en-UK") : ""}
                        <FiMoreHorizontal
                          className=" ml-3 text-green-800 cursor-pointer"
                          onClick={(e) => handleClick(e, item.itemName || "")}
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
                            Delete <FiTrash className="ml-2" />
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
          className={`px-4 py-2 bg-[#f39f6b] text-white rounded active:scale-95 transition
            ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-orange-600"}`}
        >
          Previous
        </button>
        <span className="text-green-800 font-medium">
          Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-[#f39f6b] text-white rounded active:scale-95 transition
            ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-orange-600"}`}
        >
          Next
        </button>
      </div>

      {openDeleteDialog && (
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Delete Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded mr-2 cursor-pointer hover:bg-gray-300 active:scale-95 transition"
                onClick={handleDeleteDialogClose}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteApp}
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 active:scale-95 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
      <Snack
        open={snackbarOpen}
        text="App deleted successfully!"
        setSnackOpen={setSnackbarOpen}
      />
    </div>
  );
};

export default Table;