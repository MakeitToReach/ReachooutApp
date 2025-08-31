"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import { Loading } from "@/components/editor-components/loading";

const PaymentSuccessPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const orderId = searchParams?.get("order_id");

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            if (orderId) {
                try {
                    // Payment was successful, redirect to user dashboard
                    // You can add additional verification logic here if needed
                    setTimeout(() => {
                        router.push("/user");
                    }, 2000);
                } catch (error) {
                    console.error("Error handling payment success:", error);
                    router.push("/user");
                }
            } else {
                // No order ID found, redirect to home
                router.push("/");
            }
        };

        handlePaymentSuccess();
    }, [orderId, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="mb-4">
                    <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                </h2>
                <p className="text-gray-600 mb-4">
                    Your payment has been processed successfully.
                </p>
                {orderId && (
                    <p className="text-sm text-gray-500 mb-4">
                        Order ID: {orderId}
                    </p>
                )}
                <p className="text-sm text-gray-500">Redirecting you to your dashboard...</p>
            </div>
        </div>
    );
};

const PaymentSuccessPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PaymentSuccessPageContent />
        </Suspense>
    );
};

export default PaymentSuccessPage;
