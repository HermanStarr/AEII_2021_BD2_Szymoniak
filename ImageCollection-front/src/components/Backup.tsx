import {Container, GridList, GridListTile} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {CategoryResponse, ImageResponse, TileImageResponse} from "../model/dto";

const getImages = async (): Promise<TileImageResponse[]> => {
    //TODO
    return [
        {thumb: undefined, title: 'Zdjęcie xD', author: 'me', authorId: 1, description: 'just a photo'},
        {thumb: undefined, title: 'Zdjęcie xD', author: 'you', authorId: 2, description: 'just a photo'},
        {thumb: undefined, title: 'Zdjęcie xD', author: 'them', authorId: 3, description: 'just a photo'},
    ];
};

const getCategories = async (): Promise<CategoryResponse[]> => {
    return [
        {id: 1, name: 'category'},
        {id: 2, name: 'dunno'},
    ];
}

type Props = {}

export const Backup = (props: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false);
   const [categories, setCategories] = useState<CategoryResponse[]>([]);
   const [additionalFiles, setAdditionalFiles] = useState<TileImageResponse[]>([]);

   useEffect(() => {
       setLoading(true);
       Promise.all([
           getCategories(),
           getImages(),
       ]).then(([
           categories,
           images,
       ]) => {
           setCategories(categories);
           setAdditionalFiles(images);
           setLoading(true);
       })
   }, []);

    return (
      <Container>
          <Typography component="h1" variant="h5">
              Category backup list
          </Typography>
          <GridList>
              {categories.map((tile) => (
                  <GridListTile key={tile.id} cols={1} rows={1}>
                      <div>
                          {tile.name}
                      </div>
                  </GridListTile>
              ))}
          </GridList>
      </Container>
    );
}