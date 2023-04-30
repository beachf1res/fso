import { useState } from 'react';
import { BasicCountryData } from './BasicCountryData';

export const CountryListItem = ({ country }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p>{country.name.official}</p>
      <button onClick={() => setIsExpanded((prev) => !prev)}>show more</button>
      {isExpanded && <BasicCountryData country={country} />}
    </div>
  );
};
