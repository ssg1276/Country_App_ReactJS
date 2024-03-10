import React, { useState } from 'react'

function Country() {
  const [state, setState] = useState({
    InputValue: '',
    show: false,
    name: '',
    name2: '',
    area: '',
    source: '',
    population: '',
    currency: '',
    capital: '',
    loading: false,
    error: null,
  })

  const changeHandler = (event) => {
    setState({ ...state, InputValue: event.target.value, show: false })
  }

  const callAPI = () => {
    setState({ ...state, loading: true, error: null })

    fetch(
      `https://restcountries.com/v3.1/name/${state.InputValue}?fullText=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setState({
          ...state,
          show: true,
          name: data[0].name.common,
          name2: data[0].continents[0],
          area: data[0].area,
          source: data[0].flags.svg,
          population: data[0].population,
          currency: data[0].currencies[Object.keys(data[0].currencies)].name,
          capital: data[0].capital[0],
          loading: false,
        })
      })
      .catch((error) => {
        setState({ ...state, loading: false, error: 'Error fetching data' })
      })
  }

  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 w-full md:w-[550px] h-auto p-8 rounded-md shadow-lg text-white transition-transform transform hover:scale-105 mx-auto">
      <div className="flex flex-col  items-center justify-center  md:w-[550px] md:flex-row md:justify-center md:items-center">
        <input
          type="text"
          value={state.InputValue}
          onChange={changeHandler}
          className="p-4 m-2 outline rounded-md bg-white text-black focus:outline-none transition-colors duration-300 w-full md:w-auto"
          placeholder="Enter country name"
        />
        <button
          onClick={callAPI}
          disabled={state.loading}
          className="bg-yellow-400 text-black font-bold p-4 rounded-md mt-2 md:mt-0 hover:bg-yellow-500 focus:outline-none transition-all duration-300 transform hover:scale-105"
        >
          {state.loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      <div
        className={state.show ? 'flex flex-col items-center mt-6' : 'hidden'}
      >
        <img src={state.source} className="w-[150px] h-[80px]" alt="" />
        <p className="font-extrabold text-xl mt-4">{state.name}</p>
        <p className="font-bold">{state.name2}</p>
        <p className="text-black  font-black">
          Capital:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.capital}
          </span>
        </p>
        <p className="text-black  font-black">
          Area:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.area}sqm
          </span>
        </p>
        <p className="text-black  font-black">
          Population:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.population}
          </span>
        </p>
        <p className="text-black  font-black">
          Currency:{' '}
          <span className="text-white lowercase font-normal p-1">
            {state.currency}
          </span>
        </p>
        <div></div>
      </div>
      {state.error && (
        <p className="text-black  font-black">
          Error:{' '}
          <span className="text-white  font-normal  p-1">{state.error}</span>
        </p>
      )}
    </div>
  )
}

export default Country
