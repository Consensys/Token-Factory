## Token Factory

The Token Factory allows simple creation of a standard ERC20 token on Ethereum. It requires an injected web3 (Mist or Metamask) to function. It also has uPort support.

It does not use an on-chain factory at this point in time.

Disclaimer: This was app was built in part so that I can learn React as well. It's not the neatest code, so keep that in mind. If you want to help clean it up and maybe help move it to Redux (which I want to do), you are welcome to help.

Contracts & Tests are borrowed from Tokens repo. Using Truffle (with Webpack). Tested with Truffle@beta (v3.0.0-3).

## Developing

```npm install```   
```npm install -g webpack```
```npm install -g truffle```
```truffle serve```

## Contributing

There's still some outstanding issues related to UX/Design that needs to be finished. Please submit bugs & pull requests!

**This code is licensed under MIT.**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
