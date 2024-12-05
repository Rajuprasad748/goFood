import React , {useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../components/ContextReducer";

const Navbar = () => {

const [cartView,setCartView] = useState(false)

let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login')
  }

  
  return (
    <div>
      <header className="text-gray-800 bg-blue-300 body-font px-8">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-3xl">www.F😊😊D😊</span>
          </div>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center font-bold text-xl">
            <Link to="/" className="mr-5 hover:text-gray-900">
              🏠Home
            </Link>
            {
              localStorage.getItem("authToken") ? 
              <Link to="/myOrder" className="mr-5 hover:text-gray-900">
              🔖My Orders
            </Link> : ""
            }
          </nav>
          {
            (!localStorage.getItem("authToken")) ? 
            <div className="inline-flex items-center gap-4 border-0 px-3 rounded text-base mt-4 md:mt-0">
      <Link to="/Login" className="bg-white px-6 py-2 active:scale-95 text-black rounded-md">
              Login
            </Link>
          <Link to="/creatuser" className="bg-white px-6 py-2 active:scale-95 text-black rounded-md">
              Sign Up
            </Link> 
          </div> : <div className="inline-flex items-center gap-4 border-0 px-3 rounded text-base mt-4 md:mt-0 font-bold">
      <div onClick={() => setCartView(true)} className="bg-white flex items-center justify-center gap-2 px-4 py-2 active:scale-95 text-black cursor-pointer rounded-md">
              🛍️Cart <span className="h-5 w-5 bg-red-500 rounded-full flex justify-center items-center text-white">{data.length}</span>
            </div>
            {cartView? <Modal onClose={()=> setCartView(false)}> <Cart /> </Modal> : null}
            <div onClick={handleLogout} className="bg-red-600 px-6 py-2 active:scale-95 text-white rounded-md cursor-pointer">
              logout
            </div>
             </div>
            } 
          
        </div>
      </header>
    </div>
  );
};

export default Navbar;
