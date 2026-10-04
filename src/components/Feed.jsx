import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { createPortal } from 'react-dom';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardDirection, setCardDirection] = useState('next');
  const [showInterestedToast, setShowInterestedToast] = useState(false);
  const toastTimeout = useRef(null);

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

  useEffect(() => () => window.clearTimeout(toastTimeout.current), []);

  const selectedIndex = feed.length ? currentIndex % feed.length : 0;

  const showPrevious = () => {
    if (feed.length < 2) return;
    setCardDirection('previous');
    setCurrentIndex(index => (index - 1 + feed.length) % feed.length);
  };

  const showNext = () => {
    if (feed.length < 2) return;
    setCardDirection('next');
    setCurrentIndex(index => (index + 1) % feed.length);
  };

  const handleInterested = () => {
    window.clearTimeout(toastTimeout.current);
    setShowInterestedToast(true);
    toastTimeout.current = window.setTimeout(() => setShowInterestedToast(false), 3000);
  };

  const navigationButtonClass = 'btn btn-circle btn-outline size-11 shrink-0 border-base-300 bg-base-100/90 text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-base-100 disabled:opacity-40 sm:size-12';

 

  return (
    <section className="app-page enter-soft">
      <div className="app-container flex flex-col items-center">
        {feed?.length > 0 ? (
          <div className="flex w-full max-w-2xl flex-col items-center gap-4">
            <div className="flex w-full items-center justify-center gap-5">
              <button
                type="button"
                className={`${navigationButtonClass} hidden sm:inline-flex`}
                onClick={showPrevious}
                disabled={feed.length < 2}
                aria-label="Previous profile"
                title="Previous profile"
              >
                <span aria-hidden="true" className="text-2xl leading-none">&#8249;</span>
              </button>
              <div
                key={feed[selectedIndex]._id}
                className={`min-w-0 w-full max-w-md ${cardDirection === 'previous' ? 'card-enter-previous' : 'card-enter-next'}`}
              >
                <UserCard user={feed[selectedIndex]} onInterested={handleInterested} />
              </div>
              <button
                type="button"
                className={`${navigationButtonClass} hidden sm:inline-flex`}
                onClick={showNext}
                disabled={feed.length < 2}
                aria-label="Next profile"
                title="Next profile"
              >
                <span aria-hidden="true" className="text-2xl leading-none">&#8250;</span>
              </button>
            </div>
            <div className="flex gap-4 sm:hidden">
              <button
                type="button"
                className={navigationButtonClass}
                onClick={showPrevious}
                disabled={feed.length < 2}
                aria-label="Previous profile"
                title="Previous profile"
              >
                <span aria-hidden="true" className="text-2xl leading-none">&#8249;</span>
              </button>
              <button
                type="button"
                className={navigationButtonClass}
                onClick={showNext}
                disabled={feed.length < 2}
                aria-label="Next profile"
                title="Next profile"
              >
                <span aria-hidden="true" className="text-2xl leading-none">&#8250;</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="surface-panel w-full max-w-md p-8 text-center sm:p-10">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-secondary/15 text-2xl text-secondary-content">
              <span aria-hidden="true">✦</span>
            </div>
            <h1 className="page-title">Your next connection starts here</h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/65">
              New developer profiles will appear here when available.
            </p>
          </div>
        )}
      </div>
      {showInterestedToast && createPortal(
        <div className="toast toast-top toast-center z-[9999] card-toast-enter" role="status" aria-live="polite">
          <div className="alert alert-success border border-success/20 bg-base-100 text-base-content shadow-xl">
            <span>Interest sent successfully.</span>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Feed;