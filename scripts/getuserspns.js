function createToolForm() {
    const form = document.createElement('form');

    // Radio buttons to choose the option
    const option1 = createRadioOption('credentials', 'With Credentials');
    const option2 = createRadioOption('hashes', 'With Hashes');
    

    // Add options with new lines
    form.appendChild(option1.input);
    form.appendChild(option1.label);
    form.appendChild(document.createElement('br'));
    form.appendChild(option2.input);
    form.appendChild(option2.label);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Container for dynamic fields
    const dynamicFields = document.createElement('div');
    dynamicFields.id = 'dynamicFields';
    form.appendChild(dynamicFields);

    // Event listeners for radio buttons
    option1.input.addEventListener('change', () => updateFields(dynamicFields, 'credentials'));
    option2.input.addEventListener('change', () => updateFields(dynamicFields, 'hashes'));
    
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
        const command = generateCommand(dynamicFields);
        commandOutput.textContent = `Generated Command: ${command}`;
    };

    return form;
}

function createRadioOption(value, text) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = value;
    label.appendChild(document.createTextNode(text));
    return { label, input };
}

function updateFields(container, option) {
    container.innerHTML = '';
    switch (option) {
        case 'credentials':
            container.appendChild(createField('Domain', 'domain', 'text'));
            container.appendChild(createField('Username', 'username', 'text'));
            container.appendChild(createField('Password', 'password', 'password'));
            container.appendChild(createField('DC IP', 'dcip', 'text'));
            break;
        case 'hashes':
            container.appendChild(createField('Domain', 'domain', 'text'));
            container.appendChild(createField('Username', 'username', 'text'));
            container.appendChild(createField('LM Hash:NTHash', 'hashes', 'text'));
            container.appendChild(createField('DC IP', 'dcip', 'text'));
            break;
        
    }
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

function generateCommand(container) {
    const formData = new FormData(container.parentElement);
    const option = formData.get('option');
    const domain = formData.get('domain');
    const dcip = formData.get('dcip');

    let command = `python3 GetUserSPNs.py ${domain}`;
    switch (option) {
        case 'credentials':
            const username = formData.get('username');
            const password = formData.get('password');
            command += `/${username}:${password} -dc-ip ${dcip} -request`;
            break;
        case 'hashes':
            const hashes = formData.get('hashes');
            const hashUsername = formData.get('username');
            command += `/${hashUsername} -hashes ${hashes} -dc-ip ${dcip} -request`;
            break;

    }
    return command;
}
