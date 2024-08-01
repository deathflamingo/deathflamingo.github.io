function createToolForm() {
    const form = document.createElement('form');

    // Add fields for getST.py
    form.appendChild(createField('Domain', 'domain', 'text'));
    form.appendChild(createField('Username', 'username', 'text'));
    form.appendChild(createField('Password', 'password', 'password'));
    form.appendChild(createField('SPN', 'spn', 'text'));
    form.appendChild(document.createElement('br'));
    form.appendChild(createField('Computer to Delegate To', 'computer', 'text'));
    form.appendChild(createField('User to Impersonate', 'user', 'text'));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Generate Command';
    form.appendChild(submitButton);

    // Container to display the generated command
    const commandOutput = document.createElement('div');
    commandOutput.id = 'commandOutput';
    form.appendChild(commandOutput);

    form.onsubmit = (e) => {
        e.preventDefault();
        const command = generateCommand(form);
        commandOutput.textContent = `Generated Command: ${command}`;
    };

    return form;
}

function createField(labelText, name, type) {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    label.appendChild(input);
    return label;
}

function generateCommand(form) {
    const formData = new FormData(form);
    const domain = formData.get('domain');
    const username = formData.get('username');
    const password = formData.get('password');
    const spn = formData.get('spn');
    const computer = formData.get('computer');
    const user = formData.get('user');

    const command = `python3 getST.py -spn ${spn}/${computer} '${domain}/${username}:${password}' -impersonate ${user}`;
    return command;
}
