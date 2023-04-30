export const Persons = ({ list, onDelete }) => {
  if (!list.length) {
    return <p>Phonebook is empty</p>;
  }

  return (
    <ul>
      {list.map((i) => (
        <li key={i.id}>
          <div
            style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}
          >
            <p>
              {i.name} {i.number}
            </p>
            <button onClick={() => onDelete(i)}>delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
