import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Payment = () => {
    const [processingPlan, setProcessingPlan] = useState('');
    const [error, setError] = useState('');

    const handlePayment = async (plan) => {
        setProcessingPlan(plan);
        setError('');

        try {
            const response = await axios.post(
                `${BASE_URL}/payment/create-order`,
                { plan },
                { withCredentials: true }
            );

            const { amount, currency, id: order_id, keyId } = response.data;
            console.log(response.data);

            if (!window.Razorpay) {
                throw new Error('Checkout is unavailable. Please refresh and try again.');
            }

            const razorPay = new window.Razorpay({
                key: keyId,
                amount,
                currency,
                order_id,
            });
            razorPay.open();
        } catch (paymentError) {
            setError(
                paymentError.response?.data?.message ||
                paymentError.message ||
                'Unable to start checkout. Please try again.'
            );
        } finally {
            setProcessingPlan('');
        }
    };

    const plans = [
        {
            id: 'silver',
            name: 'Silver',
            description: 'A simple way to support your developer network.',
            tone: 'border-base-300/70 bg-base-100',
        },
        {
            id: 'gold',
            name: 'Gold',
            description: 'An elevated membership for your next step.',
            tone: 'border-primary/30 bg-primary/[0.04]',
        },
    ];

    return (
        <section className="app-page enter-soft">
            <div className="app-container">
                <header className="mx-auto mb-8 max-w-xl text-center">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">DevTinder membership</p>
                    <h1 className="page-title">Choose your plan</h1>
                    <p className="mt-3 text-sm leading-relaxed text-base-content/65 sm:text-base">
                        Select a membership to continue to secure checkout.
                    </p>
                </header>

                {error && (
                    <div className="alert alert-error mx-auto mb-6 max-w-2xl" role="alert">
                        <span>{error}</span>
                    </div>
                )}

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {plans.map((plan) => {
                        const isProcessing = processingPlan === plan.id;

                        return (
                            <article
                                key={plan.id}
                                className={`surface-panel flex min-h-64 flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7 ${plan.tone}`}
                            >
                                <div className="mb-6 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Membership</p>
                                        <h2 className="mt-2 text-2xl font-extrabold">{plan.name}</h2>
                                    </div>
                                    <span className={`badge ${plan.id === 'gold' ? 'badge-primary' : 'badge-outline'} mt-1`}>
                                        {plan.id === 'gold' ? 'Gold' : 'Essential'}
                                    </span>
                                </div>

                                <p className="flex-1 text-sm leading-relaxed text-base-content/65">
                                    {plan.description}
                                </p>

                                <button
                                    type="button"
                                    className={`btn mt-7 w-full rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${plan.id === 'gold' ? 'btn-primary' : 'btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content'}`}
                                    onClick={() => handlePayment(plan.id)}
                                    disabled={Boolean(processingPlan)}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
                                            Opening checkout...
                                        </>
                                    ) : (
                                        `Continue with ${plan.name}`
                                    )}
                                </button>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Payment