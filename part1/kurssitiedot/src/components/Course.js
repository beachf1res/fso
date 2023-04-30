import React from 'react';
import { Header } from './Header';
import { Part } from './Part';

export const Course = ({ name, parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header title={name} />
      {parts.map((part) => (
        <Part {...part} key={part.id} />
      ))}
      <p>
        <b>Total courses: {total}</b>
      </p>
    </div>
  );
};
