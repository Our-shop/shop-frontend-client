import { BaseDto } from '../../../types/base-dto.type';

export interface DeliveryDto extends BaseDto {
  userId: string;
  city: string;
  address: string;
  phone: string;
}
