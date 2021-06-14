import {
  Avatar,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton, MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow,
  TextField, Theme, Tooltip
} from "@material-ui/core";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {CategoryDTO} from "../model/dto";
import {FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {addCategory, getCategories} from "../actions/tagsAndCategories";
import CloseIcon from "@material-ui/icons/Close";
import {inputProps} from "../shared/apiapp";
import {makeStyles} from "@material-ui/core/styles";
import {StyledTableCell, StyledTableRow} from "./Profiles";
import {toast} from "react-toastify";

type FormValues = {
  id: number | null;
  name: string;
  file: File | null;
};

type Props = {
  dialogOpened: boolean;
  onClose: () => void;
  dialogMode: 'create' | 'edit';
  category?: CategoryDTO;
}

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 700,
  },
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

export const CategoryManager = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryDTO | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState<boolean>(false);
  const [categoryDialogMode, setCategoryDialogMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    setLoading(true);
    getCategories('').then(response => {
      setCategories(response);
      setLoading(false);
    }).catch((error) => {
      toast.error("Error detected: " +  error.message);
      setLoading(false);
    })
  }, [])

  if (isLoading) {
    return <></>;
  }

  const formikEnhancer = withFormik<Props, FormValues>({
    enableReinitialize: true,
    validationSchema: Yup.object()
      .shape({
        name: Yup.string().required('Image name is required').nullable(),
      }),

    mapPropsToValues: (props) => ({
      id: props.dialogMode === 'edit' ? props.category!.id : null,
      name: props.dialogMode === 'edit' ? props.category!.name : '',
      file: null,
    }),

    handleSubmit: ({file, ...values}, {setSubmitting}) => {
      setSubmitting(true);
      console.log(values);
      addCategory(values, file! as File).then(response => {
        toast.success(response.message);
        setSubmitting(false);
      }).catch((error) => {
        toast.error("Error detected: " +  error.message)
      })
    },

    displayName: 'AddImageDialog',
  });

  const AddCategory: FC<Props & FormikProps<FormValues>> = (props) => {
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      props.setFieldValue(e.target.id, file);
    }

    return (
      <div className={classes.root}>
        <Dialog open={props.dialogOpened} onClose={() => props.onClose()}>
          <DialogTitle id="responsive-dialog-title">{props.dialogMode === 'create' ? 'Create category' : 'Edit category'}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => {
                props.onClose();
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
                    label="Category name"
                    placeholder="Enter category name"
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
                        name="file"
                        onBlur={props.handleBlur}
                        onChange={onFileChange}
                      />
                      Choose category icon
                    </Button>
                  </label>
                  {props.errors.file != null ? (<>{props.errors.file}<br/></>) : <></>}
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
                }}}
              onMouseDown={() => props.handleSubmit()}
            >
              {props.dialogMode === 'create' ? 'Create category' : 'Edit category'}
            </Button>
            <Button autoFocus  color="primary" onClick={() => props.onClose()}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const AddCategories = formikEnhancer(AddCategory);

  return (
    <Container>
      <Grid container alignContent="center" justify="center">
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            component="span"
            onClick={() => {
              setCategoryDialogMode('create');
              setCurrentCategory(undefined);
              setNewCategoryDialogOpen(true);
            }}
          >
            Add category
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={2} align={'center'}>Categories</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map(row => (
                    <StyledTableRow key={row.id} onClick={() => {
                      setCategoryDialogMode('edit');
                      setCurrentCategory(row);
                      setNewCategoryDialogOpen(true);
                    }}>
                      <Tooltip aria-setsize={23} title="Enter profile">
                        <StyledTableCell align={'center'}>
                            <MenuItem style={{paddingLeft: 13, marginLeft: "200", color: "black"}}>
                              <Avatar
                                alt="Category"
                                src={`http://localhost:8080/api/categories/icon/${row.id}`}
                                style={{
                                  marginRight: 20,
                                  marginLeft: 10
                                }}
                              />
                              {row.name}
                            </MenuItem>
                        </StyledTableCell>
                      </Tooltip>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <AddCategories
        dialogOpened={newCategoryDialogOpen}
        onClose={() => {
          setCategoryDialogMode('create');
          setCurrentCategory(undefined);
          setNewCategoryDialogOpen(false);
        }}
        category={currentCategory}
        dialogMode={categoryDialogMode}
      />
    </Container>
  )
}