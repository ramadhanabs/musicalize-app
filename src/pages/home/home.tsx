import { useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import useAuth from '../../utils/hooks/useAuth';
import axios from 'axios';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  const { accessToken } = useAuth(code);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) return;
        const res = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
