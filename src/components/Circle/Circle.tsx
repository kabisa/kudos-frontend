import React from 'react';
import { Circle } from 'rc-progress';
import s from './Circle.module.scss';

export interface Props {
  percent: number;
  currentKudos?: number;
  neededKudos?: number;
  goal?: string;
  strokeColor?: string;
}

function CustomCircle(props: Props): React.ReactElement {
  return (
    <div className={s.wrapper}>
      {props.currentKudos != null && (
        <span className={s.title} style={{ color: 'grey' }}>
          <h2 data-testid="current-kudos" className={s.current}>
            {props.currentKudos}
            <span style={{ fontSize: '35px', margin: 0, padding: 0 }}>₭</span>
          </h2>
          <span data-testid="goal-kudos" className={s.needed}>of {props.neededKudos}₭ for {props.goal}</span>
        </span>
      )}
      <Circle
        percent={props.percent}
        strokeWidth={10}
        trailWidth={10}
        strokeLinecap="butt"
        strokeColor={props.strokeColor}
        trailColor="#B2CBC1"
      />
    </div>
  );
}

export default CustomCircle;
