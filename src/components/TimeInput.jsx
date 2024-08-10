import { useRef } from "react";

export default function TimeInput({ index, timeInputValues, handleNewMaxTime, maxVal=9 }) {

    const inputRef = useRef();

    const handleIncrement = () => {
        const currentVal = Number(inputRef.current.value)
        if (currentVal >= maxVal) {
            inputRef.current.value = '0';
        } else {
            inputRef.current.value = String(currentVal + 1);
        }
        handleNewMaxTime(index, inputRef.current.value);
    };

    const handleDecrement = () => {
        const currentVal = Number(inputRef.current.value)
        if (currentVal <= 0) {
            inputRef.current.value = `${maxVal}`;
        } else {
            inputRef.current.value = String(currentVal - 1);
        }
        handleNewMaxTime(index, inputRef.current.value);
    };

    const handleUpdateValue = (event) => {
        handleNewMaxTime(index, event.target.value);
    }

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <button className="text-4xl" onClick={handleIncrement}>⬆</button>
            <input
                ref={inputRef}
                defaultValue={Math.floor(timeInputValues[index])}
                className="w-28 text-black"
                type="text"
                maxLength="1"
                pattern={`[0-9]`}
                onChange={handleUpdateValue}
                onFocus={handleFocus}
                onInput={(e) => {
                    // Remove any non-digit characters
                    if (maxVal === 9) { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1); }
                    else { e.target.value = e.target.value.replace(/[^0-5]/g, '').slice(0, 1); }

                }}
            />
            <button className="text-4xl" onClick={handleDecrement}>⬇</button>
        </div>
    );
}