import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { Product } from '../interfaces/product.interface'

interface Props {
    product: Product
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300
        },
        image: {
            padding: '5%',
            boxSizing: 'border-box'
        },
        content: {
            padding: '0.5rem 1rem'
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem'
        },

        price: {
            color: '#172F4E',
            marginRight: '1rem'
        }
    })
)

export const ProductCard: React.FC<Props> = ({ product }) => {
    const classes = useStyles()

    const history = useHistory()

    const { products, modifyProducts } = useContext(CartContext)

    const inCart = products.find(p => p.id === product.id)

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push(`${product.type}/${product.id}`)}>
                <CardMedia
                    className={classes.image}
                    component='img'
                    alt={product.name}
                    title={product.name}
                    src={process.env.REACT_APP_API_URL + product.images[0].url}
                />
                <CardContent className={classes.content}>
                    <Typography variant='h6' color='primary'>
                        {product.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className={classes.actions}>
                <Typography variant='h5' className={classes.price}>
                    {product.price}лв.
                </Typography>
                <Button
                    onClick={() => modifyProducts(product)}
                    color={inCart ? 'secondary' : 'primary'}
                >
                    {inCart ? 'remove from card' : 'add to cart'}
                </Button>
            </div>
        </Card>
    )
}
