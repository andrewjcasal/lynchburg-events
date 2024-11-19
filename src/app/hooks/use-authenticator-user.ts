import { fetchAuthSession } from "aws-amplify/auth";
import { useContext, useEffect, useState } from "react";
import { AuthenticatorContext } from "../context/authenticator-context";

export const useAuthenticatorUser = () => {
  const context = useContext(AuthenticatorContext);
  const [isAdmin, setIsAdmin] = useState(false);
  if (context === undefined) {
    throw new Error(
      "useAuthenticatorUser must be used within an AuthenticatorProvider"
    );
  }

  useEffect(() => {
    fetchAuthSession().then((auth) =>
      setIsAdmin(
        (
          auth.tokens?.idToken?.payload["cognito:groups"] as Array<string>
        ).includes("admin")
      )
    );
  }, []);

  return { isAdmin };
};
