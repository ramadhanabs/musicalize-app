import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import useAuth from '../../utils/hooks/useAuth';
import AppLayout from '../../components/layout';
import CardCategory from '../../components/cards/category';
import axios from 'axios';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  const { accessToken } = useAuth(code);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) return;
        const res = await axios.get('https://api.spotify.com/v1/browse/categories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(res);
        setCategories(res.data.categories.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <Sidebar />
      <AppLayout>
        {categories.length > 0 && categories.map((item) => <CardCategory {...item} />)}
      </AppLayout>
    </div>
  );
};

export default Home;
