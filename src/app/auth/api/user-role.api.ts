import repository from '../../../repository';

export const getRoleId = (type: string): Promise<string | any> => {
  return repository.get<string>(`/user-roles/${type}`);
};
