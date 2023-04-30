export const NewPersonForm = ({
  onSubmit,
  newName,
  onNewNameChange,
  newNumber,
  onNewNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={({ target }) => onNewNameChange(target.value.trim())}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={({ target }) => onNewNumberChange(target.value.trim())}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};
