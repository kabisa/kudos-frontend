import { Circle } from "rc-progress";
import s from "./Circle.module.scss";

export interface Props {
  percent: number;
  currentKudos?: number;
  defaultColor?: string;
  neededKudos?: number;
  goal?: string;
  strokeColor?: string;
}

function CustomCircle(props: Props) {
  return (
    <div className={s.wrapper}>
      {props.currentKudos != null && (
        <span className={s.title}>
          <h2 data-testid="current-kudos" className={s.current}>
            {props.currentKudos}
            <span className={s.kudo_symbol}>₭</span>
          </h2>
          <span data-testid="goal-kudos" className={s.needed}>
            of {props.neededKudos}₭ for {props.goal}
          </span>
        </span>
      )}
      <Circle
        percent={props.percent}
        strokeWidth={10}
        trailWidth={10}
        strokeLinecap="butt"
        strokeColor={props.strokeColor}
        trailColor={props.defaultColor}
      />
    </div>
  );
}

export default CustomCircle;
