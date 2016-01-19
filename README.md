## Token Factory

A dapp that allows for token issuance & management. The purpose for this at this point in time is to be nerdy & decentralized for MVP. Thus should be able to be run locally & remote or just through contracts.

Contracts & Tests are borrowed from Tokens repo. Using Truffle.

```npm install```   
```truffle deploy``` (not always needed as .sol.js is written to development config)

Uglify does not play well with minifying ES6. The react-account-badge has a dependency, IPFS-API, which has a dependecny, "wreck" that has ES6 in it still. In order to remove this, I put the react-account-badge/dist/bundle.js through babel and dump it at rab_bundle.js. ie:  

```babel node_modules/react-account-badge/dist/bundle.js --out-file rad_bundle.js```

Note. This can take about a minute to process. This is only for publishing/minifying reasons.

```truffle serve```
