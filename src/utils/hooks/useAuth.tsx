import { useState, useEffect } from 'react';
import axios from 'axios';

interface responseType {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const initialResponse: responseType = {
  accessToken: '',
  refreshToken: '',
  expiresIn: 0
};

const accessToken = localStorage.getItem('accessToken');

export default function useAuth(code: string | null) {
  const [response, setResponse] = useState<responseType>(initialResponse);

  const refreshToken = async () => {
    try {
      const res = await axios.post('http://localhost:3001/refresh');
      localStorage.setItem('accessToken', res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      if (accessToken) return;
      const res = await axios.post('http://localhost:3001/login', { code });
      setResponse({
        accessToken: res.data.accessToken,
        expiresIn: res.data.expiresIn,
        refreshToken: res.data.refreshToken
      });
      localStorage.setItem('accessToken', res.data.accessToken);
    } catch (error) {
      if (error.response.status == 401) {
        refreshToken();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [code]);

  return response;
}
