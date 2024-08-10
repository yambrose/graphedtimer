import { useState, useEffect } from "react";
import TimeInput from "./TimeInput";

export default function TimerEditBox({ currentTheme, handleEditTimer, maxTime }) {

    const [newMaxTime, setNewMaxTime] = useState(maxTime);

    const minutes = Math.floor(maxTime / 60);
    const seconds = maxTime % 60;
    const timeArray = [
        Math.floor(minutes / 10), // tens place of minutes
        minutes % 10,             // ones place of minutes
        Math.floor(seconds / 10),  // tens place of seconds
        seconds % 10              // ones place of seconds
    ];

    const [timeInputValues, setTimeInputValues] = useState(timeArray);

    function handleNewMaxTime(index, newValue) {
        setTimeInputValues(prevValues => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
    }

    useEffect(() => {
        console.log(timeInputValues);
    }, [timeInputValues]);

    function handleDeselectAndUpdate() {
        let totalSeconds = 
            (parseInt(timeInputValues[0], 10) * 10 + parseInt(timeInputValues[1], 10)) * 60 +
            (parseInt(timeInputValues[2], 10) * 10 + parseInt(timeInputValues[3], 10));
        
        if (totalSeconds === 0) totalSeconds = 1;
        handleEditTimer(totalSeconds);
    }
    

    return (
        <>
            <div id="background-darken" className="bg-black w-full h-full absolute z-20 opacity-25 backdrop-blur-md"
                onClick={handleDeselectAndUpdate} />
            <div className={`${currentTheme.primaryColor} p-2 rounded-md mb-4 z-20 flex justify-center`}>
                <p className='text-huge text-stone-100 font-round m-0 flex gap-2'>
                    <TimeInput index={0} timeInputValues={timeInputValues} handleNewMaxTime={handleNewMaxTime} maxVal={5} />
                    <TimeInput index={1} timeInputValues={timeInputValues} handleNewMaxTime={handleNewMaxTime} />
                    <div className="flex items-center">:</div>
                    <TimeInput index={2} timeInputValues={timeInputValues} handleNewMaxTime={handleNewMaxTime} maxVal={5} />
                    <TimeInput index={3} timeInputValues={timeInputValues} handleNewMaxTime={handleNewMaxTime} />
                </p>
            </div>
        </>
    );
}
