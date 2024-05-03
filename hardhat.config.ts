import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import { HardhatUserConfig, task } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-docgen";
import "hardhat-spdx-license-identifier";
import "solidity-coverage";
import "@atixlabs/hardhat-time-n-mine"; //Use me to mine blocks in dev for time based contracts
import "./tasks"; //tasks - e.g npx hardhat audit

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

//NOTE: Debugger
/* const DEBUG = false;
function debug(text: String) {
  if (DEBUG) {
    console.log(text);
  }
} */

export interface ChainMappingInterface {
  [key: number]: string;
}

export const DevelopmentChains = ["hardhat", "localhost"];

export const ChainMapping: ChainMappingInterface = {
  137: "polygon",
  31337: "hardhat",
  11155111: "sepolia",
};

//This well known public private key is a backup if private key env var not set
const defaultPrivateKey = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

//NOTE: Setting ETHERSCAN_API_KEY in .env breaks hardhat-etherscan for polygon networks as it always defaults to ETHERSCAN_API_KEY, use a different env var an inject in per network

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
    addr1: 1,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: "0.8.22",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
      accounts: {
        count: 20, // Adjust the number of accounts available when using the local Hardhat network
      },
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "merge",
      forking: {
        url: process.env.ETH_MAINNET_URL || "",
        // The Hardhat network will by default fork from the latest mainnet block
        // To pin the block number, specify it below
        // You will need access to a node with archival data for this to work!
        // blockNumber: 14743877,
        // If you want to do some forking, set `enabled` to true
        enabled: false,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
    sepolia: {
      chainId: 11155111,
      verify: {
        etherscan: {
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      live: true,
      tags: ["testnet", "sepolia"],
      saveDeployments: true,
      url: "https://rpc2.sepolia.org",
    },
    mumbai: {
      verify: {
        etherscan: {
          apiKey: process.env.POLYGONSCAN_API_KEY,
        },
      },
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      live: true,
      tags: ["testnet", "mumbai"],
      saveDeployments: true,
      url: "https://rpc.ankr.com/polygon_mumbai",
    },
    amoy: {
      verify: {
        etherscan: {
          apiKey: process.env.POLYGONSCAN_API_KEY,
        },
      },
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      live: true,
      tags: ["testnet", "amoy"],
      saveDeployments: true,
      url: "https://rpc-amoy.polygon.technology",
    },
    polygon: {
      verify: {
        etherscan: {
          apiKey: process.env.POLYGONSCAN_API_KEY,
        },
      },
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      live: true,
      tags: ["mainnet", "polygon"],
      saveDeployments: true,
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gasPrice: 200000000000, //200GWei - Hard code a high gas price to fix REPLACEMENT_UNDERPRICED errors
    },
    // polygon_mainnet: {},
    /* ropsten: {
      url: process.env.ROPSTEN_RPC_URL || defaultPrivateKey,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || defaultPrivateKey,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL || defaultPrivateKey,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || defaultPrivateKey,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || defaultPrivateKey,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    }, */
    /* avalanche_testnet_fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 470000000000,
      chainId: 43113,
      accounts: []
    },
    avalanche_mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 470000000000,
      chainId: 43114,
      accounts: []
    } */
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts/*",
    outputFile: "./reports/hardhat-gas-usage-report.md",
    token: process.env.REPORT_GAS ? "ETH" : undefined,
  },
  sourcify: {
    enabled: true,
  },
  //Disabled hardhat-verify for hardat-etherscan-verify included with hardhat-deploy
  /* etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      rinkeby: process.env.ETHERSCAN_API_KEY || "",
    },
  }, */
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  //@dev: Auto generate docs for contracts
  docgen: {
    clear: true,
    runOnCompile: false,
  },
  // @dev: Automatically add SPDX license identifier to all contracts based on package.json
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
};

export default config;
