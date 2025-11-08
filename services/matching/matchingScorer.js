const {
  getUserLifestyles,
  getUserLoveLanguages,
  getUserRelationshipTypes,
  getUserPhotoCount,
  getDaysSinceActive
} = require('./matchingHelpers');

function countSharedItems(array1, array2) {
  return array1.filter(item => array2.includes(item)).length;
}

async function calculateCompatibilityScore(currentUser, potentialMatch, currentUserData) {
  let score = 0;
  
  const matchLifestyles = await getUserLifestyles(potentialMatch.user_id);
  const matchLoveLanguages = await getUserLoveLanguages(potentialMatch.user_id);
  const matchRelationshipTypes = await getUserRelationshipTypes(potentialMatch.user_id);
  const matchPhotoCount = await getUserPhotoCount(potentialMatch.user_id);
  
  // 1. Shared Lifestyles (0-50 points)
  const sharedLifestyles = countSharedItems(
    currentUserData.lifestyles, 
    matchLifestyles
  );
  score += sharedLifestyles * 10;
  
  // 2. Shared Love Languages (0-40 points)
  const sharedLoveLanguages = countSharedItems(
    currentUserData.loveLanguages, 
    matchLoveLanguages
  );
  score += sharedLoveLanguages * 10;
  
  // 3. Compatible Relationship Goals (0-30 points)
  const sharedRelationshipTypes = countSharedItems(
    currentUserData.relationshipTypes, 
    matchRelationshipTypes
  );
  if (sharedRelationshipTypes > 0) {
    score += 30;
  }
  
  // 4. Same School Year (0-20 points)
  if (potentialMatch.school_year === currentUser.school_year) {
    score += 20;
  }
  
  // 5. Profile Completeness (0-20 points)
  if (potentialMatch.bio && potentialMatch.bio.length > 100) {
    score += 10;
  } else if (potentialMatch.bio && potentialMatch.bio.length > 30) {
    score += 5;
  }
  
  if (matchPhotoCount >= 6) {
    score += 10;
  } else if (matchPhotoCount >= 3) {
    score += 5;
  }

  
  // 7. Similar Age (0-10 points)
  const currentAge = parseInt(currentUser.age);
  const matchAge = parseInt(potentialMatch.age);
  
  if (!isNaN(currentAge) && !isNaN(matchAge)) {
    const ageDiff = Math.abs(currentAge - matchAge);
    if (ageDiff <= 1) {
      score += 10;
    } else if (ageDiff <= 3) {
      score += 5;
    }
  }
  
  return score;
}

async function scoreMatches(currentUser, potentialMatches, currentUserData) {
  const scoredMatches = [];
  
  for (const match of potentialMatches) {
    const score = await calculateCompatibilityScore(
      currentUser, 
      match, 
      currentUserData
    );
    
    scoredMatches.push({
      user: match,
      score: score
    });
  }
  
  return scoredMatches;
}

module.exports = {
  calculateCompatibilityScore,
  scoreMatches
};