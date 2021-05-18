import ScrollContainer from "react-indiana-drag-scroll";
import React from "react";
import {createStyles, Divider, Grid, IconButton, makeStyles, Theme, Typography, withStyles} from "@material-ui/core";
import {ImageResponse2} from "../../model/dto";
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  width: number;
  height: number;
  tags: string[];
  categories: string[];
  image: ImageResponse2;
  onClose: () => void;
}

const WhiteTextTypography = withStyles({
  root: {
    color: "#000"
  }
})(Typography);

const getImageSize = (size: number) => {
  if (size < 1024) {
    return `${size}B`
  } else if (size < 1048576) {
    return `${Math.ceil(size * 0.0009765625)}KB`
  } else {
    return `${Math.ceil(size * 0.00000095367431640625)}MB`
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
  }),
);

export const ImageDetails = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
      <ScrollContainer
        className="scroll-container"
        hideScrollbars={false}
        style={{
          width: props.width,
          height: props.height * 0.927,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Title:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.image.title}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Author:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.image.author}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Creation date:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.image.creationDate}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Size:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {getImageSize(props.image.size)}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Resolution:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.image.resolutionX}x{props.image.resolutionY}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Format:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.image.format}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Tags:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.tags.map(tag => (
                    <>
                      <a target="_blank" href="https://www.youtube.com/watch?v=qrxv0JNVtgY">{tag}</a>{' '}
                    </>
                  ))}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  Categories:
                </WhiteTextTypography>
              </Grid>
              <Grid item>
                <WhiteTextTypography gutterBottom variant="h5">
                  {props.categories.join(' ')}
                </WhiteTextTypography>
              </Grid>
            </Grid>
          </div>
      </ScrollContainer>
    </>
  )
}

export default ImageDetails;