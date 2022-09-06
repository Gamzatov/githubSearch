import React from "react";
import { Link } from "react-router-dom";
const User = ({ user }) => {
  const { avatar_url, login, id } = user;
  console.log("user>>>", user)
  return (
    <div className="user">
      <div className="user_main_info">
        <div className="image">
          <Link to={`/user/${login}`}>
            <img src={user.avatar_url} alt={login} />
          </Link>
        </div>
        <div className="user-info">
          <h3>{user.login}</h3>
          <small>{user.id}</small>

        </div>
      </div>
      <div className="repos">
        <p>
          Repo: {user.repos_url.length}
        </p>
      </div>
    </div>
  );
};

export default User;
