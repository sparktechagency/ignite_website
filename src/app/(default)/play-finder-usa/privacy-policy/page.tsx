import React from 'react'

function page() {
    return (
        <div className='container mx-auto'>
            <div dangerouslySetInnerHTML={{
                __html: `
            <h1>Privacy Policy</h1>
<p>Last updated: 23-Dec-2025</p>
 
<p>
This Privacy Policy explains how we collect, use, disclose, and protect your information
when you use our mobile application and related services (the “App”).
By using the App, you agree to the collection and use of information in accordance with this policy.
</p>
 
<h2>1. Roles Covered by This Policy</h2>
<p>The App supports two types of accounts:</p>
<ul>
<li><strong>Users</strong> – individuals who browse and discover youth sports events</li>
<li><strong>Organizers</strong> – individuals or businesses that publish and manage events</li>
</ul>
 
<h2>2. Information We Collect</h2>
 
<h3>2.1 Information You Provide</h3>
 
<p><strong>For Users:</strong></p>
<ul>
<li>Email address</li>
<li>Password (stored securely in encrypted form)</li>
<li>Phone number</li>
<li>Profile image</li>
<li>Basic profile information you choose to provide</li>
</ul>
 
<p><strong>For Organizers:</strong></p>
<ul>
<li>Business or organization name</li>
<li>Email address</li>
<li>Password (stored securely in encrypted form)</li>
<li>Phone number</li>
<li>Business or organization image/logo</li>
<li>Additional business-related information you choose to provide</li>
</ul>
 
<p><strong>Event Information (Organizers):</strong></p>
<ul>
<li>Event name and description</li>
<li>Event date and time</li>
<li>Location or venue details</li>
<li>Age group and skill level</li>
<li>External registration link</li>
<li>Any other information required to publish the event</li>
</ul>
 
<h3>2.2 Subscription Information</h3>
<p>
Users may purchase a one-year subscription through the app stores.
We do not collect or store payment card details.
Subscription payments are processed directly by Google Play or Apple App Store.
</p>
 
<h3>2.3 Automatically Collected Information</h3>
<ul>
<li>Device information (such as device type and operating system)</li>
<li>App usage data (screens viewed, basic interactions)</li>
<li>Log and diagnostic information for app performance and stability</li>
</ul>
 
<h2>3. How We Use Information</h2>
<p>We use the collected information to:</p>
<ul>
<li>Create and manage user and organizer accounts</li>
<li>Display event listings and related content</li>
<li>Provide access to subscription-based features</li>
<li>Communicate important service-related messages</li>
<li>Maintain app security and prevent misuse</li>
<li>Improve app functionality and user experience</li>
</ul>
 
<h2>4. Event Registration and External Links</h2>
<p>
The App provides links to external websites or platforms operated by event organizers.
All event registrations and payments are completed outside the App.
We are not responsible for the privacy practices or content of third-party websites.
</p>
 
<h2>5. Data Sharing and Disclosure</h2>
<p>We do not sell personal data.</p>
<p>We may share information only:</p>
<ul>
<li>With service providers who assist in app operations (under confidentiality obligations)</li>
<li>To comply with legal obligations or lawful requests</li>
<li>To protect the rights, safety, or security of users and the platform</li>
</ul>
 
<h2>6. Data Retention</h2>
<p>
We retain personal information only for as long as necessary to provide the App’s services
or as required by law.
You may request account deletion at any time.
</p>
 
<h2>7. Data Security</h2>
<p>
We implement reasonable technical and organizational measures to protect personal data,
including secure authentication and encrypted data storage.
However, no method of transmission or storage is completely secure.
</p>
 
<h2>8. Children’s Privacy</h2>
<p>
The App is intended for use by adults.
We do not knowingly collect personal information from children.
If you believe a child has provided personal data, please contact us so we can take appropriate action.
</p>
 
<h2>9. Your Rights</h2>
<p>Depending on your location, you may have the right to:</p>
<ul>
<li>Access the personal data we hold about you</li>
<li>Request correction or deletion of your data</li>
<li>Withdraw consent where applicable</li>
</ul>
 
<h2>10. Changes to This Privacy Policy</h2>
<p>
We may update this Privacy Policy from time to time.
Any changes will be posted within the App or on our website.
Continued use of the App indicates acceptance of the updated policy.
</p>
 
<h2>11. Contact Us</h2>
<p>
If you have any questions about this Privacy Policy or data practices, please contact us at:
</p>
<p>
<strong>Email:</strong> acn.marshall@gmail.com<br />
<strong>Website:</strong> https://www.playfinderusa.com
</p>
            ` }} />
        </div>
    )
}

export default page