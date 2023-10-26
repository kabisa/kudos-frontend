import { Circle } from "rc-progress";
import styles from "./styles.module.css";

export interface KudosProgressProps {
  percent: number;
  currentKudos?: number;
  neededKudos?: number;
  goal?: string;
}

function KudosProgress({
  percent,
  currentKudos,
  neededKudos,
  goal,
}: KudosProgressProps) {
  const achievedColor = "#24b371";
  const defaultColor = "#bfdbcf";

  return (
    <div className={styles.wrapper}>
      {currentKudos != null && (
        <span className={styles.title}>
          <h2 className={styles.current}>
            {currentKudos}
            <span>₭</span>
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

export default KudosProgress;
