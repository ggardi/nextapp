// src/app/api/recover-email/route.js
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

    console.log('ssn:', ssn);
  
    // Mock a success or failure
    const isSuccess = Math.random() < 0.5; // 50% chance for success
  
    if (isSuccess) {
      // Mock email address to be returned on success
      const recoveredEmail = "user@example.com"; // Mock email
      return new Response(
        JSON.stringify({ message: 'Email recovered successfully!', email: recoveredEmail }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Something went wrong. Please call customer service.' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
  