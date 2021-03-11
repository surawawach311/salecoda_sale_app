import React, { createContext, useEffect, useState } from "react";
import { VerifiesDataSource } from "../datasource/VerifiesDataSource";
import { UserEntity } from "../entities/userEntity";

export const UserDataContext = createContext<UserEntity>({} as UserEntity);

export const UserDataProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserEntity>({} as UserEntity);

  useEffect(() => {
    getUserDataFromAPI();
  }, []);

  const getUserDataFromAPI = async () => {
    let result = await VerifiesDataSource.getProfile().then(
      (respone: UserEntity) => respone
    );
    setUserData(result);
  };
  const store = { userData, getUserDataFromAPI };

  return (
    <UserDataContext.Provider value={store}>
      {children}
    </UserDataContext.Provider>
  );
};
