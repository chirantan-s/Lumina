
import { DailyContent, Role } from "../types";

// --- CONTENT MODULES ---

const PRODUCTIVITY_DAY_1: DailyContent = {
    dayTitle: "Prompt Engineering & The 80/20 Rule",
    visualConcept: "A visualization of 'The Pareto Principle' applied to cognitive labor: AI handling the 80% repetitive drafting, leaving the 20% high-value refinement to the human.",
    sections: [
        {
            header: "The Blank Page Problem",
            body: "The biggest productivity killer is the 'Blank Page'. Starting a document, email, or strategy deck from zero requires high activation energy. \n\nAI is the ultimate 'First Draft' engine. Your goal isn't to get the AI to do the job perfectly; it's to get it to do the *first 80%* instantly. \n\n**Shift your mindset:** Don't treat AI as an oracle (asking it for truth). Treat it as an intern (asking it for labor). Give it a messy braindump and ask for structure. The time saved is in the *drafting*, not the *thinking*."
        },
        {
            header: "The CO-STAR Framework",
            body: "To get high-quality output, you must structure your prompts. Use the **CO-STAR** framework: \n\n1. **C**ontext: Who is the AI? (e.g., 'You are a Senior Copywriter') \n2. **O**bjective: What is the task? \n3. **S**tyle: Professional, witty, concise? \n4. **T**one: Empathetic, authoritative? \n5. **A**udience: Who is reading this? \n6. **R**esponse: Format (Table, List, JSON). \n\nUsing this structure moves you from 'Average' outputs to 'Expert' outputs immediately."
        },
        {
            header: "Context Caching (Mental Model)",
            body: "If you find yourself explaining the same thing to ChatGPT/Gemini every day (e.g., your company's tone of voice), you are wasting tokens and time. \n\nCreate a 'System Prompt' file on your desktop. Paste this at the start of every session. It should contain your role, your constraints, and your preferences. This 'primes' the context window so you hit the ground running every time."
        }
    ],
    deepDive: {
        title: "The Context Window Buffer",
        explanation: "Think of the AI's memory (Context Window) as a sliding work bench. If you fill it with clear instructions first, everything placed on the bench later gets processed correctly.",
        visualSteps: [
            { id: "1", label: "System Prompt", subLabel: "The Rules", type: "input" },
            { id: "2", label: "User Task", subLabel: "The Braindump", type: "input" },
            { id: "3", label: "LLM Processing", subLabel: "Pattern Matching", type: "process" },
            { id: "4", label: "Draft Output", subLabel: "The 80%", type: "output" },
            { id: "5", label: "Human Edit", subLabel: "The 20% Polish", type: "decision" }
        ]
    },
    practicalTask: {
        title: "Create Your 'Master Prompt'",
        description: "Build a reusable prompt snippet to save hours next week.",
        actionItems: [
            "Identify a recurring task (e.g., 'Weekly Status Update').",
            "Write a CO-STAR prompt for it.",
            "Save it in a note-taking app. Use it tomorrow."
        ]
    },
    quiz: [
        {
            question: "What is the primary productivity value of AI?",
            options: ["It replaces the need for thinking", "It eliminates the 'Blank Page' friction", "It is always 100% accurate"],
            correctIndex: 1,
            explanation: "AI excels at generating the first draft, overcoming the inertia of starting from scratch."
        },
        {
            question: "What does the 'C' in CO-STAR stand for?",
            options: ["Constraint", "Context", "Creative"],
            correctIndex: 1,
            explanation: "Context sets the persona and background for the model (e.g., 'Act as a Senior Editor')."
        },
        {
            question: "Why should you save a 'System Prompt'?",
            options: ["To save hard drive space", "To prime the AI with your preferences instantly", "To prevent the AI from learning"],
            correctIndex: 1,
            explanation: "Priming the context window ensures consistent outputs without re-typing instructions every time."
        },
        {
            question: "If an AI task takes less than 2 minutes to generate and review, what is the best workflow?",
            options: ["Delegate it to a junior", "Add it to your backlog", "Do it immediately to keep context clear"],
            correctIndex: 2,
            explanation: "The '2 Minute Rule' applies to AI too; immediate execution clears mental overhead."
        },
        {
            question: "When using AI for a first draft, what is the most dangerous assumption?",
            options: ["Assuming the tone is perfect", "Assuming facts are correct without verification", "Assuming it used too many tokens"],
            correctIndex: 1,
            explanation: "AI models can hallucinate. Always verify facts, dates, and numbers in the draft."
        }
    ],
    summary: "We focused on using AI as a 'First Draft' engine to eliminate activation energy. We introduced the CO-STAR framework for prompting and the concept of Context Priming."
};

