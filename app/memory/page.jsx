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

  const handleSubmitPrompt = async () => {};

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
            <ResultWithSources messages={[]} pngFile="brain" />
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
