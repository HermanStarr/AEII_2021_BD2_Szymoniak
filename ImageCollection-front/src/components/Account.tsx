import React, {useContext, useEffect, useState} from 'react';
import {PaginatedResult, ImageThumbResponse} from "../model/dto";
import {Avatar, Container, Grid, TextField, Typography} from "@material-ui/core";
import ChangeAccountDialog from "./ChangeAccountDialog";
import Button from "@material-ui/core/Button";
import ImagesGrid from "./images/ImagesGrid";
import {UserContext} from "../App";
import {getImagesWithCriteria} from "../actions/images";

export const Account = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userImages, setUserImages] = useState<PaginatedResult<ImageThumbResponse>>({items: [], totalElements: 0});
  const info = useContext(UserContext);

  useEffect(() => {
    if (info.userInfo !== null) {
      let query = `sortOrder=DESC&sortBy=creationDate&pageSize=9&pageNumber=0&search=ownerId%3D${info.userInfo.id}`;
      getImagesWithCriteria(query).then(response => {
        setUserImages(response);
      })
    }
  }, [info])

  return (
    <Container>
        <div>
          <Typography component='h1' variant='h5'>
              {"User nickname: " + info.userInfo?.nickname}
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
                value={info.userInfo?.email ?? ''}
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
              <ImagesGrid
                tiles={userImages}
                onPageChange={(value) => {}}
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