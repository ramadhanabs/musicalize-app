import { Box, Image, Flex, Text } from '@chakra-ui/react';

interface Icons {
  height: number;
  url: string;
  width: number;
}

interface Props {
  name: string;
  icons: Icons[];
}

const CardCategory = (props: Props) => {
  const { name, icons } = props;
  return (
    <Box p="5" maxW="320px" borderWidth="1px">
      <Image borderRadius="md" src={icons[0].url} />
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {name}
      </Text>
    </Box>
  );
};

export default CardCategory;
