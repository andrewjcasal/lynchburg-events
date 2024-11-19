import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import { AuthenticatorContext } from "./authenticator-context";

interface AuthenicatorProvider {
  children: ReactNode;
}

export const AuthenticatorProvider = ({ children }: AuthenicatorProvider) => {
  return (
    <Authenticator>
      {({ user }) => (
        <AuthenticatorContext.Provider value={user}>
          {children}
        </AuthenticatorContext.Provider>
      )}
    </Authenticator>
  );
};
