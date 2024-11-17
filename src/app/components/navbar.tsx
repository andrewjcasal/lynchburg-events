import { Box, Button, Stack } from "@mui/joy";

const arr = [
  { label: "Gaming", href: "gaming" },
  { label: "Family Friendly", href: "family-friendly" },
  { label: "Crafts", href: "crafts" },
  { label: "Dancing", href: "dancing" },
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
        {arr.map((item) => (
          <Button
            key={item.label}
            variant="plain"
            color="neutral"
            aria-pressed={currPage === item.href}
            component="a"
            href={`/category/${item.href}`}
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
