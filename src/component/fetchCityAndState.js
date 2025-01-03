// utils/pincodeApi.js
import axiosInstance from './axiosInstance';

export const fetchCityAndState = async (pinCode) => {
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
        try {
            const response = await axiosInstance.post(`/api/get-address`, {
                pinCode: pinCode,
            });

            if (response.data?.success) {
                const { District, State } = response.data.info;
                return { city: District, state: State };
            } else {
                console.error("API returned unsuccessful response:", response.data);
                return null;
            }
        } catch (error) {
            console.error("Error fetching city and state:", error);
            return null;
        }
    }
    return null;
};
