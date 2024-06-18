import React from 'react'
import YourNotes from './YourNotes';

const Home = (props) => {

  const {showAlert} = props;
  return (
    <div>
      <YourNotes showAlert={showAlert} />
    </div>
  )
}

export default Home