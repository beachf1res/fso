import { StatsLine } from './StatsLine';

export const Stats = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <StatsLine title={'good'} content={good} />
        <StatsLine title={'neutral'} content={neutral} />
        <StatsLine title={'bad'} content={bad} />
        <StatsLine title={'all'} content={good + bad + neutral} />
        <StatsLine
          title={'average'}
          content={`${Math.floor(good + bad + neutral / 3)}%`}
        />
        <StatsLine
          title={'positive'}
          content={`${Math.floor((good / (bad + good + neutral)) * 100)}%`}
        />
      </tbody>
    </table>
  );
};
