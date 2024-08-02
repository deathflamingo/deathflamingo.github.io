function createToolForm() {
    const form = document.createElement('form');

    // Radio buttons to choose the option
    const option1 = createRadioOption('aeskey', 'With AES Key');
    const option2 = createRadioOption('nthash', 'With NT Hash');

    // Add options with new lines
    form.appendChild(option1.input);
    form.appendChild(option1.label);
    form.appendChild(document.createElement('br'));
    form.appendChild(option2.input);
    form.appendChild(option2.label);
    form.appendChild(document.createElement('br'));

    // Container for dynamic fields
    const dynamicFields = document.createElement('div');
    dynamicFields.id = 'dynamicFields';
    form.appendChild(dynamicFields);

    // Event listeners for radio buttons
    option1.input.addEventListener('change', () => updateFields(dynamicFields, 'aeskey'));
    option2.input.addEventListener('change', () => updateFields(dynamicFields, 'nthash'));

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
    container.appendChild(createField('Hash', 'hash', 'text'));
    container.appendChild(createField('Domain SID', 'domainsid', 'text'));
    container.appendChild(createField('Domain', 'domain', 'text'));
    container.appendChild(createField('SPN', 'spn', 'text'));
    container.appendChild(document.createElement('br'));
    container.appendChild(createField('User to Impersonate', 'user', 'text'));
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
    const hash = formData.get('hash');
    const domainsid = formData.get('domainsid');
    const domain = formData.get('domain');
    const spn = formData.get('spn');
    const user = formData.get('user');

    let command = `python3 ticketer.py -${option} ${hash} -domain-sid ${domainsid} -domain ${domain} -spn ${spn} ${user}`;
    return command;
}
