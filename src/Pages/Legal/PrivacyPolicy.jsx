import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="w-11/12 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield className="w-20 h-20 mx-auto mb-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last Updated: January 8, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="w-11/12 max-w-4xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            <h2>1. Introduction</h2>
            <p>
              VitalFlow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blood donation platform and services.
            </p>
            <p>
              By using VitalFlow, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>

            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, date of birth, gender</li>
              <li><strong>Donor Profile:</strong> Blood type, weight, health conditions, donation history</li>
              <li><strong>Location Data:</strong> Address, district, upazila for matching donors with recipients</li>
              <li><strong>Emergency Contact:</strong> Contact person details for safety purposes</li>
              <li><strong>Photos:</strong> Profile picture (optional)</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <ul>
              <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
              <li><strong>Cookies:</strong> See our Cookie Policy for details</li>
              <li><strong>Location Data:</strong> Approximate location based on IP address</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            
            <h3>3.1 Primary Uses</h3>
            <ul>
              <li><strong>Donor-Recipient Matching:</strong> Connect blood donors with those in need</li>
              <li><strong>Communication:</strong> Send donation requests, updates, and notifications</li>
              <li><strong>Account Management:</strong> Create and manage your user account</li>
              <li><strong>Safety & Verification:</strong> Verify identities and ensure platform safety</li>
              <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance our platform</li>
            </ul>

            <h3>3.2 Communication Purposes</h3>
            <p>We may use your contact information to send you:</p>
            <ul>
              <li>Blood donation requests matching your blood type and location</li>
              <li>Confirmation emails and appointment reminders</li>
              <li>Platform updates and new features</li>
              <li>Health tips and donation guidelines</li>
              <li>Emergency blood alerts in your area</li>
              <li>Marketing communications (with your consent)</li>
            </ul>

            <h2>4. Information Sharing and Disclosure</h2>
            
            <h3>4.1 With Other Users</h3>
            <p>When you register as a donor, certain information becomes visible to verified users:</p>
            <ul>
              <li>Name, blood type, location</li>
              <li>Availability status</li>
              <li>Contact information (only when you accept a donation request)</li>
            </ul>

            <h3>4.2 With Partner Organizations</h3>
            <ul>
              <li><strong>Hospitals & Blood Banks:</strong> Basic donor information for verification</li>
              <li><strong>Healthcare Providers:</strong> Relevant medical information with your consent</li>
              <li><strong>Emergency Services:</strong> In critical situations requiring immediate blood</li>
            </ul>

            <h3>4.3 Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to:</p>
            <ul>
              <li>Legal processes (subpoenas, court orders)</li>
              <li>Government requests</li>
              <li>Protection of our rights and safety</li>
              <li>Investigation of fraud or security issues</li>
            </ul>

            <h3>4.4 We Do NOT Sell Your Data</h3>
            <p className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
              <strong>Important:</strong> We NEVER sell your personal information to third parties for marketing purposes.
            </p>

            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul>
              <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
              <li><strong>Secure Storage:</strong> Encrypted databases with access controls</li>
              <li><strong>Authentication:</strong> Secure login with password hashing</li>
              <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
              <li><strong>Staff Training:</strong> Employees trained on data protection</li>
              <li><strong>Limited Access:</strong> Only authorized personnel can access your data</li>
            </ul>

            <h2>6. Your Rights and Choices</h2>
            
            <h3>6.1 Access and Control</h3>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> View all personal data we hold about you</li>
              <li><strong>Update:</strong> Correct inaccurate information in your profile</li>
              <li><strong>Delete:</strong> Request account deletion and data removal</li>
              <li><strong>Export:</strong> Download your data in portable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from non-essential communications</li>
            </ul>

            <h3>6.2 Privacy Controls</h3>
            <ul>
              <li>Control who can see your profile</li>
              <li>Manage notification preferences</li>
              <li>Set availability status</li>
              <li>Block specific users</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>We retain your information for as long as necessary to:</p>
            <ul>
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain donation history for health and safety records</li>
            </ul>
            <p>After account deletion, we may retain certain information for:</p>
            <ul>
              <li>Legal compliance (7 years)</li>
              <li>Fraud prevention</li>
              <li>Anonymized analytics</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              VitalFlow is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we discover that a child has provided us with personal information, we will delete it immediately.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than Bangladesh. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>

            <h2>10. Third-Party Services</h2>
            <p>We use trusted third-party services for:</p>
            <ul>
              <li><strong>Firebase:</strong> Authentication and real-time database</li>
              <li><strong>Google Maps:</strong> Location services</li>
              <li><strong>Email Services:</strong> Transactional and notification emails</li>
              <li><strong>Analytics:</strong> Platform usage insights (anonymized)</li>
            </ul>
            <p>These services have their own privacy policies governing their use of your information.</p>

            <h2>11. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes by:
            </p>
            <ul>
              <li>Posting the new policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending email notification for significant changes</li>
            </ul>
            <p>Your continued use of VitalFlow after changes constitutes acceptance of the updated policy.</p>

            <h2>12. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
            <ul>
              <li><strong>Email:</strong> privacy@vitalflow.com</li>
              <li><strong>Phone:</strong> +880 1712-345678</li>
              <li><strong>Address:</strong> Agrabad, Chittagong, Bangladesh</li>
              <li><strong>Contact Page:</strong> <a href="/contact">Contact Us</a></li>
            </ul>

            <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl mt-12">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                <strong>Effective Date:</strong> This Privacy Policy is effective as of January 8, 2026, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
