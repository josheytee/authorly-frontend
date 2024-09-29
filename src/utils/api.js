
export async function apiFetch(url, method, token, body = null) {
    const domain = "http://127.0.0.1:8000"
    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }), // Add body if provided
    };

    try {
        const response = await fetch(domain+url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data; // Return the response data
    } catch (error) {
        console.error("API fetch error:", error);
        throw error; // Re-throw the error for handling in the component
    }
}
