
export function getLeaderboardData(users) {
  return Object.keys(users).map(userId => ({
    name: users[userId].name,
    avatarURL: users[userId].avatarURL,
    answersNum: Object.keys(users[userId].answers).length,
    questionsNum: users[userId].questions.length,
    totalNum:Object.keys(users[userId].answers).length + users[userId].questions.length
  }));
}