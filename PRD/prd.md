Below is a **detailed PRD** for your “self-exploration wisdom app” that blends ancient texts (Vedas / Upanishads / Gita + adjacent traditions) into a modern, guided experience — **without explicitly naming sources** in the UI, while still staying compliant and auditable internally.

---

# PRD: Project “Sage” (working title)

**Product type:** Mobile app (iOS/Android) + lightweight backend
**Core capability:** Conversational self-inquiry + guided reflections grounded in a curated corpus of ancient wisdom texts
**Primary delivery:** Text responses + optional **text-to-speech narration**
**Knowledge strategy options:** **RAG** (recommended MVP) + optional **fine-tune** later
**Monetization:** Free + donations (optional “packs” later)

---

## 1) Vision

Help people explore life questions (stress, relationships, purpose, identity, suffering, action, discipline, compassion) through **timeless wisdom**, delivered as **gentle coaching** and reflection prompts—without preaching, without dogma, and without overwhelming them with scripture.

**North Star:** A user feels calmer / clearer after 3–5 minutes and returns daily because it becomes a personal ritual.

---

## 2) Problem Statement

People seek meaning and emotional clarity, but:

* Most “wisdom” apps are generic or motivational.
* Scripture apps are rigid, source-heavy, and not personalized.
* AI chat apps often hallucinate or give unsafe advice.
* Ancient texts are dense; users need *translation into lived experience*.

---

## 3) Goals & Success Metrics

### Goals (what success looks like)

1. Provide **high-quality, grounded guidance** that feels personal and actionable.
2. Make a “daily ritual” loop (short, repeatable sessions).
3. Maintain **trust**: transparency + safety + non-hallucinatory grounding.

### Key KPIs

* **Activation:** % who complete first “session” (question → guidance → reflection)
* **D1 / D7 retention**
* **Session length:** 3–8 minutes sweet spot
* **User-rated helpfulness:** thumbs up/down + “felt understood” micro-rating
* **Grounding rate:** % of responses that used retrieval citations internally
* **Safety escalations:** low & properly handled
* **Donations conversion:** optional

---

## 4) Target Users & Personas

1. **Seeker (casual):** “I’m stressed; I want calm and clarity fast.”
2. **Practitioner:** meditation/yoga/stoicism reader; wants depth + practice prompts.
3. **Reflective journaler:** wants prompts, tracking, and meaning-making.
4. **Skeptical professional:** wants non-religious tone; practical wisdom and framing.

---

## 5) Core User Journeys

### Journey A: First-time “Guided Inquiry”

1. Onboarding: choose tone (Practical / Poetic / Minimal / Deep) + voice (optional)
2. “What’s alive for you right now?” (free text)
3. App asks 1 clarifying question (optional)
4. App returns:

   * Short guidance (6–12 lines)
   * 1–2 reflection prompts
   * Optional “practice” (60–120 sec)
5. User saves as “Insight” + optional journal entry
6. Suggested next step: “Daily check-in tomorrow”

### Journey B: Daily Ritual (3 minutes)

1. One-tap “Daily Session”
2. Mood/energy slider + quick prompt
3. App gives short guidance + one practice
4. Streak + tiny progress indicator (“themes you’re exploring”)

### Journey C: Deep Dive (10–15 minutes)

1. User chooses theme: “Anger”, “Purpose”, “Relationships”, “Discipline”
2. App offers structured exploration:

   * framing
   * contrasting viewpoints (without naming texts)
   * journaling ladder: “What do you believe?” → “What’s the cost?” → “What’s another view?”

### Journey D: Audio Mode

1. Toggle “Narrate”
2. Response comes with calm narration + pauses
3. User can adjust pace, voice, and “silence between paragraphs”

---

## 6) Product Principles

* **Grounded, not generic:** every response anchored in retrieved passages (RAG) or trained style.
* **Non-dogmatic:** offer perspectives, not commandments.
* **User-led:** the user’s situation is primary; wisdom is a mirror.
* **Safe and humble:** no medical/legal certainty; escalate when needed.
* **Privacy-first:** minimal collection; local-first journaling by default.

