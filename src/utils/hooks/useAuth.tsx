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

export default function useAuth(code: string | null) {
  const [response, setResponse] = useState<responseType>(initialResponse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:3001/login', { code });
        setResponse({
          accessToken: res.data.accessToken,
          expiresIn: res.data.expiresIn,
          refreshToken: res.data.refreshToken
        });
      } catch (error) {
        console.log(error);
        window.open('/login', '_self');
      }
    };

    fetchData();
  }, [code]);

  return response;
}
