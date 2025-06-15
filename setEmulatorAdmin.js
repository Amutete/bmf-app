const admin = require("firebase-admin");

async function setEmulatorAdminClaim(email) {
    if (!admin.apps.length) {
        admin.initializeApp({
            projectId: "bmf-6447b", // <-- Use your real Firebase project ID here
        });
    }

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
        console.log(`✅ Admin claim set for: ${email}`);
    } catch (error) {
        console.error("❌ Error setting claim:", error.message);
    }
}

// Call this with the email you used in the emulator
setEmulatorAdminClaim("admin@example.com"); // Replace with your test user's email
