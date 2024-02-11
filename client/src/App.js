
import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignUp from './components/signin_signup/SignUp';
import Sign_in from './components/signin_signup/Sign_in';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <div >
        <Navbar></Navbar> 
        <Newnav></Newnav>
        <Routes>
          <Route path='/' element={<Maincomp/>}></Route>
          <Route path='/login' element={<Sign_in/>}></Route>
          <Route path='/register' element={<SignUp/>}></Route>
          <Route path='/getproductsone/:id' element={<Cart/>}></Route>
          <Route path='/buynow' element={<Buynow/>}></Route>
        </Routes>
        
        <Footer></Footer>
    </div>
  );
}

export default App;
