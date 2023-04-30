import { BasicCountryData } from './BasicCountryData';
import { CountryList } from './CountryList';

export const CountriesContent = ({ countries }) => {
  if (!countries || !countries.length) {
    return <p>No countries to display</p>;
  }

  if (countries.length === 1) {
    const [country] = countries;

    return <BasicCountryData country={country} />;
  }

  if (countries.length <= 10) {
    return <CountryList list={countries} />;
  }

  return <p>Too many matches.</p>;
};
