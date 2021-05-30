import React, {FC, useEffect, useState} from 'react';
import {FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid, IconButton,
  TextField, Theme,
} from "@material-ui/core";
import {CategoryResponse, TagResponse} from "../../model/dto";
import FilterSelect from "../../shared/FilterSelect";
import { makeStyles } from '@material-ui/core/styles';
import {toast} from "react-toastify";
import {inputProps} from "../../shared/apiapp";
import {addImage} from "../../actions/images";
import {RouteComponentProps, withRouter} from "react-router";
import CloseIcon from '@material-ui/icons/Close';


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
          name: Yup.string(),
          image: Yup.object(),
          description: Yup.string(),
          tags: Yup.string(),
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

    handleSubmit: ({file, ...values}, {props, setSubmitting}) => {
        setSubmitting(true);
        addImage(values, file!)
          .then(() => toast.success("Poprawnie dodano zdjęcie"))
          .then(() => setSubmitting(false))
          .catch((error) => {
              toast.error("wystąpił error: " +  error.message)
          })
    },

    displayName: 'AddImageDialog',
});

const AddImage: FC<Props & FormikProps<FormValues>> = (props) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [filename, setFilename] = useState<string | undefined>("");
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            flexGrow: 1,
        },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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
            <DialogTitle id="responsive-dialog-title">{"Add image"}
              <IconButton aria-label="close" className={classes.closeButton}
                onClick={() => {
                props.onClose();
                props.handleReset();
              }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
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
                                    <Button
                                      className={classes.root}
                                      fullWidth
                                      color="secondary"
                                      variant="outlined"
                                      component="span" >
                                    <input
                                      hidden
                                      type="file"
                                      accept="image/*"
                                      color="primary"
                                      id="file"
                                      name= "file"
                                      onBlur= {props.handleBlur}
                                      onChange= {(e) => {
                                         const id = e.target.id;
                                         const file = e.target.files?.[0];
                                         setFilename(e.target.files?.[0].name)
                                         console.log(filename);
                                         props.setFieldValue(id, file);
                                      }}
                                    />
                                        Choose Image
                                    </Button>

                                </label>
                                {filename !== "" ? (<span>{filename}</span>) : ""}
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
            </DialogContent>
            <DialogActions>
                <Button
                  color="primary"
                  autoFocus
                  type="button"
                  disabled={props.isSubmitting}
                  onKeyDown={(e) => {if(e.key === 'Enter'){props.handleSubmit()}}}
                  onMouseDown={() => {props.handleSubmit()}}
                  //onClick={() => {props.handleSubmit()}}
                >
                    Add image
                </Button>
                <Button autoFocus  color="primary"
                onClick={() => {
                  props.onClose();
                  props.handleReset();
                }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}

export default withRouter(formikEnhancer(AddImage));