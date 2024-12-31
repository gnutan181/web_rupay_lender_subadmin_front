import { useState, useEffect } from 'react';
import axiosInstance from '../component/axiosInstance';

const useGetId = () => {
  const [userId, setUserId] = useState('');

  const getId = async () => {
    try {
      const response = await axiosInstance.get('/admin/get-id');
      setUserId(response.data); // Assuming the ID is in response.data
      // console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
    }
  };

  useEffect(() => {
    getId();
  }, []);

  return userId;
};

export default useGetId;
