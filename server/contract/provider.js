import { ethers } from "ethers";
const url = "http://127.0.0.1:7545";
const provider = new ethers.providers.JsonRpcProvider(url);

export default provider;
