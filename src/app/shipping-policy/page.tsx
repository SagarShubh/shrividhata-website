import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy | ShriVidhata Security Solutions",
    description: "Information about our shipping methods, costs, and delivery times for security products.",
};

export default function ShippingPolicy() {
    const companyName = "Shri Vidhata Creations Services (OPC) Pvt. Ltd.";

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">SHIPPING POLICY</h1>
            <p className="text-sm text-zinc-500 mb-8">LAST REVISION: 05-05-2024</p>

            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p className="font-semibold">
                    PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Overview</h2>
                <p>
                    This Shipping Policy outlines our practices regarding the shipment of products and services purchased through our website. By placing an order, you agree to the terms set forth in this policy.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Shipping Methods</h2>
                <p>We offer various shipping methods to meet the needs of our clients. Shipping options may include:</p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Standard Shipping</li>
                    <li>Expedited Shipping</li>
                    <li>Freight Shipping (for bulk orders)</li>
                </ol>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Shipping Costs</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Shipping costs are calculated based on the weight, dimensions, and destination of your order.</li>
                    <li>Clients will see the shipping fees during the checkout process before finalizing their order.</li>
                </ol>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Processing Time</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Orders are processed within 2-3 business days after receipt of payment.</li>
                    <li>Custom or large orders may require additional processing time, which will be communicated during the order confirmation.</li>
                </ol>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Delivery Times</h2>
                <p>Estimated delivery times vary based on shipping method and destination. Typical delivery times are:</p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Standard Shipping: 5-7 business days</li>
                    <li>Expedited Shipping: 2-3 business days</li>
                    <li>Freight Shipping: 7-14 business days</li>
                </ol>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Tracking Orders</h2>
                <p>
                    Once your order has shipped, you will receive a confirmation email with tracking information to monitor the shipment&apos;s progress.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Damaged or Lost Shipments</h2>
                <p>
                    If your shipment is damaged or lost, please contact us within 7 days of the delivery date. We will work with the carrier to resolve the issue promptly.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Contact Information</h2>
                <p>For any questions regarding our Shipping Policy, please contact us at:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email: contacts@shrividhta.com</li>
                    <li>Phone: +91 89890 00247</li>
                </ul>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">Policy Changes</h2>
                <p>
                    We reserve the right to update this policy at any time. Any changes will be communicated to our clients via email or through our website.
                </p>

                <p className="mt-8 font-medium">
                    By placing an order with {companyName}, you agree to the terms of this Shipping Policy.
                </p>
            </div>
        </div>
    );
}
