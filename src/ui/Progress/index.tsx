import { Circle } from "rc-progress";
import styles from "./styles.module.css";

export interface ProgressProps {
  percent: number;
  currentKudos?: number;
  neededKudos?: number;
  goal?: string;
}

function ProgressCircle({
  percent,
  currentKudos,
  neededKudos,
  goal,
}: ProgressProps) {
  const achievedColor = "#24b371";
  const defaultColor = "#bfdbcf";

  return (
    <div className={styles.wrapper}>
      {currentKudos != null && (
        <span className={styles.title}>
          <h2 className={styles.current}>
            {currentKudos}
            <span className={styles.kudo_symbol}>₭</span>
          </h2>
          <span className={styles.needed}>
            of {neededKudos}₭ for {goal}
          </span>
        </span>
      )}
      <Circle
        percent={percent}
        strokeWidth={10}
        trailWidth={10}
        strokeLinecap="butt"
        strokeColor={achievedColor}
        trailColor={defaultColor}
      />
    </div>
  );
}

export default ProgressCircle;
