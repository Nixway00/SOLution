import { NextRequest, NextResponse } from 'next/server'

export interface AnalysisResult {
  signal: 'BUY' | 'SELL'
  reason: string
}

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct'
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'

if (!GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Convert image to base64
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')
    const imageDataUrl = `data:${imageFile.type};base64,${imageBase64}`

    // Call Groq API
    const groqResponse = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this trading chart image and decide: BUY or SELL. You must respond with ONLY a valid JSON object in this exact format: {"signal":"BUY","reason":"your reason here"} or {"signal":"SELL","reason":"your reason here"}. Do not include any other text, explanations, or formatting. Just the JSON object.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageDataUrl
                }
              }
            ]
          }
        ],
        max_tokens: 150,
        temperature: 0.1
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API error:', errorText)
      return NextResponse.json(
        { error: 'Analysis service unavailable' },
        { status: 500 }
      )
    }

    const groqData = await groqResponse.json()
    const content = groqData.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No analysis result received' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    let analysisResult
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{.*\}/s)
      const jsonString = jsonMatch ? jsonMatch[0] : content
      analysisResult = JSON.parse(jsonString)
    } catch (parseError) {
      console.error('Failed to parse Groq response:', content)
      return NextResponse.json(
        { error: 'Invalid analysis result format' },
        { status: 500 }
      )
    }

    // Validate the response structure
    if (!analysisResult.signal || !analysisResult.reason) {
      return NextResponse.json(
        { error: 'Invalid analysis result structure' },
        { status: 500 }
      )
    }

    if (!['BUY', 'SELL'].includes(analysisResult.signal)) {
      return NextResponse.json(
        { error: 'Invalid signal value' },
        { status: 500 }
      )
    }

    return NextResponse.json(analysisResult)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
