import { useCallback, useEffect, useState } from 'react';

import { countryService } from './services';

import './App.css';
import {
  Filter,
  CountryList,
  ErrorNotification,
  CountriesContent,
} from './components';

function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    if (!filter.length) {
      return;
    }

    const getMatchingCountries = setTimeout(() => {
      countryService
        .queryByName(filter)
        .then((r) => {
          setCountries(r);
        })
        .catch((e) => {
          const {
            response: { data },
          } = e;
          setError(`${data.status}: ${data.message}`);
          setTimeout(() => {
            setError('');
          }, 2000);
        });
    }, 300);

    return () => clearTimeout(getMatchingCountries);
  }, [filter]);

  const filterHandler = ({ target }) => {
    setFilter(target.value.trim().toLowerCase());
  };

  return (
    <div className='App'>
      <Filter value={filter} onFilterChange={filterHandler} />
      <ErrorNotification message={error} />
      <CountriesContent countries={countries} />
    </div>
  );
}

export default App;
