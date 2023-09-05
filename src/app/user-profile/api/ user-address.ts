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

export const getAllActive = async () => {
  return await repository.get<GetDeliveryData[]>(`/delivery/active`);
};

export const getAllActiveByUserId = async (userId: string) => {
  return await repository.get<GetDeliveryData[]>(`/delivery/active/${userId}`);
};

export const getAddress = async (id: string) => {
  return await repository.get<GetDeliveryData>(`/delivery/${id}`);
};

export const updateAddress = async (id: string, address: Partial<DeliveryData>) => {
  return await repository.put<Partial<DeliveryData>>(`delivery/${id}`, address);
};

export const deleteAddress = async (id: string) => {
  return await repository.delete<DeliveryData>(`delivery/${id}`);
};
