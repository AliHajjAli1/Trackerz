import axios from 'axios';

export type Application = {
  name: string | null;
  statusId: number | null;
  value: number | null;
  createdAt: string | null;
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