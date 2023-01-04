import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigations.styles.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  }
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          { 
            currentUser ? 
              (
                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
              ) : (
                <Link className="nav-link" to='/auth'>
                  SIGN IN
                </Link>
              )}
          <CartIcon />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation
