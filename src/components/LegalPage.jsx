import React from "react";

const LegalPage = ({ type }) => {
  const isPrivacy = type === "privacy";

  return (
    <div className="max-w-3xl px-6 py-12 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
      </h1>

      {isPrivacy ? (
        <>
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our application.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
          <p className="mb-4">
            We may collect basic profile information such as your name, email
            address, and profile picture when you sign in using Google or other
            identity providers.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
          <p className="mb-4">
            Your information is used only for authentication and providing
            personalized features within the app. We do not sell, rent, or share
            your personal data with third parties.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
          <p className="mb-4">
            We implement standard security practices to protect your data.
            However, no online service can be 100% secure.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
          <p className="mb-4">
            You may request to access or delete your data anytime by contacting
            us at the email below.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>If you have questions, reach us at: <strong>chattkush34@gmail.com</strong></p>
        </>
      ) : (
        <>
          <p className="mb-4">
            By using this site or application, you agree to follow the Terms and
            Conditions described below.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Use of the App</h2>
          <p className="mb-4">
            You agree to use the application responsibly and not engage in any
            abusive, illegal, or harmful activity.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">User Accounts</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account information and ensuring all actions under your account are
            authorized by you.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Limitations</h2>
          <p className="mb-4">
            We are not liable for any damages arising from the use or inability
            to use the app. The application is provided “as is.”
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Updates to Terms</h2>
          <p className="mb-4">
            We may update these terms at any time. Continued use of the app
            after changes means you accept the revised terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
          <p>For any issues, reach us at: <strong>chattkush34@gmail.com</strong></p>
        </>
      )}
    </div>
  );
};

export default LegalPage;
