import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiPath } from '../../config';
import '../dashboard/dashboard.css';
import { districts } from "../district";
import { states } from "../state";
import { tehsils } from "../tehsil";

import { Villages } from "../village";


toast.configure()
export default function FPO(props) {
  let history=useHistory()







  let duplicateDistrict = [];
  const duplicateTehsil = [];
  const duplicateVillage = [];

  const [fpoName, setFpoName] = useState("");
  const [managerName,setManagerName] = useState("");
  const [number, setMobileNumber] = useState("");
  const [phoneValidator, setphoneValidator] = useState(false);
  const [password, setPassword] = useState("");
  const [DOR, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [actUnderRegistered, setActRegistered] = useState("");
  const [turnOver, setTurnOver] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsile] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const TurnOver = (value) =>
  {    
    console.log(value);
    setTurnOver(parseInt(value))
  }
  const PinCode=(value)=>{
    setPincode(parseInt(value))
   
  }
  const convert = (value) =>
  {
    let Sid;
    let Did;
    let Tid;
    let Vid;
    const chars = value.split(",");
    
    if (chars[0] !== null || chars[0] !== undefined)
    {
      Sid = chars[0].parseInt;
      if (chars[1] !== null || chars[1] !== undefined)
      {
        Did = chars[1].parseInt;
        
        if (chars[2] != null || chars[2] != undefined)
        {
          Tid = chars[2].parseInt;
          if (chars[3] != null || chars[3] != undefined)
          {
            Vid = chars[3].parseInt;
          
          const Obj = {
            Sid: chars[0],
            Did: chars[1],
            Tid: chars[2],
          Vid:chars[3],
          }
            return Obj;
            
          }
          else
          {
        
          const Obj = {
            Sid: chars[0],
            Did: chars[1],
          Tid:chars[2],
          }
             return Obj;
          }
    
        }
        else
        {
          const Obj = {
            Sid: chars[0],
            Did: chars[1]
          }
           return Obj;
        }
      }
      else
      {
      
        const Obj = {
          Sid: chars[0],
       
        }
         return Obj;
      }
        
    }
      
      
  }

const settehsil = (value) =>
{

  const newObj = convert(value);
    duplicateVillage.length = 0
     var newArray = Villages.filter(function (el) {
      if (el.Sid === newObj.Sid)
       {
         if (el.Did === newObj.Did)
         {
           if (el.Tid === newObj.Tid)
           {
             duplicateVillage.push(el);
           }
         }
       }
     });
    let selectElement = document.getElementById("village");
    
    const placeholder= "Select Village";
    const defaultoption = document.createElement("option");
    defaultoption.textContent = placeholder;
    defaultoption.disabled = true;
  selectElement.replaceChildren(defaultoption);
    
    duplicateVillage.forEach(item =>
    {
  const option = document.createElement("option");
      option.setAttribute("name", item.name);
      option.setAttribute("Sid", item.Sid);
      option.setAttribute("Did", item.Did);
      option.setAttribute("Tid", item.Tid);
      option.setAttribute("Vid", item.Vid);
      option.value =  item.Sid + "," + item.Did +","+ item.Tid +","+ item.Vid;
      option.textContent = item.name;
  selectElement.appendChild(option);
    });
  setTehsile(value)
  }


const setdistrict = (value) =>
{

  const newObj = convert(value);
  
    duplicateTehsil.length = 0
     var newArray = tehsils.filter(function (el) {
       if (el.Sid === newObj.Sid)
       {
         if (el.Did === newObj.Did)
         {
           duplicateTehsil.push(el);
         }
       }
     });
    let selectElement = document.getElementById("tehsil");
    
    const placeholder= "Select Tehsil";
    const defaultoption = document.createElement("option");
    defaultoption.textContent = placeholder;
    defaultoption.disabled = true;
  selectElement.replaceChildren(defaultoption);
    
    duplicateTehsil.forEach(item =>
    {
  const option = document.createElement("option");
      option.setAttribute("name", item.name);
      option.setAttribute("Sid", item.Sid);
      option.setAttribute("Did", item.Did);
      option.setAttribute("Tid", item.Tid);
      option.value = item.Sid + "," + item.Did + "," + item.Tid;
      option.textContent = item.name;
  selectElement.appendChild(option);
});
    setDistrict(value)
  }


  const setstate = (value) =>
  {
    duplicateDistrict.length = 0
     var newArray = districts.filter(function (el) {
       if (el.Sid === value)
       {
         duplicateDistrict.push(el);
   }
     });
    let selectElement = document.getElementById("district");
    
    const placeholder= "Select District";
    const defaultoption = document.createElement("option");
    defaultoption.textContent = placeholder;
    defaultoption.disabled = true;
  selectElement.replaceChildren(defaultoption);
    
<option value="" disabled selected>Select District</option>
    duplicateDistrict.forEach(item =>
    {
  const option = document.createElement("option");
      option.setAttribute("name", item.name);
      option.setAttribute("Sid", item.Sid);
      option.setAttribute("Did",item.Did);
      option.value = item.Sid + "," + item.Did;
      option.textContent = item.name;
  selectElement.appendChild(option);
});
    setState(value)
  }

  
  const Signup= async(e)=>{
    e.preventDefault();
    if (!number || number.length < 10 || number.length > 10) {
      setphoneValidator(true)
  }
    let payLoad = { emailAddress: email, password: password,fpoName:fpoName,managerName:managerName,
      phoneNumber:"+91"+number,DOR:DOR,actUnderRegistered:actUnderRegistered,turnOver:turnOver,state:state,district:district,tehsil:tehsil,
    village:village,pinCode:pincode };
    try{
   const resp=await axios.post(apiPath + "Fpo/signup", payLoad);
   localStorage.setItem("number",'+91'+number);
   localStorage.setItem("email",email);
   history.push("/verify-otp")
   console.log("resp",resp.data);
    }
  
      catch(err){
        toast(err.response.data.message)
console.log("error",err);
      }
        
    }
  return (
    <>
    <div className='dashboardformHeader'>
      <h1>Megafpo.com</h1>
    </div>
    <div className='dashboardformmaindiv'>
      <form  className='farmerform' onSubmit={(event)=>Signup(event)}>
      <div className='farmerformmaindiv'>
      <div className='forminnerdivstyel'>
        
      <label for="">FPO Name</label>
  <input type="text" placeholder='Enter FPO Name'onChange={event=> setFpoName(event.target.value)} /><br/>

  <label for="">Manager Name</label>
  <input type="text" placeholder='Enter Manager Name' onChange={event=> setManagerName(event.target.value)}/><br/>
  
  <label for="">Email</label>
  <input type="email" placeholder='Enter FPO Email' onChange={event=> setEmail(event.target.value)}/><br/>

  <label for="">Password</label>
  <input type="password" placeholder='optional'onChange={event=> setPassword(event.target.value)}/><br/>

  <label for="">Phone Number</label>
  <input type="number"  placeholder='Enter Mobile Number except '
  onChange={event=>{
   setMobileNumber(event.target.value)
   setphoneValidator(false);
  }}/>
  {phoneValidator ?
                    <p className="help is-danger required-field-text">
                      {number ? "Number length should be 10 digit axcept +91" : "This field is required"}
                      </p> : <p className="help is-danger required-field-text"></p>}


  <label for="">Turn Over</label>
   <select onChange={event=> TurnOver(event.target.value)}>
   <option value="" disabled selected>Select Turn Over</option>
    <option value="1">0-5 lakh</option>
    <option value="2">5-15 lakh</option>
    <option value="3">15-50 lakh</option>
    <option value="4">50-2 cr</option>
 </select><br/>

  <label for="">Pincode</label>
  <input type="number" placeholder='Enter area pincode' onChange={event=> PinCode(event.target.value)} /><br/>

        </div>
        <div className="forminnerdivsecondstyle">

        <label for="">Reg Date</label>
  <input type="date" placeholder='' onChange={event=> setDate(event.target.value)}/><br/>
 
        <label for="">Act Registered</label>
 <select onChange={event=> setActRegistered(event.target.value)}>
 <option value="" disabled selected>Select Act Registered</option>
   <option value="coOperativeAct">Co-Op Act</option>
   <option value="companyAct">Company Act</option>

 </select><br/>

 <label for="">State</label>
              <select id="state" placeholder='select state' onChange={event=> setstate(event.target.value)}> 
                <option value="" disabled selected>Select State</option>
                {states.map(state => (
                  <option value={state.Sid}>{state.name}</option>
                ))}
              </select><br />

<label for="">District</label>
              <select id="district" placeholder='select district' onChange={event => setdistrict(event.target.value)}>
                <option value="" disabled selected>Select District</option>
                

              </select><br />

              <label for="">Tehsile</label>
              <select id="tehsil" placeholder='select Tehsil' onChange={event => settehsil(event.target.value)}>
                <option value="" disabled selected>Select Tehsile</option>
                


              </select><br />


              <label for="">village</label>
              <select id="village" placeholder='select Village' onChange={event => setVillage(event.target.value)}>
                <option value="" disabled selected>Select Village</option>
                {duplicateVillage.map(village => (
                  <option value={village.name}>{village.name}</option>
                ))}

              </select><br />
  </div>
  
  </div>
  <button type="submit" className='formersubmitbutton' >Signup</button>
</form> 
    </div>
    </>
  )
}
