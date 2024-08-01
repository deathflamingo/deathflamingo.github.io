function loadTool(tool) {
    const toolForm = document.getElementById('toolForm');
    toolForm.innerHTML = '';

    const script = document.createElement('script');
    script.src = `scripts/${tool}.js`;
    script.onload = () => {
        const form = createToolForm();
        toolForm.appendChild(form);
    };
    document.body.appendChild(script);
}
