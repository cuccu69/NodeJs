const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const Message = mongoose.model('Message',{
  name : String,
  message : String
})

const dbUrl = 'mongodb+srv://cukcoo:<passwords>@mern.h0ree.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get('/messages/:user', (req, res) => {
  const user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', async (req, res) => {
  try{
    const message = new Message(req.body);
    const savedMessage = await message.save()
      console.log('============message saved============');
    const censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log('error',error);
  } finally {
    console.log('Message Posted')
  }
})

io.on('connection', () => {
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('============connecting server============');
  console.log('mongodb connected',err);
})

const server = http.listen(3000, () => {
  console.log('============connecting port============');
  console.log('server is running on port', server.address().port);
});