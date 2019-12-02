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

export interface EventDetail {
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  desc: string;
  ticketTypes: TicketType[];
  user: User;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
