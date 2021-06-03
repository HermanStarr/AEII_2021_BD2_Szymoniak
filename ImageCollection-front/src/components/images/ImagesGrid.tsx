import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, {useState} from "react";
import {PaginatedResult, ImageThumbResponse, ImageResponse} from "../../model/dto";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {ImageDialog} from "./ImageDialog";
import {Pagination} from "@material-ui/lab";
import {deleteImage} from "../../actions/images";
import {toast} from "react-toastify";
import {Grid, InputBase, NativeSelect} from "@material-ui/core";
import {withRouter, RouteComponentProps} from "react-router-dom";


type Props = {
  tiles: PaginatedResult<ImageThumbResponse>;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  onImageEdit: (image: ImageResponse) => void;
  pageSize: number;
} & RouteComponentProps


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
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  }),
)(InputBase);

export const ImagesGrid = (props: Props) => {
  const classes = useStyles();
  const [imageId, setImageId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onPageSizeChange(event.target.value as number);
  };

  return (
    <>
      <GridList spacing={10} className={classes.gridList} cols={3}>
        {props.tiles.items.map((tile) => (
          <GridListTile

            key={tile.id}
            cols={1}
            rows={2}
            onClick={() => {
              setImageId(tile.id);
              setDialogOpen(true);
            }}>
            <img src={`data:image/jpeg;base64,${tile.thumb}`} alt={tile.name}/>
            <GridListTileBar
              title={tile.name}
              titlePosition="bottom"
              actionIcon={
                <IconButton aria-label={`star ${tile.name}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center">
        <Grid item>
          <NativeSelect
            id="demo-customized-select-native"
            onChange={handlePageSizeChange}
            input={<BootstrapInput />}
          >
            {[9, 18, 27, 36].map(option =>
              <option value={option} key={option}>{option}</option>
            )}
          </NativeSelect>
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(props.tiles.elementCount / props.pageSize)}
            shape="rounded"
            showFirstButton
            showLastButton
            className={classes.pagination}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              props.onPageChange(value - 1);
            }}/>
        </Grid>
      </Grid>
      <ImageDialog
        {...props}
        imageId={imageId}
        dialogOpened={dialogOpen}
        onClose={() => {
          setImageId(null);
          setDialogOpen(false);
        }}
        onImageDelete={(imageId: number) => {
          setImageId(null);
          setDialogOpen(false);
          deleteImage(imageId).then(response => {
            toast.success(response.message);
          }).catch((error) => {
            toast.error("Error detected: " +  error.message);
          })
        }}
        onImageEdit={(image: ImageResponse) => {
          setImageId(null);
          setDialogOpen(false);
          props.onImageEdit(image);
        }}
      />
    </>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    gridList: {
      paddingTop: 10,
      width: '100%',
      transform: 'translateZ(0)',
    },
    titleBar: {
      background: '#afafaf',
    },
    icon: {
      color: 'white',
    },
    pagination: {

    },
  }),
);

export default withRouter(ImagesGrid);