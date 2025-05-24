export async function getServerSideProps(context) {
  const { username } = context.params;
  return {
    redirect: {
      destination: `/api/${username}`,
      permanent: false
    }
  };
}

export default function Redirect() {
  return null;
}
