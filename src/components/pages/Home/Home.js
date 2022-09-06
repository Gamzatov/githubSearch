import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../ui/User";
import Cache from "../Cache/Cache";
import SearchRepos from "../../SearcRepos/SearchRepos";



const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [users, setUsers] = useState([]);
  //Search query caching
  const [cache, setCache] = useState(null);


  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/search/users?q=${query}`, {
      })
      console.log('cach>>>', cache)
      setCache(data.items)
      return data.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
console.log('users>>>', users)
  const handleQueryInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your query is empty...");
    }
  };
  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }

    };
    displayUsersOnChange();
  }, [query]);
  console.log('users>>>', users)
  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub Searcher</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type="text" placeholder="Search for Users" />
        </form>
      </div>
      <div className="search-results">
        {users ? (
          users.map((user) => {
            return (
                <User user={user} repo={users} key={user.id} />

            );
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
      <Cache cache={cache} />
    </div>
  );
};

export default Home;
