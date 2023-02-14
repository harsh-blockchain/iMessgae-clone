import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

type Props = {};

function index({}: Props) {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div>
      {session ? (
        <div>
          <div>Logged in as {session.user?.email}</div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <div>Not signed in</div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
}

export default index;

/* server Side Props */
