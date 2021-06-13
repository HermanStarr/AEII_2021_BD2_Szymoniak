import Chip from "@material-ui/core/Chip";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import React from "react";
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {FilterOptionsState} from "@material-ui/lab";

type Props ={
  options: {name: string, id: number, avatar?: React.ReactElement}[];
  onChange: (value: string[] | any[]) => void;
  placeholder?: string;
  label?: string;
  freeSolo?: boolean;
  values?: {name: string, id: number, avatar?: React.ReactElement}[];
  darkMode?: boolean;
  limitTags?: number;
  isFormik?: boolean;
};

const _filterOptions = createFilterOptions();
const filterOptions = (options: unknown[], state: FilterOptionsState<unknown>) => {
  const result = _filterOptions(options, state);

  if (result.length === 0) {
    return _filterOptions(options, {
      ...state,
      // @ts-ignore
      getOptionLabel: (o) => o.id.toString()
    });
  }

  return result;
};

export const FilterSelect = (props: Props) => {
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
        color: props.darkMode ? '#000000' : '#ffffff',
      },
      chip: {
        color: props.darkMode ? '#000000' : '#ffffff',
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
        color: props.darkMode ? '#000000' : '#ffffff',
      },
    }),
  );

  const classes = useStyles();

  return (
    <div className={classes.search}>
      <Autocomplete
        value={props.values}
        multiple
        limitTags={props.limitTags ?? 2}
        classes={{root: classes.inputRoot, input: classes.inputInput}}
        options={props.options}
        getOptionLabel={(option) => (option as ({name: string, id: number, avatar?: React.ReactElement})).name}
        filterOptions={filterOptions}
        freeSolo={props.freeSolo ?? true}
        renderTags={(value, getTagProps) =>
          (value as ({name: string, id: number, avatar?: React.ReactElement})[])
            .map((option: {name: string, id: number, avatar?: React.ReactElement}, index: number) => (
              <Chip
                avatar={option.avatar}
                variant="outlined"
                label={option.name}
                style={{color: props.darkMode ? '#000000' : '#ffffff'}}
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
          if (!props.isFormik) {
            props.onChange((value as ({ name: string, id: number, avatar?: React.ReactElement })[]).map(val => val.id.toString()));
          } else {
            props.onChange((value as ({ name: string, id: number, avatar?: React.ReactElement })[]));
          }
        }}
      />
    </div>
  );
}

export default FilterSelect;
