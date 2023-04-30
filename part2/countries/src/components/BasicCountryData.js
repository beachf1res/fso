export const BasicCountryData = ({ country }) => {
  console.log(country);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p>
        <b>Languages:</b>
      </p>
      <div>
        {Object.values(country.languages).map((value) => (
          <p>{value}</p>
        ))}
      </div>
      <p>Flag:</p>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};
