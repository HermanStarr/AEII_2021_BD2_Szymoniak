/* eslint-disable no-template-curly-in-string */
import React, {FunctionComponent} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {withFormik} from "formik";
import {RouteComponentProps, withRouter} from "react-router";
import * as Yup from "yup";
import {Container} from "@material-ui/core";
import {FormikProps} from "formik/dist/types";
import {inputProps} from "../../shared/apiapp";
import {REGISTER} from "../../shared/Routes";

type Props = {
  LoginData?: any; //Will be dto
  // Context: { userInfo: SomeDto | null, setUserInfo: (val: (SomeDto | null)) => void };
} & RouteComponentProps


type FormValues = {
  EmailAddress: string;
  Password: string;
}

const formikEnhancer = withFormik<Props, FormValues>({
  enableReinitialize: true,
  validationSchema: Yup.object()
    .shape({
      EmailAddress: Yup.string().email()
        .required('E-mail is required')
        .max(30, 'Maximum input size is: ${max}'),
      Password: Yup.string()
        .required('Password is required')
        .max(20, 'Password should have maximum ${max} characters')
        .min(7, 'Password should have at least ${min} characters '),
    }),

  mapPropsToValues: (props) => ({
    EmailAddress: props.LoginData ? props.LoginData.EmailAddress : '',
    Password: props.LoginData ? props.LoginData.Password : '',
  }),

  handleSubmit: (values, {props}) => {

  },

  displayName: 'Login',
});


const Login: FunctionComponent<Props & FormikProps<FormValues>> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            // {...inputProps(props, 'EmailAddress')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            // {/*{...inputProps(props, 'Password')}*/}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => props.handleSubmit()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href={REGISTER} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Image collection' + new Date().getFullYear()}
            </Typography>
          </Box>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default withRouter(formikEnhancer(Login));