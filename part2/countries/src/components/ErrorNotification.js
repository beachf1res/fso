export const ErrorNotification = ({ message }) => {
  if (!message.length) {
    return null;
  }

  return (
    <p
      style={{
        fontSize: '1.25rem',
        color: 'red',
        padding: '0.5rem',
        border: '1px solid gray',
      }}
    >
      {message}
    </p>
  );
};
