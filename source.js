const prompt = args[0];

const openAIRequest =  await Functions.makeHttpRequest({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${secrets.apiKey}`,
        'Content-Type': 'application/json'
    },
    data: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": prompt }],
        "temperature": 0,
    })
});

const openAiResponse = openAIRequest;

// console.log(await openAIRequest)

const result = openAiResponse.data.choices[0].message.content;

console.log(result);
return Functions.encodeString(result);