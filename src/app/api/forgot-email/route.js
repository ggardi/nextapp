export async function POST(request) {
    const body = await request.json();
    const { infoType, ssn, dob, zip, loanNumber } = body;

    // Simple validation
    if (infoType === "personal") {
        if (!ssn || !dob || !zip) {
            return new Response(
                JSON.stringify({ message: 'Invalid input for personal info' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
    } else if (infoType === "loan") {
        if (!loanNumber || !zip) {
            return new Response(
                JSON.stringify({ message: 'Invalid input for loan info' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
    }

    try {
        // Forwarding the request to the accounts-backend API
        console.log('api', process.env.RECOVER_EMAIL_API)
        const response = await fetch(process.env.RECOVER_EMAIL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ infoType, ssn, dob, zip, loanNumber }),
        });

        // Check if the response is successful
        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({ message: errorData.message || 'Error from external API' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Parse the JSON response from the external API
        const responseData = await response.json();

        // Return the response to the client
        return new Response(
            JSON.stringify({ message: 'Request forwarded successfully!', ...responseData }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error connecting to external API' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
