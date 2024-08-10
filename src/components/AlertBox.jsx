export default function AlertBox({ title, message, currentTheme, handleTimesUp }) {
    return <>
        <div id="background-darken" className="bg-black w-full h-full absolute z-20 opacity-25 backdrop-blur-md" />

        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30
            flex flex-col justify-center items-center
            ${currentTheme.primaryColor} shadow-md select-none rounded-md p-4`}>


            <div className="text-stone-100 text-6xl font-bold leading-none flex">{title}
                <p className="animate-wiggle">🔔</p>
            </div>
            <button
                    className={`${currentTheme.primaryTextColor}
                        flex justify-center bg-stone-100 border-b-4 border-b-stone-400 text-xl font-semibold
                        px-16 py-2 mt-4 rounded-md w-1/3 active:translate-y-0.5 active:border-b-0`}
                    onClick={handleTimesUp}
                >

                    Close
                </button>
        </div>
    </>
}