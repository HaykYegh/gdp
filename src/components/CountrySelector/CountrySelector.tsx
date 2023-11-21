'use client'
import React, {useState, useEffect, useId} from 'react';
import axios from 'axios';
import Select, {GetOptionLabel, SingleValue} from 'react-select';
import {CountryData, CountryOption} from "@/components/CountrySelector/CountrySelectorTypes";

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState<SingleValue<CountryOption>>(null);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const selectId = useId()
  useEffect(() => {
    const fetchCountries = async () => {
      const result = await axios('/api/countries');
      const options: CountryOption[] = result.data.map((country: any) => ({
        value: country.value,
        label: `${country.label}`,
        flag: country.flag
      }));
      setCountryOptions(options);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (selectedOption: SingleValue<CountryOption>) => {
    setSelectedCountry(selectedOption);
    if (!selectedOption) return;
    const result = await axios(`/api/country/${selectedOption.value}`);
    setCountryData(result.data.gdp);
  };

  return (
    <div className="content">
      <Select
        instanceId={selectId}
        options={countryOptions}
        onChange={handleCountryChange}
        getOptionLabel={(option: CountryOption) => (
          <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={option.flag} alt={option.label} width="20" style={{ marginRight: '10px' }} />
            {option.label}
          </div>
        ) as any}
        value={selectedCountry}
      />
      {countryData && (
        <div className="perCapita">
          <p>{countryData.indicator.value}: {countryData.value}</p>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
