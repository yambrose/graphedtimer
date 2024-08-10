import TimerEditBox from "./TimerEditBox";


export default function TimerContainer({
    currentTheme,
    handleToggleTimerClick,
    timerRunning, convertTime,
    getDisplayedTime,
    handleResetClick,
    isEditingTimer,
    handleIsEditClick,
    handleEditTimer,
    maxTime,
    currentTime,
}) {

    return (
        <div id='timer-container'
            className={`${currentTheme.secondaryColor} flex flex-col items-center justify-center p-6 m-4 leading-none rounded-md`}>

            {
                !isEditingTimer ? <div className={`${currentTheme.primaryColor} ${!timerRunning && maxTime === currentTime && 'hover:scale-105 cursor-text active:translate-y-1'}
                p-2 rounded-md mb-4`} onClick={handleIsEditClick}>
                    <p className='text-huge text-stone-100 font-round m-0'>
                        {convertTime(getDisplayedTime())}
                    </p>
                </div>
                :
                <TimerEditBox currentTheme={currentTheme} handleEditTimer={handleEditTimer} maxTime={maxTime}/>
            }


            <div id='button-row' className='flex justify-center h-12 w-full gap-2'>
                <button
                    className={`${currentTheme.primaryTextColor}
                        flex justify-center bg-stone-100 border-b-4 border-b-stone-400 text-xl font-semibold
                        px-16 py-2 rounded-md w-1/3 active:translate-y-0.5 active:border-b-0`}
                    onClick={handleToggleTimerClick}
                >

                    {!timerRunning ? 'START' : 'PAUSE'}
                </button>

                <button
                    className={`${currentTheme.primaryTextColor} flex justify-center text-xl font-semibold px-16 py-2 rounded-md w-1/3 border-b-stone-400 border-b-4
                    ${maxTime !== currentTime && 'bg-stone-100 active:translate-y-0.5 active:border-b-0'}
                    ${maxTime === currentTime && 'bg-stone-300'}`}
                    onClick={handleResetClick}
                >

                    RESET
                </button>



            </div>
        </div>
    );
}