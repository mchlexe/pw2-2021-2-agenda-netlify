<script>
    import { onMount } from 'svelte';
    import { writable, derived } from 'svelte/store'
    import { Router, Route } from 'svelte-navigator';

    import Contatos from './routes/Contatos.svelte';
    import Usuario from './routes/Usuarios.svelte';
    import Navbar from './routes/components/Navbar.svelte';
    import Login from './routes/components/Login.svelte';
    import { logged, token, username } from './routes/components/stores';

    const usersApiData = writable([]);
    let users;

    // onMount(async () => {
    //     await fetch(`https://secure-sierra-28532.herokuapp.com/users`)
    //     .then(r => r.json())
    //     .then(data => {
    //         users = data.users;
    //     });
        
    // });



</script>

<main>
    <Navbar />

    <Router>    
        <Route path="/">
            {#if $logged}
                <h1 class="text-center greet">Olá, {$username}! </h1>
            {:else}
               <Login />
            {/if}
        </Route>
            
        <Route path="contatos">
            <Contatos />
        </Route>

        <Route path="usuarios">            
            <Usuario />
        </Route>   
    </Router>
    
    
<p class="text-center font-weight-light msg">PWII - 2021.2 - Grupo AmandaMichel</p>
</main>

<style>
    .greet, .msg {
        margin-top: 10%;
    }

</style>
