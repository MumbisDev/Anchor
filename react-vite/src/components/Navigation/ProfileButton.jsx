import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <div ref={buttonRef} className="profile-button-container">
      <button className={`profile-button ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="user-icon"
        >
          <path 
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="user-info">
            <div className="user-avatar">
              <svg 
                width="50" 
                height="50" 
                viewBox="0 0 50 50" 
                fill="none" 
                stroke="currentColor"
                className="user-icon-large"
              >
                <path 
                  d="M25 25c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0 4c-5.34 0-16 2.68-16 8v4h32v-4c0-5.32-10.66-8-16-8z" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="user-details">
              <div className="user-name">{user.username}</div>
              <div className="user-handle">@{user.username.toLowerCase()}</div>
            </div>
          </div>
          <div className="menu-divider"></div>
          <button className="menu-item">
            Profile
          </button>
          <div className="menu-divider"></div>
          <button className="menu-item" onClick={logout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;