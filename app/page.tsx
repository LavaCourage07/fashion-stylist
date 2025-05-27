"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Palette, Sun, Cloud, CloudRain, Snowflake, CloudDrizzle, Scissors, Wand2 } from "lucide-react"
import type { UserPreferences, OutfitResponse } from "../types"

const scenarios = [
  "工作通勤",
  "相亲约会",
  "海边度假",
  "朋友聚会",
  "商务会议",
  "休闲购物",
  "健身运动",
  "艺术展览",
  "音乐节",
  "咖啡约会",
  "家庭聚餐",
  "毕业典礼",
  "婚礼参加",
  "旅行出游",
  "夜店派对",
]

const genders = ["女性", "男性", "无性别认同", "不愿透露"]

const styles = [
  "休闲舒适",
  "正式商务",
  "甜酷混搭",
  "机能运动",
  "复古文艺",
  "简约极简",
  "浪漫甜美",
  "街头潮流",
  "优雅知性",
  "波西米亚",
  "朋克摇滚",
  "日系清新",
  "韩系时尚",
  "欧美大气",
  "中性帅气",
  "森系自然",
  "学院风格",
  "度假风情",
  "职场精英",
  "艺术前卫",
  "温柔淑女",
  "酷女孩风",
  "绅士风度",
  "运动活力",
]

const weatherOptions = [
  { value: "sunny", label: "晴天", icon: Sun },
  { value: "cloudy", label: "多云", icon: Cloud },
  { value: "overcast", label: "阴天", icon: CloudDrizzle },
  { value: "rainy", label: "雨天", icon: CloudRain },
  { value: "snowy", label: "雪天", icon: Snowflake },
]

const loadingSteps = [
  { icon: Palette, text: "正在分析你的风格偏好...", duration: 2000 },
  { icon: Scissors, text: "为你挑选最合适的单品...", duration: 3000 },
  { icon: Wand2, text: "施展时尚魔法，搭配中...", duration: 2000 },
  { icon: Sparkles, text: "最后的完美调整...", duration: 1500, maxProgress: 99 },
]

// 几何写意魔法棒Logo组件
const MagicWandLogo = ({ className = "w-6 h-6", animate = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
      style={{
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))",
      }}
    >
      {/* 魔法棒主体 - 斜向的优雅线条 */}
      <line
        x1="6"
        y1="18"
        x2="16"
        y2="8"
        stroke="url(#wandBody)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={animate ? "animate-pulse" : ""}
      />

      {/* 魔法棒顶端 - 钻石形状 */}
      <path
        d="M16 8 L18 6 L20 8 L18 10 Z"
        fill="url(#wandTip)"
        stroke="url(#wandTipStroke)"
        strokeWidth="1"
        className={animate ? "animate-pulse" : ""}
      />

      {/* 魔法粒子 - 小星星和圆点 */}
      <circle cx="12" cy="6" r="1" fill="url(#particle1)" opacity="0.8" className={animate ? "animate-ping" : ""} />
      <circle cx="20" cy="12" r="0.8" fill="url(#particle2)" opacity="0.6" className={animate ? "animate-pulse" : ""} />
      <circle cx="8" cy="10" r="0.6" fill="url(#particle3)" opacity="0.7" className={animate ? "animate-bounce" : ""} />

      {/* 魔法星星 */}
      <path
        d="M10 4 L10.5 5.5 L12 6 L10.5 6.5 L10 8 L9.5 6.5 L8 6 L9.5 5.5 Z"
        fill="url(#star1)"
        opacity="0.9"
        className={animate ? "animate-spin" : ""}
        style={{ transformOrigin: "10px 6px", animationDuration: "3s" }}
      />

      <path
        d="M21 15 L21.3 15.7 L22 16 L21.3 16.3 L21 17 L20.7 16.3 L20 16 L20.7 15.7 Z"
        fill="url(#star2)"
        opacity="0.8"
        className={animate ? "animate-spin" : ""}
        style={{ transformOrigin: "21px 16px", animationDuration: "2s", animationDirection: "reverse" }}
      />

      {/* 魔法棒握柄装饰 */}
      <circle cx="7" cy="17" r="1.5" fill="url(#handle)" opacity="0.6" />

      {/* 渐变定义 */}
      <defs>
        {/* 魔法棒主体渐变 */}
        <linearGradient id="wandBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* 魔法棒顶端渐变 */}
        <linearGradient id="wandTip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <linearGradient id="wandTipStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* 魔法粒子渐变 */}
        <radialGradient id="particle1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>

        <radialGradient id="particle2">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fb923c" />
        </radialGradient>

        <radialGradient id="particle3">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>

        {/* 星星渐变 */}
        <linearGradient id="star1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        <linearGradient id="star2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>

        {/* 握柄渐变 */}
        <radialGradient id="handle">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </radialGradient>
      </defs>
    </svg>
  </div>
)

