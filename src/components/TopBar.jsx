import ThemeOptionButton from "./ThemeOptionButton";

export default function TopBar({handleThemeChange, currentTheme}) {
    return(
        <header className="absolute p-4">
            <h1 className="text-white text-5xl font-bold">Graphed Timer</h1>
            <div>
                <ThemeOptionButton isSelected={currentTheme.name === 'blue'} color='blue' handleThemeChange={handleThemeChange}/>
                <ThemeOptionButton isSelected={currentTheme.name === 'pink'} color='pink' handleThemeChange={handleThemeChange}/>
                <ThemeOptionButton isSelected={currentTheme.name === 'green'} color='green' handleThemeChange={handleThemeChange}/>
                <ThemeOptionButton isSelected={currentTheme.name === 'yellow'} color='yellow' handleThemeChange={handleThemeChange}/>
            </div>
        </header>
    );
}