import React, {useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles, fade} from '@material-ui/core/styles';
import {CategoryResponse, ImageRequest, PaginatedResult, TagResponse, ImageThumbResponse} from "../../model/dto";
import {RouteComponentProps, withRouter} from "react-router";
import {
  AppBar, Avatar,
  Container, Grid,
  InputBase,
  Toolbar
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FilterSelect from "../../shared/FilterSelect";
import {photos} from "./photos";
import ImagesGrid from "./ImagesGrid";
import {getImagesWithCriteria} from "../../actions/images";
import AddImage from "./AddImageDialog";

const getImages = async (): Promise<ImageThumbResponse[]> => {
  return [
    {id: 1, thumb: '', title: 'Zdjęcie xD', owner: 'me', ownerId: 1, creationDate: '31-12-2022'},
    {id: 2, thumb: '', title: 'Zdjęcie xD', owner: 'you', ownerId: 2, creationDate: '31-12-2022'},
    {id: 3, thumb: '', title: 'Zdjęcie xD', owner: 'them', ownerId: 3, creationDate: '31-12-2022'},
  ];
};
const getCategories = async (): Promise<CategoryResponse[]> => {
  return [
    {id: 1, name: 'category'},
    {id: 2, name: 'dunno'},
    {id: 3, name: 'neutron'},
    {id: 4, name: 'proton'},
  ];
};

const getTags = async (): Promise<TagResponse[]> => {
  return [
    {id: 1, name: 'cat'},
    {id: 2, name: 'dog'},
    {id: 3, name: 'pigeon'},
  ];
};
type Props = {
  imageData?: ImageRequest;
} & RouteComponentProps

const Images = (props:Props) => {
  const [categorySearchCriteria, setCategorySearchCriteria] = useState<string>("");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [tagSearchCriteria, setTagSearchCriteria] = useState<string>("");
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [images, setImages] = useState<PaginatedResult<ImageThumbResponse>>({items: [], totalElements: 0});
  const [addImageDialogOpened, setAddImageDialogOpened] = useState<boolean>(false);
  const [paging, setPaging] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const classes = useStyles();

  const onSearch = () => {
    let query = 'sortOrder=DESC&sortBy=creationDate&'
      + paging
      + 'search='
      + tagSearchCriteria
      + categorySearchCriteria
      + searchName;
    getImagesWithCriteria(query).then(response => {
      setImages(response);
    });
  }

  useEffect( () => {
    getImages().then((response) => {
      let images1 = photos.map((photo, index) => ({
        id: index,
        thumb: photo.src,
        title: index + "Zdjęcie xD",
        owner: "Me",
        ownerId: 1,
        creationDate: '31-12-2022'
      }))
      setImages({items: images1, totalElements: images1.length});
    })
  }, []);
  useEffect(() => {
    getCategories().then(response => {
      setCategories(response);
    })
  }, [])
  useEffect(() => {
    getTags().then(response => {
      setTags(response);
    })
  }, [])

  return (
    <>
      <Container className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.addImageButton}
          onClick={() => setAddImageDialogOpened(true)}
        >
          Add image
        </Button>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={4}>
                <FilterSelect
                  options={categories.map(category => ({name: category.name}))}
                  placeholder="Category"
                  freeSolo={false}
                  onChange={(value: string) =>
                    setCategorySearchCriteria(value !== '' ? 'categories~' + value + ',' : '')
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FilterSelect
                  options={tags.map(tag => ({name: tag.name}))}
                  placeholder="Tags"
                  freeSolo={false}
                  onChange={(value: string) =>
                    setTagSearchCriteria(value !== '' ? 'tags~' + value + ',' : '')
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  className={classes.searchButton}
                  onClick={() => onSearch()}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <ImagesGrid tiles={images} onPageChange={(value) => setPaging(value)}/>
      </Container>
      <AddImage
        dialogOpened={addImageDialogOpened}
        onClose={() => setAddImageDialogOpened(false)}
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
      width: '100%',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: '#BF6984',
      '&:hover': {
        backgroundColor: fade('#BF6984', 0.85),
      },
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