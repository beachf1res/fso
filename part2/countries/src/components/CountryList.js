export const CountryList = ({ list }) => {
  return (
    <div style={{ maxWidth: '60%', marginInline: 'auto' }}>
      <h4>List of Countries</h4>
      <div>
        {list.map((item) => (
          <p key={item.name.official}>{item.name.common}</p>
        ))}
      </div>
    </div>
  );
};
