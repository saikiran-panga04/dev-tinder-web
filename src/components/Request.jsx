import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addRequest } from '../utils/requestSlice';
import RequestUser from './RequestUser';

const Requests = () => {

    const [toast,setToast]= useState(false);

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

    return requests.length > 0 && (
        <div>
            {requests.map((request, index) => (
                <RequestUser key={index} requestId={request._id}
                    userData={request.fromUserId} />
            ))}
        </div>
    );
}

export default Requests