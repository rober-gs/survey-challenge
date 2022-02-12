import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import json from '../contracts/QuizManager.json';

const useContract = () => {

    const {abi} =  json;

    const address = "0xc378d0cac90ee1d296cb6c964751b3913a4ad43f";

    if (address === AddressZero || !address) throw Error(`Invalid 'contractAddress' parameter '${address}'.`);
    
    const { library, account } = useWeb3React();
    const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library;

    return useMemo(() => {
        return new Contract(address, abi, signerOrProvider);
    }, [address, abi, signerOrProvider]);
}

export default useContract;
