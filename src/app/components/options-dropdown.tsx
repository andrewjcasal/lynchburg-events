import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface OptionsDropdownProps {
  deleteEvent?: (id: string) => void;
  editOrganization?: (id: string) => void;
  id: string;
}

export const OptionsDropdown = ({ deleteEvent, id }: OptionsDropdownProps) => {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        size="sm"
        sx={{ maxWidth: "32px", maxHeight: "32px" }}
      >
        <IconButton component="span" variant="plain" color="neutral" size="sm">
          <MoreVertRoundedIcon />
        </IconButton>
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{
          zIndex: "99999",
          p: 1,
          gap: 1,
          "--ListItem-radius": "var(--joy-radius-sm)",
        }}
      >
        {deleteEvent && (
          <MenuItem
            sx={{ textColor: "danger.500" }}
            onClick={() => deleteEvent(id)}
          >
            <DeleteRoundedIcon />
            Delete event
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  );
};
