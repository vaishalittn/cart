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

    incCartQty = item => {
        console.log('data---', item)
         this.props.incCartQty(item);
     } 

     decCartQty = item => {
        console.log('data---', item)
         this.props.decCartQty(item);
     } 

     delete = item => {
        console.log('data---', item)
         this.props.delete(item);
     } 
    render() {
                console.log(this.props.productList);
                let productlist = this.props.productList.map((_data)=>{
                    return(
                    <div className="content" key={_data.id}>
                        <ul className="list">
                        <li>
                            <img src= {_data.image} alt={_data.name}/>
                        </li>
                        <li>
                            {_data.name}
                        </li>
                        <li>
                            In Stock:<Badge>{_data.quantity}</Badge>
                        </li>
                        <li>
                            <p>Rs: {_data.price}</p>
                        </li>
                        <li><ButtonToolbar>
                        <Button bsStyle="info" bsSize="small" block
                        onClick={()=>{ this.handleAddtoCart(_data)}}>ADD TO CART</Button>
                        </ButtonToolbar></li>
                    </ul>
                    </div>
                    )
                });
                let cartlist = this.props.cartList.map((item) => {
                    if (item.quantity) {
                        return (
                            <div className="content" key={item.id}>
                            <ul className="list">
                                <li>
                                    <img src={item.image} alt={item.name}/>
                                </li>
                                    <li>
                                        {item.name}
                                    </li>
                                    <li>Price: {item.price}</li>
                                    <li> {item.quantity}
                                    <ButtonToolbar>
                                    <Button disabled={item.availableQty === 0}
                                     onClick={() => {this.props.incCartQty(item)}} bsStyle="primary"
                                     className="incCartItemBtn" block>+</Button>
                                    <Button onClick={() => {this.props.decCartQty(item)}} bsStyle="warning"
                                     className="removeFromCartBtn" block>-</Button>
                                    <Button onClick={() => {this.props.delete(item)}} bsSize="small" bsStyle="danger"
                                     className="deleteFromCartButton" block>Delete</Button>
                                    </ButtonToolbar></li>
                                </ul>
                            </div>
                        )
                    }
                });
                let orderList = this.props.cartList.map((item) => {
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
                        PRODUCTS<br />
                       <div className="product-row">{productlist}</div>
                    </div>
                    <div className="dividor"></div>
                    <div className="right-container">
                        YOUR CART<br />
                        Total : {totalAmount} Rs
                     <div className="cart-row">
                         {cartlist}</div>
                    <div className="order-summary">
                        {`${this.props.cartlist}`.length ? (
                            <div>
                                    <h3>Order Summary</h3>
                                    {orderList}
                                    <div>
                                        Total ({cartlist.length} items): {totalAmount} Rs
                                    </div>
                            </div>
                        ) : (
                                <div>
                                 You have an empty cart!!Just go back to home page.
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