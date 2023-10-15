import { encoded, translations } from './data.js';

console.log("Let's rock")


function decoded() {
  const uniqueResId = new Set();
  const res = encoded.map((item) => {
    const decodedRes = {};
    for (let key in item) {
      if (key.endsWith('Id') &&!['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        const encodedKey = item[key];
        decodedRes[key] = translations[encodedKey] || item[key]
        uniqueResId.add(item[key])
      } 
    }
    return decodedRes
  });
  return {res, uniqueResId};
}
console.log(decoded());
console.log("I finished him!")