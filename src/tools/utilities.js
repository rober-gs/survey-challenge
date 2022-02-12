import { ethers } from "ethers";

export const shortenAddress = (address, start=5, end=4) => {
    if (!address) return '';
    return !!address && `${address.substring(0, start)}...${address.substring(address.length - end)}`;
};
export const customFormat = (weis) => {          
    const wei = ethers.BigNumber.from(weis).toString();                
    const ether = ethers.utils.formatEther(wei);        
    return parseFloat(ether); 
}