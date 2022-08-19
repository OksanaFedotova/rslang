import React, { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";

const Team = () => {
  return (
    <Fragment>
    <Header/>
    <Layout>
      <div>
        <p>Наша команда</p>
      </div>
      <div>
        <p>Александр, Дарья, Оксана</p>
      </div>
  </Layout>
  <Footer/>
  </Fragment>
  )
}
export default Team;