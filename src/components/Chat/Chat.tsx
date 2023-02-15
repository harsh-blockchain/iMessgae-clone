import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";

type Props = {};

function Chat({}: Props) {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}

export default Chat;
