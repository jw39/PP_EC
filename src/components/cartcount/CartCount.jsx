

const CartCount = ({ quantity, setQuantity, stock }) => {
  return (
    <>
      <button
        // - 클릭하면 기존의 수량에서 하나 줄어든다.
        onClick={() => setQuantity((prev) => quantity - 1)}
        className="quantity_input_button"
        disabled={quantity <= 1} // 수량이 1이되면 클릭하지 못하게한다.
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        // + 클릭하면 기존의 수량에서 하나 증가한다.
        onClick={() => setQuantity((prev) => quantity + 1)}
        className="quantity_input_button"
        // 수량과 재고의 개수가 같아지면 클릭하지 못한다.
        disabled={quantity === stock}
      >
        +
      </button>
    </>
     );
    };
    
    export default CartCount;