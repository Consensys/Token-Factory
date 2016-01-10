window.onload = function() {

  // SETUP AREA

      // Configuration settings
      // requires config.js to be loaded
      var selected_network      = config.selection;
      var serviceHost           = config[selected_network].serviceHost;
      var globalRegistryAddress = config[selected_network].personaRegistry;
      
      var ethRpcPort            = '8545'
      var ipfsPort              = '5001'
      var ipfsWebPort           = '8080'
      
      var ipfsHost              = {host: serviceHost, port : ipfsPort}
      var web3Host              = 'http://' + serviceHost + ':' + ethRpcPort

      // temporary web3provider so we
      // can do the lookup without setting the seed
      console.log('Web3 host:' + web3Host);
      
      var web3     = new Web3();
      var web3Prov = new web3.providers.HttpProvider(web3Host);

      web3.setProvider(web3Prov);
      ipfs.setProvider(ipfsHost);
      
      Persona.setWeb3Provider(web3Prov);
      Persona.setIpfsProvider(ipfsHost);

      var ipfsWeb = 'http://' + serviceHost + ':' + ipfsWebPort
      //var ipfsWeb = 'http://gateway.ipfs.io'

      var globalAddress = ''


  // WINDOW FUNCTIONS

      window.getBalance = function(addr) {

        addr = addr || globalAddress;

        web3.eth.getBalance(addr, function(err, bal){
          web3.eth.getTransactionCount(addr, function(err, nonce) {
            //******************
            document.getElementById('addr').value = addr + ' (Balance: ' + (bal / 1.0e18) + ' ETH, Nonce: ' + nonce + ')'
            //******************
          })
        })

      }

      window.setSeed = function() {
        var seed = document.getElementById('seed').value;
        var password = prompt('Select a password to protect your seed', 'Enter Password');
        var keystore = new lightwallet.keystore(seed, password)

        keystore.generateNewAddress(password)
        globalAddress = '0x' + keystore.getAddresses()[0]
        //Use default passwordProvider
        keystore.passwordProvider = function (callback) {callback(null, password)}

        var web3Prov = new HookedWeb3Provider({
          host: web3Host,
          transaction_signer: keystore
        });

        // // workaround for testrpc issues
        // var web3Prov = new web3.providers.HttpProvider(web3Host)
        // globalAddress = '0x82a978b3f5962a5b0957d9ee9eef472ee55b42f1'

        web3.setProvider(web3Prov);
        Persona.setWeb3Provider(web3Prov);
        getBalance(globalAddress);

        // When using a host not on the consensys testnet, can use this
        // to register a new registry
        
        // newRegistry(function (err, regAddr) {
        //   globalRegistryAddress = regAddr;
        //   console.log(regAddr);
        // })
        
        Persona.setRegistry(globalRegistryAddress);
      }

      window.randomSeed = function() {
        var randomSeed = lightwallet.keystore.generateRandomSeed()
        document.getElementById('seed').value = randomSeed
      }

      window.fundWallet = function() {

        var testRpcAddr = '0x82a978b3f5962a5b0957d9ee9eef472ee55b42f1'

        web3.eth.getBalance(testRpcAddr, function (err, rpcBal) {
        
          if (rpcBal.toNumber() !== 0) {
            // testrpc
            console.log('rpc 0');
            web3.eth.sendTransaction({from: testRpcAddr, to:globalAddress, value: 1000*1.0e18}, function () {});
          }
          else {
            // ConsenSys testnet
            console.log('request');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://testnet.consensys.net/faucet', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', 'charset=UTF-8')

            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Paid');
                getBalance(globalAddress);
              }
              else {
                console.log(xhr.status);
              }
            };
            xhr.send('address=' + globalAddress);
          }
        })
      }


      // This function is called when an image file
      // is uploaded
      window.ipfsAddImageHandler = function(evt) {
        
        var input = evt.target;
        
        if (input.files && input.files[0]) {
          
          var file = evt.target.files[0];
          var reader = new FileReader();

          reader.onload = function (e) {
            // Split the DataURL to get the raw base64 data
            var buf = new buffer.Buffer(e.target.result.split(',')[1], 'base64');
          
            ipfs.add(buf, function (err, hash) {
              document.getElementById('inputImageHash').value = hash;
            });
          };

          reader.readAsDataURL(input.files[0]);
        }
      }

      window.uiSubmitNewPersona = function() {

        var name = document.getElementById('inputName').value;
        var personSchema = {
          name: name,
          image: {"@type": "ImageObject",
                  "name" : "avatar",
                  "contentUrl" : "ipfs/" + document.getElementById('inputImageHash').value
                 }
        };
          
        var info = {
          "personSchema": personSchema
        }

        Persona.newPersona(
          info, 
          {
            from: globalAddress, 
            gas: 1000000, 
            gasPrice: 200000000000
          }, 
          function(err, persona) {
            
            console.log(persona);
            
            //******************
            document.getElementById('outputPersonaAddress').value = persona.address;
            //******************
        });
      }


      window.uiGetPersonaData = function() {
        
        var userAddress = document.getElementById('inputPersonaAddress').value;
        
        Persona.of(userAddress).then(function(persona) {
          return persona.getInfo("personSchema");
        }).then(function(info) {
          
          var outputImage     = document.getElementById("outputImage");
          var outputImageHash = document.getElementById("outputImageHash");
          
          //******************
          document.getElementById('outputName').value = info.name;
          //******************
          
          outputImage.setAttribute("src", ipfsWeb + '/' + info.image.contentUrl);
          outputImageHash.value = info.image.contentUrl;

          outputImage.setAttribute("width", 200);
        });
      };

      window.newRegistry = function(callback) {
        PersonaRegistry.new({
          from: globalAddress,
          gas: 1000000,
          gasPrice: 80000000000})
        .then(function(reg) {
          console.log(reg.address); 
          callback(null, reg.address);
        });
      };

  document.getElementById('inputImageFile').addEventListener('change', ipfsAddImageHandler, false);
};
