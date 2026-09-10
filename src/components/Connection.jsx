import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';
import UserConnection from './UserConnection';

export const Connection = () => {

    const dispatch = useDispatch();

    const connections = useSelector(
        (state) => state.connection
    );

    const getConnections = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                {
                    withCredentials: true
                }
            );

            dispatch(
                addConnection(response.data?.data || [])
            );

        } catch (error) {

            console.error(
                'Failed to fetch connections:',
                error
            );

        }
    };

    React.useEffect(() => {
        getConnections();
    }, []);

    return (
        <div className="
            min-h-[calc(100vh-64px)]
            bg-base-200
            px-4
            py-8
        ">

            {/* Header */}
            <div className="
                mx-auto
                mb-8
                max-w-5xl
                text-center
            ">

                <div className="
                    mx-auto
                    mb-3
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary
                    text-2xl
                    shadow-lg
                ">
                    🤝
                </div>

                <h1 className="
                    text-3xl
                    font-extrabold
                    tracking-tight
                ">
                    Your Connections
                </h1>

                <p className="
                    mt-2
                    text-base-content/60
                ">
                    Developers you've connected with
                </p>

            </div>


            {/* Connection count */}
            {connections?.length > 0 && (
                <div className="
                    mx-auto
                    mb-6
                    flex
                    max-w-5xl
                    justify-center
                ">

                    <div className="
                        badge
                        badge-primary
                        badge-lg
                        px-5
                        py-4
                    ">
                        {connections.length}{' '}
                        {connections.length === 1
                            ? 'Connection'
                            : 'Connections'}
                    </div>

                </div>
            )}


            {/* Connections */}
            {connections?.length > 0 ? (

                <div className="
                    mx-auto
                    grid
                    max-w-5xl
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                ">

                    {connections.map((connection, index) => (

                        <div
                            key={connection?._id || index}
                            className="
                                transition-all
                                duration-300
                                hover:-translate-y-1
                            "
                        >
                            <UserConnection
                                connections={connection}
                            />
                        </div>

                    ))}

                </div>

            ) : (

                /* Empty State */
                <div className="
                    mx-auto
                    flex
                    max-w-md
                    flex-col
                    items-center
                    rounded-3xl
                    border
                    border-base-300
                    bg-base-100
                    p-10
                    text-center
                    shadow-xl
                ">

                    <div className="
                        mb-5
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-base-200
                        text-4xl
                    ">
                        💬
                    </div>

                    <h2 className="
                        text-xl
                        font-bold
                    ">
                        No connections yet
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        leading-relaxed
                        text-base-content/60
                    ">
                        Start exploring developers and send
                        connection requests to build your network.
                    </p>

                </div>

            )}

        </div>
    );
};

export default Connection;