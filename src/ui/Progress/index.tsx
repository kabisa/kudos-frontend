import { Circle } from "rc-progress";
import styles from "./styles.module.css";
import Heading from "../Heading";
import Currency from "../Currency";

export interface KudosProgressProps {
  percent: number;
  currentKudos: number;
  neededKudos: number;
  goal: string;
}

const KudosProgress = ({
  percent,
  currentKudos = 0,
  neededKudos,
  goal,
}: KudosProgressProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        <Heading tag="h2" size="secondary">
          <Currency amount={currentKudos} />
        </Heading>
        <span className={styles.needed}>
          of <Currency amount={neededKudos || 0} /> for {goal}
        </span>
      </span>

      <Circle
        percent={percent}
        strokeWidth={10}
        trailWidth={10}
        strokeLinecap="butt"
        strokeColor="var(--kabisa-green)"
        trailColor="var(--kabisa-green-100)"
      />
    </div>
  );
};

const EmptyProgress = () => {
  return (
    <div className={styles.wrapper}>
      <Circle
        percent={0}
        strokeWidth={10}
        trailWidth={10}
        strokeLinecap="butt"
        strokeColor="var(--kabisa-green)"
        trailColor="var(--kabisa-green-100)"
      />
    </div>
  );
};

export { KudosProgress, EmptyProgress };
