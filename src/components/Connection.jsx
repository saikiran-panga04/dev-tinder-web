import React from 'react'
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';
import UserConnection from './UserConnection';

export const Connection = () => {
     const dispatch = useDispatch();
     const connections = useSelector(state => state.connection);
     console.log(connections);
    const getConnections = async () => {
        const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
        dispatch(addConnection(response.data?.data));
    
    }
    React.useEffect(() => {
        getConnections();
    }, []);
    return connections?.length > 0 && (
        <>
        <h2 className="text-2xl font-bold text-center my-4">Connections</h2>
        <div className="flex flex-col items-center space-y-4">
           
            {connections.map((connection, index) => (
                <UserConnection key={index} connections={connection} />
            ))}
        </div>
        </>
    )
}

