import React from 'react';
import { useLocation } from 'react-router-dom';
import useProductSearch from '../hooks/useProductSearch';
import ProductCard from './ProductCard';
import LoadingOverlay from './LoadingOverlay';
import Header from './Header';
import { Carousel } from 'react-responsive-carousel';

export default function SearchResultsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const { loading, error, searchResults } = useProductSearch(query);

    return (
        <div>
            <Header />
            {loading && <LoadingOverlay />}
            {error && <p>{error}</p>}

            {searchResults.length > 0 ? (
                <div style={styles.container}>
                    <Carousel
                        showArrows
                        infiniteLoop={false}
                        showThumbs={false}
                        preventScrollOnTouchMove
                        swipeable
                        emulateTouch>
                        {searchResults.map((product) => (
                            <ProductCard key={product.id} id={product.id} {...product} />
                        ))}
                    </Carousel>
                </div>
            ) : (
                !loading && query && <p style={{ color: 'white' }}>Nenhum resultado encontrado</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

