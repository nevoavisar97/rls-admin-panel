import { baseUrl } from "./baseUrl";
const questionUrl = `${baseUrl}/api/Questions`;

export const getTips = async (subject) => {
  try {
    const apiKey = "AIzaSyCWOavwRLzQhrO68xAOb-482fSreL02A5E";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        "contents": [
          {
            "parts": [
              {
                "text": `I need to generate a question for my academy student, please provide it by the following structure: (as json) content: question content, answer1:option 1, answer2:..,answer3:..,answer4:..,correctAnswer:the correct answer index (0-3, as zero is 1 and 3 is 4),subject: GENRALIZED THE GIVEN SUBJECT AND NOT SPECIFIC SUBJECT, the subject of the question is ${subject}`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to get tips");
    }
    const responseData = await response.json();
    const tip = responseData.candidates[0].content.parts[0].text.replace(/```json\s*/, '').replace(/```$/, '');

    try {
      return JSON.parse(tip);
    } catch (error) {
      alert("Error: please use other subject");
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle the error as needed
    return null;
  }
};

export const GetUserQuestions = async (user_id) => {
  try {
    const apiUrl = `${questionUrl}/${user_id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user questions");
    }
    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetTopSubjects = async () => {
  try {
    const apiUrl = `${questionUrl}/GetTopSubjects`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get top subjects of questions");
    }
    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetQuestionInsights = async (q_id) => {
  try {
    const apiUrl = `${questionUrl}/insights/${q_id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get question insights");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetQuestionAnsInsights = async (l_id) => {
  try {
    const apiUrl = `${questionUrl}/widgetInsights/${l_id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get question answers insights");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const DeleteQuestion = async (question_id) => {
  try {
    const apiUrl = `${questionUrl}/${question_id}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed DELETE question");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const DeleteSelectedQuestions = async (question_ids) => {
  try {
    const apiUrl = `${questionUrl}/DeleteSelected/${question_ids}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed DELETE questions");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const insertQuestion = async (question) => {
  try {
    const apiUrl = `${questionUrl}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8", // Updated Content-Type
      },
      body: JSON.stringify(question), // Ensure question is properly formatted JSON
    });

    if (!response.ok) {
      throw new Error("Failed to insert question");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const fetchQuestions = async () => {
  try {
    const apiUrl = `${questionUrl}/`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user questions");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllSubjects = async () => {
  try {
    const apiUrl = `${baseUrl}/api/Subjects`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user questions");
    }
    const responseData = await response.json();
    
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
