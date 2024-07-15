import Signup from "../components/Signup";
import Login from "../components/Login";
import Home from "../components/Home";
import ProductList from "../pages/ProductList";
import ProductListAdmin from "../pages/ProductListAdmin";
import EditProductForm from "../pages/EditProductForm";
import AddProduct from "../pages/AddProduct";
import DeleteProduct from "../pages/DeleteProduct";

const routes =[
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: "/list",
        element: <ProductList/>
    },
    {
        path: "admin/list",
        element: <ProductListAdmin/>
    },
    {
        path: "admin/edit/:id",
        element: <EditProductForm/>
    },
    {
        path: "admin/add",
        element: <AddProduct/>
    },
    {
        path: "admin/delete/:id",
        element: <DeleteProduct/>
    }
];

export default routes