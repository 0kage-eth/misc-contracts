import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"

const deployVerifyContract = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const tx = await deploy("VerifySignature", {
        log: true,
        args: [],
        from: deployer,
        waitConfirmations: 1,
    })

    log("Verify contract deployed successfully")
    log("----------------------")
}

export default deployVerifyContract

deployVerifyContract.tags = ["main", "verify"]
