const db = require('../../config/database');

const {
  getPotentialMatches,
  getUserPreferences,
  getUserLifestyles,
  getUserLoveLanguages,
  getUserRelationshipTypes
} = require('./matchingHelpers');

const { applyFilters } = require('./matchingFilters');
const { scoreMatches } = require('./matchingScorer');

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function getMatchingProfiles(currentUserId, limit = 20) {
  try {
    // 1. Get current user's full data
    const [currentUserResult] = await db.query(
      'SELECT * FROM "user" WHERE user_id = ?',  
      [currentUserId]
    );
    const currentUser = currentUserResult[0];
    
    if (!currentUser) {
      throw new Error('User not found');
    }
    
    // 2. Get current user's preferences and interests
    const currentUserPrefs = await getUserPreferences(currentUserId);
    const currentUserLifestyles = await getUserLifestyles(currentUserId);
    const currentUserLoveLanguages = await getUserLoveLanguages(currentUserId);
    const currentUserRelationshipTypes = await getUserRelationshipTypes(currentUserId);
    
    const currentUserData = {
      lifestyles: currentUserLifestyles,
      loveLanguages: currentUserLoveLanguages,
      relationshipTypes: currentUserRelationshipTypes
    };
    
    // 3. Get all potential matches
    let potentialMatches = await getPotentialMatches(currentUserId);
    
    // 4. Apply filters
    potentialMatches = applyFilters(
      potentialMatches, 
      currentUser, 
      currentUserPrefs
    );
    
    // 5. Score each potential match
    const scoredMatches = await scoreMatches(
      currentUser, 
      potentialMatches, 
      currentUserData
    );
    
    // 6. Sort by score
    scoredMatches.sort((a, b) => b.score - a.score);
    
    // 7. Take top matches
    const topMatches = scoredMatches.slice(0, Math.min(limit * 2, scoredMatches.length));
    
    // 8. Shuffle for variety
    const shuffledTopMatches = shuffleArray(topMatches);
    
    // 9. Return limited number
    const finalMatches = shuffledTopMatches.slice(0, limit);
    
    return finalMatches.map(m => m.user);
    
  } catch (error) {
    console.error('Error in matching algorithm:', error);
    throw error;
  }
}

async function getNextProfile(currentUserId) {
  const profiles = await getMatchingProfiles(currentUserId, 1);
  return profiles[0] || null;
}

module.exports = {
  getMatchingProfiles,
  getNextProfile
};