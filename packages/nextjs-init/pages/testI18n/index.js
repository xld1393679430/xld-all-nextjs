import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import lang from "./utils/lang";
import { ssrI18n } from "./utils/ssrI18n";

const Index = ({ title }) => {
  const [state, setState] = useState(null);
  const { locale } = useRouter()

  useEffect(() => {}, []);

  console.log(5666, title, locale);

  return (
    <div>
      <p>testI18n</p>
	  <p>{title[locale]}</p>
    </div>
  );
};

export const getStaticProps = async () => ({
	props: {
	  title: ssrI18n('hello', lang),
	}
  })

export default Index;
