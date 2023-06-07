import { onTransacionHandler, OnRpcRequestHandler } from '@metamask/snaps-types';
import { heading, panel, text, copyable, divider, spinner } from '@metamask/snaps-ui';

export const onTransaction: onTransacionHandler = async ({ transaction }) => {

  const currentGasPrice = await window.ethereum.request({
    method: 'eth_gasPrice',
  });

  const transactionGas = parseInt(transaction.gas as string, 16);
  const currentGasPriceInWei = parseInt(currentGasPrice ?? '', 16);
  const maxFeePerGasInWei = parseInt(transaction.maxFeePerGas as string, 16);
  const maxPriorityFeePerGasInWei = parseInt(
    transaction.maxPriorityFeePerGas as string,
    16,
  );

  const gasFees = Math.min(
    maxFeePerGasInWei * transactionGas,
    (currentGasPriceInWei + maxPriorityFeePerGasInWei) * transactionGas,
  );

  const transactionValueInWei = parseInt(transaction.value as string, 16);
  const gasFeesPercentage = (gasFees / (gasFees + transactionValueInWei)) * 100;

  return {
    content: panel([
      heading('Welcome to Ethcon!'),
      text(
        'Ethereum Developer Conference 100% Run by Community Volunteers.',
        'When: Sep 1st (FRI), 2023 ~ Sep 3rd (SUN), 2023',
        'Where: @Platz2, Sungsoo, Seoul',
      ),
      divider(),
      copyable('https://ethcon.kr')
    ]),
  };
};


export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'hello':
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading(`Welcome to SoulMate`),
            text('This is Ad platform!'),
            text('Enjoy your money journey :)'),
          ]),
        },
      });

    default:
      throw new Error('Method not found.');
  }
};
