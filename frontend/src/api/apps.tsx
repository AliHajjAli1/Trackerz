import axios from 'axios';

export type Application = {
  id: number;
  name: string | null;
  statusId: number | null;
  value: number | null;
  createdAt: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  status?: string;
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

export const addApplication = async (application: Application) => {
    try {
        const response = await axios.post<Application>(
            `http://localhost:5077/api/App`,
            application
        );
        console.log("Added application:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error adding application:", error.message);
    }
};

export const updateApplication = async (application: Application) => {
    try {
        const response = await axios.put<Application>(
            `http://localhost:5077/api/App/${application.id}`,
            application
        );
        console.log("Updated application:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error updating application:", error.message);
    }
};

export const deleteApplication = async (id: number) => {
    try {
        await axios.delete(`http://localhost:5077/api/App/${id}`);
        console.log("Deleted application with id:", id);
    } catch (error: any) {
        console.error("Error deleting application:", error.message);
    }
};