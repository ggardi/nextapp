export async function POST(request) {

    console.log('FORGOT_EMAIL_API:', process.env.FORGOT_EMAIL_API); 
    
    // Parse the incoming JSON body
    const body = await request.json();

    // Check if formValues exists and is not empty
    if (!body.formValues || Object.keys(body.formValues).length === 0) {
        return new Response(
            JSON.stringify({ message: 'formValues is required and cannot be empty' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Destructure from formValues
    const { infoType, ssn, dob, zip, loanNumber } = body.formValues;

    console.log(body)
  
    try {
        console.log('Calling external API...');

        const formData = new FormData();

        if (infoType) formData.append('info_type', infoType);  
        if (ssn) formData.append('last_4_ssn', ssn);           
        if (loanNumber) formData.append('loan_number', loanNumber); 
        if (dob) formData.append('dob', dob);                   
        if (zip) formData.append('zip', zip);                   

        console.log('form data', formData)

        for (let [key, value] of formData.entries()) {
            console.log('FormData field:', key, value);
        }

        const response = await fetch(process.env.FORGOT_EMAIL_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',   
                'X-MYACCOUNT-SERVICE-TOKEN': '670966bcb79255.39595807', 
            },
            body: formData, 
        });

        console.log('Response:', response);

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({ message: errorData.message || 'Error from external API' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const responseData = await response.json();
        return new Response(
            JSON.stringify({ message: 'Request forwarded successfully!', ...responseData }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ message: 'Error connecting to external API' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