const BUSINESS_DAY_1: DailyContent = {
    dayTitle: "The Economics of Artificial Intelligence",
    visualConcept: "A supply-demand curve shifting dramatically as the 'Cost of Prediction' drops to near zero, creating new market equilibrium.",
    sections: [
        {
            header: "The Drop in Prediction Costs",
            body: "To understand the business impact of AI, we must look at economics, not technology. When the cost of a foundational input drops, we use more of it. Computers caused the cost of 'Arithmetic' to drop, so we applied arithmetic to everything (accounting, photography, email). \n\nGenerative AI causes the cost of 'Prediction' to drop. Prediction is simply using information you have to generate information you don't have. Previously, high-quality prediction (e.g., 'Will this loan default?', 'What is the perfect email response?') required expensive human experts. Now, the cost is approaching ₹0.01 per token. As a business leader, your job is to identify where your organization is limiting its growth because prediction is currently too expensive or scarce."
        },
        {
            header: "Automation vs. Augmentation: The Indian Context",
            body: "In Western markets, AI is often framed as labor replacement. In the Indian context, given our scale, it is about 'Capacity Augmentation'. \n\nConsider a Relationship Manager (RM) handling High Net-worth Individuals (HNIs). An RM can effectively manage perhaps 100 clients. If you have 10 Lakh emerging affluent users, you cannot hire 10,000 RMs. It breaks the P&L. \n\nAI allows you to give the 'RM Experience' to the mass market. An AI Copilot can analyze a user's portfolio and draft a hyper-personalized investment strategy in seconds. The human RM reviews it (Augmentation) rather than writing it from scratch. This doesn't replace the RM; it allows one RM to serve 1,000 clients effectively, unlocking revenue from segments previously deemed 'unprofitable'."
        },
        {
            header: "The Judgment Trap",
            body: "As machines get better at prediction, the value of the complementary human skill—Judgment—increases. Judgment is determining *what* to predict and *what to do* with the prediction. \n\nFor example, an AI can predict with 99% accuracy that a transaction is fraudulent (Prediction). But should you block it instantly and risk insulting a loyal customer, or call them to verify? That is a trade-off (Judgment). In a world of cheap prediction, the leaders who thrive are those with superior judgment on how to configure the AI's risk/reward parameters."
        }
    ],
    deepDive: {
        title: "The AI Value Chain",
        explanation: "Value is created when Prediction (AI) is coupled with Judgment (Strategy). The loop ensures that every outcome improves the next prediction.",
        visualSteps: [
            { id: "1", label: "Data Input", subLabel: "Raw Signals", type: "input" },
            { id: "2", label: "Prediction Engine", subLabel: "AI Model", type: "process" },
            { id: "3", label: "Human Judgment", subLabel: "Risk Assessment", type: "decision" },
            { id: "4", label: "Action", subLabel: "Intervention/Auto", type: "output" },
            { id: "5", label: "Feedback Loop", subLabel: "Learning", type: "storage" }
        ]
    },
    practicalTask: {
        title: "Identify Your Prediction Bottleneck",
        description: "Apply the economics of AI to your own workflow. Where is 'expensive prediction' slowing you down?",
        actionItems: [
            "List 3 decisions you make daily that require analyzing data (e.g., 'Is this lead qualified?', 'Is this email urgent?').",
            "Estimate how much time you spend gathering context for these decisions vs. actually deciding.",
            "Draft a 1-sentence prompt that could help an AI gather that context for you."
        ]
    },
    quiz: [
        {
            question: "According to the economic view, what cost does AI reduce?",
            options: ["The cost of Arithmetic", "The cost of Prediction", "The cost of Storage"],
            correctIndex: 1,
            explanation: "Just as computers reduced the cost of arithmetic, AI reduces the cost of using existing data to generate missing information (prediction)."
        },
        {
            question: "In the Indian context, what is the primary advantage of AI Augmentation?",
            options: ["Replacing all employees", "Reducing server costs", "Serving mass markets with high-touch experiences"],
            correctIndex: 2,
            explanation: "Augmentation allows limited human experts to serve a massive customer base, solving the scale vs. quality dilemma."
        },
        {
            question: "As prediction becomes cheap, what human skill becomes more valuable?",
            options: ["Judgment", "Data Entry", "Calculation"],
            correctIndex: 0,
            explanation: "When prediction is abundant, the ability to decide what to do with that prediction (Judgment) becomes the scarce and valuable asset."
        },
        {
            question: "Which data is most valuable for building a competitive AI advantage?",
            options: ["Public internet data", "Proprietary, unstructured data", "Generic textbook data"],
            correctIndex: 1,
            explanation: "Proprietary data (like internal call logs and memos) is unique to your business and forms the basis of a competitive moat."
        },
        {
            question: "In high-stakes business decisions, how should AI be configured?",
            options: ["Fully autonomous", "Human-in-the-loop", "Randomized"],
            correctIndex: 1,
            explanation: "For high-stakes decisions, the cost of error is high, so human judgment is required to validate the AI's prediction."
        }
    ],
    summary: "We analyzed AI through the lens of economics, defining it as a drop in the cost of Prediction. We explored how this enables 'Scale at Quality' for the Indian market and why human Judgment becomes the premium asset in an AI-abundant world."
};

