# lendroid-js
A library to wrapper the lendroid Server and Lendroid Contract API's

## On the Lendroid UI
  1. On Lendroid UI, Lender deposits 1000 OMG.
     * Contract Code [Wallet.deposit](https://github.com/gedanziger/lendroid-protcol-private/blob/AddDockerSupport/src/Wallet.sol#L102)
     * `lendroidJS.Wallet.deposit(‘OMG’, 1000).sender(lender)`
  2. On Lendroid UI, Lender commits 1000 OMG:
     * Contract Code [Wallet.commit](https://github.com/gedanziger/lendroid-protcol-private/blob/AddDockerSupport/src/Wallet.sol#L68)
     * `lendroidJS.Wallet.commit(‘OMG’, 1000).sender(lender)`
  3. On Lendroid UI, Lender creates a loan offer for the loan terms
      ``` 
        { 
           "makerAddress": "0x9e566255",
           "market" : "OMG/ETH",
           "quantity" : 1000,
           "loanToken" : "OMG",
           "cost" : "100 szabo per base(OMG)"
           "wrangler": "0xWrangler"
           "ecSignature": {
             "v": 27,
             "r": "0x61a3ed31b43c",
             "s": "0x40349190569"
           }
         }
      ```
  4. Sends a HTTP POST request with a Loan Offer object to `/offers` endpoint of Lendroid API server API service whenever Lender creates the loan offer.
     *  Server code: [POST /offers](https://github.com/norestlabs/lendroid-portal-server/blob/master/main.py#L27)
     *  On the API server, this Loan Offer object is saved.
     *  Method Signature: `lendroidJS.createOffer(loanTerms).sender(lender)`
     *  HTTP Signature:
        ```
        curl -v -XPOST  http://localhost:9001/offers \
        -H 'application/json' \
        -d @- << EOF
         {
           "wrangler": "0xWrangler",
           "loanToken": "OMG",
           "ecSignature": {
             "s": "0x40349190569",
             "r": "0x61a3ed31b43c",
             "v": 2
            },
            "cost": "100 szabo per base(OMG)",
            "makerAddress": "0x9e566255",
            "market": "OMG/ETH",
            "quantity": 1000
          }
         EOF
         ```
## On the Relayer UI
  1. Retrieves loan offers via HTTP GET from the API service
     * Server code: [GET /offers](https://github.com/norestlabs/lendroid-portal-server/blob/master/main.py#L23)
     * Method Signature: `lendroidJS.getOffers()`
     * HTTP Signature:
       ```
       curl -v -XGET  http://localhost:9001/offers
       ```
  2. Sends the picked pair of (0x order, loan offer) to Lendroid’s Smart Contracts via Web3.js to open a position.
     * Contract Code: [PositionManager.openPosition](https://github.com/gedanziger/lendroid-protcol-private/blob/AddDockerSupport/src/PositionManager.sol))
     * ```
        lendroidJS.PositionManager
                  .openPosition(orderValues[],
                                orderAddresses[],
                                orderV,
                                orderRS[],
                                offerValues[],     
                                offerAddresses[])
                  .sender(marginTrader)
       ```


