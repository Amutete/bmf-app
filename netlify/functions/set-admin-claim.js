// netlify/functions/set-admin-claim.js

// We need the Firebase Admin SDK
const admin = require('firebase-admin');

// The email of the user you want to make an admin.
// This is secure because this code only runs on the server, not in the browser.
const ADMIN_EMAIL_TO_SET = "cleophasamutete@gmail.com";

// Initialize Firebase Admin SDK only if it hasn't been initialized yet.
// We get the credentials from Netlify's environment variables.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      // This is the crucial part: it replaces the literal '\n' characters
      // from the environment variable with actual newline characters
      // so the PEM key can be parsed correctly.
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

exports.handler = async function(event, context) {
  try {
    // Get the user record from Firebase Auth based on the email
    const user = await admin.auth().getUserByEmail(ADMIN_EMAIL_TO_SET);

    // Set the custom claim 'admin' to true on the user's account
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    // Return a success message
    return {
      statusCode: 200,
      body: `Success! The admin claim has been set for ${ADMIN_EMAIL_TO_SET}. Please log out and log back in to the admin panel.`,
    };

  } catch (error) {
    console.error('Error setting custom claim:', error);
    return {
      statusCode: 500,
      body: `An error occurred: ${error.message}`,
    };
  }
};
