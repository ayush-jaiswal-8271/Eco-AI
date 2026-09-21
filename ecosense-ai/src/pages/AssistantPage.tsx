import React, { useState, useEffect, useRef } from 'react'
import { sendChatMessage } from '../services/ecosense'
import { Spinner, DemoModeBanner } from '../components/ui'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
  context?: {
    intent?: string
    confidence?: number
    data?: any
  }
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm EcoBot, your campus sustainability assistant. Ask me about energy spikes, water conservation strategies, waste classification rules, or carbon emission metrics!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    const prompt = input.trim()
    setInput('')
    setLoading(true)

    try {
      const res = await sendChatMessage(prompt)
      if (res.is_demo) setIsDemo(true)

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        context: {
          intent: res.intent,
          confidence: res.confidence,
          data: res.data,
        },
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "I encountered an error connecting to the AI backend. Please verify that the backend server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const presetPrompts = [
    "What caused the recent energy spike?",
    "How can we reduce Block B water consumption?",
    "Give me top 3 campus carbon reduction actions",
    "What are the waste segregation guidelines?",
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {isDemo && <DemoModeBanner message="Operating in Demo Mode with simulated EcoBot AI responses." />}

      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">smart_toy</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">EcoBot AI Assistant</h1>
            <p className="text-xs text-on-surface-variant">Real-time sustainability Q&A, context-aware analytics, and policy assistance</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-outline-variant/40 text-xs text-primary font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          AI Engine Online
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-outline shrink-0">Try asking:</span>
        {presetPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(prompt)
            }}
            className="shrink-0 px-3 py-1.5 rounded-full bg-surface border border-outline-variant/40 text-xs text-on-surface hover:border-primary/50 hover:text-primary transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="glass-panel rounded-2xl border border-outline-variant/40 flex flex-col h-[520px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-surface/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-none'
                    : 'bg-surface border border-outline-variant/40 text-on-surface rounded-bl-none'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-outline-variant/20 text-xs font-semibold text-primary">
                    <span className="material-symbols-outlined text-base">eco</span>
                    EcoBot AI
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                {msg.context?.intent && (
                  <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center gap-2 text-[10px] text-outline">
                    <span>Intent: {msg.context.intent}</span>
                    <span>•</span>
                    <span>Confidence: {Math.round((msg.context.confidence || 0.9) * 100)}%</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-outline mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-surface border border-outline-variant/40 text-on-surface p-4 rounded-2xl rounded-bl-none">
                <Spinner size="sm" message="EcoBot is thinking..." />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-4 bg-surface border-t border-outline-variant/40 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask EcoBot anything about campus energy, water, or waste..."
            className="flex-1 bg-surface-variant/50 border border-outline-variant/40 text-on-surface rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-hover disabled:opacity-50 transition-all flex items-center gap-2 text-sm shadow-md"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </form>
      </div>
    </div>
  )
}