const PRODUCT_DAY_1: DailyContent = {
    dayTitle: "Deterministic to Probabilistic Product Management",
    visualConcept: "A comparison of a rigid 'If-Then' flowchart vs. a probabilistic 'Cloud' where inputs map to outputs with varying degrees of confidence.",
    sections: [
        {
            header: "The Paradigm Shift",
            body: "Traditional software is 'Deterministic'. If a user clicks 'Save', the code executes `save()`. The output is binary: Success or Error. \n\nAI products are 'Probabilistic'. If a user asks 'Summarize this', the output varies. It might be great, it might be hallucinated, it might be mediocre. As a PM, you are no longer managing rigid logic; you are managing *probability distributions*.\n\nYour acceptance criteria shift from 'System shall do X' to 'System shall do X with 95% accuracy on this specific test set'."
        },
        {
            header: "Latency vs. Quality Trade-offs",
            body: "In traditional apps, we optimize for milliseconds. In GenAI, a high-reasoning response (like o1 or Gemini Pro) might take 10 seconds. \n\nProduct Strategy involves deciding where to hide this latency. Do you use 'Streaming' to show text as it generates? Do you use 'Optimistic UI'? Or do you downgrade to a smaller, faster model (like Gemini Flash) for features like autocomplete where speed > nuance? This trade-off matrix is your new PRD core."
        },
        {
            header: "The 'Vibe Check' vs. Evals",
            body: "A common trap for AI PMs is relying on the 'Vibe Check'—testing a prompt 5 times yourself and saying it works. \n\nTo build robust AI products, you need 'Evals': a dataset of 50-100 examples (Golden Data) that you run your prompt against automatically to score accuracy. Without Evals, you are shipping based on intuition, which fails at scale."
        }
    ],
    deepDive: {
        title: "The Probabilistic Loop",
        explanation: "The user input goes through a 'Black Box' (LLM). Unlike standard code, we cannot debug the box line-by-line; we can only adjust the inputs (Prompt) and constraints (Config).",
        visualSteps: [
            { id: "1", label: "User Intent", subLabel: "Vague Request", type: "input" },
            { id: "2", label: "Prompt Engineering", subLabel: "Context Injection", type: "process" },
            { id: "3", label: "LLM Inference", subLabel: "Probabilistic Gen", type: "decision" },
            { id: "4", label: "Guardrails", subLabel: "Safety Check", type: "decision" },
            { id: "5", label: "Response", subLabel: "Variable Output", type: "output" }
        ]
    },
    practicalTask: {
        title: "Draft an Eval Criteria",
        description: "Move from 'Vibe Check' to 'Eval'. Define success for a specific feature.",
        actionItems: [
            "Pick a feature (e.g., 'Summarize Meeting Notes').",
            "Define 'Bad Output' (e.g., Missed action items, wrong tone).",
            "Write a prompt for an LLM *Judge* that could score the output from 1-5."
        ]
    },
    quiz: [
        {
            question: "What is the core difference between traditional software and AI?",
            options: ["Code vs No-Code", "Deterministic vs Probabilistic", "Cloud vs Local"],
            correctIndex: 1,
            explanation: "Traditional software always yields the same output for an input. AI deals in probabilities and varying confidence levels."
        },
        {
            question: "Why is 'Vibe Checking' dangerous for AI PMs?",
            options: ["It takes too long", "It doesn't account for edge cases at scale", "AI doesn't have vibes"],
            correctIndex: 1,
            explanation: "Testing a few times manually does not reveal how the model performs on a diverse, large-scale dataset."
        },
        {
            question: "In the context of AI, what is an 'Eval'?",
            options: ["A performance review", "A systematic test of model outputs against a golden dataset", "The cost of the API"],
            correctIndex: 1,
            explanation: "Evals are the unit tests of the AI world, allowing you to measure accuracy objectively."
        },
        {
            question: "How should users perceive the AI feature?",
            options: ["As a Source of Truth", "As a Tool/Assistant", "As a Search Engine"],
            correctIndex: 1,
            explanation: "Positioning AI as an Assistant manages user expectations regarding potential hallucinations or errors."
        },
        {
            question: "What is the most critical UI element for an AI product to improve over time?",
            options: ["Dark Mode", "Feedback Mechanisms (Thumbs Up/Down)", "Voice Input"],
            correctIndex: 1,
            explanation: "Explicit user feedback provides the 'ground truth' data needed to refine the model and prompts over time."
        }
    ],
    summary: "We explored the shift from Deterministic to Probabilistic product management, highlighting the need for managing uncertainty, trading off latency for quality, and implementing rigorous Evals over manual testing."
};

