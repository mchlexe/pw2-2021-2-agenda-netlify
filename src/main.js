import App from './App.svelte';

const app = new App({
  target: document.body,
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

export default app;
