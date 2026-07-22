<script>
    import { authClient } from "../../utils/auth.js";
    let { isLoginForm = false } = $props();
    const authFun = isLoginForm
        ? authClient.signIn.email
        : authClient.signUp.email;

    let email = $state("");
    let password = $state("");

    const registerOrLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await authFun(
            {
                email,
                password,
                name: email,
            },
            {
                onError: (c) => {
                    alert(c.error.message);
                },
                onSuccess: (c) => {
                    if (isLoginForm) {
                        window.location.href = "/";
                    } else {
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1000);
                    }
                },
            },
        );
    };
</script>

<form class="mx-auto w-full max-w-md space-y-4 p-6" onsubmit={registerOrLogin}>
    <h3 class="h3">
        {isLoginForm ? "Kirjaudu sisään:" : "Rekisteröidy:"}
    </h3>
    <label class="label">
        <span class="label-text">Sähköposti:</span>
        <input
            id="email"
            name="email"
            type="email"
            class="input"
            bind:value={email}
        />
    </label>

    <label class="label">
        <span class="label-text">Salasana:</span>
        <input
            id="password"
            name="password"
            type="password"
            class="input"
            bind:value={password}
        />
    </label>
    <button class="btn preset-filled-primary-500" type="submit"
        >{isLoginForm ? "Kirjaudu" : "Luo uusi tili"}</button
    >
</form>
