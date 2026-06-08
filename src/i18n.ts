import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      hero: {
        badge: "No-code AI website builder",
        title1: "AI Website Builder",
        title2: "From Prompt to Page.",
        title3: "Launch in Seconds.",
        subheading: "Create responsive no-code landing pages, portfolios, SaaS sites, and stores with ZORVIQ's AI website generator.",
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
