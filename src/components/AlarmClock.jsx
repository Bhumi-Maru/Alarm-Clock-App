import React, { useState, useEffect } from "react";
import "../components/AlarmClock.css";
import ringtone from "../components/ringtone.mp3";

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmHour, setAlarmHour] = useState("");
  const [alarmMinute, setAlarmMinute] = useState("");
  const [alarmSecond, setAlarmSecond] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    if (isAlarmSet) {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentSecond = currentTime.getSeconds();

      if (
        currentHour === parseInt(alarmHour) &&
        currentMinute === parseInt(alarmMinute) &&
        currentSecond === parseInt(alarmSecond)
      ) {
        setIsRinging(true);
      }
    }

    return () => clearInterval(timer);
  }, [currentTime, alarmHour, alarmMinute, alarmSecond, isAlarmSet]);

  const handleAlarmHourChange = (event) => {
    setAlarmHour(event.target.value);
  };

  const handleAlarmMinuteChange = (event) => {
    setAlarmMinute(event.target.value);
  };

  const handleAlarmSecondChange = (event) => {
    setAlarmSecond(event.target.value);
  };

  const handleSetAlarm = () => {
    setIsAlarmSet(true);
    setIsRinging(false);
    alert(`Alarm set for ${alarmHour}:${alarmMinute}:${alarmSecond}`);
  };

  const handleStopAlarm = () => {
    setIsRinging(false);
    setIsAlarmSet(false);
  };

  return (
    <div className="alarm-clock">
      <h1>Alarm Clock</h1>
      <div className="clock">
        {isRinging ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Alarm_Clock_GIF_Animation_High_Res.gif?20180920132247"
            alt=""
          />
        ) : (
          <img
            src="https://codingnepalweb.com/demos/alarm-clock-javascript/files/clock.svg"
            alt=""
          />
        )}

        <p style={{ fontWeight: "bold" }}>{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="set-alarm">
        <div className="alarm-label">
          <label>Hour :</label>
          &nbsp;
          <label>Minute :</label>
          &nbsp;
          <label>Second :</label>&nbsp;
        </div>
        <div className="alarm-input">
          <input
            type="number"
            value={alarmHour}
            onChange={handleAlarmHourChange}
            min="0"
            max="23"
          />
          &nbsp;&nbsp;
          <input
            type="number"
            value={alarmMinute}
            onChange={handleAlarmMinuteChange}
            min="0"
            max="59"
          />
          &nbsp;&nbsp;
          <input
            type="number"
            value={alarmSecond}
            onChange={handleAlarmSecondChange}
            min="0"
            max="59"
          />
        </div>
        <br />
        <button onClick={handleSetAlarm}>Set Alarm</button>
      </div>
      {isRinging && (
        <>
          <div className="ringing">
            <p>Alarm is ringing!</p>
            <button onClick={handleStopAlarm}>Stop Alarm</button>
            <audio src={ringtone} autoPlay loop />
          </div>
        </>
      )}
    </div>
  );
};

export default AlarmClock;
