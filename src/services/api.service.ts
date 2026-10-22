const API = process.env.NEXT_PUBLIC_UPLOAD_API
import axios from "axios"

export default async function uploadResume(formData: FormData) {
    if (!API) {
        throw new Error("api url is not defined")
    }
    try {
        const response = await axios.post(API, formData)
        return response.data;
    }
    catch (error: any) {
        if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail)
        }
        console.error("Error uploading resume:", error);
        throw error;
    }
}