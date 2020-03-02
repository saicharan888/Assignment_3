
const fs = require('fs');
const express = require('express');

const { ApolloServer } = require('apollo-server-express');


let aboutMessage = "Product Inventory";
const productDB = [
  {
      id:1,category: 'Shirts', name: 'Blue Shirt', Price: 60.00,Image:'https://www.superdry.com/us/mens/jackets/details/153408/skate-luxe-coach-jacket--navy'
  },
  {
      id: 2,category: 'Accessories', name: 'Scarf ', Price: 20.00, Image:'https://www.gap.com/browse/product.do?pid=546615022#pdp-page-content'
  },
  {
      id: 3,category: 'Jackets', name: 'Leather jacket', Price: 210.00,     Image:'https://www.everlane.com/products/womens-leather-flight-jacket-mellowpink?locale=US&utm_medium&utm_source=pla-google&utm_campaign=838503582&utm_content=408119694860&utm_term=aud-492596540375:pla-837884946428&adgroup=90496873874&pid=6803-48009&device=c&gclid=Cj0KCQiAtOjyBRC0ARIsAIpJyGORgeKDYeVjQzHW6LL2d9_30MzWd_ayNK4e33WDeGYfNB850kWF7SIaAv3tEALw_wcB'
  }
];


const resolvers = {
  Query: {
    
    productList,
  },
  Mutation: {
    
    addProduct,
  },
 
};



function productList() {
  return productDB;
}
function addProduct(_, { product }) {
 
  product.id = productDB.length + 1;
 
  productDB.push(product);
  return product;
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});