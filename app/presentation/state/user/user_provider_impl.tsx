import { useState } from 'react';
import { injectable } from 'inversify';
import UserContext, { defaultUserContext } from '@/app/domain/state/user/user_context';
import UserContextType from '@/app/domain/state/user/user_context_type';
import UserEntity from '@/app/domain/entities/user_entity';
import ProviderProps from '@/app/domain/state/provider_props';
import UserProvider from '@/app/domain/state/user/user_provider';

const _Actions: UserContextType = defaultUserContext;

const _Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserEntity | undefined>(undefined);
  _Actions.user = user;
  _Actions.setUser = (user: UserEntity | undefined) =>{
    console.log("UserProviderImpl setUser", user);
    setUser(user);
  }
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

