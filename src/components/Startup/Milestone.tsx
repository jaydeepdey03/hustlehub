import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { FaTools } from 'react-icons/fa';
// Here we have used react-icons package for the icons
import { FiPackage, FiHome, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const Milestones = (props: any) => {
  const linkColor = 'blue.400';
  const linkHoverColor = 'blue.600';
  const { milestoneArray } = props

  return (
    <VStack textAlign="start" align="start" mb={5}>
      <Box zIndex={5} w="100%">
        <Heading fontSize="xl" fontWeight="600" mb={10} textAlign={"left"}>
          Milestones achieved so far
        </Heading>
        <Box >
          {milestoneArray && milestoneArray.length === 0 && (
            <Box
              w="100%"
              h="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text color={'gray.500'} fontSize={"md"} fontWeight={"normal"} textAlign={"center"}>
                No milestones achieved yet
              </Text>
            </Box>
          )}
          {/* milestone is array of string */}
          {milestoneArray && milestoneArray.map((milestone: any) => (
            <MilestoneItem key={milestone}
              // add skiptrain when index is last
              skipTrail={milestoneArray.indexOf(milestone) === milestoneArray.length - 1}
            >
              <Box mt="1px">
                {milestone}
              </Box>
            </MilestoneItem>
          ))}
        </Box>
      </Box>
    </VStack>

  );
};

interface MilestoneItemProps extends BoxProps {
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue('gray.400', 'gray.500');
  return (
    <Flex minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} mt="8px" pos="relative">
        <Circle
          size={3}
          bg={useColorModeValue('gray.600', 'gray.500')}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box color={color} pos="absolute" left="0.875rem" top="0.875rem" />
        {!skipTrail && <Box w="1px" flex={1} bg={color} />}
      </Flex>
      <Box {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export default Milestones;