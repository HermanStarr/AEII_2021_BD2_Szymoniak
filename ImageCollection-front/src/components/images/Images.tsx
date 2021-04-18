import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {TileImageResponse} from "../../model/dto";
import {RouteComponentProps, withRouter} from "react-router";
import {Container} from "@material-ui/core";


type Props = RouteComponentProps & {}

const getImages = async (): Promise<TileImageResponse[]> => {
    //TODO
    return [
        {thumb: undefined, title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo'},
        {thumb: undefined, title: 'Zdjęcie xD', author: 'you', authorId: 2, description: 'just a photo'},
        {thumb: undefined, title: 'Zdjęcie xD', author: 'them', authorId: 3, description: 'just a photo'},
    ];
};

const Images = (props: Props) => {
    const [images, setImages] = useState<TileImageResponse[]>([]);
    const classes = useStyles();

    useEffect( () => {
        getImages().then((response) => {
            setImages(response);
        })
    }, []);

    return (
        <Container maxWidth='xs' className={classes.root}>
            <GridList spacing={20} className={classes.gridList}>
                {images.map((tile) => (
                    <GridListTile key={tile.thumb} cols={tile.author === 'me' ? 2 : 1} rows={tile.author ? 2 : 1}>
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
            width: 400,
            height: 400,
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        titleBar: {
            background: '#afafaf',
        },
        icon: {
            color: 'white',
        },
    }),
);

export default withRouter(Images);