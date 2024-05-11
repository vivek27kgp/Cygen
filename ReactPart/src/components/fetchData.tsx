import axiosInstance from "./AxiosInstance";

// Define the fetchData function outside of your component
const fetchData = async (endpoint: any, setCategoryData: (arg0: any) => void, setError: (arg0: string) => void, setIsLoading: (arg0: boolean) => void) => {
    try {
        setIsLoading(true);
        // Make a GET request to the provided endpoint
        const response = await axiosInstance.get(endpoint);
        // Check if the request was successful
        if (response.status === 200) {
            // Set the fetched data in state
            setCategoryData(response.data);
            setError('');
        } else {
            setError('Failed to fetch data');
        }
    } catch (error) {
        setError('Failed to fetch data');
    } finally {
        setIsLoading(false);
    }
};

export default fetchData;
