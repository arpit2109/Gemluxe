import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
    const baseStyles = "px-6 py-3 font-serif font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-gold text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl focus:ring-gold",
        ghost: "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-white focus:ring-charcoal",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'ghost', 'outline']),
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
