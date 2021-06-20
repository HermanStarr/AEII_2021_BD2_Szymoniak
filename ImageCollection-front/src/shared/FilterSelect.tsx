import Chip from "@material-ui/core/Chip";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import React from "react";
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Grid, TextField} from "@material-ui/core";
import {FilterOptionsState} from "@material-ui/lab";

type Props ={
  options: Option[];
  onChange: (value: string[] | any[]) => void;
  placeholder?: string;
  label?: string;
  freeSolo?: boolean;
  values?: Option[];
  darkMode?: boolean;
  limitTags?: number;
  isFormik?: boolean;
};

type Option = {
  name: string;
  id: number | null;
  backup?: boolean;
}

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
        getOptionLabel={(option) => (option as Option).name}
        filterOptions={filterOptions}
        freeSolo={props.freeSolo ?? true}
        renderOption={option => (
          <React.Fragment>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                {(option as Option).name}
              </Grid>
              {(option as Option).backup && (
                <Grid>
                  <Avatar
                    src={'https://www.clipartmax.com/png/small/100-1001164_daily-automated-backups-backup-icon-png-white.png'}/>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        )}
        renderTags={(value, getTagProps) =>
          (value as Option[])
            .map((option: Option, index: number) => (
              <Chip
                avatar={option.backup ? (<Avatar src={'https://www.clipartmax.com/png/small/100-1001164_daily-automated-backups-backup-icon-png-white.png'}/>) : undefined}
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
            props.onChange((value as Option[]).map(val => val.id?.toString()));
          } else {
            props.onChange((value as Option[]));
          }
        }}
      />
    </div>
  );
}

export default FilterSelect;
