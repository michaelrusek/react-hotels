interface HotelType {
  id: string;
  name: string;
  rating: number;
  address1: string;
  address2: string;
  starRating: number;
  images: [{ url: string }];
}

export default HotelType;
