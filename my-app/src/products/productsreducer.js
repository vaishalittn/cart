import PRODUCTS from '../constants';

const productsInitialState = {
  items: PRODUCTS.items,
};

   const productsReducer = ( state=productsInitialState,action ) => {
      switch(action.type){
        //basically decrease the quantity
        case 'addtocart':{
            const { items }= state;
            const updatedItems = items.map(items=>{
              if(items.id === action.payload.id){
                return {
                  ...items,
                  quantity: --items.quantity
                }
              }
              return items;
            });
            return {
              items:updatedItems,
             }
          }
          case 'INC_CART_QTY':{
            let { items } = state;
            const id = action.payload.id;
            let sameItem = items.filter(item => (id === item.id));
            if (sameItem.length) {
                 let quantity = sameItem[0].quantity - 1;
                 items = items.map((item) => {
              if (item.id === id) {
                  return { ...item, quantity }
              } else {
                  return item;
              }
          });
      }
      return {
          items
      };
  } 
  case 'DEC_CART_QTY':{
    let { items } = state;
    const id = action.payload.id;
    let sameItem = items.filter(item => (id === item.id));
    if (sameItem.length) {
         let quantity = sameItem[0].quantity + 1;
         items = items.map((item) => {
      if (item.id === id) {
          return { ...item, quantity }
      } else {
          return item;
      }
  });
}
return {
  items
};
}   
        case 'DELETE_FROM_CART':
            {
                // console.log("Inside delete from cart");
                let { items } = state;
                const id = action.payload.id;
                let quantity = action.payload.quantity;
                let availableQty = action.availableQty;
                // console.log("before quantity: ", quantity);

                let sameItem = items.filter(item => (id === item.id));

                if (sameItem.length) {
                    quantity = quantity + availableQty;
                    // console.log("after quantity: ", quantity);
                    // console.log("obj[0].availableQty: ", availableQty);
                    items = items.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity }
                        } else {
                            return item;
                        }
                    });
                }
                return {
                    items
                };
            }            
      default:{
          return state;
      }
        }
  };

  export default productsReducer;