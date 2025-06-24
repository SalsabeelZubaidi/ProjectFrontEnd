const BACKEND_URL = "http://10.0.2.2:8000/api/auth";

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await fetch(`${BACKEND_URL}/chatbot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from backend:", errorData);
      throw new Error(`Backend error: ${response.status}`);
    }

    const data= await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};