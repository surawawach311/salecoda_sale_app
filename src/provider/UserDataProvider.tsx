import React, { createContext, useEffect, useState } from 'react'
import { VerifiesDataSource } from '../datasource/VerifiesDataSource'
import { UserEntity } from '../entities/userEntity'
import { httpClient } from '../services/HttpClient'

export const UserDataContext = createContext<any>({})

export const UserDataProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserEntity>({} as UserEntity)
  const [permissions, setPermissions] = useState<any>()

  useEffect(() => {
    getUserDataFromAPI()
  }, [])

  const getUserDataFromAPI = async () => {
    await VerifiesDataSource.getProfile().then((respone: UserEntity) => {
      setUserData(respone)
      httpClient.get(`http://35.198.201.170:3000/api/company/v1/setting?companyId=${respone.company}`).then((res) => {
        setPermissions(res.data)
      })
    })
  }
  const store = { userData, permissions, getUserDataFromAPI }

  return <UserDataContext.Provider value={store}>{children}</UserDataContext.Provider>
}
