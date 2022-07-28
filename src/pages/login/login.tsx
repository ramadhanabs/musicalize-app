import { Text, Button, Box, Link } from '@chakra-ui/react';
import axios from 'axios';

const URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '1f9e862d3b4d4e8ea1e7b29d9f28fbea';
const REDIRECT_URI = 'http://127.0.0.1:3000';
const RESPONSE_TYPE = 'code';

const requestUrl = `${URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`;

const Login = () => {
  const handleOpenLink = async () => {
    window.open(requestUrl, '_self');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="full"
      h="100vh">
      <Text fontSize="xl" mb={3}>
        Login your spotify app here.
      </Text>
      <Button colorScheme="teal" variant="outline" size="lg" onClick={handleOpenLink}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
