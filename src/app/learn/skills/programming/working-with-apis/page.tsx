import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Working with APIs — Programming | Cyberussell", description: "APIs connect your app to the internet. What they are, why they matter, and how to use them with AI assistance.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/working-with-apis" }, openGraph: { title: "Working with APIs | Cyberussell", description: "What APIs are and how to use them in your apps with AI assistance.", url: "https://www.cyberussell.com/learn/skills/programming/working-with-apis", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="5" lessonTotal="7"
      title="Working with APIs"
      subtitle="APIs are how software talks to other software. Once you understand them, your apps can do almost anything."
      tags={["APIs", "Integration"]}
      readTime="10 min"
      objective="Understand what an API is and use one in a simple project — with Claude writing the integration code."
      sections={[
        { heading: "What an API Actually Is", body: "API stands for Application Programming Interface. In simple terms: it's a way for one piece of software to talk to another.\n\nWhen your food delivery app shows you a map, it's using Google Maps' API. When you log in with Facebook, that website is using Facebook's API. When your e-commerce site processes a payment, it's using Stripe's API.\n\nAPIs let your apps use features and data from other services without building those features yourself." },
        { heading: "How APIs Work (Without the Jargon)", items: [
          { title: "Request", desc: "Your app sends a message to another service: 'Hey, give me today's weather in Manila.' This is an API request. It includes what you want (the endpoint), and sometimes authentication (an API key that proves you're allowed to ask)." },
          { title: "Response", desc: "The other service replies with data, usually in JSON format. JSON looks like: `{\"city\": \"Manila\", \"temperature\": 32, \"condition\": \"sunny\"}`. Your app takes this data and displays it to the user." },
          { title: "API key", desc: "Most APIs require you to create an account and get a secret key. This key authenticates your requests. Treat API keys like passwords — never share them publicly or include them in public code." },
        ] },
        { heading: "Useful APIs for Beginners", items: [
          { title: "OpenWeather API (free)", desc: "Get current weather data for any city. Good first API project: a weather app that shows current conditions based on a city name the user types." },
          { title: "Anthropic Claude API", desc: "Add Claude's intelligence to your apps. Build a custom chatbot, a content generator, or any tool that uses AI. This is the API behind Claude itself — available to developers." },
          { title: "Open Exchange Rates (free)", desc: "Get currency conversion rates. Build a currency converter app with real-time rates." },
          { title: "News API (free tier)", desc: "Get the latest news headlines from any topic or country. Build a news aggregator for a specific niche." },
        ] },
      ]}
      promptText={`Help me add an API to my app. I want to use the [name of API] to [describe what you want to do with it]. My app currently does: [describe what your app does]. Steps I need help with: 1) How to sign up and get an API key for this specific API, 2) The JavaScript code to make a request to this API and get the data I need, 3) How to display the API response data in my app's HTML, 4) What to do if the API request fails (error handling). Write the code for a single HTML file that demonstrates this API integration working.`}
      checklistItems={["I understand what an API is in plain language and can explain it to someone else", "I've signed up for at least one free API and received an API key", "I've used Claude to write code that makes an API request and displays the response", "I know not to include API keys in publicly shared code"]}
      reflectText={`Almost every useful software feature you've ever used is built on top of someone else's API. <span class="text-white font-bold">What feature in your dream app would require connecting to an external service — and does an API for that service exist?</span>`}
      takeaways={["APIs let your apps use data and features from other services without building them yourself.", "Every API interaction is: send a request → get a response in JSON → display the data.", "API keys are passwords. Never commit them to public code repositories.", "Claude can write every line of API integration code — you just need to know which API to use and what data you need."]}
      challengeTitle="Build a weather app using the OpenWeather API."
      challengeBody="Sign up for a free account at openweathermap.org. Get your API key. Open Claude and say: 'Build me a weather app in a single HTML file. It should have a text field where I enter a city name, a button to fetch the weather, and a display showing the temperature and conditions. Use the OpenWeather API. My API key is [your key].' Copy the code, open it in your browser, and see your first API integration work."
      nextTitle="Debugging with AI"
      nextHref="/learn/skills/programming/debugging-with-ai"
      nextMeta="Programming · Lesson 6 of 7 · 10 min"
    />
  );
}
