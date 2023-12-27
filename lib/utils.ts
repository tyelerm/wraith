import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TOKEN_DISPLAY_PRECISION } from "./constants";
import BigNumber from "bignumber.js";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatTokenAmount = (value: BigNumber | BigInt): string => {
    if (typeof value === typeof BigNumber) {
        return (value as BigNumber)
            .dividedBy(1e18)
            .decimalPlaces(TOKEN_DISPLAY_PRECISION)
            .toLocaleString();
    } else {
        return new BigNumber(value.toString())
            .dividedBy(1e18)
            .decimalPlaces(TOKEN_DISPLAY_PRECISION)
            .toLocaleString();
    }
};
