import { ethers } from "ethers";
const url = "rinkeby";
const provider = new ethers.providers.JsonRpcProvider(url);

export default provider;
