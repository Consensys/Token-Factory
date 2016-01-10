# React Account Badge

This is an account management badge, in which user can choose which account
he wants to use in a given application. He can choose from accounts from his
local node or from light wallet accounts. User can also fully manage his light
wallet. Current actions for lightwallet:

* Create new lightwallet, using entropy provided by mouse movements
* Load wallet from disk
* Load wallet from seed
* Save wallet to disk
* See wallet seed
* Remove wallet from local storage
* Add new address into the wallet

Users can also use a feature called `transfer by dragging` in which you can
transfer funds from one address to another just by dragging source address into
target.

# How to use it

First, copy the style.css file (located at the root folder of this project) to your project 
and include it in your html. Second, get the project from github:

```
git clone --depth=1 https://github.com/consensys/react-account-badge
```
Third, include this module into your `package.json` file, poiting it to the folder that you
cloned above.

```
    ...
    "dependencies": {
        "react-account-badge":"file../react-account-badge",
        ...
    }
    ...
```
Finally, use the component!

```javascript
var AccountBadge = require('react-account-badge').AccountBadge;
var Web3         = require('web3');

var web3 = new Web3();
...
    
    <AccountBadge web3={web3}/>
```

This piece of code will show three data on a selected address: the persona
picture (if the address doesn't have one, will show an anonymous picture),
the address and the balance.

If you click on this component, it will open a popup window where you can select
a different address and manage you light wallet account.

To get the selected address from this component, you can use this piece of code
wherever you need it:

```javascript
var AccountStore = require('react-account-badge').AccountStore;
...
var selectedAddress = AccountStore.getSelectedAddress();
```

See folder of `sample-app` for a practical example.

# Using in the browser (bundle.js)

Optionally, you can use the `bundle.js` file that comes in the `dist` directory. 
It exposes the object `accountBadge` where you can access the AccountBadge and 
AccountStore for use in a browser:

```html
<script src='dist/bundle.js' type='text/javascript'></script>
```
