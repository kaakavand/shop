import { PATHS } from "config/routs.config";
import Cart from "pages/cart.page/Cart";
import Inventory from "pages/inventory.page/Inventory";
import Final from "pages/finalBuy.page/Final";
import Home from "pages/home.page/Home";
import Login from "pages/login.page/Login";
import Orders from "pages/orders.page/Orders";
import ProductManag from "pages/product.management.page/ProductManag";
import Product from "pages/product.page/Product";
import Products from "pages/products.page/Products";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute/Private";
import { ProtectedRoute } from "./ProtectedRoute/Protected";
import { PublicRoute } from "./PublicRoute/PublicRoute";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
export const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={PATHS.CART}
                    element={<PublicRoute component={<Cart />} />}
                />
                <Route
                    path={PATHS.HOME}
                    element={<PublicRoute component={<Home />} />}
                />
                <Route
                    path={'/:category/:id'}
                    element={<PublicRoute component={<Product />} />}
                />
                <Route
                    path={PATHS.FINAL_BUY}
                    element={<PublicRoute component={<Final />} />}
                />
                <Route
                    path={PATHS.LOGIN}
                    element={<ProtectedRoute component={<Login />} />}
                />
                <Route
                    path={PATHS.PRODUCTS_MANAGE}
                    element={<PrivateRoute component={<ProductManag />} />}
                />
                <Route
                    path={PATHS.ORDERS}
                    element={<PrivateRoute component={<Orders />} />}
                />
                <Route
                    path={PATHS.INVENTORY}
                    element={<PrivateRoute component={<Inventory />} />}
                />
                <Route
                    path={'/:category'}
                    element={<PublicRoute component={<Products />} />}
                />
            </Routes>
        </BrowserRouter>
    );
};
