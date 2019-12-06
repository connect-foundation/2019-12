import { EventDetail } from '../types/Data';

export interface EventsState {
  events: Map<number, EventDetail>;
  order?: number[];
}
