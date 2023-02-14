import React from "react";
import { getProviders, signIn } from "next-auth/react";

const signin = ({ providers }) => {
  return <div>signin</div>;
};

export default signin;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
