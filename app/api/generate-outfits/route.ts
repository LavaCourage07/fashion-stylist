import { type NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  try {
    const { scenario, gender, style, weather, temperature } = await request.json()

    const prompt = `你是一位专业的首席穿搭师，请根据以下信息为用户推荐3套完整的穿搭方案：

活动场景：${scenario}
性别：${gender}
穿搭风格：${style}
天气：${weather}
温度：${temperature}°C

请为每套穿搭方案提供：
1. 一个炫酷有创意的标题
2. 详细的穿搭方案（上装、下装、鞋子、配饰，包含具体的色彩、材质、款式）
3. 搭配理念和介绍

最后给出一句温暖的祝福语，格式为"祝你拥有xx的一天"，其中xx要与场景或风格呼应。

请用JSON格式回复，结构如下：
{
  "outfits": [
    {
      "title": "标题",
      "items": {
        "top": "上装描述",
        "bottom": "下装描述", 
        "shoes": "鞋子描述",
        "accessories": "配饰描述"
      },
      "concept": "搭配理念"
    }
  ],
  "blessing": "祝福语"
}`


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || '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'}`,
        // Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://fashion-stylist.vercel.app",
        "X-Title": "Fashion Stylist",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    console.log("Raw AI response:", content)

    // 尝试解析JSON响应
    try {
      // 清理可能的markdown代码块标记
      const cleanContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      const parsedContent = JSON.parse(cleanContent)

      // 验证数据结构
      if (parsedContent.outfits && Array.isArray(parsedContent.outfits)) {
        return NextResponse.json(parsedContent)
      } else {
        throw new Error("Invalid data structure")
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.log("Content that failed to parse:", content)

      // 如果解析失败，返回默认结构
      return NextResponse.json({
        outfits: [],
        blessing: "祝你拥有美好的一天！",
        rawContent: content,
        error: "AI响应格式解析失败，请重试",
      })
    }
  } catch (error) {
    console.error("Error generating outfits:", error)
    return NextResponse.json({ error: "生成穿搭方案时出错，请稍后重试" }, { status: 500 })
  }
}
