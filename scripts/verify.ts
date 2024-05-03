import { run } from "hardhat";
import { TOKEN_CONTRACT_ADDRESS, VESTING_CONTRACT_ADDRESS, ALLOCATION_CONTRACT_ADDRESS } from '../cache/deploy';



async function main() {
  console.log('verifying contracts...');

  console.log("verifying token contract on etherscan..");
  await run('verify:verify', {
    address: `${TOKEN_CONTRACT_ADDRESS}`,
    contract: "contracts/token/UbuntuToken.sol:UbuntuToken",
    constructorArguments: [],
  })
  console.log('verified');


  console.log("verifying vesting contract on etherscan..");
  await run('verify:verify', {
    address: `${VESTING_CONTRACT_ADDRESS}`,
    contract: "contracts/distribution/UbuntuVesting.sol:UbuntuVesting",
    constructorArguments: [
      `${TOKEN_CONTRACT_ADDRESS}`
    ],
  })
  console.log('verified');

  console.log("verifying allocation contract on etherscan..");
  await run('verify:verify', {
    address: `${ALLOCATION_CONTRACT_ADDRESS}`,
    contract: "contracts/distribution/UbuntuAllocation.sol:UbuntuAllocation",
    constructorArguments: [
      `${TOKEN_CONTRACT_ADDRESS}`
    ],
  })
  console.log('verified');

  console.log('done verifying contracts');

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
