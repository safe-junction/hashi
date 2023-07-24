// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.17;

contract DummyOracle {
    event RequestProcessed(bytes request, uint256 destinationChainId);

    function processRequest(bytes calldata request, uint256 destinationChainId) external {
        emit RequestProcessed(request, destinationChainId);
    }
}
