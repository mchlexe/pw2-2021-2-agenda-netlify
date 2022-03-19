<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import { logged, token, username, msg } from './stores';
    import FormUsuarioAdd from './FormUsuarioAdd.svelte';

    let email;
    let password;

    const dispatch = createEventDispatcher();

    const login = async (e) => {
        if (email.trim() === '' || password.trim() === '') {
            return;
        }

        dispatch('login', {
            email,
            password
        });

        
        let reqHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });


        let reqbody = {email, password}
            
        await fetch(`https://secure-sierra-28532.herokuapp.com/users/login`, {
            method: 'POST',
            body: JSON.stringify(reqbody),
            headers: reqHeaders,
        }).then(r => r.json())
        .then(data => {      
            if (data.token) {
                token.set(data.token);
                logged.set(true);
                username.set(data.username);
            } else {                
                
                let elemMsg = document.getElementById(`msg`);              
                elemMsg.style.display = 'block';    
                msg.set(data.message);
            };
        }); 
    };

    const signUp = () => {
        let btnLogin = document.getElementById(`btn-login`);
        let btnSignUp = document.getElementById(`btn-signup`);
        let elemSignUp = document.getElementById(`signUp`);
        let elemLogin = document.getElementById(`login`);

        btnLogin.style.display = 'none';
        btnSignUp.style.display = 'none';
        elemSignUp.style.display = 'block';
        elemLogin.style.display = 'none';
    }

    const salvarUsuario = async (event) => {      
        let reqBody = JSON.stringify(event.detail);

        console.log(reqBody);
    
        let reqHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        });

        await fetch(`https://secure-sierra-28532.herokuapp.com/users`, {
            method: 'POST',
            body: reqBody,
            headers: reqHeaders,
        }).then(r => r.json())
        .then(data => {      
            let btnLogin = document.getElementById(`btn-login`);
            let btnSignUp = document.getElementById(`btn-signup`);
            let elemSignUp = document.getElementById(`signUp`);
            let elemLogin = document.getElementById(`login`); 
            let elemMsg = document.getElementById(`msg`);      

            btnLogin.style.display = 'block';
            btnSignUp.style.display = 'block';
            elemSignUp.style.display = 'none';
            elemLogin.style.display = 'block';
            elemMsg.style.display = 'block';
            msg.set(data.usuario? "Email de verificação enviado!" : data.message );
        });      
    };


</script>

<main>
    <div class="form-contato form-group main ">

        <span id="login">
        <p>
            <input placeholder="Email" type="email" name="email" class="form-control"
                   bind:value={email} />
        </p>
        <p>
            <input placeholder="Senha" name="password" type="password" class="form-control"
                   bind:value={password} />
        </p>
        </span>
        
       <span id="signUp"><FormUsuarioAdd  on:novo-usuario={salvarUsuario} /></span> 

        <button on:click={login} type="submit" class="btn btn-success" id="btn-login">
            Login
        </button>
        
        <button on:click={signUp} type="submit" class="btn btn-primary" id="btn-signup">
            Cadastre-se
        </button>

        
        <p class="text-center font-weight-light" id="msg">{$msg}</p>
    </div>
</main>

<style>
    .main {
        width: 50%;
        margin: auto;
        margin-top: 10%;
        flex-direction: column;
        display: flex;
    }

    .btn {
        margin: 10px;
    }

    #signUp, #msg {
        display: none;
    }

</style>
