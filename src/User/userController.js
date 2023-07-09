const userService = require("./userService");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.signUp(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.signIn(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
};

const signOut = async (req, res) => {
  try {
    const userId = req.user.id; // 로그인된 사용자의 ID (인증 미들웨어에서 저장한 정보 활용)
    const result = await userService.signOut(userId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "로그아웃 중 오류가 발생했습니다." });
  }
};

const gerUserList = async (req, res) => {
  try {
    const users = await userService.getUserList();
    res.json({
      result: "ok",
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "사용자 목록을 가져오는 중 오류가 발생했습니다." });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  gerUserList,
};