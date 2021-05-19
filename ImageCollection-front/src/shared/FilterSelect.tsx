import Chip from "@material-ui/core/Chip";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from "react";
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import {FormControl, TextField} from "@material-ui/core";


type Props ={
  options: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  freeSolo?: boolean;
};

export const FilterSelect = (props: Props) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.filterActions}>
      <Autocomplete
        multiple
        limitTags={2}
        className={classes.selected}
        options={props.options}
        freeSolo={props.freeSolo ?? true}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              style={{color: "white"}}
              {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            placeholder={props.placeholder}
            className={classes.input}
          />
        )}
        onChange={(event, value) => {
          props.onChange(value);
        }}
      />
    </FormControl>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterActions: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      width: 300,
      fontWeight: 100,
      color: "white",
      marginLeft: 10,
    },
    input: {
      color: '#ffffff',
    },
    selected: {
      color: fade(theme.palette.common.white, 0.85),
      fontWeight: 100,
    },
  }),
);

export default FilterSelect;
