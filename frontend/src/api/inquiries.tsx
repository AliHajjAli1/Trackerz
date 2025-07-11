import axios from 'axios';

export type Inquiries = {
    id: number;
    subject: string;
    askedDt: string;
    inquiryText: string;
    applicationId: number
}

export const fetchInquiries = async () => {
    try {
        const data = await axios.get<Inquiries[]>(
            `http://localhost:5077/api/Inquiries`
        );
        console.log("Fetched inquiries:", data);
        return data;
    }
    catch(error : any) {
        console.log("error message from Inquiries API: ", error.message);
    }
};

export const addInquiry = async (inquiry : Inquiries) => {
    try {
        const response = await axios.post<Inquiries>(
            `http://localhost:5077/api/Inquiries`,
            inquiry
        );
        console.log("Added inquiry:", response.data);
        return response.data;
    } catch (error) {
        
    }
}