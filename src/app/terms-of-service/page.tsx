import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service | ShriVidhata Security Solutions",
    description: "Terms and conditions for using ShriVidhata website and services.",
};

export default function TermsOfService() {
    const companyName = "Shri Vidhata Creations Services (OPC) Pvt. Ltd.";
    const address = "Shop No. 2, Near SBI Udawatganj, Mangalwariya, Narsinghgarh, Distt Rajgarh, M.P. 465669";

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">TERMS OF SERVICE AGREEMENT</h1>
            <p className="text-sm text-zinc-500 mb-8">LAST REVISION: 05-05-2024</p>

            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p className="font-semibold">
                    PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.
                </p>

                <p>
                    These terms and conditions outline the rules and regulations for the use of the {companyName} website and mobile application. By accessing this application, we assume you accept these terms and conditions. Do not continue to use {companyName} services if you do not agree to take all of the terms and conditions stated on this page.
                </p>
                <p>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person logged on this application and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to {companyName}. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">1. PRODUCTS</h2>
                <p><strong>Terms of Offer.</strong> This Website/APP offers for sale certain products (the &quot;Products&quot;). By placing an order for Products through this Website, you agree to the terms set forth in this Agreement.</p>

                <p><strong>Customer Solicitation:</strong> Unless you notify our third party call center reps or direct {companyName} sales reps, while they are calling you, of your desire to opt out from further direct company communications and solicitations.</p>

                <p><strong>Opt Out Procedure:</strong> We provide 3 easy ways to opt out of from future solicitations.</p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>You may use the opt out link found in any email solicitation that you may receive.</li>
                    <li>You may also choose to opt out, via sending your email address to: contacts@shrividhta.com</li>
                    <li>You may send a written remove request to {address}.</li>
                </ol>

                <p><strong>Proprietary Rights.</strong> {companyName} has proprietary rights and trade secrets in the Products. You may not copy, reproduce, resell or redistribute any Product manufactured and/or distributed by {companyName}. {companyName} also has rights to all trademarks and trade dress and specific layouts of this webpage, including calls to action, text placement, images and other information.</p>

                <p><strong>Sales Tax.</strong> If you purchase any Products, you will be responsible for paying any applicable sales tax.</p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">LICENSE</h2>
                <p>
                    Unless otherwise stated, {companyName} and/or its licensors own the intellectual property rights for all material on {companyName}. All intellectual property rights are reserved. You may access this from {companyName} for your own personal use subjected to restrictions set in these terms and conditions. You must not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Republish material from {companyName}</li>
                    <li>Sell, rent, or sub-license material from {companyName}</li>
                    <li>Reproduce, duplicate or copy material from {companyName}</li>
                    <li>Redistribute content from {companyName}</li>
                </ul>
                <p>This Agreement shall begin on the date hereof.</p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">WEBSITE/APP</h2>
                <p><strong>Content; Intellectual Property; Third Party Links.</strong> In addition to making Products available, this Website also offers information and marketing materials. This Website also offers information, both directly and through indirect links to third-party websites. {companyName} does not always create the information offered on this Website; instead the information is often gathered from other sources. To the extent that {companyName} does create the content on this Website, such content is protected by intellectual property laws of the India, foreign nations, and international bodies. Unauthorized use of the material may violate copyright, trademark, and/or other laws. You acknowledge that your use of the content on this Website is for personal, noncommercial use. Any links to third-party websites are provided solely as a convenience to you. {companyName} does not endorse the contents on any such third-party websites. {companyName} is not responsible for the content of or any damage that may result from your access to or reliance on these third-party websites. If you link to third-party websites, you do so at your own risk.</p>

                <p><strong>Use of Website;</strong> {companyName} is not responsible for any damages resulting from use of this website by anyone. You will not use the Website for illegal purposes. You will (1) abide by all applicable local, state, national, and international laws and regulations in your use of the Website (including laws regarding intellectual property), (2) not interfere with or disrupt the use and enjoyment of the Website by other users, (3) not resell material on the Website, (4) not engage, directly or indirectly, in transmission of &quot;spam&quot;, chain letters, junk mail or any other type of unsolicited communication, and (5) not defame, harass, abuse, or disrupt other users of the Website</p>

                <p><strong>License.</strong> By using this Website, you are granted a limited, non-exclusive, non-transferable right to use the content and materials on the Website in connection with your normal, noncommercial, use of the Website. You may not copy, reproduce, transmit, distribute, or create derivative works of such content or information without express written authorization from {companyName} or the applicable third party (if third party content is at issue).</p>

                <p><strong>Posting.</strong> By posting, storing, or transmitting any content on the Website, you hereby grant {companyName} a perpetual, worldwide, non-exclusive, royalty-free, assignable, right and license to use, copy, display, perform, create derivative works from, distribute, have distributed, transmit and assign such content in any form, in all media now known or hereinafter created, anywhere in the world. {companyName} does not have the ability to control the nature of the user-generated content offered through the Website. You are solely responsible for your interactions with other users of the Website and any content you post. {companyName} is not liable for any damage or harm resulting from any posts by or interactions between users. {companyName} reserves the right, but has no obligation, to monitor interactions between and among users of the Website and to remove any content {companyName} deems objectionable, in {companyName} &apos;s sole discretion.</p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">DISCLAIMER OF WARRANTIES</h2>
                <p>
                    YOUR USE OF THIS WEBSITE AND/OR PRODUCTS ARE AT YOUR SOLE RISK. THE WEBSITE AND PRODUCTS ARE OFFERED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. {companyName} EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT WITH RESPECT TO THE PRODUCTS OR WEBSITE CONTENT, OR ANY RELIANCE UPON OR USE OF THE WEBSITE CONTENT OR PRODUCTS. (&quot;PRODUCTS&quot; INCLUDE TRIAL PRODUCTS.)
                </p>
                <p>WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, {companyName} MAKES NO WARRANTY:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>THAT THE INFORMATION PROVIDED ON THIS WEBSITE IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.</li>
                    <li>THAT THE LINKS TO THIRD-PARTY WEBSITES ARE TO INFORMATION THAT IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.</li>
                    <li>NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THIS WEBSITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.</li>
                    <li>AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE PRODUCTS OR THAT DEFECTS IN PRODUCTS WILL BE CORRECTED.</li>
                </ul >

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">LIMITATION OF LIABILITY</h2>
                <p>
                    {companyName} ENTIRE LIABILITY, AND YOUR EXCLUSIVE REMEDY, IN LAW, IN EQUITY, OR OTHWERWISE, WITH RESPECT TO THE WEBSITE CONTENT AND PRODUCTS AND/OR FOR ANY BREACH OF THIS AGREEMENT IS SOLELY LIMITED TO THE AMOUNT YOU PAID, LESS SHIPPING AND HANDLING, FOR PRODUCTS PURCHASED VIA THE WEBSITE.
                </p>
                <p>
                    {companyName} WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES IN CONNECTION WITH THIS AGREEMENT OR THE PRODUCTS IN ANY MANNER, INCLUDING LIABILITIES RESULTING FROM (1) THE USE OR THE INABILITY TO USE THE WEBSITE CONTENT OR PRODUCTS; (2) THE COST OF PROCURING SUBSTITUTE PRODUCTS OR CONTENT; (3) ANY PRODUCTS PURCHASED OR OBTAINED OR TRANSACTIONS ENTERED INTO THROUGH THE WEBSITE; OR (4) ANY LOST PROFITS YOU ALLEGE.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">INDEMNIFICATION</h2>
                <p>
                    You will release, indemnify, defend and hold harmless {companyName}, and any of its contractors, agents, employees, officers, directors, shareholders, affiliates and assigns from all liabilities, claims, damages, costs and expenses, including reasonable attorneys&apos; fees and expenses, of third parties relating to or arising out of (1) this Agreement or the breach of your warranties, representations and obligations under this Agreement; (2) the Website content or your use of the Website content; (3) the Products or your use of the Products (including Trial Products); (4) any intellectual property or other proprietary right of any person or entity; (5) your violation of any provision of this Agreement; or (6) any information or data you supplied to {companyName}.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">PRIVACY POLICY</h2>
                <p>
                    {companyName} believes strongly in protecting user privacy and providing you with notice of use of data. Please refer to {companyName} privacy policy, incorporated by reference herein, that is posted on the Website.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">AGREEMENT TO BE BOUND</h2>
                <p>
                    By using this Website or ordering Products, you acknowledge that you have read and agree to be bound by this Agreement and all terms and conditions on this Website.
                </p>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8">GENERAL</h2>
                <p><strong>Force Majeure.</strong> {companyName} will not be deemed in default hereunder or held responsible for any cessation, interruption or delay in the performance of its obligations hereunder due to earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor strike, lockout, or boycott.</p>

                <p><strong>Cessation of Operation.</strong> {companyName} may at any time, in its sole discretion and without advance notice to you, cease operation of the Website and distribution of the Products.</p>

                <p><strong>Entire Agreement.</strong> This Agreement comprises the entire agreement between you and {companyName} and supersedes any prior agreements pertaining to the subject matter contained herein.</p>

                <p><strong>Governing Law; Jurisdiction.</strong> This Website originates from Rajgarh, Madhya Pradesh. This Agreement will be governed by the laws of the State of Madhya Pradesh without regard to its conflict of law principles to the contrary. Neither you nor {companyName} will commence or prosecute any suit, proceeding or claim to enforce the provisions of this Agreement, to recover damages for breach of or default of this Agreement, or otherwise arising under or by reason of this Agreement, other than in courts located in State of Madhya Pradesh.</p>

                <p><strong>Statute of Limitation.</strong> You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website or Products or this Agreement must be filed within one (1) year after such claim or cause of action arose or be forever barred.</p>

                <p className="mt-8 font-bold text-center">
                    Our Integrated Security Features Safeguard Your Business Against Theft, So You Rest Easily With Peace Of Mind <br /> Call : +91 89890 00247 For Projects
                </p>
            </div>
        </div>
    );
}
