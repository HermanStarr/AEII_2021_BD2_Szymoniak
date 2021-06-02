import React, {useEffect, useState} from 'react';
import {
  Avatar, createStyles, Grid,
  IconButton, makeStyles,
  Modal, Theme,
  Typography
} from "@material-ui/core";
import {photos} from "./photos";
import {ImageResponse, TagResponse, UserResponse} from "../../model/dto";
import useWindowDimensions from "../../shared/WindowDimensions";
import ScrollContainer from "react-indiana-drag-scroll";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {blobToSource} from "../../shared/FileEdition";
import ImageDetails from "./ImageDetails";
import {getImage} from "../../actions/images";

type Props = {
  imageId: number | null;
  dialogOpened: boolean;
  onClose: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: 50,
      height: 50,
    },
  }),
);

export const ImageDialog = (props: Props) => {
  const [image, setImage] = useState<ImageResponse | null>(null);
  const { height, width } = useWindowDimensions();
  const [modalHeight, setModalHeight] = useState<number>(900);
  const [modalWidth, setModalWidth] = useState<number>(1000);
  const [renderDetails, setRenderDetails] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    if(props.imageId !== null) {
      getImage(props.imageId).then(response => {
        setImage(response);
        console.log(response);
      })
    } else {
      setImage(null);
    }
  }, [props.imageId]);


  useEffect(() => {
    setModalHeight(height - 10);
    setModalWidth(width - 250);
  }, [height, width]);
  return (
    <Modal
      open={props.dialogOpened}
      onClose={() => {
        setRenderDetails(false);
        props.onClose();
      }}
      style={{
        left: (width - modalWidth) * 0.5,
        width: modalWidth,
        height: modalHeight,
        top: 10,
      }}
    >
      <div style={{
        background: '#ffffff',
        borderRadius: 5,
      }}>
        {image && (
          <>
            {renderDetails ? (
              <>
                <ImageDetails
                  width={modalWidth}
                  height={modalHeight}
                  tags={['']}
                  categories={['']}
                  image={image}
                  onClose={() => setRenderDetails(false)}/>
              </>
            ) : (
              <>
                <Grid container alignItems="center" style={{padding: 2}}>
                  <Grid item xs={10}>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Avatar
                          aria-label="recipe"
                          src={''}
                          onClick={() => {}}
                          className={classes.large}/>
                      </Grid>
                      <div style={{width: 20}} />
                      <Grid item>
                        <Typography variant="h4">
                          {image.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container direction="row" alignItems="center" justify="flex-end">
                      <Grid item>
                        <IconButton
                          aria-label="settings"
                          onClick={() => setRenderDetails(true)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{
                  width: '100%',
                  height: 0.667 * modalHeight,
                }}>
                  <ScrollContainer
                    className="scroll-container"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: modalWidth,
                      height: 0.667 * modalHeight,
                      backgroundColor: '#000000',
                    }}>
                    <img
                      src={`data:image/jpeg;base64,${image.image}`}
                      alt={image.name}
                      style={{
                        //width: window.innerWidth * coefficient,
                        //height: window.innerHeight * coefficient
                      }}/>
                  </ScrollContainer>
                </Grid>
                <div
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    height: 0.14667 * modalHeight,
                    paddingTop: 0.02 * modalHeight,
                    textOverflow: 'ellipsis'
                  }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{fontSize: 0.015 * modalHeight}}
                  >
                    {image.description}
                  </Typography>
                </div>
                <div style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  height: 0.05333 * modalHeight,
                  paddingTop: 0.02 * modalHeight,
                  paddingBottom: 0.01333 * modalHeight
                }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{fontSize: 0.015 * modalHeight}}
                  >
                    {' '}
                  </Typography>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </Modal>
  );
}
