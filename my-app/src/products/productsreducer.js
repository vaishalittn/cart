import PRODUCTS from '../constants';

const productsInitialState = {
  items: PRODUCTS.items,
};

   const productsReducer = ( state=productsInitialState,action ) => {
      switch(action.type){
        //basically on adding to cart ,decrease quantity as well
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
                let { items } = state;
                const id = action.payload.id;
                let quantity = action.payload.quantity;
                let availableQty = action.availableQty;

                let sameItem = items.filter(item => (id === item.id));

                if (sameItem.length) {
                    quantity = quantity + availableQty;
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