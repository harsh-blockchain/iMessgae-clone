import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

interface Props {
  count: number;
  height: string;
  width?: string;
}

function SkeletonLoader({ count, height, width }: Props) {
  return (
    <Box display="flex" flexDirection="column" mt={6}>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          height={height}
          width={width}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.300"
          borderRadius="lg"
          my={1}
          mx={3}
        />
      ))}
    </Box>
  );
}

export default SkeletonLoader;
