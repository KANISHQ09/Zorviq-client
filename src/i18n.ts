import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      hero: {
        badge: "AI Website Builder",
        title1: "Build Stunning",
        title2: "Websites with",
        title3: "AI in Seconds.",
        subheading: "Describe your idea and our AI will design, write,\nand launch your website instantly.",
        cta_primary: "Start Building — It's Free",
        watch_demo: "Watch Demo",
        trusted: "Trusted by innovative teams",
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
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
