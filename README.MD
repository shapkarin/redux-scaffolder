Generate three redux files from CLI: "constants.js, actions.js, reducers.js"

![npm](https://img.shields.io/npm/v/redux-scaffolder.svg)
![npm](https://img.shields.io/npm/dt/redux-scaffolder.svg)
![NPM](https://img.shields.io/npm/l/redux-scaffolder.svg)

### [Support](https://github.com/shapkarin/extend-saga-routines/blob/master/thanks.md).


Install 

```
npm install -g redux-scaffolder
```

To generate constants, actions and reducers you can run `base` (alias `b`) command. Next CLI will ask you to write your constants.
```
redux base 

# alias 
redux b
```
[Result example](https://github.com/shapkarin/redux-scaffolder/tree/master/example)

Note: yours input consts will be transformed to uppercase

Options for `base` command:
- `-r (--read)` to read consts from "constants.js" file
```
redux base --read

# alias
redux b -r
```
___

Otherwise you can generate "constants.js" with `constants`:
```
redux constants

# alias
redux c
```

Options for `constants` command:
- `-p (--path)` to specify path/ACTION_TYPE

Then you can generate actions and reducers.
Tool will read constants from "constants.js" file.

To create actions.js use `actions` command:
```
redux actions

# alias
redux a
```

To generate reducers.js there is `reducer` command:
```
redux reducer REDUCER_NAME

# or without name
redux reducer

# alias
redux r REDUCER_NAME
redux r
```

