import React, {useEffect, useState} from 'react';
import {
  Avatar,
  IconButton,
  Modal,
  Typography
} from "@material-ui/core";
import {photos} from "./photos";
import {ImageResponse, TagResponse, UserResponse} from "../../model/dto";
import useWindowDimensions from "../../shared/WindowDimensions";
import ScrollContainer from "react-indiana-drag-scroll";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from "@material-ui/icons/MoreVert";

type Props = {
  imageId: number | null;
  dialogOpened: boolean;
  onClose: () => void;
}

const getImage = async (id: number) => {
  return {id: id, image: 'sdasa', title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo'};
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
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState<ImageResponse | null>(null);
  const [displayImage, setDisplayImage] = useState<string>('');
  const [author, setAuthor] = useState<UserResponse | null>(null);
  const [coefficient, setCoefficient] = useState<number>(1);
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [modalHeight, setModalHeight] = useState<number>(900);
  const [modalWidth, setModalWidth] = useState<number>(1000);
  const [photo, setPhoto] = useState<{src: string, width: number, height: number}>(photos[0]);

  useEffect(() => {
    getImage(1).then(response => {
      setImage(response);
      //const reader = new FileReader();
      //reader.onloadend = () => {
      //  setDisplayImage(reader.result as string);
      //}
      //reader.readAsDataURL(image!.image);
      setDisplayImage(photos[props.imageId ?? 1].src);
      setPhoto(photos[props.imageId ?? 1]);
    });
  }, [props.imageId]);

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
      onClose={props.onClose}
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
            <div style={{
              height: 0.06 * modalHeight,
              paddingTop: 0.00667 * modalHeight
            }}>
              <div style={{
                display: 'flex',
                width: '100%'
              }}>
                <div style={{
                  flex: 1.5,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <Avatar
                    aria-label="recipe"
                    src={author!.icon}
                    onClick={() => {}}/>
                </div>
                <div style={{
                  flex: 17,
                  flexDirection: 'column'
                }}>
                  <Typography
                    variant="body1"
                    style={{flex: 5}}
                  >
                    {image.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{flex: 5}}
                  >
                    {'Wakacyjne'}
                  </Typography>
                </div>
                <div style={{flex: 1.5}}>
                  <IconButton
                    aria-label="settings"
                    onClick={() => {}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              height: 0.667 * modalHeight,
              paddingTop: 0.01333 * modalHeight
            }}>
              <IconButton style={{
                position: 'absolute',
                width: 20,
                height: 20
              }}>
                <AddIcon
                  aria-label="Magnify"
                  onClick={() => setCoefficient(coefficient >= 3 ? coefficient : coefficient + 0.1)}
                />
              </IconButton>
              <IconButton style={{
                position: 'absolute',
                top: 0.12 * modalHeight,
                width: 20,
                height: 20
              }}>
                <RemoveIcon
                  aria-label="Decrease"
                  onClick={() => setCoefficient(coefficient <= 0.1 ? coefficient : coefficient - 0.1)}
                />
              </IconButton>
              <ScrollContainer
                className="scroll-container"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: modalWidth,
                  height: 0.667 * modalHeight,
                }}>
                <img
                  src={photo.src}
                  alt={photo.src}
                  style={{
                    width: photo.width * coefficient,
                    height: photo.height * coefficient
                  }}/>
              </ScrollContainer>
            </div>
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
                Tylko jedno w głowie mam
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
                    <a target="_blank" href="https://www.youtube.com/watch?v=qrxv0JNVtgY">{tag.name}</a>{' '}
                  </>
                ))}
              </Typography>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ImageDialog;