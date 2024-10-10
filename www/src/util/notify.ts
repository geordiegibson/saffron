import {subscribe_snip52_channels} from '@solar-republic/neutrino';
import { SecretNetworkClient } from 'secretjs';

const contractAddress = import.meta.env.VITE_contractAddress;

async function getPermit(address: string) {
    const permitName = "channel-info";
    const allowedTokens = [import.meta.env.VITE_contractAddress];
    const permissions = ["owner"];
    const chainId = "secretdev-1";

    const { signature } = await window.keplr.signAmino(
        chainId,
        address,
        {
            chain_id: chainId,
            account_number: "0", // Must be 0
            sequence: "0", // Must be 0
            fee: {
                amount: [{ denom: "uscrt", amount: "0" }], // Must be 0 uscrt
                gas: "1", // Must be 1
            },
            msgs: [
                {
                    type: "query_permit", // Must be "query_permit"
                    value: {
                        permit_name: permitName,
                        allowed_tokens: allowedTokens,
                        permissions: permissions,
                    },
                },
            ],
            memo: "", // Must be empty
        },
        {
            preferNoSetFee: true, // Fee must be 0, so hide it from the user
            preferNoSetMemo: true, // Memo must be empty, so hide it from the user
        }
    );
    let permit = {
        params: {
          permit_name: permitName,
          allowed_tokens: allowedTokens,
          chain_id: chainId,
          permissions,
        },
        signature: signature,
    };
    return permit;
}

async function notifyExample(secretjs: SecretNetworkClient) {
    const permit = getPermit(secretjs.address);
    await subscribe_snip52_channels("http://localhost:26657", contractAddress, permit, {
        accepted(data: [string]) {
            const [accepted_id] = data;

            // you got a notification for accepted id, do something with it here.
            console.log(accepted_id);
        }
    })
}

