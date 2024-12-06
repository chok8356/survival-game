import { Accessor, Component } from 'solid-js';
import styles from './index.module.scss';

const getDisplayTimeBySeconds = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${addLeadingZero(min)}:${addLeadingZero(sec)}`;
};

function addLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export const Timer: Component<{ seconds: Accessor<number>; class: string }> = (props) => {
  return (
    <div class={[props.class, styles.timer].join(' ')}>
      {getDisplayTimeBySeconds(props.seconds())}
    </div>
  );
};
