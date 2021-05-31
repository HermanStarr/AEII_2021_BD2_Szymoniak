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
    const [userDataLog, setUserDataLog] = useState<UserResponse | null>(null);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [userName, setUserName] = useState<string|undefined>();
    const [userImages, setUserImages] = useState<PaginatedResult<TileImageResponse>>({items: [], totalElements: 0});
    const info = useContext(UserContext);
    let userNickname = useParams();


    const usernameFunc=() => {
        for (let [key, value] of Object.entries(userNickname)) {
           userNickname=value as string;
        }
    }
    useEffect(() => {
        usernameFunc();
        setIsLoading(true);
            getUserByNickname(userNickname.valueOf() as string).then(response => {
            setUserDataLog(response);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getUserData().then(response => {
            setUserDataLog(response);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if (userDataLog !== null) {
            // getUserImageThumbs(userId as number).then(response => {
            getImages(userDataLog.id).then(response => {//getImagesWithCriteria("userId=" + userData.id).then(respo
            setUserImages(response);
            })
        }
    }, [userDataLog]);

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
                            {"User nickname: " + userDataLog?.nickname}
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
                                    value={userDataLog!.email}
                                />
                            </Grid>
                            {
                                userDataLog?.nickname == info.userInfo?.nickname &&
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
                        </Grid>
                        <ChangeAccountDialog
                            user={userDataLog}
                            open={isDialogOpen}
                            handleClose={ () => setDialogOpen(false) }
                        />
                    </div>
                )}

            </Container>
        );


}


export default withRouter(Accounts);