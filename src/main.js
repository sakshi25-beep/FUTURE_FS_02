import './style.css'
import products from"../api/products.json";
import { showProductContainer } from './h0meProductCards';
console.log(products);
//call the function to display all the
showProductContainer(products);
