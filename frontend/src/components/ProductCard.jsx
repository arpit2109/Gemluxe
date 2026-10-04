import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { id, name, price, images, category } = product;
    const imageUrl = images && images.length > 0 ? images[0].image : 'https://via.placeholder.com/300';

    return (
        <Link to={`/products/${id}`} className="group block">
            <div className="relative aspect-square overflow-hidden bg-platinum">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg font-serif text-charcoal">{name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{category}</p>
                </div>
                <p className="text-lg font-medium text-gold">${price}</p>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        category: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string
        }))
    }).isRequired,
};

export default ProductCard;
