import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      hero: {
        badge: "Launch websites from a single prompt",
        title1: "Describe It.",
        title2: "Build It.",
        title3: "Ship It.",
        subheading: "From a single prompt to a live website. ZORVIQ writes the code, generates the content, and deploys — in seconds.",
        cta_primary: "Start Building Free",
        watch_demo: "See it in action",
        trusted: "Trusted by modern builders",
        editor: "zorviq.ai/editor",
        ready: "Your website is ready!",
        design_that: "Design that",
        inspires: "inspires.",
        design_desc: "We craft digital experiences that are bold, beautiful and built to perform.",
        preview: "Preview Website →",
        ai_assistant: "AI Assistant",
        online: "Online",
        greeting: "How can I help you today?",
        prompt: "Create a modern landing page for an AI startup"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
