import React from "react"
import {Route, Switch} from "react-router-dom"
import {HomePage, NotfoundPage} from "./pages"
import ProtectedRouter from "./routers/protected.router"
import GuestRouter from "./routers/guest.router"
import Navbar from "./pages/nav.bar"
import LoginPage from "./pages/login.page"
import CarsPage from "./pages/cars.page";

const Routes: React.FC = () => (
    <div>
        <Switch>
            <ProtectedRouter path="/" exact>
                <Navbar>
                    <HomePage/>
                </Navbar>
            </ProtectedRouter>
            <ProtectedRouter path="/cars" exact>
                <Navbar>
                    <CarsPage/>
                </Navbar>
            </ProtectedRouter>
            <GuestRouter exact path="/login">
                <LoginPage/>
            </GuestRouter>
            <Route exact path="/notfound">
                <Navbar>
                    <NotfoundPage/>
                </Navbar>
            </Route>
        </Switch>
    </div>
)

export default Routes