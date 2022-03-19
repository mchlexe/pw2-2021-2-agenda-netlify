<script>
    import {createEventDispatcher} from 'svelte';

    let username;
    let email;
    let password;

    const dispatch = createEventDispatcher();

    const adicionarUsuario = (e) => {
        if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
            return;
        }

        dispatch('novo-usuario', {
            username,
            email,
            password
        });

        username = '';
        email = '';
        password = '';
    };
</script>

<main>
    <div class="form-contato form-group">
        <p>
            <input placeholder="Nome" type="text" name="username" class="form-control"
                   bind:value={username} />
        </p>
        <p>
            <input placeholder="Email" name="email" class="form-control"
                   bind:value={email} />
        </p>
        <p>
            <input placeholder="Senha" name="password" type="password" class="form-control"
                   bind:value={password} />
        </p>
        <button on:click={adicionarUsuario} type="submit" class="btn btn-success">
            Cadastrar
        </button>
    </div>
</main>

<style>
</style>
