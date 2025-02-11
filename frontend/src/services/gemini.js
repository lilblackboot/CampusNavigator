import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader.result.split(',')[1];
      resolve(base64Encoded);
    };
    reader.readAsDataURL(file);
  });

  const base64EncodedData = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type
    }
  };
};

export const generateResponse = async (question, timetableData, image = null) => {
  try {
    if (image) {
      // Use gemini-1.5-flash for image analysis
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imagePart = await fileToGenerativePart(image);
      
      // Create a context that focuses on image analysis
      const context = `You are a helpful assistant analyzing a timetable image. 
      Please focus only on the information visible in the provided image to answer this question: ${question}
      
      If you can't find the information in the image, please let the user know.
      If the image is not clear or readable, please ask the user for a clearer image.`;

      const promptParts = [
        { text: context },
        imagePart,
      ];

      const result = await model.generateContent(promptParts);
      const response = await result.response;
      return response.text();
    } else {
      // Use gemini-pro for text-based queries using JSON data
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const context = `You are a helpful timetable assistant. Here is the timetable data:
      ${JSON.stringify(timetableData, null, 2)}
      
      Please answer the following question using the provided timetable data: ${question}
      
      If the question is unclear, ask for clarification. If you don't find the relevant information in the timetable data, please let the user know.`;

      const result = await model.generateContent(context);
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error('Error generating response:', error);
    if (error.message?.includes('SAFETY')) {
      return "I apologize, but I cannot process this image due to content safety restrictions. Please try uploading a different image or ask your question without an image.";
    }
    if (error.message?.includes('InvalidArgumentException')) {
      return "I'm having trouble processing the image. Please make sure it's a clear, readable image of a timetable and try again.";
    }
    throw new Error(`Failed to generate response: ${error.message}`);
  }
};

// Model testing function
export const testModelAccess = async () => {
  try {
    const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const proModel = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Test both models
    const results = await Promise.all([
      flashModel.generateContent("Test message"),
      proModel.generateContent("Test message")
    ]);
    
    console.log("✅ Successfully connected to Gemini API");
    console.log("✅ Access to gemini-1.5-flash confirmed");
    console.log("✅ Access to gemini-pro confirmed");
    
    return {
      success: true,
      models: {
        flash: true,
        pro: true
      }
    };
  } catch (error) {
    console.error("❌ Gemini API access error:", error.message);
    return {
      success: false,
      models: {
        flash: !error.message.includes("1.5-flash"),
        pro: !error.message.includes("pro")
      },
      error: error.message
    };
  }
};