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
        <section className="app-page enter-soft">

            {/* Header */}
            <div className="app-container mb-8 text-center">

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

                <h1 className="page-title">
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
                <div className="app-container mb-6 flex justify-center">

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

                <div className="app-container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

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
                <div className="surface-panel mx-auto flex max-w-md flex-col items-center p-8 text-center sm:p-10">
                    <div className="mb-5 grid size-16 place-items-center rounded-2xl bg-secondary/15 text-3xl text-secondary-content" aria-hidden="true">
                        💬
                    </div>
                    <h2 className="text-xl font-bold">Your connections</h2>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                        Developers you connect with will appear here.
                    </p>
                </div>

            )}

        </section>
    );
};

export default Connection;