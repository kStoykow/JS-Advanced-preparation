function solve(input) {
    const data = {};

    const commandsMap = {
        create: (name, inherits, parentName) => {
            data[name] = inherits ? Object.create(data[parentName]) : {};
        },
        set: (name, k, v) => data[name][k] = v,
        print: name => {
            const entries = [];
            for (const key in data[name]) {
                entries.push(`${key}:${data[name][key]}`);
            }
            console.log(entries.join(','));
        },
    }

    input.forEach(x => {
        const [command, name, k, v] = x.split(" ");
        commandsMap[command](name, k, v);
    });
}
console.log(solve(['create a',
    'create b inherit a',
    'create stamat inherit b',
    'set a rank number1',
    'set b nick goshko',
    'print stamat']
));