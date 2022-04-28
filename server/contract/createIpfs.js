import { create } from "ipfs-http-client";

const createIPFS = async (metaData) => {
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const cid = await client.add(JSON.stringify(metaData));
  const url = `https://ipfs.infura.io/ipfs/${cid.path}`;

  return url;
};

export default createIPFS;
