import { FiXCircle, FiCheckCircle, FiClock, FiPlayCircle, FiHelpCircle, FiAlertCircle,
FiSmile, FiTarget, FiPieChart, FiMinusCircle } from "react-icons/fi";

export const getIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return (
        <FiCheckCircle className="inline-block ml-1 mb-0.5 text-green-600 bg-white rounded-full" />
      );
    case "New":
      return (
        <FiPlayCircle className="inline-block ml-1 mb-0.5 text-yellow-600 bg-white rounded-full" />
      );
    case "In Progress":
      return (
        <FiClock className="inline-block ml-1 mb-0.5 text-blue-600 bg-white rounded-full" />
      );
    case "Closed":
      return (
        <FiXCircle className="inline-block ml-1 mb-0.5 text-red-600 bg-white rounded-full border-gray-300" />
      );
    case "Completed":
      return (
        <FiSmile className="inline-block ml-1 mb-0.5 text-pink-400 bg-white rounded-full" />
      );
    case "New Quotes Required":
      return (
        <FiAlertCircle className="inline-block ml-1 mb-0.5 text-purple-600 bg-white rounded-full" />
      );
    case "Awaiting PreChecks":
      return (
        <FiTarget className="inline-block ml-1 mb-0.5 text-gray-600 bg-white rounded-full" />
      );
    case "Site Issues":
      return (
        <FiMinusCircle className="inline-block ml-1 mb-0.5 text-amber-800 bg-white rounded-full" />
      );
    case "Additional Documents Required":
      return (
        <FiPieChart className="inline-block ml-1 mb-0.5 text-sky-400 bg-white rounded-full" />
      );
    default:
      return (
        <FiHelpCircle className="inline-block ml-1 mb-0.5 text-gray-600 bg-white rounded-full" />
      );
  }
};