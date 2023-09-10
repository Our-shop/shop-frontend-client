import { BaseDto } from '../../../types/base-dto.type';

export interface userRoleDto extends BaseDto {
  type: string;
  permission: [];
}
