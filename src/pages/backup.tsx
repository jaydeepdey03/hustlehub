const backup = () => {
    return (
        <div>
            <Heading as="h1" size="lg" isTruncated 
                    color={useColorModeValue('gray.700', 'white')}
                >
                    Startup Page 
                </Heading>

                <Stack
                    color={useColorModeValue('gray.700', 'white')}
                    py={{ base: 4, md: 20 }}
                    px={{ base: 8, md: 10 }}
                    spacing={{ base: 3, md: 14 }}
                    align={'flex-start'}
                    borderBottom="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                    <Heading size="lg" isTruncated
                        color={useColorModeValue('gray.600', 'white')}
                    >
                        Startup Name
                    </Heading>
                    {/* Icon with text */}
                    <HStack>
                        <Icon
                            as={CalendarIcon}
                            color={useColorModeValue('gray.500', 'gray.200')}
                            w={4}
                            h={4}
                            mr={1}
                        />
                        <Text color={'gray.500'} fontSize={"xs"} fontWeight={"normal"}>Started on June 08, 2023</Text>
                    </HStack>
                </Stack>

                <MilestoneItem>
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
          <MilestoneItem>
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
          <MilestoneItem>
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
          <MilestoneItem skipTrail>
            Rebuilt my portfolio website with React, ChakraUI and Framer-motion,{' '}
            <Link
              href="https://github.com/MA-Ahmad/myPortfolio"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
              isExternal
            >
              source on Github
            </Link>
            .
          </MilestoneItem>

          {role === 'investor' ? <Button colorScheme="telegram">Fund</Button> : <Button colorScheme="telegram">Join</Button>}
                            <Button onClick={learnMoreDisclosure.onClose}>Close</Button>
        </div>
    )
}

export default backup
