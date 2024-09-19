import { useState } from 'react'
import InputBox from './component/input'
import Currencyinfo from './hooks/Currencyinfo'

function App() {
  const [amount, setamount] = useState('')
  const [convertamount, setconvertamonunt] = useState(0);
  const [optionfrom, setoptionfrom] = useState("usd")
  const [optionto, setoptionto] = useState("pkr")
  let swap = () => {
    setoptionfrom(optionto)
    setoptionto(optionfrom)
    setamount(convertamount)
    setconvertamonunt(amount)
  }
  let currencyinfo = Currencyinfo(optionfrom);
  let options = Object.keys(currencyinfo);

  let convert = () => {
    const result = (parseFloat(amount) * currencyinfo[optionto]).toFixed(1)
     setconvertamonunt(result)
     
     console.log(amount)
     
}

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}     >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                onamountchange={(value) => {
                  if (value == '' || isNaN(value)) {
                    setamount('') 
                    setconvertamonunt(0) 
                  } else {
                    setamount(parseFloat(value)) // valid number conversion
                    const result = (parseFloat(value) * currencyinfo[optionto]).toFixed(1)
                    setconvertamonunt(result) 
                  }
                }}
                
                currencyoption={options}
                oncurrencychange={(currency) => {
                  setoptionfrom(currency)
                }}
                selectcurrency={optionfrom}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amountdisable={true}
                amount={convertamount}
                currencyoption={options}
                oncurrencychange={(currency) => {
                  setoptionto(currency)
                  const result = (parseFloat(amount) * currencyinfo[currency]).toFixed(1)
                  setconvertamonunt(result)
                }}
                selectcurrency={optionto}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
