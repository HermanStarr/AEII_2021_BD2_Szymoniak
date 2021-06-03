import React, {ChangeEvent, FC, useEffect, useState} from 'react';
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
import {CategoryResponse, ImageResponse} from "../../model/dto";
import FilterSelect from "../../shared/FilterSelect";
import { makeStyles } from '@material-ui/core/styles';
import {toast} from "react-toastify";
import {inputProps} from "../../shared/apiapp";
import {addImage, editImage} from "../../actions/images";
import {RouteComponentProps, withRouter} from "react-router";
import CloseIcon from '@material-ui/icons/Close';
import {getCategories} from "../../actions/tagsAndCategories";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "edit"
];

const FILE_SIZE = 30000000;

type FormValues = {
  name: string;
  file: File | null | undefined;
  description: string;
  resolutionX: number;
  resolutionY: number;
  format: string;
  size: number;
  categories: string[];
  tags: string;
};

const TAG_REGEX = /^[a-z\d\-_\s]+$/;

type Props = {
  dialogOpened: boolean;
  onClose: () => void;
  onRefresh: () => void;
  image?: ImageResponse;
} & RouteComponentProps

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      name: Yup.string().required('Image name is required').nullable(),
      image: Yup.mixed().test('fileSize', 'File size is too big', value => {
        console.log(value);
        if (value === undefined) {
          return true;
        }
        if (value !== null) {
          return (value as File).size <= FILE_SIZE;
        }
        return false;
      }),
      format: Yup.string().oneOf(SUPPORTED_FORMATS, 'Passed file can only be of type jpeg or png'),
      description: Yup.string().nullable(),
      tags: Yup.string().matches(TAG_REGEX, 'Only alphanumeric and whitespace characters are allowed'),
    }),

  mapPropsToValues: (props) => ({
    name: props.image !== undefined ? props.image.name : '',
    description: props.image !== undefined ? props.image.description : '',
    file: props.image !== undefined ? undefined : null,
    resolutionX: 0,
    resolutionY: 0,
    format: props.image !== undefined ? 'edit' : "",
    size: 0,
    categories: props.image !== undefined ? props.image.categories.map(category => category.name) : [],
    tags: props.image !== undefined ? props.image.tags.map(tag => tag.name).join(' ') : '',
  }),

  handleSubmit: ({file, ...values}, {props, setSubmitting}) => {
    console.log("xd");
    setSubmitting(true);
    if (props.image === undefined) {
      addImage(values, file! as File).then(response => {
        toast.success(response.message);
        setSubmitting(false);
        props.onRefresh();
      }).catch((error) => {
        toast.error("Error detected: " +  error.message)
      })
    } else {
      editImage(props.image.id, values).then(response => {
        toast.success(response.message);
        setSubmitting(false);
        props.onRefresh();
      }).catch((error) => {
        toast.error("Error detected: " +  error.message)
      })
    }
  },

  displayName: 'AddImageDialog',
});

const AddImage: FC<Props & FormikProps<FormValues>> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [filename, setFilename] = useState<string | undefined>("");
  const classes = useStyles();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      setFilename(file.name);
      props.setFieldValue(e.target.id, file);
      const fileType = file.type;
      props.setFieldValue('format', fileType);
      props.setFieldValue('size', file.size);
      if (props.values.name === '') {
        props.setFieldValue('name', file.name);
      }
      const img = new Image();
      img.onload = function(){
        props.setFieldValue('resolutionX', img.naturalWidth);
        props.setFieldValue('resolutionY', img.naturalHeight);
      }
      img.src = URL.createObjectURL(file);
    }
  }

  useEffect(() => {
    setLoading(true);
    getCategories('').then(response => {
      setCategories(response);
      setLoading(false);
    })
  }, [])

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <Dialog open={props.dialogOpened} onClose={() => {props.onClose(); setFilename('');}}>
        <DialogTitle id="responsive-dialog-title">{props.image === undefined ? 'Add image' : 'Edit image'}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
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
                {props.errors.format}{props.errors.file}{props.errors.resolutionX}
              </FormControl>
            </Grid>
            {!props.image && (
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
                        name="file"
                        onBlur={props.handleBlur}
                        onChange={onFileChange}
                      />
                      Choose Image
                    </Button>
                  </label>
                  {props.errors.file != null ? (<>{props.errors.file}<br/></>) : <></>}
                  {props.errors.format != null ? (<>{props.errors.format}<br/></>) : <></>}
                  {filename !== "" ? (<span>{filename}</span>) : ""}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <h4>Select categories</h4>
              <FilterSelect
                options={categories.map(category => ({name: category.name}))}
                placeholder="Category"
                onChange={(value: string[]) => props.setFieldValue('categories', value)}
                values={props.values['categories']}
                darkMode
                limitTags={4}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                props.handleSubmit();
                setFilename('');
              }}}
            onMouseDown={() => {props.handleSubmit(); setFilename('');}}
            //onClick={() => {props.handleSubmit()}}
          >
            {props.image === undefined ? 'Add image' : 'Edit image'}
          </Button>
          <Button autoFocus  color="primary"
                  onClick={() => {
                    props.onClose();
                    props.handleReset();
                    setFilename('');
                  }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

export default withRouter(formikEnhancer(AddImage));