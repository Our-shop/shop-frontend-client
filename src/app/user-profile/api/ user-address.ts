import repository from '../../../repository';

interface DeliveryData {
  userId: string;
  city: string;
  address: string;
  phone: string;
}

export const addAddress = (address: DeliveryData) => {
  return repository.post<DeliveryData>('/delivery', address);
};
