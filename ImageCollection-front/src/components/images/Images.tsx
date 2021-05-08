import React, {useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles, fade} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {CategoryResponse, TileImageResponse} from "../../model/dto";
import {RouteComponentProps, withRouter} from "react-router";
import {AppBar, Container, FormControl, InputBase, InputLabel, MenuItem, Select, Toolbar} from "@material-ui/core";
import {ImageDialog} from "./ImageDialog";
import {AddImage} from "./AddImageDialog";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';


type Props = RouteComponentProps & {}

const getImages = async (): Promise<TileImageResponse[]> => {
    //TODO
    return [
        {id: 1, thumb: '', title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo'},
        {id: 2, thumb: '', title: 'Zdjęcie xD', author: 'you', authorId: 2, description: 'just a photo'},
        {id: 3, thumb: '', title: 'Zdjęcie xD', author: 'them', authorId: 3, description: 'just a photo'},
    ];
};
// eslint-disable-next-line react-hooks/rules-of-hooks

const Images = (props: Props) => {
    const [searchedImages, setSearchedImages] = useState<TileImageResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [images, setImages] = useState<TileImageResponse[]>([]);
    const [imageId, setImageId] = useState<number | null>(null);
    const [imageDialogOpened, setImageDialogOpened] = useState<boolean>(false);
    const [addImageDialogOpened, setAddImageDialogOpened] = useState<boolean>(false);
    const classes = useStyles();

    useEffect( () => {
        getImages().then((response) => {
            setImages(response);
            setSearchedImages(response);
        })
    }, []);
    useEffect(() => {
        getCategories().then(response => {
            setCategories(response);
        })
    }, [])
    return (
        <>
            <Container className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search by a description"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}

                                    onChange={event => {
                                        let newList = images.filter(item => {
                                            const filter = event.target.value.toLowerCase();
                                            return item.description.toLowerCase().includes(filter);
                                        })
                                        setSearchedImages(newList);
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div>
                            <FormControl variant="outlined" className={classes.filterActions}>
                                <InputLabel className={classes.selected}>Category</InputLabel>
                                <Select
                                    className={classes.selected}
                                    label="Category"
                                    placeholder="Choose a category"
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}>
                                    <MenuItem key={0} value={0}>
                                        <em>All</em>
                                    </MenuItem>
                                    {categories.map(value => (
                                        <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setAddImageDialogOpened(true)}
                            >
                                Add image
                            </Button>
                        </Toolbar>
                    </AppBar>
                <GridList spacing={20} className={classes.gridList}>
                    {searchedImages.map((tile) => (
                        <GridListTile
                            key={tile.thumb}
                            cols={tile.author === 'me' ? 2 : 1}
                            rows={tile.author ? 2 : 1}
                            onClick={() => {
                                setImageId(tile.id);
                                setImageDialogOpened(true);
                            }}
                        >
                            <div style={{background: '#ff0000'}}>
                                <div>
                                    {tile.thumb}
                                </div>
                                <img src={tile.thumb} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    titlePosition="bottom"
                                    actionIcon={
                                        <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    className={classes.titleBar}
                                />
                            </div>
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
            <ImageDialog
                imageId={imageId}
                dialogOpened={imageDialogOpened}
                onClose={() => setImageDialogOpened(false)} />
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
        gridList: {
            width: 800,
            height: 800,
            transform: 'translateZ(0)',
        },
        titleBar: {
            background: '#afafaf',
        },
        icon: {
            color: 'white',
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
        color: {
            color: "FFFFFF",
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
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        header: {
            backgroundColor: '#ADD8E6'
        },
        cell_medium: {
            fontSize: "10px",
            width: 250,
            color: 'inherit',
            minWidth: 1,
            marginLeft: "20px",
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
        },
        cell_short: {
            fontSize: "10px",
            width: 170,

        },
        filterActions: {
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            width: 170,
            fontWeight: 100,
            color: "white",
            marginLeft: 10,
        },
        selected: {
            color: fade(theme.palette.common.white, 0.85),
            fontWeight: 100,
        }
    }),
);


export default withRouter(Images);