export const Notification = ({ notification }) => {
  const { message, isError } = notification;

  if (!message) {
    return null;
  }

  return (
    <div className={`notification ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  );
};
