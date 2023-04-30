import { CountryListItem } from './CountryListItem';

export const CountryList = ({ list }) => {
  return (
    <div style={{ maxWidth: '60%', marginInline: 'auto' }}>
      <h4>List of Countries</h4>
      <div>
        {list.map((item) => (
          <CountryListItem country={item} key={item.name.official} />
        ))}
      </div>
    </div>
  );
};
