import { h } from "preact";
import { Circle } from "rc-progress";
import s from "./Circle.scss";

const CustomCircle = ({ percent, text, strokeColor }) => (
  <div className={s.wrapper}>
    <h3 className={s.title}>{text}</h3>
    <Circle
      percent={percent}
      strokeWidth="4"
      initialAnimate
      strokeColor={strokeColor}
    />
  </div>
);

export default CustomCircle;
