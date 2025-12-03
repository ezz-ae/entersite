import { NextRequest, NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow-cx';

// Configuration for your deployed Vertex AI Agent
const PROJECT_ID = 'studio-7730943652-a28e0';
const LOCATION = 'us-central1';
const AGENT_ID = '1573986079533432832';
const LANGUAGE_CODE = 'en';

// Initialize the client (relies on Application Default Credentials)
const client = new SessionsClient({
  apiEndpoint: `${LOCATION}-dialogflow.googleapis.com`,
});

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    const sessionPath = client.projectLocationAgentSessionPath(
      PROJECT_ID,
      LOCATION,
      AGENT_ID,
      sessionId || 'default-session' // In prod, use unique user session IDs
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
        },
        languageCode: LANGUAGE_CODE,
      },
    };

    const [response] = await client.detectIntent(request);
    const result = response.queryResult;
    
    const agentText = result?.responseMessages?.[0]?.text?.text?.[0] || "I'm processing your request...";
    
    // Check if the agent has returned any parameters (structured data for site building)
    const parameters = result?.parameters;

    return NextResponse.json({
      text: agentText,
      parameters: parameters, // We will use this to trigger the site build if complete
      isEndInteraction: result?.match?.intent?.displayName === 'End Session' // Example logic
    });

  } catch (error) {
    console.error('Vertex AI Agent Error:', error);
    
    // Fallback for development if credentials aren't set up locally yet
    return NextResponse.json({ 
      text: "I'm simulating the agent response. What style would you like for your luxury villa site?",
      parameters: null 
    });
  }
}
