
import { GoogleGenAI, Type } from "@google/genai";
import { Curriculum, DailyContent, Role, UserState } from "../types";
import { getStaticContent } from "./staticContent";

const API_KEY = process.env.API_KEY || '';

const SYSTEM_INSTRUCTION = `You are Lumina, an Interactive AI Coach. 
Your Goal: Teach the user how to LEVERAGE AI in their specific context.
Directive: Theory is useless without practice. Always include a practical application.
Tone: Professional, Insightful, Action-Oriented.`;

const genAI = new GoogleGenAI({ apiKey: API_KEY });

const FAST_CONFIG = {
    temperature: 0.8,
    topK: 40,
    maxOutputTokens: 8192, 
};

interface UserInputs {
    role: string;
    objective: string;
    expertise: string;
    commitment: string;
    customContext?: string;
}

const cleanAndParse = (text: string) => {
    try {
        if (!text) return {};
        let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (e) {
        try {
            const first = text.indexOf('{');
            const last = text.lastIndexOf('}');
            if (first !== -1 && last !== -1) {
                return JSON.parse(text.substring(first, last + 1));
            }
        } catch (e2) {
            console.error("JSON Parse Failure", e2);
        }
        return null;
    }
}

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(fn, retries - 1, delay * 2);
    }
}

export const generatePersonaFromInputs = async (inputs: UserInputs): Promise<{ role: Role, personaName: string, expertise: number, personaDescription: string }> => {
    try {
      return await fetchWithRetry(async () => {
          const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            config: {
              ...FAST_CONFIG,
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING, enum: ['Business', 'Product', 'Developer', 'CXO', 'Architect', 'HR'] },
                  personaName: { type: Type.STRING },
                  expertise: { type: Type.INTEGER },
                  personaDescription: { type: Type.STRING }
                },
                required: ["role", "personaName", "expertise", "personaDescription"]
              }
            },
            contents: `User: Role=${inputs.role}, Objective=${inputs.objective}, Expertise=${inputs.expertise}. 
            Task: Create a persona name that reflects their OBJECTIVE. 
            Example: If Role=Business & Obj=Productivity, Name="The Efficiency Strategist".
            Description: 1 sentence on how this path achieves their specific objective.`
          });
      
          const result = cleanAndParse(response.text || "{}");
          return {
              role: result?.role || 'Business',
              personaName: result?.personaName || 'The Learner',
              expertise: result?.expertise || 1,
              personaDescription: result?.personaDescription || "Optimized learning path."
          };
      });
    } catch (error) {
      return { role: 'Business', personaName: 'The Strategist', expertise: 1, personaDescription: "System calibrated." };
    }
  };

export const generateCurriculum = async (role: Role, objective: string, expertise: number): Promise<Curriculum> => {
  try {
    return await fetchWithRetry(async () => {
        const response = await genAI.models.generateContent({
          model: "gemini-3-flash-preview",
          config: {
            ...FAST_CONFIG,
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                trackName: { type: Type.STRING },
                description: { type: Type.STRING },
                schedule: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      day: { type: Type.INTEGER },
                      title: { type: Type.STRING },
                      topic: { type: Type.STRING },
                    },
                    required: ["day", "title", "topic"]
                  }
                }
              },
              required: ["trackName", "description", "schedule"]
            }
          },
          contents: `Create a 4-week learning path for a ${role}. 
          PRIMARY OBJECTIVE: ${objective}.
          EXPERTISE LEVEL (1-10): ${expertise}.
          
          Constraints:
          - If Objective is 'Productivity', focus on tools, prompting, automation.
          - If Objective is 'Strategy', focus on ROI, moats, team structure.
          - If Objective is 'Building', focus on APIs, RAG, Agents.
          
          Generate Day 1-5 detailed schedule.`
        });
        
        const result = cleanAndParse(response.text || "{}");
        if (!result?.schedule) throw new Error("Invalid schedule");
        return result as Curriculum;
    });

  } catch (error) {
    // Fallback
    return {
        trackName: `${role} Acceleration Track`,
        description: "A specialized high-velocity learning path.",
        schedule: [
            { day: 1, title: "Foundations", topic: "AI Mental Models" },
            { day: 2, title: "Application", topic: "Use Cases" },
            { day: 3, title: "Strategy", topic: "Implementation" },
            { day: 4, title: "Advanced", topic: "Agentic Workflows" },
            { day: 5, title: "Future", topic: "Next Gen Models" }
        ]
    };
  }
};

