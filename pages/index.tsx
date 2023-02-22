import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { GetServerSideProps, NextPageContext } from "next";
import { Box } from "@chakra-ui/react";
import Chat from "../src/components/Chat/Chat";
import Auth from "../src/components/Auth/Auth";

type Props = {};

function index({}: Props) {
  const { data: session } = useSession();

  const reloadSession = async () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  console.log("session", session);
  return (
    <Box>
      {session?.user.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export default index;

/* server Side Props */

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
