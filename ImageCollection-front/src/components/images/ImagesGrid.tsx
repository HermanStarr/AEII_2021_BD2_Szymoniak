import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, {useState} from "react";
import {PaginatedResult, ImageThumbResponse, ImageResponse} from "../../model/dto";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ImageDialog} from "./ImageDialog";
import {deleteImage} from "../../actions/images";
import {toast} from "react-toastify";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {CustomPagination} from "../../shared/CustomPagination";
import {CircularProgress} from "@material-ui/core";


type Props = {
  tiles: PaginatedResult<ImageThumbResponse>;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  onImageEdit: (image: ImageResponse) => void;
  pageSize: number;
  isLoading?: boolean;
} & RouteComponentProps

export const ImagesGrid = (props: Props) => {
  const classes = useStyles();
  const [imageId, setImageId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      {props.isLoading ? <CircularProgress /> : (
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
        </>
      )}
      <CustomPagination
        onPageChange={props.onPageChange}
        onPageSizeChange={props.onPageSizeChange}
        elementCount={props.tiles.elementCount}
        pageSizes={[9,18,27,36]}/>
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
  }),
);

export default withRouter(ImagesGrid);