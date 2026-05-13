# Points Efficiency Calculator

The user wants to calculate points efficiency for a Warhammer 40K unit.

Ask the user for the following, one step at a time:
1. **Army** — e.g. "Space Marines"
2. **Unit name** — e.g. "Inceptor Squad"
3. **Number of models** — how many models in the unit
4. **Points cost** — the total points for that unit

Then calculate and display:
- **Points per model** = points ÷ models
- **Models per 100 points** = (models ÷ points) × 100

Present it clearly, for example:

```
Unit: Inceptor Squad (Space Marines)
Models: 3 | Points: 120

Points per model:    40.0
Models per 100 pts:  2.5
```

Keep it short and clean. No file lookups needed — this is a pure calculator.
