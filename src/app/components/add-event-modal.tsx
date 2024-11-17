import { Button, FormControl, FormLabel, Input } from "@mui/joy";

import { Modal } from "./modal";

interface AddEventModalProps {
  organization: any;
  currEvent: string;
  cost: string;
  startTime: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createEvent: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const AddEventModal = ({
  organization,
  currEvent,
  cost,
  startTime,
  handleChange,
  createEvent,
  isModalOpen,
  setIsModalOpen,
}: AddEventModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      heading="Add event"
      subheading={organization.content}
    >
      <FormControl>
        <FormLabel>Event Name</FormLabel>
        <Input name="currEvent" value={currEvent} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Cost</FormLabel>
        <Input name="cost" value={cost} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Start Time</FormLabel>
        <Input name="startTime" value={startTime} onChange={handleChange} />
      </FormControl>
      <Button onClick={createEvent}>Save</Button>
    </Modal>
  );
};
