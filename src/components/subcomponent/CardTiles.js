import Box from '@mui/material/Box';
import {Card, CardActionArea, CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

const CardTiles = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}
        >
            {props.list?.map((item) => {
                return (
                    <Card key={item.id} data-testid="card-titles">
                        <CardActionArea
                            onClick={() => item.onClick(item.id)}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }}>
                                <Typography variant="h5">
                                    {item.name}
                                </Typography>
                                <Typography variant="body1">
                                    {item.body1}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.body2}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </Box>
    )
}

export default CardTiles;