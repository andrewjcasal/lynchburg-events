import { CssVarsProvider, Box, CssBaseline } from "@mui/joy";
import { ReactNode } from "react";
import { LeftNav } from "./left-nav";
import { Navbar } from "./navbar";
import { RightNav } from "./right-nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box
        sx={[
          {
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "minmax(100px, 1fr) minmax(500px, 1000px) minmax(100px,1fr)",
            },
            gridTemplateRows: "1fr",
            minHeight: "100vh",
          },
        ]}
      >
        <LeftNav />
        <Box
          className="Inbox"
          sx={[
            {
              bgcolor: "background.surface",
              borderRight: "1px solid",
              borderColor: "divider",
              display: {
                xs: "initial",
              },
            },
          ]}
        >
          <Navbar />
          {children}
        </Box>
        <RightNav />
      </Box>
    </CssVarsProvider>
  );
};
