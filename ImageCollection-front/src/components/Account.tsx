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
import ChangeIconDialog from "./ChangeIconDialog";

type Params = { nickname: string }
type Props = RouteComponentProps<Params> & {}

export const Account = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userImages, setUserImages] = useState<PaginatedResult<ImageThumbResponse>>({items: [], elementCount: 0});
  const [user, setUser] = useState<UserPublicResponse | null>(null);
  const [isChangeDialogDialogOpen, setIsChangeDialogDialogOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(9);
  const [pageNumber, setPageNumber] = useState<number>(0);  const info = useContext(UserContext);
  const [refreshToken, setRefreshToken] = useState<number>(0);

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
      let query = `sortOrder=DESC&sortBy=creationDate&pageSize=${pageSize}&pageNumber=${pageNumber}&search=ownerId%3D${user.id}`;
      getImagesWithCriteria(query).then(response => {
        setUserImages(response);
      })
    }
  }, [user, pageSize, pageNumber])

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
          <Grid item xs={11}>
            <Typography component='h1' variant='h5'>
              {"User nickname: " + user.nickname}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              style={{marginLeft: 1}}
              onClick={() => handleReturn()}
            >
              Return <KeyboardReturnIcon/>
            </Button>
          </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} style={{marginTop: 10}}>
          <Grid item xs={12} sm={2}>
            <Avatar
              alt="User"
              onClick={() => user.nickname === info.userInfo?.nickname && setIsChangeDialogDialogOpen(true)}
              src={`http://localhost:8080/api/users/${user.id}/picture?_ref=${refreshToken}`}
              style={{width: 150, height: 150, maxWidth: '100%'}}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
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
                Change password
              </Button>
            </Grid>
          }
          <Grid item xs={12}>
            <ImagesGrid
              tiles={userImages}
              onPageChange={(value) => setPageNumber(value)}
              onPageSizeChange={(value) => setPageSize(value)}
              onImageEdit={image => (image)}
              pageSize={pageSize}
            />
          </Grid>
        </Grid>
        <ChangeAccountDialog
          user={info.userInfo}
          dialogOpened={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
        <ChangeIconDialog
          dialogOpened={isChangeDialogDialogOpen}
          onClose={() => {
            setIsChangeDialogDialogOpen(false);
            setRefreshToken(refreshToken + 1);
          }}
        />
      </div>
    </Container>
  );
}