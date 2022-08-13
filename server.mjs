import express from 'express'
import cors from "cors"
const app = express()
app.use(express.json());
app.use(cors())
const port = process.env.PORT||3000;
let user = [];
function randomNumber()
{
  return Math.floor(Math.random()*10000000);
}
app.post('/user',(req,res)=>{
  console.log(req.body);
  let newUser = {
    id : randomNumber(),
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password
  }
  user.push(newUser);
  res.send("user is created");
})

//get single user
app.get('/user/:userId',(req,res)=>{
  let userId = req.params.userId;
  let isFound = false;
  for(let i =0;i<user.length;i++){
    if(user[i].id==userId)
    {
      res.send(user[i]);
      isFound = true;
      break;
    }
  }
  if(!isFound)
  {
    res.send("user not found");
  }
  
})
//get all user
app.get('/users',(req,res)=>{
  res.send(user);
})
//to modify single user
app.put('/user/:userId',(req,res)=>{

  res.send("your user is modified");
  let userId = req.params.userId;
  let userIndex = -1;
  for(let i =0;i<user.length;i++)
  {
    if(user[i].id == userId)
    {
      userIndex = i;
      break;
    }
  }
  if(userIndex === -1)
  {
    res.send("user not found");
  }
  else
  {
    if(req.body.fullname)
    {
      user[userIndex].fullname = req.body.fullname
    };
    if(req.body.username)
    {
      user[userIndex].username = req.body.username
    };
    if(req.body.password)
    {
      user[userIndex].username = req.body.password
    };
    res.send("user are successfully updated");
  }
})
//to delete single user
app.delete('/user/:userId',(req,res)=>{
  let userId = req.params.userId;
  let userIndex = -1;
  for(let i =0;i<user.length;i++)
  {
    if(user[i].id == userId)
    {
      userIndex = i;
      break;
    }
  }
  if(userIndex===-1)
  {
    res.send("user not found");

  }
  else
  {
    user.splice(userIndex,1);
    res.send("your user is deleted");
  }

})
//delete all user
app.delete('/users',(req,res)=>{
  user = [];
  res.send("All user is deleted");
})
app.get('/', (req, res) => {
  console.log("ak request server par i");
  res.send('Hello World!')
})
app.get('/profile', (req, res) => {
  console.log("ak request server par i");
  res.send('this is a profile')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

