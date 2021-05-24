import React, {useEffect, useState} from 'react';
import {PaginatedResult, TileImageResponse, UserResponse} from "../model/dto";
import {Avatar, Container, Grid, TextField, Typography} from "@material-ui/core";
import {ChangeAccountDialog} from "./ChangeAccountDialog";
import Button from "@material-ui/core/Button";
import ImagesGrid from "./images/ImagesGrid";
import {photos} from "./images/photos";

const getImages = async (id: number): Promise<PaginatedResult<TileImageResponse>> => {
  return {items: [
    {id: 0, thumb: photos[0].src, title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo', resolutionY: 450, resolutionX: 800},
    {id: 1, thumb: photos[1].src, title: 'Zdjęcie xD', author: 'you', authorId: 1, description: 'just a photo', resolutionY: 450, resolutionX: 800},
    {id: 2, thumb: photos[2].src, title: 'Zdjęcie xD', author: 'them', authorId: 1, description: 'just a photo', resolutionY: 450, resolutionX: 800},
  ], totalElements: 3};
};

const getUserData = async (): Promise<UserResponse> => {
  return {id: 1, email: 'xd@xd.com', icon: undefined, nickname: 'Herman'};
}

export const Account = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userImages, setUserImages] = useState<PaginatedResult<TileImageResponse>>({items: [], totalElements: 0});

  useEffect(() => {
    setIsLoading(true);
    getUserData().then(response => {
      setUserData(response);
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    if (userData !== null) {
      getImages(userData.id).then(response => {//getImagesWithCriteria("userId=" + userData.id).then(response => {
        setUserImages(response);
      })
    }
  }, [userData])

  return (
    <Container>
      {isLoading ? (
        <></>
      ) : (
        <div>
          <Typography component='h1' variant='h5'>
            User {userData!.nickname}
          </Typography>
          <Grid container spacing={2} style={{marginTop: 10}}>
            <Grid item xs={12} sm={1}>
              <Avatar alt="User" src=''/>
            </Grid>
            <Grid item xs={12} sm={11}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                disabled
                value={userData!.email}
              />
            </Grid>
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
            <Grid item xs={12}>
              <ImagesGrid tiles={userImages} onPageChange={(value) => {}}/>
            </Grid>
          </Grid>
          <ChangeAccountDialog
            user={userData}
            open={isDialogOpen}
            handleClose={ () => setDialogOpen(false) }
          />
        </div>
      )}
    </Container>
  );
}