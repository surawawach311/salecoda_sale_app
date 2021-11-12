import React, { createContext, useEffect, useState } from 'react'
import { VerifiesDataSource } from '../datasource/VerifiesDataSource'
import { ResponseEntity } from '../entities/ResponseEntity'
import { NewUserEntity, UserApiEntity } from '../entities/userEntity'
import { httpClient } from '../services/HttpClient'
import { UserLocalStorageService } from '../services/UserLocalStorageService'
import * as RootNavigation from '../navigations/RootNavigation'

export const UserDataContext = createContext<any>({})

export const UserDataProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<NewUserEntity>({} as NewUserEntity)
  const [permissions, setPermissions] = useState<any>()
  const [config, setConfig] = useState<any>()
  const [brand, setBrand] = useState<any>()
  const [shopNo, setshopNo] = useState<any>()

  useEffect(() => {
    getUserDataFromAPI()
  }, [])

  const getUserDataFromAPI = async () => {
    await UserLocalStorageService.getUserProfile().then((response: UserApiEntity | null) => {
      if (response) {
        setUserData(response.user_profile)
        setPermissions(response.user_permissions)
        setConfig(response.app_setting)
      } else {
        RootNavigation.navigate('Auth', {
          screen: 'InputTelNumber',
        })
      }
    })

    // await VerifiesDataSource.getProfile().then((respone: UserEntity) => {
    //   setUserData(respone)
    //   httpClient.get(`http://35.198.201.170:3000/api/company/v1/setting?companyId=${respone.company}`).then((res) => {
    //     setPermissions(res.data)
    //   })
    // })
  }
  const selectBrand = (brand: string) => {
    setBrand(brand)
  }

  const selectShop = (shopNo: string) => {
    setshopNo(shopNo)
  }
  const store = { userData, permissions, config, brand, shopNo, getUserDataFromAPI, selectBrand, selectShop }

  return <UserDataContext.Provider value={store}>{children}</UserDataContext.Provider>
}
