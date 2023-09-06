import repository from '../../../repository';
import storage from '../../../local-storage/storage';

export const signOut = () => {
  const signOutEndpoint = '/auth/sign-out';
  const r_token = storage.get('refresh-token');

  const config = {
    headers: { Authorization: `Bearer ${r_token}` },
  };

  const bodyParameters = {
    key: 'value',
  };

  repository.post(signOutEndpoint, bodyParameters, config).then(console.log).catch(console.log);
};
