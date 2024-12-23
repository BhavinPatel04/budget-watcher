import ollama, { ChatRequest } from "ollama";

export const getChatRequest = (textFromImage: string): ChatRequest => {
  const chatRequest: ChatRequest = {
    model: 'llama3.2:1b',
    // model: 'moondream:1.8b',
    // model: 'llama3.2-vision', // phone doesn't have enough memory to support this model
    // prompt: `Analyze the text in the provided image. Extract all readable content
    //   and present it in a structured Markdown format that is clear, concise, 
    //   and well-organized. Ensure proper formatting (e.g., headings, lists, or
    //   code blocks) as necessary to represent the content effectively.`,
    // images: [imageBase64],
    messages: [{
      role: 'user',
      // content: `Analyze the text in the provided image.`,
      content: `1. Below is a text from an text recognition react library.
        2. The text contains content from a receipt.
        3. Your task is to maps the items to the prices. Prices start with $. Quantity is not required.
        4. Presents it in a json format that is clear, concise and well-organized.
        TEXT: ${textFromImage}
      `,
      // content: 'Why is the sky blue?',
      // content: `Analyse this text from a reciept.
      //   Map the items to the prices. Prices start with $.
      //   Present it in a structured Markdown format
      //   that is clear, concise, and well-organized.
      //   Ensure proper formatting (e.g., headings, lists, or code blocks)
      //   as necessary to represent the content effectively. - ${result.text}
      // `,
      // images: [imageBase64]
    }]
  };
  return chatRequest;
};

export const getChatResponse = (textFromImage: string) => {
  const chatRequest = getChatRequest(textFromImage);
  return ollama.chat({
    ...chatRequest,
    stream: false
  });
};

export const getChatResponseThroughAPI = (textFromImage: string) => {
  const chatRequest = getChatRequest(textFromImage);
  return fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatRequest),
  })
  .then((fetchResponse) => fetchResponse.json());
};