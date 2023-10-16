import { WebIrys } from "@irys/sdk";
import { providers } from "ethers";

interface WindowWithEthereum extends Window {
	ethereum?: any;
}

/**
 * Creates a new Irys object with the specified configuration.
 *
 */
const getIrys = async (): Promise<WebIrys> => {
	await (window as WindowWithEthereum).ethereum.enable();
	const provider = new providers.Web3Provider((window as WindowWithEthereum).ethereum);
	const wallet = { name: "ethersv5", provider: provider };
	const webIrys = new WebIrys({ url: "https://devnet.irys.xyz", token: "matic", wallet });
	await webIrys.ready();

	console.log(`Connected to webIrys from ${webIrys.address}`);
	return webIrys;
};

export default getIrys;
