import PRODUCTS from '../constants';
const initialState = {
    cartItems: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'addtocart':
            {
                let { cartItems } = state;
                const { id, name, price, image } = action.payload;
                let availableQty = action.payload.quantity;
                let quantity = 1;
                let totalPrice = price;

                //if the user clicks add to cart two times then increase the quantity
                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {

                    quantity = sameItem[0].quantity + 1;
                    availableQty = --availableQty;
                    totalPrice = quantity * price;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { id, name, quantity, price, image, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }

                else {     //different item
                    cartItems = cartItems.concat([{ id, name, quantity, price, image, availableQty: --availableQty, totalPrice }]);
                }
                return {
                    cartItems
                };
            }
        case 'INC_CART_QTY':
            {
                let { cartItems } = state;
                const { id, price } = action.payload;
                let totalPrice = price;

                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {
                    let quantity = sameItem[0].quantity + 1;
                    totalPrice = sameItem[0].price * quantity;
                    let availableQty = sameItem[0].availableQty - 1;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }
                return {
                    cartItems
                };
            }
        case 'DEC_CART_QTY':
            {
                let { cartItems } = state;
                const { id, price } = action.payload;
                let totalPrice = price;

                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {
                    let quantity = sameItem[0].quantity - 1;
                    totalPrice = price * quantity;
                    let availableQty = sameItem[0].availableQty + 1;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }
                return {
                    cartItems
                };
            }
        case 'DELETE_FROM_CART':
            {
                let { cartItems } = state;
                const currItem = action.payload;
                const itemToRemoveIndex = cartItems.indexOf(currItem);
                cartItems.splice(itemToRemoveIndex, 1);
                const updatedCartItems = cartItems.slice();
                return {
                    cartItems: updatedCartItems
                };
            }
        default:
            return state;

    }
}

export default reducer;