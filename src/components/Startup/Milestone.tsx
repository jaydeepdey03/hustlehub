import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { FaTools } from 'react-icons/fa';
// Here we have used react-icons package for the icons
import { FiPackage, FiHome, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const Milestones = (props: any) => {
  const linkColor = 'blue.400';
  const linkHoverColor = 'blue.600';
  const { milestoneArray } = props

  return (
    <Container maxW="7xl">
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5}>
          <Box>
            {milestoneArray.length === 0 &&
              <Heading size="sm" as="b" textAlign={"center"} mb={2}>
                No Milestones as of now
              </Heading>
            }
            {milestoneArray.map(() => (
              <MilestoneItem icon={FaTools}>
                Learnt{' '}
                <Link
                  href="https://www.typescriptlang.org"
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  isExternal
                >
                  Typescript
                </Link>{' '}
                and{' '}
                <Link
                  href="https://nextjs.org"
                  color={linkColor}
                  _hover={{ color: linkHoverColor }}
                  isExternal
                >
                  Next.js
                </Link>
              </MilestoneItem>
            ))}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

interface MilestoneItemProps extends BoxProps {
  icon?: any;
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue('gray.700', 'gray.500');
  return (
    <Flex minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue('gray.600', 'gray.500')}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box as={icon} size="1.25rem" color={color} pos="absolute" left="0.875rem" top="0.875rem" />
        {!skipTrail && <Box w="1px" flex={1} bg={color} my={1} />}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export default Milestones;