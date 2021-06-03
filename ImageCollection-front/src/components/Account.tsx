import React, {useContext, useEffect, useState} from 'react';
import {PaginatedResult, ImageThumbResponse, UserPublicResponse} from "../model/dto";
import {Avatar, Container, Grid, TextField, Typography} from "@material-ui/core";
import ChangeAccountDialog from "./ChangeAccountDialog";
import Button from "@material-ui/core/Button";
import ImagesGrid from "./images/ImagesGrid";
import {UserContext} from "../App";
import {getImagesWithCriteria} from "../actions/images";
import {RouteComponentProps} from "react-router";
import {getUser} from "../actions/user";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

type Params = { nickname: string }
type Props = RouteComponentProps<Params> & {}

export const Account = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userImages, setUserImages] = useState<PaginatedResult<ImageThumbResponse>>({items: [], elementCount: 0});
  const [user, setUser] = useState<UserPublicResponse | null>(null);
  const info = useContext(UserContext);

  useEffect(() => {
    if (props.match.params.nickname === undefined) {
      return;
    }
    setLoading(true);
    getUser(props.match.params.nickname)
      .then(response => setUser(response))
      .catch(() => setUser(null))
      .then(() => setLoading(false));
  }, [props.match.params.nickname])

  useEffect(() => {
    if (user !== null) {
      let query = `sortOrder=DESC&sortBy=creationDate&pageSize=9&pageNumber=0&search=ownerId%3D${user.id}`;
      getImagesWithCriteria(query).then(response => {
        setUserImages(response);
      })
    }
  }, [user])

  if (isLoading) {
    return <></>;
  }

  if (user === null) {
    return <></>
  }

  const handleReturn = () => {
    props.history.goBack();
  };

  return (
    <Container>
      <div>
        <Grid style={{display: "flex", justifyContent: "flex-end"}}>
          <Button variant="contained" color="primary" style={{marginLeft: 1, marginRight: 0,}}
                  onClick={() => handleReturn()}> Return <KeyboardReturnIcon/></Button>
        </Grid>
        <Typography component='h1' variant='h5'>
          {"User nickname: " + user.nickname}
        </Typography>
        <Grid container spacing={2} style={{marginTop: 10}}>
          <Grid item xs={12} sm={1}>
            <Avatar alt="User" src={`data:image/jpeg;base64,${user.icon}`}/>
          </Grid>
          <Grid item xs={12} sm={11}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              disabled
              value={user.email ?? ''}
            />
          </Grid>
          {
            user.nickname === info.userInfo?.nickname &&
            <Grid item xs={12}>
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogOpen(true)}
              >
                  Edit
              </Button>
            </Grid>
          }
          <Grid item xs={12}>
            <ImagesGrid
              tiles={userImages}
              onPageChange={(value) => {
              }}
              onImageEdit={image => (image)}
            />
          </Grid>
        </Grid>
        <ChangeAccountDialog
          user={info.userInfo}
          dialogOpened={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </Container>
  );
}