---

## 7) Features

## 7.1 MVP Features (must-have)

### 1) Conversational Guidance

* Input: free text question
* Output: structured response:

  * **Guidance**
  * **Reflection questions**
  * **Micro-practice**
  * “Save Insight” button

### 2) RAG Knowledge Grounding (recommended for MVP)

* Retrieve relevant passages from corpus
* Generate guidance using those passages as context
* Keep **internal traceability** (which passages were used) even if UI doesn’t show it

### 3) Personalization (lightweight, safe)

* User preferences:

  * tone (Practical/Poetic/Minimal/Deep)
  * intensity (gentle/direct)
  * style (more questions vs more statements)
* Memory that is **non-sensitive**:

  * preferred themes
  * preferred practices
  * writing style
* Journaling stored **locally by default** (cloud sync optional later)

### 4) Text-to-Speech Narration

* Use device TTS initially (iOS/Android built-ins)
* Controls:

  * voice selection
  * speed
  * optional background silence/pause
* “Audio-only session mode”

### 5) Safety Layer

* Disallow medical diagnosis, self-harm encouragement, or coercive advice
* If user expresses crisis:

  * supportive message
  * encourage contacting local emergency / trusted person
  * optionally show region-based resources (configurable)

### 6) Donations

* Simple donation link / IAP “tip jar”
* Transparent message: supports hosting + curation
* No paywall for core experience

---

## 7.2 V1+ Enhancements (nice-to-have)

* Theme library (“Paths”): short guided programs (7 days on Anxiety, Purpose, Discipline)
* “Wisdom remix”: same answer in 3 tones (Practical vs Poetic vs Minimal)
* “Contrasts”: present two different philosophical framings for the same issue
* “Practice generator”: breath, self-inquiry, compassion, action plan
* Community prompts (non-social feed): curated weekly question
* Optional: citations view (hidden behind “show sources” toggle for trust)

---

## 8) RAG vs Fine-tuning: Product Behavior & Output Differences

### Approach A: RAG (MVP recommended)

**How it feels to the user:** Responses feel relevant, specific, and less hallucinated.
**How it works:** Retrieve passages → LLM composes guidance.

**Example**
User: “I feel stuck and unmotivated. What should I do?”

* RAG output style:

  * “You’re not broken; inertia is natural when the mind is clinging to outcomes…”
  * “Try shifting from ‘big purpose’ to ‘right action today’…”
  * Reflection: “What outcome are you afraid won’t happen?”
  * Practice: 60-second “smallest next step” ritual
* Internally: logged passages about action/duty, detachment, discipline, mind training.

**Pros:** best grounding, easiest to update corpus, lower risk
**Cons:** needs retrieval infra; quality depends on corpus + chunking + prompts

### Approach B: Fine-tuning (later)

**How it feels:** More consistent voice, more “native wisdom tone” even without retrieval.
**How it works:** Train on style + Q/A pairs + “wisdom coaching” examples.

**Example**
User: same question.

* Fine-tuned output style:

  * More poetic and consistent voice
  * But may generalize or drift if it can’t recall specifics precisely

**Pros:** strong tone + consistent behavior
**Cons:** harder to update, risk of “confident wrongness” without grounding unless combined with RAG

**Recommendation:** **Start with RAG**, then consider **fine-tuning for tone** (not facts), keeping RAG for grounding.

---

## 9) Content Strategy & Curation Pipeline

### 9.1 Corpus Scope (initial)

* Indic: Vedas (select hymns), principal Upanishads, Bhagavad Gita, Yoga Sutras, some Dharma / Itihasa extracts (carefully chosen)
* Cross-tradition “wisdom adjacency” (optional): Tao Te Ching, Dhammapada, Stoics
  **Important:** avoid modern copyrighted translations unless licensed; use public-domain sources or your own translation/paraphrase pipeline.

### 9.2 Ingestion & Organization

**Pipeline stages**

