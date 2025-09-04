import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './Shop.module.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ShopNav from '../../components/ShopNav/ShopNav';
import { useTheme } from '../../context/ThemeContext';
// Direct import of images
import monsterLogo from '../../assets/images/MonsteroftheWeek_Logo.png';
import chewingLogo from '../../assets/images/ChewingtheScenery_Logo.png';
import goosebumpsLogo from '../../assets/images/Goosebumps_Logo.png';

// Define product data types
interface Size {
  size: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  materials?: string;
  sizes?: Size[];
  price?: number;
  description?: string;
  category: string;
}

interface Category {
  name: string;
  products: Product[];
}

// Placeholder products organized by categories
const CATEGORIES: Category[] = [
  {
    name: 'Monster of the week',
    products: [
      {
        id: 'motw-1',
        title: 'Date Night!',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments.',
        category: 'monster'
      },
      {
        id: 'motw-2',
        title: 'How do I look?',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments.',
        category: 'monster'
      },
      {
        id: 'motw-3',
        title: 'Let me in',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments.',
        category: 'monster'
      },
      {
        id: 'motw-4',
        title: 'Lurking Shadows',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments featuring a shadowy creature.',
        category: 'monster'
      },
      {
        id: 'motw-5',
        title: 'Midnight Visit',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments of a late-night visitor.',
        category: 'monster'
      },
      {
        id: 'motw-6',
        title: 'What Lives Below',
        materials: 'UV resin, acrylic, cold porcelain, hand embellished gloss, digital illustration, PVC',
        sizes: [
          { size: '8x10', price: 44 },
          { size: '16x20', price: 84 }
        ],
        description: 'Limited edition print with hand embellishments featuring the depths.',
        category: 'monster'
      }
    ]
  },
  {
    name: 'Chewing the Scenery',
    products: [
      {
        id: 'ed-1',
        title: 'WSJ - Life After Tech',
        materials: 'Digital illustration, mixed media',
        price: 45,
        description: 'Commissioned artwork for Wall Street Journal feature article on transitioning careers from tech industry.',
        category: 'editorial'
      },
      {
        id: 'ed-2',
        title: 'Atlantic Council - Security Brief',
        materials: 'Digital illustration, mixed media',
        price: 45,
        description: 'Cover illustration for Atlantic Council brief on global security concerns.',
        category: 'editorial'
      },
      {
        id: 'ed-3',
        title: 'NYT - Future of Work Series',
        materials: 'Digital illustration, mixed media',
        price: 45,
        description: 'Commissioned artwork for New York Times series on the changing nature of work.',
        category: 'editorial'
      }
    ]
  },
  {
    name: 'Goosebumps',
    products: [
      {
        id: 'gb-1',
        title: 'Stay Out of the Basement',
        materials: 'Digital print on archival paper',
        sizes: [
          { size: '8x10', price: 30 },
          { size: '11x14', price: 45 }
        ],
        description: 'Fan art recreation of the classic Goosebumps cover with a modern twist.',
        category: 'goosebumps'
      },
      {
        id: 'gb-2',
        title: 'Night of the Living Dummy',
        materials: 'Digital print on archival paper',
        sizes: [
          { size: '8x10', price: 30 },
          { size: '11x14', price: 45 }
        ],
        category: 'goosebumps'
      },
      {
        id: 'gb-3',
        title: 'Monster Blood Shelf Piece',
        materials: 'Resin, mixed media, acrylic',
        description: 'Large-scale shelf display piece based on the iconic Monster Blood series.',
        sizes: [
          { size: '20x10', price: 180 }
        ],
        category: 'goosebumps'
      }
    ]
  }
];

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Monster of the week': false,
    'Chewing the Scenery': false,
    'Goosebumps': false
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter products based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return CATEGORIES;
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    return CATEGORIES.map(category => {
      // Filter products in each category
      const filteredProducts = category.products.filter(product =>
        product.title.toLowerCase().includes(query)
      );
      
      // Return category with filtered products
      return {
        ...category,
        products: filteredProducts
      };
    }).filter(category => category.products.length > 0); // Only show categories with matching products
  }, [searchQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Expand all sections when searching
    if (query.trim()) {
      const expanded = {} as Record<string, boolean>;
      CATEGORIES.forEach(category => {
        expanded[category.name] = true;
      });
      setExpandedSections(expanded);
    }
  };

  const handleViewDetails = (product: Product) => {
    console.log('View details for:', product);
    navigate(`/shop/product/${product.id}`, { state: { product } });
  };

  const toggleSection = (sectionName: string) => {
    console.log('Toggling section:', sectionName);
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, categoryName: string) => {
    console.error(`Failed to load image for category '${categoryName}':`, e);
    console.error('Image path:', e.currentTarget.src);
    console.error('Document base URL:', document.baseURI);
    console.error('Window location:', window.location.href);
    
    // Add a red border to help debug the image container
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.style.border = '1px dashed red';
    }
    
    // Hide the image but leave the fallback text visible
    e.currentTarget.style.display = 'none';
  };

  const getCategoryImage = (categoryName: string): string => {
    // Use directly imported images for all categories
    switch(categoryName) {
      case 'Monster of the week':
        return monsterLogo;
      case 'Chewing the Scenery':
        return chewingLogo;
      case 'Goosebumps':
        return goosebumpsLogo;
      default:
        console.warn('Unknown category:', categoryName);
        return '';
    }
  };

  return (
    <div className={styles.shopWrapper}>
      <ShopNav onSearch={handleSearch} />
      <Container className={styles.centerContainer}>
        {searchQuery && (
          <div className={styles.searchResults}>
            <h2 className={styles.searchTitle}>
              Search results for: "{searchQuery}"
            </h2>
            {filteredCategories.length === 0 && (
              <p className={styles.noResults}>No products found matching your search.</p>
            )}
          </div>
        )}
        
        {filteredCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className={styles.categorySection}>
            <div 
              className={styles.categoryTitle} 
              onClick={() => toggleSection(category.name)}
            >
              <div className={styles.categoryTitleImageContainer}>
                <img 
                  src={getCategoryImage(category.name)} 
                  alt={category.name} 
                  className={`${styles.categoryTitleImage} ${theme === 'dark' ? styles.invertedImage : ''}`}
                  style={{ maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
                  onLoad={() => console.log('Image loaded for:', category.name)}
                  onError={(e) => handleImageError(e, category.name)}
                />
              </div>
              <span className={expandedSections[category.name] ? styles.arrowUp : styles.arrowDown}>
                {expandedSections[category.name] ? '▼' : '▼'}
              </span>
            </div>
            
            {expandedSections[category.name] && (
              <div className={styles.productGrid}>
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    className={styles.productCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: productIndex * 0.1,
                      ease: "easeOut" 
                    }}
                    onClick={() => handleViewDetails(product)}
                  >
                    <div className={styles.cardInner}>
                      {/* Front of card */}
                      <div className={styles.cardFront}>
                        <div 
                          className={styles.productImage} 
                          data-index={productIndex % 3}
                        >
                          {product.category.toUpperCase()}
                        </div>
                        <div className={styles.productInfoBar}>
                          <h3 className={styles.productName}>{product.title}</h3>
                        </div>
                      </div>
                      
                      {/* Back of card */}
                      <div className={styles.cardBack}>
                        <h3 className={styles.productName}>{product.title}</h3>
                        <p className={styles.productDescription}>{product.description}</p>
                        {product.materials && (
                          <p className={styles.productMaterials}>
                            <strong>Materials:</strong> {product.materials}
                          </p>
                        )}
                        {'sizes' in product && product.sizes && (
                          <div className={styles.productSizesBack}>
                            <strong>Available sizes:</strong>
                            <div className={styles.priceContainer}>
                              {product.sizes.map((size, i: number) => (
                                <p key={i} className={styles.sizeOption}>
                                  {size.size} - ${size.price}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {'price' in product && product.price && (
                          <p className={styles.productPrice}>${product.price}</p>
                        )}
                        <span className={styles.viewDetailsText}>View Details</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        ))}
      </Container>
    </div>
  );
};

export default Shop;
