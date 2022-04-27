import React from 'react'
import { Link } from "react-router-dom";
import '../Header/header.css'
import Header from '../Header/header'

import DatamapsIndia from 'react-datamaps-india'

export default function megafpo() {
  
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div className='megafpomap'>
          {/* <Mapchart/> */}
          <DatamapsIndia
            regionData={{
              Maharashtra: {
                value: 10,
              },
            }}
            hoverComponent={({ value }) => {
              return (
                <>
                  <p>{value.name}</p>
                  <p>{value.value}</p>
                </>
              )
            }}
            mapLayout={{
              //  title: 'Title',
              legendTitle: 'Legend Title',
              startColor: '#FFDAB9',
              endColor: '#FF6347',
              hoverTitle: 'Count',
              noDataColor: '#f5f5f5',
              borderColor: '#8D8D8D',
              hoverBorderColor: '#8D8D8D',
              hoverColor: 'green',

            }}
          />
        </div>
      </div>
    </>

  )
}
