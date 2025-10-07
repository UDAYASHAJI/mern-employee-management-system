import React from 'react'
import "../../assets/css/header.css"
import admin from '../../assets/img/admin/admin.png'
import moment from "moment";


function Header() {
    const date = new Date(); // current date

  return (
    <div>
      <div className='header'> <img src={admin} className='admin-img'/>
      <p className='date-header'>{moment(date).format('DD MMMM YYYY | hh:mm A')}{/* 31 March 2013 | 03:30PM */}</p>
     


      </div>
    </div>
  )
}

export default Header
