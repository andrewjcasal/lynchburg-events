import { Box } from "@mui/joy";

export const RightNav = () => (
  <Box
    component="nav"
    className="Navigation"
    sx={[
      {
        p: 2,
        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        display: {
          xs: "none",
          md: "initial",
        },
      },
    ]}
  ></Box>
);
