import { ethers, getNamedAccounts } from "hardhat"
import { VerifySignature } from "../typechain-types"

const testVerify = async () => {
    const accounts = await ethers.getSigners()
    const { deployer } = await getNamedAccounts()
    const verifyContract: VerifySignature = await ethers.getContract("VerifySignature", deployer)

    let message =
        "Zero Kage. Address 0xd7Dd548772fF126999a1a02640beFA34C2ce470B. Txn hash 0x02aac2ccdd58fbba060c3a5aadd290b9acd20f0fd15a3ed0159c41e2d02610d1"

    // Sign the string message
    let flatSig = await accounts[0].signMessage(message)

    let sig = ethers.utils.splitSignature(flatSig)

    let recovered = await verifyContract.verifyString(message, sig.v, sig.r, sig.s)

    console.log("signature byte code", flatSig)
    console.log("recovered address", recovered)
    console.log("signed address", accounts[0].address)
}

testVerify()
    .then(() => {
        console.log("test verification completed")
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
