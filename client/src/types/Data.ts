export interface User {
  id: number;
  lastName: string;
  firstName: string;
  profileImgUrl: string;
}

export interface TicketType {
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

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Event {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  desc: string;
  location: Location;
  ticketType: TicketType;
  user: User;
}

export interface Token {
  exist: boolean;
  id: number;
  googleId: number;
  email: string;
}
