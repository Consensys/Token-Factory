# Persona

## About

The Persona contract is a simple representation of a Persona AKA a uPort U. The current fields in the Persona contract corresponding to an Owner address is

* Owner Ethereum address
* Full Name
* Profile Picture

The Full Name and Profile Picture is stored in IPFS as a JSON structure that corresponds to the [Schema.org Person schema](http://schema.org/Person):

```
{
'personSchema' :
  {
   'name': 'Christian Lundkvist',
   'image': {'@type': 'ImageObject', 
             'name': 'avatar', 
             'contentUrl' : 'ipfs/QmUSBKeGYPmeHmLDAEHknAm5mFEvPhy2ekJc6sJwtrQ6nk'}
  }
}
```

and a hash of this structure is stored in the contract as a `string`. Later on this structure will include more information, and we might want the root hash to be pointing at a commit object in a whole versioned filesystem. We also allow other Dapps to add top-level entries to attach Dapp-specific attributes to the Persona.

## Persona Library

The Persona Library allows you to create and/or view Personas in your Dapp. You need to set a web3 provider using `Persona.setWeb3Provider` in order to access the Ethereum contracts, and you need to set an Ipfs provider using `Persona.setIpfsProvider` to access data stored in IPFS. You also need to set the registry used for Persona lookups by using `Persona.setRegistry()`. This is currently defaulted to the PersonaRegistry used on the ConsenSys testnet.

### Example

See the files `app/index.html` and the corresponding `app/javascripts/app.js` for an example of how to use the Persona Library.

### Usage

To use the Persona library, first include it in your project:

**Node** 


```javascript
var Persona = require("persona");
```

Then, setup your Persona object using the code below. IMPORTANT: if you are using 
this module for browser, you should configure you Persona object differently (see 
code below for Browser).

```javascript
var ipfsApi = require('ipfs-api');
var web3    = require('web3');

Persona.setIpfsProvider(ipfsApi(<hostname>, <port>));
Persona.setWeb3Provider(new web3.providers.HttpProvider('http://localhost:8545'));
```

**Browser**

```html
<!-- Persona library. -->
<script type="text/javascript" src="./dist/persona.js"></script>
```

Configure your Persona object using the code below. IMPORTANT: see that this code
is only valid if you will use it on Browsers (see above).

```javascript
Persona.setIpfsProvider({host: <hostname>, port: <port>});
Persona.setWeb3Provider('http://localhost:8545');
```

### Creating a Persona

```javascript
Persona.newPersona({
'personSchema' :
  {
   'name': 'Christian Lundkvist',
   'image': {'@type': 'ImageObject',
             'name': 'avatar',
             'contentUrl' : 'ipfs/QmUSBKeGYPmeHmLDAEHknAm5mFEvPhy2ekJc6sJwtrQ6nk'}
  }
}).then(function(persona) {
  // You now have a persona object stored on the blockchain
  // and on ipfs.
  console.log(persona.address); // address of persona on blockchain
});
```

### Getting Persona Information

If you have an address of the current Ethereum user, you can get their persona info using the command `Persona.of(address)`. This command looks up the persona contract from the Persona registry. The Persona registry can be set using the `Persona.setRegistry` command.

```javascript
Persona.setRegistry(registryAddress);

web3.getCoinbase(function(err, coinbase) {
  Persona.of(coinbase).then(function(persona) {
    // You now have a persona object. You can use this to pull information
    // off of ipfs to get the persona avatar and JSON information.
    // Note: We're using promises here.
    return persona.getInfo();
  }).then(function(info) {
 	// This will log something like the original blob passed in:
        // {
        //  'personSchema' :
        //   {
        //    'name': 'Christian Lundkvist',
        //    'image': {'@type': 'ImageObject', 
        //              'name': 'avatar', 
        //              'contentUrl' : 'ipfs/QmUSBKeGYPmeHmLDAEHknAm5mFEvPhy2ekJc6sJwtrQ6nk'}
        //   }
        // }
  	console.log(info);
  });
});
```

## Getting started with the demo

The Persona demo uses LightWallet and a remote IPFS node so that you don't have to run your own ethereum client or IPFS client.

### Running from remote server

Access the dapp at `http://104.236.65.136:3000`.

### Running locally

This will still use the remote IPFS and ethereum servers by default. If you want to run your own ethereum and/or IPFS server, modify the variables `ipfsHost` or `web3Host` in the file `app/javascripts/app.js` before you build.

To build and run:
```
git clone https://github.com/ConsenSys/persona.git
cd persona
sudo npm install
npm run build
python -m SimpleHTTPServer 3000
```

Now you can access the Dapp at `http://localhost:3000/app/index.html`.

## Usage of the browser example dapp

If you already have a LightWallet seed, enter it in and hit "Set Seed". This will show the first address corresponding to that seed. Make sure you have some Ether in the address.

To create a new persona, Simply enter your name, and upload your profile picture. Then hit "Submit Persona". You should receive a message "New Persona created!".

To view an existing Persona, enter the contract address under "Persona Identifier". This will show you the Full Name and the profile picture.

