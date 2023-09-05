import repository from '../../../repository';
import { DeliveryDto } from '../types/delivery-dto.type';
import { GetDeliveryData } from '../types/get-delivery-data.type';

export const addAddress = async (address: DeliveryDto) => {
  return await repository.post<DeliveryDto>('/delivery', address);
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

export const updateAddress = async (id: string, address: Partial<DeliveryDto>) => {
  return await repository.put<Partial<DeliveryDto>>(`delivery/${id}`, address);
};

export const deleteAddress = async (id: string) => {
  return await repository.delete<DeliveryDto>(`delivery/${id}`);
};
