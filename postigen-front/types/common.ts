export type Customer = {
    id: number;
    email: string;
    phone: string;
};

export type Parcel = {
  id: number;
  sender: Customer[];
  receiver: Customer[];
  size: string;
  locker: number;
};

export type Locker = {
    id: number;
    location_address: string;
    size: string;
    status: string;
    parcels: Parcel[];
};