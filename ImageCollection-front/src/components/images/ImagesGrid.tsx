import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, {useState} from "react";
import {TileImageResponse} from "../../model/dto";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ImageDialog} from "./ImageDialog";

type Props = {
  tiles: TileImageResponse[];
}

export const ImagesGrid = (props: Props) => {
 const classes = useStyles();
 const [imageId, setImageId] = useState<number | null>(null);
 const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <GridList spacing={10} className={classes.gridList} cols={3}>
        {props.tiles.map((tile) => (
          <GridListTile
            key={tile.thumb}
            cols={1}
            rows={2}
            onClick={() => {
              setImageId(tile.id);
              setDialogOpen(true);
            }}>
            <img src={tile.thumb} alt={tile.title} />
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
  }),
);

export default ImagesGrid;