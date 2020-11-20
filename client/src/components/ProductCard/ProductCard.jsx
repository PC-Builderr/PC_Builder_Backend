import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import './ProductCard.scss'

export const ProductCard = props => {
    const { product } = props

    const { products, modifyProducts } = useContext(CartContext)

    const inCart = products.find(p => p.id === product.id) ? true : false
    const cartAction = inCart ? 'Remove From Cart' : 'Add To Cart'

    const [inWishlist, setInWishlist] = useState(false)
    const wishlistIcon = inWishlist ? 'turned_in' : 'turned_in_not'

    return (
        <div className='product-card'>
            <Link to={`/${product.type}/${product.id}`}>
                <img
                    className='product-card__image'
                    src={`http://localhost:4000/api${product.images[0].url}`}
                    alt={product.name}
                />
                <p className='product-card__name'>{product.name}</p>
            </Link>
            <div className='product-card__information'>
                <p className='product-card__price'>{product.price}лв.</p>
                <p className='product-card__brand'>{product.brand.name}</p>
                <div className='product-card__hover-effect'>
                    <button
                        className='hover-effect__action'
                        onClick={() => modifyProducts(product)}
                    >
                        <i className='material-icons'>shopping_cart</i>
                        {cartAction}
                    </button>
                    <button className='hover-effect__action' onClick={() => setInWishlist(s => !s)}>
                        <i className='material-icons'>{wishlistIcon}</i>Wishlist
                    </button>
                </div>
            </div>
        </div>
    )
}
