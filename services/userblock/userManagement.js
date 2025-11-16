const db = require('../../config/database');

/**
 * @param {number} blockerId
 * @param {number} blockedId
 * @param {string} reason
 * @returns {Promise<object>} block result
 */
async function blockUser(blockerId, blockedId, reason = null) {
  try {
    const [existing] = await db.query(
      'SELECT * FROM blocked WHERE blocker_id = ? AND blocked_id = ?',
      [blockerId, blockedId]
    );
    
    if (existing.length > 0) {
      return { success: false, message: 'User already blocked' };
    }
    
    await db.query(
      'INSERT INTO blocked (blocker_id, blocked_id) VALUES (?, ?)',
      [blockerId, blockedId]
    );
    
    if (reason) {
      await db.query(
        'INSERT INTO reports (reporter_id, reported_id, reason, status) VALUES (?, ?, ?, ?)',
        [blockerId, blockedId, reason, 'pending']
      );
    }
    
    await db.query(
      'DELETE FROM matches WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)',
      [blockerId, blockedId, blockedId, blockerId]
    );
    
    return { success: true, message: 'User blocked successfully' };
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}

async function unblockUser(blockerId, blockedId) {
  try {
    const [result] = await db.query(
      'DELETE FROM blocked WHERE blocker_id = ? AND blocked_id = ?',
      [blockerId, blockedId]
    );
    
    if (result.affectedRows === 0) {
      return { success: false, message: 'Block record not found' };
    }
    
    return { success: true, message: 'User unblocked successfully' };
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
}

async function isUserBlocked(blockerId, blockedId) {
  try {
    const [result] = await db.query(
      'SELECT * FROM blocked WHERE blocker_id = ? AND blocked_id = ?',
      [blockerId, blockedId]
    );
    
    return result.length > 0;
  } catch (error) {
    console.error('Error checking block status:', error);
    throw error;
  }
}

/**
 * restrict account (admin function; sets account_status to 'restricted'), in case admins need to moderate?
 */
async function restrictAccount(userId, adminId, reason) {
  try {
    await db.query(
      'UPDATE "user" SET account_status = ? WHERE user_id = ?',
      ['restricted', userId]
    );
    
    await db.query(
      'INSERT INTO reports (reporter_id, reported_id, reason, status) VALUES (?, ?, ?, ?)',
      [adminId, userId, `Admin restriction: ${reason}`, 'resolved']
    );
    
    return { success: true, message: 'Account restricted successfully' };
  } catch (error) {
    console.error('Error restricting account:', error);
    throw error;
  }
}

module.exports = {
  blockUser,
  unblockUser,
  isUserBlocked,
  restrictAccount
};