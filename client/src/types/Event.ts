interface TicketType {
  id: number;
  eventId: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  leftCnt: number;
  isPublicLeftCnt: boolean;
  maxCntPerPerson: number;
  salesStartAt: string;
  salesEndAt: string;
  refundEndAt: string;
}
interface User {
  id: number;
  lastName: string;
  firstName: string;
}
export interface Event {
  id: number;
  userId: number;
  title: string;
  desc: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  ticketType: TicketType;
  user: User;
}
