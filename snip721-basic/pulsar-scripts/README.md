# pulsar-uploader

to build: `npm run build`

Remember to rebuild everytime you update your scripts.

### Uploading the contract code to the chain

Compile the contract in parent directory (e.g. `make compile-optimized-reproducible`)

Add a `.env` file with `MNEMONIC=enter your mnemonic here for your wallet`. This is the wallet that uploads the nft contract and does all the interaction in the scripts.

Run `npm run upload`

### Instantiating

To instantiate a new version of the contract

`npm run instantiate <CODE_ID> <CODE_HASH>`

### Running examples

To run some example execution messages and queries:

`npm run examples <CONTRACT_ADDRESS> <CODE_HASH>`