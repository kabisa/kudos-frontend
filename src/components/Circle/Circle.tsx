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
          <h2 data-testid="current-kudos" style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{props.currentKudos}₭</h2>
          <span data-testid="goal-kudos">of {props.neededKudos}₭ for {props.goal}</span>
        </span>
      )}
      <Circle
        percent={props.percent}
        strokeWidth={12}
        trailWidth={12}
        strokeLinecap="butt"
        strokeColor={props.strokeColor}
      />
    </div>
  );
}

export default CustomCircle;
