import React from "react";
import { motion } from "framer-motion";
import { Cookie, Settings, ToggleLeft, Info } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="w-11/12 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Cookie className="w-20 h-20 mx-auto mb-6 text-orange-600 dark:text-orange-400" />
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Cookie Policy
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
            
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They help websites remember information about your visit, making your next visit easier and the site more useful to you.
            </p>
            <p>
              VitalFlow uses cookies and similar technologies to enhance your experience, provide our services, and understand how you use our platform.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            
            <h3>2.1 Essential Cookies</h3>
            <p><strong>Purpose:</strong> Required for the website to function properly</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Authentication cookies (remembering you're logged in)</li>
              <li>Security cookies (protecting against fraud)</li>
              <li>Session management cookies</li>
              <li>Load balancing cookies</li>
            </ul>
            <p className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
              <strong>Can you disable them?</strong> No, these cookies are necessary for VitalFlow to work. Disabling them will prevent you from using our services.
            </p>

            <h3>2.2 Functional Cookies</h3>
            <p><strong>Purpose:</strong> Enhance functionality and personalization</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Language preference cookies</li>
              <li>Theme selection (light/dark mode)</li>
              <li>Location settings for donor matching</li>
              <li>Search filters and preferences</li>
              <li>Notification settings</li>
            </ul>
            <p><strong>Duration:</strong> Up to 1 year</p>
            <p><strong>Can you disable them?</strong> Yes, but this may affect your experience and require you to re-enter preferences.</p>

            <h3>2.3 Analytics Cookies</h3>
            <p><strong>Purpose:</strong> Help us understand how users interact with VitalFlow</p>
            <p><strong>Information collected:</strong></p>
            <ul>
              <li>Pages visited and features used</li>
              <li>Time spent on site</li>
              <li>Navigation paths</li>
              <li>Browser and device information</li>
              <li>Referral sources</li>
            </ul>
            <p><strong>Third-party services:</strong> Google Analytics, Firebase Analytics</p>
            <p><strong>Duration:</strong> Up to 2 years</p>
            <p><strong>Can you disable them?</strong> Yes, through browser settings or opt-out tools.</p>

            <h3>2.4 Performance Cookies</h3>
            <p><strong>Purpose:</strong> Monitor and improve site performance</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Error tracking</li>
              <li>Load time measurement</li>
              <li>Server performance monitoring</li>
              <li>Feature usage statistics</li>
            </ul>
            <p><strong>Duration:</strong> Session or up to 1 year</p>

            <h2>3. How We Use Cookies</h2>
            
            <h3>3.1 Providing Our Services</h3>
            <ul>
              <li>Maintaining your logged-in state</li>
              <li>Remembering your profile settings</li>
              <li>Storing search preferences for donor matching</li>
              <li>Managing notification preferences</li>
            </ul>

            <h3>3.2 Improving User Experience</h3>
            <ul>
              <li>Personalizing content and recommendations</li>
              <li>Remembering language and region preferences</li>
              <li>Optimizing site layout and features</li>
              <li>Reducing need to re-enter information</li>
            </ul>

            <h3>3.3 Security and Fraud Prevention</h3>
            <ul>
              <li>Detecting and preventing unauthorized access</li>
              <li>Identifying suspicious activity</li>
              <li>Protecting against spam and abuse</li>
              <li>Validating user authenticity</li>
            </ul>

            <h3>3.4 Analytics and Research</h3>
            <ul>
              <li>Understanding how users navigate our platform</li>
              <li>Identifying popular features and pain points</li>
              <li>Measuring campaign effectiveness</li>
              <li>Improving platform design and functionality</li>
            </ul>

            <h2>4. Third-Party Cookies</h2>
            <p>We use carefully selected third-party services that may set their own cookies:</p>
            
            <h3>4.1 Firebase (Google)</h3>
            <p><strong>Purpose:</strong> Authentication, real-time database, analytics</p>
            <p><strong>Privacy Policy:</strong> <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></p>

            <h3>4.2 Google Analytics</h3>
            <p><strong>Purpose:</strong> Website analytics and insights</p>
            <p><strong>Opt-out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></p>

            <h3>4.3 Google Maps</h3>
            <p><strong>Purpose:</strong> Location services and mapping</p>
            <p><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></p>

            <h2>5. Cookie Duration</h2>
            
            <h3>5.1 Session Cookies</h3>
            <ul>
              <li>Temporary cookies deleted when you close your browser</li>
              <li>Used for essential functions like maintaining login state</li>
            </ul>

            <h3>5.2 Persistent Cookies</h3>
            <ul>
              <li>Remain on your device for a specified period</li>
              <li>Used for preferences and analytics</li>
              <li>Typical duration: 30 days to 2 years</li>
              <li>Automatically deleted after expiration</li>
            </ul>

            <h2>6. Managing Your Cookie Preferences</h2>
            
            <h3>6.1 Browser Settings</h3>
            <p>Most browsers allow you to control cookies through settings:</p>
            
            <div className="grid gap-4 my-6">
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Chrome</h4>
                <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Firefox</h4>
                <p className="text-sm">Settings → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Safari</h4>
                <p className="text-sm">Preferences → Privacy → Cookies and website data</p>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Microsoft Edge</h4>
                <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
              </div>
            </div>

            <h3>6.2 Cookie Management Options</h3>
            <p>You can choose to:</p>
            <ul>
              <li><strong>Accept all cookies:</strong> Best user experience</li>
              <li><strong>Block all cookies:</strong> May limit website functionality</li>
              <li><strong>Delete cookies:</strong> Remove existing cookies from your device</li>
              <li><strong>Block third-party cookies:</strong> Block external service cookies</li>
              <li><strong>Selective blocking:</strong> Choose which sites can set cookies</li>
            </ul>

            <h3>6.3 Mobile Devices</h3>
            <p><strong>iOS:</strong> Settings → Safari → Block All Cookies</p>
            <p><strong>Android:</strong> Settings → Site Settings → Cookies</p>

            <h2>7. Do Not Track (DNT)</h2>
            <p>
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you don't want to be tracked. Currently, there is no industry standard for responding to DNT signals.
            </p>
            <p>
              VitalFlow respects your privacy choices and  provides cookie control options through browser settings and preference centers.
            </p>

            <h2>8. Impact of Disabling Cookies</h2>
            <p>If you disable cookies, you may experience:</p>
            <ul>
              <li><strong>Login issues:</strong> You'll need to log in repeatedly</li>
              <li><strong>Lost preferences:</strong> Language, theme, and filter settings won't save</li>
              <li><strong>Limited functionality:</strong> Some features may not work properly</li>
              <li><strong>Less personalization:</strong> Generic experience without customization</li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>
              VitalFlow is not intended for users under 18. We do not knowingly collect information from children through cookies or any other means.
            </p>

            <h2>10. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our practices or for legal and regulatory requirements. We will notify you of significant changes through:
            </p>
            <ul>
              <li>Email notification</li>
              <li>Website banner</li>
              <li>Updated "Last Updated" date</li>
            </ul>

            <h2>11. More Information</h2>
            <p>For more details about how we handle your data:</p>
            <ul>
              <li><strong>Privacy Policy:</strong> <a href="/privacy">View Privacy Policy</a></li>
              <li><strong>Terms of Service:</strong> <a href="/terms">View Terms of Service</a></li>
              <li><strong>Contact Us:</strong> <a href="/contact">Contact Page</a></li>
            </ul>

            <h2>12. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact:</p>
            <ul>
              <li><strong>Email:</strong> privacy@vitalflow.com</li>
              <li><strong>Phone:</strong> +880 1712-345678</li>
              <li><strong>Address:</strong> Agrabad, Chittagong, Bangladesh</li>
            </ul>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl mt-12">
              <h3 className="text-lg font-bold mb-4">Your Consent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                By continuing to use VitalFlow, you consent to our use of cookies as described in this Cookie Policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
