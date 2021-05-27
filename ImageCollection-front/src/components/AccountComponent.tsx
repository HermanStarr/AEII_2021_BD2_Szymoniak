import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {UserResponse} from "../model/dto";
import {Avatar, Container, Grid, TextField, Typography} from "@material-ui/core";
import {ChangeAccountDialog} from "./ChangeAccountDialog";
import Images from "./images/Images";
import Button from "@material-ui/core/Button";
import {Profiles} from "./Profiles";

type Props = RouteComponentProps & {}

const getUserData = async (): Promise<UserResponse> => {
    return {id: 1, email: 'xd@xd.com', icon: undefined, nickname: 'Herman', isAdmin:false};
}

export const AccountComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserResponse | null>(null);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getUserData().then(response => {
            setUserData(response);
            setIsLoading(false);
        })
    }, []);

    return (
        <Container>
            {isLoading ? (
                <></>
            ) : (
                <div>
                    <Typography component='h1' variant='h5'>
                        User's account page
                    </Typography>
                    <Grid container spacing={10} style={{marginTop: 10}}>
                        <Grid item xs={12} sm={3}>
                            <Avatar alt={"User"} src={''}/>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                disabled
                                value='xd@xd.com'
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </Container>
    );
};
export default withRouter(AccountComponent);