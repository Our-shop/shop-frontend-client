import { BaseDto } from '../../../types/base-dto.type';

export interface UserDto extends BaseDto {
  userName: string;
  email: string;
  password: string;
  roleId: string;
}
