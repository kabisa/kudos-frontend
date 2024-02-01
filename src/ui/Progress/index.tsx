import { Circle } from "rc-progress";
import styles from "./styles.module.css";
import Heading from "../Heading";
import Currency from "../Currency";

export type KudosProgressData =
  | KudosLoadingStateProps
  | KudosErrorStateProps
  | KudosProgressStateProps;

type KudosLoadingStateProps = { state: "loading" };
type KudosErrorStateProps = { state: "error"; error: string };
type KudosProgressStateProps = {
  state: "success";
  currentKudos: number;
  neededKudos: number;
  goal: string;
};

type KudosProgressProps = {
  data: KudosProgressData;
};

const KudosProgressLoading = () => (
  <>
    <div className={styles.titleContainer} aria-busy="true">
      <Heading tag="h2" size="secondary">
        Loading...
      </Heading>
    </div>
    <Circle
      percent={100}
      strokeWidth={10}
      trailWidth={10}
      strokeLinecap="butt"
      strokeColor="gray"
      trailColor="red"
    />
  </>
);
const KudosProgressError = ({ error }: { error: string }) => (
  <>
    <div className={styles.titleContainer}>
      <Heading tag="h2" size="secondary">
        Error!
      </Heading>
      <strong>{error}</strong>
    </div>
    <Circle
      percent={100}
      strokeWidth={10}
      trailWidth={10}
      strokeLinecap="butt"
      strokeColor="red"
      trailColor="red"
    />
  </>
);

const KudosProgressTitle = ({
  currentKudos,
  neededKudos,
  goal,
}: Omit<KudosProgressStateProps, "state">) => (
  <Heading tag="h2" size="primary">
    <Currency amount={currentKudos} />
    <div className={styles.needed}>
      of <Currency amount={neededKudos} /> for {goal}
    </div>
  </Heading>
);

const KudosProgress = ({ data }: KudosProgressProps) => (
  <section className={styles.wrapper}>
    {data.state === "loading" && <KudosProgressLoading />}
    {data.state === "error" && <KudosProgressError error={data.error} />}
    {data.state === "success" && (
      <>
        <div className={styles.titleContainer}>
          <KudosProgressTitle
            currentKudos={data.currentKudos}
            neededKudos={data.neededKudos}
            goal={data.goal}
          />
        </div>
        <Circle
          percent={(data.currentKudos / data.neededKudos) * 100}
          strokeWidth={10}
          trailWidth={10}
          strokeLinecap="butt"
          strokeColor="var(--kabisa-green)"
          trailColor="var(--kabisa-green-100)"
        />
      </>
    )}
  </section>
);

export default KudosProgress;
