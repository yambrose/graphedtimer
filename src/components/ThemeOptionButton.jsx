export default function ThemeOptionButton({ isSelected, color, handleThemeChange }) {
    return (
        <button
            onClick={() => handleThemeChange(color)}
            className={`w-12 h-12 rounded-full m-3
                ${color === 'blue' && `bg-sakaBlue-50`} 
                ${color === 'pink' && `bg-sakaPink-50`} 
                ${color === 'green' && `bg-sakaGreen-50`} 
                ${color === 'yellow' && `bg-sakaYellow-50`} 
                ${isSelected && `outline-dashed outline-blue-600`}
                `}
        />
    );
}