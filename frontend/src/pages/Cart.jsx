import "./Cart.css";
import { useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";


function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const[orderTotal,setOrderTotal]=useState(null);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.qty,
    0
  );
  const goBack=()=>{
    if(window.history.length>1){
        navigate(-1);
    }
    else{
        navigate("/menu");
    }
  };
  const handlePlaceOrder= async()=>{
    try{
      const res=await fetch("http://127.0.0.1:8000/api/orders/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          items:cart.map((i)=>({food:i.id,quantity:i.qty})),
          total:total,
        }),
      });
      if(!res.ok)throw new Error("Order failed");
      setOrderTotal(total);
      clearCart();
    }
    catch (err){
      console.error(err);
      alert("Order failed ,try again")
    }
  };

  if (orderTotal!==null){
    return(
        <div className="cart_container">
         <h1>Order Confirmed</h1>
         <p className="empty_cart">Thank you! your order ₹{orderTotal} Confirmed. </p>
        <div className="cart_actions">
        <button onClick={()=>navigate("/menu")}>Back to Menu</button>
       </div>
        </div>
    );
  }



  return (
    <div  className ="cart_container">
      <h1>My Cart 🛒</h1>

      {cart.length === 0 ? (
        <>
          <p className="empty_cart">Your cart is empty!</p>
          <div className="cart_actions">
          <button onClick={() => navigate(-1)}>
            Go to Menu
          </button>
          </div>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div 
              key={item.id}
              className="cart_item"
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{item.name}</h3>

              <p>Price: ₹{item.price}</p>

              <p>Quantity: {item.qty}</p>

              <p>
                Subtotal: ₹
                {Number(item.price) * item.qty}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="cart_total">Total: ₹{total}</h2>

          <button onClick={() => navigate(-1)("/menu")}>
            Continue Shopping
          </button>

          <button
            onClick={clearCart}
            style={{ marginLeft: "10px" }}
          >
            Clear Cart
          </button>

          <button
            onClick={handlePlaceOrder} >
            Place Order
          </button>
        </>
      )}
      
    </div>
  );
}

export default Cart;