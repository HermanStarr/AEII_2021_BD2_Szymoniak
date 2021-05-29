import React, {useContext, useEffect, useState} from 'react';
import {PaginatedResult, TileImageResponse, UserResponse, ImageThumbRespone} from "../model/dto";
import {Avatar, Container, Grid, TextField, Typography,Button, Divider} from "@material-ui/core";
import {RouteComponentProps, withRouter, useHistory} from "react-router";
import {ChangeAccountDialog} from "./ChangeAccountDialog";
import ImagesGrid from "./images/ImagesGrid";
import {photos} from "./images/photos";
import {UserContext} from "../App";
import {Account} from "./Account";
import {getUserImageThumbs} from './../actions/images';
import {useParams} from "react-router-dom";
import {getUserById, getUserByNickname} from "./../actions/loginRegister"
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

type Params = {
    userNickname: string;
}
const getImages = async (id: number): Promise<PaginatedResult<TileImageResponse>> => {
    return {
        items: [
            {
                id: 0,
                thumb: photos[0].src,
                title: 'Zdjęcie xD',
                author: 'me',
                authorId: 1,
                description: 'just a photo',
                resolutionY: 450,
                resolutionX: 800
            },
            {
                id: 1,
                thumb: photos[1].src,
                title: 'Zdjęcie xD',
                author: 'you',
                authorId: 1,
                description: 'just a photo',
                resolutionY: 450,
                resolutionX: 800
            },
            {
                id: 2,
                thumb: photos[2].src,
                title: 'Zdjęcie xD',
                author: 'them',
                authorId: 1,
                description: 'just a photo',
                resolutionY: 450,
                resolutionX: 800
            },
        ], totalElements: 3
    };
};

const getUserData = async (): Promise<UserResponse> => {
    return {id: 1, email: 'xd@xd.com', icon: undefined, nickname: 'Herman', isAdmin: true};
}
type Props = RouteComponentProps & {}
export const Accounts = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserResponse | null>(null);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [userImages, setUserImages] = useState<PaginatedResult<TileImageResponse>>({items: [], totalElements: 0});
    const info = useContext(UserContext);
    const userNickName = useParams();


    /*useEffect(() => {
        setIsLoading(true);
        getUserById(userId as number).then(response => {
            setUserData(response);
            console.log("userData", userData);
            setIsLoading(false);
        })
    }, []);
     */
    /*
    useEffect(() => {
        setIsLoading(true);
        console.log("user nickname", userNickName)
        getUserByNickname(userNickName as string).then(response => {
            setUserData(response);
            console.log("userData", userData);
            setIsLoading(false);
        })
    }, []);
    /*
     */

    useEffect(() => {
        setIsLoading(true);
        getUserData().then(response => {
            setUserData(response);
            setIsLoading(false);
        })
    }, []);


    useEffect(() => {
        if (userData !== null) {
            // getUserImageThumbs(userId as number).then(response => {
            getImages(userData.id).then(response => {//getImagesWithCriteria("userId=" + userData.id).then(respo
            setUserImages(response);
            })
        }
    }, [userData]);

    const handleReturn=()=>
    {
        props.history.push('/profiles/');
    };

        return (
            <Container>
                {isLoading ? (
                    <></>
                ) : (
                    <div>
                        <Grid   style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button  variant="contained" color="primary" style={{marginLeft:1 , marginRight:0, }} onClick={()=> handleReturn()}> Return to list  <KeyboardReturnIcon></KeyboardReturnIcon></Button>

                        </Grid>
                        <Typography component='h1' variant='h5'>
                            {"User nickname: " + userNickName}

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


};
export default withRouter(Accounts);