import { Header, Content, Total } from './components';

function App() {
  const course = 'Half Stack application development';
  const parts = [
    { title: 'Fundamentals of React', count: 10 },
    { title: 'Using props to pass data', count: 7 },
    { title: 'State of component', count: 14 },
  ];
  const total = parts.reduce((acc, part) => part.count + acc, 0);
  console.log(total);

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
}

export default App;
