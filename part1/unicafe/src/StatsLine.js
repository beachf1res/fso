export const StatsLine = ({ title, content }) => {
  return (
    <tr>
      <td>
        {title}: {content}
      </td>
    </tr>
  );
};
