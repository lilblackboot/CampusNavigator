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

// Simple function to check if a message is conversational
const isConversational = (message) => {
  const conversationalPatterns = [
    /^hi\b/i, /^hello\b/i, /^hey\b/i, /^how are you/i, /^good morning/i, 
    /^good afternoon/i, /^good evening/i, /^what's up/i, /^sup\b/i,
    /^thanks/i, /^thank you/i, /^ok\b/i, /^okay\b/i, /^bye\b/i,
    /^see you/i, /^nice/i, /^great/i, /^awesome/i, /^cool\b/i
  ];
  
  return conversationalPatterns.some(pattern => pattern.test(message)) || 
         message.length < 10; // Short messages are likely conversational
};

// Check if query is about current time/faculty
const isCurrentTimeQuery = (message) => {
  const timeNowPatterns = [
    /right now/i, /current time/i, /at this time/i, /current slot/i,
    /now/i, /at the moment/i, /currently/i, /present time/i,
    /faculty (right )?now/i, /current faculty/i, /who is teaching now/i,
    /who teaches now/i, /who's teaching now/i, /which faculty/i
  ];
  
  return timeNowPatterns.some(pattern => pattern.test(message));
};

// Convert time string to minutes since midnight - extremely robust to handle various formats
const convertTimeToMinutes = (timeStr) => {
  console.log(`Parsing time: "${timeStr}"`);
  
  // Handle empty or invalid input
  if (!timeStr || typeof timeStr !== 'string') {
    console.log(`  Invalid time string: ${timeStr}`);
    return null;
  }
  
  // Clean the input
  timeStr = timeStr.trim().toLowerCase();
  
  // Handle multiple formats:
  // 1. "1:35 PM" or "1:35PM" or "1:35 pm" or "1:35pm"
  // 2. "13:35" (24-hour format)
  // 3. "1.35 PM" or "1.35PM" (decimal instead of colon)
  // 4. "1 PM" or "1PM" (hour only)
  
  let hours, minutes;
  let isPM = false;
  
  // Check for AM/PM
  if (timeStr.includes('pm')) {
    isPM = true;
    timeStr = timeStr.replace('pm', '').trim();
  } else if (timeStr.includes('p.m.')) {
    isPM = true;
    timeStr = timeStr.replace('p.m.', '').trim();
  } else if (timeStr.includes('p.m')) {
    isPM = true;
    timeStr = timeStr.replace('p.m', '').trim();
  } else if (timeStr.endsWith('p')) {
    isPM = true;
    timeStr = timeStr.slice(0, -1).trim();
  }
  
  // Remove AM if present (we already default to AM)
  timeStr = timeStr.replace(/am|a\.m\.|a\.m|a$/i, '').trim();
  
  // Check for colon or decimal point as separator
  if (timeStr.includes(':')) {
    const parts = timeStr.split(':');
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
  } else if (timeStr.includes('.')) {
    const parts = timeStr.split('.');
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
  } else {
    // Only hours provided
    hours = parseInt(timeStr);
    minutes = 0;
  }
  
  // Convert to 24-hour format if necessary
  if (isPM && hours < 12) {
    hours += 12;
  }
  if (!isPM && hours === 12) {
    hours = 0;  // 12 AM = 0 hours
  }
  
  const result = hours * 60 + minutes;
  console.log(`  Converted to: ${hours}:${minutes} (${result} minutes)`);
  return result;
};

// Parse timetable data to find current faculty
const getCurrentFaculty = (timetableData) => {
  try {
    // Get current day and time
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    console.log(`Current time: ${currentHour}:${currentMinute} (${currentTimeInMinutes} minutes)`);
    console.log(`Current day: ${currentDay}`);
    console.log(`Timetable data entries: ${timetableData.length}`);
    
    // For testing - force a specific time if needed
    // const currentTimeInMinutes = convertTimeToMinutes("2:04 PM");
    // const currentDay = "monday";
    
    // Find the current slot
    let currentSlot = null;
    let currentFaculty = null;
    let slotTiming = null;
    let course = null;
    let venue = null;
    
    // Debug output all the timetable entries for the current day
    console.log("Available slots for today:");
    timetableData.forEach((entry, index) => {
      if (entry.day && entry.day.toLowerCase() === currentDay) {
        console.log(`  ${index}: ${JSON.stringify(entry)}`);
      }
    });

    for (const entry of timetableData) {
      // Skip if no day property or if it doesn't match current day
      if (!entry.day || entry.day.toLowerCase() !== currentDay) {
        continue;
      }
      
      // Parse slot timing
      if (entry.slot_timing) {
        const timeParts = entry.slot_timing.split('-');
        if (timeParts.length === 2) {
          const startTimeStr = timeParts[0].trim();
          const endTimeStr = timeParts[1].trim();
          
          const startTimeInMinutes = convertTimeToMinutes(startTimeStr);
          const endTimeInMinutes = convertTimeToMinutes(endTimeStr);
          
          if (startTimeInMinutes !== null && endTimeInMinutes !== null) {
            console.log(`Checking slot: ${entry.slot_timing} (${startTimeInMinutes}-${endTimeInMinutes} minutes)`);
            
            // Check if current time falls within this slot
            if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
              currentSlot = entry.slot || `Slot at ${entry.slot_timing}`;
              currentFaculty = entry.faculty || "Unknown faculty";
              slotTiming = entry.slot_timing;
              course = entry.course || "Not specified";
              venue = entry.venue || "Not specified";
              console.log(`MATCH FOUND! Current time ${currentTimeInMinutes} is within slot ${startTimeInMinutes}-${endTimeInMinutes}`);
              break;
            } else {
              console.log(`  Not a match: ${currentTimeInMinutes} is not between ${startTimeInMinutes} and ${endTimeInMinutes}`);
            }
          } else {
            console.log(`  Could not parse time range: ${entry.slot_timing}`);
          }
        } else {
          console.log(`  Invalid slot_timing format: ${entry.slot_timing}`);
        }
      } else {
        console.log(`  Entry has no slot_timing: ${JSON.stringify(entry)}`);
      }
    }
    
    console.log(`Final result - Found match: ${currentSlot !== null}`);
    
    if (currentSlot) {
      return {
        found: true,
        slot: currentSlot,
        faculty: currentFaculty,
        timing: slotTiming,
        day: currentDay,
        course: course,
        venue: venue
      };
    } else {
      return {
        found: false,
        currentTime: `${currentHour}:${currentMinute.toString().padStart(2, '0')}`,
        day: currentDay
      };
    }
  } catch (error) {
    console.error("Error in getCurrentFaculty:", error);
    return {
      found: false,
      error: error.message
    };
  }
};

