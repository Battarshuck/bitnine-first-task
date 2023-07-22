const express = require('express')
const bcrypt = require('bcrypt') 
const client = require('./database')    

const app = express()
client.connect()
const PORT = 3000

// app.use((req, res, next) => {
//     console.log('atTime:', Date.now(), ' using Method:', req.method, ' to Path:', req.path)
// })

client.on('connect', () => {
    console.log('Connected to database')
})

client.on('end', () => {
    console.log('Disconnected from database')
})



app.get('/login', async (req, res) => {
    const { username, password } = req.query

    if(!username || !password){
        res.status(500).send({ error: 'Please fill all the fields' })
        return;
    }

    try{
        const result = await client.query('SELECT * FROM users WHERE name=$1', [username])
            
        if (result.rows.length === 0) {
            res.status(500).send({ error: 'User not found, Please signup' });
            return;
        }

        const checkPassword = await bcrypt.compare(password, result.rows[0].password)
        if (!checkPassword) {
            res.status(401).send({ error: 'Wrong password' })
            return;
        }

        const email = result.rows[0].email
        res.status(200).send({username, email, message: 'User signed in successfully'})
    }catch(e){
        res.status(500).send({ error: 'Database error' })
    }
})

app.post('/signup', async (req, res) => {
    let { username, password, email } = req.query

    if(!username || !password || !email){
        res.status(500).send({ error: 'Please fill all the fields' });
        return;
    }

    username = username.trim()
    email = email.trim()

    try{ 
        //note: the name is unique in the database
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await client.query('INSERT INTO users (name, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email])      
        res.status(200).send({username, email, message: 'User created successfully' })
    }catch(e){  
        res.status(500).send({ error: 'Database error' });
    }
})

app.put('/delete', async (req, res) => {
    const { username, password } = req.query

    if(!username || !password){
        res.status(500).send({ error: 'Please fill all the fields' });
        return;
    }

    try{
        const result = await client.query('SELECT * FROM users WHERE name=$1', [username]);

        if (result.rows.length === 0) {
            res.status(500).send({ error: 'User not found' });
            return;
        }

        const checkPassword = await bcrypt.compare(password, result.rows[0].password)
        if (!checkPassword) {
            res.status(401).send({ error: 'Wrong password' });
            return;
        }

        await client.query('DELETE FROM users WHERE name=$1', [username])     
        res.status(200).send({username, message: 'User deleted successfully' })
    }catch(e){
        res.status(500).send({ error: 'Database error' });
    }
})

app.put('/forgetpassword', async (req, res) => {
    const { username, email, newPassword } = req.query

    if(!username || !email || !newPassword){
        res.status(500).send({ error: 'Please fill all the fields' });
        return;
    }

    try{
        const result = await client.query('SELECT * FROM users WHERE name=$1 AND email=$2', [username, email]);

        if (result.rows.length === 0) {
            res.status(500).send({ error: 'User not found' });
            return;
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12)
        await client.query('UPDATE users SET password=$1 WHERE name=$2 AND email=$3', [hashedNewPassword, username, email])     
        res.status(200).send({username, message: 'Password reset successfully' })
    }catch(e){
        res.status(500).send({ error: 'Database error' });
    }
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
    console.log(`app listening at port: ${PORT}`)   
})
