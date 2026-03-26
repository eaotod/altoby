import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('first_name');
    const email = data.get('email_id');
    const message = data.get('message');
    const doing = data.get('what_are_we_doing');
    const stage = data.get('company_stage');
    const budget = data.get('budget');
    
    // In a real application, you would send this to SendGrid, Resend, or a database
    console.log(
      `Received contact form submission from ${name} (${email}): ${message} | doing=${doing} | stage=${stage} | budget=${budget}`,
    );

    return new Response(
      JSON.stringify({
        message: 'Success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong',
      }),
      { status: 500 }
    );
  }
};
