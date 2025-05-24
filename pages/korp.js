export async function getServerSideProps(context) {
  const { username } = context.params;

  try {
    const response = await fetch("https://dashboard.oriondrift.net/index");
    const data = await response.json();

    if (data?.error === false && data?.userData?.username === username) {
      const { user_id, username, platform, created } = data.userData;

      return {
        props: {
          user: { user_id, username, platform, created }
        }
      };
    }

    return { notFound: true };

  } catch (err) {
    return {
      props: {
        error: "Server error"
      }
    };
  }
}

export default function UserPage({ user, error }) {
  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Send JSON manually from a dynamic page
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.onload = function() {
              const user = ${JSON.stringify(user)};
              document.body.innerText = JSON.stringify(user, null, 2);
              document.contentType = 'application/json';
            };
          `
        }}
      />
    </>
  );
}