const DEVELOPER_DAY_1: DailyContent = {
    dayTitle: "LLM Architecture: Beyond the API Call",
    visualConcept: "Visualizing the 'Context Window' not as memory, but as a limited sliding buffer where tokens compete for attention mechanism.",
    sections: [
        {
            header: "It's Just Next-Token Prediction",
            body: "At its core, an LLM is a function `P(next_token | context)`. It doesn't 'know' things; it estimates the probability of the next chunk of text based on the patterns it saw during training. \n\nAs a developer, this means 'Prompt Engineering' is actually 'Context Shaping'. You are constructing a probability distribution. If you want JSON output, you must shape the context so that a `{` is the most probable next token."
        },
        {
            header: "The Stateless Nature & The Context Window",
            body: "LLMs are stateless. They don't remember your previous request. Every time you chat, you are sending the *entire* conversation history back to the model. \n\nThis introduces the 'Context Window' constraint (e.g., 128k tokens). If your history exceeds this, you must truncate or summarize. Managing this context window—deciding what to keep and what to discard—is 80% of the engineering work in building chatbots."
        },
        {
            header: "Temperature: Controlling Entropy",
            body: "The `temperature` parameter (0.0 to 1.0) controls randomness. \n\n- Low Temp (0.1): The model picks the most likely token. Good for coding, JSON, and factual answers. \n- High Temp (0.8): The model samples from a wider range of tokens. Good for creative writing. \n\nIf your JSON parser is failing, your temperature is likely too high."
        }
    ],
    deepDive: {
        title: "The Inference Request Lifecycle",
        explanation: "Trace a request from the user to the model and back. Note that the 'Memory' is actually just a database query appended to the prompt.",
        visualSteps: [
            { id: "1", label: "User Msg", subLabel: "Current Input", type: "input" },
            { id: "2", label: "DB Fetch", subLabel: "Retrieve History", type: "storage" },
            { id: "3", label: "Context Assembly", subLabel: "System + History + User", type: "process" },
            { id: "4", label: "Tokenization", subLabel: "Text -> Ints", type: "process" },
            { id: "5", label: "Inference", subLabel: "Next Token Loop", type: "output" }
        ]
    },
    practicalTask: {
        title: "Debug a Hallucination",
        description: "Analyze why a model might fail to follow instructions.",
        actionItems: [
            "Review a prompt where the model ignored a constraint (e.g., 'Reply in 5 words').",
            "Check where the instruction was placed. (Tip: Instructions at the *end* of the prompt often work better due to Recency Bias).",
            "Rewrite the prompt moving the core constraint to the very end."
        ]
    },
    quiz: [
        {
            question: "What does it mean that LLMs are 'Stateless'?",
            options: ["They have no database", "They don't remember previous requests automatically", "They cannot run on servers"],
            correctIndex: 1,
            explanation: "The model resets after every request. The 'memory' is an illusion created by the developer sending the full history every time."
        },
        {
            question: "If you need deterministic, consistent code output, what Temperature should you use?",
            options: ["0.0 - 0.2", "0.5 - 0.7", "0.9 - 1.0"],
            correctIndex: 0,
            explanation: "Low temperature minimizes randomness, forcing the model to pick the most probable token."
        },
        {
            question: "What is the Context Window?",
            options: ["The UI of the chat", "The limit on how much text the model can process at once", "The time it takes to respond"],
            correctIndex: 1,
            explanation: "The Context Window is the maximum number of tokens (input + output) the model can handle in a single turn."
        },
        {
            question: "What is a 'Prompt Injection' attack?",
            options: ["Injecting SQL code", "A user input that overrides system instructions", "Sending too many requests"],
            correctIndex: 1,
            explanation: "Prompt injection occurs when user input tricks the model into ignoring its original instructions and following malicious ones."
        },
        {
            question: "Why is 'Streaming' preferred over waiting for the full response?",
            options: ["It is cheaper", "It reduces perceived latency", "It increases accuracy"],
            correctIndex: 1,
            explanation: "Streaming shows tokens as they are generated, keeping the user engaged and making the system feel faster."
        }
    ],
    summary: "We deconstructed the LLM as a stateless probability engine. We covered context window management, the impact of Temperature on entropy, and the mechanics of token prediction."
};

