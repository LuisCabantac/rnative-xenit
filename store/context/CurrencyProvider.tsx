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
  choices: { id: string; value: string; text: string }[];
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
    { id: "AU", value: "AUD", text: "Australian Dollar" },
    { id: "BG", value: "BGN", text: "Bulgarian Lev" },
    { id: "BR", value: "BRL", text: "Brazilian Real" },
    { id: "CA", value: "CAD", text: "Canadian Dollar" },
    { id: "CH", value: "CHF", text: "Swiss Franc" },
    { id: "CN", value: "CNY", text: "Chinese Renminbi Yuan" },
    { id: "CZ", value: "CZK", text: "Czech Koruna" },
    { id: "DK", value: "DKK", text: "Danish Krone" },
    { id: "EU", value: "EUR", text: "Euro" },
    { id: "GB", value: "GBP", text: "British Pound" },
    { id: "HK", value: "HKD", text: "Hong Kong Dollar" },
    { id: "HU", value: "HUF", text: "Hungarian Forint" },
    { id: "ID", value: "IDR", text: "Indonesian Rupiah" },
    { id: "IL", value: "ILS", text: "Israeli New Sheqel" },
    { id: "IN", value: "INR", text: "Indian Rupee" },
    { id: "IS", value: "ISK", text: "Icelandic Króna" },
    { id: "JP", value: "JPY", text: "Japanese Yen" },
    { id: "KR", value: "KRW", text: "South Korean Won" },
    { id: "MX", value: "MXN", text: "Mexican Peso" },
    { id: "MY", value: "MYR", text: "Malaysian Ringgit" },
    { id: "NO", value: "NOK", text: "Norwegian Krone" },
    { id: "NZ", value: "NZD", text: "New Zealand Dollar" },
    { id: "PH", value: "PHP", text: "Philippine Peso" },
    { id: "PL", value: "PLN", text: "Polish Złoty" },
    { id: "RO", value: "RON", text: "Romanian Leu" },
    { id: "SE", value: "SEK", text: "Swedish Krona" },
    { id: "SG", value: "SGD", text: "Singapore Dollar" },
    { id: "TH", value: "THB", text: "Thai Baht" },
    { id: "TR", value: "TRY", text: "Turkish Lira" },
    { id: "US", value: "USD", text: "United States Dollar" },
    { id: "ZA", value: "ZAR", text: "South African Rand" },
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
