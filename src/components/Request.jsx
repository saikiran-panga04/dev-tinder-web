import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addRequest } from '../utils/requestSlice';
import RequestUser from './RequestUser';

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests);
    useEffect(() => {
        const getRequests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
                const receivedRequests = response.data?.data;
                dispatch(addRequest(receivedRequests));
            } catch (err) {
                console.error(err);
            }
        };

        getRequests();
    }, [dispatch])

    useEffect(() => {

    }, [requests]);

    return (
        <section className="app-page enter-soft">
            <div className="app-container">
                <header className="mb-8 text-center">
                    <h1 className="page-title">Connection requests</h1>
                    <p className="mt-2 text-sm text-base-content/60">Meet developers who would like to connect.</p>
                </header>
                {requests.length > 0 ? (
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4">
                        {requests.map((request, index) => (
                            <RequestUser
                                key={index}
                                requestId={request._id}
                                userData={request.fromUserId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="surface-panel mx-auto max-w-md p-8 text-center">
                        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary" aria-hidden="true">*</div>
                        <h2 className="text-lg font-bold">Incoming requests</h2>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/60">Connection requests from other developers appear here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Requests