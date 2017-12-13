import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  state = {
    products: [{
      id: 1, title: 'My Product'
    }],
    id: 1
  }
  handleAddProduct = (event) => {
    event.preventDefault()
    const id = this.state.id + 1
    const products = [...this.state.products]
    const title = event.target.elements.product.value
    products.push({ id, title })
    this.setState({ products })
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products/new">New Product</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={() => <Home products={this.state.products} />}/>
          <Route path="/products/new" component={({history}) => <NewProduct history={history} handleAddProduct={this.handleAddProduct} />}/>
        </div>
      </Router>
    );
  }
}

const Home = ({ products }) => (
  <div>
    <h2>Home</h2>
    {products.map(product => <p>{product.title}</p>)}
  </div>
)

const NewProduct = ({ handleAddProduct, history }) => (
  <div>
    <h2>New Product</h2>
    <form onSubmit={(e) => {
      handleAddProduct(e)
      history.push('/')
    }}>
      <input type="text" name="product" />
    </form>
  </div>
)

export default App;