// Generate appropriate conversational responses
const getConversationalResponse = (message) => {
  message = message.toLowerCase();
  
  if (/^hi\b|^hello\b|^hey\b|^what's up\b|^sup\b/i.test(message)) {
    return "Hello! I'm your timetable assistant. How can I help you today?";
  }
  
  if (/how are you/i.test(message)) {
    return "I'm doing well, thanks for asking! I'm ready to help with your timetable questions.";
  }
  
  if (/^good morning/i.test(message)) {
    return "Good morning! Ready to help with your schedule today.";
  }
  
  if (/^good afternoon/i.test(message)) {
    return "Good afternoon! How can I assist with your timetable today?";
  }
  
  if (/^good evening/i.test(message)) {
    return "Good evening! Need help with your schedule?";
  }
  
  if (/^thanks|^thank you/i.test(message)) {
    return "You're welcome! Let me know if you need anything else.";
  }
  
  if (/^bye\b|^see you/i.test(message)) {
    return "Goodbye! Feel free to come back if you have more questions about your timetable.";
  }
  
  if (/^ok\b|^okay\b|^cool\b|^nice\b|^great\b|^awesome\b/i.test(message)) {
    return "Great! Is there anything specific about your timetable you'd like to know?";
  }
  
  // For very short messages that don't match patterns
  if (message.length < 10) {
    return "I'm your timetable assistant. Can you please ask a more specific question about your schedule?";
  }
  
  // Default response for other conversational messages
  return "I'm here to help with your timetable. What would you like to know about your schedule?";
};

export const generateResponse = async (question, timetableData, image = null) => {
  try {
    console.log(`Received question: "${question}"`);
    console.log(`Is current time query: ${isCurrentTimeQuery(question)}`);
    
    // Check if the question is about current time faculty
    if (isCurrentTimeQuery(question)) {
      console.log("Processing as current time query");
      
      // Validate timetable data
      if (!Array.isArray(timetableData) || timetableData.length === 0) {
        console.log("No timetable data available:", timetableData);
        return "I don't have any timetable data available to check the current schedule. Please ensure the timetable data is loaded correctly.";
      }
      
      const currentFacultyInfo = getCurrentFaculty(timetableData);
      console.log("Current faculty info:", currentFacultyInfo);
      
      if (currentFacultyInfo.found) {
        let response = `Currently (${new Date().toLocaleTimeString()}), ${currentFacultyInfo.faculty} is teaching `;
        
        if (currentFacultyInfo.course) {
          response += `${currentFacultyInfo.course} `;
        }
        
        response += `for ${currentFacultyInfo.slot} during the time slot ${currentFacultyInfo.timing}`;
        
        if (currentFacultyInfo.venue) {
          response += ` at ${currentFacultyInfo.venue}`;
        }
        
        response += `.`;
        return response;
      } else if (currentFacultyInfo.error) {
        console.error("Error finding current faculty:", currentFacultyInfo.error);
        return "I encountered an error while checking the current schedule. Please try again later.";
      } else {
        return `There doesn't appear to be any class scheduled right now (${new Date().toLocaleTimeString()}) on ${currentFacultyInfo.day}. Would you like to check the next available class?`;
      }
    }
    
    // Check if the question is conversational
    if (isConversational(question)) {
      console.log("Processing as conversational query");
      return getConversationalResponse(question);
    }
    
    if (image) {
      console.log("Processing image-based query");
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
      console.log("Processing standard timetable query");
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