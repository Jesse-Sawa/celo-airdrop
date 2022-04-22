var Airdrop = artifacts.require("Airdrop");

module.exports = function (deployer) {
  deployer.deploy(
    Airdrop,
    // Token Address
    "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9", 
    // Merkle root
    "0x7ecb997833ad5774cf633610d0fab6ba8cc826f1e910596b2c3943899fadcdef"
  );
};
