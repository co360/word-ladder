// algorithm: find two words that can be connected through a word ladder

function getRndInteger(min, max) {
  // Return random integer in range [min,max). Note that range excludes max. 
  // Taken from W3 schools page
  return Math.floor(Math.random() * (max - min) ) + min;
}

function removeItem(arr, value) {
  // Remove first instance of value from arr
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function getRndArrayElt(arr) {
  // Return random element of arr
  return arr[getRndInteger(0, arr.length)];
}

function getRndWord(maxLen=-1) {
  // pull random word from dictionary
  let words;
  if (maxLen != -1) {
    words = Object.keys(scrabDic).filter(word => word.length <= maxLen);
  } else {
    words = Object.keys(scrabDic);
  }
  return words[getRndInteger(0, words.length)];
}

function getLetPerms(chars, index) {
  // Given an array of letters and an index, return an array of all strings made by repalcing chars[index] by each other letter
  let perms = [];
  const char = chars[index];
  for (var i = 65; i <= 90; i++) {
    const newChar = String.fromCharCode(i);
    if (newChar != char) {
      const newChars = [...chars]; // create copy of chars
      newChars[index] = newChar;
      perms.push(newChars.join(""));
    }
  }
  return perms;
}

function getNextWords(word) {
  // Return array of words within one letter difference of given word
  const chars = word.split("");
  var nextWords = [];
  for (var i = 0; i < chars.length; i++) {
    nextWords = nextWords.concat(getLetPerms(chars, i));
  };
  return nextWords.filter(word => word in scrabDic);
}

function createWordLadder(steps=10) {
  const startWord = getRndWord(maxLen=5);
  let ladder = [startWord];
  let seen = {};

  for(var i = 0; i < steps; i++) {
    if (ladder.length == 0) return;

    let word = getRndArrayElt(ladder);
    if (word in seen) {
      i--;
      ladder = removeItem(ladder, word);
      continue;
    } else {
      seen[word] = 1;
      console.log(word);
      ladder = getNextWords(word);
    }
  }
}

// approach: either pick two words and see if they're connected, or create a word ladder from scratch. I think the second approach makes the most sense. there will be 26*<word length> options per iteration but I think it's fine, better than just testing two random words

// problems: 
// 1. doesn't check to see if end word has a shorter path from start word... can make a 10 step word ladder from TENT->TINT
// 2. doesn't check to make sure ladder will be of sufficient length
// 3. uses scrabble dictionary and words are ridiculous