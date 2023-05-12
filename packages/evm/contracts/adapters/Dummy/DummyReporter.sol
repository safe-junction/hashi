// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.17;

import { IMessageRelay } from "../../interfaces/IMessageRelay.sol";

interface IDummyOracle {
    function processRequest(bytes calldata request, uint256 chainId) external;
}

contract DummyReporter is IMessageRelay {
    address public immutable dummyOracle;
    uint256 public immutable destinationChainId;

    event RelayMessage(uint256 messageId, address adapter);

    constructor(address dummyOracle_, uint256 destinationChainId_) {
        dummyOracle = dummyOracle_;
        destinationChainId = destinationChainId_;
    }

    function relayMessages(uint256[] memory messageIds, address adapter) external payable returns (bytes32 receipts) {
        for (uint256 index = 0; index < messageIds.length; ) {
            IDummyOracle(dummyOracle).processRequest(abi.encodePacked(messageIds[index], adapter), destinationChainId);

            unchecked {
                ++index;
            }
        }

        return bytes32(0);
    }
}
