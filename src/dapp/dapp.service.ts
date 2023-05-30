import { NETWORKS } from './dapp.connect';
import { EscrowParams } from './dapp.types';
import { dappConfig } from './dapp.config';
import Web3 from 'web3';

export const allowance = async (web3: Web3, token: string, amount: number, verifiedOrg: boolean) => {
  // TODO: we may configure this fee ratio later
  const fee = verifiedOrg ? 0.02 : 0.03;
  const allowanceAmount = amount + amount * fee;

  const erc20Contract = new web3.eth.Contract(dappConfig.abis.token, token);

  const chainId = await web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];

  const approved = await erc20Contract.methods
    .approve(selectedNetwork.escrow, web3.utils.toWei(allowanceAmount.toString()))
    .send({ from: web3.eth.defaultAccount });

  if (!approved) throw new Error('Allowance not approved for escorw');
};

export const balance = async (web3: Web3, token: string) => {
  const erc20Contract = new web3.eth.Contract(dappConfig.abis.token, token);

  const result = await erc20Contract.methods.balanceOf(web3.eth.defaultAccount);

  return web3.utils.fromWei(result);
};

export const withdrawnEscrow = async (web3: Web3, escrowId: string) => {
  // TODO: get this from contributor info
  const chainId = await web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];
  const escrowContract = new web3.eth.Contract(dappConfig.abis.escrow, selectedNetwork.escrow);

  const result = await escrowContract.methods.withdrawn(escrowId).send({ from: web3.eth.defaultAccount });

  return result.transactionHash;
};

export const escrow = async (params: EscrowParams) => {
  const chainId = await params.web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];
  let token = params.token;
  if (!token) token = selectedNetwork.tokens[0].address;

  // First need allowance to verify that transaction is possible for smart contract
  await allowance(params.web3, token, params.escrowAmount, params.verifiedOrg);

  const escrowContract = new params.web3.eth.Contract(dappConfig.abis.escrow, selectedNetwork.escrow);

  const result = await escrowContract.methods
    .newEscrow(
      params.contributor,
      params.projectId,
      params.web3.utils.toWei(params.escrowAmount.toString()),
      params.verifiedOrg,
      token
    )
    .send({ from: params.web3.eth.defaultAccount });

  // Need to share <txHash> to backend on Payment API to verify and create Escrow on BE side too
  const txHash = result.transactionHash;
  return {
    // Escrow Action will trigger right after success Escrow
    ...result.events.EscrowAction.returnValues,
    txHash,
  };
};
