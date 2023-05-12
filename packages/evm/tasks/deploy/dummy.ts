import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { task } from "hardhat/config"
import type { TaskArguments } from "hardhat/types"

import { verify } from "."
import type { DummyAdapter } from "../../types/contracts/adapters/Dummy/DummyAdapter"
import type { DummyReporter } from "../../types/contracts/adapters/Dummy/DummyReporter"
import type { DummyAdapter__factory } from "../../types/factories/contracts/adapters/Dummy/DummyAdapter__factory"
import { DummyReporter__factory } from "../../types/factories/contracts/adapters/Dummy/DummyReporter__factory"

// Deploy on destination chain
task("deploy:DummyAdapter")
  .addFlag("verify", "whether to verify the contract on Etherscan")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    console.log("Deploying DummyAdapter...")
    const signers: SignerWithAddress[] = await hre.ethers.getSigners()
    const dummyAdapterFactory: DummyAdapter__factory = <DummyAdapter__factory>(
      await hre.ethers.getContractFactory("DummyAdapter")
    )
    const constructorArguments = [] as const
    const dummyAdapter: DummyAdapter = <DummyAdapter>(
      await dummyAdapterFactory.connect(signers[0]).deploy(...constructorArguments)
    )
    await dummyAdapter.deployed()
    console.log("DummyAdapter deployed to:", dummyAdapter.address)
    if (taskArguments.verify) await verify(hre, dummyAdapter, constructorArguments)
  })

// Deploy on source chain
task("deploy:DummyReporter")
  .addParam("dummyOracle", "address of the dummy oracle contract")
  .addParam("chainId", "destination chain id")
  .addFlag("verify", "whether to verify the contract on Etherscan")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    console.log("Deploying DummyReporter...")
    const signers: SignerWithAddress[] = await hre.ethers.getSigners()
    const dummyReporterFactory: DummyReporter__factory = <DummyReporter__factory>(
      await hre.ethers.getContractFactory("DummyReporter")
    )
    const constructorArguments = [taskArguments.dummyOracle, taskArguments.chainId] as const
    const dummyReporter: DummyReporter = <DummyReporter>(
      await dummyReporterFactory.connect(signers[0]).deploy(...constructorArguments)
    )
    await dummyReporter.deployed()
    console.log("DummyReporter deployed to:", dummyReporter.address)
    if (taskArguments.verify) await verify(hre, dummyReporter, constructorArguments)
  })
