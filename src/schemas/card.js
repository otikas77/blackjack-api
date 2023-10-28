const zod = require("zod");

const CardSchema = zod.object({
  id: zod.string(),
  suit: zod.string(),
  value: zod.string(),
  points: zod.number().or(zod.array(zod.number())),
});

module.exports = CardSchema;
