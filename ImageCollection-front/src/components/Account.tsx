import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {UserResponse} from "../model/dto";
import {Avatar, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {ChangeAccountDialog} from "./ChangeAccountDialog";
import Images from "./images/Images";
import Button from "@material-ui/core/Button";
import {Profiles} from "./Profiles";
import {AccountComponent} from "./AccountComponent";

type Props = RouteComponentProps & {}

const getUserData = async (): Promise<UserResponse> => {
    return {id: 1, email: 'xd@xd.com', icon: undefined, nickname: 'Herman'};
}

export const Account = (props: Props) => {
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

                    <AccountComponent></AccountComponent>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => setDialogOpen(true)}
                    >
                        Edit
                    </Button>
                    <div>
                    <Grid item xs={12} >
                        <Images/>
                    </Grid>
                    </div>

                    <ChangeAccountDialog
                        user={userData}
                        open={isDialogOpen}
                        handleClose={() => setDialogOpen(false)}
                    />
                </div>
            )}
        </Container>
    );
};
export default withRouter(Account);