import React from 'react';

import TodoControl from "../../organisms/TodoControl";
import Layout from "../../templates/Layout";

function Home() {
  return (
    <>
      <Layout>
        <TodoControl/>
      </Layout>
    </>
  );
}

export default Home;
