export const Persons = ({ list }) => {
  if (!list.length) {
    return <p>Phonebook is empty</p>;
  }

  return (
    <ul>
      {list.map((i) => (
        <li key={i.id}>
          {i.name} {i.number}
        </li>
      ))}
    </ul>
  );
};
