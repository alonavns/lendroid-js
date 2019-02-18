//tslint:disable
const Web3 = require('web3')
//tslint:enable

import * as Constants from '../constants'

import {
  fetchETHBallance,
  fetchContractByToken,
  fetchBallanceByToken,
  fetchAllowanceByToken,
  fetchLoanPositions,
  fillLoan,
  closePosition,
  cleanContract,
  topUpPosition,
  liquidatePosition,
  fetchOrders,
  createOrder,
  fillOrderServer,
  deleteOrder,
  postLoans,
  cancelOrder,
  wrapETH,
  allowance,
  getTokenExchangeRate,
  Logger,
  LOGGER_CONTEXT,
  Web3Utils,
  debounce
} from '../services'

import {
  IMetaMask,
  IExchangeRates,
  IOrders,
  ILoadings,
  IContracts
} from '../interfaces'

export class Borrower {
  private address: string
  private contract: any
  private apiLoanRequests: string
  private apiEndpoint: string
  private loading: ILoadings
  private stateCallback: () => void
  private debounceUpdate: () => void
  private orders: object[]

  constructor(address: string, protocol, initParams: any = {}) {
    this.address = address
    this.contract = protocol
    this.apiEndpoint = initParams.apiEndpoint || Constants.API_ENDPOINT
    this.apiLoanRequests =
      initParams.apiLoanRequests || Constants.API_LOAN_REQUESTS

    this.onPostLoans = this.onPostLoans.bind(this)
    this.onFillLoan = this.onFillLoan.bind(this)
    this.onClosePosition = this.onClosePosition.bind(this)
  }

  public fetchOrders() {
    const { address } = this
    this.loading.orders = true
    this.debounceUpdate()

    fetchOrders(this.apiEndpoint, (err, orders) => {
      this.loading.orders = false
      if (err) {
        return Logger.error(LOGGER_CONTEXT.API_ERROR, err.message)
      }

      this.orders = orders.offers.filter(item => item.borrower === address)
      setTimeout(() => this.debounceUpdate(), 1000)
    })
  }

  public onPostLoans(data, callback) {
    postLoans(this.apiLoanRequests, data, callback)
  }

  public onFillLoan(approval, callback) {
    const { contract, address } = this
    const loanOfferRegistryContractInstance = contract.LoanOfferRegistry
    fillLoan(
      { approval, loanOfferRegistryContractInstance, metamask: { address } },
      callback
    )
  }

  public onClosePosition(data, callback) {
    const { address } = this
    closePosition({ data, metamask: { address } }, (err, result) => {
      if (err) {
        Logger.error(LOGGER_CONTEXT.CONTRACT_ERROR, err.message)
      }
      callback(err, result)
    })
  }
}
