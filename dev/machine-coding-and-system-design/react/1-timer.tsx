import { ComponentProps, HTMLInputTypeAttribute, useCallback, useEffect, useState } from "react";

type TimerInput = Readonly<{
  hours: number;
  minutes: number;
  seconds: number;
}>;

const Timer = () => {
  const [timerInput, setTimerInput] = useState<TimerInput>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  //   const [seconds, setSeconds] = useState(0);
  //   const [minutes, setMinutes] = useState(0);
  //   const [hours, setHours] = useState(0);

  const [timerLeft, setTimerLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  console.log({ timerLeft });

  const updateTimer = useCallback((key: keyof TimerInput, value: number) => {
    setTimerInput((prevTimer) => ({
      ...prevTimer,
      [key]: Math.max(0, value), // Ensure non-negative values
    }));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timerLeft > 0) {
      timer = setTimeout(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isRunning, timerLeft]);

  const startTimer = () => {
    const totalTimeInSeconds =
      timerInput.hours * 60 * 60 + timerInput.minutes * 60 + timerInput.seconds;
    setTimerLeft(totalTimeInSeconds);
    setIsRunning(true);

    console.log("starting timer");
  };

  const resetTimer = () => {
    console.log("resetting timer");
    setIsRunning(false);
    setTimerInput({
      seconds: 0,
      minutes: 0,
      hours: 0,
    });

    setTimerLeft(0);
  };

  return (
    <div>
      <div>
        <InputWrapper
          id="hours"
          label="Hours"
          inputProps={{
            //   type: "number" as HTMLInputTypeAttribute,
            value: timerInput.hours,
            onChange: (e) => updateTimer("hours", Number(e.target.value)),
          }}
        />
        <InputWrapper
          id="minutes"
          label="Minutes"
          inputProps={{
            //  type: "number" as HTMLInputTypeAttribute,
            value: timerInput.minutes,
            onChange: (e) => updateTimer("minutes", Number(e.target.value)),
          }}
        />
        <InputWrapper
          id="seconds"
          label="Seconds"
          inputProps={{
            //   type: "number" as HTMLInputTypeAttribute,
            value: timerInput.seconds,
            onChange: (e) => updateTimer("seconds", Number(e.target.value)),
          }}
        />
      </div>

      <button onClick={startTimer}>Start Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
};

export default Timer;

type Props = {
  inputProps: ComponentProps<"input">;
  label: string;
  id: string;
};

const InputWrapper = ({ id, inputProps, label, ...rest }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...inputProps} />
    </div>
  );
};
