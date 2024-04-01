"use client";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ResultWithSources from "../components/ResultWithSources";
import "../globals.css";

const Memory = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi there! What's your name and favorite food?",
    },
  ]);
  const [firstMsg, setFirstMsg] = useState(true);

  const handleSubmitPrompt = async () => {
    try {
      setMessages((prev) => [
        ...prev,
        {
          text: prompt,
          type: "user",
          sourceDocuments: null,
        },
      ]);

      const response = await fetch("/api/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: prompt,
          firstMsg,
        }),
      });

      setFirstMsg(false);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const searchRes = await response.json();
      setPrompt("");

      setMessages((prev) => [
        ...prev,
        {
          text: searchRes.output.response,
          type: "bot",
          sourceDocuments: null,
        },
      ]);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <Title headingText="Memory" emoji="🧠" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="I remember everything"
              boldText="Let's see if it can remember your name and favourite food. This tool will let you ask anything contained in a PDF document. "
              description="This tool uses Buffer Memory and Conversation Chain.  Head over to Module X to get started!"
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="brain" />
            <PromptBox
              prompt={prompt}
              error={error}
              handleSubmit={handleSubmitPrompt}
              handlePromptChange={handlePromptChange}
            />
          </>
        }
      />
    </>
  );
};

export default Memory;
