import { z as zod } from "zod";

import {CardSchema} from './card.js';

export const BlackjackBodySchema = zod.object({
  cardDeck: zod.array(CardSchema),
  hand: zod.array(CardSchema),
});
