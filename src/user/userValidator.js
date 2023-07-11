const Joi = require("joi");

const signUpValidator = Joi.object({
  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,15}$/
    )
    .required()
    .messages({
      "string.pattern.base": "비밀번호 형식에 맞지 않습니다.",
      "any.required": "비밀번호는 필수 입력 항목입니다.",
    }),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      "string.email": "유효하지 않은 이메일 주소입니다.",
      "any.required": "이메일은 필수 입력 항목입니다.",
    }),
  name: Joi.string()
    .required()
    .pattern(/^[가-힣]{2,4}$/)
    .messages({
      "string.pattern.base": "이름은 한글 2~4자여야 합니다.",
      "any.required": "이름은 필수 입력 항목입니다.",
    }),
  address: Joi.object({
    streetAddress: Joi.string().required(),
    detailAddress: Joi.string().required(),
    postalCode: Joi.string().required().length(5),
  }).required(),
  birthdate: Joi.date().required(),
  phoneNumber: Joi.string()
    .required()
    .pattern(/010-\d{4}-\d{4}/)
    .messages({
      "string.pattern.base": "휴대폰 번호 형식이 올바르지 않습니다.",
      "any.required": "휴대폰 번호는 필수 입력 항목입니다.",
    }),
});

const validateSignUp = (userData) => {
  return signUpSchema.validate(userData, { abortEarly: false });
};

module.exports = { signUpValidator };