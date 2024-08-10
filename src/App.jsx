import { useState, useEffect, useRef } from 'react';
import Strategy from './util/Strategy';
import GraphIconButton from './components/GraphIconButton';
import TopBar from './components/TopBar';
import SineIcon from './assets/Sine.svg';
import LinearIcon from './assets/Linear.svg';
import QuadIcon from './assets/Quad.svg';
import SwapIcon from './assets/Swap.svg';
import AlarmSound from './assets/01AlarmRing.mp3';
import TimerContainer from './components/TimerContainer';
import AlertBox from './components/AlertBox';

const Themes = [
  {
    name: 'blue',
    primaryColor: 'bg-sakaBlue-200',
    primaryTextColor: 'text-sakaBlue-200',
    secondaryColor: 'bg-sakaBlue-50',
    secondaryTextColor: 'text-sakaBlue-50',
    backgroundColor: 'bg-sakaBlue-100',
    backgroundTextColor: 'text-sakaBlue-100',
  },
  {
    name: 'pink',
    primaryColor: 'bg-sakaPink-200',
    primaryTextColor: 'text-sakaPink-200',
    secondaryColor: 'bg-sakaPink-50',
    secondaryTextColor: 'text-sakaPink-50',
    backgroundColor: 'bg-sakaPink-100',
    backgroundTextColor: 'text-sakaPink-100',
  },
  {
    name: 'green',
    primaryColor: 'bg-sakaGreen-200',
    primaryTextColor: 'text-sakaGreen-200',
    secondaryColor: 'bg-sakaGreen-50',
    secondaryTextColor: 'text-sakaGreen-50',
    backgroundColor: 'bg-sakaGreen-100',
    backgroundTextColor: 'text-sakaGreen-100',
  },
  {
    name: 'yellow',
    primaryColor: 'bg-sakaYellow-200',
    primaryTextColor: 'text-sakaYellow-200',
    secondaryColor: 'bg-sakaYellow-50',
    secondaryTextColor: 'text-sakaYellow-50',
    backgroundColor: 'bg-sakaYellow-100',
    backgroundTextColor: 'text-sakaYellow-100',
  },
];

export default function App() {

  const alarmRef = useRef();

  const [currentTheme, setCurrentTheme] = useState(
    Themes.find(theme => theme.name === 'blue')
  );
  const [maxTime, setMaxTime] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(maxTime);
  const [isFlippedGraph, setIsFlippedGraph] = useState(false);
  const [timeType, setTimeType] = useState(new Strategy.LinearTime());
  const [selectedGraph, setSelectedGraph] = useState('Linear');
  const [isEditingTimer, setIsEditingTimer] = useState(false);
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => Math.max(prevTime - 0.1, 0));
      }, 100);
      document.title = `[${convertTime(getDisplayedTime())}] Graphed Timer`
    } else if (currentTime === 0) {
      handleResetClick();
      handleTimesUp();
    }
    return () => clearInterval(interval); // Clean up the interval on unmount or timer change
  }, [timerRunning, currentTime]);

  function convertTime(time) {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function handleTimesUp() {
    if (!timesUp) {
      alarmRef.current.play();
      setTimesUp(true);
    } else {
      alarmRef.current.pause();
      alarmRef.current.currenTime = 0;
      setTimesUp(false);
    }
  }

  /*
    BUTTON HANDLING
  */
  function handleToggleTimerClick() {
    setTimerRunning((prevTimer) => !prevTimer);
  }

  function handleResetClick() {
    setTimerRunning(false);
    setCurrentTime(maxTime);
    document.title = 'Graphed Timer';
  }

  /*
    EDITING TIMER
  */

  function handleIsEditClick() {
    if (!timerRunning) {
      setIsEditingTimer(true);
      console.log(isEditingTimer);
    }
  }

  function handleEditTimer(updatedTime) {
    setMaxTime(updatedTime);
    setCurrentTime(updatedTime);
    setIsEditingTimer(false);
    console.log(isEditingTimer);
  }

  /*
    GRAPH
  */
  function handleGraphChange(strategy, graphName) {
    //setCurrentTime(maxTime);
    setTimeType(strategy);
    setSelectedGraph(graphName);

    console.log(`graph: ${graphName}`);
  }

  function getDisplayedTime() {
    return timeType.manipulateTime(maxTime, currentTime, isFlippedGraph);
  }

  function handleFlipGraph() {
    setIsFlippedGraph(prev => !prev);
    console.log(isFlippedGraph)
  }

  /*
    THEMES
  */
  function handleThemeChange(themeName) {
    setCurrentTheme(Themes.find(theme => theme.name === themeName));
  }

  /*
    OTHER
  */

  return (
    <>
      {timesUp && <AlertBox title='Times Up' message='yes' currentTheme={currentTheme} handleTimesUp={handleTimesUp} />}
      <audio ref={alarmRef} src={AlarmSound} loop/>
      <TopBar handleThemeChange={handleThemeChange} currentTheme={currentTheme} />
      <div id='screen-container'
        className={`${currentTheme.backgroundColor} flex flex-col items-center justify-center h-screen select-none transition-all duration-300`}
      >

        <TimerContainer
          maxTime={maxTime}
          currentTime={currentTime}
          currentTheme={currentTheme}
          handleToggleTimerClick={handleToggleTimerClick}
          timerRunning={timerRunning}
          convertTime={convertTime}
          getDisplayedTime={getDisplayedTime}
          handleResetClick={handleResetClick}
          isEditingTimer={isEditingTimer}
          handleIsEditClick={handleIsEditClick}
          handleEditTimer={handleEditTimer}
        />

        {/* <button onClick={handleResetClick}>Stop</button> */}
        <div id='graph-selector-container' className={`${currentTheme.secondaryColor} p-4 rounded-md`}>
          <GraphIconButton title='Linear'
            hasBackground={true}
            isFlippedGraph={isFlippedGraph}
            iconURL={LinearIcon} onClick={() => handleGraphChange(new Strategy.LinearTime(), 'Linear')}
            isSelected={selectedGraph === 'Linear'}
          />
          <GraphIconButton title='Sinusoidal'
            hasBackground={true}
            isFlippedGraph={isFlippedGraph}
            iconURL={SineIcon} onClick={() => handleGraphChange(new Strategy.SinusoidalTime(), 'Sinusoidal')}
            isSelected={selectedGraph === 'Sinusoidal'}
          />
          <GraphIconButton title='Quadratic'
            hasBackground={true}
            isFlippedGraph={isFlippedGraph}
            iconURL={QuadIcon} onClick={() => handleGraphChange(new Strategy.QuadraticTime(), 'Quadratic')}
            isSelected={selectedGraph === 'Quadratic'}
          />
          <GraphIconButton title='Swap' iconURL={SwapIcon} isFlippedGraph={isFlippedGraph} hoverEffect={'spin'} onClick={handleFlipGraph} />
        </div>
      </div>
    </>
  );
}
