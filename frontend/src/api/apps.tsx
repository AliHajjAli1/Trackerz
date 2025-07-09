import axios from 'axios';

export type Application = {
  id: number;
  name: string;
  status: string;
};

export const fetchApplications = async () => {
    try {
        const data = await axios.get<Application[]>(
            `http://localhost:5077/api/applications`
        );
        console.log("Fetched applications:", data);
        console.log("URL:",process.env.REACT_APP_API_URL);
        return data;
    }
    catch(error : any) {
        console.log("error message from API: ", error.message);
    }
};