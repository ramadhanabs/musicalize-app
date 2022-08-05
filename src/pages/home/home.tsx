import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import useAuth from '../../utils/hooks/useAuth';
import AppLayout from '../../components/layout';
import CardCategory from '../../components/cards/category';
import { SimpleGrid, Button, Heading, Center } from '@chakra-ui/react';
import axios from 'axios';

const code = new URLSearchParams(window.location.search).get('code');

interface Params {
  offset: number;
  limit: number;
  total: number;
  previous: string | null;
  next: string | null;
}

interface Categories {
  href: string;
  id: string;
  name: string;
  icons: any[];
}

const Home = () => {
  useAuth(code);

  const accessToken = localStorage.getItem('accessToken');

  const [categories, setCategories] = useState<Categories[]>([]);
  const [params, setParams] = useState<Params>({
    offset: 0,
    limit: 10,
    total: 0,
    previous: null,
    next: null
  });

  const fetchData = async () => {
    try {
      if (!accessToken) return;
      const res = await axios.get('https://api.spotify.com/v1/browse/categories', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          offset: params.offset,
          limit: params.limit,
          country: 'US'
        }
      });

      setCategories((previous) => [...previous, ...res.data.categories.items]);
      setParams(() => ({
        ...params,
        offset: params.offset + res.data.categories.limit,
        total: res.data.categories.total,
        next: res.data.categories.next,
        previous: res.data.categories.previous
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  return (
    <div>
      <Sidebar />
      <AppLayout>
        <Heading fontSize="2xl" mb={3}>
          Categories
        </Heading>
        <SimpleGrid columns={5} spacing={5}>
          {categories.length > 0 && categories.map((item) => <CardCategory {...item} />)}
        </SimpleGrid>
        <Center>
          <Button colorScheme="teal" variant="outline" size="lg" onClick={fetchData}>
            Load More
          </Button>
        </Center>
      </AppLayout>
    </div>
  );
};

export default Home;
