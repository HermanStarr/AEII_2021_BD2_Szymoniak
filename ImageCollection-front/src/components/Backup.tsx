import {Container, Grid, GridList, GridListTile} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {CategoryResponse, TileImageResponse} from "../model/dto";
import {DateRange} from "@material-ui/icons";

const getImages = async (): Promise<TileImageResponse[]> => {
    //TODO
    return [];
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
          <Grid container>
              <Grid item xs={12} sm={6}>
                  <DateRange>

                  </DateRange>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <GridList>
                      {categories.map((tile) => (
                          <GridListTile key={tile.id} cols={1} rows={1}>
                              <div>
                                  {tile.name}
                              </div>
                          </GridListTile>
                      ))}
                  </GridList>
              </Grid>
          </Grid>
      </Container>
    );
}