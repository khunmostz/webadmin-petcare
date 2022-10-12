import React from "react";
import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
function Nav() {
  return (
    <Box className="max-w-full flex justify-between m-4 justify-items-center">
      <Box>
        <Typography className="text-lg font-bold text-orange-300">
          <Link href="">Petcare </Link>
          <PetsIcon className="text-orange-300" />
        </Typography>
      </Box>
      {/* <Box className="flex ">
        <Box className="pr-4 px-5 py-1 text-sm text-gray-400">
          Already have an account?
        </Box>
        <Link href="">
          <Button className="bg-orange-300 text-medium text-md text-black border border-orange-500 px-5 py-1 hover:bg-orange-400 hover:text-white">
            Sign In
          </Button>
        </Link>
      </Box> */}
    </Box>
  );
}

export default Nav;
