import React, {FC, useState} from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import {toast} from "react-toastify";
import {RouteComponentProps, withRouter} from "react-router";
import CloseIcon from '@material-ui/icons/Close';
import {editUserIcon} from "../actions/user";
import {inputProps} from "../shared/apiapp";

type FormValues = {
  icon: File | null;
  password: "";
};

type Props = {
  dialogOpened: boolean;
  onClose: () => void;
} & RouteComponentProps

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      imageFile: Yup.object(),
    }),

  mapPropsToValues: () => ({
    icon: null,
    password: "",
  }),

  handleSubmit: ({icon, ...values}, {setSubmitting}) => {
    setSubmitting(true);
    editUserIcon(icon!, values.password)
      .then(() => toast.success("Poprawnie zmieniono ikone"))
      .then(() => setSubmitting(false))
      .catch((error) => {
        toast.error("wystąpił error: " +  error.message)
      })
  },

  displayName: 'AddImageDialog',
});

const ChangeIconDialog: FC<Props & FormikProps<FormValues>> = (props) => {
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
                  label="Password"
                  placeholder="Enter password"
                  {...inputProps(props, 'password')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl variant="outlined" fullWidth>
                <label htmlFor="icon" >
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
                      id="icon"
                      name= "icon"
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

export default withRouter(formikEnhancer(ChangeIconDialog));