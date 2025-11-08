function filterByGenderPreference(users, currentUser, currentUserPrefs) {
  if (!currentUserPrefs || !currentUserPrefs.gender_attraction) {
    return users;
  }
  
  const preferredGenders = currentUserPrefs.gender_attraction
    .split(',')
    .map(g => g.trim().toLowerCase());
  
  if (preferredGenders.includes('everyone') || preferredGenders.includes('all')) {
    return users;
  }
  
  return users.filter(user => {
    const userGender = user.gender ? user.gender.toLowerCase() : '';
    return preferredGenders.includes(userGender);
  });
}

function filterByAge(users, currentUser, minAge = 18, maxAge = 30) {
  return users.filter(user => {
    // Since age is VARCHAR in your table, parse it to int
    const userAge = parseInt(user.age);
    if (isNaN(userAge)) return false;
    
    return userAge >= minAge && userAge <= maxAge;
  });
}


function applyFilters(users, currentUser, currentUserPrefs) {
  let filtered = users;
  
  // Gender preference
  filtered = filterByGenderPreference(filtered, currentUser, currentUserPrefs);
  
  // Age filter
  filtered = filterByAge(filtered, currentUser);
  
  return filtered;
}

module.exports = {
  filterByGenderPreference,
  filterByAge,
  filterBySameCollege,
  applyFilters
};