export const generateDailyContent = async (user: UserState, dayTopic: string): Promise<DailyContent> => {
  
  // Buffer Check
  if (user.contentBuffer && user.contentBuffer.day === user.currentDay && user.contentBuffer.topic === dayTopic) {
      return user.contentBuffer.data;
  }

  // Static Content Fallback - For Day 1, ALWAYS use static to ensure zero latency.
  if (user.currentDay === 1) {
      const staticData = getStaticContent(user.role, 1, user.objective, user.expertiseLevel);
      if (staticData) {
          return staticData;
      }
  }

  try {
    return await fetchWithRetry(async () => {
        let calibration = "Standard.";
        if (user.lastQuizScore > 0) {
            if (user.lastQuizScore <= 60) calibration = "Simplify concepts. Use more analogies.";
            else if (user.lastQuizScore >= 90) calibration = "Deep dive. Focus on edge cases and nuance.";
        }

        const response = await genAI.models.generateContent({
          model: "gemini-3-flash-preview",
          config: {
            ...FAST_CONFIG,
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                dayTitle: { type: Type.STRING },
                visualConcept: { type: Type.STRING },
                sections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      header: { type: Type.STRING },
                      body: { type: Type.STRING }
                    }
                  }
                },
                deepDive: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    visualSteps: { 
                       type: Type.ARRAY, 
                       items: { 
                         type: Type.OBJECT,
                         properties: {
                            id: { type: Type.STRING },
                            label: { type: Type.STRING },
                            subLabel: { type: Type.STRING },
                            type: { type: Type.STRING, enum: ['input', 'process', 'decision', 'output', 'storage'] }
                         }
                       } 
                    }
                  }
                },
                practicalTask: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        actionItems: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                },
                quiz: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correctIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING }
                    }
                  }
                },
                summary: { type: Type.STRING }
              },
              required: ["dayTitle", "visualConcept", "sections", "deepDive", "practicalTask", "quiz", "summary"]
            }
          },
          contents: `
          GENERATE MODULE: Day ${user.currentDay} - "${dayTopic}"
          ROLE: ${user.role}
          OBJECTIVE: ${user.objective} (CRITICAL: Content must solve for this)
          EXPERTISE: ${user.expertiseLevel}/10
          CALIBRATION: ${calibration}
          
          REQUIREMENTS:
          1. Sections: High-signal, no fluff.
          2. Practical Task: Create a concrete, 5-minute exercise using ChatGPT/Claude/Gemini that helps them achieve '${user.objective}'. 
          3. Quiz: Generate exactly 5 scenario-based questions. They must be highly relevant to the ${user.role} role and ${user.objective}. Focus on 'application' (what would you do?) rather than 'definition' (what is it?).
          `
        });

        const parsed = cleanAndParse(response.text || "{}");
        if (!parsed || !parsed.sections) throw new Error("Invalid content structure received");
        return parsed as DailyContent;
    });

  } catch (error) {
    console.error("Content Gen Error:", error);
    return {
      dayTitle: "Module Unavailable",
      visualConcept: "System Maintenance",
      sections: [],
      deepDive: { title: "Error", explanation: "Retry later.", visualSteps: [] },
      practicalTask: { title: "System Check", description: "Please refresh.", actionItems: [] },
      quiz: [],
      summary: "Unavailable"
    };
  }
};
