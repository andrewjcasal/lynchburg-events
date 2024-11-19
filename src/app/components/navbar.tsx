import { Box, Button, Stack } from "@mui/joy";

const arr = [
  { label: "Today", href: "/today" },
  { label: "Gaming", href: "/category/gaming" },
  { label: "Family Friendly", href: "/category/family-friendly" },
  { label: "Crafts", href: "/category/crafts" },
  { label: "Dancing", href: "/category/dancing" },
];

interface NavbarProps {
  currPage?: string;
}

export const Navbar = ({ currPage }: NavbarProps) => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        bgcolor: "background.surface",
        flexGrow: 1,
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        {arr &&
          arr.map((item) => (
            <Button
              key={item.label}
              variant="plain"
              color="neutral"
              aria-pressed={currPage === item.href}
              component="a"
              href={item.href}
              size="sm"
              sx={{ alignSelf: "center" }}
            >
              {item.label}
            </Button>
          ))}
      </Stack>
    </Box>
  );
};
