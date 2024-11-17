import { Schema } from "../../amplify/data/resource";

export type Organization = {
  id: string;
  content: string;
  events: Event[];
};

export type Tag = {
  id: string;
  content: string;
};

export type Event = {
  id: string;
  content: string;
  cost: string;
  startTime: string;
  organizationId: string | null;
};
