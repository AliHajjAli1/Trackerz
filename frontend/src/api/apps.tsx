import axios from 'axios';

interface Inquiry {
    title: string;
    date: string;
    description: string;
  }

export type Application = {
  name: string | null;
  statusId: number | null;
  value: number | null;
  createdAt: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  "inquiries-content"?: Inquiry[];
};

export const fetchApplications = async () => {
    try {
        const data = await axios.get<Application[]>(
            `http://localhost:5077/api/App`
        );
        console.log("Fetched applications:", data);
        return data;
    }
    catch(error : any) {
        console.log("error message from API: ", error.message);
    }
};