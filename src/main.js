import App from './App.svelte';

const app = new App({
  target: document.body,
});

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log(`Our app is running!`);
});

export default app;
