const express = require('express');
const router = express.Router();
const { getMatchingProfiles, getNextProfile } = require('../matchingAlgorithm');
const { authenticateUser } = require('../middleware/auth'); // Your auth middleware

/**
 * GET /api/matches/profiles
 * Get matching profiles for swiping
 */
router.get('/profiles', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user_id; // From your auth middleware
    const limit = parseInt(req.query.limit) || 20;
    
    const profiles = await getMatchingProfiles(userId, limit);
    
    res.json({
      success: true,
      count: profiles.length,
      profiles: profiles
    });
    
  } catch (error) {
    console.error('Error fetching matching profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles',
      error: error.message
    });
  }
});

/**
 * GET /api/matches/next
 * Get next single profile to show
 */
router.get('/next', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user_id;
    
    const profile = await getNextProfile(userId);
    
    if (!profile) {
      return res.json({
        success: true,
        profile: null,
        message: 'No more profiles available'
      });
    }
    
    res.json({
      success: true,
      profile: profile
    });
    
  } catch (error) {
    console.error('Error fetching next profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

module.exports = router;