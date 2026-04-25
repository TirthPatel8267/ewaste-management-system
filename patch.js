const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin:admin123@cluster0.qpg6dwg.mongodb.net/ewaste_management';

mongoose.connect(uri).then(async () => {
  const Pickups = mongoose.connection.collection('pickups');
  // Update all orphaned records matching name to add email
  await Pickups.updateMany(
    { name: 'TIRTH S PATEL', email: { $exists: false } },
    { $set: { email: 'tirthpatel8267@gmail.com' } }
  );
  
  await Pickups.updateMany(
    { name: 'ttt', email: { $exists: false } },
    { $set: { email: 'tirthpatel8267@gmail.com' } }
  );

  await Pickups.updateMany(
    { name: 'tt', email: { $exists: false } },
    { $set: { email: 'tirthpatel8267@gmail.com' } }
  );

  console.log('Successfully patched orphaned records!');
  const items = await Pickups.find({ email: 'tirthpatel8267@gmail.com' }).toArray();
  console.log('Fixed records count:', items.length);
  process.exit(0);
}).catch(console.error);
