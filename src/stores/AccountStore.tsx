import { makeAutoObservable, runInAction } from 'mobx'
import { AccountEntity } from '../entities/AccountEntity'
import { CompanyEntity } from '../entities/CompanyEntity'
import { AccountDataSource } from '../datasource/AccountDataSource'
import { VerifiesDataSource } from '../datasource/VerifiesDataSource'
import { UserEntity } from '../entities/userEntity'

export class AccountStore {
  public isLoading: boolean = true
  public account?: UserEntity = undefined
  public company?: CompanyEntity = undefined
  public brand?: string = undefined
  public territory?: string = undefined

  constructor() {
    makeAutoObservable(this)
  }

  async load(): Promise<void> {
    this.isLoading = true
    const account = await VerifiesDataSource.getProfile()

    
    runInAction(() => {
      this.account = account
      this.isLoading = false
    })
  }

  selectCompany(selectedCompany: CompanyEntity): void {
    this.company = selectedCompany
  }

  selectBrand(brand?: string) {
    this.brand = brand
  }

  selectTeritory(territory?: string) {
    this.territory = territory
  }
}

export const accountStore = new AccountStore()
