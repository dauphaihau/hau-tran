import { useEffect, useState } from 'react';
import { Combobox, useCombobox, TextInput, Box, Flex } from '@mantine/core';

export default function Select({
  onSelect = () => {},
  value: defaultValue,
  optionsProps, ...props
}) {

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState(defaultValue);

  const shouldFilterOptions = !optionsProps.some((item) => item === value);

  const filteredOptions = shouldFilterOptions
    ? optionsProps.filter((item) => item.toLowerCase().includes(value?.toLowerCase().trim()))
    : optionsProps;

  useEffect(() => {
    onSelect(value)
  }, [value])

  const options = filteredOptions.map((item, index) => (
    <Combobox.Option value={item} key={item + index}>
      <Flex align="center" gap={5}>
        <img
          src={`/images/tokens/${item}.svg`}
          alt="Token"
          width={20}
          height={20}
        />
        {item}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          {...props}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          rightSection={<Combobox.Chevron/>}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>

      </Combobox.Dropdown>
    </Combobox>
  );
}
