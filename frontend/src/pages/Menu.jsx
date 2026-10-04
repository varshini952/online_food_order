import { useState, useEffect, useContext } from 'react';
import { Link ,useNavigate,useSearchParams} from 'react-router-dom';
import{CartContext}from'../CartContext';

function Foods() {
  const {addToCart}=useContext(CartContext);
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));

    fetch('http://127.0.0.1:8000/api/foods/')
      .then((res) => res.json())
      .then((data) => { setFoods(data); setLoading(false); })
      .catch((err) => { console.error('Error fetching foods:', err); setLoading(false); });
  }, []);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Loading tasty food...</h2>;

  const filteredFoods = activeCategory === 'All' ? foods
    : foods.filter((f) => f.category_name === activeCategory || f.category === activeCategory);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link to="/" style={styles.logo}>🍽️ FoodieHub</Link>
          <span style={styles.deliverTo}>Delivering to: <b>Home</b></span>
        </div>
      </header>

      <div style={styles.categoryBar}>
        <div onClick={() => setActiveCategory('All')}
          style={{ ...styles.chip, ...(activeCategory === 'All' ? styles.chipActive : {}) }}>All</div>
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => setActiveCategory(cat.name)}
            style={{ ...styles.chip, ...(activeCategory === cat.name ? styles.chipActive : {}) }}>
            {cat.name}
          </div>
        ))}
      </div>

      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>
          {activeCategory === 'All' ? 'All Dishes' : activeCategory}
          <span style={styles.count}> ({filteredFoods.length})</span>
        </h2>
        <div style={styles.grid}>
          {filteredFoods.map((food) => (
            <div key={food.id} style={styles.card}>
              <div style={styles.imageWrap}>
                {food.image ? <img src={food.image} alt={food.name} style={styles.image} />
                  : <div style={styles.noImage}>🍲</div>}
                <span style={styles.priceTag}>₹{food.price}</span>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.foodName}>{food.name}</h3>
                <p style={styles.foodDesc}>{food.description}</p>
                <button 
                style={styles.addBtn}
                 onClick={()=>{
                  addToCart(food);
                  navigate("/cart")
                 }}
                >
                  ADD +</button>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: '#f7f7fa', minHeight: '100vh' },
  header: { position: 'sticky', top: 0, zIndex: 10, background: '#ff5200', color: '#fff' },
  headerInner: { maxWidth: '1100px', margin: '0 auto', padding: '14px 20px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '22px', fontWeight: 700, color: '#fff', textDecoration: 'none' },
  deliverTo: { fontSize: '13px', opacity: 0.9 },
  categoryBar: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '16px 20px',
    background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: '52px', zIndex: 9 },
  chip: { padding: '8px 18px', borderRadius: '20px', background: '#f2f2f2', color: '#333',
    fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer', border: '1px solid transparent' },
  chipActive: { background: '#fff0e8', color: '#ff5200', border: '1px solid #ff5200', fontWeight: 700 },
  main: { maxWidth: '1100px', margin: '0 auto', padding: '24px 20px 60px' },
  sectionTitle: { fontSize: '20px', marginBottom: '16px', color: '#222' },
  count: { fontSize: '14px', color: '#888', fontWeight: 400 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  imageWrap: { position: 'relative', height: '150px', background: '#f0f0f0' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  noImage: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' },
  priceTag: { position: 'absolute', bottom: '10px', left: '10px', background: '#fff', padding: '4px 10px',
    borderRadius: '8px', fontWeight: 700, fontSize: '14px', color: '#222', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' },
  cardBody: { padding: '14px' },
  foodName: { margin: '0 0 6px', fontSize: '16px', color: '#222' },
  foodDesc: { fontSize: '13px', color: '#777', margin: '0 0 14px', lineHeight: 1.4,
    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  addBtn: { width: '100%', padding: '10px', background: '#fff', color: '#ff5200',
    border: '1.5px solid #ff5200', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' },
};

export default Foods;