import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "@/components/Header";

const signin = ({ providers }) => {
  console.log(providers);
  return (
    <div>
      <Header />
    </div>
  );
};

export default signin;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
