const db = require('../../config/database');

async function getPotentialMatches(currentUserId) {
  const query = `
    SELECT DISTINCT u.*
    FROM "user" u
    WHERE u.user_id != ?
    AND u.account_status = 'active'
    AND u.verification_status = true
    AND u.user_id NOT IN (
      SELECT swiped_on_id 
      FROM swipes 
      WHERE swiper_id = ?
    )
    AND u.user_id NOT IN (
      SELECT blocked_id 
      FROM blocked 
      WHERE blocker_id = ?
    )
    AND u.user_id NOT IN (
      SELECT blocker_id 
      FROM blocked 
      WHERE blocked_id = ?
    )
  `;
  
  const [users] = await db.query(query, [
    currentUserId, 
    currentUserId, 
    currentUserId, 
    currentUserId
  ]);
  
  return users;
}


async function getUserPreferences(userId) {
  const query = `
    SELECT * FROM preferences WHERE user_id = ?
  `;
  
  const [preferences] = await db.query(query, [userId]);
  return preferences[0] || null;
}


async function getUserLifestyles(userId) {
  const query = `
    SELECT l.name 
    FROM lifestyles l
    JOIN user_lifestyles ul ON l.lifestyle_id = ul.lifestyle_id
    WHERE ul.user_id = ?
  `;
  
  const [lifestyles] = await db.query(query, [userId]);
  return lifestyles.map(l => l.name);
}


async function getUserLoveLanguages(userId) {
  const query = `
    SELECT ll.name 
    FROM love_languages ll
    JOIN user_love_languages ull ON ll.love_language_id = ull.love_language_id
    WHERE ull.user_id = ?
  `;
  
  const [languages] = await db.query(query, [userId]);
  return languages.map(l => l.name);
}


async function getUserRelationshipTypes(userId) {
  const query = `
    SELECT rt.name 
    FROM relationship_types rt
    JOIN user_relationship_types urt ON rt.relationship_type_id = urt.relationship_type_id
    WHERE urt.user_id = ?
  `;
  
  const [types] = await db.query(query, [userId]);
  return types.map(t => t.name);
}


async function getUserPhotoCount(userId) {
  const query = `
    SELECT COUNT(*) as count 
    FROM pictures 
    WHERE user_id = ?
  `;
  
  const [result] = await db.query(query, [userId]);
  return result[0].count;
}


function getDaysSinceActive(user) {
  // No last_active column, return 0 for now
  // Or you could check created_at if that exists
  return 0; // Assume everyone is active
}

module.exports = {
  getPotentialMatches,
  getUserPreferences,
  getUserLifestyles,
  getUserLoveLanguages,
  getUserRelationshipTypes,
  getUserPhotoCount,
  getDaysSinceActive
};