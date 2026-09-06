import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './userCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);

  console.log("Redux feed:", feed);

  const getFeed = async () => {
    if (feed.length > 0) return;

    const response = await axios.get(
      `${BASE_URL}/feed`,
      { withCredentials: true }
    );

    console.log("Feed response:", response.data);

    dispatch(addFeed(response.data.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;