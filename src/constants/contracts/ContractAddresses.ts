import * as ABIs from './ContractABIs'

export const CONTRACT_ADDRESSES = {
  Protocol: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    42: '0xDFf4e9eAeC879A3e0E4b525FF147a2eB3BFd11a5',
    def: ABIs.ProtocolABI
  },
  WETH: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    42: '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
  },
  LST: {
    1: '0x4de2573e27E648607B50e1Cfff921A33E4A34405',
    42: '0x13a68a7cc8564C23390870FF33504F38289ff87e',
    def: ABIs.LSTABI
  },
  DAI: {
    1: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    42: '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
    def: ABIs.DAIABI
  },
}

export const CONTRACT_TOKENS = Object.keys(CONTRACT_ADDRESSES)
export const BALLANCE_TOKENS = CONTRACT_TOKENS.filter(token => token.length < 5)