1. Acquire text (download/export preferred; scraping only if permitted)
2. Normalize:

   * clean HTML
   * remove navigation/ads
   * keep chapter/verse metadata if available
3. Segment into chunks (e.g., 200–500 tokens) with:

   * theme tags (action, fear, desire, self, duty, compassion, impermanence)
   * tone tags (poetic, direct)
4. Quality checks:

   * duplicates
   * broken encodings
   * translation provenance
5. Index embeddings in vector store

### 9.3 Automation Guidance

* Prefer **official dumps/APIs/exports** where possible.
* If using browser automation (like “Comet” style tools):

  * treat it as scraping
  * respect robots.txt + rate limits
  * avoid aggressive crawling
  * keep an internal ledger of sources + permissions
* If any site’s terms restrict automated bulk copying, **don’t automate from that site**—use alternatives or get permission.

---

## 10) System Architecture (MVP)

### Client (Mobile)

* Chat UI + session cards
* Local journal storage (SQLite or local encrypted store)
* TTS (native)
* Offline mode (optional later): cached sessions + saved insights

### Backend (Minimal)

* Auth (optional in MVP; can be anonymous)
* RAG service:

  * query → embed → retrieve topK → generate response
* Observability:

  * logging of retrieval IDs + safety flags (no raw journals by default)

### Data Stores

* Vector DB: pgvector / Pinecone / Weaviate (your choice)
* Text store: Postgres for canonical chunks + metadata
* Analytics: privacy-respecting events (PostHog/self-host)

---

## 11) Personalization Design (Safe + Useful)

### What we personalize

* Tone + length
* Preferred practices (breathwork, inquiry questions, action steps)
* Recurring themes (e.g., “anxiety”, “discipline”)

### What we avoid storing by default

* Sensitive mental health details
* Sexual content
* Deep personal identity attributes

### Memory model

* **Local-first profile**
* Optional cloud sync opt-in
* “Forget / delete my data” controls

---

## 12) Safety, Ethics, and Guardrails

* Positioning: “Reflective guidance, not professional advice”
* Crisis detection: self-harm / suicide ideation triggers a safe response pattern
* Avoid coercion: never say “you must” or “this is the truth”
* Encourage agency: offer options and reflection
* Hallucination control:

  * RAG grounding required for substantive claims
  * if retrieval confidence low: ask clarifying question or give a minimal response

---

## 13) Non-Functional Requirements

* Latency target: < 2.5s typical response, < 6s worst-case
* Cost target: scalable; cache embeddings; compress context
* Reliability: graceful degradation (if retrieval fails → minimal coaching template)
* Privacy/security: encryption at rest; minimal PII; GDPR/FADP-friendly by design

---

## 14) Rollout Plan

### Phase 0 (1–2 weeks)

* Corpus MVP: 10–20 curated themes, 300–1000 chunks
* Prototype RAG + chat UI
* Internal testing

### Phase 1 (MVP Beta)

* Onboarding + daily ritual
* Save insights + local journal
* Native TTS
* Donation link

### Phase 2 (V1)

* Theme packs (“7-day paths”)
* Improved tagging + feedback loop
* Optional citations toggle

---

## 15) Open Questions / Decisions (record here)

* Do we allow cross-tradition blending at launch or start purely Indic?
* How “invisible” are sources? (Fully hidden vs “Show sources” for trust)
* Anonymous mode vs sign-in for sync
* Voice: native TTS only vs premium neural voices later

---

## 16) Risks & Mitigations

* **Content licensing risk:** only use public domain or licensed translations; keep provenance.
* **Hallucination risk:** enforce retrieval grounding; low-confidence fallback.
* **Cultural/religious sensitivity:** neutral tone; “perspectives” framing; opt-out for certain traditions.
* **User dependency risk:** encourage reflection + agency, not “AI guru authority.”

---

If you want, I can also generate:

1. A **clickable app sitemap**,
2. A **prompting spec** (system prompts, safety prompts, RAG templates), and
3. A **data schema** for chunks/metadata + a minimal ingestion script blueprint (non-code or code).
