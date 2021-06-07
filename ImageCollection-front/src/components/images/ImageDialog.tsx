import React, {useContext, useEffect, useState} from 'react';
import {
  Avatar, createStyles, Grid,
  IconButton, makeStyles,
  Modal, Theme,
  Typography
} from "@material-ui/core";
import {ImageResponse, UserPublicResponse} from "../../model/dto";
import useWindowDimensions from "../../shared/WindowDimensions";
import ScrollContainer from "react-indiana-drag-scroll";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ImageDetails from "./ImageDetails";
import {getImage} from "../../actions/images";
import {getUser} from "../../actions/user";
import {UserContext} from "../../App";
import {RouteComponentProps} from "react-router-dom";
import {PROFILES} from "../../shared/Routes";

type Props = {
  imageId: number | null;
  dialogOpened: boolean;
  onClose: () => void;
  onImageEdit: (image: ImageResponse) => void;
  onImageDelete: (imageId: number) => void;
} & RouteComponentProps

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
  const info = useContext(UserContext);
  const [image, setImage] = useState<ImageResponse | null>(null);
  const [owner, setOwner] = useState<UserPublicResponse | null>(null);
  const { height, width } = useWindowDimensions();
  const [modalHeight, setModalHeight] = useState<number>(900);
  const [modalWidth, setModalWidth] = useState<number>(1000);
  const [renderDetails, setRenderDetails] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    if(props.imageId !== null) {
      getImage(props.imageId).then(response => {
        setImage(response);
      })
    } else {
      setImage(null);
    }
  }, [props.imageId]);

  useEffect(() => {
    if (image !== null) {
      getUser(image.ownerNickname).then(response => {
        setOwner(response);
      })
    } else {
      setOwner(null);
    }
  }, [image])


  useEffect(() => {
    setModalHeight(height - 10);
    setModalWidth(image !== null
      ? Math.min(image.resolutionX, width - 250) : width - 250);
  }, [image, height, width]);

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
        background: '#efefef',
        borderRadius: 5,
      }}>
        {image && owner && (
          <>
            {renderDetails ? (
              <>
                <ImageDetails
                  width={modalWidth}
                  height={modalHeight}
                  image={image}
                  onClose={() => setRenderDetails(false)}/>
              </>
            ) : (
              <>
                <Grid container alignItems="center" style={{padding: 2}}>
                  <Grid item xs={9}>
                    <Grid container direction="row" alignItems="center" wrap="nowrap">
                      <Grid item>
                        <Avatar
                          aria-label="recipe"
                          src={`http://localhost:8080/api/users/${owner.id}/picture`}
                          onClick={() => info.userInfo && props.history.push(PROFILES + "/" + owner.nickname)}
                          className={classes.large}/>
                      </Grid>
                      <div style={{width: 20}} />
                      <Grid item zeroMinWidth>
                        <Typography variant="h4" noWrap>
                          {image.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container direction="row" alignItems="flex-end" justify="flex-end" wrap="nowrap">
                      {(info.userInfo?.admin || info.userInfo?.nickname === owner.nickname) && (
                        <>
                        <Grid item>
                          <IconButton
                            aria-label="delete"
                            onClick={() => props.onImageDelete(image!.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-label="edit"
                            onClick={() => props.onImageEdit(image!)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        </>
                      )}
                      <Grid item>
                        <IconButton
                          aria-label="details"
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
                      alignContent: 'center',
                      width: modalWidth,
                      height: 0.667 * modalHeight,
                      backgroundColor: '#000000',
                    }}>
                    <img
                      src={`data:image/jpeg;base64,${image.image}`}
                      style={{
                        maxWidth: image.resolutionX,
                        maxHeight: image.resolutionY,
                        alignSelf: 'center',
                      }}
                      alt={image.name}
                    />
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
                    style={{fontSize: 0.03 * modalHeight}}
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