// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.17;

import { OracleAdapter } from "../OracleAdapter.sol";

contract DummyAdapter is OracleAdapter {
    function storeMessage(uint256 chainId, uint256 id, bytes32 messageHash) public {
        _storeHash(uint256(chainId), id, messageHash);
    }
}
