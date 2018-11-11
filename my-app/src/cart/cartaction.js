export const addtocart = data => {
    return { type: 'addtocart', payload: data }
};

export const DEC_SHOP_ITEM_QTY = data => {
    return { type: 'DEC_SHOP_ITEM_QTY', payload: data }
};