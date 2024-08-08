import { baseUrl } from "./baseUrl";

const userUrl = `${baseUrl}/api/PanelUsers`;



//to get other users data
export const GetUserInfo = async (id) => {
  try {
    const apiUrl = `${userUrl}/GetUserInfo/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to get other users data
export const GetPanelUsers = async () => {
  try {
    const apiUrl = `${userUrl}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get  panel users data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//login user
export const loginUser = async (loginData) => {
  try {
    // Make API request to log in user
    const apiUrl = `${userUrl}/UserLogIn/${loginData.email}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(loginData.password), // Pass user password as JSON
    });

    if (response.ok) {
      const message = await response.text(); // Get the response message
      return message; // Return the message to the caller
    } else {
      const errorMessage = await response.text(); // Get the error message
      throw new Error(errorMessage); // Throw an error with the error message
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error.message);
    return null; // Return null or handle the error as needed
  }
};

export const getInsigths = async () => {
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
                "text": `I need 2 short tips for a lecturer related to creating academy questions. Please provide the tips in the following structure: (as a JSON array) ["text", "text"]. The subject of the tips should be generalized and not specific, but related to the course of academy questions.`
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
    const tips = responseData.candidates[0].content.parts[0].text.replace(/```json\s*/, '').replace(/```$/, '');

    try {
      return JSON.parse(tips);
    } catch (error) {
      alert("Error: Failed to parse the response. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Example usage of the getTips function
getInsigths().then(tips => {
  if (tips) {
    console.log("Tip 1:", tips[0]);
    console.log("Tip 2:", tips[1]);
  }
});

//update user status
export const updateStatus = async (email,status) => {
  try {
    // Make API request to log in user
    const apiUrl = `${userUrl}/UpdateUserStatus/${email}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(status), // Pass user password as JSON
    });

    if (!response.ok) {
      throw new Error("Failed to update status for user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    alert("Error:", error);
  }
};




//register user
export const registerUser = async (userData) => {
  try {
    const apiUrl = `${userUrl}/RegisterPanelUser`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData), // Pass user data as JSON
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    alert("Error:", error);
  }
};


