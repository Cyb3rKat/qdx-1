import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>INFO</h1>
    <p>this is just a simple info: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <h1>this is a adming warning</h1>}
      <WrappedComponent {...props}></WrappedComponent>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuth ? (
        <WrappedComponent></WrappedComponent>
      ) : (
        <p>please login to view</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AdminInfo isAdmin={false} isAuth={true} info="hello" />,
  document.getElementById("app")
);
