import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-pro",
        temperature: 0,
        maxRetries: 2,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const data = await llm.invoke([
      new HumanMessage("Give a joke")
    ]);

    // const agent = createReactAgent({
    //     llm,
    //     tools: [],
    //     prompt: ChatPromptTemplate.fromMessages([
    //         ["system", "You are a helpful assistant."],
    //     ]),
         
    // });


    // const data = await agent.invoke({
      
    //     messages: [
    //       {
    //         role: "user",
    //         content: "Give a joke",
    //       }
    //     ],
    // });

    return NextResponse.json({ message: data });
}