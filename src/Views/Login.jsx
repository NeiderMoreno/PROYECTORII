// eslint-disable-next-line no-unused-vars
import React,{useState}from 'react'
import { useNavigate,Link }  from 'react-router-dom';
import { sendRequest} from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';

const Login = () =>{
  const [email,setEmail] =useState('');
  const [password,setPassword] = useState('');
  const go=useNavigate();
  const csrf=async()=>{
    await axios.get('/sanctum/csrf-cookie');
  }
  const login=async(e)=>{
    e.prevenDefault();
    await csrf();
    const form={email:email, password:password};
    const res= await sendRequest('POST',form,'/api/auth/login','',false);
    if(res.status == true){
      storage.set('authToken', res.token);
      storage.set('authUser', res.data);
      go('/');
    }
    }
  
  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='clo-md-4 offset-md-4'>
          <div className='card border border.dark'>
          <div className='card-header bg-dark border border-primary text-white'>
            LOGIN
          </div>
          <div className='card-body'>
            <form onSubmit={Login}>

              <DivInput type='email' icon='fa-at' value={email}
              className= 'form-control' placeholder='Email' requiered='required' 
              handleChange={(e)=> setEmail(e.target.value)} />

              <DivInput type='password' icon='fa-ey' value={password}
              className= 'form-control' placeholder='Password' requiered='required' 
              handleChange={(e)=> setPassword(e.target.value)} />

              <div className=' d-grid col-10 mx-auto'>
                <button className='btn btn-dark'>
                 <i className='fa-solid fa-door-open'></i> Login
                </button>
              </div>
            </form>
            <Link to='/register'>
            <i className='fa-solid fa-user-plus'></i>Register
            </Link>
          </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Login