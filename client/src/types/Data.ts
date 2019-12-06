export interface User {
  id: number;
  lastName: string;
  firstName: string;
  profileImgUrl: string;
}

export interface TicketType {
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

export interface EventDetail {
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  latitude: number;
  longitude: number;
  mainImg: string;
  desc: string;
  ticketType: TicketType;
  user: User;
}

export interface Token {
  exist: boolean;
  id: number;
  googleId: number;
  email: string;
}
