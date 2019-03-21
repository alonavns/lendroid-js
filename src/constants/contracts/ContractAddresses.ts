import * as ABIs from './ContractABIs'

export const CONTRACT_ADDRESSES = {
  Protocol: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    42: '0x7A82C00fF8BA3e01C335B77ea66B4d857528a241',
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
  DAI2ETH: {
    1: '0x729D19f657BD0614b4985Cf1D82531c67569197B',
    42: '0x9FfFE440258B79c5d6604001674A4722FfC0f7Bc',
    def: {
      hasNetwork: true,
      1: ABIs.DAI2ETHABI[1],
      42: ABIs.DAI2ETHABI[42]
    }
  }
}

export const CONTRACT_TOKENS = Object.keys(CONTRACT_ADDRESSES)
export const BALLANCE_TOKENS = CONTRACT_TOKENS.filter(token => token.length < 5)
