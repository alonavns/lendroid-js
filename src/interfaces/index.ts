export interface IMetaMask {
  address?: string
  network?: string
}

export interface IExchangeRates {
  currentWETHExchangeRate?: number
  currentDAIExchangeRate?: number
}

export interface IOrders {
  myOrders: {
    lend: object[]
    borrow: object[]
  },
  orders: object[]
}

export interface ILoadings {
  orders: boolean
  positions: boolean
  wrapping: boolean
  allowance: boolean
}

export interface IContracts {
  contracts: any
  balances: any
  allowances: object
  positions: {
    lent: object[]
    borrowed: object[]
  }
}
