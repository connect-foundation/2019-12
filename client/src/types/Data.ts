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

export interface EventCard {
  id: number;
  mainImg: string;
  startAt: string;
  title: string;
  name: string;
  price: number;
  to?: string;
}

export interface EventDetail {
  id: number;
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

export interface BoughtTicketEvent {
  id: number;
  userId: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  firstName: string;
  lastName: string;
  ticket: {
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
  };
  userTickets: [
    {
      id: number;
      ticketTypeId: number;
      userId: number;
      isAttendance: boolean;
      createdAt: string;
    },
  ];
}

export interface CreatedEvent {
  id: number;
  userId: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
}

export interface SearchMapResult {
  address: string;
  latitude: number;
  longitude: number;
}
