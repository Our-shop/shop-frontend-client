import repository from '../../../repository';

export interface DeliveryData {
  userId: string;
  city: string;
  address: string;
  phone: string;
}

export interface GetDeliveryData {
  userId: string;
  city: string;
  address: string;
  phone: string;
  id: string;
}

export const addAddress = async (address: DeliveryData) => {
  return await repository.post<DeliveryData>('/delivery', address);
};

export const getAllAddresses = async (userId: string) => {
  return await repository.get<GetDeliveryData[]>(`/delivery/user/${userId}`);
};

export const getAddress = async (id: string) => {
  return await repository.get<GetDeliveryData>(`/delivery/${id}`);
};
