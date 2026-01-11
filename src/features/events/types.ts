export interface IEvent {
  id: string;
  title: string;
  date: string; // ISO string from Ticketmaster
  venue: string;
  city: string;
  lat: number;
  lng: number;
  image: string | null;
  url: string;
}
