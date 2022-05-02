import { ethers } from "ethers";
import { config } from "../config.js";
// 로컬 배포시
// const url = "http://127.0.0.1:7545";
// const provider = new ethers.providers.JsonRpcProvider(url);

// 테스트넷 배포
const network = "rinkeby";
const provider = new ethers.providers.getDefaultProvider(network, {
  infura: {
    projectId: config.InfuraProjectId,
    projectSecret: config.InfuraProjectSecret,
  },
});


export default provider;
