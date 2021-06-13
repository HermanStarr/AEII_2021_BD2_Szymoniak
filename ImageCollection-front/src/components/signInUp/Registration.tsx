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
import {SignUpRequest} from "../../model/dto";
import {registerUser} from "../../actions/loginRegister";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  RegisterData?: SignUpRequest;
  passwordConfirmation: string;
} & RouteComponentProps

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      username: Yup.string()
        .required('Username is required')
        .max(18, 'Maximum input size is: ${max}'),
      email: Yup.string().email()
        .required('E-mail is required')
        .max(30, 'Maximum input size is: ${max}'),
      password: Yup.string()
        .required('Password is required')
        .max(20, 'Password should have maximum ${max} characters')
        .min(7, 'Password should have at least ${min} characters '),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .max(20, 'Password should have maximum ${max} characters')
        .required("Password confirmation is required"),

    }),

  mapPropsToValues: (props) => ({
    username: props.RegisterData ? props.RegisterData.username : '',
    email: props.RegisterData ? props.RegisterData.email : '',
    password: props.RegisterData ? props.RegisterData.password : '',
    passwordConfirmation: props.passwordConfirmation ? props.passwordConfirmation : '',
  }),

  handleSubmit: (values, {props}) => {
    toast.configure();
    registerUser(values)
      .then(() => {
      toast.success("Registered succesfully");
      props.history.push(`${LOGIN}`);
    }).catch((error) => {
      toast.error("Registered unsuccesfully" + error.message);
    })
  },

  displayName: 'Registration',
});

const Registration: FunctionComponent<Props & FormikProps<FormValues>> = (props) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xs"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props.handleSubmit();
      }}}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                {...inputProps(props, 'username')}
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...inputProps(props, 'email')}
                variant="outlined"
                required
                fullWidth
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...inputProps(props, 'password')}
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
              <Link onClick={() => props.history.replace(LOGIN)} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © Image collection ' + new Date().getFullYear()}
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

