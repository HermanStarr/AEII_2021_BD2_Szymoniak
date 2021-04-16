/* eslint-disable no-template-curly-in-string */
import React, {FunctionComponent} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormikProps} from "formik/dist/types";
import {withFormik} from "formik";
import * as Yup from 'yup';
import {RouteComponentProps, withRouter} from "react-router";
import {inputProps} from "../../shared/apiapp";
import {LOGIN} from "../../shared/Routes";

type Props = {
  RegisterData?: any; //type specific dto type here
  passwordConfirmation: string;
} & RouteComponentProps

type FormValues = {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Password: string;
  passwordConfirmation: string;
}

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      FirstName: Yup.string()
        .required('First name is required')
        .max(18, 'Maximum input size is: ${max}'),
      LastName: Yup.string()
        .required('Last name is required')
        .max(18, 'Maximum input size is: ${max}'),
      EmailAddress: Yup.string().email()
        .required('E-mail is required')
        .max(30, 'Maximum input size is: ${max}'),
      Password: Yup.string()
        .required('Password is required')
        .max(20, 'Password should have maximum ${max} characters')
        .min(7, 'Password should have at least ${min} characters '),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('Password')], 'Passwords must match')
        .max(20, 'Password should have maximum ${max} characters')
        .required("Password confirmation is required"),

    }),

  mapPropsToValues: (props) => ({
    FirstName: props.RegisterData ? props.RegisterData.FirstName : '',
    LastName: props.RegisterData ? props.RegisterData.LastName : '',
    EmailAddress: props.RegisterData ? props.RegisterData.EmailAddress : '',
    Password: props.RegisterData ? props.RegisterData.Password : '',
    passwordConfirmation: props.passwordConfirmation ? props.passwordConfirmation : '',
  }),

  handleSubmit: (values, {props}) => {

  },

  displayName: 'Registration',
});

const Registration: FunctionComponent<Props & FormikProps<FormValues>> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                {...inputProps(props, 'FirstName')}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                {...inputProps(props, 'LastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...inputProps(props, 'EmailAddress')}
                variant="outlined"
                required
                fullWidth
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...inputProps(props, 'Password')}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...inputProps(props, 'passwordConfirmation')}
                variant="outlined"
                required
                fullWidth
                label="Repeat password"
                type="password"
              />
            </Grid>
            </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => props.handleSubmit()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={LOGIN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © Image collection' + new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullWidth: {
    width: '100%',
  },
}));
export default withRouter(formikEnhancer(Registration));

