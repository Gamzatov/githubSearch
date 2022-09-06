import React, { useState, useEffect } from "react";
import "./User.css";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import Repo from "../../ui/Repo";
import SearchRepos from "../../SearcRepos/SearchRepos";
const User = ({repo}) => {
  const { login } = useParams();

  //UserInformation
  const [userInfo, setUserInfo] = useState({});
  //User repos
  const [repos, setRepos] = useState([]);
  console.log('user>>>', user)
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, []);
  
  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-information">

        <div className="image">
          <a href={userInfo?.html_url}>
            <img src={userInfo?.avatar_url} alt='avatar' />
          </a>
        </div>
        <div className="user-content">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.bio}</p>
          <div className="more-data">
            <p>
              <img src={user} alt="" />
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <img src={location} alt="" />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <img src={site} alt="" />
                {userInfo?.blog}
              </p>
            )}
            <p>
              <img src={github} alt="" />
              <a href={userInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="user-repos">
      <SearchRepos  repo={repos} />
        {repos ? (
          repos.map((repo) => {
            return (
              <div className="repo_info" key={repo.id}>
                <Repo repo={repo} forks={repo.forks} stars={repo.stargazers_count} />
                
              </div>
            )
          })
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
     
    </div>
  );
};

export default User;
