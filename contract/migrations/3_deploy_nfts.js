const fs = require("fs");
const NFTs = artifacts.require("NFTs.sol");

module.exports = function (deployer) {
    console.log("deploy...");
    deployer.deploy(NFTs).then(() => {
        if (NFTs._json) {
            fs.writeFile("ABI", JSON.stringify(NFTs._json.abi), (err) => {
                if (err) throw err;
                console.log("ABI Success");
            });

            fs.writeFile("address", NFTs.address, (err) => {
                if (err) throw err;
                console.log("Address Success");
            });
        }
   });
};