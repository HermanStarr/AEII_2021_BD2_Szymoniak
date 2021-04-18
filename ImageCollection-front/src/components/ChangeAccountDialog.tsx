import React from 'react';
import {FormikProps, useFormik} from "formik";
import * as Yup from "yup";
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField,
} from "@material-ui/core";
import Dropzone from 'react-dropzone';
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import {inputProps} from "../shared/apiapp";
import {UserResponse} from "../model/dto";

type Props = {
    user: UserResponse | null;
    open: boolean;
    handleClose: () => void;
}

type FormValues = {
    email: string;
    icon: File | null;
};

export const ChangeAccountDialog = (props: Props) => {

    const changeAccountForm = useFormik<FormValues>({
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('This field is required')
                .email('The content must be an email address')
                .test('notTheSameEmail', 'E-mail cannot be the same as before', email => {
                    return true;//props.user!.email.toLowerCase() === email!.toLowerCase();
                }),
            icon: Yup.mixed().nullable()
        }),
        initialValues: {
            email: '',
            icon: null,
        },
        onSubmit: () => {

        }
    });

    const handleDrop = (file: File[]) => {
      changeAccountForm.setFieldValue('file', file[0]);
    };

    const deleteFile = () => {
        changeAccountForm.setFieldValue('file', null);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth={true}
            maxWidth = {'md'}
        >
            <DialogTitle id="responsive-dialog-title">{"Edit account"}</DialogTitle>
            <DialogContent>
                <form onSubmit={changeAccountForm.handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} sm={6}>
                            <FormControl variant="outlined">
                                <TextField
                                    variant="outlined"
                                    label="Email"
                                    placeholder="Enter new email"
                                    {...inputProps(changeAccountForm as FormikProps<FormValues>, 'email')}
                                />
                            </FormControl>
                        </Grid>
                        <FormControl variant="outlined">
                            <Dropzone onDrop={handleDrop} accept=".jpg, .png">
                                {({getRootProps, getInputProps}) => (
                                    <div
                                        {...getRootProps()}
                                        style={{height: 125, border: "2px dashed  #3f51b5"}}
                                        data-testid="dropzoneDiv"
                                    >
                                        <input {...getInputProps()} />
                                        <p>{"Upload an icon"}</p>
                                    </div>
                                )}
                            </Dropzone>
                            <Box mt={2}>
                                <strong>{"Files"}</strong>
                                <Box display="flex" justifyContent="space-around">
                                    {changeAccountForm.values.icon?.name}
                                    <HighlightOffOutlinedIcon onClick={deleteFile}/>
                                </Box>
                            </Box>
                        </FormControl>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" color="primary" autoFocus>
                    Add
                </Button>
                <Button autoFocus onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}