const { Route, Redirect } = require("react-router-dom")


export const PrivateRoute = ({ component: Component, id, ...rest }) => {
    console.log("come to privagte route",id)
    return (
        <Route render={(props) => 
            (id)
            ? <Component {...props} id={id} {...rest} />
            : <Redirect to='/login' />
        } />
    );
}

