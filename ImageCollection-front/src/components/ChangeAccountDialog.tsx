/* eslint-disable no-template-curly-in-string */
import React, {FC} from 'react';
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
import {UserResponse} from "../model/dto";
import CloseIcon from "@material-ui/icons/Close";
import {RouteComponentProps, withRouter} from "react-router";
import {toast} from "react-toastify";
import {makeStyles} from "@material-ui/core/styles";
import {editUserPassword} from "../actions/user";
import {inputProps} from "../shared/apiapp";

type Props = {
  user: UserResponse | null;
  dialogOpened: boolean;
  onClose: () => void;
} & RouteComponentProps

type FormValues = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      oldPassword: Yup.string()
        .required()
        .max(20, 'Password should have maximum ${max} characters')
        .min(2, 'Password should have at least ${min} characters '),
      newPassword: Yup.string()
        .required()
        .max(20, 'Password should have maximum ${max} characters')
        .min(2, 'Password should have at least ${min} characters '),
      passwordConfirmation: Yup.string()
        .required()
        .max(20, 'Password should have maximum ${max} characters')
        .min(2, 'Password should have at least ${min} characters ')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    }),

  mapPropsToValues: (props) => ({
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  }),

  handleSubmit: ({...values}, {props, setSubmitting}) => {
    setSubmitting(true);
    editUserPassword(values.newPassword, values.oldPassword)
      .then(() => toast.success("Poprawnie edytowano hasło użytkownika"))
      .then(() => setSubmitting(false))
      .catch((error) => {
        toast.error("wystąpił error: " + error.message)
      })
  },

  displayName: 'AddImageDialog',
});

const ChangeAccountDialog: FC<Props & FormikProps<FormValues>> = (props) => {

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
    textFieldMargin: {
      marginTop: '10px',
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog open={props.dialogOpened} onClose={props.onClose}>
        <DialogTitle id="responsive-dialog-title">{"Change password"}
          <IconButton aria-label="close" className={classes.closeButton}
                      onClick={() => {
                        props.onClose();
                        props.handleReset();
                      }}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item xs={12} spacing={2}>
            {/*<Grid item xs={6}>*/}
            {/*  /!*<FormControl variant="outlined" fullWidth>*!/*/}
            {/*  /!*  <Button*!/*/}
            {/*  /!*    className={classes.root}*!/*/}
            {/*  /!*    fullWidth*!/*/}
            {/*  /!*    color="secondary"*!/*/}
            {/*  /!*    variant="outlined"*!/*/}
            {/*  /!*    component="span">*!/*/}
            {/*  /!*    <input*!/*/}
            {/*  /!*      hidden*!/*/}
            {/*  /!*      type="file"*!/*/}
            {/*  /!*      accept="image/*"*!/*/}
            {/*  /!*      color="primary"*!/*/}
            {/*  /!*      id="icon"*!/*/}
            {/*  /!*      name="icon"*!/*/}
            {/*  /!*      onBlur={props.handleBlur}*!/*/}
            {/*  /!*      onChange={(e) => {*!/*/}
            {/*  /!*        const id = e.target.id;*!/*/}
            {/*  /!*        const file = e.target.files?.[0];*!/*/}
            {/*  /!*        setIconName(e.target.files?.[0].name)*!/*/}
            {/*  /!*        console.log(iconName);*!/*/}
            {/*  /!*        props.setFieldValue(id, file);*!/*/}
            {/*  /!*      }}*!/*/}
            {/*  /!*    />*!/*/}
            {/*  /!*    Choose Icon*!/*/}
            {/*  /!*  </Button>*!/*/}
            {/*  /!*  {iconName !== "" ? (<span>{iconName}</span>) : ""}*!/*/}
            {/*  /!*</FormControl>*!/*/}
            {/*  /!*<Grid style={{textAlign: 'center', marginTop: '20px'}}>*!/*/}
            {/*  /!*  <Button color="primary" variant="contained">*!/*/}
            {/*  /!*    Change icon*!/*/}
            {/*  /!*  </Button>*!/*/}
            {/*  /!*</Grid>*!/*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  variant="outlined"
                  label="Old password"
                  placeholder="Enter old password"
                  type="password"
                  {...inputProps(props, 'oldPassword')}
                />
              </FormControl>
              <TextField
                className={classes.textFieldMargin}
                variant="outlined"
                fullWidth
                label="New password"
                type="password"
                {...inputProps(props, 'newPassword')}
              />
              <TextField
                className={classes.textFieldMargin}
                variant="outlined"
                fullWidth
                label="Repeat new password"
                type="password"
                {...inputProps(props, 'passwordConfirmation')}
              />
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
                props.handleSubmit()
              }
            }}
            onMouseDown={() => {
              props.handleSubmit()
            }}
          >
            Change password
          </Button>
          <Button autoFocus color="primary"
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
export default withRouter(formikEnhancer(ChangeAccountDialog));