const CXO_DAY_1: DailyContent = {
    dayTitle: "Strategic AI: Moats and Capital Allocation",
    visualConcept: "A visualization of the 'Smile Curve' of value, showing how value shifts from the middle (middleware/wrappers) to the edges (proprietary data and end-user distribution).",
    sections: [
        {
            header: "The 'Thin Wrapper' Risk",
            body: "Many initial AI startups are 'Thin Wrappers'—simple UIs on top of Gemini or OpenAI. These have zero defensibility. As a leader, you must ensure your internal AI projects aren't just wrappers. \n\nTrue value comes from: \n1. **Proprietary Data**: Fine-tuning models on data only you have. \n2. **Workflow Integration**: embedding AI so deeply into your ERP/CRM that removing it is painful. \n3. **Distribution**: Owning the customer relationship."
        },
        {
            header: "Build vs. Buy vs. Fine-tune",
            body: "The Capital Allocation question: \n\n- **Buy (SaaS)**: For commodity tasks (HR chatbots, meeting summaries). Zero maintenance, low differentiation. \n- **Prompt Engineering (Build)**: For 80% of custom use cases. Using off-the-shelf models (Gemini Pro) with clever context. High ROI. \n- **Fine-Tuning**: Training a model on your data. Expensive, high maintenance, but creates a moat. Only do this if the base model fails significantly."
        },
        {
            header: "ROI Measurement Gap",
            body: "Don't measure AI ROI solely by 'Headcount Reduction'. That is a defensive metric. \n\nMeasure 'Velocity' and 'Quality'. \n- Not 'We fired 5 support agents'. \n- But 'We reduced resolution time from 48h to 5m, increasing retention by 10%'. \nRevenue impact > Cost savings."
        }
    ],
    deepDive: {
        title: "The AI Moat Framework",
        explanation: "Models are becoming commodities. The moat is no longer the algorithm; it is the System of Record and the Feedback Loop.",
        visualSteps: [
            { id: "1", label: "Commodity Model", subLabel: "Gemini/GPT", type: "input" },
            { id: "2", label: "Your Data", subLabel: "The Moat", type: "storage" },
            { id: "3", label: "Context Engine", subLabel: "RAG System", type: "process" },
            { id: "4", label: "User Workflow", subLabel: "Stickiness", type: "output" },
            { id: "5", label: "New Data Gen", subLabel: "Loop closes", type: "storage" }
        ]
    },
    practicalTask: {
        title: "Audit Your Portfolio",
        description: "Review one planned AI initiative in your org.",
        actionItems: [
            "Classify it: Is it a Wrapper, a Workflow integration, or a Data play?",
            "Ask: 'If Google/Microsoft builds this feature into Workspace/Office tomorrow, does our project die?'",
            "If yes, shift focus to your proprietary data."
        ]
    },
    quiz: [
        {
            question: "Which type of AI application has the least defensibility?",
            options: ["Proprietary Fine-tuned Model", "Deep Workflow Integration", "Thin Wrapper UI"],
            correctIndex: 2,
            explanation: "Thin Wrappers capture little value because the underlying model provider or the incumbent software giant can replicate them easily."
        },
        {
            question: "When should you Fine-Tune a model?",
            options: ["Always, to own the IP", "Only when base models fail on your specific domain data", "To save money"],
            correctIndex: 1,
            explanation: "Fine-tuning is expensive and creates technical debt. Only do it when general models cannot perform the specific task well."
        },
        {
            question: "What is a better metric than 'Headcount Reduction'?",
            options: ["Server Uptime", "Business Velocity & Quality", "Number of Prompts written"],
            correctIndex: 1,
            explanation: "AI's biggest lever is allowing you to move faster and deliver higher quality service at scale, driving growth rather than just saving cost."
        },
        {
            question: "How does AI impact organizational structure (Talent Density)?",
            options: ["It increases middle management", "It flattens hierarchies, empowering individual contributors", "It requires more manual data entry"],
            correctIndex: 1,
            explanation: "AI empowers individuals to have the output capacity of small teams, often reducing the need for layers of middle management."
        },
        {
            question: "What is the biggest barrier to AI adoption in large enterprises?",
            options: ["Lack of GPU compute", "Cultural inertia and data governance", "Model intelligence"],
            correctIndex: 1,
            explanation: "The technology is ready; the bottleneck is usually organizational change management and cleaning up internal data."
        }
    ],
    summary: "We focused on strategic defensibility, the Build/Buy framework, and avoiding the 'Thin Wrapper' trap. The key takeaway is leveraging proprietary data and workflow integration to build lasting moats."
};

