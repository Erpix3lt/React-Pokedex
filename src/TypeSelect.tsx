import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface SelectProps {
  onSelect: (selectedValue: string) => void;
  type: string;
}

const TypeSelect: React.FC<SelectProps> = ({onSelect, type}) => {

  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value as string)
  };

  return (
<div className='w-40'>
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Type"
        onChange={(value) => {handleChange(value)}}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="grass">Grass</MenuItem>
        <MenuItem value="fire">Fire</MenuItem>
        <MenuItem value="water">Water</MenuItem>
        <MenuItem value="bug">Bug</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="poison">Poison</MenuItem>
        <MenuItem value="electric">Electric</MenuItem>
      </Select>
    </FormControl>
    </div>

  )
}

export default TypeSelect