export default function GraphIconButton({ title, iconURL, onClick, hoverEffect, hasBackground, isFlippedGraph, isSelected }) {
    return (
        <button
            className={`rounded-md mx-2 
                ${hasBackground && `bg-stone-300 hover:bg-white `}
                ${hoverEffect === 'spin' && `transition-all duration-300 hover:rotate-180 `}
                ${isSelected && 'scale-125'}`
            }
            title={title}
            onClick={() => {onClick()}}
        >
            <img className={`${isFlippedGraph && !hoverEffect && 'rotate-180'} w-10 transition-all duration-300`}
                src={iconURL}
            />
        </button>
    );
}