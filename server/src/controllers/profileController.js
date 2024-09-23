const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userData = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        profilePic: true,
        bio: true,
        birthDate: true,
      },
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { userId, username, email, first_name, last_name, bio, birthDate, profilePic } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Prepare the update data object with validated fields
    const updateData = {};

    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (bio !== undefined) updateData.bio = bio;
    
    // Handle the profilePic field
    if (profilePic !== undefined) updateData.profilePic = profilePic;

    // Handle birthDate field with validation
    if (birthDate) {
      const date = new Date(birthDate);
      if (!isNaN(date.getTime())) {
        updateData.birthDate = date.toISOString(); // Ensure it's an ISO-8601 string
      } else {
        return res.status(400).json({ error: 'Invalid birthDate format' });
      }
    } else {
      updateData.birthDate = null;
    }

    // Update user details in the database
    const userData = await prisma.user.update({
      where: { user_id: userId },
      data: updateData,
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'An error occurred while updating user data' });
  }
};


// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.getUserDetails = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await prisma.user.findUnique({
//             where: { user_id: userId },
//             select: {
//                 username: true,
//                 email: true,
//                 first_name: true,
//                 last_name: true,
//                 profilePic: true,
//                 bio: true,
//                 birthDate: true,
//             }
//         });
//         if (!userData) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(userData);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ error: 'An error occurred while fetching user data' });
//     }
// }

// exports.updateUserDetails = async (req, res) => {
//     try {
//         // const { userId } = req.params; // Use URL parameter
//         const { userId, username, email, firstName, lastName, bio, birthDate, profilePic } = req.body;
//         const userData = await prisma.user.update({
//             where: { user_id: userId },
//             data: {
//                 username: username,
//                 email: email,
//                 first_name: firstName,
//                 last_name: lastName,
//                 profilePic: profilePic,
//                 bio: bio,
//                 birthDate: birthDate,
//             }
//         });
//         if (!userData) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(userData);
//     } catch (error) {
//         console.error('Error updating user data:', error);
//         res.status(500).json({ error: 'An error occurred while updating user data' });
//     }
// }
