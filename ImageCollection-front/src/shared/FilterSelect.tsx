import Chip from "@material-ui/core/Chip";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from "react";
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";


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
    <div className={classes.search}>
      <Autocomplete
        multiple
        limitTags={2}
        classes={{root: classes.inputRoot, input: classes.inputInput}}
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
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 10,
      width: 300,
    },
    input: {
      color: '#ffffff',
    },
    selected: {
      color: fade(theme.palette.common.white, 0.85),
      fontWeight: 100,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  }),
);

export default FilterSelect;
