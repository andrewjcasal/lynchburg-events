import { Box, Button, FormControl, Input, Stack, Typography } from "@mui/joy";
import { generateClient } from "aws-amplify/data";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import * as amplitude from "@amplitude/analytics-browser";

import { Schema } from "../../../amplify/data/resource";
import { useState } from "react";
import { Tag } from "../types";
import { Modal } from "./modal";

const client = generateClient<Schema>();

interface MyTagsProps {
  tags: Tag[];
}

export const MyTags = ({ tags: initTags }: MyTagsProps) => {
  const [currTag, setCurrTag] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>(initTags);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currTagToDelete, setCurrTagToDelete] = useState<string>("");

  const handleDeleteTag = async (id: string) => {
    await client.models.Tag.delete({ id });
    setTags(tags.filter((tag) => tag.id !== id));
    handleCloseDeleteModal();
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrTag(e.target.value);
    amplitude.track("Sign Up");
  };

  const createTag = async () => {
    const response = await client.models.Tag.create(
      { content: currTag },
      { selectionSet: ["content"] }
    );
    const data = response.data as Tag;
    setTags([...tags, data]);
    setCurrTag("");
  };

  const handleDeleteTagModal = (tagId: string) => {
    setIsDeleteModalOpen(true);
    setCurrTagToDelete(tagId);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Box
      sx={{
        pl: 2,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="h2">My tags</Typography>
      <Typography level="title-lg">Add a tag</Typography>
      <Stack direction="row" spacing={2}>
        <FormControl>
          <Input value={currTag} onChange={handleTagChange} />
        </FormControl>
        <Button onClick={createTag}>Save</Button>
      </Stack>
      <ul>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              {tag.content}
              <DeleteRoundedIcon onClick={() => handleDeleteTagModal(tag.id)} />
            </li>
          ))}
      </ul>
      <Modal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        heading="Delete tag"
      >
        <Typography level="title-lg">
          Are you sure you want to delete this tag?
        </Typography>
        <Button onClick={() => handleDeleteTag(currTagToDelete)}>Yes</Button>
        <Button onClick={handleCloseDeleteModal}>No</Button>
      </Modal>
    </Box>
  );
};
