import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TOKEN_DECIMALS_DEFAULT, TOKEN_DISPLAY_PRECISION } from "./constants";
import BigNumber from "bignumber.js";
import { UseBalanceReturnType } from "wagmi";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// get a formatted string representation of a token amount truncated to a specific decimal place
export const formatTokenAmount = (
    value: BigNumber | BigInt,
    precision: number = TOKEN_DISPLAY_PRECISION,
    decimals: number = TOKEN_DECIMALS_DEFAULT
): string => {
    if (typeof value === typeof BigNumber) {
        return (value as BigNumber)
            .dividedBy(+`1e${decimals || TOKEN_DECIMALS_DEFAULT}`)
            .decimalPlaces(precision)
            .toLocaleString();
    } else {
        return new BigNumber(value.toString())
            .dividedBy(+`1e${decimals || TOKEN_DECIMALS_DEFAULT}`)
            .decimalPlaces(precision)
            .toLocaleString();
    }
};

// get a formatted string representation of wagmi balance truncated to a specific decimal place
export const formatBalance = (
    balance: UseBalanceReturnType,
    precision: number = TOKEN_DISPLAY_PRECISION
): string => {
    let bigNumBalance = balanceToBigNumber(balance);

    return bigNumBalance
        .dividedBy(+`1e${balance.data?.decimals || TOKEN_DECIMALS_DEFAULT}`)
        .decimalPlaces(precision)
        .toLocaleString();
};

// get a BigNumber object from wagmi balance object
export const balanceToBigNumber = (
    balance: UseBalanceReturnType
): BigNumber => {
    return balance.data?.value
        ? BigNumber(balance.data.value.toString())
        : BigNumber(0);
};
