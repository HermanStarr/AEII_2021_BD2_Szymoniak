import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, {useState} from "react";
import {PaginatedResult, ImageThumbResponse} from "../../model/dto";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ImageDialog} from "./ImageDialog";
import {Pagination} from "@material-ui/lab";

type Props = {
  tiles: PaginatedResult<ImageThumbResponse>;
  onPageChange: (value: string) => void;
}

export const ImagesGrid = (props: Props) => {
 const classes = useStyles();
 const [imageId, setImageId] = useState<number | null>(null);
 const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
            <img src={`data:image/jpeg;base64,${tile.thumb}`} alt={tile.title}/>
            <GridListTileBar
              title={tile.title}
              titlePosition="bottom"
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
      <Pagination
        count={Math.ceil(props.tiles.totalElements / 9)}
        shape="rounded"
        showFirstButton
        showLastButton
        className={classes.pagination}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          props.onPageChange(`pageSize=9&pageNumber=${value - 1}&`);
            console.log(value);
        }}/>
      <ImageDialog
        imageId={imageId}
        dialogOpened={dialogOpen}
        onClose={() => {
          setImageId(null);
          setDialogOpen(false);
        }} />
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
      paddingTop: 10,
    },
  }),
);

export default ImagesGrid;