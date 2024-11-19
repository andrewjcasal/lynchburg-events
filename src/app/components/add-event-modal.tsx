import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Modal } from "./modal";
import { Organization } from "../types";
import { useState } from "react";

interface AddEventModalProps {
  organization: Organization;
  currEvent: string;
  cost: string;
  startTime: string;
  onChange: (name: string, value: string) => void;
  createEvent: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const AddEventModal = ({
  organization,
  currEvent,
  cost,
  onChange,
  createEvent,
  isModalOpen,
  setIsModalOpen,
}: AddEventModalProps) => {
  const [day, setDay] = useState(null as Dayjs | null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const handlePickerChange = (value: any) => {
    onChange("startTime", value.toJSON());
  };

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
        <FormLabel>Start Date</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs()}
            views={["year", "month", "day"]}
            onChange={(value) => setDay(value)}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl>
        <FormLabel>Start Time</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker onChange={handlePickerChange} referenceDate={day} />
        </LocalizationProvider>
      </FormControl>
      <Button onClick={createEvent}>Save</Button>
    </Modal>
  );
};
