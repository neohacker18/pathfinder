import { Flex } from '@chakra-ui/react'
import React from 'react'

const Logbar = ({log}) => {
  return (
    <Flex
    bg={'black'}
    color={'limegreen'}
    height={'6vh'}
    alignItems={"center"}
    paddingLeft={'50px'}
    >{log}</Flex>
  )
}

export default Logbar