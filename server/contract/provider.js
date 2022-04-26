import { ethers } from "ethers";
// const url = "http://127.0.0.1:7545";
const network = "rinkeby";
const provider = new ethers.providers.getDefaultProvider(network, {
  infura: {
    projectId: "358dd0b99a8e4eba9030b5f219ca0199",
    projectSecret: "856589f799304430b44fa825212a6ffa",
  },
});
// console.log(provider);
export default provider;
