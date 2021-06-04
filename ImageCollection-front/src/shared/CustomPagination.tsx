import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import {Grid, InputBase, NativeSelect} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";


const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      fontSize: 15,
      paddingLeft: '5px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
  }),
)(InputBase);

type Props = {
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  elementCount: number;
  pageSizes: ({ label: string, value: number } | number)[];
}

export const CustomPagination = (props: Props) => {
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (props.pageSizes !== []) {
      const size = typeof props.pageSizes[0] === 'number' ? props.pageSizes[0] : props.pageSizes[0].value;
      setPageSize(size);
      props.onPageSizeChange(size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageSizes])

  const mapOptions = () => {
    if (props.pageSizes.length > 0) {
      return (props.pageSizes).map((option: { label: string, value: number } | number) => {
        if (typeof option === 'number') {
          return <option value={option} key={option}>{option}</option>;
        }
        return <option value={option.value} key={option.value}>{option.label}</option>;
      });
    }
  }

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPageSize(event.target.value as number);
    props.onPageSizeChange(event.target.value as number);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center">
      <Grid item>
        Number of elements:
      </Grid>
      <Grid item>
        <NativeSelect
          onChange={handlePageSizeChange}
          input={<BootstrapInput/>}
        >
          {mapOptions()}
        </NativeSelect>
      </Grid>
      <Grid item>
        <Pagination
          count={Math.ceil(props.elementCount / pageSize)}
          shape="rounded"
          showFirstButton
          showLastButton
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            props.onPageChange(value - 1);
          }}/>
      </Grid>
    </Grid>
  );
}