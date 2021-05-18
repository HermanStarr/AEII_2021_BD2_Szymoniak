import React, {useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles, fade} from '@material-ui/core/styles';
import {CategoryResponse, TagResponse, TileImageResponse} from "../../model/dto";
import {withRouter} from "react-router";
import {
  AppBar,
  Container,
  InputBase,
  Toolbar
} from "@material-ui/core";
import {AddImage} from "./AddImageDialog";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import FilterSelect from "../../shared/FilterSelect";
import {photos} from "./photos";
import ImagesGrid from "./ImagesGrid";
import {getImagesWithCriteria} from "../../actions/images";

const getImages = async (): Promise<TileImageResponse[]> => {
  return [
    {id: 1, thumb: '', title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo', resolutionY: 450, resolutionX: 800},
    {id: 2, thumb: '', title: 'Zdjęcie xD', author: 'you', authorId: 2, description: 'just a photo', resolutionY: 450, resolutionX: 800},
    {id: 3, thumb: '', title: 'Zdjęcie xD', author: 'them', authorId: 3, description: 'just a photo', resolutionY: 450, resolutionX: 800},
  ];
};
const getCategories = async (): Promise<CategoryResponse[]> => {
  return [
    {id: 1, name: 'category'},
    {id: 2, name: 'dunno'},
  ];
};

const getTags = async (): Promise<TagResponse[]> => {
  return [
    {id: 1, name: 'cat'},
    {id: 2, name: 'dog'},
    {id: 3, name: 'pigeon'},
  ];
};

const Images = () => {
  const [searchedImages, setSearchedImages] = useState<TileImageResponse[]>([]);
  const [categorySearchCriteria, setCategorySearchCriteria] = useState<string>("");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [tagSearchCriteria, setTagSearchCriteria] = useState<string>("");
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [images, setImages] = useState<TileImageResponse[]>([]);
  const [addImageDialogOpened, setAddImageDialogOpened] = useState<boolean>(false);
  const classes = useStyles();

  const onSearch = () => {
    let criteria = categorySearchCriteria !== '' ? 'categories=' : '' + categorySearchCriteria;
    criteria += categorySearchCriteria !== '' && tagSearchCriteria !== '' ? '&' : '';
    criteria += tagSearchCriteria !== '' ? 'tags=' : '' + tagSearchCriteria;
    getImagesWithCriteria(criteria).then(response => {
      setImages(response.items);
    })
  }

  useEffect( () => {
    getImages().then((response) => {
      let images1 = photos.map((photo, index) => ({
        id: index,
        thumb: photo.src,
        title: index + "Zdjęcie xD",
        author: "Me",
        authorId: 1,
        description: "2 Kartka papieru",
        resolutionX: photo.width,
        resolutionY: photo.height,
      }))
      setImages(images1);
      setSearchedImages(images1);
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
          style={{width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
          onClick={() => setAddImageDialogOpened(true)}
        >
          Add image
        </Button>
        <AppBar position="static" style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search by a description"
                classes={{root: classes.inputRoot, input: classes.inputInput,}}
                onChange={event => {
                  let value = event.target.value.toLowerCase();
                  setSearchedImages(images.filter(item =>
                    item.description.toLowerCase().includes(value)
                    || item.title.toLowerCase().includes(value)
                  ));
                }}
                inputProps={{'aria-label': 'search'}}
              />
            </div>
            <FilterSelect
              options={categories.map(category => category.name)}
              placeholder="Category"
              freeSolo={false}
              onChange={(value: string[]) => setCategorySearchCriteria(value.join('&categories='))}
            />
            <FilterSelect
              options={tags.map(tag => tag.name)}
              placeholder="Tags"
              freeSolo={false}
              onChange={(value: string[]) => setTagSearchCriteria(value.join('&tags='))}
            />
            <Button
              onClick={() => onSearch()}>
              Search
            </Button>
          </Toolbar>
        </AppBar>
        <ImagesGrid tiles={searchedImages}/>
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: -15,
      width: 200,
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  }),
);


export default withRouter(Images);