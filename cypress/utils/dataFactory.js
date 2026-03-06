const rndStr = (len = 6) => Math.random().toString(36).slice(2, 2 + len);
const rndNum = (digits = 10) => Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function makePracticeFormData() {
  const subjects = ['Maths', 'Chemistry', 'Computer Science', 'English'];
  const hobbies  = ['Sports', 'Reading', 'Music'];
  const genders  = ['Male', 'Female', 'Other'];

  const firstName = `Nilson_${rndStr(4)}`;
  const lastName  = `Belchior_${rndStr(4)}`;
  const email     = `qa_${rndStr(5)}@example.com`;
  const mobile    = rndNum(10);
  const address   = `Rua ${rndStr(5)} ${rndNum(3)} - Barueri/SP`;

  return {
    firstName,
    lastName,
    email,
    gender: pickOne(genders),
    mobile,
    dob: { month: 'January', year: '1995', day: '015' },
    subject: pickOne(subjects),
    hobby: pickOne(hobbies),
    pictureFile: 'prova-upload.txt',
    address,
    state: 'NCR',
    city: 'Delhi'
  };
}