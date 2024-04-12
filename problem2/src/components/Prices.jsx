import { useCallback, useEffect, useState } from 'react';
import { getPrices } from '../proxies/getPrices';

export const usePrices = () => {
  const [prices, setPrices] = useState([])
  const [rates, setRates] = useState(new Map());
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchRates = useCallback(
    async () => {
      await getPrices().then((prices) => {
        setPrices(prices)
        setIsLoading(false)

        if (prices && prices.length > 0) {
          const optionsTemp = []
          const ratesTemp = new Map()
          prices.forEach(item => {
            if (!optionsTemp.includes(item.currency)) {
              optionsTemp.push(item.currency)
            }
            if (!ratesTemp.has(item.currency)) {
              ratesTemp.set(item.currency, item.price)
            }
          })
          setCurrencyOptions(optionsTemp)
          setRates(ratesTemp)
        }
      })
        .catch((err) => {
          console.log('error', err.message)
        })
    },
    [],
  )

  useEffect(() => {
    fetchRates()
  }, [])

  return { prices, rates, currencyOptions, isLoading }
}
