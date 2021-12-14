import React, {useState, useEffect, useRef} from 'react'
import JobDescription from "./Components/JobDescription";
import Resume from "./Components/Resume";
import _ from 'lodash'



function App() {
  const [kwRes, setKwRes] = useState(null)
  const [kwJDes, setKwJDes] = useState(null)
  const [matching, setMatching] = useState(null)
  const [missing, setMissing] = useState(null)

  const handleMatching = () => {
      const m = _.intersection(kwJDes, kwRes)
      setMatching(m)
  }


  const handleMissing = () => {
    const m = _.without(kwJDes, kwRes)
    setMissing(m)
  }

  useEffect(()=>{
    handleMissing()
    handleMatching()
  },[kwRes, kwJDes])

  return (
    <>
    <div className="App  pv4">
      <div className="flex">
      <Resume setKwRes={setKwRes}/>
      <JobDescription setKwJDes={setKwJDes}/>
      </div>
      <div className="flex">
        <div className="w-100 w-40-m">
        <h4>Matching</h4>
        <div className="flex flex-wrap w-100 w-40-m">
        {matching && matching.map((k) => (
          <div className="bb b--green mr1 pa1">{k},</div>
        ))}
      </div>
      </div>
      <div className="w-100 w-40-m">
        <h4>Missing</h4>
        <div className="flex flex-wrap w-100 w-40-m">
        {missing && missing.map((k) => (
          <div className="bb b--red mr1 pa1">{k},</div>
        ))}
      </div>
      </div>
      </div>
      <h4>Keywords</h4>
    <div className="flex ">
        
      <div className="flex flex-wrap w-100 w-40-m">
        {kwRes && kwRes.map((k) => (
          <div className="b--black-10 mr1 pa1">{k},</div>
        ))}
      </div>
      <div className="flex flex-wrap w-100 w-40-m">
        {kwJDes && kwJDes.map((k) => (
          <div className="b--black-10 mr1 pa1">{k},</div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
