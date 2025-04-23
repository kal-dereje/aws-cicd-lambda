exports.handler = async (event, context) => {
    try {
        // Get the message from the event
        const message = event.message || 'Hello from Lambda!';
        
        // Log the message
        console.log(`Received message: ${message}`);
        
        // Return a response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: message,
                timestamp: context.getRemainingTimeInMillis()
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
}; 