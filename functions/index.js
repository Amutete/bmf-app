const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Callable function to grant admin role
exports.grantAdminRole = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
  }

  const email = context.auth.token.email;

  // Only allow the designated admin email
  if (email !== 'cleophasamutete@gmail.com') {
    throw new functions.https.HttpsError('permission-denied', 'Only the designated admin can request admin privileges.');
  }

  try {
    // Set custom claim
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return { message: `Success! ${email} is now an admin.` };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
