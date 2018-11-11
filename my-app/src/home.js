import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'
import { addtocart } from './cart/cartaction';
import { INC_CART_QTY, DEC_CART_QTY, DELETE_FROM_CART } from './products/productsaction';
import { ButtonToolbar, Button, Badge } from 'react-bootstrap';

class Home extends React.Component{
    handleAddtoCart = data => {
    console.log('data---', data)
     this.props.addToCart(data);
    } 
    render() {
                console.log(this.props.productList);
                let productlist = this.props.productList.map((_data)=>{
                    return(
                    <div className="product-content">
                         <ul className="list"  key={_data.id}>
                        <li><img src= {_data.image} alt="product"/></li>
                        <li><h5>{_data.name}</h5></li>
                        <li><p>In Stock:<Badge>{_data.quantity}</Badge></p></li>
                        <li><p>Rs: {_data.price}</p></li>
                        <li><ButtonToolbar>
                            <Button bsStyle ="primary"
                        onClick={()=>{ this.handleAddtoCart(_data)}}>ADD TO CART</Button>
                        </ButtonToolbar></li>
                    </ul>
                    </div>
                    )
                });
                // let cartlist = this.props.cartList.map((_data)=>{
                //     return(
                //             <div className="cart-content">
                //                 <ul className="list" key={_data.id}>
                //                 <li><img src= {_data.image} alt="product"/></li>
                //                 <li>{_data.name}</li>
                //                 <li>{_data.quantity} &nbsp;
                //                 <Button bsStyle ="primary">+</Button>&nbsp;
                //                 <Button bsStyle ="primary" onClick={()=>{ this.decqty(_data)}}>-</Button>
                //                 </li>
                //                 <li>{_data.price}</li>
                                
                //             </ul>
                //             </div>
                //     )
                //             });
                let cartlist = this.props.cartList.map((item) => {
                    if (item.quantity) {
                        return (
                            <div key={item.id} className="cartItemCard">
                                <div className="cartItemImage">
                                    <img src={item.image} />
                                </div>
                                <div className="cartItemDetail-main">
                                    <div className="cartItemInfo">{item.name}</div>
                                    <div className="cartItemInfo" >Price:{item.price}</div>
                                    <div className="cartQty-main">
                                        <button disabled={item.availableQty == 0} onClick={() => this.props.incCartItemQty(item)} className="incCartItemBtn">+</button>
                                        <div className="cartItemQty" >{item.quantity}</div>
                                        <button onClick={() => this.props.decCartItemQty(item)} className="removeFromCartBtn">-</button>
                                    </div>
                                    <button onClick={() => this.props.deleteFromCart(item)} className="deleteFromCartButton">Remove from Cart</button>
                                </div>
                            </div>
                        )
                    }
                });
                let orderSummaryList = this.props.cartList.map((item) => {
                    return (
                        <div key="item.id">
                            <div>{item.name}</div>
                            <div>Total Price: {item.price} X {item.quantity} = {item.totalPrice}</div>
                        </div>
                    );
                });
                let totalPriceArray = this.props.cartList.map((item) => {
                    return (item.totalPrice);
                });        
                let totalAmount = totalPriceArray.reduce((a, b) => a + b, 0);
        
        return (
                    <div className="mart-container">
                    <div className="left-container">
                       <div className="productrow">{productlist}</div>
                    </div>
                    
                    <div className="dividor"></div>
                    <div className="right-container">
                     <div className="cart-row">{cartlist}</div>
                    
                    <div className="order-summary">
                        <h2>Your Shopping Cart</h2>
                        {this.props.cartProducts.length ? (
                            <div className="TTNCart">
                                {/* <div className="items-section">
                                    {cartItemsList}
                                </div> */}
                                <div className="orderSummary-section">
                                    <h3>Order Summary</h3>
                                    {orderSummaryList}
                                    {/* <div>
                                        Total ({cartProducts.length} items): {totalAmount} Rs
                                </div> */}
                                </div>
                            </div>
                        ) : (
                                <div className="emptyCartMsg">
                                    Sorry !! There are no items in you cart.
                                    Please go back to the store to add items to your shopping cart.
                                </div>
                            )
                        }
                    </div>                    
                    </div>
                    </div>
                );
            
        }
    }
const mapStateToProps = state => ({
    productList: state.product.items,
    cartList: state.cart.cartItems, 
});
   
const mapDispatchToProps = dispatch => ({
    addToCart: bindActionCreators(addtocart, dispatch),
    incCartQty: bindActionCreators(INC_CART_QTY, dispatch),
    decCartQty: bindActionCreators(DEC_CART_QTY, dispatch),
    delete: bindActionCreators(DELETE_FROM_CART, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);