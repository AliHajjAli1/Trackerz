export const getStatus = (statusId: number): string => {
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

export const getStatusId = (status: string): number => {
  switch (status) {
    case "New":
      return 1;
    case "Awaiting PreChecks":
      return 2;
    case "Approved":
      return 3;
    case "In Progress":
      return 4;
    case "Completed":
      return 5;
    case "Site Issues":
      return 6;
    case "Additional Documents Required":
      return 7;
    case "New Quotes Required":
      return 8;
    case "Closed":
      return 9;
    default:
      return 1;
  }
};