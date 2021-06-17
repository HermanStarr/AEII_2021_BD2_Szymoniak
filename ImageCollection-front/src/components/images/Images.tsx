import React, {useContext, useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles, fade} from '@material-ui/core/styles';
import {
  CategoryDTO,
  PaginatedResult,
  TagResponse,
  ImageThumbResponse,
  ImageResponse
} from "../../model/dto";
import {withRouter} from "react-router";
import {
  AppBar, Checkbox,
  Container, FormControlLabel, Grid,
  InputBase,
  Toolbar
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FilterSelect from "../../shared/FilterSelect";
import ImagesGrid from "./ImagesGrid";
import {getImagesWithCriteria} from "../../actions/images";
import AddImage from "./AddImageDialog";
import {getCategories, getTags} from "../../actions/tagsAndCategories";
import {UserContext} from "../../App";
import {toast} from "react-toastify";

const Images = () => {
  const [categorySearchCriteria, setCategorySearchCriteria] = useState<string>("");
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [tagSearchCriteria, setTagSearchCriteria] = useState<string>("");
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [images, setImages] = useState<PaginatedResult<ImageThumbResponse>>({items: [], elementCount: 0});
  const [addImageDialogOpened, setAddImageDialogOpened] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const [editImage, setEditImage] = useState<ImageResponse | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number>(9);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchType, setSearchType] = useState<'AND' | 'OR'>('OR');
  const [isLoading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const info = useContext(UserContext);

  const onSearch = () => {
    setLoading(true);
    let query = `sortOrder=DESC&sortBy=creationDate&pageSize=${pageSize}&pageNumber=${pageNumber}`
      + `&searchType=${searchType}&search=${tagSearchCriteria}${categorySearchCriteria}${searchName},`;
    console.log(query);
    getImagesWithCriteria(query).then(response => {
      setImages(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect( () => {
    setLoading(true);
    getImagesWithCriteria('sortOrder=DESC&sortBy=creationDate&pageSize=9&pageNumber=0').then(response => {
      setImages(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getImagesWithCriteria(`sortOrder=DESC&sortBy=creationDate&pageSize=${pageSize}&pageNumber=0`
      + `&searchType=${searchType}&search=${tagSearchCriteria}${categorySearchCriteria}${searchName},`).then(response => {
        setImages(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }, [pageSize]);

  useEffect(() => {
    setLoading(true);
    getImagesWithCriteria(`sortOrder=DESC&sortBy=creationDate&pageSize=${pageSize}&pageNumber=${pageNumber}`
      + `&searchType=${searchType}&search=${tagSearchCriteria}${categorySearchCriteria}${searchName},`).then(response => {
        setImages(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }, [pageNumber]);


  useEffect(() => {
    setLoading(true);
    getCategories('').then(response => {
      setCategories(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getTags('').then(response => {
      setTags(response);
    }).catch(error => {
      toast.error("Error detected: " +  error.message)
    }).finally(() => {
      setLoading(false);
    });
  }, []);


  return (
    <>
      <Container className={classes.root}>
        {
          info.userInfo &&
          <Button
              variant="outlined"
              color="secondary"
              component="span"
              className={classes.addImageButton}
              onClick={() => setAddImageDialogOpened(true)}
          >
              Add image
          </Button>
        }
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container>
              <Grid item xs={10}>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <Grid container xs={12} spacing={2} style={{paddingBottom: 10, paddingTop: 10}}>
                      <Grid item xs={12} sm={6}>
                        <div className={classes.search}>
                          <InputBase
                              placeholder="Search for an image"
                              classes={{root: classes.inputRoot, input: classes.inputInput}}
                              onChange={event => {
                                let phrase = event.target.value;
                                setSearchName(phrase !== '' ? 'name%3A' + phrase.toLowerCase() + ',' : '');
                              }}
                              inputProps={{'aria-label': 'search'}}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FilterSelect
                            options={categories.map(category => ({
                              name: category.name,
                              id: category.id,
                            }))}
                            placeholder="Category"
                            freeSolo={false}
                            onChange={(value: string[]) =>
                                setCategorySearchCriteria(value.length !== 0 ? 'categories~' + value.join('%5Cu007c') + ',' : '')
                            }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container xs={12} spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FilterSelect
                          options={tags.map(tag => ({name: tag.name, id: tag.id}))}
                          placeholder="Tags"
                          freeSolo={false}
                          onChange={(value: string[]) =>
                            setTagSearchCriteria(value.length !== 0 ? 'tags~' + value.join('%5Cu007c') + ',' : '')
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                            control={
                              <Checkbox
                                  onChange={(e) => setSearchType(e.target.checked ? 'OR' : 'AND')}
                              />
                            }
                            label="Inclusive search"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} style={{padding: 10}}>
                <Button
                    className={classes.searchButton}
                    onClick={() => onSearch()}
                    style={{width: '100%'}}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <ImagesGrid
          tiles={images}
          onPageChange={value => {
            setPageNumber(value);
          }}
          onPageSizeChange={value => {
            setPageSize(value);
          }}
          onImageEdit={(image) => {
            setEditImage(image);
            setAddImageDialogOpened(true);
          }}
          pageSize={pageSize}
          isLoading={isLoading}
        />
      </Container>
      <AddImage
        dialogOpened={addImageDialogOpened}
        onClose={() => {
          setAddImageDialogOpened(false);
          setEditImage(undefined);
        }}
        image={editImage}
        onRefresh={() => onSearch()}
      />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'wrap',
      backgroundColor: theme.palette.background.paper,
    },
    addImageButton: {
      flexGrow: 1,
    },
    appBar: {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.3),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.45),
      },
      width: '100%',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      width: '100%',
      color: '#ffffff',
    },
    searchButton: {
      color: '#ffffff',
      width: '100%',
      backgroundColor: '#BF6984',
      '&:hover': {
        backgroundColor: fade('#BF6984', 0.85),
      },
    },
  }),
);


export default withRouter(Images);