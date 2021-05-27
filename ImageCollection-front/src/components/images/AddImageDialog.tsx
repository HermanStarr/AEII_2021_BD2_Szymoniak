import React, {FC, FunctionComponent, useEffect, useState} from 'react';
import {ErrorMessage, FormikProps, useField, useFormik, withFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField, Theme,
} from "@material-ui/core";
import {CategoryResponse, ImageRequest, TagResponse} from "../../model/dto";
import FilterSelect from "../../shared/FilterSelect";
import { makeStyles } from '@material-ui/core/styles';
import {toast} from "react-toastify";
import {inputProps} from "../../shared/apiapp";
import {addImage} from "../../actions/images";
import {RouteComponentProps, withRouter} from "react-router";


type FormValues = {
    name: string | null;
    // image: any;
    file: File | null
    description: string;
    // tags: string;
    resolutionX: number;
    resolutionY: number;
    format: string;
    size: number;
    categories: CategoryResponse[] | null;
    tags: TagResponse[] | null;
};

type Props = {
    //imageData?: ImageRequest;
    dialogOpened: boolean;
    onClose: () => void;
} & RouteComponentProps

const getCategories = async (): Promise<CategoryResponse[]> => {
    return [
        {id: 1, name: 'category'},
        {id: 2, name: 'dunno'},
    ];
};

const formikEnhancer = withFormik<Props, FormValues>({
    enableReinitialize: true,
    validationSchema: Yup.object()
      .shape({
          //name: Yup.string(),
          //description: Yup.string()

      }),

    mapPropsToValues: (props) => ({
        name: '',
        description: '',
        // image: null,
        // tags: string;
        file: null,
        resolutionX: 1,
        resolutionY: 0,
        format: "",
        size: 0,
        categories: null,
        tags: null,
    }),

    handleSubmit: ({file, ...values}, {props}) => {
        console.log("XD")
        addImage(values, file!)
          .then(() => toast.success("Poprawnie dodano zdjęcie"))
          .catch((error) => {
              toast.error("wsytapil error: " +  error.message)
          })
    },

    displayName: 'AddImageDialog',
});

const AddImage: FC<Props & FormikProps<FormValues>> = (props) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        getCategories().then(response => {
            setCategories(response);
            setLoading(false);
        })
    }, [])

    return (
      <div className={classes.root}>
        <Dialog open={props.dialogOpened} onClose={props.onClose}>
            <DialogTitle id="responsive-dialog-title">{"Add image"}</DialogTitle>
            <DialogContent dividers>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Image name"
                                  placeholder="Enter image name"
                                  {...inputProps(props, 'name')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl variant="outlined" fullWidth>
                                <label htmlFor="file" >
                                    <input
                                      type="file"
                                      accept="image/*"
                                      // value= {props.values.file}
                                      name= "file"
                                      onBlur= {props.handleBlur}
                                      onChange= {props.handleChange}
                                    />
                                    <Button
                                      className={classes.root}
                                      fullWidth
                                      color="secondary"
                                      variant="outlined"
                                      component="span" >
                                        Choose Image
                                    </Button>
                                </label>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Filter Category</h3>
                            <FilterSelect
                              options={categories.map(category => ({name: category.name}))}
                              placeholder="Category"
                              {...inputProps(props, 'categories')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    placeholder="Enter description"
                                    {...inputProps(props, 'description')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField
                                    variant="outlined"
                                    label="Tags"
                                    multiline
                                    rows={4}
                                    placeholder="Enter tags"
                                    {...inputProps(props, 'tags')}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <button
                      color="primary"
                      autoFocus
                      type="button"
                      onClick={() => {
                          console.log(" props.handleSubmit()")
                          props.handleSubmit()}}
                    >
                        Add image
                    </button>
            </DialogContent>
            <DialogActions>
                <Button autoFocus  color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}

export default withRouter(formikEnhancer(AddImage));