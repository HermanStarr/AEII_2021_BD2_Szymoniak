import React, {useEffect, useState} from 'react';
import {FormikProps, useFormik} from "formik";
import * as Yup from "yup";
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid, MenuItem, Select,
    TextField,
} from "@material-ui/core";
import Dropzone from 'react-dropzone';
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import {CategoryResponse} from "../../model/dto";
import {inputProps} from "../../shared/apiapp";

type FormValues = {
    file: unknown;
    categoryId: number | null;
    description: string;
    tags: string;
};

type Props = {
    dialogOpened: boolean;
    onClose: () => void;
};

const getCategories = async (): Promise<CategoryResponse[]> => {
    return [
        {id: 1, name: 'category'},
        {id: 2, name: 'dunno'},
    ];
};

export const AddImage = (props: Props) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        setLoading(true);
        getCategories().then(response => {
            setCategories(response);
            setLoading(false);
        })
    }, [])

    const addImageForm = useFormik<FormValues>({
        validationSchema: Yup.object().shape({
            file: Yup.mixed().required(''),
            categoryId: Yup.number().nullable().required('Provide category').integer('').min(0),
            description: Yup.string().notRequired(),
            tags: Yup.string().notRequired(),
        }),
        initialValues: {
            file: null,
            categoryId: null,
            description: '',
            tags: '',
        },
        onSubmit: () => {}
    });

    const handleDrop = (file: File[]) => {
        addImageForm.setFieldValue('file', file[0]);
    }

    const deleteFile = () => {
        addImageForm.setFieldValue('file', null);
    }

    const displayFileName = () => {
        const file = addImageForm.values.file as File;
        return file.name;
    }

    return (
        <Dialog open={props.dialogOpened} onClose={props.onClose}>
            <DialogTitle id="responsive-dialog-title">{"Add image"}</DialogTitle>
            <DialogContent>
                <form onSubmit={addImageForm.handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormControl variant="outlined">
                                <Dropzone onDrop={handleDrop} accept=".jpg, .png">
                                    {({getRootProps, getInputProps}) => (
                                        <div
                                            {...getRootProps()}
                                            style={{height: 125, border: "2px dashed  #3f51b5"}}
                                            data-testid="dropzoneDiv"
                                        >
                                            <input {...getInputProps()} />
                                            <p>{"Upload an image"}</p>
                                        </div>
                                    )}
                                </Dropzone>
                                <Box mt={2}>
                                    <strong>{"Files"}</strong>
                                    <Box display="flex" justifyContent="space-around">
                                        {displayFileName}
                                        <HighlightOffOutlinedIcon onClick={deleteFile}/>
                                    </Box>
                                </Box>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                defaultValue={""}
                                name="categoryId"
                                label="Category"
                                onChange={(e) => {
                                    addImageForm.setFieldValue('categoryId', e.target.value as number);
                                }}
                            >
                                {categories.map((value: CategoryResponse) => (
                                    <MenuItem key={value.id} value={value.id}>{value.name} </MenuItem>
                                ))}
                            </Select>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                defaultValue={""}
                                name="categoryId"
                                label="Category"
                                onChange={(e) => {
                                    addImageForm.setFieldValue('categoryId', e.target.value as number);
                                }}
                            >
                                {categories.map((value: CategoryResponse) => (
                                    <MenuItem key={value.id} value={value.id}>{value.name} </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined">
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    placeholder="Enter description"
                                    {...inputProps(addImageForm as FormikProps<FormValues>, 'description')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined">
                                <TextField
                                    variant="outlined"
                                    label="Tags"
                                    multiline
                                    rows={4}
                                    placeholder="Enter tags"
                                    {...inputProps(addImageForm as FormikProps<FormValues>, 'tags')}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}