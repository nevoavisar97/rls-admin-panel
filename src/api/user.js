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

