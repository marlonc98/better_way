import { useState } from 'react';
import { injectable } from 'inversify';
import UserContext, { defaultUserContext } from '@/domain/state/user/UserContext';
import UserContextType from '@/domain/state/user/UserContextType';
import UserEntity from '@/domain/entities/user_entity';
import ProviderProps from '@/domain/state/ProviderProps';
import UserProvider from '@/domain/state/user/UserProvider';

const _Actions: UserContextType = defaultUserContext;

const _Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserEntity | undefined>(undefined);
  _Actions.user = user;
  _Actions.setUser = setUser;
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

@injectable()
class UserProviderImpl implements UserProvider {
  public context = UserContext;

  public Provider = _Provider;

  Actions = _Actions
}

export default new UserProviderImpl();

