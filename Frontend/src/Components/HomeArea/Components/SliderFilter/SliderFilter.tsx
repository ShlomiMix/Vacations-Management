import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import "./SliderFilter.css";

interface Props {
  onChange: (minPrice: number, maxPrice: number) => void;
  minPrice: number;
  maxPrice: number;
}

const marks = [
  {
    value: 1,
    label: "1$",
  },
  {
    value: 3500,
    label: "3500$",
  },
  {
    value: 7000,
    label: "7000$",
  },
  {
    value: 10000,
    label: "10000$",
  },
];

function SliderFilter({ onChange, minPrice, maxPrice }: Props): JSX.Element {
  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = () => {
    onChange(value[0], value[1]);
  };

  return (
    <div className="SliderFilter">
      <Box sx={{ width: 200 }}>
        <Typography color={"black"}>Price</Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          min={1}
          max={10000}
          marks={marks}
        />
      </Box>
    </div>
  );
}

export default SliderFilter;
