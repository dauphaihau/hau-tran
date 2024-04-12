import '@mantine/core/styles.css';

import './App.css';
import { useState } from 'react';
import { Button, Input, LoadingOverlay, Space, Title, Box } from '@mantine/core';
import Select from './components/Select';
import { usePrices } from './components/Prices';

function App() {
  const { currencyOptions, rates, isLoading } = usePrices()
  const [amountOut, setAmountOut] = useState();
  const [amountIn, setAmountIn] = useState();
  const [currency1, setCurrency1] = useState('ETH');
  const [currency2, setCurrency2] = useState('USDC');

  const onAmountIn = (amount) => {
    setAmountIn(amount)
    setAmountOut(amount * rates.get(currency1) / rates.get(currency2))
  }

  const onAmountOut = (amount) => {
    setAmountOut(amount)
    setAmountIn(amount * rates.get(currency2) / rates.get(currency1))
  }

  const onSelectCurrency1 = (val) => {
    setCurrency1(val)
    setAmountIn(null)
    setAmountOut(null)
  }

  const onSelectCurrency2 = (val) => {
    setCurrency2(val)
    setAmountIn(null)
    setAmountOut(null)
  }

  if (isLoading) {
    return <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
    />
  }
  return (
    <div className="App">
      <div className="App-content">
        {
          currencyOptions.length > 0 ?
            <Box style={{ background: 'white' }} px={40} py={30} mb={99}>
              <Title size="xl">Swap</Title>
              <Space h="md"/>
              <Select
                value={currency1}
                onSelect={onSelectCurrency1}
                optionsProps={currencyOptions}
                label="From"
              />
              <Space h="md"/>
              <Select
                value={currency2}
                onSelect={onSelectCurrency2}
                optionsProps={currencyOptions}
                label="To"
              />
              <Space h="md"/>
              <Input.Wrapper label="Amount to send" mb={12}>
                <Input
                  value={amountIn || ''}
                  onChange={(event) => onAmountIn(event.currentTarget.value)}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Amount to receive" mb={12}>
                <Input
                  value={amountOut || ''}
                  onChange={(event) => onAmountOut(event.currentTarget.value)}
                />
              </Input.Wrapper>
              <Space h="md"/>
              <Button disabled={!amountIn && !amountOut} fullWidth variant="filled">Confirm swap</Button>
            </Box>
            : null
        }
      </div>
    </div>
  );
}

export default App;
