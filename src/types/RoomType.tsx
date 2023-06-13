export interface RoomType {
  name: string;
  longDescription: string;
  occupancy: RoomOccupancy;
}

export interface RoomOccupancy {
  maxAdults: number;
  maxChildren: number;
}
