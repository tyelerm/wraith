import { balanceToBigNumber, formatTokenAmount } from "@/lib/utils";
import BigNumber from "bignumber.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { UseBalanceReturnType } from "wagmi";

interface AmountInputProps {
    balance: UseBalanceReturnType;
    onChange: (params: { amount?: BigNumber; error?: string }) => void;
    value?: BigNumber;
}

export const AmountInput: FC<AmountInputProps> = ({
    balance,
    onChange,
    value,
}) => {
    const defaultInputValue = value ? formatTokenAmount(value) : "";
    const [inputValue, setInputValue] = useState(defaultInputValue);

    const processOnChangeCallback = (amount?: BigNumber) => {
        if (amount) {
            const error = amount.gt(balanceToBigNumber(balance))
                ? "Insufficient balance"
                : undefined;

            return onChange({ amount, error });
        } else {
            return onChange({});
        }
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const decimals = balance.data?.decimals || 18;
        const regexToken = `^(?!0\\d|\\.)\\d*(?:\\.\\d{0,${decimals}})?$`;
        const INPUT_REGEX = new RegExp(regexToken);
        const isInputValid = INPUT_REGEX.test(value);
        const amount =
            value.length > 0 && isInputValid
                ? new BigNumber(value).times(BigNumber(1e18))
                : undefined;

        if (isInputValid) {
            setInputValue(value);
            processOnChangeCallback(amount);
        }
    };

    const setTo = (ratio: number) => {
        let _balance = balanceToBigNumber(balance);
        if (_balance.gt(0)) {
            setInputValue(formatTokenAmount(_balance.times(ratio)));
            processOnChangeCallback(_balance.times(ratio));
        } else {
            setInputValue("");
            processOnChangeCallback();
        }
    };

    useEffect(() => {
        // Reset the input when the chain or the token are changed
        if (value === undefined) {
            setInputValue("");
        }
    }, [value]);

    return (
        <div className="flex flex-col p-2 text-right min-w-[180px] w-full">
            <input
                onChange={onInputChange}
                placeholder="0.00"
                value={inputValue}
                className="text-right bg-[unset] text-[1.6rem] mb-1 outline-none w-inherit"
            />
            <div className="flex gap-x-1 text-[0.65rem] text-indigo-400 justify-end">
                <button
                    onClick={() => setTo(0.25)}
                    className="w-12 text-center border border-indigo-400 rounded-full"
                >
                    25%
                </button>
                <button
                    onClick={() => setTo(0.5)}
                    className="w-12 text-center border border-indigo-400 rounded-full"
                >
                    50%
                </button>
                <button
                    onClick={() => setTo(0.75)}
                    className="w-12 text-center border border-indigo-400 rounded-full"
                >
                    75%
                </button>
                <button
                    onClick={() => setTo(1)}
                    className="w-12 text-center border border-indigo-400 rounded-full"
                >
                    MAX
                </button>
            </div>
        </div>
    );
};
