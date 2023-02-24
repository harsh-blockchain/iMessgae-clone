import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import userOperations from "../../operations/user";
import { useMutation } from "@apollo/client";
import { createUsernameData, createUsernamevariables } from "../../utils/types";
import { toast } from "react-hot-toast";

type Props = {};

export interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: IAuthProps) {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { data, error, loading }] = useMutation<
    createUsernameData,
    createUsernamevariables
  >(userOperations.Mutation.createUsername);

  const onSubmit = async () => {
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error("Error creating username");
      }

      if (data?.createUsername?.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success("Username created successfully 🚀", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      reloadSession();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div>
      <Center height="100vh">
        <Stack align="center" spacing={6}>
          {session ? (
            <>
              <Image height="100px" src="/imessage-logo.png" />
              <Text fontSize="3xl">Create a Username</Text>
              <Input
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button onClick={onSubmit} width="100%" isLoading={loading}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="3xl">MessengerQL</Text>
              <Button
                onClick={() => signIn("google")}
                leftIcon={<Image height="20px" src="/googlelogo.png" />}
              >
                Continue with Google
              </Button>
              <Button
                onClick={() => signIn("linkedin")}
                leftIcon={<Image height="20px" src="/linkedin.png" />}
              >
                Continue with Linkedin
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </div>
  );
}
