from groq import Groq

client = Groq(
    api_key="api_key",
)

def completion(messages, model="llama-3.3-70b-versatile", stream=False):

  

  chat_completion = client.chat.completions.create(
      messages=messages,
      model=model,
      stream=stream,
  )

  # print(chat_completion.choices[0].message.content)
  return chat_completion.choices[0].message.content
