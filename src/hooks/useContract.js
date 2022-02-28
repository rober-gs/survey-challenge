import { useMemo } from 'react';
import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import json from '../contracts/QuizManager.json';

const useContract = () => {
    
    const {abi, address} =  json;  
    
    if (address === AddressZero || !address) throw Error(`Invalid 'contractAddress' parameter '${address}'.`);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    return useMemo(() => {
        return new Contract(address, abi, signer);
    }, [address, abi, signer]);

}

export default useContract;
