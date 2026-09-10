# TerraLoop AI — Devpost Submission Draft

## Inspiration
Recycling advice often starts too late. By the time an item reaches a bin, the opportunity to repair, reuse, donate, or repurpose it may already be lost. TerraLoop AI was built to move the decision upstream and make circular choices easy to understand.

## What it does
TerraLoop AI accepts a plain-language list of unwanted household items and generates a prioritized circular-action plan. It recognizes common waste streams, ranks higher-value actions before disposal, explains the reasoning, flags safety/local-policy checks, and estimates potential landfill diversion and avoided CO2e.

## How we built it
The project is a zero-dependency browser application built with HTML, CSS, and JavaScript. Its decision engine uses an inspectable knowledge base and deterministic matching so every recommendation can be explained. The UI calculates aggregate diversion and CO2e estimates locally and works without accounts, uploads, or paid APIs.

## Challenges we ran into
The hardest product challenge was balancing useful automation with honest uncertainty. Waste rules vary by location, so TerraLoop does not pretend that one recycling rule works everywhere. Recommendations separate the global circular hierarchy from local disposal checks and surface cautions when local rules matter.

## Accomplishments that we're proud of
- A complete interactive flow from waste list to action plan.
- Transparent, explainable recommendations instead of opaque output.
- No API key, paid service, user account, or cloud dependency required for the demo.
- Responsive design that works on mobile and desktop.
- Safety notes for batteries, electronics, broken glass, and other special streams.

## What we learned
Environmental software is strongest when it helps users make a better decision before disposal, not only after. We also learned that transparency matters: displaying why an action was chosen can make sustainability guidance more trustworthy and educational.

## What's next for TerraLoop AI
- Location-aware recycling rules and verified collection points.
- Barcode/image recognition for faster product identification.
- Household impact history and goals.
- Community repair/donation matching.
- Optional LLM layer that translates natural-language descriptions into the same transparent action schema without replacing deterministic safety rules.

## Built during NextStep Hacks 2026
The repository was empty before this implementation. TerraLoop AI's application code, design, decision engine, documentation, and submission materials were created during the hackathon period.

## Tech
JavaScript, HTML5, CSS3, explainable decision rules, responsive web design.

## Suggested tagline
**Before it becomes waste, find its next best life.**
