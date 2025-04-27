import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface ICurrencyContext {
  choiceFrom: string;
  choiceTo: string;
  input: string;
  convertedShort: string;
  convertedLong: string;
  convertedInverted: string;
  error: string;
  symbolFrom: string;
  symbolTo: string;
  choices: { value: string; label: string }[];
  dispatch: Dispatch<IAction>;
}

const initialValue: ICurrencyContext = {
  choiceFrom: "EUR",
  choiceTo: "USD",
  input: "1.00",
  convertedShort: "",
  convertedLong: "",
  convertedInverted: "",
  error: "",
  symbolFrom: "$",
  symbolTo: "€",
  choices: [],
  dispatch: () => null,
};

interface IState {
  choiceFrom: string;
  choiceTo: string;
  input: string;
  convertedShort: string;
  convertedLong: string;
  convertedInverted: string;
  error: string;
  symbolFrom: string;
  symbolTo: string;
}

interface IAction {
  type: string;
  payload: string;
}

const CurrencyContext = createContext(initialValue);

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "choiceOne":
      return { ...state, choiceFrom: action.payload };
    case "choiceTwo":
      return { ...state, choiceTo: action.payload };
    case "inputValue":
      return { ...state, input: action.payload };
    case "convertedShort":
      return { ...state, convertedShort: action.payload };
    case "convertedLong":
      return { ...state, convertedLong: action.payload };
    case "convertedInverted":
      return { ...state, convertedInverted: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "symbolOne":
      return { ...state, symbolFrom: action.payload };
    case "symbolTwo":
      return { ...state, symbolTo: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      choiceFrom,
      choiceTo,
      input,
      convertedShort,
      convertedLong,
      convertedInverted,
      error,
      symbolFrom,
      symbolTo,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);

  const choices = [
    { value: "AUD", label: "Australian Dollar" },
    { value: "BGN", label: "Bulgarian Lev" },
    { value: "BRL", label: "Brazilian Real" },
    { value: "CAD", label: "Canadian Dollar" },
    { value: "CHF", label: "Swiss Franc" },
    { value: "CNY", label: "Chinese Renminbi Yuan" },
    { value: "CZK", label: "Czech Koruna" },
    { value: "DKK", label: "Danish Krone" },
    { value: "EUR", label: "Euro" },
    { value: "GBP", label: "British Pound" },
    { value: "HKD", label: "Hong Kong Dollar" },
    { value: "HUF", label: "Hungarian Forint" },
    { value: "IDR", label: "Indonesian Rupiah" },
    { value: "ILS", label: "Israeli New Sheqel" },
    { value: "INR", label: "Indian Rupee" },
    { value: "ISK", label: "Icelandic Króna" },
    { value: "JPY", label: "Japanese Yen" },
    { value: "KRW", label: "South Korean Won" },
    { value: "MXN", label: "Mexican Peso" },
    { value: "MYR", label: "Malaysian Ringgit" },
    { value: "NOK", label: "Norwegian Krone" },
    { value: "NZD", label: "New Zealand Dollar" },
    { value: "PHP", label: "Philippine Peso" },
    { value: "PLN", label: "Polish Złoty" },
    { value: "RON", label: "Romanian Leu" },
    { value: "SEK", label: "Swedish Krona" },
    { value: "SGD", label: "Singapore Dollar" },
    { value: "THB", label: "Thai Baht" },
    { value: "TRY", label: "Turkish Lira" },
    { value: "USD", label: "United States Dollar" },
    { value: "ZAR", label: "South African Rand" },
  ];

  async function getJSON(url: string) {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Something went wrong ${response.status}`);
    else {
      try {
        return await response.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error parsing JSON: ${error.message}`);
        }
      }
    }
  }

  useEffect(
    function () {
      async function currencyFetch() {
        if (choiceFrom === choiceTo) return;
        try {
          const data = await Promise.all([
            getJSON(`https://api.vatcomply.com/rates?base=${choiceFrom}`),
            getJSON(`https://api.vatcomply.com/rates?base=${choiceTo}`),
          ]);

          const [_from, dataFrom] = data.map((d) => d.rates[choiceFrom]);
          const [dataTo, _to] = data.map((d) => d.rates[choiceTo]);

          if (!dataFrom || !dataTo) throw new Error("Unable to retrieve data");
          dispatch({
            type: "convertedLong",
            payload: (+input * dataTo).toFixed(4),
          });
          dispatch({
            type: "convertedShort",
            payload: (+input * dataTo).toFixed(2),
          });
          dispatch({
            type: "convertedInverted",
            payload: (+input * dataFrom).toFixed(4),
          });
        } catch (error) {
          if (error instanceof Error) {
            dispatch({
              type: "error",
              payload: `Something went wrong. ${
                error.message === "Failed to fetch"
                  ? "Please check your internet connection and try again."
                  : `${error.message}, Try again!`
              }`,
            });
          }
        }
      }
      currencyFetch();
    },
    [choiceFrom, choiceTo, input]
  );

  useEffect(
    function () {
      const renderCurrencySymbols = async function () {
        try {
          const data = await getJSON(`https://api.vatcomply.com/currencies`);
          dispatch({ type: "symbolOne", payload: data[choiceFrom].symbol });
          dispatch({ type: "symbolTwo", payload: data[choiceTo].symbol });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      };
      renderCurrencySymbols();
    },
    [choiceFrom, choiceTo]
  );

  return (
    <CurrencyContext.Provider
      value={{
        choiceFrom,
        choiceTo,
        input,
        convertedShort,
        convertedLong,
        convertedInverted,
        error,
        symbolFrom,
        symbolTo,
        choices,
        dispatch,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("CurrencyContext was used outside the CurrencyProvider");
  return context;
}

export { CurrencyProvider, useCurrency };
