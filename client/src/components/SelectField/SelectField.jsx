function SelectField({ value, onChange, options, emptyLabel }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {emptyLabel !== undefined && <option value="">{emptyLabel}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default SelectField;