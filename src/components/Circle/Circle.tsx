import React from "react";
import { Circle } from "rc-progress";
import s from "./Circle.module.scss";


export interface Props {
    percent: number;
    currentKudos?: number;
    neededKudos?: number;
    goal?: string;
    strokeColor?: string
}

const CustomCircle: React.FC<Props> = ({
  percent,
  currentKudos,
  neededKudos,
  goal,
  strokeColor,
}) => (
  <div className={s.wrapper}>
    {currentKudos != null && (
      <span className={s.title} style={{ color: "grey" }}>
        <h2 style={{ color: "rgba(0, 0, 0, 0.85)" }}>{currentKudos}₭</h2>of{" "}
        {neededKudos}₭ for {goal}
      </span>
    )}
    <Circle
      percent={percent}
      strokeWidth={12}
      trailWidth={12}
      strokeLinecap="butt"
      strokeColor={strokeColor}
    />
  </div>
);

export default CustomCircle;
