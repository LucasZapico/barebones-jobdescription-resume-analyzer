import React, {useState, useEffect} from 'react'
import { useForm} from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

export const axiosNlpAPI = axios.create({
  baseURL: `http://localhost:5454/api/v1`,
  // withCredentials: true,

});


export const getKeywords = async (data) => {
  const payload = {
    action: 'get',
    payload: { ...data },
  };
  return await axiosNlpAPI.post('/kwprocess',
    payload)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};




const JobDescription = ({setKwJDes}) => {
  const [keywords, setKeywords] = useState(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const handleGetKeywords = async (input) => {
    console.log(input)
    try {
      const data = await getKeywords(input)
      console.log(data)
      if(data.status && data.status >= 200 && data.status < 300){
        const { keywords: kw } = data.data
        setKwJDes(kw)
      }
    } catch (err) {
      console.error(err)
    }
    

  }
  return (
    <div className="w-100 w-50-m pa2" >
      <h2>Job Description</h2>

      <form onSubmit={handleSubmit(handleGetKeywords)}>
      <input className="bg-black no-underline white bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba  mr4 mb4" type="submit" value="Analyze Job Description"/>
        <TextareaAutosize className="w-100" {...register('content')}/>
      
      </form>
      
    </div>
    
  )
}


export default JobDescription