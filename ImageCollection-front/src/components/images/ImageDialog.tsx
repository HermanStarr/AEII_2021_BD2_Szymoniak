import React, {useEffect, useState} from 'react';
import {
  Avatar, createStyles, Grid,
  IconButton, makeStyles,
  Modal, Theme,
  Typography
} from "@material-ui/core";
import {photos} from "./photos";
import {ImageResponse2, TagResponse, UserResponse} from "../../model/dto";
import useWindowDimensions from "../../shared/WindowDimensions";
import ScrollContainer from "react-indiana-drag-scroll";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {blobToSource} from "../../shared/FileEdition";
import ImageDetails from "./ImageDetails";

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

const getImage = async (id: number) => {
  let a = [
    {id: 1, image: new Blob(), title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo', size: 21100, format: 'jpeg', creationDate: '2021-05-19', resolutionX: 800, resolutionY: 6000},
    {id: 2, image: new Blob(), title: 'Gziby', author: 'me', authorId: 1, description: 'just a photo', size: 453100, format: 'png', creationDate: '2021-05-18', resolutionX: 600, resolutionY: 600},
    {id: 3, image: new Blob(), title: 'Klaster', author: 'me', authorId: 1, description: 'just a photo', size: 12100, format: 'webp', creationDate: '2021-05-17', resolutionX: 326.25, resolutionY: 435},
    {id: 4, image: new Blob(), title: 'Kapelnica', author: 'me', authorId: 1, description: 'just a photo', size: 65100, format: 'jpeg', creationDate: '2021-05-16', resolutionX: 300, resolutionY: 400},
    {id: 5, image: new Blob(), title: 'Meh', author: 'me', authorId: 1, description: 'just a photo', size: 13100, format: 'png', creationDate: '2021-05-15', resolutionX: 300, resolutionY: 400},
    {id: 6, image: new Blob(), title: 'I like trains', author: 'me', authorId: 1, description: 'just a photo', size: 54100, format: 'webp', creationDate: '2021-05-14', resolutionX: 400, resolutionY: 300},
    {id: 7, image: new Blob(), title: 'Lakers', author: 'me', authorId: 1, description: 'just a photo', size: 13100, format: 'jpeg', creationDate: '2021-05-13', resolutionX: 300, resolutionY: 400},
    {id: 8, image: new Blob(), title: 'Rzołendź', author: 'me', authorId: 1, description: 'just a photo', size: 656100, format: 'png', creationDate: '2021-05-12', resolutionX: 400, resolutionY: 300},
    {id: 9, image: new Blob(), title: 'Phnagn', author: 'me', authorId: 1, description: 'just a photo', size: 2100, format: 'webp', creationDate: '2021-05-11', resolutionX: 400, resolutionY: 300},
  ];
  return a[id];
}

const getUserData = async (id: number): Promise<UserResponse> => {
  return {id: id, email: 'xd@xd.com', icon: photos[1].src, nickname: 'Herman'};
}

const getTags = async (id: number) => {
  return [
    {id: id + 1, name: 'polish'},
    {id: id + 2, name: 'boy'},
    {id: id + 3, name: 'latvian'},
    {id: id + 4, name: 'girl'},
  ]
}

export const ImageDialog = (props: Props) => {
  const [image, setImage] = useState<ImageResponse2 | null>(null);
  const [author, setAuthor] = useState<UserResponse | null>(null);
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [imageSource, setImageSource] = useState<string>('');

  const { height, width } = useWindowDimensions();
  const [modalHeight, setModalHeight] = useState<number>(900);
  const [modalWidth, setModalWidth] = useState<number>(1000);
  const [renderDetails, setRenderDetails] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    if(props.imageId !== null) {
      getImage(props.imageId).then(response => {
        setImage(response);
        blobToSource({
          image: response.image,
          onLoadEnd: result => setImageSource(result === 'data:' ? photos[props.imageId!].src : result),
        });
      });
    } else {
      setImage(null);
      setImageSource('');
    }
  }, [props.imageId]);

  useEffect(() => {
    console.log(imageSource);
  }, [imageSource])

  useEffect(() => {
    if(image !== null) {
      getUserData(image.authorId).then(response => {
        setAuthor(response);
      });
    }
  }, [image]);

  useEffect(() => {
    if(image !== null) {
      getTags(image.id).then(response => {
        setTags(response);
      });
    }
  }, [image])


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
        {image && author && (
          <>
            {renderDetails ? (
              <>
                <ImageDetails
                  width={modalWidth}
                  height={modalHeight}
                  tags={tags.map(tag => tag.name)}
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
                          src={author!.icon}
                          onClick={() => {}}
                          className={classes.large}/>
                      </Grid>
                      <div style={{width: 20}} />
                      <Grid item>
                        <Typography variant="h4">
                          {image.title}
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
                      src={imageSource}
                      alt={image.title}
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
                    {tags.map(tag => (
                      <>
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a target="_blank" href="https://www.youtube.com/watch?v=qrxv0JNVtgY">{tag.name}</a>{' '}
                      </>
                    ))}
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