const ARCHITECT_DAY_1: DailyContent = {
    dayTitle: "GenAI System Patterns: RAG & Agents",
    visualConcept: "A diagram contrasting a standard database query with a Vector Search mechanism, showing how semantic similarity bridges the gap between vague user intent and structured data.",
    sections: [
        {
            header: "The Hallucination Problem",
            body: "LLMs are frozen in time. They don't know about your user's specific data or events that happened today. If you ask them, they might hallucinate. \n\nWe solve this architecturally via **RAG (Retrieval Augmented Generation)**. Instead of asking the model to *remember*, we provide it with a cheat sheet. \n\nArchitecture: \n1. User Query. \n2. Search your Database (Vector/SQL) for relevant context. \n3. Paste context into Prompt. \n4. Ask LLM to answer *only* using that context."
        },
        {
            header: "Vector Embeddings",
            body: "How do we find 'relevant context'? Keyword search fails for concepts. \n\nWe use **Embeddings**. We convert text into a vector (e.g., `[0.1, -0.5, 0.9...]`). Concepts that are semantically similar (e.g., 'Dog' and 'Puppy') are close together in this multi-dimensional space. This allows 'Semantic Search'—finding documents that match the *meaning* of the query, not just the words."
        },
        {
            header: "Agentic Workflows",
            body: "RAG is for *reading*. Agents are for *doing*. \n\nAn Agent is an LLM loop given access to 'Tools' (Functions). The LLM reasons: 'To answer this, I first need to call `getUserBalance()`, then if it's low, call `sendAlert()`'. \n\nArchitecting Agents requires robust error handling, as LLMs can get stuck in loops or call tools with invalid parameters."
        }
    ],
    deepDive: {
        title: "RAG Architecture Flow",
        explanation: "The standard pattern for enterprise GenAI. It decouples 'Reasoning' (LLM) from 'Knowledge' (Vector DB).",
        visualSteps: [
            { id: "1", label: "User Query", subLabel: "Input", type: "input" },
            { id: "2", label: "Embedder", subLabel: "Text -> Vector", type: "process" },
            { id: "3", label: "Vector DB", subLabel: "Semantic Search", type: "storage" },
            { id: "4", label: "Augmented Prompt", subLabel: "Query + Context", type: "process" },
            { id: "5", label: "LLM", subLabel: "Synthesis", type: "output" }
        ]
    },
    practicalTask: {
        title: "Design a Context Window Strategy",
        description: "You have a 50-page manual, but the context window only fits 10 pages.",
        actionItems: [
            "Propose a chunking strategy: Do you split by paragraph? By page?",
            "How much overlap should chunks have to preserve context?",
            "Draft the system prompt that tells the LLM: 'Answer using only the provided chunks. Say I dont know if not found'."
        ]
    },
    quiz: [
        {
            question: "What is the primary purpose of RAG?",
            options: ["To make the model faster", "To ground the model in private/recent data", "To lower the cost"],
            correctIndex: 1,
            explanation: "RAG provides the model with external, up-to-date, or private data to prevent hallucinations and enable domain-specific answers."
        },
        {
            question: "What allows searching by 'Meaning' rather than 'Keywords'?",
            options: ["SQL Indices", "Vector Embeddings", "Regular Expressions"],
            correctIndex: 1,
            explanation: "Embeddings map text to vectors, allowing mathematical calculation of semantic similarity."
        },
        {
            question: "In an Agentic workflow, what is a 'Tool'?",
            options: ["A physical wrench", "A function/API the LLM can decide to call", "The prompt editor"],
            correctIndex: 1,
            explanation: "Tools are defined APIs (like `sendEmail` or `queryDB`) that the LLM can invoke to perform actions in the real world."
        },
        {
            question: "Why combine Vector Search with Keyword Search (Hybrid Search)?",
            options: ["To increase latency", "To capture both exact matches and semantic concepts", "To save storage space"],
            correctIndex: 1,
            explanation: "Vector search is great for concepts but can miss exact part numbers or specific names; keyword search fills that gap."
        },
        {
            question: "What is 'Semantic Caching'?",
            options: ["Storing embeddings in RAM", "Caching the exact user query", "Caching answers for semantically similar queries to save tokens"],
            correctIndex: 2,
            explanation: "If a user asks 'How much is it?' and later 'What is the price?', semantic caching recognizes the similarity and serves the cached answer."
        }
    ],
    summary: "We defined the standard Enterprise AI architectures: RAG for grounding knowledge and Agents for executing actions, utilizing Vector Embeddings as the bridge between language and logic."
};

