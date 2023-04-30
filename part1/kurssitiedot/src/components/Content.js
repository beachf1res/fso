import { Part } from './Part';

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part {...part} key={index} />
      ))}
    </div>
  );
};
