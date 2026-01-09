import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="w-11/12 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Scale className="w-20 h-20 mx-auto mb-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Terms of Service
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
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to VitalFlow! These Terms of Service ("Terms") govern your access to and use of VitalFlow's website, mobile applications, and services (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </p>

            <h2>2. Eligibility</h2>
            <p>To use VitalFlow, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Not be prohibited from using our Services under any applicable laws</li>
              <li>Provide accurate and complete information during registration</li>
            </ul>
            
            <h3>2.1 Donor-Specific Requirements</h3>
            <p>To register as a blood donor, you must:</p>
            <ul>
              <li>Meet the minimum health and weight requirements</li>
              <li>Provide truthful medical history information</li>
              <li>Comply with all donation eligibility criteria</li>
              <li>Consent to donation record keeping</li>
            </ul>

            <h2>3. User Accounts</h2>
            
            <h3>3.1 Account Creation</h3>
            <ul>
              <li>You must provide accurate, current, and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must not share your account credentials</li>
              <li>You must notify us immediately of any unauthorized access</li>
            </ul>

            <h3>3.2 Account Types</h3>
            <p>VitalFlow offers different account types:</p>
            <ul>
              <li><strong>Donor Account:</strong> For individuals willing to donate blood</li>
              <li><strong>Recipient Account:</strong> For those seeking blood donors</li>
              <li><strong>Hospital/Organization Account:</strong> For verified medical facilities</li>
            </ul>

            <h3>3.3 Account Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that:</p>
            <ul>
              <li>Violate these Terms</li>
              <li>Provide false or misleading information</li>
              <li>Engage in fraudulent activities</li>
              <li>Abuse or harass other users</li>
              <li>Remain inactive for extended periods</li>
            </ul>

            <h2>4. Use of Services</h2>
            
            <h3>4.1 Permitted Uses</h3>
            <p>You may use VitalFlow to:</p>
            <ul>
              <li>Register as a blood donor</li>
              <li>Search for compatible blood donors</li>
              <li>Post blood donation requests</li>
              <li>Communicate with verified users</li>
              <li>Access educational resources about blood donation</li>
            </ul>

            <h3>4.2 Prohibited Uses</h3>
            <p>You must NOT:</p>
            <ul>
              <li>Provide false medical or personal information</li>
              <li>Impersonate another person or entity</li>
              <li>Use the platform for commercial blood selling</li>
              <li>Harass, threaten, or abuse other users</li>
              <li>Scrape or copy platform data without permission</li>
              <li>Interfere with platform security or functionality</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Spam users with unsolicited messages</li>
            </ul>

            <h2>5. Blood Donation Process</h2>
            
            <h3>5.1 Donor Responsibilities</h3>
            <p>As a donor on VitalFlow, you agree to:</p>
            <ul>
              <li>Provide accurate health and blood type information</li>
              <li>Update your availability status regularly</li>
              <li>Respond to requests in a timely manner</li>
              <li>Fulfill commitments when you accept donation requests</li>
              <li>Follow medical guidelines for safe donation</li>
              <li>Report any health changes that affect donation eligibility</li>
            </ul>

            <h3>5.2 Recipient Responsibilities</h3>
            <p>When requesting blood, you must:</p>
            <ul>
              <li>Provide genuine and accurate medical information</li>
              <li>Verify the urgency level honestly</li>
              <li>Provide legitimate hospital/medical facility details</li>
              <li>Respect donors' time and commitment</li>
              <li>Cancel requests if blood is no longer needed</li>
            </ul>

            <h3>5.3 VitalFlow's Role</h3>
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600 dark:border-yellow-400">
              <strong>Important:</strong> VitalFlow is a PLATFORM connecting donors with recipients. We do NOT:
            </p>
            <ul>
              <li>Perform medical screenings or blood testing</li>
              <li>Guarantee donor availability or compatibility</li>
              <li>Verify medical claims or diagnoses</li>
              <li>Provide medical advice or treatment</li>
              <li>Assume liability for donation outcomes</li>
            </ul>

            <h2>6. Verification and Safety</h2>
            <ul>
              <li>We verify user identities to maintain platform safety</li>
              <li>All donations should occur at licensed medical facilities</li>
              <li>Users must follow proper medical protocols</li>
              <li>Report suspicious activity or fraud immediately</li>
            </ul>

            <h2>7. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our <a href="/privacy">Privacy Policy</a> explains how we collect, use, and protect your information. By using VitalFlow, you consent to our data practices as described in the Privacy Policy.
            </p>

            <h2>8. Intellectual Property</h2>
            
            <h3>8.1 VitalFlow's Rights</h3>
            <p>All content, features, and functionality of VitalFlow are owned by us and protected by copyright, trademark, and other intellectual property laws. This includes:</p>
            <ul>
              <li>Website design, logos, and branding</li>
              <li>Software code and algorithms</li>
              <li>Text, graphics, and multimedia content</li>
              <li>Database structure and organization</li>
            </ul>

            <h3>8.2 User Content</h3>
            <p>By posting content on VitalFlow, you:</p>
            <ul>
              <li>Retain ownership of your content</li>
              <li>Grant us a license to use, display, and distribute it</li>
              <li>Confirm you have the right to share the content</li>
              <li>Take responsibility for the accuracy of your content</li>
            </ul>

            <h2>9. Disclaimers and Limitations</h2>
            
            <h3>9.1 Medical Disclaimer</h3>
            <p className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600 dark:border-red-400">
              <strong>Critical Notice:</strong> VitalFlow is NOT a medical service provider. Always consult qualified healthcare professionals for medical advice. We are not responsible for:
            </p>
            <ul>
              <li>Medical outcomes of blood donations</li>
              <li>Compatibility or testing accuracy</li>
              <li>Health complications from donations</li>
              <li>Medical advice provided by users</li>
            </ul>

            <h3>9.2 Service Availability</h3>
            <p>We provide Services "as is" and "as available" without warranties of any kind. We do not guarantee:</p>
            <ul>
              <li>Uninterrupted or error-free service</li>
              <li>Success in finding donors or recipients</li>
              <li>Accuracy of user-provided information</li>
              <li>Prevention of all security breaches</li>
            </ul>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, VitalFlow and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
            </p>
            <ul>
              <li>Use or inability to use our Services</li>
              <li>Interactions between users</li>
              <li>Medical outcomes related to blood donation</li>
              <li>Loss of data or information</li>
              <li>Unauthorized access to your account</li>
            </ul>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless VitalFlow from any claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul>
              <li>Your violation of these Terms</li>
              <li>Your use of the Services</li>
              <li>Your content or submissions</li>
              <li>Your interactions with other users</li>
            </ul>

            <h2>12. Modification of Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of VitalFlow after modifications constitutes acceptance of the updated Terms.
            </p>
            <p>Material changes will be communicated via:</p>
            <ul>
              <li>Email notification</li>
              <li>In-app announcements</li>
              <li>Website notices</li>
            </ul>

            <h2>13. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of Bangladesh. Any disputes arising from these Terms or your use of VitalFlow shall be resolved through:
            </p>
            <ol>
              <li><strong>Informal Negotiation:</strong> Contact us to resolve the issue</li>
              <li><strong>Mediation:</strong> Voluntary mediation if negotiation fails</li>
              <li><strong>Legal Action:</strong> Courts of Chittagong, Bangladesh</li>
            </ol>

            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h2>15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and VitalFlow regarding use of our Services.
            </p>

            <h2>16. Contact Information</h2>
            <p>For questions about these Terms, contact:</p>
            <ul>
              <li><strong>Email:</strong> legal@vitalflow.com</li>
              <li><strong>Phone:</strong> +880 1712-345678</li>
              <li><strong>Address:</strong> Agrabad, Chittagong, Bangladesh</li>
              <li><strong>Contact Form:</strong> <a href="/contact">Contact Us</a></li>
            </ul>

            <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl mt-12">
              <h3 className="text-lg font-bold mb-4">Acknowledgment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                By using VitalFlow, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that VitalFlow is a platform service and not a healthcare provider, and  that you use the service at your own risk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