const HR_DAY_1: DailyContent = {
    dayTitle: "AI in the Talent Lifecycle: Beyond Efficiency",
    visualConcept: "A comparison of the traditional 'Funnel' recruitment model vs. an AI-driven 'Network' model where candidates are continuously matched to opportunities based on skills inference.",
    sections: [
        {
            header: "Skills Inference vs. Keyword Matching",
            body: "Legacy ATS (Applicant Tracking Systems) use keyword matching. If a CV says 'React', it matches. If it says 'Frontend Architecture', it might miss. \n\nGenAI enables **Skills Inference**. It can read a project description: 'Refactored the view layer to improve TTI by 40%' and infer skills: 'Performance Optimization', 'Web Vitals', 'Architecture'. This unlocks hidden talent in your internal mobility pool that standard search misses."
        },
        {
            header: "Bias in the Black Box",
            body: "AI models are trained on internet data, which contains historical biases. If you ask an AI to 'Write a JD for a Rockstar Developer', it might use masculine-coded language effectively discouraging female applicants. \n\nHR leaders must be the 'Human in the Loop'. You must audit the outputs. Do not use AI to *select* candidates (automated rejection) without extreme caution and transparency. Use it to *surface* candidates."
        },
        {
            header: "The Employee Experience (EX) Layer",
            body: "Employees struggle to find info: 'What is the maternity leave policy?', 'How do I claim LTA?'. They search the intranet, fail, and raise a ticket. \n\nAn internal HR Bot (trained via RAG on your policies) serves this instantly. This isn't just efficiency; it's dignity. Employees get instant, private answers to sensitive questions without feeling like they are bothering HR."
        }
    ],
    deepDive: {
        title: "The AI-Augmented Recruitment Flow",
        explanation: "AI shifts the recruiter's time from 'Screening' (low value) to 'Closing' (high value).",
        visualSteps: [
            { id: "1", label: "CV Ingestion", subLabel: "PDF/Text", type: "input" },
            { id: "2", label: "Skill Inference", subLabel: "LLM Analysis", type: "process" },
            { id: "3", label: "Blind Matching", subLabel: "Bias Removal", type: "decision" },
            { id: "4", label: "Recruiter Review", subLabel: "Human Judgment", type: "decision" },
            { id: "5", label: "Outreach", subLabel: "Personalized Email", type: "output" }
        ]
    },
    practicalTask: {
        title: "De-bias a Job Description",
        description: "Use AI to make your hiring more inclusive.",
        actionItems: [
            "Take an existing JD.",
            "Prompt the AI: 'Analyze this JD for gender-coded language or jargon that might exclude qualified candidates. Rewrite it to be more inclusive.'",
            "Compare the two versions."
        ]
    },
    quiz: [
        {
            question: "What is the advantage of Skills Inference over Keyword Matching?",
            options: ["It is faster", "It understands context and implied skills", "It is cheaper"],
            correctIndex: 1,
            explanation: "Inference understands that 'built a scalable backend' implies 'System Design', even if the keyword isn't explicitly there."
        },
        {
            question: "Why is 'Human in the Loop' critical for AI in HR?",
            options: ["To slow down the process", "To mitigate historical bias in models", "Because AI cannot read PDFs"],
            correctIndex: 1,
            explanation: "Models can perpetuate historical biases found in training data; human oversight is required to ensure fair hiring practices."
        },
        {
            question: "How does an HR Bot improve Employee Experience?",
            options: ["It forces them to read manuals", "It provides instant, private answers to policy questions", "It tracks their productivity"],
            correctIndex: 1,
            explanation: "It removes the friction of searching for documents or waiting for email replies for basic policy queries."
        },
        {
            question: "What is the most effective way to upskill employees on AI?",
            options: ["Generic mandated video courses", "Problem-centric learning (solve your own friction)", "Buying them a book"],
            correctIndex: 1,
            explanation: "Adult learners engage best when solving immediate problems. Teaching them to use AI to fix their own daily blockers is most effective."
        },
        {
            question: "Is it safe to put sensitive employee salary data into public chatbots?",
            options: ["Yes, they are secure", "No, never use public models for sensitive PII", "Only if you ask it not to remember"],
            correctIndex: 1,
            explanation: "Public models may use data for training. Sensitive PII must never be entered unless using an Enterprise-grade instance with Zero Data Retention."
        }
    ],
    summary: "We explored how AI transforms HR from administrative gatekeeping to strategic talent intelligence, focusing on skills inference, bias mitigation, and employee self-service."
};

// MAPPING LOGIC
export const getStaticContent = (role: Role, day: number, objective: string = '', expertise: number = 5): DailyContent | null => {
    if (day !== 1) return null; 

    const obj = objective.toLowerCase();

    // 1. Productivity Path (Overrides Role for Day 1 if primary goal is personal efficiency)
    if (obj.includes("productivity") || obj.includes("personal")) {
        return PRODUCTIVITY_DAY_1;
    }

    // 2. Role-Based Mapping
    switch (role) {
        case 'Business': 
        case 'CXO': 
            // If Business/CXO is purely technical focused (rare but possible), maybe give them Arch? 
            // For now, default to their specialized Strategy tracks.
            return role === 'CXO' ? CXO_DAY_1 : BUSINESS_DAY_1;
        
        case 'Product': 
            return PRODUCT_DAY_1;
        
        case 'Developer': 
            return DEVELOPER_DAY_1;
        
        case 'Architect': 
            return ARCHITECT_DAY_1;
        
        case 'HR': 
            return HR_DAY_1;
            
        default: 
            return BUSINESS_DAY_1; 
    }
};
