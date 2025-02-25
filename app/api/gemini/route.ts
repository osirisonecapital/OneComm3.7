import { NextRequest, NextResponse } from 'next/server';

// Define the expected response type
interface GeminiResponse {
  nameVibration: {
    number: number;
    description: string;
  };
  energyType: {
    name: string;
    description: string;
  };
  insights: string[];
  message: string;
}

// Define the request body structure
interface RequestBody {
  name: string;
  questionnaireResponses: Record<string, string>;
  nameVibration: {
    number: number;
    description: string;
  };
  energyType: {
    id: string;
    name: string;
    description: string;
    characteristics: string[];
    recommendations: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    const { name, questionnaireResponses, nameVibration, energyType } = body;
    
    // Get environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    const instructionStyle = process.env.GEMINI_INSTRUCTION_STYLE;
    const responseTone = process.env.GEMINI_RESPONSE_TONE;
    const responseFormat = process.env.GEMINI_RESPONSE_FORMAT;
    const outputStrategy = process.env.GEMINI_OUTPUT_STRATEGY;
    const integrationRule = process.env.GEMINI_INTEGRATION_RULE;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is not configured' },
        { status: 500 }
      );
    }
    
    // Construct the prompt for Gemini
    const prompt = `
      ${instructionStyle}
      ${responseTone}
      ${responseFormat}
      ${outputStrategy}
      ${integrationRule}
      
      Here is the data to work with:
      
      NAME: ${name}
      
      NAME VIBRATION: 
      Number: ${nameVibration.number}
      Description: ${nameVibration.description}
      
      ENERGY TYPE:
      Type: ${energyType.name}
      Description: ${energyType.description}
      
      QUESTIONNAIRE RESPONSES:
      ${Object.entries(questionnaireResponses)
        .map(([questionId, answer]) => `${questionId}: ${answer}`)
        .join('\n')}
      
      Based on this information, provide a personalized insight that goes deeper than what's already shown in the results card. Include subtle hints at pain points that our premium services could address without explicitly mentioning the upsell.
    `;
    
    // Call the Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate insights' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Parse the Gemini response
    let insights: GeminiResponse;
    try {
      // Extract the text content from the Gemini response
      const text = data.candidates[0].content.parts[0].text;
      
      // Try to parse the JSON from the response
      // The AI might return text with markdown formatting, so we need to extract just the JSON part
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0]);
      } else {
        // If parsing fails, create a structured response from the text
        insights = {
          nameVibration: nameVibration,
          energyType: {
            name: energyType.name,
            description: energyType.description,
          },
          insights: ["Deeper insights are currently unavailable."],
          message: "We're sorry, but we couldn't generate personalized insights at this time. Please try again later or consider our premium services for a more detailed analysis."
        };
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      // Fallback response
      insights = {
        nameVibration: nameVibration,
        energyType: {
          name: energyType.name,
          description: energyType.description,
        },
        insights: ["Deeper insights are currently unavailable."],
        message: "We're sorry, but we couldn't generate personalized insights at this time. Please try again later or consider our premium services for a more detailed analysis."
      };
    }
    
    return NextResponse.json(insights);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 