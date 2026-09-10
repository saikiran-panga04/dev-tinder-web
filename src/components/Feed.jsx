import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);

  useEffect(() => {
    if (feed.length > 0) return;

    const getFeed = async () => {
      const response = await axios.get(
        `${BASE_URL}/feed`,
        { withCredentials: true }
      );

      dispatch(addFeed(response.data.data));
    };

    getFeed();
  }, [dispatch, feed.length]);

 

  return feed && feed.length > 0 && (
    <div className="flex justify-center my-4">
    
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;