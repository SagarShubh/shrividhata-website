import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy | ShriVidhata",
    description: "Read our refund and cancellation policy. We offer a 7-day return policy for eligible products.",
    robots: {
        index: false, // Usually policy pages are fine to index, but sometimes preferred to keep low priority
        follow: true,
    }
};

export default function RefundPolicy() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">REFUND & CANCELLATION POLICY</h1>
            <p className="text-sm text-zinc-500 mb-8">LAST REVISION : 07-04-2024</p>

            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>
                    Thank you for shopping with Shri Vidhata Creations Services (OPC) Pvt. Ltd. We are committed to providing high-quality products and ensuring customer satisfaction. Please take a moment to review our Refund and Cancellation Policy.
                </p>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">1. General Refund and Return Policy</h2>
                <p>
                    We understand that sometimes products do not meet your expectations. As a result, we offer a 7-day return policy from the date of the original purchase, under the following conditions:
                </p>

                <h3 className="font-semibold mt-4">Eligibility for Returns</h3>
                <p>To qualify for a return, the following conditions must be met:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Return Window:</strong> The product must be returned within 7 days of the original purchase date.</li>
                    <li><strong>Product Condition:</strong> The product must be in its original, sealed condition and packaging. Products that have been opened, used, or damaged may not be eligible for return.</li>
                    <li><strong>Proof of Purchase:</strong> You must provide proof of purchase (such as an invoice, order confirmation, or receipt) to initiate a return.</li>
                </ul>

                <h3 className="font-semibold mt-4">Return Process</h3>
                <p>If the above conditions are met, please follow these steps to return your product:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Send the Product:</strong> Return the product to the address mentioned in your purchase invoice. Ensure the product is securely packaged to avoid damage during shipping.</li>
                    <li><strong>Inspection:</strong> Once we receive the returned product, we will inspect it to ensure that it meets our return criteria (sealed condition, undamaged, and unused).</li>
                    <li><strong>Credit Note:</strong> If the product passes inspection, we will issue a Sales Return Credit Note, which can be used towards future purchases with Shri Vidhata Creations Services (OPC) Pvt. Ltd.</li>
                </ul>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">2. Non-Returnable Items</h2>
                <p>
                    Some products are specially ordered, customized, or tailored to meet specific customer needs. These products are not eligible for return or refund under any circumstances.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Special Orders:</strong> Any products that have been specifically ordered, customized, or made-to-order for the customer cannot be returned.</li>
                    <li><strong>Exclusions:</strong> Please verify the return status of each item before purchasing to ensure it falls within the returnable category.</li>
                </ul>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">3. Cancellation Policy</h2>
                <p>
                    Once an order is placed and confirmed, cancellations are accepted under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cancellation Window:</strong> Cancellations are only accepted before the product is shipped.</li>
                    <li><strong>How to Cancel:</strong> To cancel your order, please contact our Customer Support team immediately at contacts@shrividhta.com or +91 89890 00247. If the order has already been dispatched, we will not be able to process the cancellation.</li>
                </ul>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">4. Refund Process</h2>
                <p>
                    Once we approve a return, we will process a refund via a Sales Return Credit Note. Unfortunately, we do not offer direct cash refunds. You can use the credit note for future purchases on our website.
                </p>
                <p>
                    Refund timelines may vary depending on the payment method used, but please allow up to 14 business days for the credit to reflect in your account.
                </p>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">5. Shipping Costs</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Return Shipping Costs:</strong> You are responsible for all return shipping costs. These costs will not be reimbursed by Shri Vidhata Creations Services (OPC) Pvt. Ltd.</li>
                    <li><strong>Tracking and Insurance:</strong> We recommend using a trackable shipping method and purchasing insurance for your return. Shri Vidhata Creations Services (OPC) Pvt. Ltd. is not responsible for lost or damaged packages during the return shipping process.</li>
                    <li><strong>Original Shipping Fees:</strong> Shipping charges incurred at the time of the original purchase are non-refundable.</li>
                </ul>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">6. Damaged or Defective Products</h2>
                <p>
                    If you receive a damaged or defective product, please contact our Customer Support team within 48 hours of receiving the item. We will provide further instructions for the return or exchange process.
                </p>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">7. How to Contact Us</h2>
                <p>
                    If you have any questions or need assistance with the return, refund, or cancellation process, feel free to reach out to us:
                </p>
                <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <p><strong>Email:</strong> contacts@shrividhta.com</p>
                    <p><strong>Phone:</strong> +91 89890 00247</p>
                    <p><strong>Business Hours:</strong> Monday to Friday, 11:30 AM - 08:00 PM (Excluding Holidays)</p>
                    <p className="mt-2"><strong>Address:</strong> Shop No. 2, Near SBI Udawatganj, Mangalwariya, Narsinghgarh, Distt Rajgarh, M.P. 465669</p>
                </div>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">8. Modifications to This Policy</h2>
                <p>
                    Shri Vidhata Creations Services (OPC) Pvt. Ltd. reserves the right to modify or update this Refund and Cancellation Policy at any time. All changes will be reflected on this page with the updated date. Please review this policy periodically for any updates.
                </p>
                <p className="font-medium mt-4">
                    By placing an order with Shri Vidhata Creations Services (OPC) Pvt. Ltd., you agree to the terms of this Refund and Cancellation Policy.
                </p>
            </div>
        </div>
    );
}
