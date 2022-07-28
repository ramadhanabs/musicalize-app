import { Box, Text } from '@chakra-ui/react';
import { FiHome, FiTrendingUp } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './nav-item';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Home',
    icon: FiHome,
    route: '/home'
  },
  {
    name: 'Trending',
    icon: FiTrendingUp,
    route: '/trending'
  }
];

const Sidebar = () => {
  return (
    <Box
      minH="100vh"
      bg="gray.800"
      color="white"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      borderRight="1px"
      borderRightColor="gray.700"
      p={5}>
      <>
        <Text fontSize="xl" mb={3}>
          Musicalize
        </Text>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} route={link.route}>
            {link.name}
          </NavItem>
        ))}
      </>
    </Box>
  );
};

export default Sidebar;
