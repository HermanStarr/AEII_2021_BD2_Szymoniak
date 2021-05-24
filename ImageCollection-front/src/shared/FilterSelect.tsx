import Chip from "@material-ui/core/Chip";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from "react";
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";


type Props ={
  options: {name: string, avatar?: React.ReactElement}[];
  onChange: (value: string) => void;
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
        options={props.options.map(option => option.name)}
        freeSolo={props.freeSolo ?? true}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              avatar={props.options[index].avatar}
              variant="outlined"
              label={option}
              style={{color: '#ffffff'}}
              className={classes.chip}
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
          props.onChange((value as string[]).join('%5Cu007c'));
        }}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.3),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.45),
      },
      width: '100%',
    },
    input: {
      color: '#ffffff',
    },
    chip: {
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
      width: '100%',
      color: '#ffffff',
    },
  }),
);

export default FilterSelect;
