


class ProductList extends React.Component {
  constructor() {
  super();
  this.state = { products: [] };
  this.createProduct = this.createProduct.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
 async loadData() {
  const query = `query {
    productList{
      id name Price category Image
    }
  }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
   
  }
 
  async createProduct(product) {
    const query = `mutation addProduct($product: ProductInputs!) {
      addProduct(product: $product) {
        id
      }
    }`;
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ query, variables: { product }  })
  });
 if(response){this.loadData();}
 }

  render() {
    return (
      <React.Fragment>
        <h2>My Company Inventory</h2>
        <h4> Showing all the available products</h4>
        <hr />
        <ProductTable  products={this.state.products}/>
        <h4>Add a new product to inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct}/>
      </React.Fragment>
    );
  }
}


function ProductTable(props) {    
  {
    const productRows = props.products.map(product =>
      <ProductRow key={product.id} product={product} />
    );
      return (
        <table className="bordered-table">
          <thead>
            <tr>
             <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {productRows}
          </tbody>
        </table>
      );
    }
  }

  function ProductRow(props) {
   {
    const product = props.product;
    return (
      <tr>
        
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.Price}</td>
        <td><a href={product.Image} target="_blank">View</a></td>
        
      </tr>
    );
  }
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { Price: '$' }
    this.handlepriceChange = this.handlepriceChange.bind(this);
    }
    onSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = {
        name: form.Product_Name.value,
        Price: form.Price.value.replace('$',''),
         Image:form.Image_URL.value,
         category:form.category.value,
      }
      this.props.createProduct(product);
      form.Product_Name.value = "";
      form.Price.value = "$",
       form.Image_URL.value = "";
       form.category.value = "";

    }
    handlepriceChange(){
    this.setState({Price: document.forms.productAdd.Price.value})
  }
  render()
   {
    return (
      
      <form name="productAdd" onSubmit={this.onSubmit}>
      <div className="gridview">
       <label>Category</label><br/>
       <select name="category" >
         <option value="Shirts">Shirts</option>
         <option value="Jeans">Jeans</option>
         <option value="Jackets">Jackets</option>
         <option value="Sweaters">Sweaters</option>
         <option value="Accessories">Accessories</option>
       </select>
       </div>
       <div className="gridview">
       <label>Price Per Unit </label> <br/>
       <input type="text" name="Price" placeholder="$"/>
       </div>
       <div className="gridview">
       <label> Product Name</label><br/>
       <input type="text" name="Product_Name"/>
       </div>
       <div className="gridview">
       <label>Image URL</label><br/>
       <input type="text" name="Image_URL"  placeholder="URL"/>
       </div>
       <div>
       <button type="submit">Add Product</button>
       </div>
      </form>
      
    );
  
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));