export default function FashionStylist() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    scenario: "",
    gender: "",
    style: "",
    weather: "",
    temperature: 20,
  })
  const [customScenario, setCustomScenario] = useState("")
  const [customStyle, setCustomStyle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [outfits, setOutfits] = useState<OutfitResponse | null>(null)
  const [showingOutfits, setShowingOutfits] = useState<number>(0)

  // 模拟渐进式加载步骤
  useEffect(() => {
    if (!isLoading) return

    let currentStep = 0
    const totalSteps = loadingSteps.length

    const runStep = () => {
      if (currentStep >= totalSteps) return

      const step = loadingSteps[currentStep]
      setLoadingStep(currentStep)

      // 更新进度条 - 最后一步只到99%
      const isLastStep = currentStep === totalSteps - 1
      const stepProgress = isLastStep ? 99 : ((currentStep + 1) / totalSteps) * 100
      let currentProgress = (currentStep / totalSteps) * 100

      const progressInterval = setInterval(
        () => {
          currentProgress += isLastStep ? 1 : 2
          if (currentProgress >= stepProgress) {
            clearInterval(progressInterval)
            currentStep++
            if (currentStep < totalSteps) {
              setTimeout(runStep, 200)
            }
          }
          setLoadingProgress(Math.min(currentProgress, stepProgress))
        },
        step.duration / (isLastStep ? 99 : 50),
      )
    }

    runStep()
  }, [isLoading])

  // 渐进式显示搭配方案
  useEffect(() => {
    if (outfits && outfits.outfits && outfits.outfits.length > 0 && showingOutfits < outfits.outfits.length) {
      const timer = setTimeout(() => {
        setShowingOutfits((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [outfits, showingOutfits])

  const handleSubmit = async () => {
    if (!preferences.scenario || !preferences.gender || !preferences.style || !preferences.weather) {
      alert("亲爱的，请先告诉我你的完整信息哦～这样我才能为你量身定制最棒的穿搭！")
      return
    }

    setIsLoading(true)
    setLoadingStep(0)
    setLoadingProgress(0)
    setShowingOutfits(0)

    try {
      const response = await fetch("/api/generate-outfits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...preferences,
          scenario: customScenario || preferences.scenario,
          style: customStyle || preferences.style,
        }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()

      // 检查是否有错误
      if (data.error) {
        alert(data.error)
        return
      }

      // 等待加载动画完成
      setTimeout(() => {
        // 设置进度为100%
        setLoadingProgress(100)

        // 确保数据格式正确
        if (data.outfits && Array.isArray(data.outfits)) {
          setOutfits(data)
        } else if (data.rawContent) {
          try {
            const parsedContent = JSON.parse(data.rawContent)
            setOutfits(parsedContent)
          } catch {
            setOutfits(data)
          }
        } else {
          setOutfits(data)
        }

        setIsLoading(false)

        // 保存到localStorage
        localStorage.setItem("lastOutfits", JSON.stringify(data))
        localStorage.setItem("lastPreferences", JSON.stringify(preferences))
      }, 500)
    } catch (error) {
      console.error("Error:", error)
      alert("哎呀，我的灵感暂时卡住了！请稍等片刻再试试吧～")
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setPreferences({
      scenario: "",
      gender: "",
      style: "",
      weather: "",
      temperature: 20,
    })
    setCustomScenario("")
    setCustomStyle("")
    setOutfits(null)
    setShowingOutfits(0)
    setLoadingProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            {/* 新的魔法棒logo */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg border border-amber-100/50 hover:shadow-xl transition-all duration-300 group">
              <MagicWandLogo className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              {/* 魔法光芒效果 */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-50 animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              首席穿搭师
            </h1>
          </div>
          <p className="text-center text-neutral-600 mt-2 text-sm">让风格成为你的语言，用穿搭书写人生篇章</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 加载状态 */}
        {isLoading && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center shadow-lg border border-amber-100/50">
                    {loadingStep === 0 ? (
                      <MagicWandLogo className="w-10 h-10" animate />
                    ) : (
                      React.createElement(loadingSteps[loadingStep]?.icon || Sparkles, {
                        className: "w-8 h-8 text-amber-600 animate-pulse drop-shadow-sm",
                      })
                    )}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-50 animate-ping"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {loadingSteps[loadingStep]?.text || "正在为你创造时尚魔法..."}
                  </h3>

                  <div className="space-y-2">
                    <Progress value={loadingProgress} className="w-full h-2" />
                    <p className="text-sm text-neutral-500">{Math.round(loadingProgress)}% 完成</p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {loadingSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index <= loadingStep ? "bg-amber-400" : "bg-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!outfits && !isLoading ? (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* 欢迎语 */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-neutral-800">嗨！我是你的专属穿搭师 ✨</h2>
                  <p className="text-neutral-600">告诉我一些关于你的小秘密，我来为你创造今天的时尚魔法～</p>
                </div>

                {/* 活动场景 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-neutral-800">今天要去哪里呢？</Label>
                  <p className="text-sm text-neutral-500">选择你的目的地，让我为你的每一个场合量身定制</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {scenarios.map((scenario) => (
                      <Button
                        key={scenario}
                        variant={preferences.scenario === scenario ? "default" : "outline"}
                        className={`h-12 text-sm transition-all duration-200 ${
                          preferences.scenario === scenario
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg scale-105"
                            : "border-neutral-200 hover:border-amber-300 hover:bg-amber-50 hover:scale-102"
                        }`}
                        onClick={() => {
                          setPreferences((prev) => ({ ...prev, scenario }))
                          setCustomScenario("")
                        }}
                      >
                        {scenario}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-neutral-600">有特别的场合吗？告诉我吧～</Label>
                    <Input
                      placeholder="比如：第一次见家长、重要的演讲、闺蜜生日派对..."
                      value={customScenario}
                      onChange={(e) => {
                        setCustomScenario(e.target.value)
                        if (e.target.value) {
                          setPreferences((prev) => ({ ...prev, scenario: e.target.value }))
                        }
                      }}
                      className="border-neutral-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* 性别选择 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-neutral-800">你是？</Label>
                  <p className="text-sm text-neutral-500">让我更好地了解你，为你推荐最合适的风格</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {genders.map((gender) => (
                      <Button
                        key={gender}
                        variant={preferences.gender === gender ? "default" : "outline"}
                        className={`h-12 transition-all duration-200 ${
                          preferences.gender === gender
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg scale-105"
                            : "border-neutral-200 hover:border-amber-300 hover:bg-amber-50 hover:scale-102"
                        }`}
                        onClick={() => setPreferences((prev) => ({ ...prev, gender }))}
                      >
                        {gender}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 穿搭风格 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-neutral-800">今天想要什么感觉？</Label>
                  <p className="text-sm text-neutral-500">选择你心中的理想风格，或者告诉我你的独特想法</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {styles.map((style) => (
                      <Button
                        key={style}
                        variant={preferences.style === style ? "default" : "outline"}
                        className={`h-12 text-sm transition-all duration-200 ${
                          preferences.style === style
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg scale-105"
                            : "border-neutral-200 hover:border-amber-300 hover:bg-amber-50 hover:scale-102"
                        }`}
                        onClick={() => {
                          setPreferences((prev) => ({ ...prev, style }))
                          setCustomStyle("")
                        }}
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-neutral-600">有什么特别的风格想法吗？</Label>
                    <Input
                      placeholder="比如：像法式女孩一样优雅、酷到没朋友、温柔到骨子里..."
                      value={customStyle}
                      onChange={(e) => {
                        setCustomStyle(e.target.value)
                        if (e.target.value) {
                          setPreferences((prev) => ({ ...prev, style: e.target.value }))
                        }
                      }}
                      className="border-neutral-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* 天气选择 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-neutral-800">今天天空的心情如何？</Label>
                  <p className="text-sm text-neutral-500">天气决定了我们的穿搭基调，让我为你选择最舒适的搭配</p>
                  <div className="grid grid-cols-5 gap-3">
                    {weatherOptions.map(({ value, label, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={preferences.weather === value ? "default" : "outline"}
                        className={`h-16 flex-col space-y-1 transition-all duration-200 ${
                          preferences.weather === value
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg scale-105"
                            : "border-neutral-200 hover:border-amber-300 hover:bg-amber-50 hover:scale-102"
                        }`}
                        onClick={() => setPreferences((prev) => ({ ...prev, weather: value }))}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 温度选择 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-neutral-800">
                    温度计显示: {preferences.temperature}°C
                  </Label>
                  <p className="text-sm text-neutral-500">精确的温度让我为你找到冷暖平衡的完美搭配</p>
                  <div className="px-4">
                    <Slider
                      value={[preferences.temperature]}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, temperature: value[0] }))}
                      max={40}
                      min={-10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-500 mt-2">
                      <span>❄️ -10°C</span>
                      <span>🔥 40°C</span>
                    </div>
                  </div>
                </div>

                {/* 提交按钮 */}
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isLoading ||
                    !preferences.scenario ||
                    !preferences.gender ||
                    !preferences.style ||
                    !preferences.weather
                  }
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>开始定制穿搭</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : outfits && !isLoading ? (
          <div className="space-y-8">
            {/* 结果展示 */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                ✨ 专属于你的时尚魔法 ✨
              </h2>
              <p className="text-neutral-600">我为你精心调配了三套穿搭方案，每一套都承载着我的用心与创意</p>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-neutral-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
              >
                🎨 再来一次时尚冒险
              </Button>
            </div>

            {outfits.outfits && outfits.outfits.length > 0 && (
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                {outfits.outfits.slice(0, showingOutfits).map((outfit, index) => (
                  <Card
                    key={index}
                    className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-102 animate-in slide-in-from-bottom-4 fade-in"
                  >
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm text-neutral-500">第{index + 1}套方案</span>
                          </div>
                          <h3 className="text-2xl font-bold text-neutral-800 mb-2">{outfit.title}</h3>
                          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-neutral-700 border-b border-neutral-200 pb-2 flex items-center space-x-2">
                              <span>👗</span>
                              <span>穿搭清单</span>
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-neutral-700">✨ 上装：</span>
                                  <span className="text-neutral-600">{outfit.items.top}</span>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-neutral-700">👖 下装：</span>
                                  <span className="text-neutral-600">{outfit.items.bottom}</span>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-neutral-700">👠 鞋子：</span>
                                  <span className="text-neutral-600">{outfit.items.shoes}</span>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-neutral-700">💎 配饰：</span>
                                  <span className="text-neutral-600">{outfit.items.accessories}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-neutral-700 border-b border-neutral-200 pb-2 flex items-center space-x-2">
                              <span>💭</span>
                              <span>设计理念</span>
                            </h4>
                            <div className="bg-gradient-to-br from-neutral-50 to-stone-50 p-4 rounded-lg">
                              <p className="text-neutral-600 leading-relaxed">{outfit.concept}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* 显示正在加载下一套的提示 */}
                {showingOutfits < outfits.outfits.length && (
                  <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center space-x-2 text-neutral-500">
                        <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <span>正在为你准备第{showingOutfits + 1}套方案...</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* 祝福语 */}
            {outfits.blessing && showingOutfits === outfits.outfits?.length && (
              <div className="text-center animate-in slide-in-from-bottom-4 fade-in">
                <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 px-8 py-4 rounded-full shadow-lg">
                  <p className="text-lg font-medium text-neutral-700 flex items-center space-x-2">
                    <span>🌟</span>
                    <span>{outfits.blessing}</span>
                    <span>🌟</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-neutral-500 text-sm">© 2024 首席穿搭师 - 用心为每一个独特的你创造时尚奇迹 ✨</p>
        </div>
      </footer>
    </div>
  )
}
