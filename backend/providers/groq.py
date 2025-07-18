# 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

from groq import Groq

client = Groq(
    api_key="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",
)

def completion(messages, model="llama-3.3-70b-versatile", stream=False):

  

  chat_completion = client.chat.completions.create(
      messages=messages,
      model=model,
      stream=stream,
  )

  # print(chat_completion.choices[0].message.content)
  return chat_completion.choices[0].message.content
