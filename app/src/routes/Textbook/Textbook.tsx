import React from "react"
import Header from "../../components/Header/Header"
import { Link } from "react-router-dom"
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout/Layout";

import cn from 'classnames';
import './Textbook.css';

const GROUPS = ["A1 Elementary", "A2 Pre-intermediate", "B1 Intermediate", "B2 Upper-intermediate", "C1 Advanced", "C2 Proficiency", "Difficult words"]
const Textbook = () => {
  const pageNumber = 0
  return (
    <>
    <Header/>
    <Layout title="Выберите уровень сложности">
      <div className="groups-wrapper">
       {
       GROUPS.map((title, index) => {
        return <Link className={cn('group', title.split(' ')[0])} to={`group/${index}/page/${pageNumber}`} key={index}>
          {title}
          </Link>
          })
          }
        </div>
        <div>
        </div>
    </Layout>
    <Footer/>
    </>
  )
}
export default Textbook;
