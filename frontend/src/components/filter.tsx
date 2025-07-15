interface filterProps {
  filterValue: string;
  filterOnChange: (e: string) => void;
  sortValue: string;
  sortOnChange: (e: string) => void;
  searchValue: string;
  searchOnChange: (e: string) => void;
}

export const Filter: React.FC<filterProps> = ({filterValue, filterOnChange, sortValue, sortOnChange, searchValue, searchOnChange}) => {
  return (
    <div className="flex flex-col sm:flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center w-full md:w-auto">
          <label className="text-green-800 font-medium mr-2">Filter:</label>
          <select
            value={filterValue}
            onChange={(e) => filterOnChange(e.target.value)}
            className="p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
          >
            <option value="All">All</option>
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
        </div>

        <div className="flex items-center w-full md:w-auto">
          <label className="text-green-800 font-medium mr-2">Sort:</label>
          <select
            value={sortValue}
            onChange={(e) => sortOnChange(e.target.value)}
            className="p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
          >
            <option value="date-newest">Newest – Oldest</option>
            <option value="date-oldest">Oldest – Newest</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <label className="text-green-800 font-medium mr-2">Search:</label>
          <input
            type="search"
            spellCheck={true}
            placeholder="Search or type @Page number"
            value={searchValue}
            onChange={(e) => searchOnChange(e.target.value)}
            className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-lg md:placeholder:text-xs"
          />
        </div>
      </div>
    </div>
  );
};